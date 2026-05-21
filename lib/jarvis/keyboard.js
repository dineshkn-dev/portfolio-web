import { JARVIS_MODULES } from "@/lib/jarvis/constants";

export function handleGlobalKeydown(e, handlers) {
    const target = e.target;
    const tag = target?.tagName?.toLowerCase();
    const isTyping =
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        target?.isContentEditable;

    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        handlers.openPalette();
        return;
    }

    if (isTyping) return;

    if (e.key === "?") {
        e.preventDefault();
        handlers.setHelpOpen(true);
        return;
    }

    if (e.key === "Escape") {
        handlers.setHelpOpen(false);
        handlers.closePalette?.();
        return;
    }

    const mod = JARVIS_MODULES.find((m) => m.shortcut === e.key);
    if (mod && !e.metaKey && !e.ctrlKey && !e.altKey) {
        handlers.navigate(mod.path);
        handlers.playSfx?.("click");
        return;
    }

    if (e.key.toLowerCase() === "m") {
        handlers.toggleSfx();
        return;
    }

    if (e.key.toLowerCase() === "v") {
        handlers.toggleVoice();
        return;
    }
}
