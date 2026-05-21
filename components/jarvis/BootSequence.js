"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useJarvis } from "@/components/jarvis/JarvisProvider";
import { useJarvisAudio } from "@/components/jarvis/AudioController";
import { jarvisLines } from "@/lib/site-content";

const BOOT_LINES = [
    "INITIALIZING J.A.R.V.I.S…",
    "LOADING REACTOR CORE…",
    "CALIBRATING HUD OVERLAY…",
    "SYNCING NEURAL INTERFACE…",
    "UPLINK SECURE — ALL SYSTEMS ONLINE",
];

export default function BootSequence() {
    const { booting, completeBoot, speak, reduceMotion } = useJarvis();
    const { playSfx } = useJarvisAudio();
    const containerRef = useRef(null);
    const linesRef = useRef([]);

    useEffect(() => {
        if (!booting || reduceMotion) {
            if (booting) completeBoot();
            return;
        }

        playSfx("boot");
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    speak(jarvisLines.bootComplete);
                    completeBoot();
                },
            });

            linesRef.current.forEach((el, i) => {
                if (!el) return;
                tl.fromTo(
                    el,
                    { opacity: 0, x: -12 },
                    { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" },
                    i * 0.45
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, [booting, completeBoot, playSfx, speak, reduceMotion]);

    if (!booting || reduceMotion) return null;

    const skip = () => {
        completeBoot();
        playSfx("click");
    };

    return (
        <div className="jarvis-boot" ref={containerRef} role="status" aria-live="polite">
            {BOOT_LINES.map((line, i) => (
                <p
                    key={line}
                    className="jarvis-boot-line"
                    ref={(el) => {
                        linesRef.current[i] = el;
                    }}
                    style={{ opacity: 0 }}
                >
                    {line}
                </p>
            ))}
            <button type="button" className="jarvis-boot-skip" onClick={skip}>
                Skip sequence
            </button>
        </div>
    );
}
