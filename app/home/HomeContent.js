"use client";

import { useRef } from "react";
import Link from "next/link";
import { useHud } from "@/components/hud/HudProvider";
import { useHudAudio } from "@/components/hud/AudioController";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cockpitBrief, homeStats, projects } from "@/lib/site-content";
import { HUD_MODULES } from "@/lib/hud/constants";

export default function HomeContent() {
    const { reduceMotion, bootComplete } = useHud();
    const { playSfx } = useHudAudio();
    const heroRef = useRef(null);
    const { display, done } = useTypewriter(
        cockpitBrief.subline,
        24,
        bootComplete && !reduceMotion
    );

    const initSystems = async (e) => {
        playSfx("whoosh");
        if (reduceMotion) return;
        const btn = e.currentTarget;
        const { gsap } = await import("gsap");
        gsap.fromTo(btn, { scale: 1 }, { scale: 1.05, duration: 0.12, yoyo: true, repeat: 1 });
    };

    const systems = HUD_MODULES.filter((m) => m.path !== "/");
    const featuredApps = projects.filter((p) => p.featured);

    return (
        <div className="hud-cockpit">
            <section className="hud-cockpit-hero" ref={heroRef}>
                <p className="hud-eyebrow">{cockpitBrief.eyebrow}</p>
                <h1 className="hud-title">{cockpitBrief.headline}</h1>
                <p className="hud-typewriter mt-4">
                    {reduceMotion ? cockpitBrief.subline : display}
                    {!reduceMotion && !done ? (
                        <span className="hud-typewriter-cursor" aria-hidden="true" />
                    ) : null}
                </p>

                <div className="hud-system-btns">
                    {systems.map((mod) => (
                        <Link
                            key={mod.path}
                            href={mod.path}
                            className="button button-primary"
                            onClick={initSystems}
                        >
                            {mod.label}
                        </Link>
                    ))}
                </div>
            </section>

            {featuredApps.length > 0 ? (
                <section className="hud-cockpit-launch" aria-label="Featured software">
                    <div className="hud-cockpit-launch-head">
                        <p className="hud-eyebrow">Launch bay // Shipped</p>
                        <Link
                            href="/projects"
                            className="hud-cockpit-launch-more"
                            onClick={() => playSfx("pulse")}
                        >
                            Project archive →
                        </Link>
                    </div>
                    <div className="hud-cockpit-launch-grid">
                        {featuredApps.map((app) => (
                            <article key={app.title} className="hud-launch-card">
                                <h2 className="hud-launch-card-title">{app.title}</h2>
                                <p className="hud-launch-card-tagline">{app.cockpitTagline}</p>
                                <div className="hud-launch-card-links">
                                    {app.links?.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hud-launch-link"
                                            onClick={() => playSfx("pulse")}
                                        >
                                            {link.label} ↗
                                        </a>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            ) : null}

            <div className="hud-stat-grid">
                {homeStats.map((stat) => (
                    <article
                        key={stat.label}
                        className="hud-stat-card hud-stat-card--static"
                        onClick={() => playSfx("pulse")}
                    >
                        <strong>{stat.value}</strong>
                        <span>{stat.label}</span>
                    </article>
                ))}
            </div>

        </div>
    );
}
