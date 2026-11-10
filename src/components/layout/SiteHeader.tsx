import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Snowflake, Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../../context/AudioContext';

export function SiteHeader() {
  const location = useLocation();
  const sound = useSound();
  const holiday = location.pathname === '/resultado';
  return <header className={`site-header ${holiday ? 'site-header--holiday' : ''}`}>
    <div className="container header-inner">
      <Link to="/" className="wordmark" onClick={sound.stop} aria-label="MariahBlocker — início"><span className="brand-logo"><ShieldCheck size={20} strokeWidth={2.5}/></span><span>MARIAH<span className="brand-highlight">BLOCKER</span><small>™</small></span></Link>
      <nav aria-label="Navegação principal" className="header-nav">
        <NavLink to="/" end onClick={sound.stop} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Início</NavLink>
        <NavLink to="/protecao" onClick={sound.stop} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Proteção</NavLink>
        <NavLink to="/descongelamento" onClick={sound.stop} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Laboratório</NavLink>
      </nav>
      <div className="header-right">
        <span className="live-status"><span className="live-circle"/> SISTEMA ONLINE</span>
        <button type="button" className="header-audio" onClick={sound.toggleEnabled} aria-label={sound.enabled ? 'Silenciar áudio' : 'Ativar áudio'} title={sound.enabled ? 'Silenciar áudio' : 'Ativar áudio'}>{sound.enabled ? <Volume2 size={17}/> : <VolumeX size={17}/>}</button>
        <Link to="/protecao" className="header-cta" onClick={sound.stop}><Snowflake size={15}/> Proteger agora <ArrowUpRight size={15}/></Link>
      </div>
    </div>
  </header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-inner"><div className="footer-brand"><ShieldCheck size={16}/> MARIAHBLOCKER™ <span>© 2026 North Pole Cyber Defense</span></div><div className="footer-aside">PROJETO MC-1225 <span>•</span> PROTEGENDO A HUMANIDADE DESDE JANEIRO</div></div></footer>;
}
