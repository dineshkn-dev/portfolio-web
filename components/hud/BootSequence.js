"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useHud } from "@/components/hud/HudProvider";
import { useHudAudio } from "@/components/hud/AudioController";

const BOOT_LINES = [
    "INITIALIZING HUD…",
    "LOADING REACTOR CORE…",
    "CALIBRATING OVERLAY…",
    "SYNCING INTERFACE…",
    "UPLINK SECURE — ALL SYSTEMS ONLINE",
];

export default function BootSequence() {
    const { booting, completeBoot, reduceMotion } = useHud();
    const { playSfx } = useHudAudio();
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
                    playSfx("online");
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
    }, [booting, completeBoot, playSfx, reduceMotion]);

    if (!booting || reduceMotion) return null;

    const skip = () => {
        completeBoot();
        playSfx("click");
    };

    return (
        <div className="hud-boot" ref={containerRef} role="status" aria-live="polite">
            {BOOT_LINES.map((line, i) => (
                <p
                    key={line}
                    className="hud-boot-line"
                    ref={(el) => {
                        linesRef.current[i] = el;
                    }}
                    style={{ opacity: 0 }}
                >
                    {line}
                </p>
            ))}
            <button type="button" className="hud-boot-skip" onClick={skip}>
                Skip sequence
            </button>
        </div>
    );
}
