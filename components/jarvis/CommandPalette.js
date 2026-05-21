"use client";

import { useMemo, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useJarvis } from "@/components/jarvis/JarvisProvider";
import { useJarvisAudio } from "@/components/jarvis/AudioController";
import { buildCommands } from "@/lib/jarvis/commands";

export default function CommandPalette() {
    const router = useRouter();
    const jarvis = useJarvis();
    const { playSfx } = useJarvisAudio();
    const { paletteOpen, setPaletteOpen } = jarvis;
    const [query, setQuery] = useState("");

    const commands = useMemo(
        () =>
            buildCommands({
                router,
                jarvis: {
                    replayBoot: jarvis.replayBoot,
                    toggleVoice: jarvis.toggleVoice,
                    toggleSfx: jarvis.toggleSfx,
                    setHelpOpen: jarvis.setHelpOpen,
                    speak: jarvis.speak,
                },
            }),
        [router, jarvis]
    );

    const groups = useMemo(() => {
        const filtered = commands.filter((cmd) => {
            if (!query) return true;
            const q = query.toLowerCase();
            return (
                cmd.label.toLowerCase().includes(q) ||
                cmd.keywords?.some((k) => String(k).toLowerCase().includes(q))
            );
        });
        const byGroup = {};
        filtered.forEach((cmd) => {
            if (!byGroup[cmd.group]) byGroup[cmd.group] = [];
            byGroup[cmd.group].push(cmd);
        });
        return byGroup;
    }, [commands, query]);

    if (!paletteOpen) return null;

    const run = (cmd) => {
        playSfx("whoosh");
        setQuery("");
        setPaletteOpen(false);
        cmd.action();
    };

    const close = () => {
        setQuery("");
        setPaletteOpen(false);
    };

    return (
        <>
            <div
                className="jarvis-cmd-overlay"
                role="presentation"
                onClick={close}
            />
            <div className="jarvis-cmd-dialog" role="dialog" aria-label="Command palette">
                <Command label="Command palette" shouldFilter={false}>
                    <Command.Input
                        placeholder="Search systems, projects, skills…"
                        value={query}
                        onValueChange={setQuery}
                        autoFocus
                    />
                    <Command.List>
                        <Command.Empty>No matching commands.</Command.Empty>
                        {Object.entries(groups).map(([group, items]) => (
                            <Command.Group key={group} heading={group}>
                                {items.map((cmd) => (
                                    <Command.Item
                                        key={cmd.id}
                                        value={cmd.id}
                                        onSelect={() => run(cmd)}
                                    >
                                        {cmd.label}
                                    </Command.Item>
                                ))}
                            </Command.Group>
                        ))}
                    </Command.List>
                </Command>
            </div>
        </>
    );
}
