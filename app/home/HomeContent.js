"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { spring, staggerContainer, staggerItem } from "@/lib/motion";
import { homeStats } from "@/lib/site-content";
import "./styles.css";

export default function HomeContent() {
    return (
        <div className="home-container page-shell">
            <motion.section
                className="hero-section"
                variants={staggerContainer(0.15, 0.1)}
                initial="initial"
                animate="animate"
            >
                <motion.p className="eyebrow" variants={staggerItem} transition={spring.soft}>Software Engineer</motion.p>
                <motion.h1 className="hero-name" variants={staggerItem} transition={spring.bouncy}>
                    Building resilient backend systems that scale under pressure.
                </motion.h1>
                <motion.p className="hero-subtitle" variants={staggerItem} transition={spring.soft}>
                    I design and ship API-first platforms with cloud-native architecture, observability, and delivery speed that teams can trust.
                </motion.p>
                <motion.div
                    className="hero-actions"
                    variants={staggerItem}
                    transition={spring.soft}
                >
                    <Link href="/projects" className="button button-primary">View Projects</Link>
                    <Link href="/contact" className="button button-ghost">Let&apos;s Connect</Link>
                </motion.div>

                <motion.div className="hero-stats" variants={staggerContainer(0.04, 0.06)}>
                    {homeStats.map((stat) => (
                        <motion.article key={stat.label} className="hero-stat" variants={staggerItem} transition={spring.soft}>
                            <strong>{stat.value}</strong>
                            <span>{stat.label}</span>
                        </motion.article>
                    ))}
                </motion.div>
            </motion.section>
        </div>
    );
}
