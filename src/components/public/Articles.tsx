import React from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, Calendar, ArrowUpRight, BookOpen } from 'lucide-react';

export const Articles: React.FC = () => {
  const { articles, setSelectedPublicArticle } = useApp();

  const publishedArticles = articles.filter((a) => a.status === 'Published');

  return (
    <section id="artikel" className="py-24 bg-white border-b border-[#eaedff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eaedff] text-xs font-bold text-[#4648d4] tracking-wide">
            <span>ARTIKEL & WAWASAN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#131b2e] tracking-tight">
            Edukasi Teknologi untuk Keputusan Bisnis yang Tepat
          </h2>
          <p className="text-sm sm:text-base text-[#464554] leading-relaxed">
            Tulisan praktis mengenai sistem kasir modern, arsitektur software offline-first, otomasi AI, dan panduan memilih vendor yang kredibel.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedArticles.slice(0, 6).map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedPublicArticle(article)}
              className="bg-[#faf8ff] rounded-3xl overflow-hidden border border-[#eaedff] hover:border-[#c0c1ff] hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#e2e7ff]">
                <img
                  src={article.coverImage}
                  alt={article.coverAlt || article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#4648d4] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                  {article.categoryLabel}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#4648d4]" />
                      <span>{article.readTime}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.publishDate}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#131b2e] group-hover:text-[#4648d4] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#464554] line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#eaedff] flex items-center justify-between text-xs font-bold text-[#4648d4]">
                  <span>Baca Selengkapnya</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
