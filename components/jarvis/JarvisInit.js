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
        const optIn3d = localStorage.getItem(STORAGE_KEYS.reactor3d) === "true";
        const can3D =
            optIn3d &&
            !mqMobile.matches &&
            !mqReduce.matches &&
            !reduceMotion &&
            (navigator.hardwareConcurrency ?? 4) >= 6;

        onInit({
            booting: !reduceMotion && !bootDone,
            bootComplete: !!bootDone || !!reduceMotion,
            sfxMuted: muted === "true",
            voiceEnabled: voice === "true" && consent === "true" && !reduceMotion,
            voiceConsent: consent === "true",
            isMobile: mqMobile.matches,
            use3D: can3D,
        });
    }, [reduceMotion, onInit]);

    return null;
}
