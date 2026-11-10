import { Activity, FileWarning, ShieldAlert, Terminal, ShieldCheck, ThermometerSun } from 'lucide-react';
import type { ScanStage } from '../../types/experience';
import { clamp } from '../../lib/utils';
import { StatusPill } from '../ui/StatusPill';

const entries: { at: number; label: string; tone?: 'warn' | 'bad' }[] = [
  { at: 0, label: '[SYS] Inicializando protocolos de segurança...' },
  { at: 1400, label: '[SCAN] Verificando arquivos natalinos...' },
  { at: 2600, label: '[SCAN] Analisando ameaças sazonais...' },
  { at: 3900, label: '[SCAN] Buscando entidades musicais persistentes...' },
  { at: 5200, label: '[WARN] Anomalia identificada.', tone: 'warn' },
  { at: 6200, label: '[SCAN] Assinatura vocal desconhecida detectada.', tone: 'warn' },
  { at: 7400, label: '[SCAN] Arquivo suspeito: All_I_Want_For_Christmas.exe', tone: 'warn' },
  { at: 8800, label: '[SCAN] Tentando isolar entidade MC-1225...', tone: 'warn' },
  { at: 10100, label: '[ERROR] TEMPERATURA CRIOGÊNICA AUMENTANDO.', tone: 'bad' },
  { at: 11400, label: '[ERROR] ENTIDADE RESPONDENDO À VERIFICAÇÃO.', tone: 'bad' },
  { at: 12600, label: '[FATAL] PROTOCOLO NATALINO COMPROMETIDO.', tone: 'bad' },
];

export function ThreatScanner({ stage, elapsed, progress }: { stage: ScanStage; elapsed: number; progress: number }) {
  const started = stage !== 'idle';
  const severe = ['critical', 'jumpscare', 'completed'].includes(stage);
  return <div className="scanner-layout">
    <div className={`scanner-main glass-panel ${severe ? 'scanner-main--critical' : ''}`}>
      <div className="panel-heading"><span><ShieldCheck size={16}/> CENTRAL DE VARREDURA</span><span className="panel-code">SCAN_ENGINE v4.2.6</span></div>
      <div className="scanner-visual"><div className="scanner-grid"/><div className={`scanner-orbit ${started ? 'scanner-orbit--running' : ''}`}><span className="orbit orbit-one"/><span className="orbit orbit-two"/><span className="orbit orbit-three"/><span className="scanner-core">{severe ? <ShieldAlert size={66}/> : <ShieldCheck size={66}/>}</span></div><div className="scanner-corner tl">+</div><div className="scanner-corner tr">+</div><div className="scanner-corner bl">+</div><div className="scanner-corner br">+</div></div>
      <div className="scan-title-row"><div><span className="tiny-label">STATUS DA VERIFICAÇÃO</span><strong>{stage === 'idle' ? 'Sistema preparado' : stage === 'scanning' ? 'Varredura em andamento' : stage === 'warning' ? 'Ameaça identificada' : 'CONTENÇÃO COMPROMETIDA'}</strong></div><div className={`progress-number ${severe ? 'text-danger' : ''}`}>{Math.floor(progress)}<span>%</span></div></div>
      <div className={`scan-progress-track ${severe ? 'scan-progress-track--critical' : ''}`}><span style={{ width: `${clamp(progress, 0, 100)}%` }}/></div>
      <div className="scan-progress-caption"><span>{stage === 'idle' ? 'AGUARDANDO COMANDO' : severe ? 'ERRO DE INTEGRIDADE DETECTADO' : 'VERIFICAÇÃO DE AMEAÇAS EM TEMPO REAL'}</span><span>{started ? 'ATIVO' : 'STANDBY'}</span></div>
    </div>
    <aside className="scanner-side">
      <div className="glass-panel threat-card"><div className="panel-heading"><span><FileWarning size={16}/> ENTIDADE MONITORADA</span><span className="panel-code">#001</span></div><div className="threat-file"><span className="threat-file-icon"><FileWarning size={25}/></span><div><strong>Mariah_Carey.exe</strong><span>Entidade Natalina Persistente</span></div></div><div className="threat-fields"><div><span>IDENTIFICADOR</span><strong>MC-1225</strong></div><div><span>CLASSIFICAÇÃO</span><strong>CLASSE Ω</strong></div><div><span>ESTADO ATUAL</span><StatusPill tone={severe ? 'red' : 'blue'}>{severe ? 'DESCONGELANDO' : 'CONGELADA'}</StatusPill></div><div><span>RISCO DE PROPAGAÇÃO</span><strong className="text-danger">99,9%</strong></div></div><div className="threat-foot"><ShieldAlert size={16}/><span>Atividade sazonal recorrente entre novembro e dezembro.</span></div></div>
      <div className="glass-panel system-stats"><div className="panel-heading"><span><Activity size={16}/> TELEMETRIA</span><span className="system-live"/></div><div className="sys-stat"><span><ThermometerSun size={16}/> TEMP. CRIOGÊNICA</span><strong className={severe ? 'text-danger' : ''}>{severe ? '-12.5' : stage === 'warning' ? '-37.2' : '-60.0'}°C</strong></div><div className="sys-stat"><span><Activity size={16}/> INTEGRIDADE</span><strong className={severe ? 'text-danger' : ''}>{severe ? '05%' : stage === 'warning' ? '74%' : '100%'}</strong></div><div className="sys-stat"><span><ShieldCheck size={16}/> QUARENTENA</span><strong>{severe ? 'OFFLINE' : 'ATIVA'}</strong></div></div>
    </aside>
    <div className="glass-panel logs-panel"><div className="panel-heading"><span><Terminal size={16}/> LOG DE EVENTOS</span><span className="panel-code">REGISTROS EM TEMPO REAL <span className="log-blink">●</span></span></div><div className="terminal-window" aria-live="polite" aria-relevant="additions">{!started ? <div className="terminal-line">[SYS] Sistema pronto. Aguardando inicialização da varredura.<span className="terminal-cursor">_</span></div> : entries.filter(item => item.at <= elapsed).slice(-5).map(item => <div key={item.at} className={`terminal-line ${item.tone ? `terminal-line--${item.tone}` : ''}`}><span className="terminal-time">{new Date(2026, 0, 1, 0, 0, 0, item.at).toTimeString().slice(0, 8)}</span> {item.label}</div>)}</div></div>
  </div>;
}
