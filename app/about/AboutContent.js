"use client";

import { useState } from "react";
import ModulePage from "@/components/shell/ModulePage";
import { useViewportPager } from "@/hooks/useViewportPager";
import { careerTimeline } from "@/lib/site-content";

const EXPERIENCE_TAGS = [
    "API systems",
    "Cloud delivery",
    "Platform scale",
    "Team velocity",
    "Production ops",
];

export default function AboutContent() {
    const [index, setIndex] = useState(0);
    const item = careerTimeline[index];
    const { go, prev, next } = useViewportPager(
        careerTimeline.length,
        index,
        setIndex
    );

    const progressPct = Math.round(
        ((index + 1) / careerTimeline.length) * 100
    );

    return (
        <ModulePage
            sysId="Experience"
            eyebrow="Career timeline"
            title="A practical path through product engineering"
            viewportFit
            compact
            aside={
                <>
                    <div className="site-stat-pill">
                        <strong>{careerTimeline.length}</strong>
                        <span>Roles</span>
                    </div>
                    <div className="site-stat-pill">
                        <strong>{progressPct}%</strong>
                        <span>Timeline</span>
                    </div>
                </>
            }
        >
            <div className="timeline-bridge">
                <nav className="timeline-rail site-card" aria-label="Experience selector">
                    <p className="site-card-label">Experience</p>
                    <ul className="timeline-rail-list">
                        {careerTimeline.map((entry, i) => (
                            <li key={`${entry.year}-${entry.company}`}>
                                <button
                                    type="button"
                                    className={`timeline-rail-item ${i === index ? "timeline-rail-item--active" : ""}`}
                                    onClick={() => go(i)}
                                    aria-current={i === index ? "step" : undefined}
                                >
                                    <span className="timeline-rail-id">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="timeline-rail-text">
                                        <span className="timeline-rail-year">{entry.year}</span>
                                        <span className="timeline-rail-role">{entry.role}</span>
                                        <span className="timeline-rail-co">{entry.company}</span>
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <article
                    key={`${item.year}-${item.company}`}
                    className="timeline-core site-card site-card--glow-left site-panel-swap"
                    role="tabpanel"
                >
                        <div className="timeline-core-head">
                            <div>
                                <p className="timeline-intel-year">{item.year}</p>
                                <h2 className="timeline-intel-role">{item.role}</h2>
                                <p className="timeline-intel-co">{item.company}</p>
                            </div>
                            <span className="timeline-core-badge">Selected role</span>
                        </div>

                        <div className="timeline-metrics">
                            <div className="timeline-metric">
                                <strong>{String(index + 1).padStart(2, "0")}</strong>
                                <span>Step</span>
                            </div>
                            <div className="timeline-metric">
                                <strong>{careerTimeline.length - index}</strong>
                                <span>Roles listed</span>
                            </div>
                            <div className="timeline-metric">
                                <strong>{progressPct}%</strong>
                                <span>Progress</span>
                            </div>
                        </div>

                        <p className="timeline-intel-impact">{item.impact}</p>

                        <div className="timeline-tags">
                            {EXPERIENCE_TAGS.map((tag) => (
                                <span key={tag} className="tech-badge">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="timeline-core-foot">
                            <div className="timeline-segments" aria-hidden="true">
                                {careerTimeline.map((_, i) => (
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
                                    disabled={index === careerTimeline.length - 1}
                                    onClick={next}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                </article>

                <aside className="timeline-map site-card" aria-label="Career map">
                    <p className="site-card-label">Career map</p>
                    <div className="timeline-map-canvas">
                        <span className="timeline-map-spine" aria-hidden="true" />
                        {careerTimeline.map((entry, i) => {
                            const top = 8 + (i / (careerTimeline.length - 1)) * 76;
                            return (
                                <button
                                    key={`map-${entry.company}`}
                                    type="button"
                                    className={`timeline-map-node ${i === index ? "timeline-map-node--active" : ""} ${i < index ? "timeline-map-node--past" : ""}`}
                                    style={{ top: `${top}%` }}
                                    onClick={() => go(i)}
                                    aria-label={`${entry.role} at ${entry.company}`}
                                >
                                    <span className="timeline-map-dot" />
                                    <span className="timeline-map-label">
                                        <span className="timeline-map-label-year">{entry.year}</span>
                                        <span className="timeline-map-label-co">{entry.company}</span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="timeline-map-readout">
                        <div>
                            <span className="timeline-map-readout-k">Status</span>
                            <span className="timeline-map-readout-v">Building</span>
                        </div>
                        <div>
                            <span className="timeline-map-readout-k">Practice</span>
                            <span className="timeline-map-readout-v">Backend</span>
                        </div>
                        <div>
                            <span className="timeline-map-readout-k">Range</span>
                            <span className="timeline-map-readout-v">2018 - now</span>
                        </div>
                    </div>
                </aside>
            </div>
        </ModulePage>
    );
}
