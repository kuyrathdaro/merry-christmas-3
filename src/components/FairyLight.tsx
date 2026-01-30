import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FairyLight = ({ position, color, blinkOffset = 0 }: { position: [number, number, number], color: string, blinkOffset?: number }) => {
    // lightRef remove
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        // Twinkle effect
        const intensity = 0.8 + Math.sin(t * 3 + blinkOffset) * 0.4 + Math.sin(t * 10) * 0.1;

        if (meshRef.current) {
            (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity * 1.5;
        }
    });


    return (
        <group position={position}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={1}
                    toneMapped={false}
                />
            </mesh>
            {/* pointLight removed for performance - too many lights caused lag */}

        </group>
    );
};

export default FairyLight;
