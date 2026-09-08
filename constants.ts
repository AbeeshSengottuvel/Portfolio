import { SkillCategory, Experience, Education } from "./types";

export const RESUME_URL = `${import.meta.env.BASE_URL}assets/resume.pdf`;

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/abeesh-s-b35271228/",
  github: "https://github.com/AbeeshSengottuvel",
  instagram: "https://www.instagram.com/abeesh.2002/#",
  email: "mailto:abeeshsengottuvel12@gmail.com",
  phone: "tel:+919047722626",
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming & Test Development Languages",
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
    ],
  },
  {
    title: "Test Automation & API Engineering",
    icon: "build",
    skills: [
      {
        name: "Selenium",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
      },
      {
        name: "Postman",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
      },
      { name: "RestSharp", icon: "https://restsharp.dev/img/restsharp.png" },
      {
        name: "TestNG",
        icon: "https://i.pinimg.com/736x/b1/c5/07/b1c50720d7c59caff5660adbe3e0f9a9.jpg",
      },
      {
        name: "Cucumber",
        icon: "https://icon.icepanel.io/Technology/svg/Cucumber.svg",
      },
      { name: "NUnit", icon: "https://nunit.org/img/nunit.svg" },
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
        name: "QTest",
        icon: "https://raw.githubusercontent.com/devicons/devicon/54cfe13ac10eaa1ef817a343ab0a9437eb3c2e08/icons/qtest/qtest-original.svg",
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
    ],
  },
  {
    title: "AI-Assisted Test Automation",
    icon: "brain",
    skills: [
      {
        name: "Windsurf",
        icon: "https://yt3.googleusercontent.com/6kLNxjLW3OREYdL7Y_sAzCuolXAmQkjJZVTCAch3Q_-hGZ2049wD2PSTFTfi9M8Iqh0PpxgChjU=s160-c-k-c0x00ffffff-no-rj",
      },
    ],
  },
  {
    title: "Development & Debugging Environment",
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
        icon: "https://cdn-icons-png.flaticon.com/256/25/25231.png",
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
