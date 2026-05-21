"use client";

import { useEffect, useState } from "react";

const THEMES = ["dark", "light"];

export default function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") {
            return "dark";
        }

        const saved = window.localStorage.getItem("theme");
        const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return THEMES.includes(saved) ? saved : preferredDark ? "dark" : "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        window.localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((current) => (current === "dark" ? "light" : "dark"));
    };

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            suppressHydrationWarning
        >
            <span className="theme-toggle-track" aria-hidden="true">
                <span className="theme-toggle-thumb" />
            </span>
            <span className="theme-toggle-label" suppressHydrationWarning>
                {theme === "dark" ? "Reactor" : "Daylight"}
            </span>
        </button>
    );
}
