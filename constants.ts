import { SkillCategory, Experience, Education, ExpertiseGroup } from "./types";

export const RESUME_URL = `${import.meta.env.BASE_URL}assets/resume.pdf`;

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/abeesh-s-b35271228/",
  github: "https://github.com/AbeeshSengottuvel",
  instagram: "https://www.instagram.com/abeesh.2002/#",
  email: "mailto:abeeshsengottuvel12@gmail.com",
  phone: "tel:+919047722626",
};

export const EXPERTISE_GROUPS: ExpertiseGroup[] = [
  {
    id: "test-automation",
    title: "Test Automation",
    descriptor: "UI and API testing, end to end",
    icon: "build",
    iconAccent: "blue",
    gridClass: "skills-card-span-8",
    subGroups: [
      {
        label: "UI & API",
        skills: [
          {
            name: "Selenium",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
            primary: false,
          },
          {
            name: "Playwright",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg",
            primary: false,
          },
          {
            name: "Postman",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
            primary: false,
          },
          {
            name: "RestSharp",
            icon: "https://restsharp.dev/img/restsharp.png",
            primary: false,
          },
        ],
      },
      {
        label: "Frameworks & runners",
        skills: [
          {
            name: "TestNG",
            icon: "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/qtest/qtest-original.svg",
            primary: false,
          },
          {
            name: "NUnit",
            icon: "https://nunit.org/img/nunit.svg",
            primary: false,
          },
          {
            name: "Cucumber",
            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cucumber/cucumber-plain.svg",
            primary: false,
          },
        ],
      },
    ],
  },
  {
    id: "ai-testing",
    title: "AI-Assisted Testing",
    descriptor: "Faster test writing and debugging",
    icon: "brain",
    iconAccent: "amber",
    gridClass: "skills-card-span-4",
    skills: [
      {
        name: "Claude",
        caption: "Test design and debugging",
        icon: "https://cdn.simpleicons.org/claude/D97706",
        primary: false,
      },
      {
        name: "GitHub Copilot",
        caption: "Inline code completion",
        icon: "https://cdn.simpleicons.org/githubcopilot",
        primary: false,
      },
      {
        name: "Windsurf",
        caption: "Agentic coding in the IDE",
        icon: "https://yt3.googleusercontent.com/6kLNxjLW3OREYdL7Y_sAzCuolXAmQkjJZVTCAch3Q_-hGZ2049wD2PSTFTfi9M8Iqh0PpxgChjU=s160-c-k-c0x00ffffff-no-rj",
        primary: false,
      },
    ],
  },
  {
    id: "languages-ides",
    title: "Languages & IDEs",
    descriptor: "Where the test code gets written",
    icon: "code",
    iconAccent: "blue",
    gridClass: "skills-card-span-4",
    skills: [
      {
        name: "Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        primary: false,
      },
      {
        name: "C#",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
        primary: false,
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        primary: false,
      },
      {
        name: "VS Code",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        primary: false,
      },
      {
        name: "Eclipse",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eclipse/eclipse-original.svg",
        primary: false,
      },
    ],
  },
  {
    id: "cicd-management",
    title: "CI/CD & Test Management",
    descriptor: "Pipelines, source control, tracking",
    icon: "database",
    iconAccent: "blue",
    gridClass: "skills-card-span-4",
    skills: [
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        primary: false,
      },
      {
        name: "GitHub",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        primary: false,
      },
      {
        name: "Azure DevOps",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuredevops/azuredevops-original.svg",
        primary: false,
      },
      {
        name: "Jenkins",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
        primary: false,
      },
      {
        name: "Maven",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg",
        primary: false,
      },
      {
        name: "QTest",
        icon: "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/qtest/qtest-original.svg",
        primary: false,
      },
    ],
  },
  {
    id: "qa-practices",
    title: "QA Practices",
    descriptor: "How I work inside sprint teams",
    icon: "groups",
    iconAccent: "blue",
    gridClass: "skills-card-span-4 skills-card-practices",
    practices: [
      "Test case design & execution",
      "Defect analysis & reporting",
      "Agile sprint-based QA delivery",
      "Cross-functional teamwork",
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Test Automation & API Engineering",
    icon: "build",
    skills: [
      {
        name: "Selenium",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
      },
      {
        name: "Playwright",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg",
      },
      {
        name: "Postman",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
      },
      {
        name: "RestSharp",
        icon: "https://restsharp.dev/img/restsharp.png",
      },
      {
        name: "TestNG",
        icon: "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/qtest/qtest-original.svg",
      },
      {
        name: "Cucumber",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cucumber/cucumber-plain.svg",
      },
      {
        name: "NUnit",
        icon: "https://nunit.org/img/nunit.svg",
      },
    ],
  },
  {
    title: "AI-Assisted Test Automation",
    icon: "brain",
    skills: [
      {
        name: "Claude",
        icon: "https://cdn.simpleicons.org/claude/D97706",
      },
      {
        name: "GitHub Copilot",
        icon: "https://cdn.simpleicons.org/githubcopilot",
      },
      {
        name: "Windsurf",
        icon: "https://yt3.googleusercontent.com/6kLNxjLW3OREYdL7Y_sAzCuolXAmQkjJZVTCAch3Q_-hGZ2049wD2PSTFTfi9M8Iqh0PpxgChjU=s160-c-k-c0x00ffffff-no-rj",
      },
    ],
  },
  {
    title: "Programming & Test Development",
    icon: "code",
    skills: [
      {
        name: "Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      {
        name: "C#",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      },
    ],
  },
  {
    title: "Test Infrastructure & CI/CD Tooling",
    icon: "database",
    skills: [
      {
        name: "Azure",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
      },
      {
        name: "Azure DevOps",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuredevops/azuredevops-original.svg",
      },
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "Jenkins",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
      },
      {
        name: "Maven",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg",
      },
      {
        name: "QTest",
        icon: "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/qtest/qtest-original.svg",
      },
    ],
  },
  {
    title: "Development & Debugging Tools",
    icon: "psychology",
    skills: [
      {
        name: "VS Code",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      },
      {
        name: "Eclipse",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eclipse/eclipse-original.svg",
      },
      {
        name: "GitHub",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      },
    ],
  },
  {
    title: "Quality Engineering & Delivery Practices",
    icon: "groups",
    skills: [
      {
        name: "Test Case Design & Execution",
      },
      {
        name: "Agile Collaboration",
      },
      {
        name: "Sprint-Based QA Delivery",
      },
      {
        name: "Defect Analysis & Reporting",
      },
      {
        name: "Cross-Functional Teamwork",
      },
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Quality Assurance (QA) Engineer",
    company: "Cognizant (Client: Humana Inc.)",
    period: "August 2024 – Present",
    active: true,
    points: [
      "Engineered and automated 110+ robust test cases across UI (Selenium) and API (REST API) layers, successfully reducing regression testing cycles by 40%.",
      "Architected and maintained scalable automation frameworks in C# utilizing NUnit, significantly enhancing code reusability and execution stability.",
      "Spearheaded comprehensive functional, regression, and integration testing within fast-paced Agile environments to guarantee high-fidelity product releases.",
      "Collaborated seamlessly with cross-functional engineering and product teams to proactively identify and resolve critical issues, reducing defect leakage by 15%.",
      "Orchestrated test management using QTest and maintained version control with Git, streamlining the CI/CD pipeline and automation workflow.",
    ],
  },
];

export const EDUCATION_LIST: Education[] = [
  {
    degree:
      "Bachelor of Engineering in Electronics and Communication Engineering",
    institution: "Sri Ramakrishna Engineering College, Coimbatore",
    year: "Graduated: 2023 | CGPA: 7.56",
    icon: "school",
  },
];

const CONTACT_LIST = [
  {
    icon: "mail",
    label: "Email",
    value: "abeeshsengottuvel12@gmail.com",
    href: SOCIAL_LINKS.email,
  },
  {
    icon: "phone",
    label: "Phone",
    value: "+91 9047722626",
    href: SOCIAL_LINKS.phone,
  },
  {
    icon: "location",
    label: "Location",
    value: "Chennai, India",
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    value: "Abeesh S.",
    href: SOCIAL_LINKS.linkedin,
  },
  {
    icon: "github",
    label: "GitHub",
    value: "AbeeshSengottuvel",
    href: SOCIAL_LINKS.github,
  },
  {
    icon: "instagram",
    label: "Instagram",
    value: "@abeesh",
    href: SOCIAL_LINKS.instagram,
  },
];
