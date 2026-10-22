import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  ChevronUp, 
  Magnet, 
  Zap, 
  RotateCw, 
  User, 
  CircleDot, 
  Sliders
} from 'lucide-react';
import { ParticleConfig, ParticlePreset, ParticleTheme, ParticleInteractionMode } from '../types';
import { soundEngine } from '../utils/audioSynth';

interface ParticleDockProps {
  config: ParticleConfig;
  onChange: (newConfig: Partial<ParticleConfig>) => void;
}

export const ParticleDock: React.FC<ParticleDockProps> = ({ config, onChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const presets: { id: ParticlePreset; label: string; icon: React.ReactNode }[] = [
    { id: 'avatar', label: 'Разум (Self)', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'vortex', label: 'Вихрь Космоса', icon: <RotateCw className="w-3.5 h-3.5" /> },
    { id: 'monogram', label: 'PATRONAXXX', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'quantum', label: 'Нейросфера', icon: <CircleDot className="w-3.5 h-3.5" /> },
  ];

  const themes: { id: ParticleTheme; label: string; color: string }[] = [
    { id: 'amber', label: 'Золотой янтарь', color: '#F59E0B' },
    { id: 'cyan', label: 'Неоновый циан', color: '#06B6D4' },
    { id: 'violet', label: 'Квантовый фиолет', color: '#A855F7' },
    { id: 'emerald', label: 'Изумрудная матрица', color: '#10B981' },
  ];

  const modes: { id: ParticleInteractionMode; label: string; icon: React.ReactNode }[] = [
    { id: 'repel', label: 'Отталкивание', icon: <Sparkles className="w-3 h-3" /> },
    { id: 'attract', label: 'Притяжение', icon: <Magnet className="w-3 h-3" /> },
    { id: 'vortex', label: 'Вихрь', icon: <RotateCw className="w-3 h-3" /> },
  ];

  const handleSoundToggle = () => {
    const nextMuted = soundEngine.toggleMute();
    onChange({ soundEnabled: !nextMuted });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-3xl px-4 pointer-events-none">
      {/* Collapse / Expand Tab */}
      <div className="flex justify-center mb-1">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-300 bg-[#0d0f15]/90 border border-slate-700/60 rounded-t-lg hover:text-white hover:bg-[#151822] transition-colors shadow-lg cursor-pointer"
          title="Скрыть/показать панель (Zen Mode)"
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
              <span>Управление частицами (MotionSites)</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              <span>Скрыть панель (Zen View)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Glassmorphic Dock Container */}
      <div
        className={`pointer-events-auto transition-all duration-300 ease-out origin-bottom ${
          isCollapsed
            ? 'opacity-0 translate-y-8 pointer-events-none max-h-0 overflow-hidden'
            : 'opacity-100 translate-y-0 max-h-[400px]'
        }`}
      >
        <div className="bg-[#0b0c12]/92 border border-slate-800/80 rounded-2xl p-3 shadow-2xl shadow-black/80">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Presets Selector */}
            <div className="flex items-center gap-1 bg-[#141620] p-1 rounded-xl border border-slate-800/60">
              {presets.map((preset) => {
                const isActive = config.preset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => onChange({ preset: preset.id })}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    {preset.icon}
                    <span>{preset.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Theme Swatches */}
            <div className="flex items-center gap-1.5 bg-[#141620] px-2.5 py-1.5 rounded-xl border border-slate-800/60">
              {themes.map((theme) => {
                const isActive = config.theme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => onChange({ theme: theme.id })}
                    className={`w-5 h-5 rounded-full transition-transform flex items-center justify-center cursor-pointer ${
                      isActive ? 'scale-125 ring-2 ring-white/60' : 'opacity-60 hover:opacity-100 hover:scale-110'
                    }`}
                    style={{ backgroundColor: theme.color }}
                    title={theme.label}
                  />
                );
              })}
            </div>

            {/* Interaction Modes */}
            <div className="flex items-center gap-1 bg-[#141620] p-1 rounded-xl border border-slate-800/60">
              {modes.map((mode) => {
                const isActive = config.mode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => onChange({ mode: mode.id })}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-slate-700 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title={`Физика курсора: ${mode.label}`}
                  >
                    {mode.icon}
                    <span>{mode.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Sound Synthesizer & Advanced Controls */}
            <div className="flex items-center gap-1.5 ml-auto">
              <button
                onClick={handleSoundToggle}
                className={`p-2 rounded-xl text-xs font-medium transition-colors border cursor-pointer ${
                  config.soundEnabled
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                    : 'bg-[#141620] text-slate-400 border-slate-800/60 hover:text-white'
                }`}
                title={config.soundEnabled ? 'Выключить звук' : 'Включить процедурный звук'}
              >
                {config.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={`p-2 rounded-xl text-xs font-medium transition-colors border cursor-pointer ${
                  showAdvanced
                    ? 'bg-slate-700 text-white border-slate-600'
                    : 'bg-[#141620] text-slate-400 border-slate-800/60 hover:text-white'
                }`}
                title="Параметры физики"
              >
                <Sliders className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expanded Physics Sliders */}
          {showAdvanced && (
            <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-400 whitespace-nowrap">Число частиц</span>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="2000"
                    max="7500"
                    step="500"
                    value={config.particleCount}
                    onChange={(e) => onChange({ particleCount: Number(e.target.value) })}
                    className="w-28 accent-amber-500 cursor-pointer"
                  />
                  <span className="font-mono text-slate-300 tabular-nums w-12 text-right">
                    {config.particleCount}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-400 whitespace-nowrap">Радиус рассеивания</span>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.1"
                    value={config.dispersion}
                    onChange={(e) => onChange({ dispersion: Number(e.target.value) })}
                    className="w-28 accent-amber-500 cursor-pointer"
                  />
                  <span className="font-mono text-slate-300 tabular-nums w-12 text-right">
                    {config.dispersion.toFixed(1)}x
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
