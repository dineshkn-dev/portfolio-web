"use client";

import { motion } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import { spring, staggerContainer, staggerItem } from "@/lib/motion";

const projects = [
    {
        title: "Digital Banking Portal",
        description: "Developing and maintaining scalable backend APIs using NestJS and Typescript.",
        technologies: ["Typescript", "NestJS", "Redis", "JWT", "Jest", "GCP"],
        company: "Candescent",
        timeline: "Sep 2024 – Nov 2025",
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

export default function ProjectsContent() {
    const primaryProjects = projects.slice(0, 3);
    const secondaryProjects = projects.slice(3);

    const renderCard = (project) => {
        const visibleTech = project.technologies.slice(0, 4);
        const extraTechCount = Math.max(0, project.technologies.length - visibleTech.length);

        return (
            <TiltCard className="h-full">
                <article className="project-card p-6 h-full min-h-[295px] flex flex-col">
                    <h2 className="text-[1.7rem] leading-tight font-semibold tracking-tight text-[var(--foreground)]">{project.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed line-clamp-3">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {visibleTech.map((tech) => (
                            <span key={`${project.title}-${tech}`} className="tech-badge">{tech}</span>
                        ))}
                        {extraTechCount > 0 && <span className="tech-badge">+{extraTechCount} more</span>}
                    </div>

                    <p className="mt-auto pt-5 text-sm text-[var(--muted-foreground)]">
                        <strong className="text-[var(--foreground)]">{project.company}</strong> · {project.timeline}
                    </p>
                </article>
            </TiltCard>
        );
    };

    return (
        <section className="page-shell">
            <motion.div
                className="section-shell section-stack"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={spring.soft}
            >
                <motion.div className="section-intro" variants={staggerContainer(0.1, 0.08)} initial="initial" animate="animate">
                    <motion.span className="eyebrow" variants={staggerItem}>Projects</motion.span>
                    <motion.h1 variants={staggerItem}>Production platforms and high-impact engineering delivery.</motion.h1>
                    <motion.p className="section-copy" variants={staggerItem}>
                        Selected work across fintech, IoT, HR systems, and ML applications, with a focus on API reliability,
                        scale, and measurable delivery outcomes.
                    </motion.p>
                </motion.div>

                <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-5" variants={staggerContainer(0.08, 0.08)} initial="initial" animate="animate">
                    {primaryProjects.map((project) => (
                        <motion.div key={project.title} variants={staggerItem} transition={spring.soft}>
                            {renderCard(project)}
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full lg:max-w-[760px] mx-auto" variants={staggerContainer(0.08, 0.08)} initial="initial" animate="animate">
                    {secondaryProjects.map((project) => (
                        <motion.div key={project.title} variants={staggerItem} transition={spring.soft}>
                            {renderCard(project)}
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
