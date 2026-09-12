import React from 'react';
import { useApp } from '../../context/AppContext';
import { WORKFLOW_STEPS } from '../../data/initialData';
import { Star, Quote, Sparkles } from 'lucide-react';

export const Process: React.FC = () => {
  const { testimonials } = useApp();

  return (
    <section id="alur-kerja" className="py-24 bg-[#faf8ff] ambient-radial-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eaedff] text-xs font-bold text-[#4648d4] tracking-wide">
            <span>METODOLOGI EKSEKUSI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#131b2e] tracking-tight">
            6 Tahap Alur Kerja Terstruktur & Transparan
          </h2>
          <p className="text-sm sm:text-base text-[#464554] leading-relaxed">
            Menghindari proyek macet atau biaya membengkak dengan proses kolaboratif terukur dari hari pertama hingga pasca peluncuran.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKFLOW_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-white rounded-3xl p-7 border border-[#eaedff] shadow-xs hover:border-[#c0c1ff] transition-all relative overflow-hidden"
            >
              <div className="text-5xl font-black text-[#eaedff] absolute -top-1 right-4 select-none">
                {step.step}
              </div>
              <div className="relative z-10 space-y-3">
                <span className="inline-block px-2.5 py-1 rounded-lg bg-[#eaedff] text-xs font-extrabold text-[#4648d4]">
                  Fase {step.step}
                </span>
                <h3 className="text-base font-bold text-[#131b2e]">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#464554] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mt-24 pt-16 border-t border-[#eaedff]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-[#131b2e]">
              Pengalaman Para Klien & Mitra Bisnis
            </h3>
            <p className="text-xs sm:text-sm text-[#464554] mt-2">
              Kepercayaan dibangun dari ketepatan waktu, kualitas kode, dan kesiapan mendampingi saat sistem berjalan live.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testi) => (
              <div
                key={testi.id}
                className="bg-white rounded-2xl p-6 border border-[#eaedff] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#464554] leading-relaxed italic mb-6">
                    "{testi.content}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#eaedff] flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-xs"
                    style={{ backgroundColor: testi.accentColor }}
                  >
                    {testi.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#131b2e]">
                      {testi.name}
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      {testi.role}, {testi.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
