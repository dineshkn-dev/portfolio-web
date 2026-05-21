export const homeStats = [
    { label: "Years Building", value: "7+" },
    { label: "Core Stack", value: "Node.js / TS" },
    { label: "Cloud Delivery", value: "AWS · Azure · GCP" },
];

export const aboutIntro = {
    eyebrow: "About",
    title: "Dinesh K N",
    description:
        "Backend engineer focused on scalable systems, API architecture, and cloud-first delivery. I enjoy turning complex business workflows into dependable platforms that teams can iterate on quickly.",
};

export const careerTimeline = [
    {
        year: "2024 - Present",
        role: "Software Engineer 3",
        company: "Candescent",
        impact: "Led backend API delivery for core banking workflows with reliability and security at scale.",
    },
    {
        year: "2022 - 2024",
        role: "Senior Software Engineer",
        company: "HCL Technologies",
        impact: "Shipped high-throughput integrations and real-time workflows for connected kitchen products.",
    },
    {
        year: "2020 - 2022",
        role: "Backend Developer",
        company: "Wiznet India",
        impact: "Designed GraphQL and REST services that improved release velocity across HR platforms.",
    },
    {
        year: "2019 - 2020",
        role: "Associate Software Engineer",
        company: "Iolite Technologies",
        impact: "Contributed to ML-based product features and productionized service endpoints.",
    },
    {
        year: "2018 - 2019",
        role: "Associate Software Engineer",
        company: "Microhard Infotech",
        impact: "Built proof-of-concept systems across ML use cases and backend automation.",
    },
];

export const techStack = [
    { name: "JavaScript", icon: "/icons/javascript.svg", level: "Advanced" },
    { name: "Node.js", icon: "/icons/nodejs.svg", level: "Advanced" },
    { name: "Express.js", icon: "/icons/express.svg", level: "Advanced" },
    { name: "AWS", icon: "/icons/aws.svg", level: "Advanced" },
    { name: "GraphQL", icon: "/icons/graphql.svg", level: "Advanced" },
    { name: "Azure", icon: "/icons/azure.svg", level: "Intermediate" },
    { name: "NestJS", icon: "/icons/nestjs.svg", level: "Intermediate" },
    { name: "TypeScript", icon: "/icons/typescript.svg", level: "Beginner" },
];

export const skillLevelWidth = { Advanced: 92, Intermediate: 74, Beginner: 58 };

export const projects = [
    {
        title: "Digital Banking Portal",
        description: "Developing and maintaining scalable backend APIs using NestJS and Typescript.",
        technologies: ["Typescript", "NestJS", "Redis", "JWT", "Jest", "GCP"],
        company: "Candescent",
        timeline: "Sep 2024 – Present",
    },
    {
        title: "Welbilt Kitchen Connect IoT Dashboard",
        description: "Developed high-performance REST APIs for seamless third-party integrations and optimized data flow.",
        technologies: ["JavaScript", "Node.js", "Express.js", "API Gateway", "IoT Core", "MySQL", "AWS"],
        company: "HCL Technologies",
        timeline: "Apr 2022 – Sep 2024",
    },
    {
        title: "HRMS & Recruitment Management System",
        description: "Designed GraphQL APIs for HRMS & RMS platforms, improving system scalability and efficiency.",
        technologies: ["JavaScript", "Node.js", "Express.js", "GraphQL", "PostgreSQL", "Azure"],
        company: "Wiznet India Pvt Ltd",
        timeline: "Jul 2020 – Mar 2022",
    },
    {
        title: "Background Removal Mobile App",
        description: "Developed a mobile app using Machine Learning models for image background removal.",
        technologies: ["JavaScript", "Python", "Machine Learning", "Android - Java", "iOS - Objective C"],
        company: "Iolite Technologies Pvt Ltd",
        timeline: "Jun 2019 – Jun 2020",
    },
    {
        title: "Research & Proof of Concept ML Projects",
        description: "Implemented multiple Machine Learning use cases for Research & Proof of Concept purposes.",
        technologies: ["JavaScript", "Python", "Machine Learning", "Deep Learning"],
        company: "Microhard Infotech LLC",
        timeline: "Jun 2018 – Jun 2019",
    },
];

export const socialLinks = [
    { platform: "LinkedIn", href: "https://www.linkedin.com/in/dinesh-kn/", color: "text-[#0a66c2]" },
    { platform: "GitHub", href: "https://github.com/dineshkn-dev", color: "text-[var(--foreground)]" },
    { platform: "Email", href: "mailto:kandilindinesh@gmail.com", color: "text-red-400" },
];

export const contactFormEndpoint = "https://formspree.io/f/meoelkyp";

export const jarvisLines = {
    bootComplete: "All systems online. Welcome back, sir.",
    welcome: "JARVIS interface initialized. Awaiting your command.",
    status: "All subsystems nominal. Reactor stable. Uplink secure.",
    unknown: "I didn't catch that. Try the command palette with Control K, or say open projects.",
    contactSuccess: "Message transmitted. I'll respond shortly.",
    listening: "Listening…",
    voiceOff: "Voice interface disabled.",
    voiceOn: "Voice interface active. How may I assist?",
};

export const cockpitBrief = {
    eyebrow: "J.A.R.V.I.S // Systems Online",
    headline: "Backend systems engineered for scale under pressure.",
    subline:
        "API-first platforms, cloud-native delivery, and observability pipelines your teams can trust.",
    mission: [
        "Initialize project archive",
        "Scan skills matrix",
        "Open comms channel",
    ],
};
