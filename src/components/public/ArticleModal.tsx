import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, User, Share2, MessageSquare, ArrowLeft } from 'lucide-react';

export const ArticleModal: React.FC = () => {
  const { selectedPublicArticle, setSelectedPublicArticle, settings } = useApp();

  if (!selectedPublicArticle) return null;

  const article = selectedPublicArticle;

  const handleDiscussOnWa = () => {
    const waText = `Halo Mas Andriawan Delv, saya baru saja membaca artikel "${article.title}" di blog Anda. Saya tertarik mendiskusikan topik ini lebih lanjut untuk kebutuhan bisnis saya.`;
    const cleanWa = settings.waNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(waText)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#eaedff] custom-scrollbar animate-in fade-in zoom-in-95 duration-200">
        {/* Top bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 sm:px-8 py-4 border-b border-[#eaedff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#eaedff] text-[#4648d4] text-xs font-bold">
              {article.categoryLabel}
            </span>
            <span className="text-xs text-gray-500">• {article.readTime}</span>
          </div>

          <button
            onClick={() => setSelectedPublicArticle(null)}
            className="w-9 h-9 rounded-full bg-[#faf8ff] hover:bg-[#eaedff] text-gray-600 flex items-center justify-center transition-colors"
            aria-label="Tutup Artikel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Title & Metadata */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#131b2e] leading-snug">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-gray-500 pb-2 border-b border-[#eaedff]">
              <div className="flex items-center gap-1.5 font-medium text-[#131b2e]">
                <User className="w-3.5 h-3.5 text-[#4648d4]" />
                <span>{article.author || settings.ownerName}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.publishDate}</span>
              </div>
            </div>
          </div>

          {/* Cover */}
          <div className="rounded-2xl overflow-hidden bg-[#e2e7ff] border border-[#eaedff]">
            <img
              src={article.coverImage}
              alt={article.coverAlt || article.title}
              className="w-full max-h-[340px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Body Content */}
          <div className="prose prose-sm sm:prose max-w-none text-[#464554] space-y-4 leading-relaxed font-normal">
            {article.content.split('\n\n').map((paragraph, pIdx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={pIdx} className="text-lg font-bold text-[#131b2e] pt-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                return (
                  <div key={pIdx} className="p-3 bg-[#faf8ff] rounded-xl border border-[#eaedff] text-xs sm:text-sm text-[#131b2e]">
                    {paragraph}
                  </div>
                );
              }
              return (
                <p key={pIdx} className="text-sm sm:text-base leading-relaxed text-[#464554]">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-4 border-t border-[#eaedff] flex flex-wrap gap-2">
              {article.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1 rounded-lg bg-[#faf8ff] border border-[#eaedff] text-xs text-[#464554] font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* WhatsApp Discussion CTA */}
          <div className="p-6 rounded-2xl bg-[#eaedff] border border-[#c0c1ff] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-[#131b2e]">
                Ingin Berdiskusi Lebih Dalam Terkait Topik Ini?
              </h4>
              <p className="text-xs text-[#464554]">
                Tanyakan langsung solusi penerapan di bisnis Anda bersama {settings.ownerName || 'Andriawan Delv'}.
              </p>
            </div>
            <button
              onClick={handleDiscussOnWa}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4648d4] text-white font-bold text-xs hover:bg-[#2f2ebe] transition-colors shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Diskusi via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
