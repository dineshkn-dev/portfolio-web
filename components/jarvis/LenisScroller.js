"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useJarvis } from "@/components/jarvis/JarvisProvider";

export default function LenisScroller({ children, className = "" }) {
    const wrapRef = useRef(null);
    const { reduceMotion } = useJarvis();

    useEffect(() => {
        const el = wrapRef.current;
        if (!el || reduceMotion) return;

        const lenis = new Lenis({
            wrapper: el,
            content: el.firstElementChild ?? el,
            duration: 1.1,
            smoothWheel: true,
        });

        let raf = 0;
        const loop = (time) => {
            lenis.raf(time);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
        };
    }, [reduceMotion]);

    return (
        <div ref={wrapRef} className={className} style={{ maxHeight: "70vh", overflow: "hidden" }}>
            <div>{children}</div>
        </div>
    );
}
