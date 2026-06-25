"use client";

import { useLayoutEffect, useState } from "react";

/** Lightweight prefers-reduced-motion hook for client-side interactions. */
export function useReducedMotion() {
    const [reduce, setReduce] = useState(false);

    useLayoutEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduce(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    return reduce;
}
