export const STORAGE_KEYS = {
    bootComplete: "jarvis-boot-complete",
    voiceConsent: "jarvis-voice-consent",
    sfxMuted: "jarvis-sfx-muted",
    voiceEnabled: "jarvis-voice-enabled",
    /** Opt-in WebGL reactor — off by default for performance */
    reactor3d: "jarvis-reactor-3d",
};

export const JARVIS_MODULES = [
    { id: "home", label: "Cockpit", path: "/", shortcut: "1" },
    { id: "skills", label: "Skills Matrix", path: "/skills", shortcut: "2" },
    { id: "timeline", label: "Career Timeline", path: "/about", shortcut: "3" },
    { id: "projects", label: "Project Archive", path: "/projects", shortcut: "4" },
    { id: "contact", label: "Comms Channel", path: "/contact", shortcut: "5" },
];

export function getModuleFromPath(pathname) {
    return JARVIS_MODULES.find((m) => m.path === pathname) ?? JARVIS_MODULES[0];
}
