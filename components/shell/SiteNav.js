"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { SITE_ROUTES } from "@/lib/site/constants";

export default function SiteNav() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        /* eslint-disable react-hooks/set-state-in-effect -- close drawer on route change */
        setMenuOpen(false);
        /* eslint-enable react-hooks/set-state-in-effect */
    }, [pathname]);

    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (e) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [menuOpen]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <header className="site-nav">
                <div className="site-nav-inner">
                    <Link href="/" className="site-brand">
                        <Image
                            src="/logo.svg"
                            alt=""
                            width={32}
                            height={32}
                            className="site-brand-logo"
                            priority
                            aria-hidden
                        />
                        <span className="site-brand-text">
                            <span className="site-brand-name">Dinesh K N</span>
                            <span className="site-brand-tag">Backend Engineer</span>
                        </span>
                    </Link>

                    <nav className="site-nav-links-wrap" aria-label="Primary navigation">
                        <ul className="site-nav-links">
                            {SITE_ROUTES.map((item) => {
                                const active = pathname === item.path;
                                return (
                                    <li key={item.path}>
                                        <Link
                                            href={item.path}
                                            className={`site-nav-link ${active ? "site-nav-link--active" : ""}`}
                                            aria-current={active ? "page" : undefined}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="site-nav-actions">
                        <ThemeToggle />
                        <button
                            type="button"
                            className="site-nav-menu-btn"
                            aria-expanded={menuOpen}
                            aria-controls="site-nav-drawer"
                            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                            onClick={() => {
                                setMenuOpen((o) => !o);
                            }}
                        >
                            <span className="site-nav-menu-icon" aria-hidden>
                                {menuOpen ? "✕" : "☰"}
                            </span>
                            <span className="site-nav-menu-label">{menuOpen ? "Close" : "Menu"}</span>
                        </button>
                    </div>
                </div>
            </header>

            <div
                id="site-nav-drawer"
                className={`site-nav-drawer ${menuOpen ? "site-nav-drawer--open" : ""}`}
                aria-hidden={!menuOpen}
            >
                <button
                    type="button"
                    className="site-nav-drawer-backdrop"
                    aria-label="Close navigation menu"
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={() => {
                        closeMenu();
                    }}
                />
                <div className="site-nav-drawer-panel" role="dialog" aria-label="Navigation">
                    <p className="site-nav-drawer-title">Menu</p>
                    <ul className="site-nav-drawer-links">
                        {SITE_ROUTES.map((item) => {
                            const active = pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`site-nav-drawer-link ${active ? "site-nav-drawer-link--active" : ""}`}
                                        aria-current={active ? "page" : undefined}
                                        onClick={() => {
                                            closeMenu();
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}
