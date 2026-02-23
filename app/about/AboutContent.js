"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { spring, staggerContainer, staggerItem } from "@/lib/motion";

const levelToWidth = { Advanced: 90, Intermediate: 65, Beginner: 40 };

export default function AboutContent() {
    const careerTimeline = [
        { year: "2024 - 2025", role: "Software Engineer 3", company: "Candescent" },
        { year: "2022 - 2024", role: "Senior Software Engineer", company: "HCL Technologies" },
        { year: "2020 - 2022", role: "Backend Developer", company: "Wiznet India" },
        { year: "2019 - 2020", role: "Associate Software Engineer", company: "Iolite Technologies" },
        { year: "2018 - 2019", role: "Associate Software Engineer", company: "Microhard Infotech" },
    ];

    const techStack = [
        { name: "JavaScript", icon: "/icons/javascript.svg", level: "Advanced" },
        { name: "Node.js", icon: "/icons/nodejs.svg", level: "Advanced" },
        { name: "Express.js", icon: "/icons/express.svg", level: "Advanced" },
        { name: "AWS", icon: "/icons/aws.svg", level: "Advanced" },
        { name: "GraphQL", icon: "/icons/graphql.svg", level: "Advanced" },
        { name: "Azure", icon: "/icons/azure.svg", level: "Intermediate" },
        { name: "NestJS", icon: "/icons/nestjs.svg", level: "Intermediate" },
        { name: "TypeScript", icon: "/icons/typescript.svg", level: "Beginner" },
    ];

    return (
        <div className="about-page min-h-screen text-white flex flex-col items-center px-4 md:px-8 pt-24 pb-16 overflow-hidden">
            <motion.div
                className="text-center max-w-2xl mx-auto"
                variants={staggerContainer(0.1, 0.1)}
                initial="initial"
                animate="animate"
            >
                <motion.h1
                    className="text-4xl md:text-5xl font-semibold tracking-tight neon-text"
                    variants={staggerItem}
                    transition={spring.bouncy}
                >
                    Dinesh K N
                </motion.h1>
                <motion.p
                    className="text-lg text-white/60 mt-2"
                    variants={staggerItem}
                    transition={spring.soft}
                >
                    Backend Engineer · Cloud Architect · DevOps Enthusiast
                </motion.p>
            </motion.div>

            <motion.h2
                className="text-xl font-semibold mt-12 mb-6 neon-text"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring.soft, delay: 0.3 }}
            >
                Career Timeline
            </motion.h2>

            <div className="w-full overflow-x-auto px-2 md:px-0 scrollbar-hide">
                <motion.div
                    className="flex flex-nowrap justify-start md:justify-center gap-4 md:gap-6 items-stretch pl-4 md:pl-0 pb-4"
                    variants={staggerContainer(0, 0.12)}
                    initial="initial"
                    animate="animate"
                >
                    {careerTimeline.map((item, index) => (
                        <motion.div
                            key={index}
                            className="hexagon-card flex-shrink-0"
                            variants={staggerItem}
                            transition={spring.soft}
                            whileHover={{ y: -4, transition: spring.snappy }}
                        >
                            <div className="hexagon w-32 h-36 md:w-40 md:h-44 flex-shrink-0">
                                <div className="hexagon-inner flex flex-col items-center justify-center text-center px-2">
                                    <h3 className="text-xs md:text-sm font-semibold leading-tight">{item.role}</h3>
                                    <p className="text-white/70 text-xs md:text-sm leading-tight">{item.company}</p>
                                    <span className="text-xs text-white/50 leading-tight">{item.year}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <motion.h2
                className="text-xl font-semibold mt-14 mb-6 neon-text"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring.soft, delay: 0.2 }}
            >
                Tech Stack
            </motion.h2>

            <motion.div
                className="flex flex-wrap justify-center gap-4 md:gap-6"
                variants={staggerContainer(0.1, 0.06)}
                initial="initial"
                animate="animate"
            >
                {techStack.map((tech, index) => (
                    <motion.div
                        key={tech.name}
                        className="tech-orb group"
                        variants={staggerItem}
                        transition={spring.bouncy}
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="tech-orb-inner">
                            <Image
                                src={tech.icon}
                                alt={tech.name}
                                width={48}
                                height={48}
                                className="w-10 md:w-12 h-10 md:h-12 transition-transform duration-300 group-hover:scale-110"
                            />
                            <p className="text-xs md:text-sm mt-2 font-medium">{tech.name}</p>
                            <div className="tech-orb-level mt-1.5">
                                <div
                                    className="tech-orb-fill"
                                    style={{ width: `${levelToWidth[tech.level]}%` }}
                                />
                            </div>
                            <span className="text-[10px] md:text-xs text-white/50 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                {tech.level}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
