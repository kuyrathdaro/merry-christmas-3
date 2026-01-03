import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const hexToRgb = (hex: string) => {
    const h = hex.replace('#', '');
    const num = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
};

interface BlinkingLightProps {
    position: [number, number, number];
    color: string;
    rotation?: [number, number, number];
}

const BlinkingLight = ({ position, color, rotation = [0, 0, 0] }: BlinkingLightProps) => {
    const bulbRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Sprite>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    // Create a realistic bulb shape using lathe geometry
    const bulbGeometry = useMemo(() => {
        const points: THREE.Vector2[] = [];
        // Create a classic C9 bulb profile
        const segments = 12;
        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            let x, y;

            if (t < 0.15) {
                // Narrow neck at base
                x = 0.015 + t * 0.1;
                y = -0.08 + t * 0.3;
            } else if (t < 0.85) {
                // Main bulb body - wider middle
                const angle = (t - 0.15) * Math.PI;
                x = 0.035 + Math.sin(angle) * 0.025;
                y = -0.035 + (t - 0.15) * 0.18;
            } else {
                // Tapered top
                const tt = (t - 0.85) / 0.15;
                x = 0.035 * (1 - tt * 0.7);
                y = 0.09 + tt * 0.02;
            }

            points.push(new THREE.Vector2(x, y));
        }
        return new THREE.LatheGeometry(points, 16);
    }, []);

    // create a soft radial glow texture
    const glowMap = useMemo(() => {
        const size = 256;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;
        const { r, g, b } = hexToRgb(color || '#ffffff');
        const grd = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        grd.addColorStop(0, `rgba(${r},${g},${b},1)`);
        grd.addColorStop(0.3, `rgba(${r},${g},${b},0.7)`);
        grd.addColorStop(0.6, `rgba(${r},${g},${b},0.3)`);
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, size, size);
        return new THREE.CanvasTexture(canvas);
    }, [color]);

    // unique phase for each light
    const phase = useMemo(() =>
        (Math.abs(Math.sin(position[0] * 12.9898 + position[2] * 78.233)) * 43758.5453) % 10,
        [position]
    );

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        const flicker = 0.85 + Math.sin(t * 5 + phase) * 0.1 + Math.sin(t * 11 + phase * 1.3) * 0.05;

        if (bulbRef.current) {
            const mat = bulbRef.current.material as THREE.MeshPhysicalMaterial;
            if (mat) {
                mat.emissiveIntensity = Math.max(0.8, flicker * 1.5);
            }
        }

        if (glowRef.current) {
            const spMat = glowRef.current.material as THREE.SpriteMaterial;
            if (spMat) {
                spMat.opacity = Math.min(0.9, 0.5 + flicker * 0.4);
            }
        }

        if (lightRef.current) {
            lightRef.current.intensity = 1.2 + flicker * 0.5;
        }
    });

    return (
        <group position={position} rotation={rotation}>
            {/* Beautiful glass bulb with realistic shape */}
            <mesh ref={bulbRef} geometry={bulbGeometry} castShadow>
                <meshPhysicalMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={1.2}
                    roughness={0.05}
                    metalness={0}
                    transmission={0.75}
                    thickness={0.3}
                    transparent
                    opacity={0.95}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    ior={1.5}
                    envMapIntensity={0.8}
                />
            </mesh>

            {/* Small ceramic/metal base */}
            <mesh position={[0, -0.09, 0]}>
                <cylinderGeometry args={[0.022, 0.02, 0.02, 12]} />
                <meshStandardMaterial
                    color="#e8e8e8"
                    roughness={0.3}
                    metalness={0.2}
                />
            </mesh>

            {/* Metal screw threads */}
            <mesh position={[0, -0.105, 0]}>
                <cylinderGeometry args={[0.02, 0.018, 0.03, 12]} />
                <meshStandardMaterial
                    color="#c9b037"
                    metalness={0.9}
                    roughness={0.25}
                />
            </mesh>

            {/* Soft glow effect */}
            <sprite ref={glowRef} position={[0, 0, 0]} scale={[0.3, 0.3, 1]}>
                <spriteMaterial
                    map={glowMap}
                    color={color}
                    blending={THREE.AdditiveBlending}
                    transparent
                    depthWrite={false}
                />
            </sprite>

            {/* Point light */}
            <pointLight
                ref={lightRef}
                color={color}
                intensity={1.5}
                distance={1.2}
                decay={2}
            />
        </group>
    );
};

export default BlinkingLight;
