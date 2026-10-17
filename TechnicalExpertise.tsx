import React, { useEffect, useRef, useState } from "react";
import { Wrench, Brain, Code, Database, Users } from "lucide-react";
import { ExpertiseGroup, SkillItem } from "./types";
import { EXPERTISE_GROUPS } from "./constants";
import "./TechnicalExpertise.css";

const HEADER_ICONS: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  build: Wrench,
  brain: Brain,
  code: Code,
  database: Database,
  groups: Users,
};

/**
 * Chip Component
 * Flat fill rgba(15,23,42,.04), inset hairline, height 36px, padding 0 14px 0 10px,
 * radius 10px, gap 8px, text 15px/500, non-interactive (no hover/pointer).
 * Decorative icon with alt="". Optional primary flag with weight 600 and blue dot.
 */
export const Chip: React.FC<{ item: SkillItem }> = ({ item }) => {
  const isJava = item.name === "Java";
  const isMaven = item.name === "Maven";
  const isWindsurf = item.name === "Windsurf";
  const optClass = isJava
    ? "skills-icon-opt-java"
    : isMaven
    ? "skills-icon-opt-maven"
    : isWindsurf
    ? "skills-icon-opt-windsurf"
    : "";

  return (
    <span
      className={`skills-chip ${item.primary ? "skills-chip-primary" : ""}`}
    >
      {item.primary && (
        <span className="skills-primary-dot" aria-hidden="true" />
      )}
      {item.icon && (
        <span className="skills-icon-box" aria-hidden="true">
          <img
            src={item.icon}
            alt=""
            className={`skills-icon ${optClass}`}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </span>
      )}
      <span className="skills-chip-name">{item.name}</span>
    </span>
  );
};

/**
 * Card Component
 * Semantic <article> with 44px icon tile, single-line h3, and single-line descriptor.
 * Content starts at the exact same vertical baseline across all cards in each row.
 */
export const Card: React.FC<{ group: ExpertiseGroup }> = ({ group }) => {
  const IconComponent = HEADER_ICONS[group.icon] || Wrench;
  const isAmberTile = group.iconAccent === "amber";
  const isAiCard = group.id === "ai-testing";

  return (
    <article className="skills-card">
      {/* Shared Baseline Header: exactly 44px tall */}
      <div className="skills-card-header">
        <div
          className={`skills-icon-tile ${
            isAmberTile ? "skills-icon-tile-amber" : "skills-icon-tile-blue"
          }`}
          aria-hidden="true"
        >
          <IconComponent size={22} />
        </div>
        <div className="skills-header-content">
          <h3 className="skills-card-title">{group.title}</h3>
          <p className="skills-card-descriptor">{group.descriptor}</p>
        </div>
      </div>

      {/* Card Content */}
      <div className="skills-card-body">
        {/* Layout 1: AI Card Stacked Full-Width Rows (56px tall, 12px radius) */}
        {isAiCard && group.skills && (
          <ul className="skills-ai-stack">
            {group.skills.map((skill) => (
              <li key={skill.name} className="skills-ai-row">
                {skill.primary && (
                  <span className="skills-primary-dot" aria-hidden="true" />
                )}
                {skill.icon && (
                  <span className="skills-icon-box" aria-hidden="true">
                    <img
                      src={skill.icon}
                      alt=""
                      className={`skills-icon ${
                        skill.name === "Windsurf" ? "skills-icon-opt-windsurf" : ""
                      }`}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </span>
                )}
                <div className="skills-ai-text">
                  <span className="skills-ai-name">{skill.name}</span>
                  {skill.caption && (
                    <span className="skills-ai-caption">{skill.caption}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Layout 2: Sub-groups (UI & API / Frameworks & runners) */}
        {!isAiCard &&
          group.subGroups &&
          group.subGroups.map((subGroup) => (
            <div key={subGroup.label} className="skills-subgroup">
              <h4 className="skills-subgroup-title">{subGroup.label}</h4>
              <ul className="skills-chip-list">
                {subGroup.skills.map((skill) => (
                  <li key={skill.name}>
                    <Chip item={skill} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

        {/* Layout 3: Standard chip list (Languages & IDEs, CI/CD) */}
        {!isAiCard && !group.subGroups && group.skills && (
          <ul className="skills-chip-list">
            {group.skills.map((skill) => (
              <li key={skill.name}>
                <Chip item={skill} />
              </li>
            ))}
          </ul>
        )}

        {/* Layout 4: QA Practices plain list with 6px blue dots */}
        {!isAiCard && group.practices && (
          <ul className="skills-practice-list">
            {group.practices.map((practice) => (
              <li key={practice} className="skills-practice-item">
                {practice}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
};

interface TechnicalExpertiseProps {
  groups?: ExpertiseGroup[];
}

/**
 * TechnicalExpertise Section
 * Apple-grade refinement with 8pt spacing, entrance animation, and strict baseline alignment.
 */
export const TechnicalExpertise: React.FC<TechnicalExpertiseProps> = ({
  groups = EXPERTISE_GROUPS,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Immediate fallback if IntersectionObserver is unsupported or reduced motion is preferred
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
      { threshold: 0.2 }
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

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`skills-section ${isVisible ? "is-visible" : ""}`}
    >
      <div className="skills-container">
        {/* Section Heading & Blue Accent Bar (64x4px, 20px below) */}
        <div className="skills-heading-container">
          <h2 className="skills-heading">Technical Expertise</h2>
          <div className="skills-accent-bar" aria-hidden="true" />
        </div>

        {/* 12-Column Responsive Grid */}
        <div className="skills-grid">
          {groups.map((group, index) => {
            const customResponsiveClass =
              group.id === "ai-testing"
                ? "skills-card-ai"
                : group.id === "qa-practices"
                ? "skills-card-practices"
                : "";

            return (
              <div
                key={group.id}
                className={`${group.gridClass} ${customResponsiveClass} skills-card-wrapper`}
                style={{ "--card-index": index } as React.CSSProperties}
              >
                <Card group={group} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnicalExpertise;
