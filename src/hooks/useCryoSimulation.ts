import { useCallback, useEffect, useRef, useState } from 'react';
import { EXPERIENCE } from '../config/experience';
import { clamp } from '../lib/utils';
import type { CryoStage } from '../types/experience';

type Action = 'cool' | 'boost' | 'restart' | 'emergency' | 'tap';
export interface CryoData {
  elapsed: number;
  temperature: number;
  integrity: number;
  power: number;
  coolingUntil: number;
  boostingUntil: number;
  restartingUntil: number;
  emergencyUntil: number;
  taps: number;
  cooldowns: Record<Exclude<Action, 'tap'>, number>;
}
const initial = (): CryoData => ({ elapsed: 0, temperature: -68, integrity: 100, power: 100, coolingUntil: 0, boostingUntil: 0, restartingUntil: 0, emergencyUntil: 0, taps: 0, cooldowns: { cool: 0, boost: 0, restart: 0, emergency: 0 } });
export function useCryoSimulation() {
  const [stage, setStage] = useState<CryoStage>('idle');
  const [data, setData] = useState<CryoData>(initial);
  const dataRef = useRef(data);
  const started = useRef(0);
  const lastTick = useRef(0);
  const stageRef = useRef<CryoStage>('idle');

  const transition = useCallback((newStage: CryoStage) => {
    if (stageRef.current === newStage) return;
    stageRef.current = newStage;
    setStage(newStage);
  }, []);

  const start = useCallback(() => {
    if (stageRef.current !== 'idle') return;
    const now = performance.now();
    started.current = now;
    lastTick.current = now;
    dataRef.current = initial();
    setData(dataRef.current);
    transition('stable');
  }, [transition]);

  const act = useCallback((action: Action) => {
    const currentStage = stageRef.current;
    if (!['stable', 'anomaly', 'critical'].includes(currentStage)) return false;
    const now = performance.now();
    const old = dataRef.current;
    if (action !== 'tap' && old.cooldowns[action] > now) return false;
    let next = { ...old, cooldowns: { ...old.cooldowns } };
    if (action === 'cool') {
      if (next.power < 12) return false;
      next.power -= 12; next.coolingUntil = now + 4500; next.cooldowns.cool = now + 6000;
      next.temperature = Math.max(-70, next.temperature - 1.4);
    } else if (action === 'boost') {
      if (next.power < 23) return false;
      next.power -= 23; next.boostingUntil = now + 5000; next.cooldowns.boost = now + 11500;
      next.integrity = clamp(next.integrity - 5.5, 0, 100);
    } else if (action === 'restart') {
      next.restartingUntil = now + 2900; next.cooldowns.restart = now + 15500;
      next.integrity = clamp(next.integrity + 7, 0, 100);
      next.power = clamp(next.power + 17, 0, 100);
    } else if (action === 'emergency') {
      if (next.power < 28) return false;
      next.power -= 28; next.emergencyUntil = now + 5800; next.cooldowns.emergency = Number.POSITIVE_INFINITY;
      next.temperature = Math.max(-70, next.temperature - 5);
      next.integrity = clamp(next.integrity + 10, 0, 100);
    } else if (action === 'tap') {
      if (currentStage !== 'critical') return false;
      next.taps += 1;
      next.temperature = Math.max(-70, next.temperature - 0.21);
      next.integrity = clamp(next.integrity + 0.22, 0, 100);
    }
    dataRef.current = next; setData(next);
    return true;
  }, []);

  useEffect(() => {
    if (!['stable', 'anomaly', 'critical'].includes(stage)) return;
    const interval = window.setInterval(() => {
      const now = performance.now();
      const dt = Math.min(0.3, (now - lastTick.current) / 1000);
      lastTick.current = now;
      const elapsed = (now - started.current) / 1000;
      const previous = dataRef.current;
      const baseHeat = elapsed < 10 ? 0.39 : elapsed < 23 ? 0.87 : elapsed < 32 ? 1.7 : 2.85;
      const cooling = previous.coolingUntil > now ? 1.85 : 0;
      const boosting = previous.boostingUntil > now ? 2.3 : 0;
      const emergency = previous.emergencyUntil > now ? 1.45 : 0;
      const restarting = previous.restartingUntil > now ? 0.8 : 0;
      const heat = baseHeat + restarting - cooling - boosting - emergency;
      const temperature = clamp(previous.temperature + heat * dt, -74, 7);
      const wear = elapsed < 11 ? 0.18 : elapsed < 23 ? 0.65 : elapsed < 34 ? 1.3 : 2.5;
      const integrity = clamp(previous.integrity - wear * dt, 0, 100);
      const power = clamp(previous.power + (elapsed < 24 ? 0.95 : 0.45) * dt, 0, 100);
      const next = { ...previous, elapsed, temperature, integrity, power };
      dataRef.current = next; setData(next);
      if (elapsed >= EXPERIENCE.cryoMaximumDurationSec || (elapsed >= 28 && (temperature >= -40 || integrity <= 0))) transition('rupture');
      else if (elapsed >= 23 || temperature > -46) transition('critical');
      else if (elapsed >= 10) transition('anomaly');
    }, 100);
    return () => window.clearInterval(interval);
  }, [stage, transition]);

  useEffect(() => {
    if (stage !== 'rupture') return;
    const timeout = window.setTimeout(() => transition('jumpscare'), 1800);
    return () => window.clearTimeout(timeout);
  }, [stage, transition]);

  return { stage, data, start, act, transition };
}
