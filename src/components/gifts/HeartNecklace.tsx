import type { JSX } from 'react'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const HeartNecklace = (): JSX.Element => {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2
        }
    })

    const heartShape = useMemo(() => {
        const x = 0, y = 0
        const shape = new THREE.Shape()
        shape.moveTo(x + 0.25, y + 0.25)
        shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.20, y, x, y)
        shape.bezierCurveTo(x - 0.30, y, x - 0.30, y + 0.35, x - 0.30, y + 0.35)
        shape.bezierCurveTo(x - 0.30, y + 0.55, x - 0.10, y + 0.77, x + 0.25, y + 0.95)
        shape.bezierCurveTo(x + 0.60, y + 0.77, x + 0.80, y + 0.55, x + 0.80, y + 0.35)
        shape.bezierCurveTo(x + 0.80, y + 0.35, x + 0.80, y, x + 0.50, y)
        shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25)
        return shape
    }, [])

    return (
        <group ref={groupRef}>
            {/* Chain Loop */}
            <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
                <torusGeometry args={[0.5, 0.02, 16, 64, Math.PI * 1.5]} />
                <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />
            </mesh>

            {/* Pendant */}
            <mesh position={[-0.25, -0.4, 0]} scale={0.6}>
                <extrudeGeometry args={[heartShape, { depth: 0.1, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.02, bevelThickness: 0.02 }]} />
                <meshStandardMaterial
                    color="#ff4d4d"
                    emissive="#ff0000"
                    emissiveIntensity={0.2}
                    metalness={0.5}
                    roughness={0.2}
                />
            </mesh>
        </group>
    )
}
