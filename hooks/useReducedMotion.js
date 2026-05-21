"use client";

import { useLayoutEffect, useState } from "react";

/** Lightweight prefers-reduced-motion (avoids pulling in framer-motion). */
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
