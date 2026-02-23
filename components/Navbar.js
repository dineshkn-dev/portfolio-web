"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { spring } from "@/lib/motion";

const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Contact", path: "/contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            className="navbar-bar fixed top-0 left-0 w-full flex items-center justify-center px-4 py-3 z-50"
            style={{ height: "64px" }}
            initial={false}
            animate={{
                backgroundColor: scrolled ? "rgba(10, 10, 15, 0.85)" : "rgba(10, 10, 15, 0.4)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: scrolled ? "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.24)" : "none",
            }}
            transition={spring.soft}
        >
            <div className="container mx-auto flex items-center justify-between max-w-5xl h-full">
                <Link href="/" className="flex items-center shrink-0">
                    <motion.span
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        transition={spring.snappy}
                    >
                        <Image
                            src="/favico.svg"
                            alt="Dinesh K N"
                            width={36}
                            height={36}
                            className="nav-logo w-9 h-9 md:w-10 md:h-10"
                        />
                    </motion.span>
                </Link>

                {/* Desktop: pill nav */}
                <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 nav-pill">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link key={item.path} href={item.path} className="relative px-4 py-2 rounded-full text-sm font-medium">
                                {isActive && (
                                    <motion.span
                                        className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                                        layoutId="nav-pill"
                                        transition={spring.snappy}
                                    />
                                )}
                                <span className={`relative z-10 ${isActive ? "text-[#00e6ff]" : "text-gray-400 hover:text-white"} transition-colors`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>

                {/* Mobile: bottom-style links with spring */}
                <div className="flex md:hidden w-full justify-around absolute top-0 left-0 right-0 h-full items-center py-3 px-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link key={item.path} href={item.path} className="relative py-2 px-3 rounded-xl text-sm font-medium">
                                {isActive && (
                                    <motion.span
                                        className="absolute inset-0 rounded-xl bg-white/10"
                                        layoutId="nav-pill-mobile"
                                        transition={spring.snappy}
                                    />
                                )}
                                <span className={`relative z-10 ${isActive ? "text-[#00e6ff]" : "text-gray-400"}`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </motion.nav>
    );
}
