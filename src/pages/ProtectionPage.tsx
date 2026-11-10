import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, ChevronRight, Loader2, LockKeyhole, ShieldCheck, Snowflake, Volume2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { StatusPill } from '../components/ui/StatusPill';
import { ThreatScanner } from '../components/security/ThreatScanner';
import { ChristmasReveal } from '../components/effects/ChristmasReveal';
import { EXPERIENCE } from '../config/experience';
import type { ScanStage } from '../types/experience';
import { useSound } from '../context/AudioContext';
import { clamp } from '../lib/utils';

const phase = (elapsed: number): ScanStage => elapsed < 5000 ? 'scanning' : elapsed < 9900 ? 'warning' : 'critical';
export function ProtectionPage() {
  const navigate = useNavigate();
  const sound = useSound();
  const [stage, setStage] = useState<ScanStage>('idle');
  const [elapsed, setElapsed] = useState(0);
  const startedRef = useRef<number | null>(null);
  const previousStage = useRef<ScanStage>('idle');
  const finishedRef = useRef(false);
  const running = stage !== 'idle' && stage !== 'jumpscare' && stage !== 'completed';
  const progress = stage === 'idle' ? 0 : stage === 'jumpscare' ? 99 : elapsed < EXPERIENCE.scanCountdownStartMs
    ? clamp(99 * (elapsed / EXPERIENCE.scanCountdownStartMs) ** 0.78, 0, 99) : 99;
  const countdown = elapsed >= 13100 ? Math.max(1, 3 - Math.floor((elapsed - 13100) / 900)) : null;

  const start = () => { if (stage !== 'idle') return; sound.arm(); sound.effect('scan'); startedRef.current = performance.now(); setElapsed(0); previousStage.current = 'scanning'; setStage('scanning'); };
  const complete = useCallback(() => { sessionStorage.setItem('mariah-last-experience', 'protecao'); navigate('/resultado', { state: { mode: 'protecao' } }); }, [navigate]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      const current = performance.now() - (startedRef.current ?? performance.now());
      setElapsed(current);
      const next = phase(current);
      if (current >= EXPERIENCE.scanDurationMs) {
        if (!finishedRef.current) { finishedRef.current = true; setStage('jumpscare'); }
      } else if (previousStage.current !== next) { previousStage.current = next; setStage(next); }
    }, 70);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => { if (stage === 'warning') sound.effect('alert'); if (stage === 'critical') sound.effect('alert'); }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps

  return <main className={`page page-protection ${stage === 'critical' ? 'page-protection--critical' : ''}`}>
    <div className="container experience-intro"><button type="button" className="back-link" onClick={() => { sound.stop(); navigate('/'); }}><ArrowLeft size={16}/> CENTRAL DE COMANDO</button><div className="breadcrumb"><span>PROTOCOLO 001</span><ChevronRight size={13}/> SCANNER DE AMEAÇAS</div></div>
    <section className="container experience-title"><div><div className="eyebrow eyebrow--left"><span className="eyebrow-line"/> ANTIVÍRUS NATALINO • v4.2.6</div><h1>Mariah<span>Blocker</span>™</h1><p>Sistema avançado de neutralização de ameaças natalinas persistentes.</p></div><div className="experience-title-status"><StatusPill tone={stage === 'critical' ? 'red' : 'green'} pulse>{stage === 'critical' ? 'FALHA DE CONTENÇÃO' : 'MÓDULO DE PROTEÇÃO ATIVO'}</StatusPill><span>ÚLTIMA ATUALIZAÇÃO: NOV/2026</span></div></section>
    <section className="container"><ThreatScanner stage={stage} elapsed={elapsed} progress={progress}/></section>
    <section className="container protocol-bottom"><div className="protocol-disclaimer"><LockKeyhole size={18}/><span>CONEXÃO SEGURA <strong>•</strong> CRIPTOGRAFIA NP-1225 <strong>•</strong> PROTEÇÃO MULTICAMADA</span></div>
      <div className="protocol-action">
        {stage === 'idle' ? <Button variant="primary" size="lg" onClick={start}><ShieldCheck size={20}/> ATIVAR PROTEÇÃO DEFINITIVA <ChevronRight size={19}/></Button> : running ? <Button variant="outline" size="lg" disabled><Loader2 size={19} className="spinner"/> VERIFICAÇÃO EM ANDAMENTO...</Button> : null}
        <small><Volume2 size={13}/> Inicie com o som ativado para a experiência completa.</small>
      </div>
    </section>
    {stage === 'critical' && <motion.div className="critical-banner" initial={{ y: 100 }} animate={{ y: 0 }}><AlertTriangle size={21}/><div><strong>{countdown ? `ELA ESTÁ DESCONGELANDO. ${countdown}...` : 'ERRO CRÍTICO: A CONTENÇÃO FALHOU.'}</strong><span>Protocolo MC-1225 comprometido. Mantenha a calma.</span></div><Snowflake size={25}/></motion.div>}
    {stage === 'jumpscare' && <ChristmasReveal mode="protecao" onComplete={complete}/>}
  </main>;
}
