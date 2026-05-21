"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useJarvis } from "@/components/jarvis/JarvisProvider";
import { getModuleFromPath } from "@/lib/jarvis/constants";
import { homeStats } from "@/lib/site-content";

export default function HudFrame() {
    const pathname = usePathname();
    const { voiceEnabled, transcript } = useJarvis();
    const mod = getModuleFromPath(pathname);
    const [time, setTime] = useState("");

    useEffect(() => {
        const tick = () => {
            const d = new Date();
            setTime(
                d.toLocaleTimeString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })
            );
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <>
            <div className="hud-frame" aria-hidden="true">
                <span className="hud-corner hud-corner--tl" />
                <span className="hud-corner hud-corner--tr" />
                <span className="hud-corner hud-corner--bl" />
                <span className="hud-corner hud-corner--br" />
                <span className="hud-scanlines" />
            </div>

            <footer className="hud-statusbar">
                <span>
                    <span className="hud-status-dot" aria-hidden="true" />
                    <strong>ONLINE</strong> · {mod.label}
                </span>
                <span>
                    {homeStats.map((s) => `${s.value} ${s.label}`).join(" · ")}
                </span>
                <span>{time} UTC</span>
            </footer>

            {voiceEnabled ? (
                <div className="jarvis-transcript" role="status" aria-live="polite">
                    {transcript || "Voice active — awaiting command…"}
                </div>
            ) : null}
        </>
    );
}
