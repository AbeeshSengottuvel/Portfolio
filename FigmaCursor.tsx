import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const FigmaCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [tiltAngle, setTiltAngle] = useState(0);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // 1. Leader cursor (Zero latency, always leads at the front)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // 2. Chained follower springs (5 cursors flowing in the back with cascading delay)
  const s1X = useSpring(cursorX, { stiffness: 650, damping: 32 });
  const s1Y = useSpring(cursorY, { stiffness: 650, damping: 32 });

  const s2X = useSpring(s1X, { stiffness: 540, damping: 29 });
  const s2Y = useSpring(s1Y, { stiffness: 540, damping: 29 });

  const s3X = useSpring(s2X, { stiffness: 450, damping: 27 });
  const s3Y = useSpring(s2Y, { stiffness: 450, damping: 27 });

  const s4X = useSpring(s3X, { stiffness: 370, damping: 25 });
  const s4Y = useSpring(s3Y, { stiffness: 370, damping: 25 });

  const s5X = useSpring(s4X, { stiffness: 300, damping: 23 });
  const s5Y = useSpring(s4Y, { stiffness: 300, damping: 23 });

  // 5 Followers ordered from back (lowest z-index) to front
  const followers = [
    {
      id: 5,
      x: s5X,
      y: s5Y,
      scale: 0.64,
      opacity: 0.18,
      tiltMult: 0.35,
      color: "#818cf8", // soft indigo
      stroke: "#c7d2fe",
      zIndex: 11,
    },
    {
      id: 4,
      x: s4X,
      y: s4Y,
      scale: 0.72,
      opacity: 0.28,
      tiltMult: 0.5,
      color: "#6366f1", // indigo
      stroke: "#a5b4fc",
      zIndex: 12,
    },
    {
      id: 3,
      x: s3X,
      y: s3Y,
      scale: 0.8,
      opacity: 0.4,
      tiltMult: 0.65,
      color: "#38bdf8", // cyan
      stroke: "#7dd3fc",
      zIndex: 13,
    },
    {
      id: 2,
      x: s2X,
      y: s2Y,
      scale: 0.88,
      opacity: 0.54,
      tiltMult: 0.8,
      color: "#60a5fa", // sky blue
      stroke: "#bfdbfe",
      zIndex: 14,
    },
    {
      id: 1,
      x: s1X,
      y: s1Y,
      scale: 0.94,
      opacity: 0.7,
      tiltMult: 0.92,
      color: "#3b82f6", // royal blue
      stroke: "#93c5fd",
      zIndex: 15,
    },
  ];

  const lastPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Revert to native cursor on touch devices
    const handleTouchStart = () => {
      setIsEnabled(false);
      document.body.classList.remove("has-custom-cursor");
    };
    window.addEventListener("touchstart", handleTouchStart, {
      passive: true,
      once: true,
    });

    document.body.classList.add("has-custom-cursor");

    let animId: number;
    let currentTilt = 0;
    let targetTilt = 0;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const dx = e.clientX - lastPos.current.x;
      lastPos.current = { x: e.clientX, y: e.clientY };

      // Flowing aerodynamic banking: tilt angles into motion
      targetTilt = Math.max(-24, Math.min(24, dx * 1.5));

      // Check if hovering interactive elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        target.closest("button, a, [role='button'], input, select, textarea")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const newRipple: Ripple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-2), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 500);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Smooth spring tilt damping loop
    const loop = () => {
      currentTilt += (targetTilt - currentTilt) * 0.18;
      targetTilt *= 0.88; // smoothly return upright when stopping
      setTiltAngle(currentTilt);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isEnabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden transition-opacity duration-200"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Click ripple animation */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0.2, opacity: 0.95 }}
            animate={{ scale: 2.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none fixed w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-500 shadow-sm shadow-blue-500/50"
            style={{ left: r.x, top: r.y }}
          />
        ))}
      </AnimatePresence>

      {/* 5 Follower Cursors flowing in the back (rendered back-to-front) */}
      {followers.map((f) => (
        <motion.div
          key={f.id}
          className="fixed top-0 left-0 pointer-events-none"
          style={{
            x: f.x,
            y: f.y,
            zIndex: f.zIndex,
          }}
        >
          <div
            style={{
              transform: `translate(-5.5px, -3.2px) rotate(${
                tiltAngle * f.tiltMult
              }deg) scale(${
                isClicking
                  ? f.scale * 0.85
                  : isHovering
                  ? f.scale * 1.15
                  : f.scale
              })`,
              transformOrigin: "5.5px 3.2px",
              opacity: f.opacity,
            }}
            className="transition-transform duration-75"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-[0_2px_6px_rgba(37,99,235,0.3)]"
            >
              <path
                d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.86a.5.5 0 0 0-.85.35Z"
                fill={f.color}
                stroke={f.stroke}
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>
      ))}

      {/* 1 Primary Leader Cursor Arrow (Always in the front at highest z-index) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-20"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          style={{
            transformOrigin: "5.5px 3.2px",
          }}
          animate={{
            scale: isClicking ? 0.84 : isHovering ? 1.18 : 1,
            rotate: isHovering ? -10 + tiltAngle : tiltAngle,
          }}
          transition={{ type: "spring", stiffness: 550, damping: 28 }}
          className="-translate-x-[5.5px] -translate-y-[3.2px]"
        >
          {/* Subtle glowing halo on hover */}
          {isHovering && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.4 }}
              className="absolute inset-0 bg-blue-500 rounded-full blur-md"
            />
          )}

          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_3px_10px_rgba(37,99,235,0.6)] relative z-10"
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
