import { resolve } from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {
        root: resolve(".")
    },
    /* Hides the dev-only "Rendering…" pill; production builds never show it */
    devIndicators: false,
    experimental: {
        optimizePackageImports: [
            "framer-motion",
            "gsap",
            "cmdk",
            "three",
            "@react-three/fiber",
            "@react-three/drei",
        ],
    },
};

export default nextConfig;
