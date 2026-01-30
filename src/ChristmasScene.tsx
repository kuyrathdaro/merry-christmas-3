import { OrbitControls, Stars, Float, Environment } from '@react-three/drei'
import { useState } from 'react'

import Santa from './components/Santa'
import BackgroundForest from './components/BackgroundForest'
import ChristmasTree from './components/ChristmasTree'
import GiftBox, { type GiftType } from './components/GiftBox'
import SnowScene from './components/SnowScene'

// Gifts
import { DiamondRing } from './components/gifts/DiamondRing'
import { Handbag } from './components/gifts/Handbag'
import { Perfume } from './components/gifts/Perfume'
import { Necklace } from './components/gifts/Necklace'

const GIFTS: GiftType[] = [
    'ring',
    'handbag',
    'perfume',
    'necklace',
]

const ChristmasScene = () => {
    const [openedBoxIds, setOpenedBoxIds] = useState<string[]>([])
    const [wonPrize, setWonPrize] = useState<GiftType | null>(null)

    const handleBoxClick = (id: string) => {
        if (openedBoxIds.includes(id)) {
            // Close box
            setOpenedBoxIds(prev => prev.filter(boxId => boxId !== id))
            if (id === 'main') setWonPrize(null)
        } else {
            // Open box
            setOpenedBoxIds(prev => [...prev, id])

            // Only the 'main' (Red) box has the prize
            if (id === 'main') {
                const randomGift = GIFTS[Math.floor(Math.random() * GIFTS.length)]
                setWonPrize(randomGift)
            }
        }
    }

    const renderWonPrize = () => {
        if (!wonPrize) return null

        let Component = null
        switch (wonPrize) {
            case 'ring': Component = DiamondRing; break;
            case 'handbag': Component = Handbag; break;
            case 'perfume': Component = Perfume; break;
            case 'necklace': Component = Necklace; break;
        }

        if (!Component) return null

        return (
            <group position={[0, 1.5, 3]}>
                {/* Spotlight to highlight the prize */}
                <pointLight intensity={2} distance={5} color="white" />

                {/* Floating Animation Wrapper */}
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <group scale={1.5} rotation={[0, 0, 0]}>
                        <Component />
                    </group>
                </Float>
            </group>
        )
    }

    return (
        <>
            {/* Background */}
            <color attach="background" args={['#0f172a']} />

            {/* Lights */}
            <ambientLight intensity={0.8} />
            <spotLight
                position={[10, 20, 10]}
                angle={0.5}
                penumbra={1}
                intensity={4}
            // castShadow - Disabled for performance
            />
            <pointLight position={[-10, 5, -10]} intensity={2} color="#60a5fa" />
            <directionalLight position={[0, 10, 5]} intensity={1.5} color="#ffd700" />

            {/* Environment */}
            <Stars radius={100} depth={50} count={1500} factor={4} fade />
            <SnowScene />
            <Environment preset="city" />
            <fog attach="fog" args={['#0f172a', 5, 30]} />

            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#f1f5f9" roughness={0.8} />
            </mesh>

            {/* Scene Objects */}
            <BackgroundForest />
            <ChristmasTree />
            <Santa />

            {/* ============ BIG DIALOG / PRIZE PRESENTATION ============ */}
            {wonPrize && (
                <>
                    {/* The 3D Prize Model */}
                    {renderWonPrize()}
                </>
            )}


            {/* Gifts - positioned just outside tree base (tree radius ~2.2 units) */}
            <GiftBox
                position={[0, -2, 3.0]}
                color="#dc2626"
                ribbonColor="#fbbf24"
                onClick={() => handleBoxClick('main')}
                isOpen={openedBoxIds.includes('main')}
                scale={1.2}
            />

            <GiftBox
                position={[-2.5, -2, 1.8]}
                color="#1e40af"
                ribbonColor="#93c5fd"
                onClick={() => handleBoxClick('box2')}
                isOpen={openedBoxIds.includes('box2')}
            />
            <GiftBox
                position={[2.5, -2, 1.8]}
                color="#065f46"
                ribbonColor="#6ee7b7"
                onClick={() => handleBoxClick('box3')}
                isOpen={openedBoxIds.includes('box3')}
            />
            <GiftBox
                position={[-2.3, -2, -2.0]}
                color="#7c3aed"
                ribbonColor="#c4b5fd"
                onClick={() => handleBoxClick('box4')}
                isOpen={openedBoxIds.includes('box4')}
            />
            <GiftBox
                position={[2.3, -2, -2.0]}
                color="#ea580c"
                ribbonColor="#fde047"
                onClick={() => handleBoxClick('box5')}
                isOpen={openedBoxIds.includes('box5')}
            />

            {/* Controls */}
            <OrbitControls
                makeDefault
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.2}
                autoRotate={!wonPrize} // Stop rotation when prize is displayed
                autoRotateSpeed={0.8}
            />
        </>
    )
}

export default ChristmasScene
