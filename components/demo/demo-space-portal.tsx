import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation, useAnimationFrame, useMotionValue, AnimatePresence } from "framer-motion";

/**
 * SpacePortal — v1.1 (True 3D starfield)
 * - Public API unchanged
 * - Stars exist in 3D (x,y,z) with perspective projection
 * - Screen‑first spawning guarantees full‑screen presence without center gap
 */

export type SpacePortalPhase = "idle" | "preparing" | "jumping" | "cooldown";

export interface SpacePortalProps {
  phase: SpacePortalPhase;
  intensity?: "subtle" | "full";
  className?: string;
  onJumpEnd?: () => void;
}

// ---------------- config (tweakables) ----------------
const CONFIG = {
  FOV_DEG: 60,                          // camera field of view for projection
  rampSec: 0.7,                         // time to ramp from 0→1 warp
  decaySec: 0.55,                       // cooldown time back to base
  vBase_full: 18,                       // world units per second (preparing/jog)
  vBase_subtle: 12,
  vJump_full: 160,                      // added speed during jump
  vJump_subtle: 96,
  starCount_full: 860,
  starCount_subtle: 420,
  tailMax_full: 160,
  tailMax_subtle: 100,
  minTailEarly_full: 10,                // pixels — guarantees immediate center activity
  minTailEarly_subtle: 6,
  alphaCap_full: 0.9,
  alphaCap_subtle: 0.75,
  // depth spawning (world units along +Z)
  zNear: 2.0,
  zFar: 80.0,
  nearSlabEnd: 6.0,                     // 25% of stars from [zNear, nearSlabEnd] uniform
  nearMix: 0.25,
  // load shedding
  dprMax: 2,
};

// -------------- utils --------------
const TAU = Math.PI * 2;
const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInQuad = (t: number) => t * t;

function createSeededRNG(seed: number) {
  // mulberry32 (deterministic)
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function useResizeObserver<T extends HTMLElement | HTMLCanvasElement>(ref: React.RefObject<T>) {
  const [rect, setRect] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const cr = e.contentRect;
        setRect({ width: Math.round(cr.width), height: Math.round(cr.height) });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return rect;
}

// -------------- 3D starfield types --------------
interface Star3D {
  x: number; y: number; z: number;     // world coordinates (z > 0)
  mag: number;                         // base size/brightness scalar
  phase: number;                       // twinkle phase
  rmag: number;                        // per-star variance [0.7..1.3]
  sx: number; sy: number;              // last projected screen position (px)
}

// perspective scale in pixels
function focalLenPx(width: number, height: number, fovDeg: number) {
  const fovRad = (fovDeg * Math.PI) / 180;
  return (0.5 * Math.min(width, height)) / Math.tan(fovRad / 2);
}

function project(x: number, y: number, z: number, cx: number, cy: number, f: number) {
  // z should be > 0
  const sx = cx + (f * x) / z;
  const sy = cy + (f * y) / z;
  return { sx, sy };
}

function sampleDepth(rng: () => number, zNear: number, nearEnd: number, zFar: number, nearMix: number) {
  // Mixture: near uniform slab OR log-uniform over far slab (1/z bias ~ deep field)
  if (rng() < nearMix) {
    return lerp(zNear, nearEnd, rng());
  } else {
    const ratio = zFar / nearEnd;                   // log-uniform between nearEnd and zFar
    return nearEnd * Math.pow(ratio, rng());
  }
}

function spawnStarScreenFirst(
  rng: () => number,
  width: number,
  height: number,
  f: number,
  zNear: number,
  nearEnd: number,
  zFar: number,
  nearMix: number
): Star3D {
  // Screen‑first: pick (u,v) uniformly in [-1,1] in screen space, then choose depth and unproject to world
  const u = (rng() * 2 - 1); // -1..1 horizontally
  const v = (rng() * 2 - 1); // -1..1 vertically
  const z = sampleDepth(rng, zNear, nearEnd, zFar, nearMix);
  const x = (u * (width * 0.5)) * (z / f);
  const y = (v * (height * 0.5)) * (z / f);
  return {
    x, y, z,
    mag: lerp(0.7, 1.6, rng()),
    phase: rng() * TAU,
    rmag: lerp(0.7, 1.3, rng()),
    sx: 0,
    sy: 0,
  };
}

// -------------- HyperspaceCanvas (3D) --------------
function HyperspaceCanvas({ phase, intensity = "full" }: { phase: SpacePortalPhase; intensity?: "subtle" | "full" }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const { width, height } = useResizeObserver(wrapRef);

  const seed = 20250816; // deterministic per mount
  const rng = useMemo(() => createSeededRNG(seed), []);

  const starTargetCount = intensity === "full" ? CONFIG.starCount_full : CONFIG.starCount_subtle;

  const starsRef = useRef<Star3D[]>([]);
  const [starsReady, setStarsReady] = useState(false);

  // Rebuild stars when we know dimensions (and thus focal length)
  useEffect(() => {
    if (!width || !height) return;
    const f = focalLenPx(width, height, CONFIG.FOV_DEG);
    const list: Star3D[] = [];
    for (let i = 0; i < starTargetCount; i++) {
      const s = spawnStarScreenFirst(rng, width, height, f, CONFIG.zNear, CONFIG.nearSlabEnd, CONFIG.zFar, CONFIG.nearMix);
      const { sx, sy } = project(s.x, s.y, s.z, width / 2, height / 2, f);
      s.sx = sx; s.sy = sy; // seed previous projection
      list.push(s);
    }
    starsRef.current = list;
    setStarsReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, starTargetCount]);

  const jumpClock = useRef(0); // 0..1 warp (easeIn on jump, easeOut on cooldown)

  // load shedding (simple): drop drawing density when slow
  const perfRef = useRef({ avgDt: 16.7, stride: 1 });

  useAnimationFrame((time, delta) => {
    const canvas = canvasRef.current;
    if (!canvas || !width || !height || !starsReady) return;

    // device pixel ratio
    const dpr = clamp(window.devicePixelRatio || 1, 1, CONFIG.dprMax);
    const targetW = Math.round(width * dpr);
    const targetH = Math.round(height * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW; canvas.height = targetH;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = width / 2, cy = height / 2;
    const f = focalLenPx(width, height, CONFIG.FOV_DEG);

    // perf stride (basic moving average on dt)
    const pr = perfRef.current;
    pr.avgDt = lerp(pr.avgDt, delta, 0.05);
    pr.stride = pr.avgDt > 20 ? 2 : 1; // draw every other star if we're slow

    // clear with soft radial gradient background using theme colors
    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.7);
    bg.addColorStop(0, "rgba(14,8,106,0.92)"); // --background with alpha
    bg.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, width, height);

    // warp clock
    if (phase === "jumping") {
      jumpClock.current = clamp(jumpClock.current + (delta / 1000) / CONFIG.rampSec, 0, 1);
    } else if (phase === "cooldown") {
      jumpClock.current = clamp(jumpClock.current - (delta / 1000) / CONFIG.decaySec, 0, 1);
    } else if (phase === "preparing" || phase === "idle") {
      jumpClock.current = clamp(jumpClock.current - (delta / 1000) / CONFIG.decaySec, 0, 1);
    }
    const warp = easeInQuad(jumpClock.current);

    // speeds per intensity
    const vBase = (intensity === "full" ? CONFIG.vBase_full : CONFIG.vBase_subtle);
    const vJump = (intensity === "full" ? CONFIG.vJump_full : CONFIG.vJump_subtle);
    const speed = vBase + vJump * warp;

    const minTailEarly = intensity === "full" ? CONFIG.minTailEarly_full : CONFIG.minTailEarly_subtle;
    const tailMax = intensity === "full" ? CONFIG.tailMax_full : CONFIG.tailMax_subtle;
    const alphaCap = intensity === "full" ? CONFIG.alphaCap_full : CONFIG.alphaCap_subtle;

    const dt = clamp(delta / 1000, 0, 0.05);

    // drawing
    const stars = starsRef.current;
    const stride = pr.stride;
    ctx.lineCap = "round";

    for (let i = 0; i < stars.length; i += stride) {
      const s = stars[i];

      // move forward along +Z toward camera (camera at origin looking +Z)
      const v = speed * s.rmag; // world units/s
      const dz = v * dt;

      // previous projection
      const prev = project(s.x, s.y, s.z, cx, cy, f);

      // update z depending on phase
      if (phase === "preparing") {
        s.z = s.z - vBase * 0.15 * dt; // subtle drift
      } else {
        s.z = s.z - dz;
      }

      // recycle when too close or far off-screen
      const zCull = 1.0; // don't let them cross camera
      let recycled = false;
      if (s.z <= zCull) recycled = true;

      // project new position (if recycled we'll respawn below)
      const curr = project(s.x, s.y, s.z, cx, cy, f);

      // off-screen padding check
      if (!recycled) {
        const pad = 0.2; // extra outside screen
        const out = curr.sx < -width * pad || curr.sx > width * (1 + pad) || curr.sy < -height * pad || curr.sy > height * (1 + pad);
        if (out) recycled = true;
      }

      if (recycled) {
        const ns = spawnStarScreenFirst(createSeededRNG((i + 1) * 8191 + (time | 0)), width, height, f, CONFIG.zNear, CONFIG.nearSlabEnd, CONFIG.zFar, CONFIG.nearMix);
        // project to seed prev/curr coherently
        const proj = project(ns.x, ns.y, ns.z, cx, cy, f);
        ns.sx = proj.sx; ns.sy = proj.sy;
        stars[i] = ns; // replace
        continue; // will draw next frame
      }

      // choose rendering depending on phase
      if (phase === "preparing" || phase === "idle") {
        // dots with twinkle using theme colors
        const tw = 0.65 + 0.35 * Math.sin((time / 1000) * (0.6 + s.rmag * 0.8) + s.phase);
        const r = s.mag * (intensity === "full" ? 1.0 : 0.8);
        ctx.beginPath();
        ctx.fillStyle = `rgba(179,179,255,${0.24 * tw})`; // --muted-foreground with alpha
        ctx.arc(prev.sx, prev.sy, r, 0, TAU);
        ctx.fill();
      } else {
        // jumping / cooldown: draw streak from prev → curr
        const dx = curr.sx - prev.sx;
        const dy = curr.sy - prev.sy;
        let len = Math.hypot(dx, dy);

        // early guard to ensure visible center streaks immediately
        if (jumpClock.current < 0.2) {
          len = Math.max(len, minTailEarly);
          // extend along motion direction
          const ux = dx === 0 && dy === 0 ? 0 : dx / (len || 1);
          const uy = dx === 0 && dy === 0 ? 0 : dy / (len || 1);
          curr.sx = prev.sx + ux * len;
          curr.sy = prev.sy + uy * len;
        }

        // style using theme colors
        const alpha = Math.min(0.25 + 0.6 * warp, alphaCap);
        const w1 = s.mag * (0.9 + 0.6 * warp);
        const w2 = s.mag * 0.55 * (1 + 0.8 * warp);

        // outer soft line
        ctx.lineWidth = Math.min(w1, 3.2);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(179,179,255,${alpha * 0.8})`; // --muted-foreground with alpha
        ctx.moveTo(prev.sx, prev.sy);
        ctx.lineTo(curr.sx, curr.sy);
        ctx.stroke();

        // bright core segment (shorter) using theme primary
        const coreX = prev.sx + (curr.sx - prev.sx) * 0.6;
        const coreY = prev.sy + (curr.sy - prev.sy) * 0.6;
        ctx.lineWidth = Math.min(w2, 2.0);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`; // --foreground with alpha
        ctx.moveTo(prev.sx, prev.sy);
        ctx.lineTo(coreX, coreY);
        ctx.stroke();

        // clamp maximum visible tail length to keep edges disciplined
        if (len > tailMax) {
          const ux = (curr.sx - prev.sx) / len;
          const uy = (curr.sy - prev.sy) / len;
          curr.sx = prev.sx + ux * tailMax;
          curr.sy = prev.sy + uy * tailMax;
        }
      }

      // store last projection for next frame
      s.sx = curr.sx; s.sy = curr.sy;
    }

    // soft outer vignette mask for cleaner edges
    ctx.save();
    ctx.globalCompositeOperation = "destination-in";
    const mask = ctx.createRadialGradient(cx, cy, Math.min(width, height) * 0.55, cx, cy, Math.max(width, height) * 0.75);
    mask.addColorStop(0, "rgba(255,255,255,1)");
    mask.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = mask; ctx.fillRect(0, 0, width, height);
    ctx.restore();
  });

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
}

// ---------------- Center FX ----------------
function Vortex({ phase, intensity = "full" }: { phase: SpacePortalPhase; intensity?: "subtle" | "full" }) {
  const rot = useMotionValue(0);
  useAnimationFrame((t, dt) => {
    rot.set((rot.get() + dt * (phase === "jumping" ? 0.06 : 0.02)) % 360);
  });

  const scaleAnim = useAnimation();
  useEffect(() => {
    if (phase === "jumping") {
      scaleAnim.start({ scale: [0.9, 1.35, 1.8], opacity: [0.28, 0.55, 0.0], rotate: [0, 90, 180] }, { duration: 1.2, ease: "easeInOut" });
    } else if (phase === "preparing") {
      scaleAnim.start({ scale: [0.85, 1.0, 0.9], opacity: [0.22, 0.35, 0.3], rotate: [0, 30, 0] }, { duration: 2.2, repeat: Infinity, ease: "easeInOut" });
    } else {
      scaleAnim.start({ scale: 0.8, opacity: 0.15, rotate: 0 }, { duration: 0.4 });
    }
  }, [phase, scaleAnim]);

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center" style={{ rotate: rot }} animate={scaleAnim}>
      <div className="relative">
        <div className="w-[22rem] h-[22rem] rounded-full blur-xl opacity-60 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.28),rgba(var(--secondary),0.08)_60%,transparent_70%)]" />
        <div className="absolute inset-0 rounded-full [mask-image:radial-gradient(circle,black_40%,transparent_70%)] bg-[conic-gradient(from_0deg,rgba(var(--muted-foreground),0.25),rgba(var(--primary),0.2)_50%,transparent_80%,rgba(var(--muted-foreground),0.25))]" />
        <div className={`absolute inset-6 rounded-full border ${intensity === "full" ? "border-muted-foreground/30" : "border-muted-foreground/15"}`} />
        <div className={`absolute inset-12 rounded-full border ${intensity === "full" ? "border-muted-foreground/20" : "border-muted-foreground/10"}`} />
        <div className={`absolute inset-20 rounded-full border ${intensity === "full" ? "border-muted-foreground/10" : "border-muted-foreground/5"}`} />
      </div>
    </motion.div>
  );
}

function EnergyParticles({ phase, count = 28 }: { phase: SpacePortalPhase; count?: number }) {
  const ringControls = useAnimation();
  useEffect(() => {
    if (phase === "preparing") {
      ringControls.start({ rotate: 360 }, { ease: "linear", duration: 8, repeat: Infinity });
    } else {
      ringControls.stop();
    }
  }, [phase, ringControls]);

  const rng = useMemo(() => createSeededRNG(424242), []);
  const particles = useMemo(() => Array.from({ length: count }, (_, i) => ({
    angle: (i / count) * TAU + rng() * 0.2,
    radius: 100 + rng() * 30,
    delay: rng() * 0.6,
    scale: 0.8 + rng() * 0.6,
  })), [count, rng]);

  return (
    <AnimatePresence>
      {(phase === "preparing" || phase === "idle") && (
        <motion.div className="absolute inset-0 flex items-center justify-center" animate={ringControls}>
          <div className="relative">
            {particles.map((p) => (
              <motion.div
                key={`particle-${p.angle}-${p.radius}`}
                className="absolute rounded-full bg-primary shadow-[0_0_12px_rgba(var(--primary),0.65)]"
                style={{
                  width: 6 * p.scale,
                  height: 6 * p.scale,
                  left: 0,
                  top: 0,
                  transform: `translate(${Math.cos(p.angle) * p.radius}px, ${Math.sin(p.angle) * p.radius}px)`,
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0.2, 0.9, 0.3], scale: [p.scale, p.scale * 1.4, p.scale] }}
                transition={{ duration: 2.2, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



function JumpFlash({ phase, onEnd }: { phase: SpacePortalPhase; onEnd?: () => void }) {
  return (
    <AnimatePresence>
      {phase === "jumping" && (
        <motion.div
          key="flash"
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.0, 0.9, 0.0] }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onAnimationComplete={onEnd}
        >
          <motion.div
            initial={{ scale: 0.2, opacity: 0.9 }}
            animate={{ scale: [0.2, 2.2, 3.6], opacity: [0.9, 0.5, 0] }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-[30rem] h-[30rem] rounded-full border border-muted-foreground/80 shadow-[0_0_120px_rgba(255,255,255,0.65)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function SpacePortal({ phase, intensity = "full", className = "", onJumpEnd }: SpacePortalProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* 3D starfield */}
      <HyperspaceCanvas phase={phase} intensity={intensity} />

      {/* center fx */}
      <Vortex phase={phase} intensity={intensity} />
      {/* preparing energy ring with blue particles (no dots during jump) */}
      <EnergyParticles phase={phase} />

      {/* jump flash */}
      <JumpFlash phase={phase} onEnd={onJumpEnd} />

      {/* subtle outer fade to hide edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
}

// ---------- Demo (optional) ----------
// const Demo = () => {
//   const [phase, setPhase] = useState<SpacePortalPhase>("preparing");
//   return (
//     <div className="relative h-[600px] w-full bg-black">
//       <SpacePortal phase={phase} intensity="full" onJumpEnd={() => setPhase("cooldown")} />
//       <div className="absolute bottom-4 left-4 flex gap-2 pointer-events-auto">
//         <button className="px-3 py-1 rounded-md bg-white/10 text-white" onClick={() => setPhase("preparing")}>Preparing</button>
//         <button className="px-3 py-1 rounded-md bg-white/10 text-white" onClick={() => setPhase("jumping")}>Jump</button>
//         <button className="px-3 py-1 rounded-md bg-white/10 text-white" onClick={() => setPhase("cooldown")}>Cooldown</button>
//       </div>
//     </div>
//   );
// };
// export { Demo };
