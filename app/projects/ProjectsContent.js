"use client";
import { motion } from "framer-motion";

export default function ProjectsContent() {
    const projects = [
        {
            title: "Digital Banking Portal",
            description:
                "Developing and maintaining scalable backend APIs using NestJS and Typescript.",
            technologies: [
                "Typescript",
                "NestJS",
                "Redis",
                "JWT",
                "Jest",
                "GCP"
            ],
            company: "Candescent",
            timeline: "Sep 2024 – Nov 2025"
        },
        {
            title: "Welbilt Kitchen Connect IoT Dashboard",
            description:
                "Developed high-performance REST APIs for seamless third-party integrations and optimized data flow.",
            technologies: [
                "JavaScript",
                "Node.js",
                "Express.js",
                "API Gateway",
                "IoT Core",
                "MySQL",
                "AWS"
            ],
            company: "HCL Technologies",
            timeline: "Apr 2022 – Sep 2024"
        },
        {
            title: "HRMS & Recruitment Management System",
            description:
                "Designed GraphQL APIs for HRMS & RMS platforms, improving system scalability and efficiency.",
            technologies: [
                "JavaScript",
                "Node.js",
                "Express.js",
                "GraphQL",
                "PostgreSQL",
                "Azure"
            ],
            company: "Wiznet India Pvt Ltd",
            timeline: "Jul 2020 – Mar 2022"
        },
        {
            title: "Background Removal Mobile App",
            description:
                "Developed a mobile app using Machine Learning models for image background removal.",
            technologies: [
                "JavaScript",
                "Python",
                "Machine Learning",
                "Android - Java",
                "iOS - Objective C"
            ],
            company: "Iolite Technologies Pvt Ltd",
            timeline: "Jun 2019 – Jun 2020"
        },
        {
            title: "Research & Proof of Concept ML Projects",
            description:
                "Implemented multiple Machine Learning use cases for Research & Proof of Concept purposes.",
            technologies: [
                "JavaScript",
                "Python",
                "Machine Learning",
                "Deep Learning"
            ],
            company: "Microhard Infotech LLC",
            timeline: "Jun 2018 – Jun 2019"
        }
    ];

    return (
        <motion.div
            className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 md:px-16 pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}>
            <div className="w-full max-w-[1400px] mx-auto">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start w-full"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2 }
                        }
                    }}>
                    {projects.slice(0, 3).map((project, index) => (
                        <motion.div
                            key={index}
                            className="project-card p-6 rounded-lg shadow-lg transition-transform flex flex-col justify-between h-full"
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            whileHover={{ scale: 1.05 }}>
                            <div className="max-w-lg flex flex-col flex-grow">
                                <h2 className="text-xl font-bold">
                                    {project.title}
                                </h2>
                                <p className="mt-2 text-gray-300 flex-grow">
                                    {project.description}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {project.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="tech-badge px-3 py-1 text-sm rounded-md">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <span className="block mt-4 text-gray-500">
                                    <strong>{project.company}</strong> |{" "}
                                    {project.timeline}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center mx-auto mt-8 w-full md:max-w-[900px] items-stretch"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2 }
                        }
                    }}>
                    {projects.slice(3, 5).map((project, index) => (
                        <motion.div
                            key={index}
                            className="project-card p-6 rounded-lg shadow-lg transition-transform flex flex-col justify-between h-full"
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            whileHover={{ scale: 1.05 }}>
                            <div className="max-w-lg flex flex-col flex-grow">
                                <h2 className="text-xl font-bold">
                                    {project.title}
                                </h2>
                                <p className="mt-2 text-gray-300 flex-grow">
                                    {project.description}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {project.technologies.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="tech-badge px-3 py-1 text-sm rounded-md">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <span className="block mt-4 text-gray-500">
                                    <strong>{project.company}</strong> |{" "}
                                    {project.timeline}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}
