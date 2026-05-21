"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import JarvisProvider, { useJarvis } from "@/components/jarvis/JarvisProvider";
import HudFrame from "@/components/jarvis/HudFrame";
import HudNav from "@/components/jarvis/HudNav";
import CommandPalette from "@/components/jarvis/CommandPalette";
import HelpOverlay from "@/components/jarvis/HelpOverlay";
import BootSequence from "@/components/jarvis/BootSequence";
import CursorLayer from "@/components/jarvis/CursorLayer";
import ModuleTransition from "@/components/jarvis/ModuleTransition";
import AudioController, { useJarvisAudio } from "@/components/jarvis/AudioController";
import { handleGlobalKeydown } from "@/lib/jarvis/keyboard";

const ReactorScene = dynamic(() => import("@/components/canvas/ReactorScene"), {
    ssr: false,
});

const VoiceController = dynamic(() => import("@/components/jarvis/VoiceController"), {
    ssr: false,
});

function JarvisShellInner({ children }) {
    const router = useRouter();
    const jarvis = useJarvis();
    const { playSfx } = useJarvisAudio();

    useEffect(() => {
        const handler = (e) =>
            handleGlobalKeydown(e, {
                openPalette: () => jarvis.setPaletteOpen(true),
                closePalette: () => jarvis.setPaletteOpen(false),
                setHelpOpen: jarvis.setHelpOpen,
                navigate: (path) => router.push(path),
                toggleSfx: jarvis.toggleSfx,
                toggleVoice: jarvis.toggleVoice,
                playSfx,
            });
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [router, jarvis, playSfx]);

    return (
        <div className="jarvis-shell site-shell">
            <ReactorScene />
            <HudFrame />
            <HudNav />
            <CommandPalette />
            <HelpOverlay />
            <BootSequence />
            <CursorLayer />
            <AudioController />
            <VoiceController />
            <main
                className="min-h-screen"
                style={{
                    visibility: jarvis.booting ? "hidden" : "visible",
                    pointerEvents: jarvis.booting ? "none" : "auto",
                }}
            >
                <ModuleTransition>{children}</ModuleTransition>
            </main>
        </div>
    );
}

export default function JarvisShell({ children }) {
    return (
        <JarvisProvider>
            <JarvisShellInner>{children}</JarvisShellInner>
        </JarvisProvider>
    );
}
