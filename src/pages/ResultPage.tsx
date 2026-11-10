import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Copy, Gift, Heart, Play, Pause, RotateCcw, Share2, ShieldX, Snowflake, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { Button } from '../components/ui/button';
import { DivaIllustration } from '../components/effects/DivaIllustration';
import { Confetti, Snowfall } from '../components/effects/Particles';
import { useSound } from '../context/AudioContext';
import type { ExperienceMode } from '../config/experience';
import { EXPERIENCE } from '../config/experience';

export function ResultPage() {
  const { state } = useLocation();
  const stored = sessionStorage.getItem('mariah-last-experience');
  const mode: ExperienceMode = state?.mode === 'descongelamento' || (!state?.mode && stored === 'descongelamento') ? 'descongelamento' : 'protecao';
  const isCryo = mode === 'descongelamento';
  const sound = useSound();
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);
  const target = `/${mode}`;

  async function share() {
    const url = new URL(target, window.location.origin).toString();
    const shareData = { title: 'MariahBlocker™ — Proteção Natalina', text: 'Descobri um sistema que promete proteger contra ameaças natalinas. Testa aí 😂', url };
    if (navigator.share) {
      try { await navigator.share(shareData); return; } catch (err) { if (err instanceof DOMException && err.name === 'AbortError') return; }
    }
    try {
      await navigator.clipboard.writeText(`${shareData.text} ${url}`);
    } catch {
      const input = document.createElement('textarea'); input.value = `${shareData.text} ${url}`; input.style.position = 'fixed'; input.style.opacity = '0'; document.body.appendChild(input); input.select(); document.execCommand('copy'); input.remove();
    }
    setCopied(true); window.setTimeout(() => setCopied(false), 2400);
  }

  return <main className="page result-page"><Snowfall dense/><Confetti/><div className="result-lights" aria-hidden="true">{Array.from({ length: 20 }, (_, i) => <i key={i}/>)}</div>
    <div className="container result-container"><motion.div className="result-heading" initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 30 }} animate={{ opacity: 1, y: 0 }}><div className="result-pill"><Sparkles size={14}/> INCIDENTE NATALINO CONFIRMADO <Sparkles size={14}/></div><div className="result-main"><div className="result-star">✦</div><h1>IT'S <em>TIIIIIIIIIME!</em></h1><div className="result-star">✦</div></div><h2>{isCryo ? 'VOCÊ LIBERTOU A MARIAH CAREY!' : 'VOCÊ FOI MARIAHCAREYFICADO!'}</h2><p>{isCryo ? 'Ela passou 10 meses congelada. Você não conseguiu segurá-la nem por 1 minuto.' : 'Parabéns! Você acaba de libertar a entidade natalina mais poderosa do planeta.'}</p></motion.div>
      <div className="result-stage"><div className="result-spark rs-one">✳</div><div className="result-spark rs-two">✦</div><div className="result-spark rs-three">✳</div>{!imageError ? <img src={EXPERIENCE.divaImage} onError={() => setImageError(true)} alt="Ilustração natalina da artista"/> : <DivaIllustration className="result-diva"/>}<div className="result-seal"><Gift size={17}/> CERTIFICADO DE DERROTA NATALINA</div></div>
      <div className="result-report"><div className="report-title"><span><ShieldX size={19}/> RELATÓRIO FINAL DE INCIDENTE</span><span>PROTOCOLO MC-1225 / FALHA TOTAL</span></div><div className="report-stats"><div><span>PROTEÇÃO NATALINA</span><strong>FALHOU <span className="red-indicator"/></strong></div><div><span>ESTADO DA ENTIDADE</span><strong>LIBERTADA <span className="green-indicator"/></strong></div><div><span>ESPÍRITO NATALINO</span><strong>9.999%</strong></div><div><span>DIAS SEM MARIAH</span><strong>0</strong></div></div><div className="report-warning"><Heart size={18}/> <strong>Não existe cura.</strong> Agradecemos seu esforço em vão. Feliz Natal! 🎄</div></div>
      <div className="result-buttons"><Link to={target} onClick={sound.stop} className="button-link result-button-primary"><RotateCcw size={18}/> TENTAR NOVAMENTE</Link><Link to={isCryo ? '/protecao' : '/descongelamento'} onClick={sound.stop} className="button-link result-button-dark"><Snowflake size={18}/> EXPERIMENTAR OUTRO PROTOCOLO <ArrowRight size={17}/></Link><Button variant="outline" size="lg" className="result-button-share" onClick={share}>{copied ? <Copy size={18}/> : <Share2 size={18}/>} {copied ? 'LINK COPIADO!' : 'COMPARTILHAR COM UMA VÍTIMA'}</Button></div>
      <div className="result-audio"><button type="button" onClick={sound.togglePlayback} aria-label={sound.playing ? 'Pausar música' : 'Reproduzir música'}>{sound.playing ? <Pause size={17}/> : <Play size={17}/>} {sound.playing ? 'Pausar' : 'Reproduzir'}</button><button type="button" onClick={sound.toggleEnabled} aria-label={sound.enabled ? 'Silenciar' : 'Ativar som'}>{sound.enabled ? <Volume2 size={17}/> : <VolumeX size={17}/>}</button><input aria-label="Volume" type="range" min="0" max="0.8" step="0.05" value={sound.volume} onChange={e => sound.setVolume(Number(e.currentTarget.value))}/><span>PROGRAMAÇÃO MUSICAL EM CURSO</span></div>
    </div>
  </main>;
}
