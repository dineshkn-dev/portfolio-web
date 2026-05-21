"use client";

import { useJarvis } from "@/components/jarvis/JarvisProvider";
import { JARVIS_MODULES } from "@/lib/jarvis/constants";

export default function HelpOverlay() {
    const { helpOpen, setHelpOpen } = useJarvis();

    if (!helpOpen) return null;

    return (
        <div
            className="jarvis-help-overlay"
            role="dialog"
            aria-label="Keyboard shortcuts"
            onClick={() => setHelpOpen(false)}
        >
            <div
                className="jarvis-help-panel"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="jarvis-eyebrow">Shortcuts</p>
                <h2 className="jarvis-title" style={{ fontSize: "1.25rem" }}>
                    Command Interface
                </h2>
                <ul style={{ listStyle: "none", padding: 0, margin: "1rem 0 0" }}>
                    <li style={{ marginBottom: "0.5rem" }}>
                        <kbd>⌘</kbd><kbd>K</kbd> Command palette
                    </li>
                    {JARVIS_MODULES.map((m) => (
                        <li key={m.id} style={{ marginBottom: "0.5rem" }}>
                            <kbd>{m.shortcut}</kbd> {m.label}
                        </li>
                    ))}
                    <li style={{ marginBottom: "0.5rem" }}>
                        <kbd>M</kbd> Toggle sound
                    </li>
                    <li style={{ marginBottom: "0.5rem" }}>
                        <kbd>V</kbd> Toggle voice
                    </li>
                    <li style={{ marginBottom: "0.5rem" }}>
                        <kbd>?</kbd> This help
                    </li>
                    <li>
                        <kbd>Esc</kbd> Close
                    </li>
                </ul>
                <button
                    type="button"
                    className="button button-primary mt-4"
                    onClick={() => setHelpOpen(false)}
                >
                    Dismiss
                </button>
            </div>
        </div>
    );
}
