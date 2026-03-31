"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { spring, staggerContainer, staggerItem } from "@/lib/motion";
import { aboutIntro, careerTimeline, skillLevelWidth, techStack } from "@/lib/site-content";

export default function AboutContent() {
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
                    <span className="eyebrow">{aboutIntro.eyebrow}</span>
                    <h1>{aboutIntro.title}</h1>
                    <p className="section-copy">
                        {aboutIntro.description}
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
                                    <div className="skill-meter-fill" style={{ width: `${skillLevelWidth[tech.level]}%` }} />
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
                                    <div className="skill-meter-fill" style={{ width: `${skillLevelWidth[tech.level]}%` }} />
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
