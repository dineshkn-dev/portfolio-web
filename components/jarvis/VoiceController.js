"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useJarvis } from "@/components/jarvis/JarvisProvider";
import { useJarvisAudio } from "@/components/jarvis/AudioController";
import { matchIntent } from "@/lib/jarvis/intents";
import { jarvisLines } from "@/lib/site-content";
import VoiceConsentBanner from "@/components/jarvis/VoiceConsentBanner";

function getSpeechRecognition() {
    if (typeof window === "undefined") return null;
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

const MIN_TRANSCRIPT_LEN = 3;
const DUPLICATE_MS = 2000;
/** Min gap between mic restarts — coalesces rapid onend/no-speech cycles */
const RESTART_DEBOUNCE_MS = 800;
/** Brief delay after onend before start() — macOS releases mic until then */
const RESTART_AFTER_END_MS = 200;

export default function VoiceController() {
    const router = useRouter();
    const {
        voiceEnabled,
        voiceConsent,
        setListening,
        setTranscript,
        setPaletteOpen,
        setHelpOpen,
        toggleSfx,
        sfxMuted,
        setVoiceEnabledState,
        reduceMotion,
        isMobile,
    } = useJarvis();
    const { playSfx } = useJarvisAudio();

    const enabledRef = useRef(false);
    const activeRecRef = useRef(null);
    const restartTimerRef = useRef(null);
    const lastRestartAtRef = useRef(0);
    const speakingRef = useRef(false);
    const processingRef = useRef(false);
    const lastFinalRef = useRef({ text: "", at: 0 });
    const routerRef = useRef(router);
    const sfxMutedRef = useRef(sfxMuted);
    const handlersRef = useRef({ process: null, restart: null });

    useEffect(() => {
        enabledRef.current = voiceEnabled;
        routerRef.current = router;
        sfxMutedRef.current = sfxMuted;
    }, [voiceEnabled, router, sfxMuted]);

    const clearRestartTimer = useCallback(() => {
        if (restartTimerRef.current) {
            clearTimeout(restartTimerRef.current);
            restartTimerRef.current = null;
        }
    }, []);

    const destroySession = useCallback(() => {
        clearRestartTimer();
        const rec = activeRecRef.current;
        if (rec) {
            rec.onstart = null;
            rec.onend = null;
            rec.onerror = null;
            rec.onresult = null;
            try {
                rec.abort();
            } catch {
                try {
                    rec.stop();
                } catch {
                    /* noop */
                }
            }
            activeRecRef.current = null;
        }
        setListening(false);
        processingRef.current = false;
        speakingRef.current = false;
    }, [clearRestartTimer, setListening]);

    const speakResponse = useCallback((line) => {
        if (!line || typeof window === "undefined" || !window.speechSynthesis) return;

        speakingRef.current = true;
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(line);
        utterance.rate = 1.02;
        utterance.pitch = 0.95;
        const done = () => {
            speakingRef.current = false;
        };
        utterance.onend = done;
        utterance.onerror = done;
        window.speechSynthesis.speak(utterance);
    }, []);

    const tryResumeMic = useCallback((rec) => {
        if (!enabledRef.current || speakingRef.current) return false;
        if (activeRecRef.current !== rec) return false;

        try {
            rec.start();
            lastRestartAtRef.current = Date.now();
            return true;
        } catch {
            return false;
        }
    }, []);

    const scheduleMicRestart = useCallback(
        (rec, delayMs = RESTART_AFTER_END_MS) => {
            if (!enabledRef.current || speakingRef.current) return;

            const now = Date.now();
            if (now - lastRestartAtRef.current < RESTART_DEBOUNCE_MS) return;

            clearRestartTimer();
            restartTimerRef.current = window.setTimeout(() => {
                restartTimerRef.current = null;
                if (!tryResumeMic(rec)) {
                    window.setTimeout(() => tryResumeMic(rec), 400);
                }
            }, delayMs);
        },
        [clearRestartTimer, tryResumeMic]
    );

    const processTranscript = useCallback(
        (raw) => {
            const transcript = raw.trim();
            if (transcript.length < MIN_TRANSCRIPT_LEN) return;
            if (speakingRef.current || processingRef.current) return;

            const now = Date.now();
            if (
                transcript.toLowerCase() === lastFinalRef.current.text &&
                now - lastFinalRef.current.at < DUPLICATE_MS
            ) {
                return;
            }
            lastFinalRef.current = { text: transcript.toLowerCase(), at: now };

            processingRef.current = true;
            setTranscript(transcript);

            const intent = matchIntent(transcript);
            if (!intent) {
                processingRef.current = false;
                return;
            }

            switch (intent.type) {
                case "unknown":
                    setTranscript(`No command matched. Try "open projects" or ⌘K.`);
                    processingRef.current = false;
                    break;
                case "navigate":
                    if (intent.path) routerRef.current.push(intent.path);
                    if (intent.line) speakResponse(intent.line);
                    playSfx("whoosh");
                    processingRef.current = false;
                    break;
                case "speak-navigate":
                    if (intent.path) routerRef.current.push(intent.path);
                    if (intent.line) speakResponse(intent.line);
                    processingRef.current = false;
                    break;
                case "speak":
                    speakResponse(intent.line);
                    processingRef.current = false;
                    break;
                case "mute":
                    if (!sfxMutedRef.current) toggleSfx();
                    speakResponse("Audio muted.");
                    processingRef.current = false;
                    break;
                case "unmute":
                    if (sfxMutedRef.current) toggleSfx();
                    speakResponse("Audio enabled.");
                    processingRef.current = false;
                    break;
                case "help":
                    setHelpOpen(true);
                    speakResponse("Displaying command shortcuts.");
                    processingRef.current = false;
                    break;
                case "palette":
                    setPaletteOpen(true);
                    setTranscript("Command palette open.");
                    processingRef.current = false;
                    break;
                case "voice-off":
                    setVoiceEnabledState(false);
                    setTranscript(jarvisLines.voiceOff);
                    processingRef.current = false;
                    break;
                case "voice-on":
                    setTranscript(jarvisLines.voiceOn);
                    processingRef.current = false;
                    break;
                default:
                    processingRef.current = false;
                    break;
            }
        },
        [
            speakResponse,
            playSfx,
            setHelpOpen,
            setPaletteOpen,
            setTranscript,
            toggleSfx,
            setVoiceEnabledState,
        ]
    );

    const bindRecognition = useCallback(
        (rec) => {
            rec.onstart = null;

            rec.onend = () => {
                if (activeRecRef.current !== rec) return;
                scheduleMicRestart(rec);
            };

            rec.onerror = (event) => {
                if (activeRecRef.current !== rec) return;
                if (event.error === "not-allowed" || event.error === "service-not-allowed") {
                    setTranscript("Microphone access denied.");
                    setVoiceEnabledState(false);
                    destroySession();
                    return;
                }
                if (event.error === "aborted") return;
                if (event.error === "no-speech") {
                    setTranscript("Voice active — say a command…");
                    return;
                }
                if (event.error === "network") {
                    setTranscript("Network error — retrying voice…");
                    scheduleMicRestart(rec);
                }
            };

            rec.onresult = (event) => {
                if (speakingRef.current) return;

                let final = "";
                let interim = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const t = event.results[i][0].transcript;
                    if (event.results[i].isFinal) final += t;
                    else interim += t;
                }

                if (final) {
                    handlersRef.current.process?.(final);
                } else if (interim) {
                    setTranscript(interim);
                }
            };
        },
        [scheduleMicRestart, destroySession, setTranscript, setVoiceEnabledState]
    );

    const startSession = useCallback(() => {
        if (!enabledRef.current) return;
        if (activeRecRef.current) return;

        const SR = getSpeechRecognition();
        if (!SR) {
            setTranscript("Voice recognition is not supported in this browser.");
            setVoiceEnabledState(false);
            return;
        }

        const rec = new SR();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = "en-US";
        activeRecRef.current = rec;
        bindRecognition(rec);

        try {
            rec.start();
            lastRestartAtRef.current = Date.now();
        } catch {
            activeRecRef.current = null;
            setVoiceEnabledState(false);
        }
    }, [bindRecognition, setVoiceEnabledState, setTranscript]);

    useEffect(() => {
        handlersRef.current.process = processTranscript;
        handlersRef.current.restart = startSession;
    }, [processTranscript, startSession]);

    useEffect(() => {
        if (reduceMotion || isMobile || !voiceEnabled || !voiceConsent) {
            destroySession();
            if (typeof window !== "undefined") {
                window.speechSynthesis?.cancel();
            }
            return;
        }

        setListening(true);
        setTranscript("Voice active — awaiting command…");
        startSession();

        return () => {
            destroySession();
            if (typeof window !== "undefined") {
                window.speechSynthesis?.cancel();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps -- session lifecycle tied to voice toggle only
    }, [voiceEnabled, voiceConsent, reduceMotion, isMobile]);

    return <VoiceConsentBanner />;
}
