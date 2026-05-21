"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useJarvis } from "@/components/jarvis/JarvisProvider";
import { useJarvisAudio } from "@/components/jarvis/AudioController";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cockpitBrief, homeStats, jarvisLines } from "@/lib/site-content";
import { JARVIS_MODULES } from "@/lib/jarvis/constants";

const DraggableStat = dynamic(() => import("@/components/home/DraggableStat"), {
    ssr: false,
    loading: () => (
        <article className="jarvis-stat-card">
            <strong>…</strong>
            <span>…</span>
        </article>
    ),
});

export default function HomeContent() {
    const { reduceMotion, speak, bootComplete } = useJarvis();
    const { playSfx } = useJarvisAudio();
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

    const systems = JARVIS_MODULES.filter((m) => m.path !== "/");

    return (
        <div className="jarvis-cockpit">
            <section className="jarvis-cockpit-hero" ref={heroRef}>
                <p className="jarvis-eyebrow">{cockpitBrief.eyebrow}</p>
                <h1 className="jarvis-title">{cockpitBrief.headline}</h1>
                <p className="jarvis-typewriter mt-4">
                    {reduceMotion ? cockpitBrief.subline : display}
                    {!reduceMotion && !done ? (
                        <span className="jarvis-typewriter-cursor" aria-hidden="true" />
                    ) : null}
                </p>

                <div className="jarvis-system-btns">
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
                    <button
                        type="button"
                        className="button button-ghost"
                        onClick={() => {
                            speak(jarvisLines.welcome);
                            playSfx("click");
                        }}
                    >
                        Briefing
                    </button>
                </div>
            </section>

            <div className="jarvis-stat-grid">
                {homeStats.map((stat) => (
                    <DraggableStat key={stat.label} stat={stat} />
                ))}
            </div>

            <p className="jarvis-eyebrow text-center opacity-70">
                Drag telemetry cards · Press ⌘K for commands · Say &quot;open projects&quot;
            </p>
        </div>
    );
}
