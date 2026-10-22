/**
 * PATRONAXXX AI — ЗАГАДКИ ЧЕЛОВЕЧЕСТВА
 * Официальный интерактивный портал YouTube-канала @patronaxxx
 * В стиле MotionSites.ai (?prompt=particle-self)
 */

import React, { useState, useCallback } from 'react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { ParticleDock } from './components/ParticleDock';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MysteryGame } from './components/MysteryGame';
import { MysteryCases } from './components/MysteryCases';
import { VideoVault } from './components/VideoVault';
import { CreatorBento } from './components/CreatorBento';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { ParticleConfig, ParticlePreset, VideoItem } from './types';
import rawVideos from './data/channelVideos.json';

export default function App() {
  const [particleConfig, setParticleConfig] = useState<ParticleConfig>({
    preset: 'avatar', // «Светящийся Разум (Self)»
    theme: 'amber',
    mode: 'repel',
    particleCount: 4500,
    speed: 1.0,
    dispersion: 1.0,
    bloomIntensity: 1.0,
    soundEnabled: false,
  });

  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const handleConfigChange = useCallback((newConfig: Partial<ParticleConfig>) => {
    setParticleConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  const handleNavClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePresetSelect = (preset: ParticlePreset) => {
    handleConfigChange({ preset });
  };

  // Play video by ID (from Game, Cases or Vault)
  const handlePlayVideoById = (videoId: string) => {
    const found = (rawVideos as VideoItem[]).find((v) => v.id === videoId);
    if (found) {
      setActiveVideo(found);
    } else {
      setActiveVideo({
        id: videoId,
        title: 'Выпуск канала PATRONAXXX AI',
        category: 'facts',
        categoryLabel: 'Загадки и Факты',
        views: '250 000+',
        duration: '0:50',
        publishedAt: '',
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        description: 'Смотрите полный разбор этой тайны на официальном канале PATRONAXXX AI.',
      });
    }
  };

  // Particle reaction to game answer
  const handleFactAnswered = (correct: boolean) => {
    if (correct) {
      // Flash amber/emerald glow
      handleConfigChange({ theme: 'amber', speed: 1.5 });
      setTimeout(() => handleConfigChange({ speed: 1.0 }), 1500);
    } else {
      // Swirl vortex
      handleConfigChange({ mode: 'vortex', speed: 2.0 });
      setTimeout(() => handleConfigChange({ mode: 'repel', speed: 1.0 }), 1500);
    }
  };

  // Change particle preset when exploring mystery topics
  const handleSelectCaseTopic = (category: string) => {
    if (category.includes('Космос')) {
      handlePresetSelect('vortex');
    } else if (category.includes('Сознан') || category.includes('Мозг')) {
      handlePresetSelect('avatar');
    } else if (category.includes('Биолог')) {
      handlePresetSelect('quantum');
    } else {
      handlePresetSelect('monogram');
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 relative selection:bg-amber-500/30 selection:text-amber-200">
      {/* 3D WebGL Particle Canvas (Fixed background layer) */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <ParticleCanvas
          config={particleConfig}
          onPresetChange={handlePresetSelect}
          isInteractive={true}
        />
      </div>

      {/* Foreground Content Stack */}
      <div className="relative z-10 pointer-events-none">
        {/* Navigation Bar */}
        <div className="pointer-events-auto">
          <Navbar onNavClick={handleNavClick} />
        </div>

        {/* Hero Section */}
        <div className="pointer-events-auto">
          <Hero
            config={particleConfig}
            onExploreGame={() => handleNavClick('game')}
            onExploreMysteries={() => handleNavClick('mysteries')}
            onPresetSelect={handlePresetSelect}
          />
        </div>

        {/* Main Content Sections with subtle translucent glass backdrop */}
        <main className="pointer-events-auto bg-[#07080f]/94 backdrop-blur-md border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
          {/* Интерактивная игра «Правда или Миф» */}
          <MysteryGame
            onPlayVideo={handlePlayVideoById}
            onFactAnswered={handleFactAnswered}
          />

          {/* Разбор Загадок Человечества (Секретные Досье) */}
          <MysteryCases
            onPlayVideo={handlePlayVideoById}
            onSelectCaseTopic={handleSelectCaseTopic}
          />

          {/* Видеоархив и Выпуски Канала (35 реальных видео с YouTube API) */}
          <VideoVault onSelectVideo={(video) => setActiveVideo(video)} />

          {/* О канале, Манифест и Сотрудничество */}
          <CreatorBento />

          {/* Футер */}
          <Footer />
        </main>
      </div>

      {/* Коллапсируемый Док Управления Частицами */}
      <ParticleDock
        config={particleConfig}
        onChange={handleConfigChange}
      />

      {/* Модальный YouTube-плеер */}
      {activeVideo && (
        <VideoModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
}
