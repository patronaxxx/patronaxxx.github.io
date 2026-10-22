import React, { useState } from 'react';
import { 
  FileText, 
  ChevronRight, 
  Play, 
  LockOpen, 
  Sparkles, 
  Compass, 
  Dna, 
  Orbit, 
  Eye
} from 'lucide-react';
import { MYSTERY_CASES } from '../data/mysteriesData';
import { MysteryCase } from '../types';

interface MysteryCasesProps {
  onPlayVideo: (videoId: string) => void;
  onSelectCaseTopic: (topic: string) => void;
}

export const MysteryCases: React.FC<MysteryCasesProps> = ({ onPlayVideo, onSelectCaseTopic }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(MYSTERY_CASES[0].id);

  const activeCase: MysteryCase = MYSTERY_CASES.find((c) => c.id === selectedCaseId) || MYSTERY_CASES[0];

  const getCaseIcon = (category: string) => {
    if (category.includes('Космос') || category.includes('Вселен')) return <Orbit className="w-4 h-4 text-amber-400" />;
    if (category.includes('Биология') || category.includes('Тело')) return <Dna className="w-4 h-4 text-emerald-400" />;
    if (category.includes('Сознан') || category.includes('Мозг')) return <Eye className="w-4 h-4 text-cyan-400" />;
    return <Compass className="w-4 h-4 text-purple-400" />;
  };

  return (
    <section id="mysteries" className="relative py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
          <FileText className="w-4 h-4 text-amber-400" />
          <span>Архив Необъяснимого</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Разбор Загадок Человечества
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
          Интерактивные досье и научные расследования феноменов, о которых редко говорят.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cases Navigation List (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
            Секретные дела архива
          </span>

          {MYSTERY_CASES.map((c, idx) => {
            const isSelected = selectedCaseId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCaseId(c.id);
                  onSelectCaseTopic(c.category);
                }}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/5'
                    : 'bg-[#0d0f17] border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-800/80 flex items-center justify-center shrink-0 mt-0.5">
                    {getCaseIcon(c.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mb-0.5">
                      <span className="text-amber-400 font-bold">ДЕЛО #{idx + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span>{c.category}</span>
                    </div>
                    <h4 className={`text-sm font-bold line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {c.title}
                    </h4>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-amber-400 translate-x-1' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Selected Case Dossier (7 cols) */}
        <div className="lg:col-span-7 bg-[#0b0c13] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col">
          {/* Top Dossier Stamp */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <LockOpen className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                РАССЕКРЕЧЕНО · PATRONAXXX АРХИВ
              </span>
            </div>

            <span className="text-xs font-mono text-slate-500">
              STATUS: VERIFIED
            </span>
          </div>

          {/* Dossier Title */}
          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display mb-4 leading-tight">
            {activeCase.title}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            {activeCase.mysteryText}
          </p>

          {/* Clues & Evidence */}
          <div className="mb-6">
            <span className="text-xs font-semibold text-amber-400/90 uppercase tracking-wider block mb-3 font-mono">
              Установленные факты и улики:
            </span>
            <ul className="space-y-2.5">
              {activeCase.clues.map((clue, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                  <span>{clue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Scientific Verdict */}
          <div className="p-4 rounded-xl bg-[#11131e] border border-slate-800 mb-6">
            <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
              Научный вердикт:
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {activeCase.scientificVerdict}
            </p>
          </div>

          {/* Signature Channel Question */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-8">
            <p className="text-xs sm:text-sm font-bold text-amber-300 text-center font-display tracking-wide">
              {activeCase.philosophicalQuestion}
            </p>
          </div>

          {/* Action: Watch Video */}
          <div className="mt-auto pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Выпуск подготовлен каналом @patronaxxx
            </span>

            {activeCase.relatedVideoId && (
              <button
                onClick={() => onPlayVideo(activeCase.relatedVideoId!)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-all shadow-md shadow-red-600/20 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Смотреть выпуск с разбором</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
