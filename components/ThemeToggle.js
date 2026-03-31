"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { spring } from "@/lib/motion";

const THEMES = ["dark", "light"];

export default function ThemeToggle() {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme = THEMES.includes(saved) ? saved : preferredDark ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", initialTheme);
        setTheme(initialTheme);
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("theme", nextTheme);
    };

    return (
        <motion.button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            whileTap={{ scale: 0.96 }}
            transition={spring.snappy}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
            <span className="theme-toggle-track" aria-hidden="true">
                <motion.span
                    className="theme-toggle-thumb"
                    animate={{ x: theme === "dark" ? 0 : 22 }}
                    transition={spring.soft}
                />
            </span>
            <span className="theme-toggle-label">{theme === "dark" ? "Dark" : "Light"}</span>
        </motion.button>
    );
}
