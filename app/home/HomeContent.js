"use client";
import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function HomeContent() {
    const canvasRef = useRef(null);
    const text = "One line of code at a time";
    const [typedText, setTypedText] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);
    const [showSubtitle, setShowSubtitle] = useState(false);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i <= text.length) {
                setTypedText(text.substring(0, i));
                i++;
            } else {
                clearInterval(interval);
                setShowSubtitle(true);
            }
        }, 100);

        const cursorBlink = setInterval(() => {
            setCursorVisible((prev) => !prev);
        }, 500);

        return () => {
            clearInterval(interval);
            clearInterval(cursorBlink);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = document.body.scrollHeight;
        };

        resizeCanvas();

        const snowflakes = Array.from({ length: 100 }).map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 4 + 2,
            speed: Math.random() * 1.5 + 0.5
        }));

        const animateSnow = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";

            snowflakes.forEach((flake) => {
                flake.y += flake.speed;
                flake.x += Math.sin(flake.y * 0.02) * 0.5;

                if (flake.y > canvas.height) {
                    flake.y = 0;
                    flake.x = Math.random() * canvas.width;
                }

                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animateSnow);
        };

        animateSnow();

        window.addEventListener("resize", resizeCanvas);
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="home-container">
            <canvas
                ref={canvasRef}
                className="snowfall-background"></canvas>

            <h1 className="hero-title">
                <span className="terminal-text">{typedText}</span>
                <span
                    className={`cursor ${
                        cursorVisible ? "blink" : ""
                    }`}></span>
            </h1>

            <div className="subtitle-container">
                {showSubtitle && (
                    <p className="hero-subtitle">
                        Backend | Cloud | JavaScript | Node.js
                    </p>
                )}
            </div>
        </div>
    );
}
