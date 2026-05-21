"use client";

/** Lightweight CSS background — no WebGL */
export default function ReactorBackdrop() {
    return (
        <>
            <div className="jarvis-css-reactor" aria-hidden="true" />
            <div className="jarvis-ambient-glow" aria-hidden="true" />
        </>
    );
}
