import type { JSX } from 'react'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type * as THREE from 'three'

export const Handbag = (): JSX.Element => {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
        }
    })

    return (
        <group ref={groupRef}>
            {/* Main Body */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.6, 0.45, 0.2]} />
                <meshStandardMaterial color="#800020" roughness={0.4} /> {/* Burgundy leather */}
            </mesh>

            {/* Flap */}
            <mesh position={[0, 0.15, 0.11]} rotation={[-0.2, 0, 0]}>
                <boxGeometry args={[0.6, 0.25, 0.02]} />
                <meshStandardMaterial color="#600015" roughness={0.4} />
            </mesh>

            {/* Handle */}
            <mesh position={[0, 0.25, 0]}>
                <torusGeometry args={[0.15, 0.03, 12, 24, Math.PI]} />
                <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Gold Clasp logo */}
            <mesh position={[0, 0.1, 0.12]}>
                <circleGeometry args={[0.05, 16]} />
                <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />
            </mesh>
        </group>
    )
}
