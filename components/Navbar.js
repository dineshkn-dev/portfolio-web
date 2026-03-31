"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { spring } from "@/lib/motion";
import ThemeToggle from "@/components/ThemeToggle";

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
            className="navbar-bar fixed top-0 left-0 w-full flex items-center justify-center px-2 pt-3 z-50"
            initial={false}
            animate={{
                y: scrolled ? 0 : 2,
                opacity: 1,
            }}
            transition={spring.soft}
        >
            <div className="nav-shell flex items-center justify-between gap-2 md:gap-3">
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

                <div className="flex items-center gap-1 p-1 nav-pill">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link key={item.path} href={item.path} className={`nav-link ${isActive ? "nav-link-active" : ""}`}>
                                {isActive && (
                                    <motion.span
                                        className="nav-link-active-bg"
                                        layoutId="nav-pill"
                                        transition={spring.snappy}
                                    />
                                )}
                                <span className="relative z-10">
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>

                <ThemeToggle />
            </div>
        </motion.nav>
    );
}
