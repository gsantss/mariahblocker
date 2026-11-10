/** Customize timings, behavior and user-provided licensed media here. */
export const EXPERIENCE = {
  scanDurationMs: 16000,
  scanCountdownStartMs: 12800,
  scanRevealMs: 16000,
  cryoTargetDurationSec: 38,
  cryoMaximumDurationSec: 48,
  revealDurationMs: 5300,
  safeVolume: 0.42,
  /** Replace the bundled ORIGINAL instrumental with your own licensed audio file. */
  celebrationAudio: '/assets/mariah-christmas.mp3',
  /** Optional: put an authorized image at this path; CSS/SVG fallback works otherwise. */
  divaImage: '/assets/mariah-reveal.jpg',
} as const;
export type ExperienceMode = 'protecao' | 'descongelamento';
