"use client";

import { useCallback, useRef } from "react";
import { useJarvis } from "@/components/jarvis/JarvisProvider";

function playTone(ctx, frequency, duration, type = "sine", gain = 0.08, startOffset = 0) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    g.gain.value = gain;
    osc.connect(g);
    g.connect(ctx.destination);
    const now = ctx.currentTime + startOffset;
    g.gain.setValueAtTime(gain, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.start(now);
    osc.stop(now + duration);
}

function playSequence(ctx, steps) {
    steps.forEach(([freq, dur, type, gain, offset]) => {
        playTone(ctx, freq, dur, type ?? "sine", gain ?? 0.06, offset ?? 0);
    });
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
        (name, { force = false } = {}) => {
            if (!force && (sfxMuted || reduceMotion)) return;
            const ctx = getCtx();
            if (!ctx) return;
            switch (name) {
                case "click":
                    playTone(ctx, 880, 0.05, "sine", 0.07);
                    break;
                case "hover":
                    playTone(ctx, 1200, 0.03, "sine", 0.03);
                    break;
                case "nav":
                    playSequence(ctx, [
                        [520, 0.06, "triangle", 0.05, 0],
                        [780, 0.08, "triangle", 0.04, 0.04],
                    ]);
                    break;
                case "whoosh":
                    playSequence(ctx, [
                        [440, 0.1, "triangle", 0.05, 0],
                        [660, 0.07, "triangle", 0.04, 0.05],
                    ]);
                    break;
                case "tab":
                    playTone(ctx, 740, 0.05, "square", 0.05);
                    break;
                case "toggle":
                    playSequence(ctx, [
                        [600, 0.05, "sine", 0.05, 0],
                        [900, 0.06, "sine", 0.05, 0.05],
                    ]);
                    break;
                case "pulse":
                    playTone(ctx, 440, 0.08, "sine", 0.05);
                    break;
                case "transmit":
                    playSequence(ctx, [
                        [330, 0.08, "sawtooth", 0.04, 0],
                        [495, 0.1, "sine", 0.05, 0.08],
                    ]);
                    break;
                case "boot":
                    playSequence(ctx, [
                        [220, 0.18, "sawtooth", 0.04, 0],
                        [440, 0.14, "sine", 0.05, 0.12],
                        [880, 0.18, "sine", 0.06, 0.28],
                    ]);
                    break;
                case "online":
                    playSequence(ctx, [
                        [523, 0.1, "sine", 0.06, 0],
                        [659, 0.12, "sine", 0.06, 0.1],
                        [784, 0.16, "sine", 0.07, 0.22],
                    ]);
                    break;
                case "success":
                    playSequence(ctx, [
                        [523, 0.1, "sine", 0.06, 0],
                        [659, 0.12, "sine", 0.06, 0.1],
                        [784, 0.14, "sine", 0.05, 0.2],
                    ]);
                    break;
                case "error":
                    playSequence(ctx, [
                        [280, 0.12, "sawtooth", 0.05, 0],
                        [220, 0.14, "sawtooth", 0.05, 0.1],
                    ]);
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
