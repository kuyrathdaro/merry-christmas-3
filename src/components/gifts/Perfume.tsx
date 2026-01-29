import type { JSX } from 'react'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type * as THREE from 'three'

export const Perfume = (): JSX.Element => {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
        }
    })

    return (
        <group ref={groupRef}>
            {/* Glass Bottle */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.5, 8]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    metalness={0}
                    roughness={0}
                    transmission={0.95}
                    thickness={0.5}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Liquid inside */}
            <mesh position={[0, -0.05, 0]}>
                <cylinderGeometry args={[0.18, 0.18, 0.35, 8]} />
                <meshStandardMaterial color="#ffccdd" roughness={0.1} />
            </mesh>

            {/* Neck */}
            <mesh position={[0, 0.28, 0]}>
                <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
                <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />
            </mesh>

            {/* Cap */}
            <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[0.15, 0.15, 0.15]} />
                <meshStandardMaterial
                    color="#ffffff"
                    metalness={0.1}
                    roughness={0.3}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Label */}
            <mesh position={[0, 0, 0.21]}>
                <planeGeometry args={[0.25, 0.15]} />
                <meshStandardMaterial color="#fffbe6" />
            </mesh>
        </group>
    )
}
