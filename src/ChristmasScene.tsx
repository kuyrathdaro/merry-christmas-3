import { OrbitControls, Stars, Html } from '@react-three/drei'
import { useState } from 'react'
import * as THREE from 'three'
import Santa from './components/Santa'
import BackgroundForest from './components/BackgroundForest'
import ChristmasTree from './components/ChristmasTree'
import GiftBox, { type GiftType } from './components/GiftBox'
import SnowScene from './components/SnowScene'

// Gifts
import { DiamondRing } from './components/gifts/DiamondRing'
import { Handbag } from './components/gifts/Handbag'
import { Perfume } from './components/gifts/Perfume'
import { HeartNecklace } from './components/gifts/HeartNecklace'

const GIFTS: { type: GiftType, label: string, color: string }[] = [
    { type: 'ring', label: '💍 Diamond Ring', color: '#b9f2ff' },
    { type: 'handbag', label: '👜 Designer Bag', color: '#800020' },
    { type: 'perfume', label: '✨ Eau de Parfum', color: '#ffccdd' },
    { type: 'necklace', label: '💖 Heart Necklace', color: '#ff4d4d' },
]

const ChristmasScene = () => {
    const [openGiftId, setOpenGiftId] = useState<string | null>(null)
    const [wonPrize, setWonPrize] = useState<{ type: GiftType, label: string, color: string } | null>(null)

    const handleBoxClick = (id: string) => {
        if (openGiftId === id) {
            // Close
            setOpenGiftId(null)
            setWonPrize(null)
        } else {
            // Open new
            setOpenGiftId(id)
            const randomGift = GIFTS[Math.floor(Math.random() * GIFTS.length)]
            setWonPrize(randomGift)
        }
    }

    const renderWonPrize = () => {
        if (!wonPrize) return null

        let Component = null
        switch (wonPrize.type) {
            case 'ring': Component = DiamondRing; break;
            case 'handbag': Component = Handbag; break;
            case 'perfume': Component = Perfume; break;
            case 'necklace': Component = HeartNecklace; break;
        }

        if (!Component) return null

        return (
            <group position={[0, 1.2, 3]}>
                {/* Spotlight to highlight the prize */}
                <pointLight intensity={2} distance={5} color="white" />

                {/* Floating Animation Wrapper */}
                <group scale={1.5} rotation={[0, 0, 0]}>
                    <Component />
                </group>
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
                castShadow
            />
            <pointLight position={[-10, 5, -10]} intensity={2} color="#60a5fa" />
            <directionalLight position={[0, 10, 5]} intensity={1.5} color="#ffd700" />

            {/* Environment */}
            <Stars radius={100} depth={50} count={5000} factor={4} fade />
            <SnowScene />
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
                    {/* Dark Overlay behind prize to focus attention */}
                    <mesh position={[0, 1, 2.5]} >
                        <planeGeometry args={[10, 10]} />
                        <meshBasicMaterial color="black" transparent opacity={0.6} />
                    </mesh>

                    {/* The 3D Prize Model */}
                    {renderWonPrize()}

                    {/* HTML Label */}
                    <Html position={[0, -0.5, 3]} center style={{ pointerEvents: 'none', zIndex: 100 }}>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            padding: '24px 40px',
                            borderRadius: '20px',
                            textAlign: 'center',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                            border: `4px solid ${wonPrize.color}`,
                            minWidth: '250px',
                            animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}>
                            <h2 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                A Special Gift For You
                            </h2>
                            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: wonPrize.color, marginBottom: '10px' }}>
                                {wonPrize.label}
                            </div>
                        </div>
                        <style>{`
                            @keyframes popIn {
                                from { opacity: 0; transform: translateY(20px) scale(0.9); }
                                to { opacity: 1; transform: translateY(0) scale(1); }
                            }
                        `}</style>
                    </Html>
                </>
            )}


            {/* Gifts - positioned just outside tree base (tree radius ~2.2 units) */}
            <GiftBox
                position={[0, -2, 3.0]}
                color="#dc2626"
                ribbonColor="#fbbf24"
                onClick={() => handleBoxClick('main')}
                isOpen={openGiftId === 'main'}
                scale={1.2}
            />

            <GiftBox
                position={[-2.5, -2, 1.8]}
                color="#1e40af"
                ribbonColor="#93c5fd"
                onClick={() => handleBoxClick('box2')}
                isOpen={openGiftId === 'box2'}
            />
            <GiftBox
                position={[2.5, -2, 1.8]}
                color="#065f46"
                ribbonColor="#6ee7b7"
                onClick={() => handleBoxClick('box3')}
                isOpen={openGiftId === 'box3'}
            />
            <GiftBox
                position={[-2.3, -2, -2.0]}
                color="#7c3aed"
                ribbonColor="#c4b5fd"
                onClick={() => handleBoxClick('box4')}
                isOpen={openGiftId === 'box4'}
            />
            <GiftBox
                position={[2.3, -2, -2.0]}
                color="#ea580c"
                ribbonColor="#fde047"
                onClick={() => handleBoxClick('box5')}
                isOpen={openGiftId === 'box5'}
            />

            {/* Controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.2}
                autoRotate={!openGiftId} // Stop rotation when gift is open for better view
                autoRotateSpeed={0.8}
            />
        </>
    )
}

export default ChristmasScene
