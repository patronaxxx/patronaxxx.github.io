import React from 'react';
import { Youtube, Mail, Send, Award, Film, Activity, Eye, Compass } from 'lucide-react';

export const CreatorBento: React.FC = () => {
  return (
    <section id="creator" className="relative py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="max-w-3xl mb-16">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Официальный манифест канала</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          О канале PATRONAXXX AI
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
          Добро пожаловать в мир тайн, невероятных открытий и фактов, которые перевернут твоё представление о реальности!
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
        {/* Bento 1: Avatar & Identity (5 cols) */}
        <div className="lg:col-span-5 bg-[#0e1017] border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col justify-between group">
          <div className="relative aspect-square w-full overflow-hidden bg-slate-950">
            <img
              src="/src/assets/images/patronaxxx_avatar_1792662242871.jpg"
              alt="PATRONAXXX AI цифровой образ"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-transparent to-transparent" />
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">
              <Eye className="w-3.5 h-3.5" />
              <span>Главная миссия</span>
            </div>
            <h3 className="text-xl font-bold text-white font-display mb-3">
              PATRONAXXX — ЗАГАДКИ ЧЕЛОВЕЧЕСТВА
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              Здесь ты узнаешь то, о чём редко говорят, откроешь удивительные стороны привычных вещей и найдёшь ответы на вопросы, заставляющие задуматься: <strong className="text-amber-400 font-semibold">А что, если всё не так, как мы привыкли думать?</strong>
            </p>

            <div className="flex items-center gap-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
              <span className="font-mono tabular-nums text-slate-200">11.1K+ Подписчиков</span>
              <span aria-hidden="true">·</span>
              <span>1 627+ Выпусков</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-400 font-medium">@patronaxxx</span>
            </div>
          </div>
        </div>

        {/* Bento 2: Что скрывает наш мир? (7 cols) */}
        <div className="lg:col-span-7 bg-[#0e1017] border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col justify-between group">
          <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-950">
            <img
              src="/src/assets/images/sora_meme_universe_1792662244242.jpg"
              alt="Вселенная загадок и тайн"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-[#0e1017]/40 to-transparent" />
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Что скрывает наш мир?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-3">
              МИР ГОРАЗДО ЗАГАДОЧНЕЕ, ЧЕМ КАЖЕТСЯ!
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Загадки человечества и необъяснимое</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Тайны космоса, Вселенной и планет</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Секреты древних цивилизаций</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Необычные способности животных</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Странные совпадения и истории</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Юмор, Вовочка и AI-парадоксы</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div>
                <span className="text-[11px] uppercase text-slate-500 font-medium block">Просмотры</span>
                <span className="text-sm font-bold text-slate-200 font-mono tabular-nums">31 370 000+</span>
              </div>
              <div>
                <span className="text-[11px] uppercase text-slate-500 font-medium block">Всего видео</span>
                <span className="text-sm font-bold text-slate-200 font-mono tabular-nums">1 627 роликов</span>
              </div>
              <div>
                <span className="text-[11px] uppercase text-slate-500 font-medium block">Частота</span>
                <span className="text-sm font-bold text-amber-400">Каждый день</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bento 3: Студия и создание контента (7 cols) */}
        <div className="lg:col-span-7 bg-[#0e1017] border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col md:flex-row items-stretch group">
          <div className="md:w-1/2 relative min-h-[220px] bg-slate-950 overflow-hidden">
            <img
              src="/src/assets/images/creator_studio_vault_1792662244908.jpg"
              alt="Студия создания контента"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0e1017]/80 md:block hidden" />
          </div>

          <div className="p-6 md:w-1/2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">
                <Activity className="w-3.5 h-3.5" />
                <span>Производство</span>
              </div>
              <h4 className="text-lg font-bold text-white font-display mb-2">
                Факты с глубокой проверкой
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Каждый выпуск — это результат отбора самых интригующих научных гипотез, архивных документов и необъяснимых феноменов с кинематографичной AI-визуализацией.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Визуальный движок</span>
              <span className="text-amber-400 font-medium">Sora 2 &amp; AI Cinema</span>
            </div>
          </div>
        </div>

        {/* Bento 4: Сотрудничество и Реклама (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#121422] to-[#0a0b12] border border-slate-800/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">
              <Mail className="w-3.5 h-3.5" />
              <span>Реклама и Сотрудничество</span>
            </div>
            <h4 className="text-xl font-bold text-white font-display mb-2">
              Связь с автором
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              По вопросам рекламы, интеграций и творческого сотрудничества пишите на официальную почту:
            </p>

            <div className="flex flex-col gap-2.5 mb-6 text-xs">
              <a
                href="mailto:patronax69@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-200 transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span className="font-mono">patronax69@gmail.com</span>
              </a>

              <a
                href="https://www.youtube.com/@patronaxxx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-200 transition-colors cursor-pointer"
              >
                <Youtube className="w-4 h-4 text-red-500" />
                <span>youtube.com/@patronaxxx</span>
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-400">PATRONAXXX AI Portal</span>
            <a
              href="https://www.youtube.com/@patronaxxx?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Подписаться</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
