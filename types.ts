
export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillItem {
  name: string;
  icon?: string;
  caption?: string;
  primary?: boolean;
}

export interface SkillSubGroup {
  label: string;
  skills: SkillItem[];
}

export interface ExpertiseGroup {
  id: string;
  title: string;
  descriptor: string;
  icon: "build" | "brain" | "code" | "database" | "groups";
  iconAccent?: "blue" | "amber";
  gridClass: string;
  subGroups?: SkillSubGroup[];
  skills?: SkillItem[];
  practices?: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  points: string[];
  active?: boolean;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  icon: string;
}
