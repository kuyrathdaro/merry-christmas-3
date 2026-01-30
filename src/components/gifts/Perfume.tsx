import type { JSX } from 'react'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type * as THREE from 'three'


import { RoundedBox } from '@react-three/drei'

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
                    metalness={0.1}
                    roughness={0}
                    transmission={1}
                    thickness={1}
                    ior={1.5}
                    transparent
                />
            </mesh>

            {/* Liquid inside - slightly smaller */}
            <mesh position={[0, -0.05, 0]}>
                <cylinderGeometry args={[0.18, 0.18, 0.35, 8]} />
                <meshStandardMaterial color="#ffccdd" roughness={0.1} />
            </mesh>

            {/* Neck */}
            <mesh position={[0, 0.28, 0]}>
                <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
                <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
            </mesh>

            {/* Cap */}
            <mesh position={[0, 0.4, 0]}>
                <RoundedBox args={[0.15, 0.15, 0.15]} radius={0.02} smoothness={4}>
                    <meshPhysicalMaterial
                        color="#ffffff"
                        metalness={0.1}
                        roughness={0.3}
                        transmission={0.5}
                        thickness={0.2}
                    />
                </RoundedBox>
            </mesh>

            {/* Label */}
            <mesh position={[0, 0, 0.21]}>
                <planeGeometry args={[0.25, 0.15]} />
                <meshStandardMaterial color="#fffbe6" />
            </mesh>
        </group>
    )
}
