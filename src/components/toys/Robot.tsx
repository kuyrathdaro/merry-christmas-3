import type { JSX } from 'react'

export const Robot = (): JSX.Element => {
    return (
        <group>
            {/* Body */}
            <mesh position={[0, 0.3, 0]}>
                <boxGeometry args={[0.3, 0.4, 0.2]} />
                <meshStandardMaterial color="#A9A9A9" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Head */}
            <mesh position={[0, 0.65, 0]}>
                <boxGeometry args={[0.25, 0.25, 0.25]} />
                <meshStandardMaterial color="#A9A9A9" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Eyes */}
            <mesh position={[-0.06, 0.65, 0.13]}>
                <circleGeometry args={[0.03]} />
                <meshStandardMaterial color="#00FF00" emissive="#00FF00" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0.06, 0.65, 0.13]}>
                <circleGeometry args={[0.03]} />
                <meshStandardMaterial color="#00FF00" emissive="#00FF00" emissiveIntensity={2} />
            </mesh>

            {/* Antenna */}
            <mesh position={[0, 0.8, 0]}>
                <cylinderGeometry args={[0.01, 0.01, 0.15]} />
                <meshStandardMaterial color="#888" />
            </mesh>
            <mesh position={[0, 0.9, 0]}>
                <sphereGeometry args={[0.03]} />
                <meshStandardMaterial color="#FF0000" />
            </mesh>

            {/* Arms */}
            <mesh position={[-0.2, 0.35, 0]}>
                <boxGeometry args={[0.1, 0.3, 0.1]} />
                <meshStandardMaterial color="#888" />
            </mesh>
            <mesh position={[0.2, 0.35, 0]}>
                <boxGeometry args={[0.1, 0.3, 0.1]} />
                <meshStandardMaterial color="#888" />
            </mesh>

            {/* Legs */}
            <mesh position={[-0.08, 0, 0]}>
                <boxGeometry args={[0.1, 0.3, 0.1]} />
                <meshStandardMaterial color="#888" />
            </mesh>
            <mesh position={[0.08, 0, 0]}>
                <boxGeometry args={[0.1, 0.3, 0.1]} />
                <meshStandardMaterial color="#888" />
            </mesh>
        </group>
    )
}
