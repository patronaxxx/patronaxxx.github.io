import React from 'react';
import { Play, Sparkles, ExternalLink, MousePointerClick, HelpCircle } from 'lucide-react';
import { ParticleConfig } from '../types';

interface HeroProps {
  config: ParticleConfig;
  onExploreGame: () => void;
  onExploreMysteries: () => void;
  onPresetSelect: (preset: 'avatar' | 'vortex' | 'monogram' | 'quantum') => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onExploreGame, 
  onExploreMysteries, 
  onPresetSelect 
}) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 pt-12 pb-24 overflow-hidden">
      {/* Subtle radial ambient vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1)_0%,rgba(5,5,8,0.75)_80%,rgba(5,5,8,1)_100%)]" />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Editorial Sub-badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold tracking-wide uppercase text-amber-400/90 bg-amber-500/10 border border-amber-500/20 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>MotionSites Particle Experience · @patronaxxx</span>
        </div>

        {/* Display Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-display text-white mb-6 leading-[1.08] text-balance">
          PATRONAXXX AI <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
            ЗАГАДКИ ЧЕЛОВЕЧЕСТВА
          </span>
        </h1>

        {/* Channel Description */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed font-normal text-balance">
          Добро пожаловать в мир тайн, невероятных открытий и фактов, которые перевернут твоё представление о реальности! Тайны Вселенной, загадки истории и необъяснимые явления.
        </p>

        {/* Channel Metrics Strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-400 mb-10 pb-6 border-b border-white/10 w-full max-w-2xl">
          <span className="font-mono tabular-nums text-slate-200">
            <strong className="text-amber-400 font-semibold">11.1K+</strong> Подписчиков
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="font-mono tabular-nums text-slate-200">
            <strong className="text-amber-400 font-semibold">1 627+</strong> Видео
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="font-mono tabular-nums text-slate-200">
            <strong className="text-amber-400 font-semibold">31.3M+</strong> Просмотров
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-300">Мир гораздо загадочнее, чем кажется</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onExploreGame}
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-95 rounded-xl transition-all shadow-lg shadow-amber-500/20 whitespace-nowrap cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Сыграть: Правда или Миф</span>
          </button>

          <button
            onClick={onExploreMysteries}
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 active:scale-95 rounded-xl transition-all whitespace-nowrap cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current text-amber-400" />
            <span>Разбор Загадок</span>
          </button>

          <a
            href="https://www.youtube.com/@patronaxxx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-300 hover:text-white bg-transparent hover:bg-slate-800/40 rounded-xl transition-all whitespace-nowrap cursor-pointer"
          >
            <span>Канал @patronaxxx</span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* Morph Shortcut Quick Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <span className="mr-1 flex items-center gap-1 text-slate-500">
            <MousePointerClick className="w-3.5 h-3.5 text-slate-400" />
            <span>Форма частиц:</span>
          </span>
          <button
            onClick={() => onPresetSelect('avatar')}
            className="px-2.5 py-1 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 rounded-md transition-colors cursor-pointer"
          >
            Светящийся Разум (Self)
          </button>
          <button
            onClick={() => onPresetSelect('vortex')}
            className="px-2.5 py-1 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 rounded-md transition-colors cursor-pointer"
          >
            Космический Вихрь
          </button>
          <button
            onClick={() => onPresetSelect('monogram')}
            className="px-2.5 py-1 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 rounded-md transition-colors cursor-pointer"
          >
            Символ PATRONAXXX
          </button>
          <button
            onClick={() => onPresetSelect('quantum')}
            className="px-2.5 py-1 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-800 rounded-md transition-colors cursor-pointer"
          >
            Нейросфера
          </button>
        </div>
      </div>
    </section>
  );
};
