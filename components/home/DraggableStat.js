"use client";

import { useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { useJarvisAudio } from "@/components/jarvis/AudioController";

export default function DraggableStat({ stat }) {
    const ref = useRef(null);
    const { playSfx } = useJarvisAudio();

    useDrag(
        ({ offset: [x, y] }) => {
            if (ref.current) {
                ref.current.style.transform = `translate(${x}px, ${y}px)`;
            }
        },
        { target: ref, from: () => [0, 0] }
    );

    return (
        <article ref={ref} className="jarvis-stat-card" onClick={() => playSfx("click")}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
        </article>
    );
}
