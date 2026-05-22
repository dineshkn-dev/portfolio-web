export const STORAGE_KEYS = {
    bootComplete: "jarvis-boot-complete",
    sfxMuted: "jarvis-sfx-muted",
    /** Opt-in WebGL reactor — off by default for performance */
    reactor3d: "jarvis-reactor-3d",
};

export const JARVIS_MODULES = [
    { id: "home", label: "Cockpit", path: "/" },
    { id: "skills", label: "Skills Matrix", path: "/skills" },
    { id: "timeline", label: "Career Timeline", path: "/about" },
    { id: "projects", label: "Project Archive", path: "/projects" },
    { id: "contact", label: "Comms Channel", path: "/contact" },
];

export function getModuleFromPath(pathname) {
    return JARVIS_MODULES.find((m) => m.path === pathname) ?? JARVIS_MODULES[0];
}
