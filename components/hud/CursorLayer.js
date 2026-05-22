"use client";

import { useEffect, useRef } from "react";
import { useHud } from "@/components/hud/HudProvider";

const INTERACTIVE =
    "a, button, input, textarea, select, label, [role='button'], [role='tab'], .hud-nav-link, .hud-tab, .hud-stat-card, .hud-skill-tile, .chronos-rail-item, .chronos-map-node, .vault-strip-tab, .hud-chip";

export default function CursorLayer() {
    const { reduceMotion, isMobile } = useHud();
    const ringRef = useRef(null);

    useEffect(() => {
        if (reduceMotion || isMobile) return;

        document.documentElement.classList.add("hud-custom-cursor");
        return () => document.documentElement.classList.remove("hud-custom-cursor");
    }, [reduceMotion, isMobile]);

    useEffect(() => {
        if (reduceMotion || isMobile) return;

        const ring = ringRef.current;
        if (!ring) return;

        const onMove = (e) => {
            ring.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        };

        const onOver = (e) => {
            ring.classList.toggle("hud-cursor-ring--hover", !!e.target?.closest?.(INTERACTIVE));
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
        <div className="hud-cursor" aria-hidden="true">
            <div
                ref={ringRef}
                className="hud-cursor-ring"
                style={{ position: "fixed", top: 0, left: 0, willChange: "transform" }}
            >
                <span className="hud-cursor-dot" />
            </div>
        </div>
    );
}
