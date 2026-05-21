import { JARVIS_MODULES } from "@/lib/jarvis/constants";
import { aboutIntro, jarvisLines } from "@/lib/site-content";

const NAV_PATTERNS = [
    { patterns: [/home|cockpit|main/i], path: "/" },
    { patterns: [/skill|matrix|tech/i], path: "/skills" },
    { patterns: [/timeline|career|about|history/i], path: "/about" },
    { patterns: [/project|archive|portfolio/i], path: "/projects" },
    { patterns: [/contact|comms|message|email/i], path: "/contact" },
];

export function matchIntent(transcript) {
    const text = transcript.trim().toLowerCase();
    if (!text) return null;

    if (/mute|silence|quiet/.test(text)) {
        return { type: "mute" };
    }
    if (/unmute|sound on/.test(text)) {
        return { type: "unmute" };
    }
    if (/help|commands|what can/.test(text)) {
        return { type: "help" };
    }
    if (/voice off|stop listening/.test(text)) {
        return { type: "voice-off" };
    }
    if (/voice on|start listening|hey jarvis/.test(text)) {
        return { type: "voice-on" };
    }
    if (/status|systems|online/.test(text)) {
        return { type: "speak", line: jarvisLines.status };
    }
    if (/who are you|about you|introduce/.test(text)) {
        return {
            type: "speak-navigate",
            line: `${aboutIntro.title}. ${aboutIntro.description}`,
            path: "/about",
        };
    }
    if (/open palette|command|search/.test(text)) {
        return { type: "palette" };
    }

    for (const { patterns, path } of NAV_PATTERNS) {
        if (patterns.some((p) => p.test(text))) {
            const mod = JARVIS_MODULES.find((m) => m.path === path);
            return {
                type: "navigate",
                path,
                line: `Routing to ${mod?.label ?? "module"}.`,
            };
        }
    }

    if (/go to|open|show|navigate/.test(text)) {
        for (const mod of JARVIS_MODULES) {
            if (text.includes(mod.id) || text.includes(mod.label.toLowerCase())) {
                return { type: "navigate", path: mod.path, line: `Routing to ${mod.label}.` };
            }
        }
    }

    return { type: "unknown" };
}
