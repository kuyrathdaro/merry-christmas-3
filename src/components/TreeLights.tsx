import { useMemo } from 'react';
import BlinkingLight from './BlinkingLight';

const TreeLights = () => {
    // Function to get tree radius at a given height
    const getTreeRadius = (height: number): number => {
        // Tree structure from ChristmasTree.tsx:
        // TreeNode at y=1.5, scale=2.2 (radius=2.2, height=3.3, top at y=4.8)
        // TreeNode at y=2.5, scale=1.8 (radius=1.8, height=2.7, top at y=5.2)
        // TreeNode at y=3.5, scale=1.4 (radius=1.4, height=2.1, top at y=5.6)
        // TreeNode at y=4.3, scale=1.0 (radius=1.0, height=1.5, top at y=5.8)

        if (height <= 1.5) return 2.2; // Bottom section
        if (height <= 2.5) {
            // Interpolate in bottom cone (y=1.5 to 4.8)
            const t = (height - 1.5) / (4.8 - 1.5);
            return 2.2 * (1 - t);
        }
        if (height <= 3.5) {
            // Interpolate in second cone (y=2.5 to 5.2)
            const t = (height - 2.5) / (5.2 - 2.5);
            return 1.8 * (1 - t);
        }
        if (height <= 4.3) {
            // Interpolate in third cone (y=3.5 to 5.6)
            const t = (height - 3.5) / (5.6 - 3.5);
            return 1.4 * (1 - t);
        }
        // Top cone (y=4.3 to 5.8)
        const t = (height - 4.3) / (5.8 - 4.3);
        return 1.0 * (1 - t);
    };

    const lights = useMemo(() => {
        const items = [] as Array<{ pos: [number, number, number]; color: string; rotation: [number, number, number] }>;
        // Rich, vibrant Christmas light colors
        const colors = [
            '#ff1744', // bright red
            '#ff6f00', // vivid orange
            '#ffd600', // golden yellow
            '#00e676', // bright green
            '#00e5ff', // cyan
            '#2979ff', // vivid blue
            '#d500f9', // purple
            '#ff4081', // pink
        ];

        // Create lights in a beautiful spiral pattern around the tree
        const spirals = 5;
        const lightsPerSpiral = 8;

        for (let spiral = 0; spiral < spirals; spiral++) {
            const spiralOffset = (spiral / spirals) * Math.PI * 2;

            for (let i = 0; i < lightsPerSpiral; i++) {
                const progress = i / (lightsPerSpiral - 1);
                const h = 1.8 + progress * 3.5; // height from 1.8 to 5.3

                // Get actual tree radius at this height and push INTO the tree
                const treeRadius = getTreeRadius(h);
                const r = treeRadius * 1.05; // 105% to push into tree surface

                // Spiral angle - rotates as we go up
                const angle = spiralOffset + progress * Math.PI * 5;

                const x = Math.cos(angle) * r;
                const z = Math.sin(angle) * r;

                // Calculate rotation to point downward and slightly outward
                const tiltOutward = Math.atan2(x, z);
                const hangAngle = Math.PI; // point downward

                // Alternate colors in a pleasing pattern
                const colorIndex = (spiral * 3 + i) % colors.length;
                const color = colors[colorIndex];

                items.push({
                    pos: [x, h, z],
                    color,
                    rotation: [hangAngle, tiltOutward, 0]
                });
            }
        }

        return items;
    }, []);

    return (
        <group>
            {lights.map((light, i) => (
                <BlinkingLight
                    key={i}
                    position={light.pos}
                    color={light.color}
                    rotation={light.rotation}
                />
            ))}
        </group>
    );
};

export default TreeLights;
