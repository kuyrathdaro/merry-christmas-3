import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Bauble = ({ position, color, scale = 1 }: { position: [number, number, number], color: string, scale?: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const rotationSpeed = Math.random() * 0.5 + 0.2;

    useFrame(({ clock }) => {
        if (meshRef.current) {
            // Gentle swaying if needed, or just static hanging
            meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * rotationSpeed) * 0.1;
        }
    });

    return (
        <group position={position} scale={scale}>
            {/* The Ornament Sphere */}
            <mesh ref={meshRef} position={[0, -0.1, 0]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.15}
                    metalness={0.9}
                    envMapIntensity={1.5}
                />
            </mesh>

            {/* The Top Cap (Gold/Silver) */}
            <mesh position={[0, 0.02, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.05, 12]} />
                <meshStandardMaterial color="#C0C0C0" metalness={1.0} roughness={0.3} />
            </mesh>

            {/* The Ring Loop */}
            <mesh position={[0, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[0.015, 0.005, 8, 16]} />
                <meshStandardMaterial color="#C0C0C0" metalness={1.0} roughness={0.3} />
            </mesh>
        </group>
    );
};

export default Bauble;
