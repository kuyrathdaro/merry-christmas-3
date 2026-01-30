import type { JSX } from 'react'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Instances, Instance } from '@react-three/drei'
import type * as THREE from 'three'

export const Handbag = (): JSX.Element => {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
        }
    })

    // Chain strap generation (Connected arc)
    const chainLinks = useMemo(() => {
        const items = []
        const count = 30

        // Attachments are at +/- 0.12, y=0.3 relative to center?
        // Actually attachments are not explicitly rendered in the previous "Classic" code I replaced but I should add them or align to the "corners".
        // The bag width is x=0.7 -> half is 0.35.
        // Let's attach near the corners: +/- 0.3

        const startX = -0.3
        const endX = 0.3
        const startY = 0.25 // Top of bag is y=0.25
        const peakHeight = 0.65 // Height of strap

        for (let i = 0; i < count; i++) {
            const t = i / (count - 1)
            const x = startX + t * (endX - startX)

            // Parabola or sine for height
            const arcT = Math.sin(t * Math.PI)
            const y = startY + arcT * (peakHeight - startY)

            // Tangent for rotation
            const nextT = Math.min((i + 1) / (count - 1), 1)
            const nextX = startX + nextT * (endX - startX)
            const nextArcT = Math.sin(nextT * Math.PI)
            const nextY = startY + nextArcT * (peakHeight - startY)

            const dx = nextX - x
            const dy = nextY - y
            const angle = Math.atan2(dy, dx)

            items.push({
                pos: [x, y, 0] as [number, number, number],
                rot: [0, 0, angle] as [number, number, number],
                twist: i % 2 === 0 ? Math.PI / 2 : 0
            })
        }
        return items
    }, [])

    return (
        <group ref={groupRef}>
            {/* Main Body - Cream Leather Box */}
            <mesh position={[0, 0, 0]}>
                <RoundedBox args={[0.7, 0.5, 0.25]} radius={0.05} smoothness={4}>
                    <meshStandardMaterial color="#fdfaa3" roughness={0.4} /> {/* Cream/Ivory */}
                </RoundedBox>
            </mesh>

            {/* THE STRIPE - Green Red Green */}
            <group position={[0, 0, 0.13]}>
                {/* Green Left */}
                <mesh position={[-0.05, 0, 0]}>
                    <planeGeometry args={[0.05, 0.5]} />
                    <meshStandardMaterial color="#006400" roughness={0.8} />
                </mesh>
                {/* Red Center */}
                <mesh position={[0, 0, 0.001]}>
                    <planeGeometry args={[0.05, 0.5]} />
                    <meshStandardMaterial color="#8b0000" roughness={0.8} />
                </mesh>
                {/* Green Right */}
                <mesh position={[0.05, 0, 0]}>
                    <planeGeometry args={[0.05, 0.5]} />
                    <meshStandardMaterial color="#006400" roughness={0.8} />
                </mesh>
            </group>

            {/* Gold Enamel Logo/Buckle */}
            <mesh position={[0, 0.1, 0.14]}>
                <boxGeometry args={[0.08, 0.12, 0.02]} />
                <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.1, 0.15]}>
                <boxGeometry args={[0.06, 0.1, 0.02]} />
                <meshStandardMaterial color="#000000" metalness={0.5} roughness={0.2} />
            </mesh>

            {/* Hardware Attachments for Strap */}
            <mesh position={[-0.3, 0.25, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.05, 8]} />
                <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />
            </mesh>
            <mesh position={[0.3, 0.25, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.05, 8]} />
                <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />
            </mesh>

            {/* Chain Strap - Instanced */}
            <Instances range={30}>
                <torusGeometry args={[0.03, 0.008, 8, 16]} />
                <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />
                {chainLinks.map((l, i) => (
                    <Instance
                        key={i}
                        position={l.pos}
                        rotation={[l.rot[0], l.rot[1], l.rot[2] + (i % 2 === 0 ? Math.PI / 2 : 0)]}
                    />
                ))}
            </Instances>
        </group>
    )
}
