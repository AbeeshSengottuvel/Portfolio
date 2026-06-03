import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Sun, Moon, Menu, X } from "lucide-react";

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  toggleDarkMode,
  scrollToSection,
  isMenuOpen,
  setIsMenuOpen,
  scrolled,
}) => {
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
  ];

  return (
    <>
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
    </>
  );
};
