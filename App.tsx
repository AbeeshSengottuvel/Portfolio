import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import {
  Menu,
  X,
  Download,
  Code,
  Database,
  Cpu,
  Wrench,
  Users,
  CheckCircle2,
  GraduationCap,
  BadgeCheck,
  Mail,
  Phone,
  MapPin,
  Moon,
  Sun,
  ChevronRight,
  ChevronDown,
  Terminal,
  Linkedin,
  Github,
  Instagram,
  ArrowUp,
  Brain,
  FlaskConical,
  Clock,
  ShieldCheck,
  ClipboardCheck,
  Repeat,
  Rocket,
  Bug,
  Handshake,
  Sparkles,
} from "lucide-react";
import {
  SKILL_CATEGORIES,
  EXPERIENCES,
  EDUCATION_LIST,
  RESUME_URL,
  SOCIAL_LINKS,
} from "./constants";
import profilePic from "./Asset/Profile pic.jpeg";
import { TechnicalExpertise } from "./TechnicalExpertise";
import { ImpactSection } from "./ImpactSection";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const calculateExperience = () => {
  const startDate = new Date(2024, 7, 26); // August 26, 2024
  const now = new Date();
  
  let totalMonths = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
  if (now.getDate() < startDate.getDate()) {
    totalMonths--;
  }

  const exactYears = (totalMonths / 12).toFixed(1).replace(/\.0$/, '');
  return `${exactYears} Year${exactYears === '1' ? '' : 's'}`;
};

const PROCESS_ICONS: Record<
  string,
  React.ComponentType<{ className?: string; "aria-hidden"?: any }>
> = {
  "Test Case Design & Execution": ClipboardCheck,
  "Agile Collaboration": Repeat,
  "Sprint-Based QA Delivery": Rocket,
  "Defect Analysis & Reporting": Bug,
  "Cross-Functional Teamwork": Handshake,
};

const Counter: React.FC<{ value: string }> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [displayVal, setDisplayVal] = useState(0);
  const numericVal = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[\d]/g, "");

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, numericVal, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setDisplayVal(Math.round(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, numericVal]);

  return (
    <span ref={ref}>
      {displayVal}
      {suffix}
    </span>
  );
};

const ScrollRevealTitle: React.FC<{
  title: string;
  className?: string;
  lineClassName?: string;
}> = ({
  title,
  className = "text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white",
  lineClassName = "w-16 md:w-20 h-1",
}) => {
  return (
    <div className="mb-8 md:mb-12 text-left">
      <div className="overflow-hidden py-1">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={className}
        >
          {title}
        </motion.h2>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={`origin-left ${lineClassName} bg-[#2563eb] rounded-full mt-3`}
      />
    </div>
  );
};

const SpotlightCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  isDarkMode: boolean;
}> = ({ children, className = "", isDarkMode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${
            isDarkMode
              ? "rgba(59, 130, 246, 0.12)"
              : "rgba(37, 99, 235, 0.08)"
          }, transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 500], [0, -45]);
  const heroPhotoY = useTransform(scrollY, [0, 500], [0, 35]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Impact", href: "#impact" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
  ];

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (lenisRef.current) {
      lenisRef.current.scrollTo(href, { offset: -80 });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 overflow-x-hidden isolate ${
        isDarkMode ? "bg-[#0a0c10] text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#2563eb] z-[120] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation - 3-Island Floating Pill Design */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 md:px-6 pt-3 md:pt-5 pointer-events-none transition-all duration-300">
        <div className="max-w-[1120px] mx-auto flex items-center justify-between gap-3">
          
          {/* Left Pill: Availability & Brand */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto shrink-0"
          >
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "#home")}
              className={`flex items-center gap-2.5 px-4 py-2 sm:py-2.5 rounded-full border shadow-sm transition-all hover:scale-105 active:scale-95 ${
                isDarkMode
                  ? "bg-[#11141c]/90 border-white/10 text-white shadow-black/40"
                  : "bg-white/95 border-slate-200/90 text-slate-800 shadow-slate-900/5 hover:border-slate-300"
              }`}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-tight">
                available for opportunities
              </span>
            </a>
          </motion.div>

          {/* Center Pill: Main Navigation Links with Integrated Dark Contact Button */}
          <motion.nav
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`hidden md:flex pointer-events-auto items-center gap-1 lg:gap-1.5 px-2 py-1.5 rounded-full border shadow-md transition-all ${
              isDarkMode
                ? "bg-[#11141c]/90 border-white/10 text-slate-300 shadow-black/40"
                : "bg-white/95 border-slate-200/90 text-slate-700 shadow-slate-900/5"
            }`}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`text-xs lg:text-sm font-semibold px-3.5 lg:px-4 py-1.5 rounded-full transition-all hover:text-[#2563eb] dark:hover:text-[#60a5fa] hover:bg-slate-100/80 dark:hover:bg-white/5 ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {item.name}
              </a>
            ))}

            {/* Embedded Dark Capsule Contact Button */}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className={`ml-1 px-4 lg:px-5 py-1.5 lg:py-2 rounded-full font-bold text-xs lg:text-sm transition-all hover:scale-105 active:scale-95 shadow-sm ${
                isDarkMode
                  ? "bg-white text-slate-900 hover:bg-slate-100"
                  : "bg-[#111827] text-white hover:bg-black"
              }`}
            >
              Contact
            </a>
          </motion.nav>

          {/* Right Pill: Direct Email & Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-center gap-2"
          >
            <a
              href={SOCIAL_LINKS.email}
              aria-label="Send email"
              className={`hidden lg:flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-full border shadow-sm transition-all hover:scale-105 active:scale-95 ${
                isDarkMode
                  ? "bg-[#11141c]/90 border-white/10 text-slate-300 hover:text-white shadow-black/40"
                  : "bg-white/95 border-slate-200/90 text-slate-700 hover:text-slate-900 shadow-slate-900/5 hover:border-slate-300"
              }`}
            >
              <Mail size={15} className="text-[#2563eb] dark:text-[#60a5fa] shrink-0" />
              <span className="text-xs font-semibold tracking-tight">
                abeeshsengottuvel12@gmail.com
              </span>
            </a>

            {/* Dark Mode Toggle Pill */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border shadow-sm transition-all hover:scale-105 active:scale-95 ${
                isDarkMode
                  ? "bg-[#11141c]/90 border-white/10 text-amber-400 hover:bg-white/10 shadow-black/40"
                  : "bg-white/95 border-slate-200/90 text-slate-700 hover:bg-slate-50 shadow-slate-900/5 hover:border-slate-300"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDarkMode ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 rounded-full border shadow-sm ${
                isDarkMode
                  ? "bg-[#11141c]/90 border-white/10 text-white"
                  : "bg-white/95 border-slate-200/90 text-slate-800"
              }`}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </motion.div>

        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed inset-0 z-[100] md:hidden flex flex-col items-center justify-center gap-6 p-10 ${
              isDarkMode ? "bg-[#0a0c10]" : "bg-white"
            }`}
          >
            {navItems.map((item, idx) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`text-3xl font-display font-bold tracking-tight rounded-lg px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 ${
                  isDarkMode ? "text-slate-200" : "text-slate-800"
                }`}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3.5 rounded-xl font-bold text-lg mt-6 text-center shadow-lg shadow-[#2563eb]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
            >
              Contact Me
            </motion.a>
            <button
              className="absolute top-6 right-6 p-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-[1120px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Hero Section */}
        <section
          id="home"
          className="pt-24 pb-12 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          <motion.div
            style={{ y: heroTextY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex flex-col gap-4 md:gap-6 items-center md:items-start text-center md:text-left order-2 md:order-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-black leading-[1.1] md:leading-[1] lg:leading-[0.9] tracking-tighter"
            >
              Abeesh <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                Sengottuvel
              </span>
            </motion.h1>
            <p
              className={`text-base md:text-lg lg:text-xl leading-relaxed max-w-lg font-medium ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Quality Assurance Engineer specializing in robust test automation, API engineering, and delivering dependable software systems through test-driven quality practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6 w-full sm:w-auto">
              <a
                href={RESUME_URL}
                download="Abeesh_S_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 md:gap-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 md:px-7 py-2.5 md:py-3.5 lg:py-4 rounded-xl font-bold shadow-lg shadow-[#2563eb]/20 transition-all hover:-translate-y-1 justify-center group active:scale-95 text-sm md:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2"
              >
                <Download
                  size={16}
                  className="md:size-18 group-hover:translate-y-1 transition-transform"
                />
                Download CV
              </a>
              <button
                onClick={(e) => scrollToSection(e as any, "#experience")}
                className={`flex items-center gap-2.5 md:gap-3 px-5 md:px-7 py-2.5 md:py-3.5 lg:py-4 rounded-xl font-bold border-2 transition-all hover:-translate-y-1 justify-center group active:scale-95 text-sm md:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 ${
                  isDarkMode
                    ? "border-white/5 bg-white/5 hover:bg-white/10 hover:border-[#2563eb]/40 text-white"
                    : "border-black/5 bg-white hover:bg-slate-50 hover:border-[#2563eb]/30 text-slate-900 shadow-sm"
                }`}
              >
                View Experience
                <ChevronRight
                  size={16}
                  className="md:size-18 group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </motion.div>

          {/* Profile Image with subtle parallax */}
          <motion.div
            style={{ y: heroPhotoY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative flex justify-center order-1 md:order-2 w-full max-w-[280px] sm:max-w-[340px] md:max-w-none"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`relative z-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] blob-shape blob-morph overflow-hidden border-4 md:border-6 lg:border-8 ${
                isDarkMode ? "border-white/5" : "border-white"
              } shadow-2xl transition-all hover:scale-[1.02] duration-1000 group`}
            >
              <img
                src={profilePic}
                alt="Abeesh S"
                className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = profilePic;
                }}
              />
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1, y: [0, -4, 0] }}
              transition={{
                x: { delay: 0.8, type: "spring" },
                opacity: { delay: 0.8 },
                y: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1.2 },
              }}
              className={`absolute -bottom-2 md:bottom-6 lg:bottom-10 right-1/2 translate-x-1/2 md:translate-x-0 md:-right-4 lg:-right-6 p-2.5 md:p-4 lg:p-6 rounded-2xl shadow-2xl border flex items-center gap-2.5 md:gap-3 lg:gap-5 z-20 min-w-[130px] md:min-w-[180px] lg:min-w-[240px] ${
                isDarkMode
                  ? "bg-[#1a1c22]/90 backdrop-blur-xl border-white/10"
                  : "bg-white/90 backdrop-blur-xl border-black/5"
              }`}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 bg-[#2563eb]/10 text-[#2563eb] dark:text-[#60a5fa] rounded-xl flex items-center justify-center shrink-0">
                <BadgeCheck size={18} className="md:size-24 lg:size-32" />
              </div>
              <div className="text-left">
                <p className="text-[7px] md:text-[8px] lg:text-[10px] uppercase tracking-widest font-semibold text-slate-500 mb-0.5">
                  Experience
                </p>
                <p className="text-sm md:text-lg lg:text-2xl font-display font-black leading-none">
                  {calculateExperience()}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Down Indicator */}
          <div className="order-3 col-span-full hidden md:flex justify-center -mt-6 pt-2">
            <motion.button
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              onClick={(e) => scrollToSection(e as any, "#impact")}
              aria-label="Scroll down to impact section"
              className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-[#2563eb] dark:hover:text-[#60a5fa] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] rounded-lg p-2 group"
            >
              <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 group-hover:text-[#2563eb] dark:group-hover:text-[#60a5fa] transition-colors">
                Explore
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              >
                <ChevronDown size={18} />
              </motion.div>
            </motion.button>
          </div>
        </section>

        {/* Impact Section */}
        <ImpactSection isDarkMode={isDarkMode} />

        {/* Skills Section - Technical Expertise */}
        <TechnicalExpertise />

        {/* Experience Section */}
        <section id="experience" className="py-20 md:py-28 scroll-mt-20">
          <ScrollRevealTitle title="Experience" />

          <div className="relative space-y-12 md:space-y-20">
            {/* Seamless gradient connector line that grows on scroll */}
            <div className="absolute left-3 md:left-8 -translate-x-1/2 top-5 md:top-6 bottom-0 w-0.5 md:w-1 z-0 pointer-events-none">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full origin-top bg-gradient-to-b from-[#2563eb] via-[#2563eb]/50 to-transparent rounded-full"
              />
            </div>

            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative pl-10 md:pl-24"
              >
                {/* Timeline Dot Anchor - perfectly aligned with timeline connector line */}
                <div className="absolute left-3 md:left-8 -translate-x-1/2 top-2 z-10 flex items-center justify-center pointer-events-none">
                  <motion.div
                    whileHover={{ scale: 1.25 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className={`pointer-events-auto w-6 h-6 md:w-8 md:h-8 rounded-full border-2 md:border-4 transition-colors ${
                      isDarkMode ? "border-[#0a0c10]" : "border-[#f0f4f8]"
                    } ${
                      exp.active
                        ? "bg-[#2563eb] ring-4 md:ring-8 ring-[#2563eb]/20 shadow-lg shadow-[#2563eb]/30 animate-pulse"
                        : "bg-slate-400 dark:bg-slate-700"
                    }`}
                  />
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 md:mb-4 gap-2 md:gap-4">
                  <h3 className="text-xl md:text-3xl lg:text-4xl font-bold font-display tracking-tight leading-tight">
                    {exp.role}
                  </h3>
                  <span
                    className={`inline-block px-3 py-1 md:px-5 md:py-1.5 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-widest w-fit border ${
                      isDarkMode
                        ? "bg-white/5 border-white/10 text-[#60a5fa]"
                        : "bg-white border-slate-200/80 text-[#2563eb] shadow-sm"
                    }`}
                  >
                    {exp.period}
                  </span>
                </div>
                <h4 className="text-base md:text-xl font-bold text-[#2563eb] dark:text-[#60a5fa] mb-4 md:mb-8">
                  {exp.company}
                </h4>
                <ul className="space-y-3 md:space-y-6 max-w-3xl">
                  {exp.points.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                      className="flex gap-3 md:gap-5 group items-start"
                    >
                      <motion.div
                        whileHover={{ scale: 1.25, rotate: 12 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                        }}
                        className={`shrink-0 mt-1 w-5 h-5 md:w-6 md:h-6 rounded-md md:rounded-lg flex items-center justify-center transition-colors cursor-default ${
                          exp.active
                            ? "bg-[#2563eb]/10 text-[#2563eb] dark:text-[#60a5fa] group-hover:bg-[#2563eb]/20"
                            : "bg-slate-200 dark:bg-white/5 text-slate-500"
                        }`}
                      >
                        <CheckCircle2 size={14} className="md:size-16" />
                      </motion.div>
                      <p
                        className={`text-sm md:text-lg leading-relaxed ${
                          isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {point}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 md:py-28 scroll-mt-20">
          <ScrollRevealTitle title="Education & Credentials" />

          <div className="space-y-4">
            {EDUCATION_LIST.map((edu) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className={`p-5 sm:p-6 md:p-7 rounded-[2rem] border transition-all ${
                  isDarkMode
                    ? "bg-[#11141c]/60 border-white/10"
                    : "bg-white border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]"
                } flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  {/* Soft Blue Squircle Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <GraduationCap size={22} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold font-display tracking-tight text-slate-900 dark:text-white leading-snug">
                      {edu.degree}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm mt-0.5 font-medium ${
                        isDarkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {edu.institution}
                    </p>
                  </div>
                </div>

                {/* Right Pill Badge */}
                <div className="sm:self-center shrink-0">
                  <span
                    className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold ${
                      isDarkMode
                        ? "bg-white/10 text-slate-300"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {edu.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section - Matching Screenshot Exactly */}
        <section id="contact" className="py-20 md:py-28 scroll-mt-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={`p-8 sm:p-12 md:p-16 lg:p-20 rounded-[2.5rem] sm:rounded-[3rem] border transition-all ${
              isDarkMode
                ? "bg-[#11141c]/60 border-white/10"
                : "bg-white border-slate-200/90 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)]"
            }`}
          >
            <div className="max-w-4xl">
              {/* Header */}
              <div className="mb-10 sm:mb-12 text-left">
                <motion.h2
                  initial={{ y: 25, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight mb-4"
                >
                  Get In Touch
                </motion.h2>
                <motion.p
                  variants={itemVariants}
                  className={`text-base sm:text-lg font-medium max-w-xl leading-relaxed ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Passionate about building scalable automation frameworks and catching edge cases before users do. Let&apos;s connect and discuss how I can contribute to your engineering team.
                </motion.p>
              </div>

              {/* Contact Grid - Clean Squircle Rows (No individual card boxes) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-7 sm:gap-y-9">
                {[
                  {
                    icon: <Mail size={20} />,
                    label: "EMAIL",
                    value: "abeeshsengottuvel12@gmail.com",
                    href: SOCIAL_LINKS.email,
                  },
                  {
                    icon: <Phone size={20} />,
                    label: "PHONE",
                    value: "+91 9047722626",
                    href: SOCIAL_LINKS.phone,
                  },
                  {
                    icon: <MapPin size={20} />,
                    label: "LOCATION",
                    value: "Chennai, India",
                  },
                  {
                    icon: <Linkedin size={20} />,
                    label: "LINKEDIN",
                    value: "Abeesh S.",
                    href: SOCIAL_LINKS.linkedin,
                  },
                  {
                    icon: <Github size={20} />,
                    label: "GITHUB",
                    value: "AbeeshSengottuvel",
                    href: SOCIAL_LINKS.github,
                  },
                  {
                    icon: <Instagram size={20} />,
                    label: "INSTAGRAM",
                    value: "@abeesh",
                    href: SOCIAL_LINKS.instagram,
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="flex items-center gap-4"
                  >
                    {/* Squircle Icon */}
                    {item.href ? (
                      <motion.a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/50"
                      >
                        {item.icon}
                      </motion.a>
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                    )}

                    {/* Text Column */}
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all sm:break-words"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {item.value}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer
        className={`py-12 md:py-16 border-t relative z-10 ${
          isDarkMode ? "border-white/10 bg-[#0a0c10]" : "border-slate-200/80 bg-white"
        }`}
      >
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div className="flex items-center gap-2.5 md:gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-[#2563eb] rounded-xl flex items-center justify-center text-white shadow-sm shadow-[#2563eb]/30">
              <Terminal size={18} className="md:size-20" />
            </div>
            <span className="font-display font-bold text-xl md:text-2xl tracking-tight text-slate-900 dark:text-white">
              Abeesh S.
            </span>
          </div>
          <p
            className={`text-xs md:text-sm font-medium text-center ${
              isDarkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            &copy; {new Date().getFullYear()} Abeesh Sengottuvel. Built with
            precision and high testing standards.
          </p>
          <div className="group flex gap-6 items-center cursor-pointer">
            <motion.a
              href="#home"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => scrollToSection(e, "#home")}
              aria-label="Scroll to top"
              className="px-4 py-2.5 rounded-xl
                  bg-[#2563eb]/10 flex items-center gap-2 text-[#2563eb] dark:text-[#60a5fa]
                  font-display font-bold text-sm md:text-base tracking-tight
                  transition-colors hover:bg-[#2563eb]/20
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="shrink-0 flex items-center justify-center"
              >
                <ArrowUp className="w-4 h-4 text-[#2563eb] dark:text-[#60a5fa]" />
              </motion.div>
              <span>Top</span>
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
