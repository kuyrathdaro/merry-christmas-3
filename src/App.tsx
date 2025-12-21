import './index.css';
import ChristmasScene from './ChristmasScene';


// Main App Component
function App() {

  return (
    <div className="scene-container">
      {/* 3D Scene Layer */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <ChristmasScene />
      </div>

      {/* Decorative Title Overlay */}
      <h1 style={{
        position: 'absolute',
        top: '20px',
        width: '100%',
        textAlign: 'center',
        fontFamily: 'var(--font-heading)',
        fontSize: '3rem',
        textShadow: '0 0 10px rgba(255,215,0,0.5)',
        zIndex: 10,
        pointerEvents: 'none' // Let clicks pass through to canvas
      }}>
        Merry Christmas
      </h1>
    </div>
  );
}

export default App;
