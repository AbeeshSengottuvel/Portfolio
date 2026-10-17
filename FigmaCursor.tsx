import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

// Spring configuration tuned to critical damping (no ringing, organic follow-through)
const SPRING_CONFIG = {
  leader: { stiffness: 800, damping: 35, mass: 0.2 },
  followers: [
    { stiffness: 650, damping: 32, mass: 0.35, scale: 0.94, opacity: 0.7, color: "#3b82f6", stroke: "#93c5fd", z: 15 },
    { stiffness: 540, damping: 29, mass: 0.45, scale: 0.88, opacity: 0.54, color: "#60a5fa", stroke: "#bfdbfe", z: 14 },
    { stiffness: 450, damping: 27, mass: 0.55, scale: 0.80, opacity: 0.40, color: "#38bdf8", stroke: "#7dd3fc", z: 13 },
    { stiffness: 370, damping: 25, mass: 0.65, scale: 0.72, opacity: 0.28, color: "#6366f1", stroke: "#a5b4fc", z: 12 },
    { stiffness: 300, damping: 23, mass: 0.75, scale: 0.64, opacity: 0.18, color: "#818cf8", stroke: "#c7d2fe", z: 11 },
  ],
};

export const FigmaCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Raw hardware cursor positions
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Aerodynamic banking driven strictly via MotionValues without React reconciliation passes
  const tiltRaw = useMotionValue(0);
  const smoothTilt = useSpring(tiltRaw, { stiffness: 320, damping: 22, mass: 0.4 });

  // Cascading follower springs
  const s1X = useSpring(rawX, SPRING_CONFIG.followers[0]);
  const s1Y = useSpring(rawY, SPRING_CONFIG.followers[0]);

  const s2X = useSpring(s1X, SPRING_CONFIG.followers[1]);
  const s2Y = useSpring(s1Y, SPRING_CONFIG.followers[1]);

  const s3X = useSpring(s2X, SPRING_CONFIG.followers[2]);
  const s3Y = useSpring(s2Y, SPRING_CONFIG.followers[2]);

  const s4X = useSpring(s3X, SPRING_CONFIG.followers[3]);
  const s4Y = useSpring(s3Y, SPRING_CONFIG.followers[3]);

  const s5X = useSpring(s4X, SPRING_CONFIG.followers[4]);
  const s5Y = useSpring(s4Y, SPRING_CONFIG.followers[4]);

  const followerSprings = [
    { x: s1X, y: s1Y, cfg: SPRING_CONFIG.followers[0] },
    { x: s2X, y: s2Y, cfg: SPRING_CONFIG.followers[1] },
    { x: s3X, y: s3Y, cfg: SPRING_CONFIG.followers[2] },
    { x: s4X, y: s4Y, cfg: SPRING_CONFIG.followers[3] },
    { x: s5X, y: s5Y, cfg: SPRING_CONFIG.followers[4] },
  ];

  const lastEventTime = useRef(performance.now());
  const lastX = useRef(-100);

  useEffect(() => {
    // Media query check for reduced motion or coarse touch pointers
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || hasCoarsePointer) {
      setIsEnabled(false);
      return;
    }

    document.body.classList.add("has-custom-cursor");

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastEventTime.current);
      const dx = e.clientX - lastX.current;

      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Banking angle directly proportional to horizontal velocity (px/ms)
      const velocityX = dx / dt;
      tiltRaw.set(Math.max(-20, Math.min(20, velocityX * 14)));

      lastX.current = e.clientX;
      lastEventTime.current = now;

      // Event delegation hit-testing for interactive elements
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest("button, a, [role='button'], input, select, textarea, [data-interactive='true']")
      );
      setIsHovering(isInteractive);
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const id = performance.now();
      setRipples((prev) => [...prev.slice(-2), { id, x: e.clientX, y: e.clientY }]);
    };

    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => {
      setIsVisible(false);
      tiltRaw.set(0);
    };
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible, rawX, rawY, tiltRaw]);

  if (!isEnabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden will-change-transform"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 160ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      aria-hidden="true"
    >
      {/* Click ripple animation */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: 2.4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() =>
              setRipples((prev) => prev.filter((item) => item.id !== r.id))
            }
            className="pointer-events-none fixed w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.6)]"
            style={{ left: r.x, top: r.y }}
          />
        ))}
      </AnimatePresence>

      {/* 5 Follower Cursors flowing in the back (rendered back-to-front) */}
      {followerSprings.map(({ x, y, cfg }, idx) => (
        <FollowerCursor
          key={idx}
          x={x}
          y={y}
          tilt={smoothTilt}
          scale={isClicking ? cfg.scale * 0.86 : isHovering ? cfg.scale * 1.12 : cfg.scale}
          opacity={cfg.opacity}
          color={cfg.color}
          stroke={cfg.stroke}
          zIndex={cfg.z}
        />
      ))}

      {/* Primary Leader Cursor Arrow (Always in the front at highest z-index) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-20 will-change-transform"
        style={{
          x: rawX,
          y: rawY,
          rotate: smoothTilt,
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.82 : isHovering ? 1.15 : 1,
          }}
          transition={{ type: "spring", stiffness: 600, damping: 30 }}
          className="-translate-x-[5.5px] -translate-y-[3.2px]"
        >
          {isHovering && (
            <motion.div
              layoutId="cursor-glow"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 0.35 }}
              className="absolute inset-0 bg-blue-500 rounded-full blur-md"
            />
          )}

          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            className="filter drop-shadow-[0_4px_12px_rgba(37,99,235,0.45)]"
          >
            <path
              d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z"
              fill="#2563eb"
              stroke="#ffffff"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Isolated pure component to avoid re-evaluating SVG geometry on re-renders
const FollowerCursor: React.FC<{
  x: any;
  y: any;
  tilt: any;
  scale: number;
  opacity: number;
  color: string;
  stroke: string;
  zIndex: number;
}> = React.memo(({ x, y, tilt, scale, opacity, color, stroke, zIndex }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none will-change-transform"
      style={{ x, y, rotate: tilt, zIndex }}
    >
      <div
        style={{
          transform: `translate(-5.5px, -3.2px) scale(${scale})`,
          opacity,
          transformOrigin: "5.5px 3.2px",
        }}
        className="transition-transform duration-100 ease-out"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z"
            fill={color}
            stroke={stroke}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </motion.div>
  );
});
