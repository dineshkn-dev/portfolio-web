"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ShellContext = createContext(null);

export function useShell() {
    const ctx = useContext(ShellContext);
    if (!ctx) {
        throw new Error("useShell must be used within ShellProvider");
    }
    return ctx;
}

export default function ShellProvider({ children }) {
    const reduceMotion = useReducedMotion();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mqMobile = window.matchMedia("(max-width: 768px)");
        const update = () => {
            setIsMobile(mqMobile.matches);
        };
        update();
        mqMobile.addEventListener("change", update);
        return () => {
            mqMobile.removeEventListener("change", update);
        };
    }, []);

    const value = useMemo(
        () => ({
            reduceMotion,
            isMobile,
        }),
        [
            reduceMotion,
            isMobile,
        ]
    );

    return (
        <ShellContext.Provider value={value}>
            {children}
        </ShellContext.Provider>
    );
}
