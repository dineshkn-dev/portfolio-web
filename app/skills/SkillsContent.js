"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import ModulePage from "@/components/jarvis/ModulePage";
import { useJarvisAudio } from "@/components/jarvis/AudioController";
import { skillLevelWidth, techStack } from "@/lib/site-content";

const FILTERS = ["All", "Advanced", "Intermediate", "Beginner"];

const levelClass = {
    Advanced: "hud-skill-level--advanced",
    Intermediate: "hud-skill-level--intermediate",
    Beginner: "hud-skill-level--beginner",
};

export default function SkillsContent() {
    const [filter, setFilter] = useState("All");
    const [active, setActive] = useState(techStack[0]);
    const { playSfx } = useJarvisAudio();

    const filtered = useMemo(() => {
        if (filter === "All") return techStack;
        return techStack.filter((t) => t.level === filter);
    }, [filter]);

    const select = (tech) => {
        setActive(tech);
        playSfx("click");
    };

    const counts = useMemo(() => {
        const c = { Advanced: 0, Intermediate: 0, Beginner: 0 };
        techStack.forEach((t) => {
            c[t.level] = (c[t.level] ?? 0) + 1;
        });
        return c;
    }, []);

    return (
        <ModulePage
            sysId="SYS-02"
            eyebrow="Skills Matrix"
            title="Capability telemetry"
            description="Select any stack module to inspect proficiency, reactor sync, and deployment readiness."
            aside={
                <>
                    <div className="hud-telemetry">
                        <strong>{techStack.length}</strong>
                        <span>Total modules</span>
                    </div>
                    <div className="hud-telemetry">
                        <strong>{counts.Advanced}</strong>
                        <span>Advanced tier</span>
                    </div>
                </>
            }
        >
            <div className="hud-tabs">
                {FILTERS.map((f) => (
                    <button
                        key={f}
                        type="button"
                        className={`hud-tab ${filter === f ? "hud-tab--active" : ""}`}
                        onClick={() => {
                            setFilter(f);
                            const first = f === "All" ? techStack[0] : techStack.find((t) => t.level === f);
                            if (first) select(first);
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="hud-split">
                <div className="hud-card hud-card--glow-left">
                    <p className="hud-card-label">Active scan · {filtered.length} detected</p>
                    <div className="hud-skills-grid">
                        {filtered.map((tech) => (
                            <button
                                key={tech.name}
                                type="button"
                                className={`hud-skill-tile ${active?.name === tech.name ? "hud-skill-tile--active" : ""}`}
                                onClick={() => select(tech)}
                            >
                                <div
                                    className="hud-skill-ring"
                                    style={{ "--progress": skillLevelWidth[tech.level] }}
                                >
                                    <Image src={tech.icon} alt="" width={32} height={32} />
                                </div>
                                <span className="hud-skill-name">{tech.name}</span>
                                <span
                                    className={`hud-skill-level ${levelClass[tech.level] ?? ""}`}
                                >
                                    {tech.level}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {active ? (
                    <aside
                        key={active.name}
                        className="hud-card hud-skill-inspect hud-panel-swap"
                    >
                            <p className="hud-card-label">Module inspection</p>
                            <div className="hud-skill-inspect-head">
                                <div
                                    className="hud-skill-inspect-ring relative"
                                    style={{ "--progress": skillLevelWidth[active.level] }}
                                >
                                    <Image src={active.icon} alt="" width={48} height={48} />
                                </div>
                                <div>
                                    <h2 className="jarvis-title" style={{ fontSize: "1.35rem" }}>
                                        {active.name}
                                    </h2>
                                    <p
                                        className={`hud-skill-level mt-1 ${levelClass[active.level] ?? ""}`}
                                    >
                                        {active.level} proficiency
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                                Production-grade experience across backend services, cloud
                                delivery, and platform engineering workflows.
                            </p>
                            <div className="hud-meter">
                                <div
                                    className="hud-meter-fill"
                                    style={{ width: `${skillLevelWidth[active.level]}%` }}
                                />
                            </div>
                            <div className="hud-skill-tags">
                                <span className="tech-badge">API design</span>
                                <span className="tech-badge">Cloud native</span>
                                <span className="tech-badge">Observability</span>
                            </div>
                    </aside>
                ) : null}
            </div>
        </ModulePage>
    );
}
