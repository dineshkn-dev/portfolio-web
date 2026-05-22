"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import HudInit from "@/components/hud/HudInit";
import { STORAGE_KEYS } from "@/lib/hud/constants";

const HudContext = createContext(null);

export function useHud() {
    const ctx = useContext(HudContext);
    if (!ctx) {
        throw new Error("useHud must be used within HudProvider");
    }
    return ctx;
}

export default function HudProvider({ children }) {
    const reduceMotion = useReducedMotion();
    const [initialized, setInitialized] = useState(false);
    const [booting, setBooting] = useState(false);
    const [bootComplete, setBootComplete] = useState(true);
    const [sfxMuted, setSfxMuted] = useState(false);
    const [reactorCharge, setReactorCharge] = useState(0.6);
    const [isMobile, setIsMobile] = useState(false);
    const [use3D, setUse3D] = useState(false);

    const handleInit = useCallback((config) => {
        setBooting(config.booting);
        setBootComplete(config.bootComplete);
        setSfxMuted(config.sfxMuted);
        setIsMobile(config.isMobile);
        setUse3D(config.use3D);
        setInitialized(true);
    }, []);

    useEffect(() => {
        if (!initialized) return;
        const mqMobile = window.matchMedia("(max-width: 768px)");
        const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => {
            const optIn3d = localStorage.getItem(STORAGE_KEYS.reactor3d) === "true";
            setIsMobile(mqMobile.matches);
            setUse3D(
                optIn3d &&
                    !mqMobile.matches &&
                    !mqReduce.matches &&
                    !reduceMotion &&
                    (navigator.hardwareConcurrency ?? 4) >= 6
            );
        };
        mqMobile.addEventListener("change", update);
        mqReduce.addEventListener("change", update);
        return () => {
            mqMobile.removeEventListener("change", update);
            mqReduce.removeEventListener("change", update);
        };
    }, [initialized, reduceMotion]);

    const completeBoot = useCallback(() => {
        sessionStorage.setItem(STORAGE_KEYS.bootComplete, "true");
        setBooting(false);
        setBootComplete(true);
    }, []);

    const replayBoot = useCallback(() => {
        sessionStorage.removeItem(STORAGE_KEYS.bootComplete);
        setBootComplete(false);
        setBooting(true);
    }, []);

    const toggleSfx = useCallback(() => {
        setSfxMuted((m) => {
            const next = !m;
            localStorage.setItem(STORAGE_KEYS.sfxMuted, String(next));
            return next;
        });
    }, []);

    const value = useMemo(
        () => ({
            reduceMotion,
            booting,
            bootComplete,
            setBooting,
            completeBoot,
            replayBoot,
            sfxMuted,
            toggleSfx,
            initialized,
            reactorCharge,
            setReactorCharge,
            isMobile,
            use3D,
        }),
        [
            reduceMotion,
            booting,
            bootComplete,
            completeBoot,
            replayBoot,
            sfxMuted,
            toggleSfx,
            initialized,
            reactorCharge,
            isMobile,
            use3D,
        ]
    );

    return (
        <HudContext.Provider value={value}>
            <HudInit onInit={handleInit} />
            {children}
        </HudContext.Provider>
    );
}
