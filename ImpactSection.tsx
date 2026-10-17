import React, { useEffect, useRef, useState } from "react";

// Exponential ease-out matching Apple Core Animation timing
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

interface CounterConfig {
  from: number;
  to: number;
  prefix?: string;
  suffix?: string;
  isCountDown?: boolean;
}

export const ImpactSection: React.FC<{ isDarkMode?: boolean }> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Raw number display states
  const [stat1, setStat1] = useState(0);
  const [showStat1Plus, setShowStat1Plus] = useState(false);
  const [stat2, setStat2] = useState(0);
  const [stat3, setStat3] = useState(100);

  useEffect(() => {
    // Accessibility check: evaluate user motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const onMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", onMotionChange);

    // Single-fire IntersectionObserver (threshold 0.3, never replays on re-scroll)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", onMotionChange);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    if (prefersReducedMotion) {
      setStat1(310);
      setShowStat1Plus(true);
      setStat2(60);
      setStat3(5);
      return;
    }

    const duration = 1400; // ms
    let startTime: number | null = null;
    let animId: number;

    const animateCounters = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);

      // Stat 1: 0 -> 310
      const current1 = Math.round(0 + (310 - 0) * eased);
      setStat1(current1);

      // Stat 2: 0 -> 60
      const current2 = Math.round(0 + (60 - 0) * eased);
      setStat2(current2);

      // Stat 3: 100 -> 5 (Dramatized defect containment drop)
      const current3 = Math.round(100 - (100 - 5) * eased);
      setStat3(current3);

      if (progress < 1) {
        animId = requestAnimationFrame(animateCounters);
      } else {
        // Fade in '+' after count hits target
        setTimeout(() => setShowStat1Plus(true), 60);
      }
    };

    animId = requestAnimationFrame(animateCounters);

    return () => cancelAnimationFrame(animId);
  }, [isVisible, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="impact-root py-20 md:py-32 scroll-mt-20"
      aria-label="Impact and Performance Metrics"
    >
      <style>{`
        :root {
          --impact-bg-subtle: #FAFAF9;
          --impact-text-primary: #0F172A;
          --impact-text-secondary: #64748B;
          --impact-hairline: #E5E7EB;
          --impact-accent: #1D4ED8; /* Unified Royal Blue Accent matching site identity */
        }
        .dark {
          --impact-bg-subtle: #0B0F14;
          --impact-text-primary: #F8FAFC;
          --impact-text-secondary: #94A3B8;
          --impact-hairline: #1E293B;
          --impact-accent: #60A5FA; /* Accessible high-contrast blue for dark surface */
        }

        .impact-cubic {
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>

      {/* Section Header */}
      <div className="mb-14 md:mb-20">
        <h2
          className={`text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[var(--impact-text-primary)] impact-cubic transition-all duration-[600ms] ${
            isVisible || prefersReducedMotion
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          Impact by the Numbers
        </h2>
        <div
          className={`h-1 bg-[var(--impact-accent)] origin-left impact-cubic transition-transform duration-[700ms] delay-[150ms] mt-4 w-14 md:w-20 ${
            isVisible || prefersReducedMotion ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </div>

      {/* Screen reader live region announcing the settled impact metrics */}
      <div className="sr-only" aria-live="polite">
        {isVisible &&
          "310 plus Automated Test Assets, 60 percent Faster Regression Turnaround, less than 5 percent Defect Leakage Rate."}
      </div>

      {/* Editorial Hairline Grid Layout */}
      <div className="border-t border-b border-[var(--impact-hairline)] grid grid-cols-1 md:grid-cols-12">
        {/* STAT 1: Anchor Stat (Asymmetric Visual Weight: 5 Columns) */}
        <div
          style={{ transitionDelay: prefersReducedMotion ? "0ms" : "0ms" }}
          className={`md:col-span-5 py-8 md:py-12 md:pr-10 md:border-r border-[var(--impact-hairline)] impact-cubic transition-all duration-[700ms] group cursor-default ${
            isVisible || prefersReducedMotion
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Hero Tabular Figure with Single Accent Allocation */}
              <div
                className="text-6xl md:text-7xl lg:text-8xl font-sans font-extrabold tracking-tight tabular-nums leading-none text-[var(--impact-accent)] mb-4 will-change-transform"
                aria-hidden="true"
              >
                <span>{stat1}</span>
                <span
                  className={`inline-block ml-0.5 text-[0.8em] font-bold transition-opacity duration-200 ${
                    showStat1Plus ? "opacity-100" : "opacity-0"
                  }`}
                >
                  +
                </span>
              </div>

              {/* Label */}
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[var(--impact-text-primary)] mb-2">
                Automated Test Assets
              </h3>

              {/* Muted Editorial Description with Tech Stack */}
              <p className="text-sm md:text-base text-[var(--impact-text-secondary)] leading-relaxed max-w-sm">
                Production-grade end-to-end and API suites engineered across{" "}
                <span className="text-[var(--impact-text-primary)] font-medium">
                  Playwright
                </span>
                ,{" "}
                <span className="text-[var(--impact-text-primary)] font-medium">
                  Selenium (.NET)
                </span>
                , and{" "}
                <span className="text-[var(--impact-text-primary)] font-medium">
                  RestSharp
                </span>
                .
              </p>
            </div>

            {/* Micro hairline hover indicator */}
            <div className="w-6 h-0.5 bg-[var(--impact-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-6" />
          </div>
        </div>

        {/* STAT 2: Velocity Stat (3.5 Columns) */}
        <div
          style={{ transitionDelay: prefersReducedMotion ? "0ms" : "120ms" }}
          className={`md:col-span-3 md:col-start-6 py-8 md:py-12 md:px-8 border-t md:border-t-0 md:border-r border-[var(--impact-hairline)] impact-cubic transition-all duration-[700ms] group cursor-default ${
            isVisible || prefersReducedMotion
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Tabular Metric (Neutral High Contrast) */}
              <div
                className="text-5xl md:text-6xl font-sans font-extrabold tracking-tight tabular-nums leading-none text-[var(--impact-text-primary)] mb-4 will-change-transform"
                aria-hidden="true"
              >
                <span>{stat2}</span>
                <span className="text-[0.8em] font-bold ml-0.5">%</span>
              </div>

              {/* Label */}
              <h3 className="text-lg md:text-xl font-semibold tracking-tight text-[var(--impact-text-primary)] mb-2">
                Faster Regression
              </h3>

              {/* Muted Editorial Description */}
              <p className="text-sm text-[var(--impact-text-secondary)] leading-relaxed">
                Reduced feedback turnaround via multi-threaded NUnit execution grids and
                parallelized headless browser runners.
              </p>
            </div>

            {/* Micro hairline hover indicator */}
            <div className="w-6 h-0.5 bg-[var(--impact-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-6" />
          </div>
        </div>

        {/* STAT 3: Defect Containment Drop (3.5 Columns) */}
        <div
          style={{ transitionDelay: prefersReducedMotion ? "0ms" : "240ms" }}
          className={`md:col-span-4 md:col-start-9 py-8 md:py-12 md:pl-8 border-t md:border-t-0 border-[var(--impact-hairline)] impact-cubic transition-all duration-[700ms] group cursor-default ${
            isVisible || prefersReducedMotion
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Tabular Metric: 100 -> 5 Drop (Neutral High Contrast) */}
              <div
                className="text-5xl md:text-6xl font-sans font-extrabold tracking-tight tabular-nums leading-none text-[var(--impact-text-primary)] mb-4 will-change-transform"
                aria-hidden="true"
              >
                <span className="text-[0.75em] font-bold mr-0.5 opacity-70">&lt;</span>
                <span>{stat3}</span>
                <span className="text-[0.8em] font-bold ml-0.5">%</span>
              </div>

              {/* Label */}
              <h3 className="text-lg md:text-xl font-semibold tracking-tight text-[var(--impact-text-primary)] mb-2">
                Defect Leakage
              </h3>

              {/* Muted Editorial Description */}
              <p className="text-sm text-[var(--impact-text-secondary)] leading-relaxed">
                Escapes contained below threshold through shift-left schema verification,
                contract testing, and rigorous release gatekeeping.
              </p>
            </div>

            {/* Micro hairline hover indicator */}
            <div className="w-6 h-0.5 bg-[var(--impact-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
};
