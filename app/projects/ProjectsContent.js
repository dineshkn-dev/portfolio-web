"use client";

import { useState } from "react";
import ModulePage from "@/components/jarvis/ModulePage";
import { useJarvisAudio } from "@/components/jarvis/AudioController";
import { useViewportPager } from "@/hooks/useViewportPager";
import { projects } from "@/lib/site-content";

export default function ProjectsContent() {
    const [index, setIndex] = useState(0);
    const { playSfx } = useJarvisAudio();
    const project = projects[index];
    const { go, prev, next } = useViewportPager(projects.length, index, setIndex, playSfx);

    return (
        <ModulePage
            sysId="SYS-04"
            eyebrow="Project Archive"
            title="Deployment vault"
            viewportFit
            compact
            aside={
                <>
                    <div className="hud-telemetry">
                        <strong>{projects.length}</strong>
                        <span>Records</span>
                    </div>
                    <div className="hud-telemetry">
                        <strong>{project.technologies.length}</strong>
                        <span>Modules</span>
                    </div>
                </>
            }
        >
            <div className="vault-bridge">
                <div className="vault-strip" role="tablist" aria-label="Project records">
                    {projects.map((p, i) => (
                        <button
                            key={p.title}
                            type="button"
                            role="tab"
                            aria-selected={i === index}
                            className={`vault-strip-tab ${i === index ? "vault-strip-tab--active" : ""}`}
                            onClick={() => go(i)}
                        >
                            <span className="vault-strip-id">{String(i + 1).padStart(2, "0")}</span>
                            <span className="vault-strip-title">{p.title}</span>
                            <span className="vault-strip-co">{p.company}</span>
                        </button>
                    ))}
                </div>

                <article
                    key={project.title}
                    className="vault-stage hud-card hud-card--glow-left hud-panel-swap"
                >
                        <div className="vault-stage-grid">
                            <div className="vault-stage-main">
                                <div className="vault-stage-head">
                                    <p className="vault-intel-label">
                                        Record {String(index + 1).padStart(2, "0")} /{" "}
                                        {String(projects.length).padStart(2, "0")}
                                    </p>
                                    <span className="vault-intel-corner" aria-hidden="true">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>
                                <h2 className="vault-intel-title">{project.title}</h2>
                                <p className="vault-intel-desc">{project.description}</p>
                                <div className="vault-stage-meta">
                                    <strong>{project.company}</strong>
                                    <span>{project.timeline}</span>
                                </div>
                            </div>

                            <div className="vault-stage-stack">
                                <p className="hud-card-label">Stack matrix</p>
                                <div className="vault-tech-grid">
                                    {project.technologies.map((tech, ti) => (
                                        <span key={tech} className="vault-tech-cell">
                                            <span className="vault-tech-cell-name">{tech}</span>
                                            <span className="vault-tech-cell-bar" aria-hidden="true">
                                                <span
                                                    className="vault-tech-cell-fill"
                                                    style={{
                                                        width: `${88 - ti * 8}%`,
                                                    }}
                                                />
                                            </span>
                                        </span>
                                    ))}
                                </div>
                                <div className="vault-stage-stats">
                                    <div className="chronos-metric">
                                        <strong>{project.technologies.length}</strong>
                                        <span>Technologies</span>
                                    </div>
                                    <div className="chronos-metric">
                                        <strong>100%</strong>
                                        <span>Spec loaded</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="vault-stage-foot">
                            <div className="chronos-segments" aria-hidden="true">
                                {projects.map((_, i) => (
                                    <span
                                        key={i}
                                        className={`chronos-segment ${i <= index ? "is-lit" : ""}`}
                                    />
                                ))}
                            </div>
                            <div className="chronos-nav">
                                <button
                                    type="button"
                                    className="hud-tab"
                                    disabled={index === 0}
                                    onClick={prev}
                                >
                                    ← Prev
                                </button>
                                <button
                                    type="button"
                                    className="hud-tab"
                                    disabled={index === projects.length - 1}
                                    onClick={next}
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                </article>
            </div>
        </ModulePage>
    );
}
