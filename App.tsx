import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
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
  Send,
  Moon,
  Sun,
  ChevronRight,
  Terminal,
  Linkedin,
  Github,
  Instagram,
  ArrowUp,
  Brain,
} from "lucide-react";
import {
  SKILL_CATEGORIES,
  EXPERIENCES,
  EDUCATION_LIST,
  RESUME_URL,
  SOCIAL_LINKS,
} from "./constants";
import profilePic from "./Asset/Profile pic.jpeg";

const CloudBackground = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 100 - 50 + "%",
            y: Math.random() * 100 - 50 + "%",
            scale: Math.random() * 1 + 0.5,
            opacity: 0,
          }}
          animate={{
            x: [
              Math.random() * 100 - 50 + "%",
              Math.random() * 100 - 50 + "%",
              Math.random() * 100 - 50 + "%",
            ],
            y: [
              Math.random() * 100 - 50 + "%",
              Math.random() * 100 - 50 + "%",
              Math.random() * 100 - 50 + "%",
            ],
            rotate: [0, 180, 360],
            opacity: isDarkMode ? [0.03, 0.1, 0.03] : [0.08, 0.2, 0.08],
          }}
          transition={{
            duration: 25 + Math.random() * 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] blur-[80px] md:blur-[120px] rounded-full ${
            i % 2 === 0 ? "bg-blue-500" : "bg-indigo-400"
          }`}
        />
      ))}
    </div>
  );
};

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

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
  ];

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${
        isDarkMode ? "bg-[#0a0c10] text-white" : "bg-white text-slate-900"
      }`}
    >
      <CloudBackground isDarkMode={isDarkMode} />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isDarkMode
              ? "bg-[#0a0c10]/80 backdrop-blur-2xl shadow-2xl py-2 md:py-3 border-b border-white/5"
              : "bg-white/80 backdrop-blur-2xl shadow-lg py-2 md:py-3 border-b border-black/5"
            : "bg-transparent py-4 md:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            className="flex items-center gap-2 md:gap-3 group cursor-pointer relative"
          >
            <div className="absolute inset-0 bg-blue-500/30 blur-lg rounded-full scale-125 animate-pulse group-hover:bg-blue-400 transition-colors"></div>
            <div className="relative w-9 h-9 md:w-11 md:h-11 bg-blue-600 rounded-lg md:rounded-xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/50 group-hover:rotate-[360deg] transition-transform duration-700 ease-out">
              <Terminal size={18} className="md:size-[22px] relative z-10" />
            </div>
            <span className="font-display font-black text-xl md:text-2xl tracking-tighter group-hover:text-blue-500 transition-colors">
              Abeesh S.
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`text-sm font-bold transition-all hover:text-blue-600 hover:scale-105 ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-2.5 rounded-xl font-bold text-sm transition-all hover:shadow-2xl hover:shadow-blue-600/40 active:scale-95 border border-white/10"
            >
              Contact Me
            </a>
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-xl transition-all hover:scale-110 ${
                isDarkMode
                  ? "bg-white/5 text-yellow-400"
                  : "bg-black/5 text-blue-600"
              }`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${
                isDarkMode ? "bg-white/5" : "bg-black/5"
              }`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="p-1.5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

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
                className={`text-3xl font-display font-black tracking-tight ${
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
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-xl mt-6 text-center shadow-xl shadow-blue-600/30"
            >
              Contact Me
            </motion.a>
            <button
              className="absolute top-6 right-6 p-3"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex flex-col gap-4 md:gap-6 items-center md:items-start text-center md:text-left order-2 md:order-1"
          >
            <div className="flex items-center gap-2 text-blue-500 font-black tracking-[0.15em] uppercase text-[9px] md:text-[10px] bg-blue-500/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-blue-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
              Available for New Opportunities
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-display font-black leading-[1.1] md:leading-[1] lg:leading-[0.9] tracking-tighter">
              Abeesh <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                Sengottuvel
              </span>
            </h1>
            <p
              className={`text-base md:text-lg lg:text-xl leading-relaxed max-w-lg font-medium ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Quality Assurance Engineer specializing in robust test automation, API engineering, and delivering flawless software experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6 w-full sm:w-auto">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 md:gap-3 bg-blue-600 hover:bg-blue-500 text-white px-5 md:px-7 py-2.5 md:py-3.5 lg:py-4 rounded-lg md:rounded-2xl font-bold md:font-black shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-1 justify-center group active:scale-95 text-sm md:text-base"
              >
                <Download
                  size={16}
                  className="md:size-18 group-hover:translate-y-1 transition-transform"
                />
                Download CV
              </a>
              <button
                onClick={(e) => scrollToSection(e as any, "#experience")}
                className={`flex items-center gap-2.5 md:gap-3 px-5 md:px-7 py-2.5 md:py-3.5 lg:py-4 rounded-lg md:rounded-2xl font-bold md:font-black border-2 transition-all hover:-translate-y-1 justify-center group active:scale-95 text-sm md:text-base ${
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

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative flex justify-center order-1 md:order-2 w-full max-w-[280px] sm:max-w-[340px] md:max-w-none"
          >
            <div className="absolute inset-0 bg-blue-600/15 blur-[40px] md:blur-[80px] lg:blur-[120px] rounded-full animate-pulse"></div>

            <div
              className={`relative z-10 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] blob-shape overflow-hidden border-4 md:border-6 lg:border-8 ${
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
            </div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
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
                <p className="text-[7px] md:text-[8px] lg:text-[10px] uppercase tracking-widest font-black text-slate-500 mb-0.5">
                  Experience
                </p>
                <p className="text-sm md:text-lg lg:text-2xl font-display font-black leading-none">
                  {calculateExperience()}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Skills Section - Larger Skill Chips */}
        <section id="skills" className="py-12 md:py-20 scroll-mt-20">
          <div className="mb-8 md:mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-6xl lg:text-7xl font-display font-black mb-3 md:mb-4 tracking-tighter">
              Technical Expertise
            </h2>
            <div className="w-16 md:w-24 h-1.5 md:h-2 bg-blue-600 rounded-full mx-auto md:mx-0"></div>
          </div>

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
                className={`p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border transition-all shadow-sm hover:shadow-lg ${
                  isDarkMode
                    ? "bg-white/5 border-white/5"
                    : "bg-white border-black/5"
                }`}
              >
                <div className="flex items-center gap-4 md:gap-5 mb-5 md:mb-7">
                  <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
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
                  </div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-black font-display tracking-tight">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5 md:gap-4">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05 }}
                      className={`flex items-center gap-2.5 md:gap-3 px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold transition-all border ${
                        isDarkMode
                          ? "bg-white/5 border-white/5 text-slate-300"
                          : "bg-slate-50 border-black/5 text-slate-700"
                      }`}
                    >
                      {skill.icon && (
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-4 h-4 md:w-5 md:h-5 object-contain"
                        />
                      )}
                      {skill.name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 md:py-32 scroll-mt-20">
          <div className="mb-12 md:mb-20 text-center md:text-left">
            <h2 className="text-3xl md:text-7xl font-display font-black mb-4 md:mb-6 tracking-tighter">
              Experience
            </h2>
            <div className="w-20 md:w-32 h-1.5 md:h-2 bg-blue-600 rounded-full mx-auto md:mx-0"></div>
          </div>

          <div className="relative space-y-12 md:space-y-20 before:absolute before:left-3 md:before:left-8 before:top-2 before:bottom-0 before:w-0.5 md:before:w-1 before:bg-gradient-to-b before:from-blue-600 before:to-transparent">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative pl-10 md:pl-24"
              >
                <div
                  className={`absolute left-0 md:left-4 top-2 w-6 h-6 md:w-8 md:h-8 rounded-full border-2 md:border-4 ${
                    isDarkMode ? "border-[#0a0c10]" : "border-[#f0f4f8]"
                  } ${
                    exp.active
                      ? "bg-blue-600 ring-4 md:ring-8 ring-blue-600/20"
                      : "bg-slate-400 dark:bg-slate-700"
                  }`}
                ></div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 md:mb-4 gap-2 md:gap-4">
                  <h3 className="text-xl md:text-3xl lg:text-4xl font-black font-display tracking-tight leading-tight">
                    {exp.role}
                  </h3>
                  <span
                    className={`inline-block px-3 py-1 md:px-6 md:py-2 rounded-lg md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest w-fit border ${
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
                    <li
                      key={i}
                      className="flex gap-3 md:gap-5 group items-start"
                    >
                      <div
                        className={`shrink-0 mt-1 w-5 h-5 md:w-6 md:h-6 rounded-md md:rounded-lg flex items-center justify-center transition-colors ${
                          exp.active
                            ? "bg-blue-600/10 text-blue-600"
                            : "bg-slate-200 dark:bg-white/5 text-slate-500"
                        }`}
                      >
                        <CheckCircle2 size={14} className="md:size-16" />
                      </div>
                      <p
                        className={`text-sm md:text-lg leading-relaxed ${
                          isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {point}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 scroll-mt-20">
          <div className="mb-12 md:mb-20 text-center md:text-left">
            <h2 className="text-3xl md:text-7xl font-display font-black mb-4 md:mb-6 tracking-tighter">
              Education & Credentials
            </h2>
            <div className="w-20 md:w-32 h-1.5 md:h-2 bg-blue-600 rounded-full mx-auto md:mx-0"></div>
          </div>

          <div className="grid gap-4 md:gap-6">
            {EDUCATION_LIST.map((edu, idx) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
            {/* Background blur circle */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10 max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-16 md:mb-20 text-center lg:text-left">
                {/* 3. Apply Item Variants to Header Elements */}
                <motion.h2
                  variants={itemVariants}
                  className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-none mb-6"
                >
                  Get In Touch
                </motion.h2>
                <motion.p
                  variants={itemVariants}
                  className={`text-xl md:text-2xl font-medium max-w-2xl leading-relaxed ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Ready to elevate your software quality? Let&apos;s discuss
                  how I can contribute to your engineering team&apos;s success.
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
                        {item.icon}
                      </motion.a>
                    ) : (
                      <motion.div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
                        {item.icon}
                      </motion.div>
                    )}

                    {/* Text */}
                    <div className="flex flex-col min-w-0 pt-1">
                      <p className="text-xs md:text-sm font-black uppercase tracking-widest text-slate-400 mb-1 truncate">
                        {item.label}
                      </p>

                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-base md:text-lg font-black break-words transition-colors ${
                            isDarkMode
                              ? "text-white hover:text-blue-400"
                              : "text-slate-900 hover:text-blue-600"
                          }`}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span
                          className={`text-base md:text-lg font-black break-words ${
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
            <span className="font-display font-black text-xl md:text-2xl tracking-tighter group-hover:text-blue-500 transition-colors">
              Abeesh S.
            </span>
          </div>
          <p
            className={`text-xs md:text-sm font-bold text-center ${
              isDarkMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
            &copy; {new Date().getFullYear()} Abeesh Sengottuvel. Crafted for
            perfection.
          </p>
          <div className="group flex gap-6 items-center cursor-pointer">
            <a
              href="#home"
              className="group w-auto px-5 h-14 md:h-16 rounded-xl md:rounded-2xl
                  bg-blue-600/10 flex items-center gap-2 text-blue-600
                  font-display font-black text-xl md:text-2xl tracking-tighter
                  transition-all duration-300 hover:-translate-y-1 hover:text-blue-600"
            >
              <ArrowUp
                size={28}
                className="transition-transform duration-300 group-hover:-translate-y-1"
              />
              <span>Top</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
