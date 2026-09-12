import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, ProjectCategory } from '../../types';
import { 
  ArrowUpRight, 
  Layers, 
  Sparkles, 
  ExternalLink, 
  Code2, 
  Eye, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const Portfolio: React.FC = () => {
  const { projects, setSelectedPublicProject } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'Semua Project' },
    { key: 'pos', label: 'POS & Kasir' },
    { key: 'webapp', label: 'Web App & Manajemen' },
    { key: 'digital_product', label: 'Digital Product' },
    { key: 'saas', label: 'SaaS & Fintech' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (p.status !== 'Published') return false;
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <section id="portfolio" className="py-24 bg-white border-y border-[#eaedff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eaedff] text-xs font-bold text-[#4648d4] tracking-wide">
              <span>PORTFOLIO TERPILIH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#131b2e] tracking-tight">
              Studi Kasus & Rekayasa Sistem Nyata
            </h2>
            <p className="text-sm sm:text-base text-[#464554]">
              Setiap proyek dirancang untuk memecahkan masalah nyata klien dengan metrik efisiensi yang terukur.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#faf8ff] p-1.5 rounded-2xl border border-[#eaedff]">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat.key
                    ? 'bg-[#4648d4] text-white shadow-sm'
                    : 'text-[#464554] hover:text-[#131b2e] hover:bg-[#eaedff]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="bg-[#faf8ff] rounded-3xl overflow-hidden border border-[#eaedff] hover:border-[#c0c1ff] hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Thumbnail Container */}
              <div 
                className="relative aspect-[16/10] overflow-hidden bg-[#e2e7ff] cursor-pointer"
                onClick={() => setSelectedPublicProject(project)}
              >
                <img
                  src={project.coverImage}
                  alt={project.coverAlt || project.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md text-xs font-bold text-[#131b2e]">
                    <Eye className="w-3.5 h-3.5 text-[#4648d4]" />
                    <span>Buka Studi Kasus Lengkap</span>
                  </span>
                </div>

                {project.isFeatured && (
                  <div className="absolute top-3 left-3 bg-[#4648d4] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Featured Project</span>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Category & Client */}
                  <div className="flex items-center justify-between text-xs text-[#464554]">
                    <span className="font-semibold text-[#4648d4] bg-[#eaedff] px-2.5 py-0.5 rounded-md">
                      {project.categoryLabel}
                    </span>
                    <span>{project.client}</span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 
                    onClick={() => setSelectedPublicProject(project)}
                    className="text-lg font-bold text-[#131b2e] group-hover:text-[#4648d4] transition-colors cursor-pointer line-clamp-1"
                  >
                    {project.name}
                  </h3>
                  <p className="text-xs text-[#464554] line-clamp-2 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Impact Metrics Banner */}
                  {project.results && project.results.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#eaedff]">
                      {project.results.slice(0, 2).map((res, rIdx) => (
                        <div key={rIdx} className="bg-white p-2.5 rounded-xl border border-[#eaedff]">
                          <span className="text-xs font-extrabold text-[#4648d4] block">
                            {res.metric}
                          </span>
                          <span className="text-[10px] text-gray-500 font-medium block truncate">
                            {res.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack.slice(0, 3).map((stack, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-medium bg-white text-[#464554] px-2 py-0.5 rounded-md border border-[#eaedff]"
                      >
                        {stack}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[10px] font-medium text-gray-400 self-center">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#eaedff] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedPublicProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#4648d4] hover:text-[#2f2ebe]"
                  >
                    <span>Studi Kasus Lengkap</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-[#131b2e] px-2 py-1 rounded-lg hover:bg-[#eaedff] transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
