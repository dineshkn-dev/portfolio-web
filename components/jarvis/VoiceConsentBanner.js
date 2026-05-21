"use client";

import { useJarvis } from "@/components/jarvis/JarvisProvider";

export default function VoiceConsentBanner() {
    const { voiceEnabled, voiceConsent, reduceMotion, isMobile, grantVoiceConsent, toggleVoice } =
        useJarvis();

    if (reduceMotion || isMobile || voiceConsent) return null;

    return (
        <div className="jarvis-voice-banner" role="dialog" aria-label="Voice consent">
            <span>Enable microphone for JARVIS voice commands?</span>
            <button type="button" className="button button-primary" onClick={grantVoiceConsent}>
                Allow
            </button>
            <button
                type="button"
                className="button button-ghost"
                onClick={() => {
                    if (voiceEnabled) toggleVoice();
                }}
            >
                Cancel
            </button>
        </div>
    );
}
