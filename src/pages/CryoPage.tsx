import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, ArrowLeft, ChevronRight, CirclePlay, FlaskConical, LockKeyhole, Snowflake, Thermometer, Volume2, Waves } from 'lucide-react';
import { Button } from '../components/ui/button';
import { StatusPill } from '../components/ui/StatusPill';
import { CryogenicChamber } from '../components/cryo/CryogenicChamber';
import { CoolingControls } from '../components/cryo/CoolingControls';
import { ChristmasReveal } from '../components/effects/ChristmasReveal';
import { useCryoSimulation } from '../hooks/useCryoSimulation';
import { useSound } from '../context/AudioContext';
import { formatTime } from '../lib/utils';
import { EXPERIENCE } from '../config/experience';

const message = (stage: string) => stage === 'stable' ? 'Entidade MC-1225 estabilizada. Nenhum sinal de atividade.' : stage === 'anomaly' ? 'OSCILAÇÃO TÉRMICA. ATIVIDADE VOCAL DETECTADA NA CÂMARA.' : stage === 'critical' ? 'A ENTIDADE ESTÁ ACORDANDO. PROTOCOLO MC-1225 IRREVERSÍVEL.' : 'SISTEMA CRIOGÊNICO EM COLAPSO. ELA DESCONGELOU.';

export function CryoPage() {
  const navigate = useNavigate();
  const sound = useSound();
  const { stage, data, start, act } = useCryoSimulation();
  const active = stage !== 'idle';
  const critical = ['critical', 'rupture', 'jumpscare'].includes(stage);
  const complete = useCallback(() => { sessionStorage.setItem('mariah-last-experience', 'descongelamento'); navigate('/resultado', { state: { mode: 'descongelamento' } }); }, [navigate]);
  const handleStart = () => { sound.arm(); sound.effect('cool'); start(); };
  const handleAction = (action: 'cool' | 'boost' | 'restart' | 'emergency' | 'tap') => {
    if (act(action)) sound.effect(action === 'emergency' ? 'alert' : action === 'tap' ? 'click' : 'cool');
  };
  useEffect(() => { if (stage === 'anomaly' || stage === 'critical') sound.effect('alert'); if (stage === 'rupture') sound.effect('crack'); }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps
  return <main className={`page page-cryo ${critical ? 'page-cryo--critical' : ''}`}>
    <div className="container experience-intro"><button type="button" className="back-link" onClick={() => { sound.stop(); navigate('/'); }}><ArrowLeft size={16}/> CENTRAL DE COMANDO</button><div className="breadcrumb"><span>PROTOCOLO 002</span><ChevronRight size={13}/> LABORATÓRIO CRIOGÊNICO</div></div>
    <section className="container experience-title"><div><div className="eyebrow eyebrow--left"><span className="eyebrow-line"/> PROJETO CLASSIFICADO • MC-1225</div><h1>Operação <span>Descongelamento.</span></h1><p>Mantenha a temperatura abaixo de −40 °C. Não deixe a entidade despertar.</p></div><div className="experience-title-status"><StatusPill tone={critical ? 'red' : active && stage === 'anomaly' ? 'amber' : 'blue'} pulse>{critical ? 'ALERTA: CONTENÇÃO EM COLAPSO' : active ? 'MONITORAMENTO EM ANDAMENTO' : 'SISTEMA CRIOGÊNICO ONLINE'}</StatusPill><span>ACESSO NÍVEL OMEGA • CLASSIFICADO</span></div></section>
    <section className="container cryo-layout">
      <div className="glass-panel chamber-panel"><div className="panel-heading"><span><FlaskConical size={16}/> UNIDADE DE CONTENÇÃO CRIOGÊNICA</span><span className="panel-code">CAMERA_01 / 04</span></div><div className="chamber-stage"><div className="chamber-decoration deco-a">+</div><div className="chamber-decoration deco-b">+</div><div className="chamber-decoration deco-c">+</div><div className="chamber-stage-grid"/><CryogenicChamber temperature={data.temperature} integrity={data.integrity} stage={stage} /><div className="chamber-stage-side one">OBJECT: MC-1225<br/>CRYO-GEN v3.8<br/>LOCK: ENGAGED</div><div className="chamber-stage-side two">RESTRICTED<br/>PERSONNEL ONLY</div></div><div className={`chamber-message ${critical ? 'chamber-message--red' : ''}`}><span><span className="status-dot" /> SINAL DE CONTENÇÃO</span><strong>{stage === 'idle' ? 'Aguardando inicialização do monitoramento.' : message(stage)}</strong></div></div>
      <div className="cryo-side">
        <div className="glass-panel cryo-telemetry"><div className="panel-heading"><span><Activity size={16}/> TELEMETRIA EM TEMPO REAL</span><span className="system-live"/></div><div className="telemetry-temperature"><span>TEMPERATURA INTERNA</span><strong className={critical ? 'text-danger' : ''}>{data.temperature.toFixed(1)}<small>°C</small></strong><div><span><Thermometer size={14}/> LIMITE CRÍTICO: −40 °C</span><span>{critical ? 'CRÍTICO' : 'SEGURO'}</span></div></div><div className="telemetry-readings"><div><span><LockKeyhole size={15}/> INTEGRIDADE</span><strong>{Math.round(data.integrity)}%</strong><div className="tiny-track"><i style={{ width: `${data.integrity}%` }}/></div></div><div><span><Waves size={15}/> ATIVIDADE DA ENTIDADE</span><strong className={critical ? 'text-danger' : ''}>{stage === 'idle' || stage === 'stable' ? 'INATIVA' : stage === 'anomaly' ? 'ANORMAL' : 'ELEVADA'}</strong></div><div><span><Activity size={15}/> TEMPO DE CONTENÇÃO</span><strong>{formatTime(Math.round(data.elapsed))}</strong></div><div><span><Snowflake size={15}/> REFRIGERAÇÃO</span><strong>{data.boostingUntil > performance.now() ? 'MÁXIMA' : data.coolingUntil > performance.now() ? 'ATIVA' : stage === 'critical' ? 'INSTÁVEL' : 'OPERACIONAL'}</strong></div></div></div>
        <CoolingControls data={data} stage={stage} onAction={handleAction}/>
      </div>
    </section>
    {!active && <div className="container start-cryo-bar"><div className="start-bar-copy"><div className="start-bar-icon"><Snowflake size={22}/></div><div><strong>SISTEMA DE CONTENÇÃO EM ESPERA</strong><span>Você é responsável pela segurança do laboratório. Proceda com cautela.</span></div></div><Button size="lg" variant="ice" onClick={handleStart}><CirclePlay size={21}/> INICIAR MONITORAMENTO <ChevronRight size={18}/></Button></div>}
    {active && <div className="container cryo-active-bar"><div><Volume2 size={15}/> OPERAÇÃO EM ANDAMENTO <span>•</span> TODOS OS COMANDOS SÃO REGISTRADOS</div><span>PRAZO MÁXIMO DA MISSÃO: {EXPERIENCE.cryoMaximumDurationSec}s</span></div>}
    {stage === 'rupture' && <motion.div className="rupture-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><AlertTriangle size={49}/><span>ERRO FATAL • MC-1225</span><h2>ELA DESCONGELOU.</h2><p>PROTOCOLO DE CONTENÇÃO PERDIDO</p></motion.div>}
    {stage === 'jumpscare' && <ChristmasReveal mode="descongelamento" onComplete={complete}/>}
  </main>;
}
