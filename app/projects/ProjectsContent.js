"use client";

import { useState } from "react";
import ModulePage from "@/components/shell/ModulePage";
import { useViewportPager } from "@/hooks/useViewportPager";
import { projects } from "@/lib/site-content";

export default function ProjectsContent() {
    const [index, setIndex] = useState(0);
    const project = projects[index];
    const { go, prev, next } = useViewportPager(projects.length, index, setIndex);

    return (
        <ModulePage
            sysId="Selected work"
            eyebrow="Projects"
            title="Products and platforms with real operating constraints"
            viewportFit
            compact
            aside={
                <>
                    <div className="site-stat-pill">
                        <strong>{projects.length}</strong>
                        <span>Projects</span>
                    </div>
                    <div className="site-stat-pill">
                        <strong>{project.technologies.length}</strong>
                        <span>Stack items</span>
                    </div>
                </>
            }
        >
            <div className="work-bridge">
                <div className="work-strip" role="tablist" aria-label="Project records">
                    {projects.map((p, i) => (
                        <button
                            key={p.title}
                            type="button"
                            role="tab"
                            aria-selected={i === index}
                            className={`work-strip-tab ${i === index ? "work-strip-tab--active" : ""}`}
                            onClick={() => go(i)}
                        >
                            <span className="work-strip-id">{String(i + 1).padStart(2, "0")}</span>
                            <span className="work-strip-title">{p.title}</span>
                            <span className="work-strip-co">{p.company}</span>
                        </button>
                    ))}
                </div>

                <article
                    key={project.title}
                    className="work-stage site-card site-card--glow-left site-panel-swap"
                >
                        <div className="work-stage-grid">
                            <div className="work-stage-main">
                                <div className="work-stage-head">
                                    <p className="work-intel-label">
                                        Project {String(index + 1).padStart(2, "0")} /{" "}
                                        {String(projects.length).padStart(2, "0")}
                                    </p>
                                    <span className="work-intel-corner" aria-hidden="true">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>
                                <h2 className="work-intel-title">{project.title}</h2>
                                <p className="work-intel-desc">{project.description}</p>
                                <footer className="work-stage-detail">
                                    <div className="work-stage-meta">
                                        <strong>{project.company}</strong>
                                        <span>{project.timeline}</span>
                                    </div>
                                    {project.links?.length ? (
                                        <div className="work-stage-links">
                                            {project.links.map((link) => (
                                                <a
                                                    key={link.href}
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="work-stage-link"
                                                >
                                                    {link.label}
                                                </a>
                                            ))}
                                        </div>
                                    ) : null}
                                </footer>
                            </div>

                            <div className="work-stage-stack">
                                <p className="site-card-label">Tech stack</p>
                                <div className="work-tech-grid">
                                    {project.technologies.map((tech, ti) => (
                                        <span key={tech} className="work-tech-cell">
                                            <span className="work-tech-cell-name">{tech}</span>
                                            <span className="work-tech-cell-bar" aria-hidden="true">
                                                <span
                                                    className="work-tech-cell-fill"
                                                    style={{
                                                        width: `${88 - ti * 8}%`,
                                                    }}
                                                />
                                            </span>
                                        </span>
                                    ))}
                                </div>
                                <div className="work-stage-stats">
                                    <div className="timeline-metric">
                                        <strong>{project.technologies.length}</strong>
                                        <span>Technologies</span>
                                    </div>
                                    <div className="timeline-metric">
                                        <strong>{project.timeline.split(" ")[0]}</strong>
                                        <span>Started</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="work-stage-foot">
                            <div className="timeline-segments" aria-hidden="true">
                                {projects.map((_, i) => (
                                    <span
                                        key={i}
                                        className={`timeline-segment ${i <= index ? "is-lit" : ""}`}
                                    />
                                ))}
                            </div>
                            <div className="timeline-nav">
                                <button
                                    type="button"
                                    className="site-tab"
                                    disabled={index === 0}
                                    onClick={prev}
                                >
                                    Prev
                                </button>
                                <button
                                    type="button"
                                    className="site-tab"
                                    disabled={index === projects.length - 1}
                                    onClick={next}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                </article>
            </div>
        </ModulePage>
    );
}
