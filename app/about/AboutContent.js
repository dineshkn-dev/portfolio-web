"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutContent() {
    const careerTimeline = [
        {
            year: "2024 - 2025",
            role: "Software Engineer 3",
            company: "Candescent"
        },
        {
            year: "2022 - 2024",
            role: "Senior Software Engineer",
            company: "HCL Technologies"
        },
        {
            year: "2020 - 2022",
            role: "Backend Developer",
            company: "Wiznet India"
        },
        {
            year: "2019 - 2020",
            role: "Associate Software Engineer",
            company: "Iolite Technologies"
        },
        {
            year: "2018 - 2019",
            role: "Associate Software Engineer",
            company: "Microhard Infotech"
        }
    ];

    const techStack = [
        {
            name: "JavaScript",
            icon: "/icons/javascript.svg",
            level: "Advanced"
        },
        { name: "Node.js", icon: "/icons/nodejs.svg", level: "Advanced" },
        { name: "Express.js", icon: "/icons/express.svg", level: "Advanced" },
        { name: "AWS", icon: "/icons/aws.svg", level: "Advanced" },
        { name: "GraphQL", icon: "/icons/graphql.svg", level: "Advanced" },
        { name: "Azure", icon: "/icons/azure.svg", level: "Intermediate" },
        { name: "NestJS", icon: "/icons/nestjs.svg", level: "Intermediate" },
        { name: "TypeScript", icon: "/icons/typescript.svg", level: "Beginner" }
    ];

    return (
        <div className="h-auto min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 md:px-8 pt-20 overflow-hidden">
            <motion.h1
                className="text-4xl md:text-5xl font-bold text-center neon-text"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}>
                Dinesh K N
            </motion.h1>
            <motion.p
                className="text-lg text-gray-400 mt-1 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}>
                Backend Engineer | Cloud Architect | DevOps Enthusiast
            </motion.p>

            <h2 className="text-2xl font-semibold text-center neon-text mt-8">
                Career Timeline
            </h2>

            <div className="mt-6 w-full overflow-x-auto px-2 md:px-0">
                <div className="flex flex-nowrap justify-start md:justify-center gap-6 items-center pl-4 md:pl-0">
                    {careerTimeline.map((item, index) => (
                        <motion.div
                            key={index}
                            className="relative flex justify-center items-center shrink-0"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.3,
                                duration: 0.8
                            }}>
                            <div className="hexagon w-32 h-36 md:w-40 md:h-44 flex-shrink-0">
                                <div className="hexagon-inner flex flex-col items-center justify-center text-center px-2">
                                    <h3 className="text-xs md:text-sm font-semibold leading-tight">
                                        {item.role}
                                    </h3>
                                    <p className="text-gray-300 text-xs md:text-sm leading-tight">
                                        {item.company}
                                    </p>
                                    <span className="text-xs md:text-sm text-gray-500 leading-tight">
                                        {item.year}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="mt-10 w-full text-center">
                <h2 className="text-2xl font-semibold neon-text">
                    Tech Stack
                </h2>
                <div className="mt-3 flex flex-wrap justify-center gap-6 items-center">
                    {techStack.map((tech, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center p-3 w-24 md:w-32 bg-gray-800 rounded-lg shadow-md hover:shadow-cyan-400 transition-all"
                            whileHover={{ scale: 1.1 }}>
                            <Image
                                src={tech.icon}
                                alt={tech.name}
                                width={48}
                                height={48}
                                className="w-10 md:w-12 h-10 md:h-12"
                            />
                            <p className="text-xs md:text-sm mt-2">
                                {tech.name}
                            </p>
                            <span className="text-xs text-gray-400">
                                {tech.level}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
