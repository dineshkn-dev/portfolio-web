"use client";

import Image from "next/image";
import { useMotionUI } from "@/lib/motion-ui";
import { skillLevelWidth, techStack } from "@/lib/site-content";

export default function SkillsContent() {
    const { m, spring, staggerContainer, staggerItem, motionInitial, motionAnimate } = useMotionUI();
    const Div = m.div;
    const Article = m.article;
    const skillsPrimary = techStack.slice(0, 4);
    const skillsSecondary = techStack.slice(4);

    return (
        <section className="page-shell">
            <Div
                className="section-shell section-stack"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={spring.soft}
            >
                <Div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                    variants={staggerContainer(0.08, 0.08)}
                    initial={motionInitial}
                    animate={motionAnimate}
                >
                    {skillsPrimary.map((tech) => (
                        <Article
                            key={tech.name}
                            className="skill-card skill-card--about"
                            variants={staggerItem}
                            transition={spring.bouncy}
                        >
                            <div className="flex items-center gap-3">
                                <Image src={tech.icon} alt={tech.name} width={36} height={36} className="w-9 h-9" />
                                <div>
                                    <h3 className="text-base font-semibold">{tech.name}</h3>
                                    <p className="text-sm">{tech.level}</p>
                                </div>
                            </div>
                            <div className="skill-meter mt-auto">
                                <div className="skill-meter-fill" style={{ width: `${skillLevelWidth[tech.level]}%` }} />
                            </div>
                        </Article>
                    ))}
                </Div>

                <Div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full lg:max-w-[1120px] mx-auto"
                    variants={staggerContainer(0.08, 0.08)}
                    initial={motionInitial}
                    animate={motionAnimate}
                >
                    {skillsSecondary.map((tech) => (
                        <Article
                            key={tech.name}
                            className="skill-card skill-card--about"
                            variants={staggerItem}
                            transition={spring.bouncy}
                        >
                            <div className="flex items-center gap-3">
                                <Image src={tech.icon} alt={tech.name} width={36} height={36} className="w-9 h-9" />
                                <div>
                                    <h3 className="text-base font-semibold">{tech.name}</h3>
                                    <p className="text-sm">{tech.level}</p>
                                </div>
                            </div>
                            <div className="skill-meter mt-auto">
                                <div className="skill-meter-fill" style={{ width: `${skillLevelWidth[tech.level]}%` }} />
                            </div>
                        </Article>
                    ))}
                </Div>
            </Div>
        </section>
    );
}
