"use client";

import { Toaster } from "react-hot-toast";

export default function ContactToaster() {
    return (
        <Toaster
            position="bottom-center"
            toastOptions={{
                duration: 2500,
                style: {
                    background: "var(--surface-strong)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                },
            }}
        />
    );
}
