import type { JSX } from 'react'

export const Lollipop = (): JSX.Element => {
    return (
        <group>
            {/* Stick */}
            <mesh position={[0, 0.2, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.4]} />
                <meshStandardMaterial color="#FFF" />
            </mesh>

            {/* Candy Head */}
            <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
                <meshStandardMaterial color="#FF4500" />
            </mesh>

            {/* Swirl Pattern (Approximated with a smaller slightly extruded cylinder) */}
            <mesh position={[0, 0.5, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.05, 0.02, 16, 32]} />
                <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0, 0.5, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.1, 0.02, 16, 32]} />
                <meshStandardMaterial color="#FFFFFF" />
            </mesh>
        </group>
    )
}
