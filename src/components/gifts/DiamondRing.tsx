import type { JSX } from 'react'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import type * as THREE from 'three'

export const DiamondRing = (): JSX.Element => {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (groupRef.current) {
            // Slow elegant rotation
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
        }
    })

    const diamondMaterial = (
        <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.0}
            roughness={0}
            transmission={1.0}
            ior={2.4}
            thickness={1.5} // Thicker for more refraction
            attenuationColor="#ffffff"
            attenuationDistance={1}
            clearcoat={1}
            flatShading
        />
    )

    return (
        <group ref={groupRef}>
            {/* Gold Band - Thinner and upright */}
            <mesh>
                <torusGeometry args={[0.12, 0.02, 16, 64]} />
                <meshStandardMaterial
                    color="#FFD700"
                    metalness={1}
                    roughness={0.15}
                    envMapIntensity={1.5}
                />
            </mesh>

            {/* The Setting (Prongs) - On top of the ring */}
            <group position={[0, 0.135, 0]}>
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.035, 0.015, 0.05, 6]} />
                    <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.15} />
                </mesh>
            </group>

            {/* Diamond Composite Geometry - Sitting in setting */}
            <group position={[0, 0.18, 0]}>
                {/* Crown (Top part) */}
                <mesh position={[0, 0.025, 0]}>
                    <cylinderGeometry args={[0.045, 0.065, 0.05, 8]} />
                    {diamondMaterial}
                </mesh>
                {/* Pavilion (Bottom pointy part) */}
                <mesh position={[0, -0.04, 0]} rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.065, 0.08, 8]} />
                    {diamondMaterial}
                </mesh>

                {/* Sparkles for Brilliance */}
                <Sparkles
                    count={10}
                    scale={[0.15, 0.15, 0.15]}
                    size={2}
                    speed={0.4}
                    opacity={0.8}
                    color="#ffffff"
                />
            </group>
        </group>
    )
}
