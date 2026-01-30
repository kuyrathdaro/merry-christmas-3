import './index.css'
import { Canvas } from '@react-three/fiber'
import ChristmasScene from './ChristmasScene'
import { LoadingScreen } from './components/LoadingScreen'
import type { JSX } from 'react'

function App(): JSX.Element {
  return (
    <>
      {/* Fake loader */}
      <LoadingScreen />

      {/* 3D Scene */}
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 5, 12], fov: 50 }}
        style={{ position: 'fixed', inset: 0 }}
      >
        <ChristmasScene />
      </Canvas>

      {/* Title overlay */}
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          position: 'fixed',
          top: 20,
          width: '100%',
          textAlign: 'center',
          fontSize: '3rem',
          color: '#fff',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        Merry Christmas 🎄
      </h1>
    </>
  )
}

export default App
