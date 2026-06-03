import React from "react";
import { motion } from "framer-motion";
import { Download, ChevronRight, BadgeCheck } from "lucide-react";
import { RESUME_URL } from "../constants";
import profilePic from "../Asset/Profile pic.jpeg";

interface HeroProps {
  isDarkMode: boolean;
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

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

export const Hero: React.FC<HeroProps> = ({ isDarkMode, scrollToSection }) => {
  return (
    <section
      id="home"
      className="pt-24 pb-12 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
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
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
  );
};
