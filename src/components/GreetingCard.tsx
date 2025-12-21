import React, { useEffect, useRef, useState } from 'react';

type Props = {
  open?: boolean;
  onClose?: () => void;
};

// GreetingCardGenerated
// - hinged cover open/close animation
// - interior wishing text
// - scratch-to-reveal canvas at bottom that uncovers a voucher
export default function GreetingCard({ open = false, onClose }: Props) {
  const [visible, setVisible] = useState(open);
  const [isOpen, setIsOpen] = useState(false);
  const [voucher, setVoucher] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ left: number; delay: number; dur: number; color: string }>>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (open) {
      setVisible(true);
      setTimeout(() => setIsOpen(true), 60);
      // generate voucher and init canvas shortly after opening
      setTimeout(() => {
        const rnd = () => Math.random().toString(36).slice(2, 8).toUpperCase();
        setVoucher('XMAS-' + rnd());
        requestAnimationFrame(() => initScratch());
      }, 120);
      document.body.style.overflow = 'hidden';
    } else {
      setIsOpen(false);
      const t = setTimeout(() => setVisible(false), 420);
      document.body.style.overflow = '';
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    return () => { drawing.current = false; };
  }, []);

  function initScratch() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    // metallic top layer
    ctx.fillStyle = '#bdbdbd';
    ctx.fillRect(0, 0, rect.width, rect.height);
    // light noise
    ctx.globalAlpha = 0.06;
    for (let i = 0; i < 1500; i++) ctx.fillRect(Math.random() * rect.width, Math.random() * rect.height, 1, 1);
    ctx.globalAlpha = 1;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 28;
  }

  function getPercentCleared() {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;
    try {
      const w = canvas.width;
      const h = canvas.height;
      const img = ctx.getImageData(0, 0, w, h).data;
      let cleared = 0;
      // sample every 16th byte (every 4th pixel) for speed
      for (let i = 3; i < img.length; i += 16) if (img[i] === 0) cleared++;
      const total = img.length / 4 / 4;
      return cleared / Math.max(1, total);
    } catch (e) {
      return 0;
    }
  }

  function drawAt(x: number, y: number) {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.fill(); ctx.closePath();
  }

  function drawLine(x1: number, y1: number, x2: number, y2: number) {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.closePath();
  }

  function onPointerDown(e: React.PointerEvent) {
    if (revealed) return;
    const c = canvasRef.current; if (!c) return;
    drawing.current = true;
    const rect = c.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    lastPoint.current = { x, y };
    drawAt(x, y);
    (e.target as Element).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!drawing.current || revealed) return;
    const c = canvasRef.current; if (!c) return;
    const rect = c.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    const lp = lastPoint.current;
    if (lp) { drawLine(lp.x, lp.y, x, y); lastPoint.current = { x, y }; }
  }

  function onPointerUp(e: React.PointerEvent) {
    drawing.current = false; lastPoint.current = null;
    try { (e.target as Element).releasePointerCapture(e.pointerId); } catch {}
    setTimeout(() => { if (getPercentCleared() > 0.28) doReveal(); }, 80);
  }

  function doReveal() {
    if (revealed) return;
    setRevealed(true);
    // small confetti
    const colors = ['#ef4444', '#f97316', '#fbbf24', '#10b981', '#60a5fa'];
    setConfetti(Array.from({ length: 18 }).map((_, i) => ({ left: Math.random() * 100, delay: Math.random() * 0.6, dur: 1 + Math.random() * 1.4, color: colors[i % colors.length] })));
    setTimeout(() => setConfetti([]), 1600);
  }

  if (!visible) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        .gc-wrap{ position:relative; width:min(92vw,820px); height:min(78vh,560px); perspective:1200px }
        .gc-shell{ width:100%; height:100%; position:relative; transform-style:preserve-3d }
        .gc-cover{ position:absolute; left:0; top:0; width:50%; height:100%; transform-origin:left center; background:linear-gradient(180deg,#fff6f4,#fee7e3); border-right:1px solid rgba(0,0,0,0.04); transition:transform 700ms cubic-bezier(.2,.9,.25,1), box-shadow 300ms }
        .gc-cover.open{ transform: rotateY(-160deg); box-shadow:-12px 30px 80px rgba(2,6,23,0.45) }
        .gc-inside{ position:absolute; left:50%; top:0; width:50%; height:100%; padding:36px; box-sizing:border-box; background:linear-gradient(180deg,#fffef7,#fff1e6) }
        .gbtn{ background:linear-gradient(90deg,#ef4444,#f97316); color:white; padding:10px 14px; border-radius:8px; border:none; font-weight:700 }
        @keyframes drop{ 0%{ transform:translateY(-20px) rotate(0); opacity:0 } 10%{ opacity:1 } 100%{ transform:translateY(220px) rotate(540deg); opacity:1 } }
      `}</style>

      <div onClick={() => { setIsOpen(false); setTimeout(() => { setIsOpen(true); }, 30); }} style={{ position: 'absolute', inset: 0, background: 'rgba(6,8,23,0.6)', backdropFilter: 'blur(6px)' }} />

      <div className="gc-wrap" role="dialog" aria-modal="true">
        <div className="gc-shell">
          <div className={`gc-cover ${isOpen ? 'open' : ''}`}>
            <div style={{ padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
              <h1 style={{ margin: 0, color: '#7b1e1e' }}>Merry Christmas</h1>
              <div style={{ color: '#374151' }}>May your holidays be full of joy.</div>
              <div style={{ marginTop: 16 }}>
                <button className="gbtn" onClick={() => setIsOpen(true)}>Open</button>
              </div>
            </div>
          </div>

          <div className="gc-inside">
            <div style={{ color: '#6b7280' }}>From: The Merry Team</div>
            <h2 style={{ marginTop: 8, color: '#0f172a' }}>Warm wishes for the season</h2>
            <p style={{ marginTop: 6, color: '#374151' }}>Scratch the silver area below to reveal your prize.</p>

            <div style={{ marginTop: 18 }}>
              <div style={{ position: 'relative', width: 340, height: 100, borderRadius: 12, overflow: 'hidden', background: 'linear-gradient(180deg,#fff,#f7fafc)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>Scratch to reveal</div>
                  <div style={{ fontWeight: 800, letterSpacing: 1.2 }}>{revealed ? voucher : 'XXXX-XXXX'}</div>
                </div>
                {!revealed && (
                  <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair' }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} />
                )}
              </div>
            </div>

            <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
              <button className="gbtn" onClick={() => { onClose?.(); }}>Claim</button>
              <button style={{ padding: '8px 12px' }} onClick={() => { setIsOpen(false); setTimeout(() => setIsOpen(true), 40); }}>Close</button>
            </div>

            {/* confetti */}
            {confetti.length > 0 && (
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden>
                {confetti.map((c, i) => (
                  <span key={i} style={{ position: 'absolute', left: `${c.left}%`, top: '-8%', width: 8, height: 8, background: c.color, borderRadius: 2, animation: `drop ${c.dur}s ${c.delay}s forwards` }} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
