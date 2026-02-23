"use client";

import { useEffect, useState } from "react";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA"];

export function useKonami(onSuccess) {
    const [activated, setActivated] = useState(false);

    useEffect(() => {
        let index = 0;

        const handleKeyDown = (e) => {
            if (e.code === KONAMI[index]) {
                index++;
                if (index === KONAMI.length) {
                    setActivated(true);
                    onSuccess?.();
                    index = 0;
                }
            } else {
                index = 0;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onSuccess]);

    return activated;
}
