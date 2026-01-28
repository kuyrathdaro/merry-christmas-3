import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { TeddyBear } from './toys/TeddyBear'
import { Robot } from './toys/Robot'
import { Unicorn } from './toys/Unicorn'
import { Tiara } from './toys/Tiara'
import { Lollipop } from './toys/Lollipop'

export type GiftType = 'teddy' | 'robot' | 'unicorn' | 'tiara' | 'lollipop';

interface GiftBoxProps {
    position: [number, number, number]
    color: string
    ribbonColor: string
    isOpen?: boolean
    onClick?: () => void
    scale?: number
    giftType?: GiftType
}

/* ===== Proportions tuned to reference ===== */

const SIZE = 1
const WALL = 0.05
const HALF = SIZE / 2

const RIBBON = 0.07
const RIBBON_OFFSET = HALF + WALL / 2 + 0.002

const LID_HEIGHT = 0.1
const LID_OVERHANG = 0.05

const GiftBox = ({
    position,
    color,
    ribbonColor,
    isOpen = false,
    onClick,
    scale = 1,
    giftType
}: GiftBoxProps) => {

    const lidRef = useRef<THREE.Group>(null)
    const toyRef = useRef<THREE.Group>(null)

    useFrame(() => {
        if (lidRef.current) {
            lidRef.current.rotation.x = THREE.MathUtils.lerp(
                lidRef.current.rotation.x,
                isOpen ? -0.85 : 0,
                0.12
            )
        }

        // Toy animation
        if (toyRef.current) {
            // Pop up
            const targetY = isOpen ? 1.0 : -0.2
            toyRef.current.position.y = THREE.MathUtils.lerp(
                toyRef.current.position.y,
                targetY,
                0.08
            )

            // Scale up
            const targetScale = isOpen ? 1 : 0.1
            const currentScale = toyRef.current.scale.x
            const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.08)
            toyRef.current.scale.setScalar(nextScale)

            // Spin when open
            if (isOpen && giftType) {
                toyRef.current.rotation.y += 0.02
            }
        }
    })

    // Materials
    const boxMaterial = new THREE.MeshStandardMaterial({ color })
    const ribbonMaterial = new THREE.MeshStandardMaterial({ color: ribbonColor })

    const renderToy = () => {
        switch (giftType) {
            case 'teddy': return <TeddyBear />
            case 'robot': return <Robot />
            case 'unicorn': return <Unicorn />
            case 'tiara': return <Tiara />
            case 'lollipop': return <Lollipop />
            default: return null
        }
    }

    return (
        <group
            position={position}
            scale={scale}
            onClick={(e) => {
                e.stopPropagation()
                onClick?.()
            }}
        >
            {/* ================= TOY ================= */}
            <group ref={toyRef} scale={0.1} position={[0, -0.2, 0]}>
                {renderToy()}
            </group>

            {/* ================= BOX ================= */}
            <mesh position={[0, WALL / 2, 0]} material={boxMaterial}>
                <boxGeometry args={[SIZE, WALL, SIZE]} />
            </mesh>

            <mesh position={[0, HALF, HALF]} material={boxMaterial}>
                <boxGeometry args={[SIZE, SIZE, WALL]} />
            </mesh>
            <mesh position={[0, HALF, -HALF]} material={boxMaterial}>
                <boxGeometry args={[SIZE, SIZE, WALL]} />
            </mesh>
            <mesh position={[-HALF, HALF, 0]} material={boxMaterial}>
                <boxGeometry args={[WALL, SIZE, SIZE]} />
            </mesh>
            <mesh position={[HALF, HALF, 0]} material={boxMaterial}>
                <boxGeometry args={[WALL, SIZE, SIZE]} />
            </mesh>

            {/* ================= VERTICAL RIBBON ================= */}
            <mesh position={[0, HALF, RIBBON_OFFSET]} material={ribbonMaterial}>
                <boxGeometry args={[RIBBON, SIZE, WALL]} />
            </mesh>
            <mesh position={[0, HALF, -RIBBON_OFFSET]} material={ribbonMaterial}>
                <boxGeometry args={[RIBBON, SIZE, WALL]} />
            </mesh>
            <mesh position={[-RIBBON_OFFSET, HALF, 0]} material={ribbonMaterial}>
                <boxGeometry args={[WALL, SIZE, RIBBON]} />
            </mesh>
            <mesh position={[RIBBON_OFFSET, HALF, 0]} material={ribbonMaterial}>
                <boxGeometry args={[WALL, SIZE, RIBBON]} />
            </mesh>

            {/* ================= LID ================= */}
            <group ref={lidRef} position={[0, SIZE, -HALF]}>

                {/* Lid thin cover */}
                <mesh position={[0, LID_HEIGHT / 2, HALF]} material={boxMaterial}>
                    <boxGeometry args={[SIZE + LID_OVERHANG * 2, LID_HEIGHT, SIZE + LID_OVERHANG * 2]} />
                </mesh>

                {/* Ribbon on lid */}
                <mesh position={[0, LID_HEIGHT + 0.001, HALF]} material={ribbonMaterial}>
                    <boxGeometry args={[RIBBON, WALL, SIZE + LID_OVERHANG * 2]} />
                </mesh>

                {/* ================= BOW ================= */}
                <group position={[0, LID_HEIGHT + 0.035, HALF]}>

                    {/* Knot */}
                    <mesh material={ribbonMaterial}>
                        <boxGeometry args={[0.1, 0.07, 0.07]} />
                    </mesh>

                    {/* Left loop */}
                    <mesh position={[-0.17, 0, 0]} rotation={[0, 0, 0.6]} material={ribbonMaterial}>
                        <boxGeometry args={[0.34, 0.07, 0.07]} />
                    </mesh>

                    {/* Right loop */}
                    <mesh position={[0.17, 0, 0]} rotation={[0, 0, -0.6]} material={ribbonMaterial}>
                        <boxGeometry args={[0.34, 0.07, 0.07]} />
                    </mesh>

                </group>
            </group>
        </group>
    )
}

export default GiftBox
