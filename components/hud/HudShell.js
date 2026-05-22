"use client";

import dynamic from "next/dynamic";
import JarvisProvider from "@/components/jarvis/JarvisProvider";
import HudFrame from "@/components/jarvis/HudFrame";
import HudNav from "@/components/jarvis/HudNav";
import ModuleTransition from "@/components/jarvis/ModuleTransition";
import ReactorBackdrop from "@/components/canvas/ReactorBackdrop";
import AudioController from "@/components/jarvis/AudioController";
import { useJarvis } from "@/components/jarvis/JarvisProvider";

const ReactorCanvas = dynamic(() => import("@/components/canvas/ReactorCanvas"), {
    ssr: false,
    loading: () => null,
});

const BootSequence = dynamic(() => import("@/components/jarvis/BootSequence"), {
    ssr: false,
});

const CursorLayer = dynamic(() => import("@/components/jarvis/CursorLayer"), {
    ssr: false,
});

function JarvisShellInner({ children }) {
    const jarvis = useJarvis();

    return (
        <div className="jarvis-shell site-shell">
            <ReactorBackdrop />
            {jarvis.use3D ? <ReactorCanvas /> : null}
            <HudFrame />
            <div className="jarvis-chrome">
                <HudNav />
                <main
                    className="jarvis-main"
                    style={{
                        visibility: jarvis.booting ? "hidden" : "visible",
                        pointerEvents: jarvis.booting ? "none" : "auto",
                    }}
                >
                    <ModuleTransition>{children}</ModuleTransition>
                </main>
            </div>
            {jarvis.booting ? <BootSequence /> : null}
            {!jarvis.reduceMotion && !jarvis.isMobile ? <CursorLayer /> : null}
            <AudioController />
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
