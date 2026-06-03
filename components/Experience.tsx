import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { EXPERIENCES } from "../constants";

interface ExperienceProps {
  isDarkMode: boolean;
}

export const Experience: React.FC<ExperienceProps> = ({ isDarkMode }) => {
  return (
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
                <li key={i} className="flex gap-3 md:gap-5 group items-start">
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
  );
};
