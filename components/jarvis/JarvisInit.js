"use client";

import { useLayoutEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { STORAGE_KEYS } from "@/lib/jarvis/constants";

export default function JarvisInit({ onInit }) {
    const reduceMotion = useReducedMotion();

    useLayoutEffect(() => {
        const bootDone = sessionStorage.getItem(STORAGE_KEYS.bootComplete);
        const muted = localStorage.getItem(STORAGE_KEYS.sfxMuted);
        const voice = localStorage.getItem(STORAGE_KEYS.voiceEnabled);
        const consent = localStorage.getItem(STORAGE_KEYS.voiceConsent);
        const mqMobile = window.matchMedia("(max-width: 768px)");
        const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

        onInit({
            booting: !reduceMotion && !bootDone,
            bootComplete: !!bootDone || !!reduceMotion,
            sfxMuted: muted === "true",
            voiceEnabled: voice === "true" && consent === "true" && !reduceMotion,
            voiceConsent: consent === "true",
            isMobile: mqMobile.matches,
            use3D: !mqMobile.matches && !mqReduce.matches && !reduceMotion,
        });
    }, [reduceMotion, onInit]);

    return null;
}
