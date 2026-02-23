"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { spring, staggerContainer, staggerItem } from "@/lib/motion";
import { useKonami } from "@/hooks/useKonami";
import toast from "react-hot-toast";
import "./styles.css";

const FLAKE_COUNT = 160;
const ACCUM_SEGMENTS = 120;
const MAX_ACCUM_HEIGHT = 30;
const ACCUM_ADD_PER_HIT = 2.3;
const BLOW_CLEAR_RADIUS = 90;
const BLOW_CLEAR_RATE = 2;

function createFlake(canvasWidth, canvasHeight, speedMul = 1, sizeMul = 1) {
    const baseSpeed = (Math.random() * 1.5 + 0.5) * speedMul;
    const size = (Math.random() * 1.4 + 0.8) * sizeMul; // ~0.8px–2.2px
    const alpha = 0.35 + Math.random() * 0.4; // softer, varied opacity
    return {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        vx: 0,
        vy: baseSpeed,
        baseSpeed,
        size,
        alpha
    };
}

export default function HomeContent() {
    const canvasRef = useRef(null);
    const heroRef = useRef(null);
    const flakesRef = useRef([]);
    const cursorRef = useRef({ x: 0, y: 0 });
    const blowerRef = useRef(false);
    const accumulationRef = useRef({
        segments: new Float32Array(ACCUM_SEGMENTS),
        left: 0,
        top: 0,
        width: 0
    });
    const tagline = "One line of code at a time";
    const [typedText, setTypedText] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);
    const [showRest, setShowRest] = useState(false);
    const [snowBoost, setSnowBoost] = useState(false);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [blowerActive, setBlowerActive] = useState(false);

    useKonami(() => {
        setSnowBoost(true);
        toast.success("Blizzard mode!", { icon: "❄️" });
        setTimeout(() => setSnowBoost(false), 12000);
    });

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i <= tagline.length) {
                setTypedText(tagline.substring(0, i));
                i++;
            } else {
                clearInterval(interval);
                setShowRest(true);
            }
        }, 100);
        const cursorBlink = setInterval(() => setCursorVisible((p) => !p), 500);
        return () => {
            clearInterval(interval);
            clearInterval(cursorBlink);
        };
    }, []);

    const handleMouseMove = (e) => {
        const pos = { x: e.clientX, y: e.clientY };
        cursorRef.current = pos;
        setCursor(pos);
    };

    const handleMouseDown = () => {
        blowerRef.current = true;
        setBlowerActive(true);
    };

    const handleMouseUpOrLeave = () => {
        blowerRef.current = false;
        setBlowerActive(false);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let animationFrameId;
        const speedMul = snowBoost ? 1.8 : 1;
        const sizeMul = snowBoost ? 1.15 : 1;

        const initFlakes = () => {
            const w = (canvas.width = window.innerWidth);
            const h = (canvas.height = document.body.scrollHeight);
            flakesRef.current = Array.from({ length: FLAKE_COUNT }, () =>
                createFlake(w, h, speedMul, sizeMul)
            );
        };

        initFlakes();

        const handleResize = () => {
            initFlakes();
        };

        window.addEventListener("resize", handleResize);

        const animate = () => {
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            const flakes = flakesRef.current;
            const blowerOn = blowerRef.current;
            const cursorPos = cursorRef.current;
            const influenceRadius = snowBoost ? 230 : 170;
            const maxForce = snowBoost ? 1.1 : 0.85;
            const accum = accumulationRef.current;
            const heroRect = heroRef.current?.getBoundingClientRect();

            let innerLeft = 0;
            let innerRight = 0;
            let innerWidth = 0;

            if (heroRect) {
                const cornerOffset = 24; // approximate rounded corner radius
                innerLeft = heroRect.left + cornerOffset;
                innerRight = heroRect.right - cornerOffset;
                innerWidth = Math.max(0, innerRight - innerLeft);
            }

            if (heroRect && (accum.width !== innerWidth || accum.left !== innerLeft || accum.top !== heroRect.top)) {
                accum.left = innerLeft;
                accum.top = heroRect.top;
                accum.width = innerWidth;
                if (accum.segments.length !== ACCUM_SEGMENTS) {
                    accum.segments = new Float32Array(ACCUM_SEGMENTS);
                }
            }

            const segW = accum.width > 0 ? accum.width / ACCUM_SEGMENTS : 0;

            flakes.forEach((f) => {
                if (blowerOn) {
                    const dx = f.x - cursorPos.x;
                    const dy = f.y - cursorPos.y;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                    if (dist < influenceRadius) {
                        const strength = (1 - dist / influenceRadius) * maxForce;
                        const nx = dx / dist;
                        const ny = dy / dist;
                        f.vx += nx * strength * 2.8;
                        f.vy += ny * strength * 2.8;
                    }
                }

                f.vx += Math.sin(f.y * 0.015) * 0.01;
                f.vx *= 0.985;
                f.vy = f.vy * 0.985 + f.baseSpeed * 0.015;

                f.x += f.vx;
                f.y += f.vy;

                if (heroRect && accum.width > 0 && innerWidth > 0) {
                    const hitTop =
                        f.y + f.vy >= heroRect.top &&
                        f.y <= heroRect.top + 18 &&
                        f.x >= innerLeft &&
                        f.x <= innerRight;
                    if (hitTop) {
                        const segIdx = Math.floor(((f.x - innerLeft) / innerWidth) * ACCUM_SEGMENTS);
                        const idx = Math.max(0, Math.min(ACCUM_SEGMENTS - 1, segIdx));
                        accum.segments[idx] = Math.min(MAX_ACCUM_HEIGHT, accum.segments[idx] + ACCUM_ADD_PER_HIT);
                        f.y = -12;
                        f.x = Math.random() * w;
                        f.vx = 0;
                        const baseSpeed = (Math.random() * 1.5 + 0.5) * speedMul;
                        f.vy = baseSpeed;
                        f.baseSpeed = baseSpeed;
                        f.size = (Math.random() * 1.4 + 0.8) * sizeMul;
                        f.alpha = 0.35 + Math.random() * 0.4;
                    }
                }

                if (f.y > h + 24 || f.x < -24 || f.x > w + 24) {
                    const baseSpeed = (Math.random() * 1.5 + 0.5) * speedMul;
                    f.x = Math.random() * w;
                    f.y = -12;
                    f.vx = 0;
                    f.vy = baseSpeed;
                    f.baseSpeed = baseSpeed;
                    f.size = (Math.random() * 1.4 + 0.8) * sizeMul;
                    f.alpha = 0.35 + Math.random() * 0.4;
                }

                ctx.beginPath();
                ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${f.alpha})`;
                ctx.fill();
            });

            if (blowerOn && heroRect && cursorPos.y < heroRect.top + 100 && cursorPos.y > heroRect.top - 100) {
                for (let i = 0; i < ACCUM_SEGMENTS; i++) {
                    const segCenterX = accum.left + (i + 0.5) * segW;
                    const dist = Math.abs(cursorPos.x - segCenterX);
                    if (dist < BLOW_CLEAR_RADIUS) {
                        const factor = 1 - dist / BLOW_CLEAR_RADIUS;
                        accum.segments[i] = Math.max(0, accum.segments[i] - BLOW_CLEAR_RATE * factor);
                    }
                }
            }

            if (heroRect && segW > 0 && accum.width > 0) {
                const heights = accum.segments;
                const smoothed = new Float32Array(ACCUM_SEGMENTS);

                for (let i = 0; i < ACCUM_SEGMENTS; i++) {
                    const h0 = heights[i];
                    const hL = i > 0 ? heights[i - 1] : h0;
                    const hR = i < ACCUM_SEGMENTS - 1 ? heights[i + 1] : h0;
                    smoothed[i] = (hL + h0 + hR) / 3;
                }

                const grad = ctx.createLinearGradient(
                    0,
                    accum.top - MAX_ACCUM_HEIGHT - 8,
                    0,
                    accum.top
                );
                grad.addColorStop(0, "rgba(255,255,255,0.0)");
                grad.addColorStop(0.4, "rgba(255,255,255,0.7)");
                grad.addColorStop(1, "rgba(255,255,255,0.96)");
                ctx.fillStyle = grad;

                ctx.beginPath();
                ctx.moveTo(accum.left, accum.top);
                for (let i = 0; i < ACCUM_SEGMENTS; i++) {
                    const x = accum.left + i * segW;
                    const y = accum.top - smoothed[i];
                    ctx.lineTo(x, y);
                }
                ctx.lineTo(accum.left + accum.width, accum.top);
                ctx.closePath();
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [snowBoost]);

    return (
        <div
            className="home-container"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
        >
            <canvas
                ref={canvasRef}
                className="snowfall-background"
                aria-hidden="true"
            />

            <motion.section
                ref={heroRef}
                className="hero-section"
                variants={staggerContainer(0.15, 0.1)}
                initial="initial"
                animate="animate"
            >
                <motion.p className="hero-greeting" variants={staggerItem} transition={spring.soft}>
                    Hi, I&apos;m
                </motion.p>
                <motion.h1 className="hero-name" variants={staggerItem} transition={spring.bouncy}>
                    Dinesh K N
                </motion.h1>
                <motion.div className="hero-tagline-wrap" variants={staggerItem} transition={spring.soft}>
                    <p className="hero-tagline">
                        <span className="terminal-text">{typedText}</span>
                        <span className={`cursor ${cursorVisible ? "blink" : ""}`} aria-hidden="true" />
                    </p>
                </motion.div>
                {showRest && (
                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...spring.soft, delay: 0.2 }}
                    >
                        Backend · Cloud · JavaScript · Node.js
                    </motion.p>
                )}
                <motion.div
                    className="hero-game"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <span className="hero-game-hint">Press &amp; hold to blow the snow</span>
                </motion.div>
            </motion.section>

            <div
                className={`blower-pointer ${blowerActive ? "blower-pointer--active" : ""}`}
                style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
                aria-hidden="true"
            />
        </div>
    );
}
