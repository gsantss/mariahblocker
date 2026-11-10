import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { EXPERIENCE } from '../config/experience';

type EffectName = 'click' | 'scan' | 'alert' | 'crack' | 'success' | 'cool';
interface SoundManager {
  enabled: boolean;
  playing: boolean;
  volume: number;
  setVolume: (value: number) => void;
  toggleEnabled: () => void;
  togglePlayback: () => void;
  arm: () => void;
  celebrate: () => void;
  stop: () => void;
  effect: (name: EffectName) => void;
}
const SoundContext = createContext<SoundManager | null>(null);
const AudioContextClass = () => window.AudioContext;

export function AudioProvider({ children }: { children: ReactNode }) {
  const element = useRef<HTMLAudioElement | null>(null);
  const audioCtx = useRef<AudioContext | null>(null);
  const originalTimer = useRef<number | null>(null);
  const runningFallback = useRef(false);
  const userEnabled = useRef(true);
  const [enabled, setEnabled] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [volume, setVol] = useState<number>(EXPERIENCE.safeVolume);
  const volumeRef = useRef<number>(EXPERIENCE.safeVolume);
  const mediaFailed = useRef(false);

  const context = useCallback(() => {
    try { audioCtx.current ??= new (AudioContextClass())(); void audioCtx.current.resume(); }
    catch { return null; }
    return audioCtx.current;
  }, []);

  const beep = useCallback((frequency: number, duration: number, type: OscillatorType, loudness = 0.045, startDelay = 0) => {
    const ctx = audioCtx.current;
    if (!ctx || ctx.state === 'closed' || !userEnabled.current) return;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = ctx.currentTime + startDelay;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, loudness * volumeRef.current), start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }, []);

  const effect = useCallback((name: EffectName) => {
    if (!userEnabled.current) return;
    const fx: Record<EffectName, () => void> = {
      click: () => beep(650, 0.075, 'sine'),
      scan: () => { beep(520, 0.09, 'sine'); beep(790, 0.08, 'sine', 0.025, 0.11); },
      alert: () => { beep(270, 0.28, 'sawtooth', 0.04); beep(230, 0.28, 'sawtooth', 0.04, 0.31); },
      crack: () => { [180, 130, 90, 63].forEach((n, i) => beep(n, 0.24, 'sawtooth', 0.14, i * 0.065)); },
      success: () => { [523, 659, 784, 1047].forEach((n, i) => beep(n, 0.23, 'triangle', 0.055, i * 0.11)); },
      cool: () => beep(310, 0.28, 'triangle', 0.065),
    };
    fx[name]();
  }, [beep]);

  const clearFallback = useCallback(() => {
    runningFallback.current = false;
    if (originalTimer.current !== null) window.clearInterval(originalTimer.current);
    originalTimer.current = null;
  }, []);

  const startFallback = useCallback(() => {
    clearFallback();
    runningFallback.current = true;
    const phrase = [523, 659, 784, 659, 587, 740, 880, 740, 659, 784, 1047, 784, 587, 659, 784, 523];
    let tick = 0;
    const playNote = () => {
      if (!runningFallback.current || !userEnabled.current) return;
      beep(phrase[tick % phrase.length], 0.19, 'triangle', 0.08);
      if (tick % 4 === 0) beep(phrase[tick % phrase.length] / 2, 0.32, 'sine', 0.035);
      tick += 1;
    };
    playNote();
    originalTimer.current = window.setInterval(playNote, 260);
  }, [beep, clearFallback]);

  const arm = useCallback(() => {
    context(); // Called from the actual click to unlock WebAudio on iOS/Safari.
    const player = element.current;
    if (!player || !userEnabled.current) return;
    mediaFailed.current = false;
    // Playing silently from a direct gesture makes later unmuting more reliable on mobile.
    player.volume = 0;
    player.currentTime = 0;
    void player.play().catch(() => { /* WebAudio fallback is used after reveal */ });
  }, [context]);

  const celebrate = useCallback(() => {
    context();
    if (!userEnabled.current) { setPlaying(false); return; }
    clearFallback();
    const player = element.current;
    if (!player || mediaFailed.current || player.error) {
      startFallback(); setPlaying(true); return;
    }
    try { player.currentTime = 0; player.volume = volumeRef.current; } catch { /* not seekable yet */ }
    void player.play().then(() => setPlaying(true)).catch(() => { startFallback(); setPlaying(true); });
  }, [context, clearFallback, startFallback]);

  const stop = useCallback(() => {
    const player = element.current;
    if (player) { player.pause(); try { player.currentTime = 0; } catch { /* fine */ } }
    clearFallback();
    setPlaying(false);
  }, [clearFallback]);

  const toggleEnabled = useCallback(() => {
    setEnabled(previous => {
      userEnabled.current = !previous;
      if (element.current) element.current.volume = !previous && playing ? volumeRef.current : 0;
      if (previous) clearFallback();
      else context();
      return !previous;
    });
  }, [clearFallback, context, playing]);

  const setVolume = useCallback((value: number) => {
    const next = Math.max(0, Math.min(0.8, value));
    setVol(next); volumeRef.current = next;
    if (element.current) element.current.volume = userEnabled.current && playing ? next : 0;
  }, [playing]);

  const togglePlayback = useCallback(() => {
    const player = element.current;
    if (playing) { player?.pause(); clearFallback(); setPlaying(false); }
    else { context(); if (mediaFailed.current || player?.error) startFallback(); else void player?.play().catch(startFallback); if (player) player.volume = userEnabled.current ? volumeRef.current : 0; setPlaying(true); }
  }, [playing, clearFallback, context, startFallback]);

  useEffect(() => () => {
    if (originalTimer.current !== null) window.clearInterval(originalTimer.current);
    audioCtx.current?.close().catch(() => undefined);
  }, []);

  return <SoundContext.Provider value={{ enabled, playing, volume, setVolume, toggleEnabled, togglePlayback, arm, celebrate, stop, effect }}>
    <audio
      ref={element}
      src={EXPERIENCE.celebrationAudio}
      preload="auto"
      loop
      onError={() => { mediaFailed.current = true; }}
      aria-hidden="true"
    />
    {children}
  </SoundContext.Provider>;
}

export function useSound() {
  const sound = useContext(SoundContext);
  if (!sound) throw new Error('useSound must be used inside AudioProvider');
  return sound;
}
