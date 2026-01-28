import type { JSX } from 'react'

export const Unicorn = (): JSX.Element => {
    return (
        <group>
            {/* Body */}
            <mesh position={[0, 0.25, 0]}>
                <capsuleGeometry args={[0.15, 0.4, 4, 8]} />
                <meshStandardMaterial color="#FFF" />
            </mesh>

            {/* Head */}
            <mesh position={[0, 0.6, 0.1]}>
                <sphereGeometry args={[0.18, 32, 32]} />
                <meshStandardMaterial color="#FFF" />
            </mesh>

            {/* Snout */}
            <mesh position={[0, 0.55, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.12, 0.15]} />
                <meshStandardMaterial color="#FFC0CB" />
            </mesh>

            {/* Horn */}
            <mesh position={[0, 0.8, 0.2]} rotation={[-0.2, 0, 0]}>
                <coneGeometry args={[0.04, 0.25, 16]} />
                <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
            </mesh>

            {/* Mane (Simplified as spheres) */}
            <mesh position={[0, 0.7, -0.05]}>
                <sphereGeometry args={[0.06]} />
                <meshStandardMaterial color="#FF69B4" />
            </mesh>
            <mesh position={[0, 0.55, -0.08]}>
                <sphereGeometry args={[0.07]} />
                <meshStandardMaterial color="#9370DB" />
            </mesh>
            <mesh position={[0, 0.4, -0.05]}>
                <sphereGeometry args={[0.06]} />
                <meshStandardMaterial color="#40E0D0" />
            </mesh>

            {/* Legs (Simplified) */}
            <mesh position={[-0.1, 0.05, 0.1]}>
                <cylinderGeometry args={[0.04, 0.04, 0.25]} />
                <meshStandardMaterial color="#FFF" />
            </mesh>
            <mesh position={[0.1, 0.05, 0.1]}>
                <cylinderGeometry args={[0.04, 0.04, 0.25]} />
                <meshStandardMaterial color="#FFF" />
            </mesh>
            <mesh position={[-0.1, 0.05, -0.1]}>
                <cylinderGeometry args={[0.04, 0.04, 0.25]} />
                <meshStandardMaterial color="#FFF" />
            </mesh>
            <mesh position={[0.1, 0.05, -0.1]}>
                <cylinderGeometry args={[0.04, 0.04, 0.25]} />
                <meshStandardMaterial color="#FFF" />
            </mesh>
        </group>
    )
}
