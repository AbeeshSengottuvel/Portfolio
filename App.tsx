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
} from "lucide-react";
import {
  SKILL_CATEGORIES,
  EXPERIENCES,
  EDUCATION_LIST,
  RESUME_URL,
  SOCIAL_LINKS,
} from "./constants";
import profilePic from "./Asset/Profile pic.jpeg";




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
}> = ({ title, className = "", lineClassName = "w-16 md:w-24 h-1.5 md:h-2" }) => {
  return (
    <div className="mb-8 md:mb-12 text-center md:text-left">
      <div className="overflow-hidden py-1">
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={className}
        >
          {title}
        </motion.h2>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={`origin-left ${lineClassName} bg-blue-600 rounded-full mx-auto md:mx-0`}
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
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 z-[120] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation - 3-Island Floating Pill Design (Inspired by Reference) */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 md:px-8 pt-3 md:pt-5 pointer-events-none transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
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
                className={`text-xs lg:text-sm font-semibold px-3.5 lg:px-4 py-1.5 rounded-full transition-all hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/80 dark:hover:bg-white/5 ${
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
              <Mail size={15} className="text-orange-500 shrink-0" />
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
                className={`text-3xl font-display font-bold tracking-tight rounded-lg px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
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
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-xl mt-6 text-center shadow-xl shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Contact Me
            </motion.a>
            <button
              className="absolute top-6 right-6 p-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
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
                className="flex items-center gap-2.5 md:gap-3 bg-blue-600 hover:bg-blue-500 text-white px-5 md:px-7 py-2.5 md:py-3.5 lg:py-4 rounded-lg md:rounded-2xl font-bold shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-1 justify-center group active:scale-95 text-sm md:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <Download
                  size={16}
                  className="md:size-18 group-hover:translate-y-1 transition-transform"
                />
                Download CV
              </a>
              <button
                onClick={(e) => scrollToSection(e as any, "#experience")}
                className={`flex items-center gap-2.5 md:gap-3 px-5 md:px-7 py-2.5 md:py-3.5 lg:py-4 rounded-lg md:rounded-2xl font-bold border-2 transition-all hover:-translate-y-1 justify-center group active:scale-95 text-sm md:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                  isDarkMode
                    ? "border-white/5 bg-white/5 hover:bg-white/10 text-white"
                    : "border-black/5 bg-white hover:bg-slate-50 text-slate-900 shadow-sm"
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
              className={`absolute -bottom-2 md:bottom-6 lg:bottom-10 right-1/2 translate-x-1/2 md:translate-x-0 md:-right-4 lg:-right-6 p-2.5 md:p-4 lg:p-6 rounded-xl md:rounded-2xl lg:rounded-3xl shadow-2xl border flex items-center gap-2.5 md:gap-3 lg:gap-5 z-20 min-w-[130px] md:min-w-[180px] lg:min-w-[240px] ${
                isDarkMode
                  ? "bg-[#1a1c22]/90 backdrop-blur-xl border-white/10"
                  : "bg-white/90 backdrop-blur-xl border-black/5"
              }`}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 bg-blue-500/15 text-blue-500 rounded-lg md:rounded-xl lg:rounded-2xl flex items-center justify-center shrink-0">
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
              className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-2 group"
            >
              <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 group-hover:text-blue-600 transition-colors">
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
        <section className="py-12 md:py-20 scroll-mt-20" id="impact">
          <ScrollRevealTitle
            title="Impact by the Numbers"
            className="text-3xl md:text-6xl lg:text-7xl font-display font-black mb-3 md:mb-4 tracking-tighter"
            lineClassName="w-16 md:w-24 h-1.5 md:h-2"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
          >
            {[
              { icon: FlaskConical, value: "110+", label: "Test cases automated" },
              { icon: Clock, value: "40%", label: "Faster regression cycles" },
              { icon: ShieldCheck, value: "15%", label: "Fewer defects reaching production" },
            ].map(({ icon: Icon, value, label }) => (
              <motion.div
                key={label}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <SpotlightCard
                  isDarkMode={isDarkMode}
                  className={`p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border shadow-sm hover:shadow-xl transition-all h-full ${
                    isDarkMode
                      ? "bg-white/5 border-white/5"
                      : "bg-white border-black/5"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-4 cursor-default shadow-sm shadow-blue-500/10"
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </motion.div>
                  <p className="text-3xl md:text-5xl font-display font-black tracking-tighter mb-1">
                    <Counter value={value} />
                  </p>
                  <p
                    className={`text-sm md:text-base font-medium ${
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {label}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Skills Section - Larger Skill Chips */}
        <section id="skills" className="py-12 md:py-20 scroll-mt-20">
          <ScrollRevealTitle
            title="Technical Expertise"
            className="text-3xl md:text-6xl lg:text-7xl font-display font-black mb-3 md:mb-4 tracking-tighter"
            lineClassName="w-16 md:w-24 h-1.5 md:h-2"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6"
          >
            {SKILL_CATEGORIES.map((category, idx) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <SpotlightCard
                  isDarkMode={isDarkMode}
                  className={`p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border transition-all shadow-sm hover:shadow-xl h-full ${
                    idx < 4
                      ? "border-l-4 border-l-blue-600/40"
                      : "border-l-4 border-l-indigo-500/40"
                  } ${
                    isDarkMode
                      ? "bg-white/5 border-white/5"
                      : "bg-white border-black/5"
                  }`}
                >
                  <div className="flex items-center gap-4 md:gap-5 mb-5 md:mb-7">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 cursor-default shadow-sm shadow-blue-500/10"
                    >
                      {category.icon === "code" && (
                        <Code size={20} className="md:size-[24px]" />
                      )}
                      {category.icon === "database" && (
                        <Database size={20} className="md:size-[24px]" />
                      )}
                      {category.icon === "psychology" && (
                        <Cpu size={20} className="md:size-[24px]" />
                      )}
                      {category.icon === "build" && (
                        <Wrench size={20} className="md:size-[24px]" />
                      )}
                      {category.icon === "groups" && (
                        <Users size={20} className="md:size-[24px]" />
                      )}
                      {category.icon === "brain" && (
                        <Brain size={20} className="md:size-[24px]" />
                      )}
                    </motion.div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold font-display tracking-tight">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5 md:gap-4">
                    {category.skills.map((skill) => {
                      const ProcessIcon = PROCESS_ICONS[skill.name];
                      return (
                        <motion.div
                          key={skill.name}
                          whileHover={{
                            scale: 1.08,
                            y: -3,
                            boxShadow: isDarkMode
                              ? "0 8px 20px -4px rgba(59, 130, 246, 0.25)"
                              : "0 8px 20px -4px rgba(37, 99, 235, 0.18)",
                          }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                          className={`flex items-center gap-2.5 md:gap-3 px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold transition-colors border cursor-default select-none ${
                            isDarkMode
                              ? "bg-white/5 border-white/5 text-slate-300 hover:border-blue-500/40 hover:text-white"
                              : "bg-slate-50 border-black/5 text-slate-700 hover:border-blue-500/40 hover:text-blue-600 shadow-sm"
                          }`}
                        >
                          {ProcessIcon ? (
                            <ProcessIcon
                              className="w-4 h-4 md:w-5 md:h-5 text-blue-500"
                              aria-hidden="true"
                            />
                          ) : skill.icon ? (
                            <img
                              src={skill.icon}
                              alt={skill.name}
                              className="w-4 h-4 md:w-5 md:h-5 object-contain"
                            />
                          ) : null}
                          {skill.name}
                        </motion.div>
                      );
                    })}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 md:py-32 scroll-mt-20">
          <ScrollRevealTitle
            title="Experience"
            className="text-3xl md:text-7xl font-display font-black mb-4 md:mb-6 tracking-tighter"
            lineClassName="w-20 md:w-32 h-1.5 md:h-2"
          />

          <div className="relative space-y-12 md:space-y-20">
            {/* Seamless gradient connector line that grows on scroll */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="origin-top absolute left-3 md:left-8 -translate-x-1/2 top-4 md:top-6 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-blue-600 via-blue-500/60 to-transparent rounded-full z-0"
            />

            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative pl-10 md:pl-24"
              >
                <motion.div
                  whileHover={{ scale: 1.25 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={`absolute left-0 md:left-4 top-2 w-6 h-6 md:w-8 md:h-8 rounded-full border-2 md:border-4 z-10 transition-colors ${
                    isDarkMode ? "border-[#0a0c10]" : "border-[#f0f4f8]"
                  } ${
                    exp.active
                      ? "bg-blue-600 ring-4 md:ring-8 ring-blue-600/20 shadow-lg shadow-blue-500/30 animate-pulse"
                      : "bg-slate-400 dark:bg-slate-700"
                  }`}
                />

                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 md:mb-4 gap-2 md:gap-4">
                  <h3 className="text-xl md:text-3xl lg:text-4xl font-bold font-display tracking-tight leading-tight">
                    {exp.role}
                  </h3>
                  <span
                    className={`inline-block px-3 py-1 md:px-6 md:py-2 rounded-lg md:rounded-2xl text-[10px] md:text-xs font-semibold uppercase tracking-widest w-fit border ${
                      isDarkMode
                        ? "bg-white/5 border-white/5 text-blue-400"
                        : "bg-white border-black/5 text-blue-600 shadow-sm"
                    }`}
                  >
                    {exp.period}
                  </span>
                </div>
                <h4 className="text-base md:text-xl font-bold text-blue-600 mb-4 md:mb-8">
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
                            ? "bg-blue-600/10 text-blue-600 group-hover:bg-blue-600/25"
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
        <section id="education" className="py-20 scroll-mt-20">
          <ScrollRevealTitle
            title="Education & Credentials"
            className="text-3xl md:text-7xl font-display font-black mb-4 md:mb-6 tracking-tighter"
            lineClassName="w-20 md:w-32 h-1.5 md:h-2"
          />

          <div className="grid gap-4 md:gap-6">
            {EDUCATION_LIST.map((edu, idx) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] border flex flex-col sm:flex-row items-center gap-4 sm:gap-8 ${
                  isDarkMode
                    ? "bg-white/5 border-white/5"
                    : "bg-white border-black/5"
                }`}
              >
                {/* Updated Icon Wrapper with Animation */}
                <motion.div
                  whileHover={{
                    scale: 1.15,
                    rotate: 10,
                    backgroundColor: "rgba(37, 99, 235, 0.2)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0 cursor-pointer transition-colors"
                >
                  {edu.icon === "school" ? (
                    <GraduationCap size={28} />
                  ) : (
                    <BadgeCheck size={28} />
                  )}
                </motion.div>

                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-lg md:text-xl font-bold font-display">
                    {edu.degree}
                  </h3>
                  <p
                    className={`text-sm md:text-base ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {edu.institution}
                  </p>
                </div>
                <div
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold ${
                    isDarkMode
                      ? "bg-slate-800 text-slate-300"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {edu.year}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 scroll-mt-20">
          <motion.div
            // 2. Apply Container Variants
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }} // Triggers when 100px of the section is visible
            className={`p-6 sm:p-10 md:p-16 lg:p-20 rounded-[3.5rem] md:rounded-[5rem] border shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative overflow-hidden max-w-full ${
              isDarkMode
                ? "bg-[#1a1c22]/60 border-white/5"
                : "bg-white border-black/5"
            }`}
          >
            <div className="relative z-10 max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-16 md:mb-20 text-center lg:text-left">
                {/* 3. Apply Item Variants to Header Elements */}
                <div className="overflow-hidden py-1 mb-6">
                  <motion.h2
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-none"
                  >
                    Get In Touch
                  </motion.h2>
                </div>
                <motion.p
                  variants={itemVariants}
                  className={`text-xl md:text-2xl font-medium max-w-2xl leading-relaxed ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Passionate about building scalable automation frameworks and catching edge cases before users do. Let&apos;s connect and discuss how I can contribute to your engineering team.
                </motion.p>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 md:gap-x-12 gap-y-6 sm:gap-y-8 md:gap-y-10">
                {[
                  {
                    icon: <Mail size={28} />,
                    label: "Email",
                    value: "abeeshsengottuvel12@gmail.com",
                    href: SOCIAL_LINKS.email,
                  },
                  {
                    icon: <Phone size={28} />,
                    label: "Phone",
                    value: "+91 9047722626",
                    href: SOCIAL_LINKS.phone,
                  },
                  {
                    icon: <MapPin size={28} />,
                    label: "Location",
                    value: "Chennai, India",
                  },
                  {
                    icon: <Linkedin size={28} />,
                    label: "LinkedIn",
                    value: "Abeesh S.",
                    href: SOCIAL_LINKS.linkedin,
                  },
                  {
                    icon: <Github size={28} />,
                    label: "GitHub",
                    value: "AbeeshSengottuvel",
                    href: SOCIAL_LINKS.github,
                  },
                  {
                    icon: <Instagram size={28} />,
                    label: "Instagram",
                    value: "@abeesh",
                    href: SOCIAL_LINKS.instagram,
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="flex items-start gap-4 sm:gap-5"
                  >
                    {/* Updated Icon Section: Now triggers link if href exists */}
                    {item.href ? (
                      <motion.a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        whileHover={{
                          scale: 1.15,
                          rotate: 10,
                          backgroundColor: "rgba(37, 99, 235, 0.2)",
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        {item.icon}
                      </motion.a>
                    ) : (
                      <motion.div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
                        {item.icon}
                      </motion.div>
                    )}

                    {/* Text */}
                    <div className="flex flex-col min-w-0 pt-1">
                      <p
                        className={`text-xs md:text-sm font-semibold uppercase tracking-widest mb-1 truncate ${
                          isDarkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {item.label}
                      </p>

                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-base md:text-lg font-semibold break-all sm:break-words transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                            isDarkMode
                              ? "text-white hover:text-blue-400"
                              : "text-slate-900 hover:text-blue-600"
                          }`}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span
                          className={`text-base md:text-lg font-semibold break-words ${
                            isDarkMode ? "text-white" : "text-slate-900"
                          }`}
                        >
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
          isDarkMode ? "border-white/5 bg-[#0a0c10]" : "border-black/5 bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Terminal size={18} className="md:size-20" />
            </div>
            <span className="font-display font-bold text-xl md:text-2xl tracking-tighter group-hover:text-blue-500 transition-colors">
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
              className="group px-4 py-2.5 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl
                  bg-blue-600/10 flex items-center gap-2 text-blue-600
                  font-display font-bold text-base md:text-lg tracking-tight
                  transition-colors hover:text-blue-600 hover:bg-blue-600/20
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="shrink-0 flex items-center justify-center"
              >
                <ArrowUp className="w-5 h-5 text-blue-600" />
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
