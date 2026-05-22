export const STORAGE_KEYS = {
    bootComplete: "hud-boot-complete",
    sfxMuted: "hud-sfx-muted",
    /** Opt-in WebGL reactor — off by default for performance */
    reactor3d: "hud-reactor-3d",
};

export const HUD_MODULES = [
    { id: "home", label: "Cockpit", path: "/" },
    { id: "skills", label: "Skills Matrix", path: "/skills" },
    { id: "timeline", label: "Career Timeline", path: "/about" },
    { id: "projects", label: "Project Archive", path: "/projects" },
    { id: "contact", label: "Comms Channel", path: "/contact" },
];

export function getModuleFromPath(pathname) {
    return HUD_MODULES.find((m) => m.path === pathname) ?? HUD_MODULES[0];
}
