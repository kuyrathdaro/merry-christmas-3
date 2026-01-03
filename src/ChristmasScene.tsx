import { OrbitControls, Stars } from '@react-three/drei'
import { useState } from 'react'
import Santa from './components/Santa'
import BackgroundForest from './components/BackgroundForest'
import ChristmasTree from './components/ChristmasTree'
import GiftBox from './components/GiftBox'
import SnowScene from './components/SnowScene'

const ChristmasScene = () => {
    const [openGiftId, setOpenGiftId] = useState<string | null>(null)

    const handleBoxClick = (id?: string) => {
        if (id !== 'main') return
        setOpenGiftId((prev) => (prev === id ? null : id))
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

            {/* Gifts */}
            <GiftBox
                position={[0, -2, 2.8]}
                color="#dc2626"
                ribbonColor="#fbbf24"
                onClick={() => handleBoxClick('main')}
                isOpen={openGiftId === 'main'}
                scale={1.2}
            />

            <GiftBox position={[-2.2, -2, 1.5]} color="#1e40af" ribbonColor="#93c5fd" />
            <GiftBox position={[2.2, -2, 1.5]} color="#065f46" ribbonColor="#6ee7b7" />
            <GiftBox position={[-1.5, -2, -1]} color="#7c3aed" ribbonColor="#c4b5fd" />
            <GiftBox position={[1.5, -2, -1]} color="#ea580c" ribbonColor="#fde047" />

            {/* Controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.2}
                autoRotate
                autoRotateSpeed={0.8}
            />
        </>
    )
}

export default ChristmasScene
