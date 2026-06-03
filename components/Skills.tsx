import React from "react";
import { motion } from "framer-motion";
import { Code, Database, Cpu, Wrench, Users, Brain } from "lucide-react";
import { SKILL_CATEGORIES } from "../constants";

interface SkillsProps {
  isDarkMode: boolean;
}

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
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const Skills: React.FC<SkillsProps> = ({ isDarkMode }) => {
  return (
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
  );
};
