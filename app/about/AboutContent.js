"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { spring, staggerContainer, staggerItem } from "@/lib/motion";

const levelToWidth = { Advanced: 92, Intermediate: 74, Beginner: 58 };

export default function AboutContent() {
    const careerTimeline = [
        {
            year: "2024 - 2025",
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

    const timelinePrimary = careerTimeline.slice(0, 3);
    const timelineSecondary = careerTimeline.slice(3);
    const skillsPrimary = techStack.slice(0, 4);
    const skillsSecondary = techStack.slice(4);

    return (
        <section className="page-shell">
            <motion.div
                className="section-shell section-stack"
                variants={staggerContainer(0.1, 0.1)}
                initial="initial"
                animate="animate"
            >
                <motion.div
                    className="section-intro"
                    variants={staggerItem}
                    transition={spring.soft}
                >
                    <span className="eyebrow">About</span>
                    <h1>Dinesh K N</h1>
                    <p className="section-copy">
                        Backend engineer focused on scalable systems, API architecture, and cloud-first delivery. I enjoy
                        turning complex business workflows into dependable platforms that teams can iterate on quickly.
                    </p>
                </motion.div>

                <motion.div
                    className="section-stack"
                    variants={staggerContainer(0.08, 0.08)}
                    initial="initial"
                    animate="animate"
                >
                    <div>
                        <h2 className="section-title">Experience Timeline</h2>
                        <p className="section-copy">
                            A progression from building proof-of-concepts to leading critical platform services in fintech and enterprise delivery.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {timelinePrimary.map((item) => (
                            <motion.article key={`${item.year}-${item.company}`} className="timeline-card timeline-card--about" variants={staggerItem} transition={spring.soft}>
                                <p className="timeline-year">{item.year}</p>
                                <h3 className="timeline-role">{item.role}</h3>
                                <p className="timeline-company">{item.company}</p>
                                <p className="mt-3 text-sm leading-relaxed line-clamp-3">{item.impact}</p>
                            </motion.article>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full lg:max-w-[760px] mx-auto">
                        {timelineSecondary.map((item) => (
                            <motion.article key={`${item.year}-${item.company}`} className="timeline-card timeline-card--about" variants={staggerItem} transition={spring.soft}>
                                <p className="timeline-year">{item.year}</p>
                                <h3 className="timeline-role">{item.role}</h3>
                                <p className="timeline-company">{item.company}</p>
                                <p className="mt-3 text-sm leading-relaxed line-clamp-3">{item.impact}</p>
                            </motion.article>
                        ))}
                    </div>

                    <div>
                        <h2 className="section-title">Skills Matrix</h2>
                        <p className="section-copy">
                            Core technologies I use regularly, grouped by practical depth and delivery confidence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {skillsPrimary.map((tech) => (
                            <motion.article key={tech.name} className="skill-card skill-card--about" variants={staggerItem} transition={spring.bouncy}>
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={tech.icon}
                                        alt={tech.name}
                                        width={36}
                                        height={36}
                                        className="w-9 h-9"
                                    />
                                    <div>
                                        <h3 className="text-base font-semibold">{tech.name}</h3>
                                        <p className="text-sm">{tech.level}</p>
                                    </div>
                                </div>
                                <div className="skill-meter mt-auto">
                                    <div className="skill-meter-fill" style={{ width: `${levelToWidth[tech.level]}%` }} />
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full lg:max-w-[980px] mx-auto">
                        {skillsSecondary.map((tech) => (
                            <motion.article key={tech.name} className="skill-card skill-card--about" variants={staggerItem} transition={spring.bouncy}>
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={tech.icon}
                                        alt={tech.name}
                                        width={36}
                                        height={36}
                                        className="w-9 h-9"
                                    />
                                    <div>
                                        <h3 className="text-base font-semibold">{tech.name}</h3>
                                        <p className="text-sm">{tech.level}</p>
                                    </div>
                                </div>
                                <div className="skill-meter mt-auto">
                                    <div className="skill-meter-fill" style={{ width: `${levelToWidth[tech.level]}%` }} />
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
