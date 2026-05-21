"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useReducedMotion } from "framer-motion";
import JarvisInit from "@/components/jarvis/JarvisInit";
import { STORAGE_KEYS } from "@/lib/jarvis/constants";

const JarvisContext = createContext(null);

export function useJarvis() {
    const ctx = useContext(JarvisContext);
    if (!ctx) {
        throw new Error("useJarvis must be used within JarvisProvider");
    }
    return ctx;
}

export default function JarvisProvider({ children }) {
    const reduceMotion = useReducedMotion();
    const [initialized, setInitialized] = useState(false);
    const [booting, setBooting] = useState(false);
    const [bootComplete, setBootComplete] = useState(true);
    const [paletteOpen, setPaletteOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    const [sfxMuted, setSfxMuted] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(false);
    const [voiceConsent, setVoiceConsent] = useState(false);
    const voiceToggleLockRef = useRef(false);
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [reactorCharge, setReactorCharge] = useState(0.6);
    const [isMobile, setIsMobile] = useState(false);
    const [use3D, setUse3D] = useState(false);

    const handleInit = useCallback((config) => {
        setBooting(config.booting);
        setBootComplete(config.bootComplete);
        setSfxMuted(config.sfxMuted);
        setVoiceEnabled(config.voiceEnabled);
        setVoiceConsent(config.voiceConsent);
        setIsMobile(config.isMobile);
        setUse3D(config.use3D);
        setInitialized(true);
    }, []);

    useEffect(() => {
        if (!initialized) return;
        const mqMobile = window.matchMedia("(max-width: 768px)");
        const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => {
            setIsMobile(mqMobile.matches);
            setUse3D(!mqMobile.matches && !mqReduce.matches && !reduceMotion);
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

    const setVoiceEnabledState = useCallback((next) => {
        setVoiceEnabled(next);
        localStorage.setItem(STORAGE_KEYS.voiceEnabled, String(next));
        if (!next) {
            setListening(false);
            setTranscript("");
        }
    }, []);

    const toggleVoice = useCallback(() => {
        if (voiceToggleLockRef.current) return;
        voiceToggleLockRef.current = true;
        window.setTimeout(() => {
            voiceToggleLockRef.current = false;
        }, 500);

        setVoiceEnabled((v) => {
            const next = !v;
            localStorage.setItem(STORAGE_KEYS.voiceEnabled, String(next));
            if (!next) {
                setListening(false);
                setTranscript("");
                if (typeof window !== "undefined") {
                    window.speechSynthesis?.cancel();
                }
            }
            return next;
        });
    }, []);

    const grantVoiceConsent = useCallback(() => {
        localStorage.setItem(STORAGE_KEYS.voiceConsent, "true");
        setVoiceConsent(true);
        setVoiceEnabled(true);
    }, []);

    const speak = useCallback((text) => {
        if (typeof window === "undefined" || !window.speechSynthesis || reduceMotion) {
            return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.02;
        utterance.pitch = 0.95;
        window.speechSynthesis.speak(utterance);
    }, [reduceMotion]);

    const value = useMemo(
        () => ({
            reduceMotion,
            booting,
            bootComplete,
            setBooting,
            completeBoot,
            replayBoot,
            paletteOpen,
            setPaletteOpen,
            helpOpen,
            setHelpOpen,
            sfxMuted,
            toggleSfx,
            voiceEnabled,
            toggleVoice,
            setVoiceEnabledState,
            voiceConsent,
            grantVoiceConsent,
            initialized,
            listening,
            setListening,
            transcript,
            setTranscript,
            reactorCharge,
            setReactorCharge,
            isMobile,
            use3D,
            speak,
        }),
        [
            reduceMotion,
            booting,
            bootComplete,
            completeBoot,
            replayBoot,
            paletteOpen,
            helpOpen,
            sfxMuted,
            toggleSfx,
            voiceEnabled,
            toggleVoice,
            setVoiceEnabledState,
            voiceConsent,
            initialized,
            listening,
            transcript,
            reactorCharge,
            isMobile,
            use3D,
            speak,
            grantVoiceConsent,
        ]
    );

    return (
        <JarvisContext.Provider value={value}>
            <JarvisInit onInit={handleInit} />
            {children}
        </JarvisContext.Provider>
    );
}
