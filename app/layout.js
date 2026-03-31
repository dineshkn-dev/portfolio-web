import "@/globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        <html lang="en">
            <body className="site-shell min-h-screen antialiased text-[var(--foreground)]">
                <Navbar />
                <main className="min-h-screen flex flex-col justify-center">
                    {children}
                </main>
                <Toaster position="bottom-center" toastOptions={{ duration: 2500, style: { background: "var(--surface-strong)", color: "var(--foreground)", border: "1px solid var(--border)" } }} />
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
