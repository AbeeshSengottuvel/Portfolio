import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, BadgeCheck } from "lucide-react";
import { EDUCATION_LIST } from "../constants";

interface EducationProps {
  isDarkMode: boolean;
}

export const Education: React.FC<EducationProps> = ({ isDarkMode }) => {
  return (
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
  );
};
