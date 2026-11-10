import { useState, useEffect } from 'react';
import { Fan, Gauge, RotateCw, Siren, Snowflake, Zap } from 'lucide-react';
import type { CryoData } from '../../hooks/useCryoSimulation';
import type { CryoStage } from '../../types/experience';
import { Button } from '../ui/button';

type ControlAction = 'cool' | 'boost' | 'restart' | 'emergency' | 'tap';
const specs = [
  { id: 'cool', label: 'ATIVAR RESFRIAMENTO', note: 'Resfria por 4,5 segundos', icon: Snowflake, cost: 12 },
  { id: 'boost', label: 'AUMENTAR POTÊNCIA', note: 'Refrigeração máxima • + desgaste', icon: Zap, cost: 23 },
  { id: 'restart', label: 'REINICIAR COMPRESSOR', note: 'Recupera integridade e energia', icon: RotateCw, cost: 0 },
  { id: 'emergency', label: 'PROTOCOLO DE EMERGÊNCIA', note: 'Uso único • refrigeração de choque', icon: Siren, cost: 28 },
] as const;

export function CoolingControls({ data, stage, onAction }: { data: CryoData; stage: CryoStage; onAction: (action: ControlAction) => void }) {
  const [now, setNow] = useState(0);
  const active = ['stable', 'anomaly', 'critical'].includes(stage);
  useEffect(() => { if (!active) return; const t = window.setInterval(() => setNow(performance.now()), 250); return () => window.clearInterval(t); }, [active]);
  return <div className="glass-panel controls-panel">
    <div className="panel-heading"><span><Gauge size={16}/> CONTROLES DA CÂMARA</span><span className="panel-code">MANUAL OVERRIDE</span></div>
    <div className="control-list">{specs.map(({ id, label, note, icon: Icon, cost }) => {
      const cooldown = data.cooldowns[id] - now;
      const locked = !active || cooldown > 0 || data.power < cost;
      const activated = (id === 'cool' && data.coolingUntil > now) || (id === 'boost' && data.boostingUntil > now) || (id === 'restart' && data.restartingUntil > now) || (id === 'emergency' && data.emergencyUntil > now);
      return <button key={id} className={`control-control ${activated ? 'control-control--active' : ''} ${id === 'emergency' ? 'control-control--emergency' : ''}`} disabled={locked} onClick={() => onAction(id)} aria-label={label}>
        <span className="control-icon"><Icon size={20}/></span><span className="control-text"><strong>{label}</strong><small>{note}</small></span><span className="control-meta">{cooldown > 0 ? Number.isFinite(cooldown) ? `${Math.ceil(cooldown / 1000)}s` : 'USADO' : activated ? <Fan size={17} className="spinner"/> : <span className="control-energy">{cost > 0 ? `−${cost} ⚡` : '↻'}</span>}</span>
      </button>;
    })}</div>
    <div className="controls-power"><div><span>ENERGIA DISPONÍVEL</span><strong>{Math.round(data.power)}%</strong></div><div className="power-track"><i style={{ width: `${data.power}%` }}/></div></div>
    {stage === 'critical' && <div className="last-stand"><strong>O SISTEMA ESTÁ PERDENDO A CONTENÇÃO!</strong><p>Pressione repetidamente para estabilizar o núcleo.</p><Button variant="danger" size="lg" onClick={() => onAction('tap')}><Siren size={19}/> IMPEDIR O DESCONGELAMENTO! ({data.taps})</Button></div>}
  </div>;
}
