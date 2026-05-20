import { IBM_Plex_Mono, Space_Grotesk, Sora } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-primary",
    display: "swap",
});

export const sora = Sora({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    variable: "--font-display",
    display: "swap",
});

export const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-mono",
    display: "swap",
});

export const fontVariables = `${spaceGrotesk.variable} ${sora.variable} ${ibmPlexMono.variable}`;
