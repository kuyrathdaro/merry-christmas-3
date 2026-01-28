import { useMemo } from 'react';
import * as THREE from 'three';
import BlinkingLight from './BlinkingLight';

const TreeLights = () => {
    // Function to get tree radius at a given height
    // Tree structure from ChristmasTree.tsx (each cone: height = scale * 1.5):
    // TreeNode at y=1.5, scale=2.2 (base radius=2.2, height=3.3, top at y=1.5+1.65=3.15)
    // TreeNode at y=2.5, scale=1.8 (base radius=1.8, height=2.7, top at y=2.5+1.35=3.85)
    // TreeNode at y=3.5, scale=1.4 (base radius=1.4, height=2.1, top at y=3.5+1.05=4.55)
    // TreeNode at y=4.3, scale=1.0 (base radius=1.0, height=1.5, top at y=4.3+0.75=5.05)
    const getTreeRadius = (height: number): number => {
        // Define all the cones
        const cones = [
            { centerY: 1.5, scale: 2.2, height: 2.2 * 1.5 },
            { centerY: 2.5, scale: 1.8, height: 1.8 * 1.5 },
            { centerY: 3.5, scale: 1.4, height: 1.4 * 1.5 },
            { centerY: 4.3, scale: 1.0, height: 1.0 * 1.5 },
        ];

        // Find the maximum radius among all cones at this height
        let maxRadius = 0;

        for (const cone of cones) {
            const baseY = cone.centerY - cone.height / 2;
            const topY = cone.centerY + cone.height / 2;

            // Check if height is within this cone's range
            if (height >= baseY && height <= topY) {
                const t = (height - baseY) / cone.height;
                const radius = cone.scale * (1 - t);
                maxRadius = Math.max(maxRadius, radius);
            }
        }

        return maxRadius > 0 ? maxRadius : 0.5; // Fallback to small radius
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

        // Create LOTS of lights in spiral patterns around the tree for full decoration
        const spirals = 6; // Balanced coverage
        const lightsPerSpiral = 8; // Good distribution

        for (let spiral = 0; spiral < spirals; spiral++) {
            const spiralOffset = (spiral / spirals) * Math.PI * 2;

            for (let i = 0; i < lightsPerSpiral; i++) {
                const progress = i / (lightsPerSpiral - 1);
                const h = 0.8 + progress * 3.7; // height from 0.8 to 4.5 (better spread, avoid star)

                // Get actual tree radius at this height
                const treeRadius = getTreeRadius(h);

                // Place lights close to tree surface
                const r = treeRadius * 1.05; // Just slightly outside tree surface

                // Spiral angle - rotates as we go up
                const angle = spiralOffset + progress * Math.PI * 3.5;

                const x = Math.cos(angle) * r;
                const z = Math.sin(angle) * r;

                // Calculate rotation to point downward
                const tiltOutward = Math.atan2(x, z);
                const hangAngle = Math.PI; // point downward

                // Alternate colors in a pleasing pattern
                const colorIndex = (spiral * 3 + i) % colors.length;
                const color = colors[colorIndex];

                items.push({
                    pos: [x, h, z], // Position directly on tree surface
                    color,
                    rotation: [hangAngle, tiltOutward, 0]
                });
            }
        }

        // Add additional random scattered lights for even better coverage
        const randomLights = 30;
        for (let i = 0; i < randomLights; i++) {
            const h = 0.5 + Math.random() * 4.0; // Random height from 0.5 to 4.5
            const treeRadius = getTreeRadius(h);
            const r = treeRadius * (1.05 + Math.random() * 0.1); // Random distance 1.05x to 1.15x
            const angle = Math.random() * Math.PI * 2; // Random angle around tree

            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;

            const tiltOutward = Math.atan2(x, z);
            const hangAngle = Math.PI;

            const colorIndex = Math.floor(Math.random() * colors.length);
            const color = colors[colorIndex];

            items.push({
                pos: [x, h, z],
                color,
                rotation: [hangAngle, tiltOutward, 0]
            });
        }

        return items;
    }, []);

    // Create wire segments connecting lights at their screw bases
    const wires = useMemo(() => {
        const wireSegments = [];
        const lightsPerSpiral = 8;
        const screwBaseOffset = -0.22; // Offset to top of screw base where wire attaches

        for (let spiral = 0; spiral < 6; spiral++) {
            const spiralStart = spiral * lightsPerSpiral;
            const spiralEnd = Math.min(spiralStart + lightsPerSpiral, lights.length);

            // Create wire segments between consecutive lights in this spiral
            for (let i = spiralStart; i < spiralEnd - 1; i++) {
                const light1 = lights[i];
                const light2 = lights[i + 1];

                const points = [];

                // Start point: screw base of first light
                points.push(new THREE.Vector3(
                    light1.pos[0],
                    light1.pos[1] + screwBaseOffset,
                    light1.pos[2]
                ));

                // Add intermediate points for smooth curve
                const steps = 8;
                for (let s = 1; s < steps; s++) {
                    const t = s / steps;
                    const x = light1.pos[0] + (light2.pos[0] - light1.pos[0]) * t;
                    const y = light1.pos[1] + screwBaseOffset + (light2.pos[1] - light1.pos[1]) * t;
                    const z = light1.pos[2] + (light2.pos[2] - light1.pos[2]) * t;

                    // Add slight sag to wire for realism
                    const sag = Math.sin(t * Math.PI) * -0.05;
                    points.push(new THREE.Vector3(x, y + sag, z));
                }

                // End point: screw base of second light
                points.push(new THREE.Vector3(
                    light2.pos[0],
                    light2.pos[1] + screwBaseOffset,
                    light2.pos[2]
                ));

                const curve = new THREE.CatmullRomCurve3(points);
                wireSegments.push(curve);
            }
        }

        return wireSegments;
    }, [lights]);

    return (
        <group>
            {/* Draw wires connecting lights at their screw bases */}
            {wires.map((curve, i) => (
                <mesh key={`wire-${i}`}>
                    <tubeGeometry args={[curve, 12, 0.012, 6, false]} />
                    <meshStandardMaterial
                        color="#1a3a1a"
                        roughness={0.8}
                        metalness={0.1}
                    />
                </mesh>
            ))}

            {/* Draw the lights */}
            {lights.map((light, i) => (
                <BlinkingLight
                    key={`light-${i}`}
                    position={light.pos}
                    color={light.color}
                    rotation={light.rotation}
                />
            ))}
        </group>
    );
};

export default TreeLights;
