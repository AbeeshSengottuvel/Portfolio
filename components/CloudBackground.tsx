import React from "react";
import { motion } from "framer-motion";

export const CloudBackground = ({ isDarkMode }: { isDarkMode: boolean }) => {
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
