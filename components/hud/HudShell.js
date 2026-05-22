"use client";

import dynamic from "next/dynamic";
import HudProvider from "@/components/hud/HudProvider";
import HudFrame from "@/components/hud/HudFrame";
import HudNav from "@/components/hud/HudNav";
import ModuleTransition from "@/components/hud/ModuleTransition";
import ReactorBackdrop from "@/components/canvas/ReactorBackdrop";
import AudioController from "@/components/hud/AudioController";
import { useHud } from "@/components/hud/HudProvider";

const ReactorCanvas = dynamic(() => import("@/components/canvas/ReactorCanvas"), {
    ssr: false,
    loading: () => null,
});

const BootSequence = dynamic(() => import("@/components/hud/BootSequence"), {
    ssr: false,
});

const CursorLayer = dynamic(() => import("@/components/hud/CursorLayer"), {
    ssr: false,
});

function HudShellInner({ children }) {
    const hud = useHud();

    return (
        <div className="hud-shell site-shell">
            <ReactorBackdrop />
            {hud.use3D ? <ReactorCanvas /> : null}
            <HudFrame />
            <div className="hud-chrome">
                <HudNav />
                <main
                    className="hud-main"
                    style={{
                        visibility: hud.booting ? "hidden" : "visible",
                        pointerEvents: hud.booting ? "none" : "auto",
                    }}
                >
                    <ModuleTransition>{children}</ModuleTransition>
                </main>
            </div>
            {hud.booting ? <BootSequence /> : null}
            {!hud.reduceMotion && !hud.isMobile ? <CursorLayer /> : null}
            <AudioController />
        </div>
    );
}

export default function HudShell({ children }) {
    return (
        <HudProvider>
            <HudShellInner>{children}</HudShellInner>
        </HudProvider>
    );
}
