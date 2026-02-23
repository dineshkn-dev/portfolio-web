"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function TiltCard({ children, className = "" }) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, (v) => `${v}deg`);
    const rotateY = useTransform(x, (v) => `${v}deg`);

    const handleMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const maxRotate = 8;
        const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -maxRotate;
        const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * maxRotate;
        x.set(rotateYValue);
        y.set(rotateXValue);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            <div className="h-full min-h-full" style={{ transform: "translateZ(20px)" }}>{children}</div>
        </motion.div>
    );
}
