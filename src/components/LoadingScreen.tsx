import { useEffect, useState, type JSX } from 'react'

export function LoadingScreen(): JSX.Element | null {
    const [progress, setProgress] = useState(0)
    const [visible, setVisible] = useState(true)
    const [fadeOut, setFadeOut] = useState(false)

    useEffect(() => {
        const totalDuration = 2000 // 2 seconds for full load
        const intervalTime = 20 // update every 20ms
        const increment = 100 / (totalDuration / intervalTime) // calculate linear increment

        const interval = setInterval(() => {
            setProgress((p) => {
                if (p + increment >= 100) {
                    clearInterval(interval)
                    setProgress(100) // ensure it hits 100%
                    setFadeOut(true) // start fade out
                }
                return Math.min(p + increment, 100)
            })
        }, intervalTime)

        return () => clearInterval(interval)
    }, [])

    // Fade out after reaching 100%
    useEffect(() => {
        if (fadeOut) {
            const timeout = setTimeout(() => setVisible(false), 600) // fade duration
            return () => clearTimeout(timeout)
        }
    }, [fadeOut])

    if (!visible) return null

    return (
        <div
            style={{
                fontFamily: 'var(--font-heading)',
                position: 'fixed',
                inset: 0,
                background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
                opacity: fadeOut ? 0 : 1,
                transition: 'opacity 0.6s ease',
            }}
        >
            {/* Spinner */}
            <div
                style={{
                    fontSize: '4rem',
                    marginBottom: '2rem',
                    animation: 'spin 3s linear infinite',
                }}
            >
                ❄️
            </div>

            {/* Text */}
            <h2
                style={{
                    color: '#fff',
                    fontSize: '2rem',
                    marginBottom: '1.5rem',
                }}
            >
                Loading Christmas Magic...
            </h2>

            {/* Progress Bar */}
            <div
                style={{
                    width: 300,
                    height: 8,
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: 10,
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #fbbf24, #fcd34d)',
                        borderRadius: 10,
                        transition: 'width 0.02s linear', // match interval for smooth fill
                        boxShadow: '0 0 10px rgba(251,191,36,0.8)',
                    }}
                />
            </div>

            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    )
}
