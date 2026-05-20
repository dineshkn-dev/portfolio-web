"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
    { label: "About", path: "/" },
    { label: "Skills", path: "/skills" },
    { label: "Timeline", path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Get In Touch", path: "/contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`navbar-bar fixed top-0 left-0 w-full z-50 px-[var(--content-gutter)] pt-3 ${scrolled ? "navbar-bar--scrolled" : ""}`}
        >
            <div className="nav-shell">
                <Link href="/" className="nav-brand" aria-label="Dinesh K N — Home">
                    <Image
                        src="/favico.svg"
                        alt=""
                        width={36}
                        height={36}
                        priority
                        loading="eager"
                        className="nav-logo w-9 h-9 md:w-10 md:h-10"
                        aria-hidden
                    />
                    <span className="nav-brand-name">Dinesh K N</span>
                </Link>

                <nav className="nav-links" aria-label="Main">
                    <ul className="nav-links-list">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;

                            return (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`nav-link ${item.label === "Get In Touch" ? "nav-link-wide" : ""} ${isActive ? "nav-link-active" : ""}`}
                                        aria-current={isActive ? "page" : undefined}
                                    >
                                        {isActive ? <span className="nav-link-active-bg" aria-hidden="true" /> : null}
                                        <span className="nav-link-label">{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="nav-actions">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
