import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useState, useMemo } from 'react';
import Santa from './components/Santa';
// import GreetingCard from './GreetingCard';
import BackgroundForest from './components/BackgroundForest';
import ChristmasTree from './components/ChristmasTree';
import GiftBox from './components/GiftBox';
import SnowScene from './components/SnowScene';

const ChristmasScene = () => {
    const [openGiftId, setOpenGiftId] = useState<string | null>(null);

    // generate exactly 6 gifts evenly spaced, close to tree, with varied colors and main larger
    const gifts = useMemo(() => {
        type GiftSpec = { id: string; angle: number; radius?: number; color: string; ribbon: string; scale?: number; interactive?: boolean };
        const main: GiftSpec = { id: 'main', angle: -0.25, radius: 2.5, color: '#dc2626', ribbon: '#fbbf24', scale: 1.4, interactive: true };
        // decorative gifts, spaced around the tree
        const others: GiftSpec[] = [
            { id: 'g1', angle: 0.2, color: '#1e40af', ribbon: '#93c5fd', scale: 1.8 },
            { id: 'g2', angle: 1.0, color: '#065f46', ribbon: '#6ee7b7', scale: 1.8 },
            { id: 'g3', angle: 2.0, color: '#7c3aed', ribbon: '#c4b5fd', scale: 1.8 },
            { id: 'g4', angle: -1.0, color: '#f97316', ribbon: '#ec906b', scale: 1.8 },
            { id: 'g5', angle: -2.0, color: '#06b6d4', ribbon: '#7dd3fc', scale: 1.8 },
            { id: 'g6', angle: -3.0, color: '#eae2e2', ribbon: '#ffffffff', scale: 1.8 },
        ];

        const all = ([main, ...others] as GiftSpec[]).map((r) => {
            const radius = r.radius ?? 2.0;
            const baseOffset = (r.scale ?? 0.8) * 0.25;
            // Minimum radius from tree to avoid intersecting canopy/trunk (lowered to reduce empty gap)
            const treeMinRadius = 2;
            const minFromTree = treeMinRadius + (r.scale ?? 0.8) * 0.5;
            const desired = Math.max(radius + baseOffset, minFromTree);
            const pos = [Math.cos(r.angle) * desired, -2, Math.sin(r.angle) * desired] as [number, number, number];
            return { id: r.id, position: pos, color: r.color, ribbon: r.ribbon, scale: r.scale ?? 0.8, interactive: !!r.interactive };
        });

        // place main first, then try to place decorative gifts by nudging them outward
        const accepted: typeof all = [];
        accepted.push(all[0]); // main first
        const minSpacing = 1.15;

        for (let i = 1; i < all.length; i++) {
            const it = all[i];
            // original angle/radius
            const angle = Math.atan2(it.position[2], it.position[0]);
            let radius = Math.sqrt(it.position[0] * it.position[0] + it.position[2] * it.position[2]);
            let placed = false;

            // try nudging outward up to 6 times
            for (let attempt = 0; attempt < 6 && !placed; attempt++) {
                const pos = [Math.cos(angle) * radius, -2, Math.sin(angle) * radius] as [number, number, number];
                let collides = false;
                for (const ac of accepted) {
                    const dx = pos[0] - ac.position[0];
                    const dz = pos[2] - ac.position[2];
                    const dist = Math.sqrt(dx * dx + dz * dz);
                    if (dist < minSpacing) { collides = true; break; }
                }
                if (!collides) {
                    accepted.push({ ...it, position: pos });
                    placed = true;
                } else {
                    radius += 0.25; // nudge outward and retry
                }
            }
            // if not placed after attempts, skip this gift
        }

        return accepted;
    }, []);

    const handleBoxClick = (id?: string) => {
        if (!id) return;
        // Only the 'main' gift can be opened/unwrapped. Non-main gifts are decorative.
        if (id !== 'main') return;
        if (openGiftId === id) {
            setOpenGiftId(null);
        } else {
            setOpenGiftId(id);
        }
    };

    return (
        <div style={{ width: '100vw', height: '100vh', touchAction: 'none' }}>
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 5, 12], fov: 50 }}>
                <color attach="background" args={['#0f172a']} />

                {/* Lighting */}
                <ambientLight intensity={0.8} />
                <spotLight position={[10, 20, 10]} angle={0.5} penumbra={1} intensity={4} castShadow shadow-mapSize={[1024, 1024]} />
                <pointLight position={[-10, 5, -10]} intensity={2} color="#60a5fa" />
                <directionalLight position={[0, 10, 5]} intensity={1.5} color="#ffd700" />

                {/* Environment */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <SnowScene />
                <fog attach="fog" args={['#0f172a', 5, 30]} />

                {/* Ground */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="#f1f5f9" roughness={0.8} />
                </mesh>

                {/* Scene Content */}
                <BackgroundForest />
                <ChristmasTree />
                <Santa />

                {/* Gifts generated around tree - only one `openGiftId` at a time */}
                {gifts.map(g => (
                    <GiftBox
                        key={g.id}
                        position={g.position}
                        color={g.color}
                        ribbonColor={g.ribbon}
                        isOpen={openGiftId === g.id}
                        onClick={() => handleBoxClick(g.id)}
                    />
                ))}

                {/* removed in-canvas GiftCard (now rendered as DOM overlay) */}

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2.2}
                    autoRotate
                    autoRotateSpeed={0.8}
                />
            </Canvas>

            {/* DOM overlay: Greeting card popup */}
            {/* <GreetingCard open={openGiftId === 'main'} onClose={() => setOpenGiftId(null)} /> */}

        </div>
    );
};

export default ChristmasScene;
