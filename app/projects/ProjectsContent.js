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
    return (
        <motion.div
            className="min-h-screen text-white flex flex-col items-center px-4 md:px-16 pt-24 pb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={spring.soft}
        >
            <div className="w-full max-w-[1400px] mx-auto">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 w-full auto-rows-fr"
                    variants={staggerContainer(0.15, 0.1)}
                    initial="initial"
                    animate="animate"
                >
                    {projects.slice(0, 3).map((project, index) => (
                        <motion.div key={index} variants={staggerItem} transition={spring.soft} className="min-h-[260px] md:min-h-[280px]">
                            <TiltCard className="h-full min-h-[260px] md:min-h-[280px]">
                                <motion.div
                                    className="project-card p-4 md:p-5 rounded-xl h-full min-h-[260px] md:min-h-[280px] flex flex-col justify-between"
                                    whileHover={{ scale: 1.02 }}
                                    transition={spring.snappy}
                                >
                                    <div className="flex flex-col flex-grow min-h-0">
                                        <h2 className="text-lg font-semibold tracking-tight shrink-0">{project.title}</h2>
                                        <p className="mt-1.5 text-white/70 flex-grow text-sm leading-relaxed line-clamp-3 min-h-[3.25rem]">{project.description}</p>
                                        <div className="mt-2 flex flex-wrap gap-1.5 shrink-0">
                                            {project.technologies.map((tech, i) => (
                                                <span key={i} className="tech-badge px-2 py-0.5 text-xs rounded-md">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="block mt-3 text-white/50 text-xs shrink-0">
                                            <strong className="text-white/70">{project.company}</strong> · {project.timeline}
                                        </span>
                                    </div>
                                </motion.div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-6 w-full md:max-w-[900px] mx-auto auto-rows-fr"
                    variants={staggerContainer(0.1, 0.1)}
                    initial="initial"
                    animate="animate"
                >
                    {projects.slice(3, 5).map((project, index) => (
                        <motion.div key={index} variants={staggerItem} transition={spring.soft} className="min-h-[260px] md:min-h-[280px]">
                            <TiltCard className="h-full min-h-[260px] md:min-h-[280px]">
                                <motion.div
                                    className="project-card p-4 md:p-5 rounded-xl h-full min-h-[260px] md:min-h-[280px] flex flex-col justify-between"
                                    whileHover={{ scale: 1.02 }}
                                    transition={spring.snappy}
                                >
                                    <div className="flex flex-col flex-grow min-h-0">
                                        <h2 className="text-lg font-semibold tracking-tight shrink-0">{project.title}</h2>
                                        <p className="mt-1.5 text-white/70 flex-grow text-sm leading-relaxed line-clamp-3 min-h-[3.25rem]">{project.description}</p>
                                        <div className="mt-2 flex flex-wrap gap-1.5 shrink-0">
                                            {project.technologies.map((tech, i) => (
                                                <span key={i} className="tech-badge px-2 py-0.5 text-xs rounded-md">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="block mt-3 text-white/50 text-xs shrink-0">
                                            <strong className="text-white/70">{project.company}</strong> · {project.timeline}
                                        </span>
                                    </div>
                                </motion.div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}
