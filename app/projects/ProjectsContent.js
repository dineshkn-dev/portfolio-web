"use client";

import TiltCard from "@/components/TiltCard";
import { useMotionUI } from "@/lib/motion-ui";
import { projects } from "@/lib/site-content";

export default function ProjectsContent() {
    const { m, spring, staggerContainer, staggerItem, motionInitial, motionAnimate } = useMotionUI();
    const Div = m.div;
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
            <Div
                className="section-shell section-stack"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={spring.soft}
            >
                <Div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-5"
                    variants={staggerContainer(0.08, 0.08)}
                    initial={motionInitial}
                    animate={motionAnimate}
                >
                    {primaryProjects.map((project) => (
                        <Div key={project.title} variants={staggerItem} transition={spring.soft}>
                            {renderCard(project)}
                        </Div>
                    ))}
                </Div>

                <Div
                    className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full lg:max-w-[880px] mx-auto"
                    variants={staggerContainer(0.08, 0.08)}
                    initial={motionInitial}
                    animate={motionAnimate}
                >
                    {secondaryProjects.map((project) => (
                        <Div key={project.title} variants={staggerItem} transition={spring.soft}>
                            {renderCard(project)}
                        </Div>
                    ))}
                </Div>
            </Div>
        </section>
    );
}
