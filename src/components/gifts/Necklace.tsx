import type { JSX } from 'react'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Instances, Instance, Sparkles } from '@react-three/drei'
import type * as THREE from 'three'

export const Necklace = (): JSX.Element => {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (groupRef.current) {
            // Gentle shine/rotation
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
        }
    })

    // Chain generation - Fine Jewelry Chain (Closed Loop)
    const chainLinks = useMemo(() => {
        const items = []
        const count = 100 // Finer chain = more links
        const radiusX = 0.35
        const radiusY = 0.5

        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2
            const x = Math.cos(angle) * radiusX
            const y = Math.sin(angle) * radiusY

            // Tangent for rotation
            const dx = -Math.sin(angle) * radiusX
            const dy = Math.cos(angle) * radiusY
            const rotationAngle = Math.atan2(dy, dx)

            items.push({
                pos: [x, y + 0.5, 0] as [number, number, number],
                rot: [0, 0, rotationAngle] as [number, number, number],
                twist: i % 2 === 0 ? Math.PI / 2 : 0
            })
        }
        return items
    }, [])

    const diamondMaterial = (
        <meshPhysicalMaterial
            color="#ffffff"
            metalness={0.0}
            roughness={0}
            transmission={1.0}
            ior={2.4}
            thickness={1.5}
            attenuationColor="#ffffff"
            attenuationDistance={1}
            clearcoat={1}
            flatShading
        />
    )

    const goldMaterial = (
        <meshStandardMaterial color="#E0E0E0" metalness={1} roughness={0.1} /> // Silver
    )

    return (
        <group ref={groupRef}>
            {/* THE CHAIN - Fine Links (Silver) */}
            <Instances range={100}>
                <torusGeometry args={[0.012, 0.003, 8, 12]} /> {/* Much finer links */}
                <meshStandardMaterial color="#E0E0E0" metalness={1} roughness={0.1} />
                {chainLinks.map((l, i) => (
                    <Instance
                        key={i}
                        position={l.pos}
                        rotation={[l.rot[0], l.rot[1], l.rot[2] + (i % 2 === 0 ? Math.PI / 2 : 0)]}
                    />
                ))}
            </Instances>

            {/* THE PENDANT - Single Pear Drop (Solitaire) */}
            {/* Positioned at bottom of ellipse (angle ~ 270 deg -> x=0, y=-0.5+0.5=0) */}
            {/* Correction: The ellipse calc above centers loop at y+0.5. Bottom is y=0. */}
            <group position={[0, -0.17, 0]} scale={0.6}> {/* Lowered to attach to chain at y=0 */}

                {/* Simple Bail/Ring Connector - Loops AROUND the chain */}
                {/* Chain is at y=0 roughly at bottom. Bail needs to go up to y=0 */}
                <mesh position={[0, 0.25, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <torusGeometry args={[0.03, 0.005, 8, 16]} />
                    {goldMaterial}
                </mesh>

                {/* Main Pear/Teardrop Stone */}
                <group position={[0, 0, 0]}>
                    {/* Setting/Basket (Silver) */}
                    <mesh position={[0, 0.1, 0]}>
                        <cylinderGeometry args={[0.06, 0.04, 0.04, 8]} />
                        {goldMaterial}
                    </mesh>

                    {/* Top Round Part (Crown) */}
                    <mesh position={[0, 0.12, 0]}>
                        <sphereGeometry args={[0.08, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                        {diamondMaterial}
                    </mesh>

                    {/* Middle Girdle */}
                    <mesh position={[0, 0.12, 0]}>
                        <cylinderGeometry args={[0.08, 0.08, 0.01, 16]} />
                        {diamondMaterial}
                    </mesh>

                    {/* Bottom Point (Pavilion) - Elongated Cone */}
                    <mesh position={[0, -0.005, 0]} rotation={[Math.PI, 0, 0]}>
                        <coneGeometry args={[0.08, 0.25, 16]} />
                        {diamondMaterial}
                    </mesh>

                    {/* Extra sparkle for the pear shape */}
                    <Sparkles count={8} scale={[0.15, 0.3, 0.15]} size={3} speed={0.3} color="white" />
                </group>
            </group>
        </group>
    )
}
