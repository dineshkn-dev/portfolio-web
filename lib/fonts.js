import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";

/** Primary UI — also used for headings (fewer font files = faster LCP) */
export const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-primary",
    display: "swap",
    preload: true,
});

export const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-mono",
    display: "swap",
    preload: true,
});

export const fontVariables = `${spaceGrotesk.variable} ${ibmPlexMono.variable}`;
