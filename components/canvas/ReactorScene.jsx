"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Grid } from "@react-three/drei";
import { useJarvis } from "@/components/jarvis/JarvisProvider";

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

const PARTICLE_POSITIONS = buildParticlePositions(600);

function ParticleField() {
    const ref = useRef();
    const positions = PARTICLE_POSITIONS;

    useFrame((state) => {
        if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#58d2ff"
                size={0.028}
                sizeAttenuation
                depthWrite={false}
                opacity={0.28}
            />
        </Points>
    );
}

function SceneContent() {
    const group = useRef();

    useFrame((state) => {
        if (!group.current) return;
        const { pointer } = state;
        group.current.rotation.y = pointer.x * 0.12;
        group.current.rotation.x = pointer.y * 0.08;
    });

    return (
        <group ref={group}>
            <ambientLight intensity={0.25} />
            <Grid
                infiniteGrid
                fadeDistance={32}
                fadeStrength={1.4}
                cellSize={0.75}
                sectionSize={3.5}
                cellColor="#142a3d"
                sectionColor="#2a5570"
            />
            <ParticleField />
        </group>
    );
}

export default function ReactorScene() {
    const { use3D } = useJarvis();

    if (!use3D) {
        return (
            <>
                <div className="jarvis-css-reactor" aria-hidden="true" />
                <div className="jarvis-ambient-glow" aria-hidden="true" />
            </>
        );
    }

    return (
        <>
            <div className="jarvis-ambient-glow" aria-hidden="true" />
            <div className="jarvis-canvas-layer" aria-hidden="true">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                <SceneContent />
            </Canvas>
            </div>
        </>
    );
}
