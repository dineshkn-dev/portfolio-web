"use client";

import { useMotionUI } from "@/lib/motion-ui";
import { aboutIntro, careerTimeline } from "@/lib/site-content";

export default function AboutContent() {
    const { m, spring, staggerContainer, staggerItem, animateClass, motionInitial, motionAnimate } = useMotionUI();
    const Div = m.div;
    const Article = m.article;
    const timelinePrimary = careerTimeline.slice(0, 3);
    const timelineSecondary = careerTimeline.slice(3);

    return (
        <section className="page-shell">
            <Div
                className={`section-shell section-stack ${animateClass}`}
                variants={staggerContainer(0.1, 0.1)}
                initial={motionInitial}
                animate={motionAnimate}
            >
                <Div className="section-intro section-intro--full" variants={staggerItem} transition={spring.soft}>
                    <span className="eyebrow">{aboutIntro.eyebrow}</span>
                    <h1>{aboutIntro.title}</h1>
                    <p className="section-copy">{aboutIntro.description}</p>
                </Div>

                <Div
                    className="section-stack"
                    variants={staggerContainer(0.08, 0.08)}
                    initial={motionInitial}
                    animate={motionAnimate}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {timelinePrimary.map((item) => (
                            <Article
                                key={`${item.year}-${item.company}`}
                                className="timeline-card timeline-card--about"
                                variants={staggerItem}
                                transition={spring.soft}
                            >
                                <p className="timeline-year">{item.year}</p>
                                <h3 className="timeline-role">{item.role}</h3>
                                <p className="timeline-company">{item.company}</p>
                                <p className="mt-3 text-sm leading-relaxed line-clamp-3">{item.impact}</p>
                            </Article>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full lg:max-w-[880px] mx-auto">
                        {timelineSecondary.map((item) => (
                            <Article
                                key={`${item.year}-${item.company}`}
                                className="timeline-card timeline-card--about"
                                variants={staggerItem}
                                transition={spring.soft}
                            >
                                <p className="timeline-year">{item.year}</p>
                                <h3 className="timeline-role">{item.role}</h3>
                                <p className="timeline-company">{item.company}</p>
                                <p className="mt-3 text-sm leading-relaxed line-clamp-3">{item.impact}</p>
                            </Article>
                        ))}
                    </div>
                </Div>
            </Div>
        </section>
    );
}
