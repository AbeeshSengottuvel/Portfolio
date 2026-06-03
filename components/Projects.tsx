import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FolderGit2, TestTube2, Layers, Cpu } from "lucide-react";

interface Project {
  title: string;
  category: "ui" | "api" | "cicd" | "all";
  description: string;
  tags: string[];
  githubUrl: string;
  icon: React.ReactNode;
}

interface ProjectsProps {
  isDarkMode: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({ isDarkMode }) => {
  const [filter, setFilter] = useState<"all" | "ui" | "api" | "cicd">("all");

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "ui", name: "Web UI Automation" },
    { id: "api", name: "API Engineering" },
    { id: "cicd", name: "CI/CD & DevOps" },
  ] as const;

  const projectsList: Project[] = [
    {
      title: "Selenium Web UI Automation Framework",
      category: "ui",
      description:
        "Engineered an enterprise-grade test automation framework utilizing Selenium WebDriver with C# and Java. Implemented the Page Object Model (POM), Cucumber BDD for readable test scenarios, and custom HTML reports.",
      tags: ["Selenium", "C#", "Cucumber", "NUnit", "POM", "ExtentReports"],
      githubUrl: "https://github.com/AbeeshSengottuvel",
      icon: <TestTube2 size={24} />,
    },
    {
      title: "RestSharp API Test Automation Suite",
      category: "api",
      description:
        "Designed and implemented a scalable REST API testing suite in C# leveraging RestSharp and NUnit. Features automated JSON schema validation, multi-environment configuration settings, and detailed execution logging.",
      tags: ["RestSharp", "C#", "NUnit", "API Automation", "JSON Schema"],
      githubUrl: "https://github.com/AbeeshSengottuvel",
      icon: <Cpu size={24} />,
    },
    {
      title: "Jenkins & GitHub Actions CI/CD Pipeline Integration",
      category: "cicd",
      description:
        "Architected automated testing pipeline steps to trigger sanity and regression testing suites dynamically on code check-ins. Integrated email/Slack notifications for instant defect communication.",
      tags: ["Jenkins", "GitHub Actions", "Git", "Azure", "CI/CD Pipelines"],
      githubUrl: "https://github.com/AbeeshSengottuvel",
      icon: <Layers size={24} />,
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projectsList
      : projectsList.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 md:py-32 scroll-mt-20">
      <div className="mb-12 md:mb-16 text-center md:text-left">
        <h2 className="text-3xl md:text-7xl font-display font-black mb-4 md:mb-6 tracking-tighter">
          Featured QA Projects
        </h2>
        <p
          className={`text-base md:text-lg max-w-xl mb-8 ${
            isDarkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Explore a curated selection of test automation frameworks, API validation suites, and continuous delivery configurations.
        </p>
        <div className="w-20 md:w-32 h-1.5 md:h-2 bg-blue-600 rounded-full mx-auto md:mx-0"></div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-16 justify-center md:justify-start">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 ${
              filter === cat.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                : isDarkMode
                ? "bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300"
                : "bg-slate-50 border border-black/5 hover:bg-slate-100 text-slate-600"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Animated Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={proj.title}
              className={`p-6 md:p-8 rounded-[2rem] border flex flex-col justify-between h-full transition-all group ${
                isDarkMode
                  ? "bg-white/5 border-white/5 hover:bg-[#15171d]"
                  : "bg-white border-black/5 hover:shadow-2xl hover:shadow-slate-200"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                    {proj.icon}
                  </div>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                      isDarkMode
                        ? "border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                        : "border-black/5 text-slate-500 hover:text-blue-600 hover:bg-blue-50/50"
                    }`}
                  >
                    <FolderGit2 size={18} />
                  </a>
                </div>

                <h3 className="text-xl font-bold font-display leading-snug mb-3">
                  {proj.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {proj.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] md:text-xs px-3 py-1 rounded-md font-bold uppercase tracking-wider ${
                        isDarkMode
                          ? "bg-slate-800 text-slate-400"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-black text-blue-600 hover:text-blue-500 w-fit"
                >
                  Inspect Source Code <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
