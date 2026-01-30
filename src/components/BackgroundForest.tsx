import { useMemo } from 'react';
import { Instances, Instance } from '@react-three/drei';

const BackgroundForest = () => {
    const pseudo = (n: number) => Math.abs(Math.sin(n) * 10000) % 1;
    const trees = useMemo(() => {
        const items: Array<{ pos: [number, number, number]; scale: number }> = [];
        for (let i = 0; i < 30; i++) {
            const angle = pseudo(i + 1) * Math.PI * 2;
            const r = 15 + pseudo(i + 11) * 20;
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            const s = 0.8 + pseudo(i + 31) * 0.8;
            items.push({ pos: [x, -2, z], scale: s });
        }
        return items;
    }, []);

    return (
        <group>
            {/* Trunk Instances */}
            <Instances range={30}>
                <cylinderGeometry args={[0.4, 0.6, 1.5, 6]} />
                <meshStandardMaterial color="#2e1005" flatShading />
                {trees.map((t, i) => (
                    <Instance key={`trunk-${i}`} position={[t.pos[0], t.pos[1] + 0.5 * t.scale, t.pos[2]]} scale={t.scale} />
                ))}
            </Instances>

            {/* Bottom Cone Instances */}
            <Instances range={30}>
                <coneGeometry args={[2.2, 3.3, 6]} />
                <meshStandardMaterial color="#0f4c25" flatShading />
                {trees.map((t, i) => (
                    <Instance key={`cone1-${i}`} position={[t.pos[0], t.pos[1] + 1.5 * t.scale, t.pos[2]]} scale={t.scale} />
                ))}
            </Instances>

            {/* Top Cone Instances */}
            <Instances range={30}>
                <coneGeometry args={[1.5, 2.5, 6]} />
                <meshStandardMaterial color="#14532d" flatShading />
                {trees.map((t, i) => (
                    <Instance key={`cone2-${i}`} position={[t.pos[0], t.pos[1] + 3.5 * t.scale, t.pos[2]]} scale={t.scale} />
                ))}
            </Instances>
        </group>
    );
};

export default BackgroundForest;
