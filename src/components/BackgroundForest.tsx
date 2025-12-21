import { useMemo } from 'react';
import BackgroundTree from './BackgroundTree';

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
            {trees.map((t, i) => (
                <BackgroundTree key={i} position={t.pos} scale={t.scale} />
            ))}
        </group>
    );
};

export default BackgroundForest;
