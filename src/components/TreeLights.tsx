import { useMemo } from 'react';
import Bauble from './Bauble';
import FairyLight from './FairyLight';

const TreeLights = () => {
    // Function to get tree radius at a given height (same as before)
    const getTreeRadius = (height: number): number => {
        const cones = [
            { centerY: 1.5, scale: 2.2, height: 2.2 * 1.5 },
            { centerY: 2.5, scale: 1.8, height: 1.8 * 1.5 },
            { centerY: 3.5, scale: 1.4, height: 1.4 * 1.5 },
            { centerY: 4.3, scale: 1.0, height: 1.0 * 1.5 },
        ];
        let maxRadius = 0;
        for (const cone of cones) {
            const baseY = cone.centerY - cone.height / 2;
            const topY = cone.centerY + cone.height / 2;
            if (height >= baseY && height <= topY) {
                const t = (height - baseY) / cone.height;
                const radius = cone.scale * (1 - t);
                maxRadius = Math.max(maxRadius, radius);
            }
        }
        return maxRadius > 0 ? maxRadius : 0.5;
    };

    // ================= BAUBLES (Ornaments) =================
    const baubles = useMemo(() => {
        const items = [];
        const colors = ['#D4AF37', '#C0C0C0', '#d32f2f', '#1976d2', '#388e3c']; // Gold, Silver, Red, Blue, Green
        const count = 45; // Number of baubles

        for (let i = 0; i < count; i++) {
            // Random height between bottom and near top
            const h = 0.6 + Math.random() * 3.8;
            const radius = getTreeRadius(h);
            const r = radius * 0.9; // Slightly EMBEDDED in the leaves looks more natural than floating outside
            const angle = Math.random() * Math.PI * 2;

            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;

            items.push({
                pos: [x, h, z] as [number, number, number],
                color: colors[Math.floor(Math.random() * colors.length)],
                scale: 0.8 + Math.random() * 0.4
            });
        }
        return items;
    }, []);

    // ================= FAIRY LIGHTS =================
    const fairyLights = useMemo(() => {
        const items = [];
        const colors = ['#ffeb3b', '#ff9800', '#ff5722', '#00bcd4', '#e91e63']; // Warm & Colorful

        // Spiral pattern for lights looks best
        const spirals = 8;
        const lightsPerSpiral = 15;

        for (let s = 0; s < spirals; s++) {
            const yStart = 0.5;
            const yEnd = 4.5;
            const angleOffset = (s / spirals) * Math.PI * 2;

            for (let i = 0; i < lightsPerSpiral; i++) {
                const t = i / (lightsPerSpiral - 1);
                const h = yStart + t * (yEnd - yStart);

                // Add some randomness to height for natural look
                const hFinal = h + (Math.random() - 0.5) * 0.1;

                const radius = getTreeRadius(hFinal);
                const r = radius * 1.02; // Just on surface

                // Twist logic
                const angle = angleOffset + t * Math.PI * 4; // 2 full turns

                const x = Math.cos(angle) * r;
                const z = Math.sin(angle) * r;

                items.push({
                    pos: [x, hFinal, z] as [number, number, number],
                    color: colors[(s + i) % colors.length],
                    blinkOffset: Math.random() * 10
                });
            }
        }
        return items;
    }, []);

    return (
        <group>
            {baubles.map((b, i) => (
                <Bauble key={`bauble-${i}`} position={b.pos} color={b.color} scale={b.scale} />
            ))}
            {fairyLights.map((l, i) => (
                <FairyLight key={`light-${i}`} position={l.pos} color={l.color} blinkOffset={l.blinkOffset} />
            ))}
        </group>
    );
};

export default TreeLights;
