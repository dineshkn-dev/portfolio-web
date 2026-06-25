"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import ModulePage from "@/components/shell/ModulePage";
import { skillLevelWidth, techStack } from "@/lib/site-content";

const FILTERS = ["All", "Advanced", "Intermediate", "Beginner"];

const levelClass = {
    Advanced: "site-skill-level--advanced",
    Intermediate: "site-skill-level--intermediate",
    Beginner: "site-skill-level--beginner",
};

export default function SkillsContent() {
    const [filter, setFilter] = useState("All");
    const [active, setActive] = useState(techStack[0]);

    const filtered = useMemo(() => {
        if (filter === "All") return techStack;
        return techStack.filter((t) => t.level === filter);
    }, [filter]);

    const select = (tech) => {
        setActive(tech);
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
            sysId="Stack"
            eyebrow="Technical range"
            title="Tools I use to ship reliable systems"
            description="A focused view of the backend, cloud, and platform tools I reach for in production work."
            aside={
                <>
                    <div className="site-stat-pill">
                        <strong>{techStack.length}</strong>
                        <span>Core tools</span>
                    </div>
                    <div className="site-stat-pill">
                        <strong>{counts.Advanced}</strong>
                        <span>Deepest focus</span>
                    </div>
                </>
            }
        >
            <div className="site-tabs">
                {FILTERS.map((f) => (
                    <button
                        key={f}
                        type="button"
                        className={`site-tab ${filter === f ? "site-tab--active" : ""}`}
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

            <div className="site-split">
                <div className="site-card site-card--glow-left">
                    <p className="site-card-label">{filtered.length} tools in view</p>
                    <div className="site-skills-grid">
                        {filtered.map((tech) => (
                            <button
                                key={tech.name}
                                type="button"
                                className={`site-skill-tile ${active?.name === tech.name ? "site-skill-tile--active" : ""}`}
                                onClick={() => select(tech)}
                            >
                                <div
                                    className="site-skill-ring"
                                    style={{ "--progress": skillLevelWidth[tech.level] }}
                                >
                                    <Image src={tech.icon} alt="" width={32} height={32} />
                                </div>
                                <span className="site-skill-name">{tech.name}</span>
                                <span
                                    className={`site-skill-level ${levelClass[tech.level] ?? ""}`}
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
                        className="site-card site-skill-inspect site-panel-swap"
                    >
                            <p className="site-card-label">Skill profile</p>
                            <div className="site-skill-inspect-head">
                                <div
                                    className="site-skill-inspect-ring relative"
                                    style={{ "--progress": skillLevelWidth[active.level] }}
                                >
                                    <Image src={active.icon} alt="" width={48} height={48} />
                                </div>
                                <div>
                                    <h2 className="site-title" style={{ fontSize: "1.35rem" }}>
                                        {active.name}
                                    </h2>
                                    <p
                                        className={`site-skill-level mt-1 ${levelClass[active.level] ?? ""}`}
                                    >
                                        {active.level} experience
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                                Production-grade experience across backend services, cloud
                                delivery, and platform engineering workflows.
                            </p>
                            <div className="site-meter">
                                <div
                                    className="site-meter-fill"
                                    style={{ width: `${skillLevelWidth[active.level]}%` }}
                                />
                            </div>
                            <div className="site-skill-tags">
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
