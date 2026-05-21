"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useJarvis } from "@/components/jarvis/JarvisProvider";
import { useJarvisAudio } from "@/components/jarvis/AudioController";
import ThemeToggle from "@/components/ThemeToggle";
import { JARVIS_MODULES } from "@/lib/jarvis/constants";

export default function HudNav() {
    const pathname = usePathname();
    const {
        setPaletteOpen,
        voiceEnabled,
        toggleVoice,
        voiceConsent,
        grantVoiceConsent,
        reduceMotion,
    } = useJarvis();
    const { playSfx } = useJarvisAudio();

    const handleVoiceClick = () => {
        if (reduceMotion) return;
        if (!voiceConsent) {
            grantVoiceConsent();
            playSfx("click");
            return;
        }
        toggleVoice();
        playSfx("click");
    };

    return (
        <header className="hud-nav">
            <div className="hud-nav-inner">
                <Link href="/" className="hud-brand" onClick={() => playSfx("click")}>
                    <Image
                        src="/favico.svg"
                        alt=""
                        width={32}
                        height={32}
                        priority
                        aria-hidden
                    />
                    <span>
                        Dinesh K N
                        <span className="hud-brand-tag block">J.A.R.V.I.S</span>
                    </span>
                </Link>

                <nav aria-label="Systems">
                    <ul className="hud-nav-links">
                        {JARVIS_MODULES.map((item) => {
                            const active = pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`hud-nav-link ${active ? "hud-nav-link--active" : ""}`}
                                        aria-current={active ? "page" : undefined}
                                        onClick={() => playSfx("whoosh")}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="hud-nav-actions">
                    <button
                        type="button"
                        className="hud-cmd-btn"
                        onClick={() => {
                            setPaletteOpen(true);
                            playSfx("click");
                        }}
                    >
                        ⌘K Commands
                    </button>
                    {!reduceMotion ? (
                        <button
                            type="button"
                            className={`hud-voice-btn ${voiceEnabled ? "hud-voice-btn--active" : ""}`}
                            onClick={handleVoiceClick}
                            aria-pressed={voiceEnabled}
                            aria-label={voiceEnabled ? "Disable voice" : "Enable voice"}
                        >
                            Voice {voiceEnabled ? "On" : "Off"}
                        </button>
                    ) : null}
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
