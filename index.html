import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Play, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Share2,
  Check
} from 'lucide-react';
import { QUIZ_FACTS } from '../data/mysteriesData';
import { QuizFact } from '../types';
import { soundEngine } from '../utils/audioSynth';

interface MysteryGameProps {
  onPlayVideo: (videoId: string) => void;
  onFactAnswered: (correct: boolean) => void;
}

export const MysteryGame: React.FC<MysteryGameProps> = ({ onPlayVideo, onFactAnswered }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentFact: QuizFact = QUIZ_FACTS[currentIndex];
  const isAnswered = userChoice !== null;
  const isCorrect = userChoice === currentFact.isTrue;

  const handleAnswer = (choice: boolean) => {
    if (isAnswered) return;

    setUserChoice(choice);
    setAnsweredCount((prev) => prev + 1);

    const correct = choice === currentFact.isTrue;
    onFactAnswered(correct);

    if (correct) {
      soundEngine.playParticleChime(0.9, 0);
      setScore((prev) => prev + 100 + streak * 20);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > bestStreak) setBestStreak(nextStreak);
    } else {
      soundEngine.playBlastPulse();
      setStreak(0);
    }
  };

  const handleNext = () => {
    setUserChoice(null);
    setCurrentIndex((prev) => (prev + 1) % QUIZ_FACTS.length);
  };

  const handleRandom = () => {
    setUserChoice(null);
    let nextIdx = Math.floor(Math.random() * QUIZ_FACTS.length);
    if (nextIdx === currentIndex) nextIdx = (nextIdx + 1) % QUIZ_FACTS.length;
    setCurrentIndex(nextIdx);
  };

  const handleShareFact = () => {
    const text = `Загадка от PATRONAXXX AI:\n«${currentFact.question}»\nПравда или Миф? Проверь себя на сайте!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="game" className="relative py-20 px-6 max-w-5xl mx-auto border-t border-white/10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Интерактивная игра · Детектор Реальности</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Правда или Миф?
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2">
          Факты и загадки из роликов канала <strong className="text-slate-200">PATRONAXXX AI</strong>. Сможешь отличить безумную научную правду от искусного вымысла?
        </p>
      </div>

      {/* Game Dashboard Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0b0d14] border border-slate-800 mb-8 text-xs">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-slate-500 block uppercase text-[10px] font-semibold">Очки Истины</span>
            <span className="text-lg font-bold font-mono tabular-nums text-amber-400">{score}</span>
          </div>
          <div>
            <span className="text-slate-500 block uppercase text-[10px] font-semibold">Серия верных</span>
            <span className="text-lg font-bold font-mono tabular-nums text-emerald-400 flex items-center gap-1">
              {streak > 0 && <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />}
              <span>{streak}</span>
            </span>
          </div>
          <div>
            <span className="text-slate-500 block uppercase text-[10px] font-semibold">Рекорд серии</span>
            <span className="text-lg font-bold font-mono tabular-nums text-slate-300">{bestStreak}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400">
            Вопрос <strong className="text-white font-mono">{currentIndex + 1}</strong> из {QUIZ_FACTS.length}
          </span>
          <button
            onClick={handleRandom}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
            title="Случайный факт"
          >
            <RotateCcw className="w-3 h-3 text-slate-400" />
            <span>Случайный</span>
          </button>
        </div>
      </div>

      {/* Main Game Card */}
      <div className="relative bg-[#0d0f17] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden transition-all duration-300">
        {/* Category & Tag */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400/90 font-mono">
              {currentFact.sourceCategory}
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-xs text-slate-500 font-mono">{currentFact.tag}</span>
          </div>

          <button
            onClick={handleShareFact}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Поделиться фактом"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Скопировано!' : 'Поделиться'}</span>
          </button>
        </div>

        {/* Fact Statement */}
        <div className="mb-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-display leading-snug">
            «{currentFact.question}»
          </h3>
        </div>

        {/* Interactive Choices (Buttons) */}
        {!isAnswered ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
            <button
              onClick={() => handleAnswer(true)}
              className="group p-5 rounded-2xl bg-[#131622] hover:bg-emerald-950/40 border border-slate-700/80 hover:border-emerald-500/80 transition-all duration-200 cursor-pointer flex items-center justify-between shadow-lg hover:shadow-emerald-500/10 active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono group-hover:scale-110 transition-transform">
                  ✓
                </div>
                <div className="text-left">
                  <span className="block text-base font-bold text-white group-hover:text-emerald-300">
                    ЭТО ПРАВДА
                  </span>
                  <span className="text-xs text-slate-400">Факт подтверждён наукой</span>
                </div>
              </div>
              <ShieldCheck className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </button>

            <button
              onClick={() => handleAnswer(false)}
              className="group p-5 rounded-2xl bg-[#131622] hover:bg-rose-950/40 border border-slate-700/80 hover:border-rose-500/80 transition-all duration-200 cursor-pointer flex items-center justify-between shadow-lg hover:shadow-rose-500/10 active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold font-mono group-hover:scale-110 transition-transform">
                  ✕
                </div>
                <div className="text-left">
                  <span className="block text-base font-bold text-white group-hover:text-rose-300">
                    ЭТО МИФ / ЛОЖЬ
                  </span>
                  <span className="text-xs text-slate-400">Обман, фейк или заблуждение</span>
                </div>
              </div>
              <HelpCircle className="w-5 h-5 text-slate-500 group-hover:text-rose-400 transition-colors" />
            </button>
          </div>
        ) : (
          /* Reveal & Explanation Area */
          <div className="my-6 p-6 rounded-2xl bg-[#090b12] border border-slate-800 animate-in fade-in duration-300">
            {/* Verdict Header */}
            <div className="flex items-center gap-3 mb-4">
              {isCorrect ? (
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <XCircle className="w-6 h-6" />
                </div>
              )}

              <div>
                <span className={`text-base font-extrabold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isCorrect ? 'ВЕРНО! ТВОЯ ИНТУИЦИЯ НЕ ПОДВЕЛА' : 'НЕВЕРНО! РЕАЛЬНОСТЬ ЕЩЁ УДИВИТЕЛЬНЕЕ'}
                </span>
                <p className="text-xs text-slate-400">
                  Правильный ответ: <strong className="text-white">{currentFact.isTrue ? 'ЭТО ЧИСТАЯ ПРАВДА' : 'ЭТО ВЫМЫСЕЛ / МИФ'}</strong>
                </p>
              </div>
            </div>

            {/* Scientific Explanation */}
            <p className="text-sm text-slate-300 leading-relaxed mb-6 pl-1 border-l-2 border-amber-500/50">
              {currentFact.scientificExplanation}
            </p>

            {/* Actions: Watch Video / Next Question */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              {currentFact.relatedVideoId ? (
                <button
                  onClick={() => onPlayVideo(currentFact.relatedVideoId!)}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-all shadow-md shadow-red-600/20 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Смотреть разбор в видео автора</span>
                </button>
              ) : (
                <span className="text-xs text-slate-500">Эксклюзивный факт PATRONAXXX</span>
              )}

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-400/20 cursor-pointer ml-auto"
              >
                <span>Следующий факт</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
