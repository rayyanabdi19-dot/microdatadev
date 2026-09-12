import React from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_SERVICES, SKILL_CATEGORIES } from '../../data/initialData';
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';

export const Services: React.FC = () => {
  const { openContactModal } = useApp();

  return (
    <section id="layanan" className="py-24 bg-[#faf8ff] ambient-radial-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eaedff] text-xs font-bold text-[#4648d4] tracking-wide">
            <span>LAYANAN SPESIALIS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#131b2e] tracking-tight">
            Solusi Rekayasa Perangkat Lunak untuk Kebutuhan Riil Bisnis Anda
          </h2>
          <p className="text-base text-[#464554] leading-relaxed">
            Dari sistem kasir ritel berkecepatan tinggi hingga portal otomatisasi berbasis AI, 
            setiap arsitektur dibangun untuk memangkas biaya operasional dan mempercepat pertumbuhan.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl p-7 border border-[#eaedff] shadow-xs hover:shadow-xl hover:border-[#c0c1ff] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Service Icon with Material Symbol */}
                <div className="w-13 h-13 rounded-2xl bg-[#eaedff] text-[#4648d4] flex items-center justify-center mb-5 group-hover:bg-[#4648d4] group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-2xl">
                    {srv.icon}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#131b2e] mb-3 group-hover:text-[#4648d4] transition-colors">
                  {srv.title}
                </h3>

                <p className="text-sm text-[#464554] leading-relaxed mb-6">
                  {srv.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#eaedff]/60">
                <button
                  onClick={() => openContactModal({ solution: srv.title })}
                  className="w-full inline-flex items-center justify-between text-xs font-bold text-[#4648d4] hover:text-[#2f2ebe] py-2 transition-colors group-hover:translate-x-0.5"
                >
                  <span>Konsultasikan Layanan Ini</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Skills & Tech Stack Matrix */}
        <div className="mt-20 pt-16 border-t border-[#eaedff]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-[#131b2e]">
              Teknologi & Ekosistem yang Teruji
            </h3>
            <p className="text-xs sm:text-sm text-[#464554] mt-2">
              Bukan sekadar mengikuti tren, kami memilih alat yang terbukti stabil, cepat, dan memiliki komunitas jangka panjang.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-xs rounded-2xl p-6 border border-[#eaedff] shadow-xs"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#eaedff] text-[#4648d4] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">
                      {cat.icon}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#131b2e]">
                    {cat.title}
                  </h4>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-lg bg-[#faf8ff] border border-[#eaedff] text-[11px] font-medium text-[#464554] hover:border-[#c0c1ff] hover:text-[#4648d4] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
