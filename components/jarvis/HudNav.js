"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useJarvis } from "@/components/jarvis/JarvisProvider";
import { useJarvisAudio } from "@/components/jarvis/AudioController";
import ThemeToggle from "@/components/ThemeToggle";
import { JARVIS_MODULES } from "@/lib/jarvis/constants";

export default function HudNav() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const { sfxMuted, toggleSfx } = useJarvis();
    const { playSfx } = useJarvisAudio();

    const handleAudioToggle = () => {
        if (sfxMuted) {
            toggleSfx();
            playSfx("click", { force: true });
            return;
        }
        playSfx("toggle");
        toggleSfx();
    };

    useEffect(() => {
        /* eslint-disable react-hooks/set-state-in-effect -- close drawer on route change */
        setMenuOpen(false);
        /* eslint-enable react-hooks/set-state-in-effect */
    }, [pathname]);

    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (e) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [menuOpen]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <header className="hud-nav">
                <div className="hud-nav-inner">
                    <Link href="/" className="hud-brand" onClick={() => playSfx("click")}>
                        <Image
                            src="/favico.svg"
                            alt=""
                            width={32}
                            height={32}
                            className="hud-brand-logo"
                            priority
                            aria-hidden
                        />
                        <span className="hud-brand-text">
                            <span className="hud-brand-name">Dinesh K N</span>
                            <span className="hud-brand-tag">J.A.R.V.I.S</span>
                        </span>
                    </Link>

                    <nav className="hud-nav-links-wrap" aria-label="Systems">
                        <ul className="hud-nav-links">
                            {JARVIS_MODULES.map((item) => {
                                const active = pathname === item.path;
                                return (
                                    <li key={item.path}>
                                        <Link
                                            href={item.path}
                                            className={`hud-nav-link ${active ? "hud-nav-link--active" : ""}`}
                                            aria-current={active ? "page" : undefined}
                                            onClick={() => playSfx("nav")}
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
                            className={`hud-audio-btn ${!sfxMuted ? "hud-audio-btn--active" : ""}`}
                            onClick={handleAudioToggle}
                            aria-pressed={!sfxMuted}
                            aria-label={sfxMuted ? "Enable interface audio" : "Mute interface audio"}
                        >
                            <span className="hud-audio-btn-label--long">Interface audio</span>
                            <span className="hud-audio-btn-label--short">Audio</span>
                            <span className="hud-audio-btn-state">{sfxMuted ? "Off" : "On"}</span>
                        </button>
                        <ThemeToggle />
                        <button
                            type="button"
                            className="hud-nav-menu-btn"
                            aria-expanded={menuOpen}
                            aria-controls="hud-nav-drawer"
                            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                            onClick={() => {
                                setMenuOpen((o) => !o);
                                playSfx("toggle");
                            }}
                        >
                            <span className="hud-nav-menu-icon" aria-hidden>
                                {menuOpen ? "✕" : "☰"}
                            </span>
                            <span className="hud-nav-menu-label">{menuOpen ? "Close" : "Menu"}</span>
                        </button>
                    </div>
                </div>
            </header>

            <div
                id="hud-nav-drawer"
                className={`hud-nav-drawer ${menuOpen ? "hud-nav-drawer--open" : ""}`}
                aria-hidden={!menuOpen}
            >
                <button
                    type="button"
                    className="hud-nav-drawer-backdrop"
                    aria-label="Close navigation menu"
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={() => {
                        closeMenu();
                        playSfx("click");
                    }}
                />
                <div className="hud-nav-drawer-panel" role="dialog" aria-label="Navigation">
                    <p className="hud-nav-drawer-title">Systems</p>
                    <ul className="hud-nav-drawer-links">
                        {JARVIS_MODULES.map((item) => {
                            const active = pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`hud-nav-drawer-link ${active ? "hud-nav-drawer-link--active" : ""}`}
                                        aria-current={active ? "page" : undefined}
                                        onClick={() => {
                                            playSfx("nav");
                                            closeMenu();
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}
