"use client";

/** Lightweight CSS background — no WebGL */
export default function ReactorBackdrop() {
    return (
        <>
            <div className="hud-css-reactor" aria-hidden="true" />
            <div className="hud-ambient-glow" aria-hidden="true" />
        </>
    );
}
