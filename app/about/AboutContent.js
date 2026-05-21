"use client";

import { useState } from "react";
import ModulePage from "@/components/jarvis/ModulePage";
import { useJarvisAudio } from "@/components/jarvis/AudioController";
import { useViewportPager } from "@/hooks/useViewportPager";
import { careerTimeline } from "@/lib/site-content";

const MISSION_TAGS = [
    "API systems",
    "Cloud delivery",
    "Platform scale",
    "Team velocity",
    "Production ops",
];

export default function AboutContent() {
    const [index, setIndex] = useState(0);
    const { playSfx } = useJarvisAudio();
    const item = careerTimeline[index];
    const { go, prev, next } = useViewportPager(
        careerTimeline.length,
        index,
        setIndex,
        playSfx
    );

    const progressPct = Math.round(
        ((index + 1) / careerTimeline.length) * 100
    );

    return (
        <ModulePage
            sysId="SYS-03"
            eyebrow="Career Timeline"
            title="Mission chronology"
            viewportFit
            compact
            aside={
                <>
                    <div className="hud-telemetry">
                        <strong>{careerTimeline.length}</strong>
                        <span>Deployments</span>
                    </div>
                    <div className="hud-telemetry">
                        <strong>{progressPct}%</strong>
                        <span>Trajectory</span>
                    </div>
                </>
            }
        >
            <div className="chronos-bridge">
                <nav className="chronos-rail hud-card" aria-label="Mission selector">
                    <p className="hud-card-label">Mission log</p>
                    <ul className="chronos-rail-list">
                        {careerTimeline.map((entry, i) => (
                            <li key={`${entry.year}-${entry.company}`}>
                                <button
                                    type="button"
                                    className={`chronos-rail-item ${i === index ? "chronos-rail-item--active" : ""}`}
                                    onClick={() => go(i)}
                                    aria-current={i === index ? "step" : undefined}
                                >
                                    <span className="chronos-rail-id">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="chronos-rail-text">
                                        <span className="chronos-rail-year">{entry.year}</span>
                                        <span className="chronos-rail-role">{entry.role}</span>
                                        <span className="chronos-rail-co">{entry.company}</span>
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <article
                    key={`${item.year}-${item.company}`}
                    className="chronos-core hud-card hud-card--glow-left hud-panel-swap"
                    role="tabpanel"
                >
                        <div className="chronos-core-head">
                            <div>
                                <p className="chronos-intel-year">{item.year}</p>
                                <h2 className="chronos-intel-role">{item.role}</h2>
                                <p className="chronos-intel-co">{item.company}</p>
                            </div>
                            <span className="chronos-core-badge">ACTIVE NODE</span>
                        </div>

                        <div className="chronos-metrics">
                            <div className="chronos-metric">
                                <strong>{String(index + 1).padStart(2, "0")}</strong>
                                <span>Sequence</span>
                            </div>
                            <div className="chronos-metric">
                                <strong>{careerTimeline.length - index}</strong>
                                <span>Prior roles</span>
                            </div>
                            <div className="chronos-metric">
                                <strong>{progressPct}%</strong>
                                <span>Career arc</span>
                            </div>
                        </div>

                        <p className="chronos-intel-impact">{item.impact}</p>

                        <div className="chronos-tags">
                            {MISSION_TAGS.map((tag) => (
                                <span key={tag} className="tech-badge">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="chronos-core-foot">
                            <div className="chronos-segments" aria-hidden="true">
                                {careerTimeline.map((_, i) => (
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
                                    disabled={index === careerTimeline.length - 1}
                                    onClick={next}
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                </article>

                <aside className="chronos-map hud-card" aria-label="Career trajectory">
                    <p className="hud-card-label">Flight trajectory</p>
                    <div className="chronos-map-canvas">
                        <span className="chronos-map-spine" aria-hidden="true" />
                        {careerTimeline.map((entry, i) => {
                            const top = 8 + (i / (careerTimeline.length - 1)) * 76;
                            return (
                                <button
                                    key={`map-${entry.company}`}
                                    type="button"
                                    className={`chronos-map-node ${i === index ? "chronos-map-node--active" : ""} ${i < index ? "chronos-map-node--past" : ""}`}
                                    style={{ top: `${top}%` }}
                                    onClick={() => go(i)}
                                    aria-label={`${entry.role} at ${entry.company}`}
                                >
                                    <span className="chronos-map-dot" />
                                    <span className="chronos-map-label">
                                        <span className="chronos-map-label-year">{entry.year}</span>
                                        <span className="chronos-map-label-co">{entry.company}</span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="chronos-map-readout">
                        <div>
                            <span className="chronos-map-readout-k">Status</span>
                            <span className="chronos-map-readout-v">DEPLOYED</span>
                        </div>
                        <div>
                            <span className="chronos-map-readout-k">Uplink</span>
                            <span className="chronos-map-readout-v">SECURE</span>
                        </div>
                        <div>
                            <span className="chronos-map-readout-k">Range</span>
                            <span className="chronos-map-readout-v">2018 — NOW</span>
                        </div>
                    </div>
                </aside>
            </div>
        </ModulePage>
    );
}
