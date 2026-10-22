import React from 'react';
import { Youtube, Mail, ExternalLink, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-6 border-t border-white/10 bg-[#040407] text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
        {/* Left: Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="font-bold text-white tracking-wider font-display text-sm">
            PATRONAXXX AI
          </span>
          <span aria-hidden="true" className="hidden sm:inline text-slate-700">·</span>
          <span>Загадки Человечества</span>
          <span aria-hidden="true" className="hidden sm:inline text-slate-700">·</span>
          <span>© {new Date().getFullYear()} Все права защищены</span>
        </div>

        {/* Center: Clean Unboxed Nav Links */}
        <div className="flex items-center gap-6 text-slate-400">
          <a
            href="https://www.youtube.com/@patronaxxx"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            <Youtube className="w-3.5 h-3.5 text-red-500" />
            <span>YouTube-канал</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
          <a
            href="mailto:patronax69@gmail.com"
            className="hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>Сотрудничество</span>
          </a>
          <a
            href="https://motionsites.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            Стиль MotionSites.ai
          </a>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Наверх"
        >
          <span>Наверх</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
