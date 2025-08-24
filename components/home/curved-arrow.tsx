"use client";

import React from "react";

type Props = {
  anchorSelector: string;
  anchorSide?: "right" | "left" | "top" | "bottom";
  startOffsetPx?: number;
  strokeWidth?: number;
  className?: string;
  containerClassName?: string;
  showEndpoints?: boolean;
  extendToViewport?: boolean;
  recomputeOnScrollView?: boolean;
  targetSelector?: string;
  targetAnchor?:
    | "center"
    | "top-left"
    | "top"
    | "top-right"
    | "right"
    | "bottom-right"
    | "bottom"
    | "bottom-left"
    | "left";
  targetOffsetPx?: number;
  stopShortPx?: number;
  freezeAfterTarget?: boolean;
  renderOnlyWhenTargetPresent?: boolean;
  strokeDasharray?: string; // intentionally ignored to preserve current look (solid when idle)
  curveStyle?: "none" | "auto";
  curveAmplitudePx?: number;
};

type Size = { width: number; height: number };
type Line = { x1: number; y1: number; x2: number; y2: number };

const clamp = (v: number, min: number, max: number) =>
  v < min ? min : v > max ? max : v;

// Animation timings preserved exactly
const ENTER_MS = 420;
const EXIT_MS = 340;

// Small constant used for marker refX (same value as before: 6 - 0.6)
const MARKER_REFX = 5.4;

function CurvedArrowInner({
  anchorSelector,
  anchorSide = "right",
  startOffsetPx = 8,
  strokeWidth = 2,
  className,
  containerClassName,
  showEndpoints = false,
  extendToViewport = true,
  recomputeOnScrollView = false,
  targetSelector,
  targetAnchor = "center",
  targetOffsetPx = 0,
  stopShortPx = 0,
  freezeAfterTarget = false,
  renderOnlyWhenTargetPresent = false,
  curveStyle = "auto",
  curveAmplitudePx,
}: Props) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const scheduleComputeRef = React.useRef<number | null>(null);
  const isFrozenRef = React.useRef<boolean>(false);

  // Live config to avoid stale closures in compute()
  const cfgRef = React.useRef({
    anchorSelector,
    anchorSide,
    startOffsetPx,
    extendToViewport,
    recomputeOnScrollView,
    targetSelector,
    targetAnchor,
    targetOffsetPx,
    stopShortPx,
    freezeAfterTarget,
    renderOnlyWhenTargetPresent,
    curveStyle,
    curveAmplitudePx,
  });
  cfgRef.current = {
    anchorSelector,
    anchorSide,
    startOffsetPx,
    extendToViewport,
    recomputeOnScrollView,
    targetSelector,
    targetAnchor,
    targetOffsetPx,
    stopShortPx,
    freezeAfterTarget,
    renderOnlyWhenTargetPresent,
    curveStyle,
    curveAmplitudePx,
  };

  // Geometry produced by compute()
  const [svgSize, setSvgSize] = React.useState<Size>({ width: 0, height: 0 });
  const [line, setLine] = React.useState<Line | null>(null);
  const [pathD, setPathD] = React.useState<string | null>(null);

  // Animation state machine
  type Phase = "hidden" | "entering" | "visible" | "exiting";
  const [phase, setPhase] = React.useState<Phase>("hidden");

  // Render commit (what the DOM currently shows) — grouped to avoid extra renders
  const [renderGeom, setRenderGeom] = React.useState<{
    size: Size;
    line: Line | null;
    pathD: string | null;
  }>({ size: { width: 0, height: 0 }, line: null, pathD: null });

  // Single ref setter for either line or path
  const shapeRef = React.useRef<SVGPathElement | SVGLineElement | null>(null);
  const setShapeRef = React.useCallback(
    (el: SVGPathElement | SVGLineElement | null) => {
      shapeRef.current = el;
    },
    []
  );

  const cleanupTransitionRef = React.useRef<(() => void) | null>(null);
  const transitionFallbackTimerRef = React.useRef<number | null>(null);

  // Stable, URL-safe marker id
  const rawId = React.useId();
  const arrowId = React.useMemo(
    () => `dp-arrow-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [rawId]
  );

  const setSvgSizeIfChanged = React.useCallback((w: number, h: number) => {
    setSvgSize((prev) =>
      prev.width !== w || prev.height !== h ? { width: w, height: h } : prev
    );
  }, []);
  const setLineIfChanged = React.useCallback((next: Line | null) => {
    setLine((prev) => {
      if (!prev || !next) return next;
      return prev.x1 !== next.x1 ||
        prev.y1 !== next.y1 ||
        prev.x2 !== next.x2 ||
        prev.y2 !== next.y2
        ? next
        : prev;
    });
  }, []);
  const setPathIfChanged = React.useCallback((d: string | null) => {
    setPathD((prev) => (prev !== d ? d : prev));
  }, []);

  const compute = React.useCallback(() => {
    const cfg = cfgRef.current;
    if (cfg.freezeAfterTarget && isFrozenRef.current && !cfg.recomputeOnScrollView) return;

    const container = containerRef.current;
    if (!container) return;

    // Measure the host (offsetParent is a reliable "hero" for absolute children)
    const hostEl =
      (container.offsetParent as HTMLElement | null) ||
      container.parentElement ||
      container;
    const hostRect = hostEl.getBoundingClientRect();
    const baseWidth = Math.max(0, Math.floor(hostRect.width));
    const baseHeight = Math.max(0, Math.floor(hostRect.height));
    if (baseWidth === 0 || baseHeight === 0) return;

    const anchor = document.querySelector(cfg.anchorSelector) as
      | HTMLElement
      | null;

    // If no anchor, size the svg to host and render nothing (unchanged behavior).
    if (!anchor) {
      setSvgSizeIfChanged(baseWidth, baseHeight);
      setLineIfChanged(null);
      setPathIfChanged(null);
      return;
    }

    const anchorRect = anchor.getBoundingClientRect();

    // Compute start point relative to host
    let startX = 0;
    let startY = 0;
    switch (cfg.anchorSide) {
      case "right":
        startX = anchorRect.right - hostRect.left + cfg.startOffsetPx;
        startY = anchorRect.top + anchorRect.height / 2 - hostRect.top;
        break;
      case "left":
        startX = anchorRect.left - hostRect.left - cfg.startOffsetPx;
        startY = anchorRect.top + anchorRect.height / 2 - hostRect.top;
        break;
      case "top":
        startX = anchorRect.left + anchorRect.width / 2 - hostRect.left;
        startY = anchorRect.top - hostRect.top - cfg.startOffsetPx;
        break;
      default: /* bottom */
        startX = anchorRect.left + anchorRect.width / 2 - hostRect.left;
        startY = anchorRect.bottom - hostRect.top + cfg.startOffsetPx;
        break;
    }

    // If starting point is outside viewport, don't render
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const startXInViewport = startX + hostRect.left;
    const startYInViewport = startY + hostRect.top;
    if (
      startXInViewport < 0 ||
      startXInViewport > viewportWidth ||
      startYInViewport < 0 ||
      startYInViewport > viewportHeight
    ) {
      setSvgSizeIfChanged(baseWidth, baseHeight);
      setLineIfChanged(null);
      setPathIfChanged(null);
      return;
    }

    // Clamp into base bounds first
    startX = clamp(startX, 0, baseWidth);
    startY = clamp(startY, 0, baseHeight);

    // Target defaults to viewport bottom-right
    const viewportBRX = window.innerWidth - hostRect.left;
    const viewportBRY = window.innerHeight - hostRect.top;

    let targetX = viewportBRX;
    let targetY = viewportBRY;
    let targetEl: HTMLElement | null = null;

    if (cfg.targetSelector) {
      targetEl = document.querySelector(cfg.targetSelector) as
        | HTMLElement
        | null;

      if (!targetEl && cfg.renderOnlyWhenTargetPresent) {
        setSvgSizeIfChanged(baseWidth, baseHeight);
        setLineIfChanged(null);
        setPathIfChanged(null);
        return;
      }

      if (targetEl) {
        const tr = targetEl.getBoundingClientRect();

        let tx = tr.left;
        let ty = tr.top;
        switch (cfg.targetAnchor) {
          case "center":
            tx = tr.left + tr.width / 2;
            ty = tr.top + tr.height / 2;
            break;
          case "top-left":
            tx = tr.left;
            ty = tr.top;
            break;
          case "top":
            tx = tr.left + tr.width / 2;
            ty = tr.top;
            break;
          case "top-right":
            tx = tr.right;
            ty = tr.top;
            break;
          case "right":
            tx = tr.right;
            ty = tr.top + tr.height / 2;
            break;
          case "bottom-right":
            tx = tr.right;
            ty = tr.bottom;
            break;
          case "bottom":
            tx = tr.left + tr.width / 2;
            ty = tr.bottom;
            break;
          case "bottom-left":
            tx = tr.left;
            ty = tr.bottom;
            break;
          case "left":
            tx = tr.left;
            ty = tr.top + tr.height / 2;
            break;
        }

        targetX = tx - hostRect.left + cfg.targetOffsetPx;
        targetY = ty - hostRect.top + cfg.targetOffsetPx;

        if (cfg.stopShortPx > 0) {
          const edgeShift = cfg.stopShortPx;
          const cornerShift = cfg.stopShortPx / Math.SQRT2;
          switch (cfg.targetAnchor) {
            case "top-left":
              targetX -= cornerShift;
              targetY -= cornerShift;
              break;
            case "top":
              targetY -= edgeShift;
              break;
            case "top-right":
              targetX += cornerShift;
              targetY -= cornerShift;
              break;
            case "right":
              targetX += edgeShift;
              break;
            case "bottom-right":
              targetX += cornerShift;
              targetY += cornerShift;
              break;
            case "bottom":
              targetY += edgeShift;
              break;
            case "bottom-left":
              targetX -= cornerShift;
              targetY += cornerShift;
              break;
            case "left":
              targetX -= edgeShift;
              break;
            case "center":
              break;
          }
        }
      }
    }

    let dx = targetX - startX;
    let dy = targetY - startY;

    const extWidth = cfg.extendToViewport
      ? Math.ceil(Math.max(baseWidth, targetX))
      : baseWidth;
    const extHeight = cfg.extendToViewport
      ? Math.ceil(Math.max(baseHeight, targetY))
      : baseHeight;

    // Re-clamp start into extended bounds
    startX = clamp(startX, 0, extWidth);
    startY = clamp(startY, 0, extHeight);

    let endX: number;
    let endY: number;

    if (targetEl) {
      endX = clamp(targetX, 0, extWidth);
      endY = clamp(targetY, 0, extHeight);
    } else {
      // Intersect infinite ray toward BR with ext bounds
      const tRight = dx > 0 ? (extWidth - startX) / dx : Number.POSITIVE_INFINITY;
      const tBottom = dy > 0 ? (extHeight - startY) / dy : Number.POSITIVE_INFINITY;
      let t = Math.min(tRight, tBottom);

      // Fallback: aim toward container BR
      if (!isFinite(t) || t <= 0) {
        dx = extWidth - startX;
        dy = extHeight - startY;
        if (dx === 0 && dy === 0) {
          setSvgSizeIfChanged(extWidth, extHeight);
          setLineIfChanged(null);
          setPathIfChanged(null);
          return;
        }
        const t2Right = dx > 0 ? (extWidth - startX) / dx : Number.POSITIVE_INFINITY;
        const t2Bottom = dy > 0 ? (extHeight - startY) / dy : Number.POSITIVE_INFINITY;
        t = Math.min(t2Right, t2Bottom);
      }
      endX = startX + t * dx;
      endY = startY + t * dy;
    }

    if (cfg.stopShortPx > 0 && !targetEl) {
      const vx = endX - startX;
      const vy = endY - startY;
      const vlen = Math.hypot(vx, vy);
      if (vlen > 0) {
        const clipped = Math.max(0, vlen - cfg.stopShortPx) / vlen;
        endX = startX + vx * clipped;
        endY = startY + vy * clipped;
      }
    }

    setSvgSizeIfChanged(extWidth, extHeight);
    setLineIfChanged({ x1: startX, y1: startY, x2: endX, y2: endY });

    // Curved path (same look)
    if (cfg.curveStyle !== "none") {
      const dxCurve = endX - startX;
      const dyCurve = endY - startY;
      const dist = Math.hypot(dxCurve, dyCurve);

      if (dist > 0) {
        const nx = -dyCurve / dist;
        const ny = dxCurve / dist;

        const baseAmp =
          cfg.curveAmplitudePx ??
          (() => {
            const maxByDist = dist * 0.5;
            const maxByBox = Math.min(extWidth, extHeight) * 0.5;
            return Math.max(24, Math.min(240, Math.min(maxByDist, maxByBox)));
          })();
        const sign = -1;

        const baseC1x = startX + dxCurve * 0.1;
        const baseC1y = startY + dyCurve * 0.1;
        const baseC2x = startX + dxCurve * 0.67;
        const baseC2y = startY + dyCurve * 0.67;

        const margin = 1;
        const candidates: number[] = [baseAmp];

        const pushBound = (numerator: number, denominator: number) => {
          if (denominator !== 0) {
            const v = numerator / denominator;
            if (isFinite(v) && v >= 0) candidates.push(v);
          }
        };

        const nxSign = nx * sign;
        if (nxSign > 0) {
          pushBound(extWidth - margin - baseC1x, nxSign);
          pushBound(extWidth - margin - baseC2x, nxSign);
        } else if (nxSign < 0) {
          pushBound(margin - baseC1x, nxSign);
          pushBound(margin - baseC2x, nxSign);
        }

        const nySign = ny * sign;
        if (nySign > 0) {
          pushBound(extHeight - margin - baseC1y, nySign);
          pushBound(extHeight - margin - baseC2y, nySign);
        } else if (nySign < 0) {
          pushBound(margin - baseC1y, nySign);
          pushBound(margin - baseC2y, nySign);
        }

        const amp = Math.max(0, Math.min(...candidates));
        const c1x = baseC1x + nx * amp * sign;
        const c1y = baseC1y + ny * amp * sign;
        const c2x = baseC2x + nx * amp * sign;
        const c2y = baseC2y + ny * amp * sign;

        setPathIfChanged(
          `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`
        );
      } else {
        setPathIfChanged(null);
      }
    } else {
      setPathIfChanged(null);
    }

    if (cfg.freezeAfterTarget && cfg.targetSelector && document.querySelector(cfg.targetSelector)) {
      isFrozenRef.current = true;
    }
  }, [setSvgSizeIfChanged, setLineIfChanged, setPathIfChanged]);

  // RAF-throttled scheduler (deduped)
  const scheduleCompute = React.useCallback(() => {
    if (scheduleComputeRef.current != null) cancelAnimationFrame(scheduleComputeRef.current);
    scheduleComputeRef.current = requestAnimationFrame(compute);
  }, [compute]);

  // Setup observers & listeners
  React.useLayoutEffect(() => {
    const ro = new ResizeObserver(scheduleCompute);
    const container = containerRef.current;
    if (container) ro.observe(container);

    const anchor = document.querySelector(anchorSelector) as HTMLElement | null;
    if (anchor) ro.observe(anchor);

    let mo: MutationObserver | null = null;
    const maybeHookTarget = () => {
      if (!targetSelector) return;
      const t = document.querySelector(targetSelector) as HTMLElement | null;
      if (t) {
        try {
          ro.observe(t);
        } catch {}
        scheduleCompute();
        if (freezeAfterTarget && mo) mo.disconnect();
      }
    };

    if (targetSelector) {
      mo = new MutationObserver(maybeHookTarget);
      // childList only, subtree = true (attributes not needed)
      mo.observe(document.documentElement, { childList: true, subtree: true });
      maybeHookTarget();
    }

    // Window listeners
    const onResize = scheduleCompute;
    window.addEventListener("resize", onResize);

    let onScroll: ((e: Event) => void) | null = null;
    if (recomputeOnScrollView) {
      onScroll = () => {
        const anchorEl = document.querySelector(anchorSelector) as HTMLElement | null;
        if (!anchorEl) return;
        const r = anchorEl.getBoundingClientRect();
        const inViewport =
          r.bottom >= 0 &&
          r.right >= 0 &&
          r.top <= window.innerHeight &&
          r.left <= window.innerWidth;
        if (inViewport) scheduleCompute();
      };
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // Initial compute
    scheduleCompute();

    return () => {
      if (scheduleComputeRef.current != null) cancelAnimationFrame(scheduleComputeRef.current);
      window.removeEventListener("resize", onResize);
      if (onScroll) window.removeEventListener("scroll", onScroll);
      if (mo) mo.disconnect();
      ro.disconnect();
    };
  }, [anchorSelector, targetSelector, recomputeOnScrollView, freezeAfterTarget, scheduleCompute]);

  // Derived visibility from current compute
  const hasComputedGeom = svgSize.width > 0 && svgSize.height > 0 && !!line;

  // Phase transitions & committing geometry to the DOM-facing state
  React.useEffect(() => {
    if (cleanupTransitionRef.current) {
      cleanupTransitionRef.current();
      cleanupTransitionRef.current = null;
    }

    if (hasComputedGeom) {
      if (phase === "hidden" || phase === "exiting") {
        setRenderGeom({ size: svgSize, line, pathD });
        setPhase("entering");
        return;
      }
      if (phase === "visible" || phase === "entering") {
        // update without re-triggering animation
        setRenderGeom((prev) => {
          const sizeChanged =
            prev.size.width !== svgSize.width || prev.size.height !== svgSize.height;
          const lineChanged =
            !prev.line ||
            !line ||
            prev.line.x1 !== line.x1 ||
            prev.line.y1 !== line.y1 ||
            prev.line.x2 !== line.x2 ||
            prev.line.y2 !== line.y2;
          const pathChanged = prev.pathD !== pathD;
          if (!sizeChanged && !lineChanged && !pathChanged) return prev;
          return { size: svgSize, line, pathD };
        });
      }
    } else {
      if (phase === "visible" || phase === "entering") {
        setPhase("exiting");
      } else if (phase !== "exiting") {
        setRenderGeom({ size: { width: 0, height: 0 }, line: null, pathD: null });
        setPhase("hidden");
      }
    }
  }, [hasComputedGeom, svgSize, line, pathD, phase]);

  // Stroke-dash animation (identical look; pathLength=1)
  React.useEffect(() => {
    const el = shapeRef.current as SVGPathElement | SVGLineElement | null;
    if (!el) return;

    // Clean any previous listeners/timers
    if (cleanupTransitionRef.current) {
      cleanupTransitionRef.current();
      cleanupTransitionRef.current = null;
    }
    if (transitionFallbackTimerRef.current != null) {
      clearTimeout(transitionFallbackTimerRef.current);
      transitionFallbackTimerRef.current = null;
    }

    const onTransitionEnd = (e: Event) => {
      const te = e as unknown as TransitionEvent;
      if (te.propertyName !== "stroke-dashoffset") return;

      if (phase === "entering") {
        el.style.transition = "none";
        el.style.strokeDashoffset = "0";
        el.style.strokeDasharray = "none"; // solid when idle
        // force reflow
        void el.getBoundingClientRect();
        try {
          el.setAttribute("marker-end", `url(#${arrowId})`);
        } catch {}
        setPhase("visible");
        if (transitionFallbackTimerRef.current != null) {
          clearTimeout(transitionFallbackTimerRef.current);
          transitionFallbackTimerRef.current = null;
        }
      } else if (phase === "exiting") {
        setPhase("hidden");
        setRenderGeom({ size: { width: 0, height: 0 }, line: null, pathD: null });
        if (transitionFallbackTimerRef.current != null) {
          clearTimeout(transitionFallbackTimerRef.current);
          transitionFallbackTimerRef.current = null;
        }
      }
    };

    if (phase === "entering") {
      try {
        el.removeAttribute("marker-end");
      } catch {}
      el.style.transition = "none";
      el.style.strokeDasharray = "1";
      el.style.strokeDashoffset = "1";
      requestAnimationFrame(() => {
        void el.getBoundingClientRect();
        el.style.transition = `stroke-dashoffset ${ENTER_MS}ms ease-out`;
        el.style.strokeDashoffset = "0";
      });
      el.addEventListener("transitionend", onTransitionEnd);
      cleanupTransitionRef.current = () => el.removeEventListener("transitionend", onTransitionEnd);

      transitionFallbackTimerRef.current = window.setTimeout(() => {
        onTransitionEnd(
          new TransitionEvent("transitionend", { propertyName: "stroke-dashoffset" })
        );
      }, ENTER_MS + 60);
    } else if (phase === "exiting") {
      try {
        el.removeAttribute("marker-end");
      } catch {}
      el.style.transition = "none";
      el.style.strokeDasharray = "1";
      el.style.strokeDashoffset = "0";
      requestAnimationFrame(() => {
        void el.getBoundingClientRect();
        el.style.transition = `stroke-dashoffset ${EXIT_MS}ms ease-in`;
        el.style.strokeDashoffset = "1";
      });
      el.addEventListener("transitionend", onTransitionEnd);
      cleanupTransitionRef.current = () => el.removeEventListener("transitionend", onTransitionEnd);

      transitionFallbackTimerRef.current = window.setTimeout(() => {
        onTransitionEnd(
          new TransitionEvent("transitionend", { propertyName: "stroke-dashoffset" })
        );
      }, EXIT_MS + 60);
    } else if (phase === "visible") {
      el.style.transition = "none";
      el.style.strokeDasharray = "none";
      el.style.strokeDashoffset = "0";
      try {
        el.setAttribute("marker-end", `url(#${arrowId})`);
      } catch {}
    }

    return () => {
      if (cleanupTransitionRef.current) {
        cleanupTransitionRef.current();
        cleanupTransitionRef.current = null;
      }
      if (transitionFallbackTimerRef.current != null) {
        clearTimeout(transitionFallbackTimerRef.current);
        transitionFallbackTimerRef.current = null;
      }
    };
  }, [phase, arrowId]);

  // Render values derived from committed geometry
  const { size: renderSize, line: renderLine, pathD: renderPathD } = renderGeom;
  const renderWidth = phase === "hidden" ? 0 : renderSize.width;
  const renderHeight = phase === "hidden" ? 0 : renderSize.height;
  const activeLine = phase === "hidden" ? null : renderLine;
  const activePathD = phase === "hidden" ? null : renderPathD;

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute left-0 top-0 ${containerClassName ?? ""}`}
      style={{ width: renderWidth, height: renderHeight }}
      aria-hidden="true"
    >
      {renderWidth > 0 && renderHeight > 0 && activeLine && (
        <svg
          className={className}
          width="100%"
          height="100%"
          viewBox={`0 0 ${renderWidth} ${renderHeight}`}
          preserveAspectRatio="none"
          role="presentation"
          style={{ overflow: "visible" }}
        >
          <defs>
            <marker
              id={arrowId}
              viewBox="0 0 6 6"
              refX={MARKER_REFX}
              refY="3"
              markerWidth="13"
              markerHeight="13"
              markerUnits="strokeWidth"
              orient="auto-start-reverse"
            >
              {/* exact path, unchanged */}
              <path d="M 1.5 0.8 L 6 3 L 1.5 5.2 L 4.6 3" fill="currentColor" />
            </marker>
          </defs>

          {activePathD && curveStyle !== "none" ? (
            <path
              ref={setShapeRef}
              d={activePathD}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap={phase === "visible" ? "butt" : "round"}
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              style={{ willChange: "stroke-dashoffset" }}
              {...(phase === "visible" ? { markerEnd: `url(#${arrowId})` } : {})}
            />
          ) : (
            <line
              ref={setShapeRef}
              x1={activeLine.x1}
              y1={activeLine.y1}
              x2={activeLine.x2}
              y2={activeLine.y2}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap={phase === "visible" ? "butt" : "round"}
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              style={{ willChange: "stroke-dashoffset" }}
              {...(phase === "visible" ? { markerEnd: `url(#${arrowId})` } : {})}
            />
          )}

          {showEndpoints && (
            <>
              <circle
                cx={activeLine.x1}
                cy={activeLine.y1}
                r={Math.max(2, strokeWidth * 0.9)}
                fill="currentColor"
              />
              <circle
                cx={activeLine.x2}
                cy={activeLine.y2}
                r={Math.max(2, strokeWidth * 0.9)}
                fill="currentColor"
              />
            </>
          )}
        </svg>
      )}
    </div>
  );
}

// Prevent unnecessary re-renders from parents when props are unchanged
const CurvedArrow = React.memo(CurvedArrowInner);
export default CurvedArrow;