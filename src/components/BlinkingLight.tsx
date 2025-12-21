import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const hexToRgb = (hex: string) => {
    const h = hex.replace('#', '');
    const num = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
};

const BlinkingLight = ({ position, color }: { position: [number, number, number]; color: string }) => {
    const bulbRef = useRef<THREE.Mesh>(null);
    const spriteRef = useRef<THREE.Sprite>(null);

    // create a soft radial glow texture using a canvas
    const glowMap = useMemo(() => {
        const size = 128;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d')!;
        const { r, g, b } = hexToRgb(color || '#ffffff');
        const grd = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        grd.addColorStop(0, `rgba(${r},${g},${b},1)`);
        grd.addColorStop(0.2, `rgba(${r},${g},${b},0.7)`);
        grd.addColorStop(0.45, `rgba(${r},${g},${b},0.25)`);
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, size, size);
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        return tex;
    }, [color]);

    // use a per-light phase so nearby lights don't all blink in sync
    const phase = useMemo(() => (Math.abs(Math.sin(position[0] * 12.9898 + position[2] * 78.233)) * 43758.5453) % 10, [position]);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        const base = 0.8;
        const flicker = base + Math.sin(t * 6 + phase) * 0.12 + Math.sin(t * 12 + phase * 1.3) * 0.05;

        if (bulbRef.current) {
            // subtle breathing + flicker
            const s = 0.9 + flicker * 0.2;
            bulbRef.current.scale.setScalar(s * 0.15);
            const mat = bulbRef.current.material as THREE.MeshPhysicalMaterial;
            if (mat) {
                mat.emissiveIntensity = Math.max(0.6, flicker * 1.6);
                mat.clearcoat = 0.6;
                mat.transmission = 0.6;
            }
        }

        if (spriteRef.current) {
            const spMat = spriteRef.current.material as THREE.SpriteMaterial;
            if (spMat) {
                spMat.opacity = Math.min(0.85, 0.45 + flicker * 0.45);
            }
            // slightly vary sprite scale for depth
            const g = 0.45 + flicker * 0.45;
            spriteRef.current.scale.set(g, g, 1);
        }
    });

    return (
        <group position={position}>
            {/* glass bulb */}
            <mesh ref={bulbRef} position={[0, 0, 0]} castShadow>
                <sphereGeometry args={[0.12, 16, 12]} />
                <meshPhysicalMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={1}
                    roughness={0.1}
                    metalness={0}
                    transmission={0.6}
                    transparent
                    opacity={0.95}
                    reflectivity={0.5}
                />
            </mesh>

            {/* small metal cap */}
            <mesh position={[0, -0.08, 0]}> 
                <cylinderGeometry args={[0.06, 0.05, 0.05, 8]} />
                <meshStandardMaterial color="#4b5563" metalness={1} roughness={0.35} />
            </mesh>

            {/* soft additive glow */}
            <sprite ref={spriteRef} position={[0, 0, 0]}>
                <spriteMaterial map={glowMap} color={color} blending={THREE.AdditiveBlending} transparent />
            </sprite>

            {/* connector is rendered by parent (TreeLights) to ensure proper world alignment */}
        </group>
    );
};

export default BlinkingLight;
