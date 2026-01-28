import { OrbitControls, Stars, Html } from '@react-three/drei'
import { useState } from 'react'
import Santa from './components/Santa'
import BackgroundForest from './components/BackgroundForest'
import ChristmasTree from './components/ChristmasTree'
import GiftBox, { type GiftType } from './components/GiftBox'
import SnowScene from './components/SnowScene'

const GIFTS: { type: GiftType, label: string, color: string }[] = [
    { type: 'teddy', label: '🧸 Cuddly Teddy Bear', color: '#8B4513' },
    { type: 'unicorn', label: '🦄 Magical Unicorn', color: '#FF69B4' },
    { type: 'robot', label: '🤖 Retro Robot', color: '#A9A9A9' },
    { type: 'tiara', label: '👑 Princess Tiara', color: '#FFD700' },
    { type: 'lollipop', label: '🍭 Giant Lollipop', color: '#FF4500' },
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

            {/* Popup UI - Centered */}
            {wonPrize && (
                <Html position={[0, 1, 3]} center style={{ pointerEvents: 'none' }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        padding: '20px',
                        borderRadius: '16px',
                        textAlign: 'center',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                        border: `4px solid ${wonPrize.color}`,
                        minWidth: '200px',
                        transform: 'translateY(-50px)',
                        animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}>
                        <h2 style={{ margin: '0 0 10px 0', fontSize: '1.5rem', color: '#1a1a1a' }}>You found a...</h2>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: wonPrize.color }}>
                            {wonPrize.label}
                        </div>
                    </div>
                    <style>{`
                        @keyframes popIn {
                            from { opacity: 0; transform: translateY(20px) scale(0.8); }
                            to { opacity: 1; transform: translateY(-50px) scale(1); }
                        }
                    `}</style>
                </Html>
            )}

            {/* Gifts - positioned just outside tree base (tree radius ~2.2 units) */}
            <GiftBox
                position={[0, -2, 3.0]}
                color="#dc2626"
                ribbonColor="#fbbf24"
                onClick={() => handleBoxClick('main')}
                isOpen={openGiftId === 'main'}
                scale={1.2}
                giftType={openGiftId === 'main' ? wonPrize?.type : undefined}
            />

            <GiftBox
                position={[-2.5, -2, 1.8]}
                color="#1e40af"
                ribbonColor="#93c5fd"
                onClick={() => handleBoxClick('box2')}
                isOpen={openGiftId === 'box2'}
                giftType={openGiftId === 'box2' ? wonPrize?.type : undefined}
            />
            <GiftBox
                position={[2.5, -2, 1.8]}
                color="#065f46"
                ribbonColor="#6ee7b7"
                onClick={() => handleBoxClick('box3')}
                isOpen={openGiftId === 'box3'}
                giftType={openGiftId === 'box3' ? wonPrize?.type : undefined}
            />
            <GiftBox
                position={[-2.3, -2, -2.0]}
                color="#7c3aed"
                ribbonColor="#c4b5fd"
                onClick={() => handleBoxClick('box4')}
                isOpen={openGiftId === 'box4'}
                giftType={openGiftId === 'box4' ? wonPrize?.type : undefined}
            />
            <GiftBox
                position={[2.3, -2, -2.0]}
                color="#ea580c"
                ribbonColor="#fde047"
                onClick={() => handleBoxClick('box5')}
                isOpen={openGiftId === 'box5'}
                giftType={openGiftId === 'box5' ? wonPrize?.type : undefined}
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
