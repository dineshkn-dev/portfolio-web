"use client";

import Link from "next/link";
import { useMotionUI } from "@/lib/motion-ui";
import { homeStats } from "@/lib/site-content";
import "./styles.css";

export default function HomeContent() {
    const { m, spring, staggerContainer, staggerItem, animateClass, motionInitial, motionAnimate } = useMotionUI();
    const Section = m.section;
    const P = m.p;
    const H1 = m.h1;
    const Div = m.div;
    const Article = m.article;

    return (
        <div className="home-container page-shell">
            <Section
                className={`hero-section ${animateClass}`}
                variants={staggerContainer(0.15, 0.1)}
                initial={motionInitial}
                animate={motionAnimate}
            >
                <P className="eyebrow" variants={staggerItem} transition={spring.soft}>Software Engineer</P>
                <H1 className="hero-name" variants={staggerItem} transition={spring.bouncy}>
                    Building resilient backend systems that scale under pressure.
                </H1>
                <P className="hero-subtitle" variants={staggerItem} transition={spring.soft}>
                    I design and ship API-first platforms with cloud-native architecture, observability, and delivery speed that teams can trust.
                </P>
                <Div className="hero-actions" variants={staggerItem} transition={spring.soft}>
                    <Link href="/projects" className="button button-primary">View Projects</Link>
                    <Link href="/contact" className="button button-ghost">Let&apos;s Connect</Link>
                </Div>

                <Div className="hero-stats" variants={staggerContainer(0.04, 0.06)}>
                    {homeStats.map((stat) => (
                        <Article key={stat.label} className="hero-stat" variants={staggerItem} transition={spring.soft}>
                            <strong>{stat.value}</strong>
                            <span>{stat.label}</span>
                        </Article>
                    ))}
                </Div>
            </Section>
        </div>
    );
}
