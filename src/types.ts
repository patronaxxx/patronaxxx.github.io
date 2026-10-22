export type ParticlePreset = 'avatar' | 'vortex' | 'monogram' | 'quantum';

export type ParticleTheme = 'amber' | 'cyan' | 'violet' | 'emerald';

export type ParticleInteractionMode = 'repel' | 'attract' | 'vortex' | 'blast';

export interface ParticleConfig {
  preset: ParticlePreset;
  theme: ParticleTheme;
  mode: ParticleInteractionMode;
  particleCount: number;
  speed: number;
  dispersion: number;
  bloomIntensity: number;
  soundEnabled: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  category: 'facts' | 'mysteries' | 'space' | 'comedy';
  categoryLabel: string;
  views: string;
  duration: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
}

export interface QuizFact {
  id: string;
  question: string;
  isTrue: boolean;
  scientificExplanation: string;
  relatedVideoId?: string;
  sourceCategory: string;
  tag: string;
}

export interface MysteryCase {
  id: string;
  title: string;
  category: string;
  mysteryText: string;
  clues: string[];
  scientificVerdict: string;
  philosophicalQuestion: string;
  relatedVideoId?: string;
}
