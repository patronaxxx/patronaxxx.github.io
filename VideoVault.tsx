import React from 'react';
import { Youtube } from 'lucide-react';

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#07080d]/85 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onNavClick('hero');
          }}
          className="text-xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 font-display hover:text-amber-400 transition-colors"
        >
          PATRONAXXX AI
        </a>

        {/* Zone 2: 4–5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavClick('hero')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Частицы Разума
          </button>
          <button
            onClick={() => onNavClick('game')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Игра: Правда или Миф
          </button>
          <button
            onClick={() => onNavClick('mysteries')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Разбор Загадок
          </button>
          <button
            onClick={() => onNavClick('videos')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Видеоархив
          </button>
          <button
            onClick={() => onNavClick('creator')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            О канале
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://www.youtube.com/@patronaxxx?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-95 rounded-lg transition-all shadow-md shadow-amber-500/20 whitespace-nowrap shrink-0"
          >
            <Youtube className="w-4 h-4 text-slate-950" />
            <span>Подписаться на канал</span>
          </a>
        </div>
      </div>
    </header>
  );
};
