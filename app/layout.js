import "@/globals.css";
import JarvisShell from "@/components/jarvis/JarvisShell";
import DeferredAnalytics from "@/components/DeferredAnalytics";
import { fontVariables } from "@/lib/fonts";

export const metadata = {
    metadataBase: new URL("https://www.dineshkn.site"),
    title: {
        default: "Dinesh K N | Software Engineer",
        template: "%s | Dinesh K N"
    },
    description:
        "Portfolio of Dinesh K N — Software Engineer specializing in Backend Development, Cloud Architecture, and DevOps.",
    keywords: [
        "Software Engineer",
        "Backend Developer",
        "Cloud Architect",
        "Node.js",
        "NestJS",
        "TypeScript",
        "AWS",
        "Azure",
        "GCP"
    ],
    authors: [{ name: "Dinesh K N" }],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://www.dineshkn.site",
        siteName: "Dinesh K N",
        title: "Dinesh K N | Software Engineer",
        description:
            "Portfolio of Dinesh K N — Software Engineer specializing in Backend Development, Cloud Architecture, and DevOps."
    },
    twitter: {
        card: "summary",
        title: "Dinesh K N | Software Engineer",
        description:
            "Portfolio of Dinesh K N — Software Engineer specializing in Backend Development, Cloud Architecture, and DevOps."
    },
    icons: {
        icon: "/favico.svg"
    },
    robots: {
        index: true,
        follow: true
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-scroll-behavior="smooth" className={fontVariables}>
            <body className="min-h-screen antialiased text-[var(--foreground)]">
                <JarvisShell>{children}</JarvisShell>
                <DeferredAnalytics />
            </body>
        </html>
    );
}
