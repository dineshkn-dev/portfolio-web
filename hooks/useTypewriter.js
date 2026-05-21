"use client";

import { useEffect, useState } from "react";

export function useTypewriter(text, speed = 28, active = true) {
    const [ready, setReady] = useState(false);
    const [display, setDisplay] = useState(() => (active ? "" : text));
    const [done, setDone] = useState(() => !active);

    useEffect(() => {
        if (!active) return;

        /* eslint-disable react-hooks/set-state-in-effect -- defer typewriter until idle */
        setReady(false);
        const start = () => setReady(true);
        /* eslint-enable react-hooks/set-state-in-effect */

        if (typeof requestIdleCallback !== "undefined") {
            const id = requestIdleCallback(start, { timeout: 1500 });
            return () => cancelIdleCallback(id);
        }

        const t = setTimeout(start, 600);
        return () => clearTimeout(t);
    }, [active, text]);

    useEffect(() => {
        if (!active || !ready) return;

        /* eslint-disable react-hooks/set-state-in-effect -- typewriter tick loop */
        setDisplay("");
        setDone(false);
        /* eslint-enable react-hooks/set-state-in-effect */
        let i = 0;
        const id = setInterval(() => {
            i += 1;
            setDisplay(text.slice(0, i));
            if (i >= text.length) {
                clearInterval(id);
                setDone(true);
            }
        }, speed);
        return () => clearInterval(id);
    }, [text, speed, active, ready]);

    return {
        display: active ? display : text,
        done: active ? done : true,
    };
}
