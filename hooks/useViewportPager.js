"use client";

import { useCallback, useEffect } from "react";

export function useViewportPager(length, index, setIndex) {
    const go = useCallback(
        (next) => {
            const clamped = Math.max(0, Math.min(length - 1, next));
            if (clamped !== index) {
                setIndex(clamped);
            }
        },
        [index, length, setIndex]
    );

    useEffect(() => {
        const onKey = (e) => {
            if (
                e.target.tagName === "INPUT" ||
                e.target.tagName === "TEXTAREA" ||
                e.target.isContentEditable
            ) {
                return;
            }
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                go(index - 1);
            }
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                go(index + 1);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [go, index]);

    return { go, prev: () => go(index - 1), next: () => go(index + 1) };
}
