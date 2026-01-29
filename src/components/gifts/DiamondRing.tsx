import type { JSX } from 'react'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type * as THREE from 'three'

export const DiamondRing = (): JSX.Element => {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
        }
    })

    return (
        <group ref={groupRef}>
            {/* Gold Band */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.3, 0.04, 16, 32]} />
                <meshStandardMaterial
                    color="#FFD700"
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Diamond Setting */}
            <mesh position={[0, 0.3, 0]}>
                <cylinderGeometry args={[0.06, 0.03, 0.05, 6]} />
                <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Diamond Gem */}
            <mesh position={[0, 0.38, 0]}>
                <octahedronGeometry args={[0.12, 0]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    metalness={0.1}
                    roughness={0}
                    transmission={0.9} // Glass-like
                    thickness={0.5}
                    clearcoat={1}
                />
            </mesh>
        </group>
    )
}
