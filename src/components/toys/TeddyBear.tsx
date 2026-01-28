import type { JSX } from 'react'

export const TeddyBear = (): JSX.Element => {
    return (
        <group>
            {/* Body */}
            <mesh position={[0, 0.25, 0]}>
                <sphereGeometry args={[0.25, 32, 32]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Head */}
            <mesh position={[0, 0.6, 0]}>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Ears */}
            <mesh position={[-0.15, 0.75, 0]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[0.15, 0.75, 0]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Snout */}
            <mesh position={[0, 0.55, 0.15]}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#D2B48C" />
            </mesh>
            <mesh position={[0, 0.58, 0.22]}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial color="#000" />
            </mesh>

            {/* Eyes */}
            <mesh position={[-0.08, 0.65, 0.15]}>
                <sphereGeometry args={[0.025, 16, 16]} />
                <meshStandardMaterial color="#000" />
            </mesh>
            <mesh position={[0.08, 0.65, 0.15]}>
                <sphereGeometry args={[0.025, 16, 16]} />
                <meshStandardMaterial color="#000" />
            </mesh>

            {/* Arms */}
            <mesh position={[-0.25, 0.35, 0]} rotation={[0, 0, 0.5]}>
                <capsuleGeometry args={[0.08, 0.25, 4, 8]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[0.25, 0.35, 0]} rotation={[0, 0, -0.5]}>
                <capsuleGeometry args={[0.08, 0.25, 4, 8]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Legs */}
            <mesh position={[-0.15, 0.05, 0.1]} rotation={[-0.5, 0, 0]}>
                <capsuleGeometry args={[0.09, 0.25, 4, 8]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            <mesh position={[0.15, 0.05, 0.1]} rotation={[-0.5, 0, 0]}>
                <capsuleGeometry args={[0.09, 0.25, 4, 8]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
        </group>
    )
}
