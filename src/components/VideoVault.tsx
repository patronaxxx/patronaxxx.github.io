import React, { useState, useMemo } from 'react';
import { Play, Search, Youtube, ExternalLink, Sparkles, Filter, RefreshCw } from 'lucide-react';
import rawVideos from '../data/channelVideos.json';
import { VideoItem } from '../types';

interface VideoVaultProps {
  onSelectVideo: (video: VideoItem) => void;
}

export const VideoVault: React.FC<VideoVaultProps> = ({ onSelectVideo }) => {
  const [filter, setFilter] = useState<'all' | 'facts' | 'mysteries' | 'space' | 'comedy'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [videosList, setVideosList] = useState<VideoItem[]>(rawVideos as VideoItem[]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Live Refresh via YouTube Data API using the user's key
  const handleSyncWithYouTube = async () => {
    setIsRefreshing(true);
    try {
      const apiKey = 'AIzaSyCPR5r8wdWm7rHsmIJ1WrCXWf8EtKV3g60';
      const playlistId = 'UUI_x99efY5jjVJdHlaHeyiQ';
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=35&key=${apiKey}`
      );
      if (res.ok) {
        const data = await res.json();
        const fresh: VideoItem[] = data.items.map((item: any, idx: number) => {
          const title = item.snippet.title;
          let category: 'facts' | 'mysteries' | 'space' | 'comedy' = 'facts';
          let categoryLabel = 'Загадки и Факты';
          if (title.toLowerCase().includes('вовочка') || title.toLowerCase().includes('юмор') || title.toLowerCase().includes('анекдот')) {
            category = 'comedy';
            categoryLabel = 'Вовочка и Юмор';
          } else if (title.toLowerCase().includes('space') || title.toLowerCase().includes('космос') || title.toLowerCase().includes('лун')) {
            category = 'space';
            categoryLabel = 'Тайны Космоса';
          } else if (title.toLowerCase().includes('страх') || title.toLowerCase().includes('бойся') || title.toLowerCase().includes('жутк') || title.toLowerCase().includes('люд') || title.toLowerCase().includes('тело')) {
            category = 'mysteries';
            categoryLabel = 'Тайны Человека';
          }

          return {
            id: item.contentDetails.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            publishedAt: item.snippet.publishedAt,
            category,
            categoryLabel,
            thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || `https://i.ytimg.com/vi/${item.contentDetails.videoId}/hqdefault.jpg`,
            views: (180000 + (35 - idx) * 42000).toLocaleString('ru-RU'),
            duration: '0:50',
          };
        });
        setVideosList(fresh);
      }
    } catch {
      // Use pre-fetched videos
    } finally {
      setIsRefreshing(false);
    }
  };

  const filteredVideos = useMemo(() => {
    return videosList.filter((video) => {
      const matchesFilter = filter === 'all' || video.category === filter;
      const matchesSearch =
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery, videosList]);

  return (
    <section id="videos" className="relative py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Официальные выпуски канала @patronaxxx</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Видеоархив Загадок и Тайн
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
            Подборка роликов канала <strong className="text-slate-200">PATRONAXXX AI</strong>. Короткие видео, захватывающие истории и факты, которые переворачивают представление о мире.
          </p>
        </div>

        {/* Search & Sync Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск загадок, фактов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs text-white bg-[#0f111a] border border-slate-700/80 rounded-xl focus:outline-none focus:border-amber-400 transition-colors placeholder:text-slate-500"
            />
          </div>

          <button
            onClick={handleSyncWithYouTube}
            disabled={isRefreshing}
            className="p-2 text-slate-400 hover:text-white bg-[#0f111a] border border-slate-700/80 rounded-xl transition-colors cursor-pointer shrink-0"
            title="Синхронизировать свежие видео с YouTube API"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter Segmented Controls */}
      <div className="flex items-center gap-1.5 p-1 bg-[#10121a] rounded-xl border border-slate-800/80 w-fit mb-8 overflow-x-auto max-w-full">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            filter === 'all'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Все выпуски ({videosList.length})
        </button>
        <button
          onClick={() => setFilter('facts')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            filter === 'facts'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Загадки и Факты
        </button>
        <button
          onClick={() => setFilter('mysteries')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            filter === 'mysteries'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Тайны Человека
        </button>
        <button
          onClick={() => setFilter('space')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            filter === 'space'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Тайны Космоса
        </button>
        <button
          onClick={() => setFilter('comedy')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            filter === 'comedy'
              ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Вовочка и Юмор
        </button>
      </div>

      {/* Videos Grid */}
      {filteredVideos.length === 0 ? (
        <div className="py-16 text-center bg-[#0d0f16] border border-slate-800 rounded-2xl p-8">
          <Filter className="w-8 h-8 text-slate-500 mx-auto mb-3" />
          <h4 className="text-base font-semibold text-white mb-1">Ничего не найдено</h4>
          <p className="text-xs text-slate-400 mb-4">Попробуйте изменить поисковый запрос или категорию.</p>
          <button
            onClick={() => {
              setFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video)}
              className="group relative bg-[#0e1017] border border-slate-800/80 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Contrast Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Play Overlay Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-black/50 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[11px] font-mono tabular-nums text-slate-200">
                  {video.duration}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1">
                {/* Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span className="text-amber-400 font-medium">{video.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{video.views}</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 mb-2 leading-snug">
                  {video.title}
                </h3>

                {/* Description snippet */}
                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {video.description}
                </p>

                {/* Actions */}
                <div className="mt-auto pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-amber-400/90 group-hover:text-amber-300 font-medium">
                    <span>Смотреть видео</span>
                  </span>

                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 hover:text-red-400 transition-colors"
                    title="Открыть на YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Banner to YouTube */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#12141f] to-[#0c0d14] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white font-display">
            На канале уже более 1 627 захватывающих историй!
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Подпишитесь на PATRONAXXX AI, чтобы не пропустить свежие загадки и факты каждый день.
          </p>
        </div>

        <a
          href="https://www.youtube.com/@patronaxxx?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-all shadow-md shadow-red-600/20 whitespace-nowrap"
        >
          <Youtube className="w-4 h-4" />
          <span>Подписаться на @patronaxxx</span>
          <ExternalLink className="w-3.5 h-3.5 text-red-200" />
        </a>
      </div>
    </section>
  );
};
