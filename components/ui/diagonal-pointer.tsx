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
  recomputeOnScroll?: boolean;
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
  strokeDasharray?: string;
  curveStyle?: "none" | "auto";
  curveAmplitudePx?: number;
};

type Size = { width: number; height: number };
type Line = { x1: number; y1: number; x2: number; y2: number };

const clamp = (v: number, min: number, max: number) =>
  v < min ? min : v > max ? max : v;

export default function DiagonalPointer({
  anchorSelector,
  anchorSide = "right",
  startOffsetPx = 8,
  strokeWidth = 2,
  className,
  containerClassName,
  showEndpoints = false,
  extendToViewport = true,
  recomputeOnScroll = false,
  targetSelector,
  targetAnchor = "center",
  targetOffsetPx = 0,
  stopShortPx = 0,
  freezeAfterTarget = false,
  renderOnlyWhenTargetPresent = false,
  strokeDasharray,
  curveStyle = "auto",
  curveAmplitudePx,
}: Props) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const scheduleComputeRef = React.useRef<number | null>(null);
  const isFrozenRef = React.useRef<boolean>(false);

  // Keep a single “live config” ref so compute() never closes over stale props.
  const cfgRef = React.useRef({
    anchorSelector,
    anchorSide,
    startOffsetPx,
    extendToViewport,
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
    targetSelector,
    targetAnchor,
    targetOffsetPx,
    stopShortPx,
    freezeAfterTarget,
    renderOnlyWhenTargetPresent,
    curveStyle,
    curveAmplitudePx,
  };

  const [svgSize, setSvgSize] = React.useState<Size>({ width: 0, height: 0 });
  const [line, setLine] = React.useState<Line | null>(null);
  const [pathD, setPathD] = React.useState<string | null>(null);

  // Stable, URL-safe marker id (avoids hydration/randomness issues).
  const rawId = React.useId();
  const arrowId = React.useMemo(
    () => `dp-arrow-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [rawId]
  );

  const setSvgSizeIfChanged = React.useCallback((w: number, h: number) => {
    setSvgSize((prev) => (prev.width !== w || prev.height !== h ? { width: w, height: h } : prev));
  }, []);
  const setLineIfChanged = React.useCallback((next: Line | null) => {
    setLine((prev) => {
      if (!prev || !next) return next;
      return (prev.x1 !== next.x1 || prev.y1 !== next.y1 || prev.x2 !== next.x2 || prev.y2 !== next.y2)
        ? next
        : prev;
    });
  }, []);
  const setPathIfChanged = React.useCallback((d: string | null) => {
    setPathD((prev) => (prev !== d ? d : prev));
  }, []);

  const compute = React.useCallback(() => {
    const cfg = cfgRef.current;
    if (cfg.freezeAfterTarget && isFrozenRef.current) return;

    const container = containerRef.current;
    if (!container) return;

    // Measure the host (offsetParent is a reliable “hero” for absolute children)
    const hostEl = (container.offsetParent as HTMLElement | null) || container.parentElement || container;
    const hostRect = hostEl.getBoundingClientRect();
    const baseWidth = Math.max(0, Math.floor(hostRect.width));
    const baseHeight = Math.max(0, Math.floor(hostRect.height));
    if (baseWidth === 0 || baseHeight === 0) return;

    const anchor = document.querySelector(cfg.anchorSelector) as HTMLElement | null;

    // If no anchor, we size the svg to host and render nothing (unchanged behavior).
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
      targetEl = document.querySelector(cfg.targetSelector) as HTMLElement | null;

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
            tx = tr.left; ty = tr.top; break;
          case "top":
            tx = tr.left + tr.width / 2; ty = tr.top; break;
          case "top-right":
            tx = tr.right; ty = tr.top; break;
          case "right":
            tx = tr.right; ty = tr.top + tr.height / 2; break;
          case "bottom-right":
            tx = tr.right; ty = tr.bottom; break;
          case "bottom":
            tx = tr.left + tr.width / 2; ty = tr.bottom; break;
          case "bottom-left":
            tx = tr.left; ty = tr.bottom; break;
          case "left":
            tx = tr.left; ty = tr.top + tr.height / 2; break;
        }

        targetX = tx - hostRect.left + cfg.targetOffsetPx;
        targetY = ty - hostRect.top + cfg.targetOffsetPx;

        if (cfg.stopShortPx > 0) {
          const edgeShift = cfg.stopShortPx;
          const cornerShift = cfg.stopShortPx / Math.SQRT2;
          switch (cfg.targetAnchor) {
            case "top-left": targetX -= cornerShift; targetY -= cornerShift; break;
            case "top": targetY -= edgeShift; break;
            case "top-right": targetX += cornerShift; targetY -= cornerShift; break;
            case "right": targetX += edgeShift; break;
            case "bottom-right": targetX += cornerShift; targetY += cornerShift; break;
            case "bottom": targetY += edgeShift; break;
            case "bottom-left": targetX -= cornerShift; targetY += cornerShift; break;
            case "left": targetX -= edgeShift; break;
            case "center": break;
          }
        }
      }
    }

    let dx = targetX - startX;
    let dy = targetY - startY;

    const extWidth = cfg.extendToViewport ? Math.ceil(Math.max(baseWidth, targetX)) : baseWidth;
    const extHeight = cfg.extendToViewport ? Math.ceil(Math.max(baseHeight, targetY)) : baseHeight;

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

    // Curved path (same look; just compute+commit with change checks)
    if (cfg.curveStyle !== "none") {
      const dxCurve = endX - startX;
      const dyCurve = endY - startY;
      const dist = Math.hypot(dxCurve, dyCurve);

      if (dist > 0) {
        const nx = -dyCurve / dist;
        const ny = dxCurve / dist;
        // Make it curvier by default but keep within view via clamping below
        const baseAmp = cfg.curveAmplitudePx ?? (() => {
          const maxByDist = dist * 0.5; // more pronounced baseline curvature
          const maxByBox = Math.min(extWidth, extHeight) * 0.5; // scale to viewport/host
          return Math.max(24, Math.min(240, Math.min(maxByDist, maxByBox)));
        })();
        const sign = -1;

        // Shift control points to 1/3 and 2/3 along the path for a smoother arc
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

        setPathIfChanged(`M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`);
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

  // Schedule compute on next animation frame (shared handler)
  const scheduleCompute = React.useCallback(() => {
    if (scheduleComputeRef.current != null) cancelAnimationFrame(scheduleComputeRef.current);
    scheduleComputeRef.current = requestAnimationFrame(compute);
  }, [compute]);

  // Use layout effect so first paint already has the correct geometry (less flicker)
  React.useLayoutEffect(() => {
    const ro = new ResizeObserver(scheduleCompute);
    const container = containerRef.current;

    if (container) ro.observe(container);

    // Observe anchor if present
    const anchor = document.querySelector(anchorSelector) as HTMLElement | null;
    if (anchor) ro.observe(anchor);

    // Optionally observe the target element (when we have a selector)
    let mo: MutationObserver | null = null;
    const maybeHookTarget = () => {
      if (!targetSelector) return;
      const t = document.querySelector(targetSelector) as HTMLElement | null;
      if (t) {
        try { ro.observe(t); } catch { }
        scheduleCompute();
        if (freezeAfterTarget && mo) mo.disconnect();
      }
    };

    if (targetSelector) {
      mo = new MutationObserver(maybeHookTarget);
      mo.observe(document.documentElement, { childList: true, subtree: true });
      maybeHookTarget();
    }

    // Window listeners
    const onResize = scheduleCompute;
    window.addEventListener("resize", onResize);
    if (recomputeOnScroll) {
      window.addEventListener("scroll", onResize, { passive: true });
    }

    // Initial compute
    scheduleCompute();

    return () => {
      if (scheduleComputeRef.current != null) cancelAnimationFrame(scheduleComputeRef.current);
      window.removeEventListener("resize", onResize);
      if (recomputeOnScroll) window.removeEventListener("scroll", onResize);
      if (mo) mo.disconnect();
      ro.disconnect();
    };
  }, [anchorSelector, targetSelector, recomputeOnScroll, freezeAfterTarget, scheduleCompute]);

  const { width, height } = svgSize;

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute left-0 top-0 ${containerClassName ?? ""}`}
      style={{ width, height }}
    >
      {width > 0 && height > 0 && line && (
        <svg
          className={className}
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          role="presentation"
          style={{ overflow: "visible" }}
        >
          <defs>
            <marker
              id={arrowId}
              viewBox="0 0 6 6"
              refX="6"
              refY="3"
              markerWidth="13"
              markerHeight="13"
              markerUnits="strokeWidth"
              orient="auto-start-reverse"
            >
              {/* NOTE: kept the exact path data to avoid any visual changes */}
              <path d="M 1.5 0.8 L 6 3 L 1.5 5.2 L 4.6 3 L" fill="currentColor" />
            </marker>
          </defs>

          {pathD && curveStyle !== "none" ? (
            <path
              d={pathD}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              {...(strokeDasharray ? { strokeDasharray } : {})}
              markerEnd={`url(#${arrowId})`}
            />
          ) : (
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              {...(strokeDasharray ? { strokeDasharray } : {})}
              markerEnd={`url(#${arrowId})`}
            />
          )}

          {showEndpoints && (
            <>
              <circle cx={line.x1} cy={line.y1} r={Math.max(2, strokeWidth * 0.9)} fill="currentColor" />
              <circle cx={line.x2} cy={line.y2} r={Math.max(2, strokeWidth * 0.9)} fill="currentColor" />
            </>
          )}
        </svg>
      )}
    </div>
  );
}