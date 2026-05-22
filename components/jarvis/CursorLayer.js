"use client";

import { useEffect, useRef } from "react";
import { useJarvis } from "@/components/jarvis/JarvisProvider";

const INTERACTIVE =
    "a, button, input, textarea, select, label, [role='button'], [role='tab'], .hud-nav-link, .hud-tab, .jarvis-stat-card, .jarvis-skill-tile, .chronos-rail-item, .chronos-map-node, .vault-strip-tab, .jarvis-chip";

export default function CursorLayer() {
    const { reduceMotion, isMobile } = useJarvis();
    const ringRef = useRef(null);

    useEffect(() => {
        if (reduceMotion || isMobile) return;

        document.documentElement.classList.add("jarvis-custom-cursor");
        return () => document.documentElement.classList.remove("jarvis-custom-cursor");
    }, [reduceMotion, isMobile]);

    useEffect(() => {
        if (reduceMotion || isMobile) return;

        const ring = ringRef.current;
        if (!ring) return;

        const onMove = (e) => {
            ring.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        };

        const onOver = (e) => {
            ring.classList.toggle("jarvis-cursor-ring--hover", !!e.target?.closest?.(INTERACTIVE));
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseover", onOver, { passive: true });

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
        };
    }, [reduceMotion, isMobile]);

    if (reduceMotion || isMobile) return null;

    return (
        <div className="jarvis-cursor" aria-hidden="true">
            <div
                ref={ringRef}
                className="jarvis-cursor-ring"
                style={{ position: "fixed", top: 0, left: 0, willChange: "transform" }}
            >
                <span className="jarvis-cursor-dot" />
            </div>
        </div>
    );
}
