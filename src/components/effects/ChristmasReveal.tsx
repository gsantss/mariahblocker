import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Snowflake, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { useSound } from '../../context/AudioContext';
import type { ExperienceMode } from '../../config/experience';
import { EXPERIENCE } from '../../config/experience';
import { Button } from '../ui/button';
import { Confetti, IceShatter, Snowfall } from './Particles';
import { DivaIllustration } from './DivaIllustration';

export function ChristmasReveal({ mode, onComplete }: { mode: ExperienceMode; onComplete: () => void }) {
  const sound = useSound();
  const [step, setStep] = useState<'dark' | 'crack' | 'party'>('dark');
  const [hasImageError, setImageError] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    const a = window.setTimeout(() => { setStep('crack'); sound.effect('crack'); }, 320);
    const b = window.setTimeout(() => { setStep('party'); sound.celebrate(); }, 970);
    const c = window.setTimeout(onComplete, EXPERIENCE.revealDurationMs);
    return () => { window.clearTimeout(a); window.clearTimeout(b); window.clearTimeout(c); };
  // Intentionally run once: stable event sequence, no replays after sound-state updates.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div className={`reveal-overlay reveal-overlay--${step}`} role="dialog" aria-modal="true" aria-label="Revelação natalina">
    {step === 'crack' && <IceShatter />}
    <AnimatePresence>
      {step === 'party' && <motion.div key="party" className="reveal-party" initial={{ opacity: 0, scale: reduce ? 1 : 1.3 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 130, damping: 15 }}>
        <Snowfall dense /><Confetti />
        <div className="reveal-rays" aria-hidden="true" />
        <div className="reveal-topline"><Snowflake size={16}/> NORTH POLE INCIDENT REPORT <Snowflake size={16}/></div>
        <motion.div initial={{ scale: reduce ? 1 : 0.4, rotate: reduce ? 0 : -9 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 110, damping: 9, delay: 0.15 }} className="reveal-figure">
          {!hasImageError ? <img src={EXPERIENCE.divaImage} onError={() => setImageError(true)} alt="Imagem natalina da artista" /> : <DivaIllustration className="reveal-diva" />}
        </motion.div>
        <motion.div className="reveal-copy" initial={{ y: reduce ? 0 : 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}>
          <div className="reveal-kicker">ALERTA NATALINO • MC-1225</div>
          <h1>IT'S <span>TIIIIIIIIIME!</span></h1>
          <p>{mode === 'protecao' ? 'VOCÊ FOI MARIAHCAREYFICADO!' : 'VOCÊ LIBERTOU A MARIAH CAREY!'}</p>
        </motion.div>
        <div className="reveal-actions">
          <Button variant="ghost" size="sm" onClick={sound.toggleEnabled}>{sound.enabled ? <Volume2 size={17} /> : <VolumeX size={17} />}{sound.enabled ? 'Silenciar' : 'Ativar som'}</Button>
          <Button variant="outline" size="sm" onClick={onComplete}>Ver relatório <ArrowRight size={16}/></Button>
        </div>
      </motion.div>}
    </AnimatePresence>
    {step === 'dark' && <div className="reveal-blackout" />}
  </div>;
}
