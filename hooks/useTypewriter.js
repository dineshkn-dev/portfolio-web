"use client";

import { useEffect, useState } from "react";

export function useTypewriter(text, speed = 28, active = true) {
    const [display, setDisplay] = useState(() => (active ? "" : text));
    const [done, setDone] = useState(() => !active);

    useEffect(() => {
        if (!active) return;

        /* eslint-disable react-hooks/set-state-in-effect -- typewriter resets on text change */
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
    }, [text, speed, active]);

    return {
        display: active ? display : text,
        done: active ? done : true,
    };
}
