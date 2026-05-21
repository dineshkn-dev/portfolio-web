"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function pseudoRandom(seed) {
    const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
    return x - Math.floor(x);
}

function buildParticlePositions(count) {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = 4 + pseudoRandom(i) * 6;
        const theta = pseudoRandom(i + 1000) * Math.PI * 2;
        const phi = Math.acos(2 * pseudoRandom(i + 2000) - 1);
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
}

const PARTICLE_POSITIONS = buildParticlePositions(180);

function SceneContent() {
    const group = useRef();
    const particles = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime * 0.02;
        if (particles.current) particles.current.rotation.y = t;
        if (group.current) {
            group.current.rotation.y = state.pointer.x * 0.08;
            group.current.rotation.x = state.pointer.y * 0.05;
        }
    });

    return (
        <group ref={group}>
            <ambientLight intensity={0.2} />
            <Points ref={particles} positions={PARTICLE_POSITIONS} stride={3} frustumCulled>
                <PointMaterial
                    transparent
                    color="#58d2ff"
                    size={0.03}
                    sizeAttenuation
                    depthWrite={false}
                    opacity={0.22}
                />
            </Points>
        </group>
    );
}

export default function ReactorCanvas() {
    const [active, setActive] = useState(true);

    useEffect(() => {
        const onVis = () => setActive(!document.hidden);
        document.addEventListener("visibilitychange", onVis);
        return () => document.removeEventListener("visibilitychange", onVis);
    }, []);

    return (
        <div className="jarvis-canvas-layer" aria-hidden="true">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 50 }}
                dpr={[1, 1.25]}
                frameloop={active ? "always" : "never"}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "low-power",
                }}
                style={{ background: "transparent" }}
            >
                <SceneContent />
            </Canvas>
        </div>
    );
}
