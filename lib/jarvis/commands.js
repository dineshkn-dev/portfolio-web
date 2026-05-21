import { JARVIS_MODULES } from "@/lib/jarvis/constants";
import { aboutIntro, projects, techStack } from "@/lib/site-content";

export function buildCommands({ router, jarvis }) {
    const navCommands = JARVIS_MODULES.map((mod) => ({
        id: `nav-${mod.id}`,
        label: mod.label,
        keywords: [mod.id, mod.path, mod.shortcut],
        group: "Navigation",
        action: () => router.push(mod.path),
    }));

    const projectCommands = projects.map((p) => ({
        id: `project-${p.title}`,
        label: p.title,
        keywords: [p.company, ...p.technologies],
        group: "Projects",
        action: () => router.push("/projects"),
    }));

    const skillCommands = techStack.map((s) => ({
        id: `skill-${s.name}`,
        label: s.name,
        keywords: [s.level],
        group: "Skills",
        action: () => router.push("/skills"),
    }));

    const systemCommands = [
        {
            id: "boot",
            label: "Re-run boot sequence",
            keywords: ["restart", "boot", "initialize"],
            group: "System",
            action: () => jarvis?.replayBoot?.(),
        },
        {
            id: "voice-toggle",
            label: "Toggle voice interface",
            keywords: ["voice", "jarvis", "mic"],
            group: "System",
            action: () => jarvis?.toggleVoice?.(),
        },
        {
            id: "mute",
            label: "Toggle sound effects",
            keywords: ["mute", "sound", "audio"],
            group: "System",
            action: () => jarvis?.toggleSfx?.(),
        },
        {
            id: "help",
            label: "Show keyboard shortcuts",
            keywords: ["help", "shortcuts", "?"],
            group: "System",
            action: () => jarvis?.setHelpOpen?.(true),
        },
        {
            id: "about-jarvis",
            label: aboutIntro.title,
            keywords: ["who", "about", "dinesh"],
            group: "Intel",
            action: () => {
                jarvis?.speak?.(
                    `${aboutIntro.title}. ${aboutIntro.description}`
                );
                router.push("/about");
            },
        },
    ];

    return [...navCommands, ...projectCommands, ...skillCommands, ...systemCommands];
}
