"use client";

import { useEffect, useState } from "react";
import { SITE_STORAGE_KEYS } from "@/lib/site/constants";

const THEMES = ["dark", "light"];

export default function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") {
            return "dark";
        }

        const saved = window.localStorage.getItem(SITE_STORAGE_KEYS.theme);
        const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return THEMES.includes(saved) ? saved : preferredDark ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        window.localStorage.setItem(SITE_STORAGE_KEYS.theme, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((current) => (current === "dark" ? "light" : "dark"));
    };

    const isDark = theme === "dark";

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            suppressHydrationWarning
        >
            <span className="theme-toggle-track" aria-hidden="true">
                <span className="theme-toggle-thumb" />
            </span>
            <span className="theme-toggle-label theme-toggle-label--long" suppressHydrationWarning>
                {isDark ? "Dark theme" : "Light theme"}
            </span>
            <span className="theme-toggle-label theme-toggle-label--short" suppressHydrationWarning>
                {isDark ? "Dark" : "Light"}
            </span>
        </button>
    );
}
