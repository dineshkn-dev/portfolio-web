"use client";

import { useCallback, useEffect, useRef } from "react";
import { useJarvis } from "@/components/jarvis/JarvisProvider";

function playTone(ctx, frequency, duration, type = "sine", gain = 0.08) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    g.gain.value = gain;
    osc.connect(g);
    g.connect(ctx.destination);
    const now = ctx.currentTime;
    g.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.start(now);
    osc.stop(now + duration);
}

export function useJarvisAudio() {
    const { sfxMuted, reduceMotion } = useJarvis();
    const ctxRef = useRef(null);

    const getCtx = useCallback(() => {
        if (typeof window === "undefined") return null;
        if (!ctxRef.current) {
            ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (ctxRef.current.state === "suspended") {
            ctxRef.current.resume();
        }
        return ctxRef.current;
    }, []);

    const playSfx = useCallback(
        (name) => {
            if (sfxMuted || reduceMotion) return;
            const ctx = getCtx();
            if (!ctx) return;
            switch (name) {
                case "click":
                    playTone(ctx, 880, 0.06);
                    break;
                case "whoosh":
                    playTone(ctx, 440, 0.12, "triangle", 0.05);
                    playTone(ctx, 660, 0.08, "triangle", 0.04);
                    break;
                case "boot":
                    playTone(ctx, 220, 0.2, "sawtooth", 0.04);
                    setTimeout(() => playTone(ctx, 440, 0.15, "sine", 0.05), 120);
                    setTimeout(() => playTone(ctx, 880, 0.2, "sine", 0.06), 280);
                    break;
                case "success":
                    playTone(ctx, 523, 0.1);
                    setTimeout(() => playTone(ctx, 659, 0.12), 100);
                    break;
                default:
                    playTone(ctx, 660, 0.05);
            }
        },
        [sfxMuted, reduceMotion, getCtx]
    );

    return { playSfx };
}

export default function AudioController() {
    useJarvisAudio();
    return null;
}
