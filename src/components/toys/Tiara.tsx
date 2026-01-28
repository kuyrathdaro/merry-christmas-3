import type { JSX } from 'react'

export const Tiara = (): JSX.Element => {
    return (
        <group position={[0, 0.3, 0]}>
            {/* Base Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.25, 0.02, 16, 50, Math.PI]} />
                <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
            </mesh>

            {/* Center Peak */}
            <mesh position={[0, 0.25, -0.25]} rotation={[0.4, 0, 0]}>
                <coneGeometry args={[0.05, 0.2, 4]} />
                <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
            </mesh>

            {/* Side Peaks */}
            <mesh position={[-0.15, 0.15, -0.2]} rotation={[0.3, 0, 0.3]}>
                <coneGeometry args={[0.04, 0.15, 4]} />
                <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
            </mesh>
            <mesh position={[0.15, 0.15, -0.2]} rotation={[0.3, 0, -0.3]}>
                <coneGeometry args={[0.04, 0.15, 4]} />
                <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.1} />
            </mesh>

            {/* Gemstones */}
            <mesh position={[0, 0.2, -0.22]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshStandardMaterial color="#FF1493" emissive="#FF1493" emissiveIntensity={0.5} roughness={0} />
            </mesh>
            <mesh position={[-0.15, 0.12, -0.18]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshStandardMaterial color="#00BFFF" emissive="#00BFFF" emissiveIntensity={0.5} roughness={0} />
            </mesh>
            <mesh position={[0.15, 0.12, -0.18]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshStandardMaterial color="#00BFFF" emissive="#00BFFF" emissiveIntensity={0.5} roughness={0} />
            </mesh>
        </group>
    )
}
