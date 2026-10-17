import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Brain, Code2, Database, Users } from "lucide-react";
import { EXPERTISE_GROUPS } from "./constants";
import "./TechnicalExpertise.css";

/**
 * Optical icon helper for specialized scaling
 */
const getOptIconClass = (name) => {
  if (name === "Java") return "expertise-icon-opt-java";
  if (name === "Maven") return "expertise-icon-opt-maven";
  if (name === "Windsurf") return "expertise-icon-opt-windsurf";
  if (name === "GitHub" || name === "GitHub Copilot") return "expertise-icon-opt-github";
  return "";
};

/**
 * Clean, Quiet Tool Item
 */
export const ToolItem = ({ item }) => {
  const isPrimary = Boolean(item.primary);
  const optClass = getOptIconClass(item.name);

  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 450, damping: 22 }}
      className={`expertise-tool-item ${
        isPrimary ? "expertise-tool-primary" : ""
      }`}
    >
      {item.icon && (
        <span className="expertise-icon-frame" aria-hidden="true">
          <img
            src={item.icon}
            alt=""
            className={`expertise-icon ${optClass}`}
            loading="lazy"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </span>
      )}
      <span className="expertise-tool-name">{item.name}</span>
    </motion.span>
  );
};

/**
 * TechnicalExpertise Section
 */
export const TechnicalExpertise = ({ groups = EXPERTISE_GROUPS }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    const currentElem = sectionRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
      observer.disconnect();
    };
  }, []);

  const leadGroup =
    groups.find((g) => g.id === "test-automation") || groups[0];
  const aiGroup = groups.find((g) => g.id === "ai-testing");
  const languagesGroup = groups.find((g) => g.id === "languages-ides");
  const cicdGroup = groups.find((g) => g.id === "cicd-management");
  const practicesGroup = groups.find((g) => g.id === "qa-practices");

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`expertise-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="expertise-container">
        {/* Main Section Header */}
        <div className="expertise-heading-container">
          <div className="overflow-hidden py-1">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="expertise-heading"
            >
              Technical Expertise
            </motion.h2>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="expertise-accent-bar origin-left"
            aria-hidden="true"
          />
        </div>

        {/* Editorial Architecture with Visible Hairlines */}
        <div className="expertise-editorial-layout">
          {/* LEAD GROUP: How I test (Test Automation) */}
          {leadGroup && (
            <div className="expertise-lead-group">
              <div className="expertise-lead-grid">
                {/* Header: Plain English First, Technical Category Subtitle + Animated Tile */}
                <div className="expertise-group-header">
                  <div className="flex items-center gap-3 mb-1.5">
                    <motion.div
                      whileHover={{ scale: 1.12, rotate: 4 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                      className="expertise-group-icon-tile"
                      aria-hidden="true"
                    >
                      <Wrench size={18} />
                    </motion.div>
                    <h3 className="expertise-plain-title expertise-lead-title">
                      {leadGroup.plainTitle || "How I test"}
                    </h3>
                  </div>
                  <span className="expertise-technical-subtitle">
                    {leadGroup.title}
                  </span>
                  <p className="expertise-descriptor">{leadGroup.descriptor}</p>
                </div>

                {/* Content: UI & API (Strongest Tools) + Frameworks */}
                <div className="expertise-lead-content">
                  {leadGroup.subGroups?.map((subGroup, idx) => (
                    <div
                      key={subGroup.label}
                      className={`expertise-subgroup ${
                        idx > 0 ? "expertise-subgroup-lead-divider" : ""
                      }`}
                    >
                      <span className="expertise-subgroup-label">
                        {subGroup.label}
                      </span>
                      <ul className="expertise-tool-flow">
                        {subGroup.skills.map((skill) => (
                          <li key={skill.name}>
                            <ToolItem item={skill} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECONDARY 2-COLUMN GRID */}
          <div className="expertise-secondary-grid">
            {/* Cell 1: How I work faster with AI */}
            {aiGroup && (
              <div className="expertise-group-cell">
                <div className="expertise-group-header">
                  <div className="flex items-center gap-3 mb-1.5">
                    <motion.div
                      whileHover={{ scale: 1.18, rotate: 6 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 18,
                      }}
                      className="expertise-group-icon-tile"
                      aria-hidden="true"
                    >
                      <Brain size={18} />
                    </motion.div>
                    <h3 className="expertise-plain-title">
                      {aiGroup.plainTitle || "How I work faster with AI"}
                    </h3>
                  </div>
                  <span className="expertise-technical-subtitle expertise-secondary-subtitle">
                    {aiGroup.title}
                  </span>
                  <p className="expertise-descriptor">{aiGroup.descriptor}</p>
                </div>

                <div className="expertise-cell-body">
                  <ul className="expertise-ai-list">
                    {aiGroup.skills?.map((tool) => {
                      const optClass = getOptIconClass(tool.name);
                      return (
                        <li key={tool.name} className="expertise-ai-row">
                          <span className="expertise-ai-main">
                            {tool.icon && (
                              <span
                                className="expertise-icon-frame"
                                aria-hidden="true"
                              >
                                <img
                                  src={tool.icon}
                                  alt=""
                                  className={`expertise-icon ${optClass}`}
                                  loading="lazy"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                  }}
                                />
                              </span>
                            )}
                            <span className="expertise-ai-name">
                              {tool.name}
                            </span>
                          </span>
                          {tool.caption && (
                            <span className="expertise-ai-caption">
                              {tool.caption}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}

            {/* Cell 2: What I write code in (Languages & IDEs - Separated) */}
            {languagesGroup && (
              <div className="expertise-group-cell">
                <div className="expertise-group-header">
                  <div className="flex items-center gap-3 mb-1.5">
                    <motion.div
                      whileHover={{ scale: 1.18, rotate: 6 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 18,
                      }}
                      className="expertise-group-icon-tile"
                      aria-hidden="true"
                    >
                      <Code2 size={18} />
                    </motion.div>
                    <h3 className="expertise-plain-title">
                      {languagesGroup.plainTitle || "What I write code in"}
                    </h3>
                  </div>
                  <span className="expertise-technical-subtitle expertise-secondary-subtitle">
                    {languagesGroup.title}
                  </span>
                  <p className="expertise-descriptor">
                    {languagesGroup.descriptor}
                  </p>
                </div>

                <div className="expertise-cell-body">
                  {languagesGroup.subGroups ? (
                    <div className="expertise-cell-subgroups">
                      {languagesGroup.subGroups.map((subGroup, idx) => (
                        <div
                          key={subGroup.label}
                          className={`expertise-subgroup ${
                            idx > 0 ? "expertise-subgroup-divider" : ""
                          }`}
                        >
                          <span className="expertise-subgroup-label">
                            {subGroup.label}
                          </span>
                          <ul className="expertise-tool-flow">
                            {subGroup.skills.map((tool) => (
                              <li key={tool.name}>
                                <ToolItem item={tool} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="expertise-tool-flow">
                      {languagesGroup.skills?.map((tool) => (
                        <li key={tool.name}>
                          <ToolItem item={tool} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* Cell 3: How I ship and track quality (CI/CD & Test Management) */}
            {cicdGroup && (
              <div className="expertise-group-cell expertise-cell-border-top">
                <div className="expertise-group-header">
                  <div className="flex items-center gap-3 mb-1.5">
                    <motion.div
                      whileHover={{ scale: 1.18, rotate: 6 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 18,
                      }}
                      className="expertise-group-icon-tile"
                      aria-hidden="true"
                    >
                      <Database size={18} />
                    </motion.div>
                    <h3 className="expertise-plain-title">
                      {cicdGroup.plainTitle || "How I ship and track quality"}
                    </h3>
                  </div>
                  <span className="expertise-technical-subtitle expertise-secondary-subtitle">
                    {cicdGroup.title}
                  </span>
                  <p className="expertise-descriptor">
                    {cicdGroup.descriptor}
                  </p>
                </div>

                <div className="expertise-cell-body">
                  <ul className="expertise-tool-flow">
                    {cicdGroup.skills?.map((tool) => (
                      <li key={tool.name}>
                        <ToolItem item={tool} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Cell 4: How I work in a team (QA Practices) */}
            {practicesGroup && (
              <div className="expertise-group-cell expertise-cell-border-top">
                <div className="expertise-group-header">
                  <div className="flex items-center gap-3 mb-1.5">
                    <motion.div
                      whileHover={{ scale: 1.18, rotate: 6 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 18,
                      }}
                      className="expertise-group-icon-tile"
                      aria-hidden="true"
                    >
                      <Users size={18} />
                    </motion.div>
                    <h3 className="expertise-plain-title">
                      {practicesGroup.plainTitle || "How I work in a team"}
                    </h3>
                  </div>
                  <span className="expertise-technical-subtitle expertise-secondary-subtitle">
                    {practicesGroup.title}
                  </span>
                  <p className="expertise-descriptor">
                    {practicesGroup.descriptor}
                  </p>
                </div>

                <div className="expertise-cell-body">
                  <ul className="expertise-practice-list">
                    {practicesGroup.practices?.map((practice) => (
                      <li key={practice} className="expertise-practice-item">
                        <span
                          className="expertise-practice-dash"
                          aria-hidden="true"
                        >
                          ―
                        </span>
                        <span>{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalExpertise;
