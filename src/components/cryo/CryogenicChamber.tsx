import { Snowflake, LockKeyhole } from 'lucide-react';
import type { CryoStage } from '../../types/experience';
import { clamp } from '../../lib/utils';

export function CryogenicChamber({ temperature = -60, integrity = 100, stage = 'stable', miniature = false }: { temperature?: number; integrity?: number; stage?: CryoStage; miniature?: boolean }) {
  const critical = ['critical', 'rupture', 'jumpscare'].includes(stage);
  const cracking = ['anomaly', 'critical', 'rupture', 'jumpscare'].includes(stage);
  return <div className={`cryo-assembly ${miniature ? 'cryo-assembly--mini' : ''} ${critical ? 'cryo-assembly--critical' : ''} ${stage === 'rupture' ? 'cryo-assembly--rupture' : ''}`}>
    <div className="chamber-top"><i/><span>UNIT MC-1225</span><i/></div>
    <div className="chamber-body">
      <div className="chamber-interior">
        <div className="chamber-backlight" />
        <div className="chamber-figure" aria-hidden="true"><div className="figure-hair"/><div className="figure-head"/><div className="figure-body"/></div>
        <div className="frost frost-a"/><div className="frost frost-b"/><div className="frost frost-c"/>
        <div className="chamber-fog"/>
        {cracking && <svg className="chamber-cracks" viewBox="0 0 260 420" preserveAspectRatio="none" aria-hidden="true"><path d="M130 0 119 55 143 84 122 122 151 162 138 208 164 247 147 278 175 332 162 420"/><path d="M119 55 79 75 71 121 43 144 55 197"/><path d="M143 84 199 112 193 167 235 200"/><path d="M138 208 87 221 68 277 25 301"/><path d="M164 247 212 269 221 315"/></svg>}
        <div className="chamber-scanline"/>
        <div className="chamber-temperature">{temperature.toFixed(1)}<span>°C</span></div>
      </div>
      <div className="chamber-rail chamber-rail--left"/><div className="chamber-rail chamber-rail--right"/>
    </div>
    <div className="chamber-base"><div className="chamber-base-vent"/><span><LockKeyhole size={12}/> SECURE LOCK</span><div className="chamber-base-vent"/></div>
    <div className="chamber-indicator"><Snowflake size={13}/><div className="chamber-indicator-track"><div style={{ height: `${clamp(integrity, 0, 100)}%` }}/></div><span>{Math.max(0, Math.round(integrity))}%</span></div>
  </div>;
}
