import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Activity, CheckCircle2, ChevronRight, Cpu, Fingerprint, LockKeyhole, Radar, ShieldAlert, ShieldCheck, Snowflake, Thermometer, Zap } from 'lucide-react';
import { CryogenicChamber } from '../components/cryo/CryogenicChamber';
import { StatusPill } from '../components/ui/StatusPill';
import { SiteFooter } from '../components/layout/SiteHeader';
import { useSound } from '../context/AudioContext';

const metrics = [
  { value: '99,9%', label: 'EFICIÊNCIA PROMETIDA', icon: <Fingerprint size={18}/> },
  { value: '01', label: 'AMEAÇA EM QUARENTENA', icon: <LockKeyhole size={18}/> },
  { value: '−60 °C', label: 'TEMPERATURA DE CONTENÇÃO', icon: <Thermometer size={18}/> },
  { value: '24/7', label: 'MONITORAMENTO ATIVO', icon: <Activity size={18}/> },
];

export function HomePage() {
  const sound = useSound();
  const reduce = useReducedMotion();
  return <div className="page page-home">
    <div className="home-halo" aria-hidden="true"/>
    <main>
      <section className="container home-hero">
        <motion.div className="hero-left" initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="eyebrow"><span className="eyebrow-line"/><ShieldCheck size={14}/> NORTH POLE CYBER DEFENSE <span className="eyebrow-line"/></div>
          <StatusPill tone="green" pulse>PROTEÇÃO SAZONAL 2026 DISPONÍVEL</StatusPill>
          <h1>Sua paz merece<br/>um <span>pouco mais</span><br/>de silêncio.</h1>
          <p className="hero-lead">A primeira plataforma de cibersegurança projetada para proteger seus ouvidos de ameaças natalinas antes da hora.</p>
          <div className="hero-actions">
            <Link to="/protecao" className="button-link button-link--primary" onClick={sound.stop}><ShieldCheck size={19}/> ATIVAR PROTEÇÃO MÁXIMA <ArrowRight size={19}/></Link>
            <Link to="/descongelamento" className="button-link button-link--secondary" onClick={sound.stop}><Snowflake size={19}/> ACESSAR LABORATÓRIO <ArrowUpRight size={18}/></Link>
          </div>
          <div className="hero-trust"><div className="trust-icons"><ShieldCheck size={18}/><Cpu size={18}/><LockKeyhole size={18}/></div><span>Protocolos de segurança certificados* <small>*pela nossa própria equipe</small></span></div>
        </motion.div>
        <motion.div className="hero-right" initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
          <div className="monitor-card">
            <div className="monitor-card-head"><span><span className="monitor-head-led"/> MONITORAMENTO AO VIVO</span><span>SYS/MC-1225 <span className="monitor-dot-grid">⠿</span></span></div>
            <div className="monitor-scene"><div className="scene-orb"/><div className="scene-cross scene-cross-a">+</div><div className="scene-cross scene-cross-b">+</div><CryogenicChamber miniature temperature={-60} integrity={100}/><div className="monitor-badge top"><span>01</span><small>ENTIDADE<br/>CONTIDA</small></div><div className="monitor-badge bottom"><Radar size={17}/><small>SINAL MONITORADO<br/>FREQUÊNCIA: 12.25 Hz</small></div></div>
            <div className="monitor-card-foot"><div><span className="mini-label">INTEGRIDADE DA CONTENÇÃO</span><div className="foot-progress"><i/></div></div><strong>100% <CheckCircle2 size={14}/></strong></div>
          </div>
          <div className="floating-status"><div className="float-icon"><ShieldAlert size={22}/></div><div><strong>AMEAÇA DETECTADA</strong><span>Anomalia sazonal de nível crítico</span></div><span className="float-tag">MC-1225</span></div>
        </motion.div>
      </section>

      <section className="container metrics-grid" aria-label="Métricas da plataforma">{metrics.map(m => <div className="metric" key={m.label}><div className="metric-icon">{m.icon}</div><div><strong>{m.value}</strong><span>{m.label}</span></div></div>)}</section>

      <section className="container routes-section"><div className="section-heading"><div><div className="eyebrow eyebrow--left"><span className="eyebrow-line"/> DOIS PROTOCOLOS. UMA MISSÃO.</div><h2>Escolha sua <span>linha de defesa.</span></h2><p>O espírito natalino nunca foi tão perigoso. Selecione um dos nossos protocolos de contenção.</p></div><div className="section-counter">02 <span>PROTOCOLOS<br/>DISPONÍVEIS</span></div></div>
        <div className="experience-cards">
          <Link to="/protecao" className="experience-card" onClick={sound.stop}><div className="card-top"><span>PROTOCOLO 001 <span className="card-slash">/</span> PROTEÇÃO DIGITAL</span><ArrowUpRight size={20}/></div><div className="experience-icon experience-icon--shield"><ShieldCheck size={38}/><div className="icon-rings"/></div><StatusPill tone="green">RECOMENDADO</StatusPill><h3>Mariah<span>Blocker</span>™</h3><p>Execute uma varredura completa e neutralize os arquivos natalinos antes que eles infectem seu dispositivo.</p><div className="experience-card-bottom">INICIAR VARREDURA <ArrowRight size={19}/></div></Link>
          <Link to="/descongelamento" className="experience-card experience-card--ice" onClick={sound.stop}><div className="card-top"><span>PROTOCOLO 002 <span className="card-slash">/</span> CONTENÇÃO FÍSICA</span><ArrowUpRight size={20}/></div><div className="experience-icon experience-icon--snow"><Snowflake size={39}/><div className="icon-rings"/></div><StatusPill tone="blue">ACESSO RESTRITO</StatusPill><h3>Operação <span>Descongelamento</span></h3><p>Assuma o controle da câmara criogênica. Um único erro pode comprometer toda a operação.</p><div className="experience-card-bottom">ACESSAR LABORATÓRIO <ArrowRight size={19}/></div></Link>
        </div>
      </section>
      <section className="container security-note"><div><Zap size={19}/><span><strong>AVISO DE SEGURANÇA:</strong> detectamos um aumento de 340% na atividade natalina desde 1º de novembro.</span></div><Link to="/protecao">Ver relatório <ChevronRight size={15}/></Link></section>
    </main><SiteFooter/>
  </div>;
}
