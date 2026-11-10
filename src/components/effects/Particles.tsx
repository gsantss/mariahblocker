import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

function seeded(seed: number) { const x = Math.sin(seed * 73.13) * 12478.19; return x - Math.floor(x); }
export function Snowfall({ dense = false }: { dense?: boolean }) {
  const reduce = useReducedMotion();
  const flakes = useMemo(() => Array.from({ length: dense ? 46 : 21 }, (_, i) => ({
    left: `${seeded(i + 2) * 100}%`, delay: `${seeded(i + 93) * -12}s`, duration: `${8 + seeded(i + 44) * 10}s`, size: `${3 + seeded(i + 36) * 5}px`, opacity: 0.25 + seeded(i + 77) * 0.65,
  })), [dense]);
  if (reduce) return null;
  return <div className="particles snow" aria-hidden="true">{flakes.map((f, i) => <i key={i} style={{ left: f.left, animationDelay: f.delay, animationDuration: f.duration, width: f.size, height: f.size, opacity: f.opacity }} />)}</div>;
}
export function Confetti() {
  const reduce = useReducedMotion();
  const bits = useMemo(() => Array.from({ length: 72 }, (_, i) => ({
    left: `${seeded(i + 11) * 100}%`, delay: `${seeded(i + 34) * -3}s`, duration: `${3 + seeded(i + 88) * 4}s`,
    rotate: `${seeded(i + 112) * 360}deg`, background: ['#ef4444', '#22c55e', '#facc15', '#f8fafc', '#e879f9'][i % 5],
  })), []);
  if (reduce) return null;
  return <div className="particles confetti" aria-hidden="true">{bits.map((c, i) => <i key={i} style={{ ...c, transform: `rotate(${c.rotate})` }} />)}</div>;
}
export function IceShatter() {
  const reduce = useReducedMotion();
  if (reduce) return <div className="ice-shatter-simple" aria-hidden="true" />;
  return <div className="ice-shatter" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <span key={i} style={{ '--fragment': i, '--rotation': `${i * 36}deg` } as React.CSSProperties} />)}</div>;
}
