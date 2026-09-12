import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  Code2, 
  ShieldCheck, 
  Layers, 
  MessageSquare,
  Flame,
  Bot
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { settings, openContactModal, openAIChat } = useApp();

  return (
    <section
      id="beranda"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden ambient-radial-glow"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action Triggers */}
          <div className="lg:col-span-7 space-y-8">
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#eaedff] border border-[#c0c1ff]/60 text-xs font-semibold text-[#4648d4] shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{settings.availableSlot}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#131b2e] leading-[1.15]">
              Solusi Bisnis Digital &{' '}
              <span className="bg-gradient-to-r from-[#4648d4] via-[#6b38d4] to-[#006577] bg-clip-text text-transparent">
                Aplikasi Kasir Cloud
              </span>{' '}
              Berbasis Dampak Nyata.
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-[#464554] leading-relaxed max-w-2xl">
              {settings.subheadline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                id="hero-btn-portfolio"
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4648d4] to-[#6b38d4] text-white text-base font-semibold shadow-lg shadow-[#4648d4]/25 hover:shadow-xl hover:shadow-[#4648d4]/35 hover:-translate-y-0.5 transition-all"
              >
                <span>Lihat Studi Kasus & Portfolio</span>
                <ArrowUpRight className="w-5 h-5" />
              </a>

              <button
                id="hero-btn-ai-chat"
                onClick={() => openAIChat()}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#eaedff] text-[#4648d4] hover:bg-[#dae2fd] text-base font-semibold border border-[#c0c1ff] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Bot className="w-5 h-5 text-[#4648d4]" />
                <span>Tanya AI Asisten</span>
              </button>

              <button
                id="hero-btn-consultation"
                onClick={() => openContactModal({ solution: 'Konsultasi Kebutuhan Sistem' })}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white text-[#131b2e] hover:bg-gray-50 text-base font-semibold border border-[#eaedff] hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <span>Konsultasi WA</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-[#eaedff] flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-[#464554]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">100% Hak Milik Source Code</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span className="font-medium">Garansi Bebas Bug 90 Hari</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="font-medium">UX Ringan & Ramah Tablet</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Portrait & Floating Tech Badges */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Decorative Backing Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#4648d4]/20 via-[#6b38d4]/20 to-[#008096]/20 rounded-3xl blur-2xl -z-10" />

              {/* Card Container */}
              <div className="relative rounded-3xl bg-white p-4 shadow-xl border border-[#eaedff]">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#e2e7ff]">
                  <img
                    src={settings.avatarUrl}
                    alt={settings.ownerName}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/70 via-transparent to-transparent" />
                  
                  {/* Bottom Portrait Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-lg font-bold">{settings.ownerName}</p>
                    <p className="text-xs text-[#e1e0ff]">Full Stack Engineer & Solution Architect</p>
                  </div>
                </div>

                {/* Floating Badge: POS Kasir */}
                <div className="absolute -top-3 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg border border-[#eaedff] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 font-medium block">Spesialisasi</span>
                    <span className="text-xs font-bold text-[#131b2e]">POS Cloud Offline-First</span>
                  </div>
                </div>

                {/* Floating Badge: High Impact Stat */}
                <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-[#eaedff] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4648d4] to-[#6b38d4] flex items-center justify-center text-white">
                    <Flame className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <span className="text-sm font-extrabold text-[#131b2e]">+300% Checkout</span>
                    <span className="text-[10px] text-gray-500 block">Efisiensi Transaksi Ritel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Key Performance Metrics Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#eaedff] shadow-xs">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#4648d4]">5+</div>
            <div className="text-sm font-semibold text-[#131b2e] mt-1">Tahun Pengalaman</div>
            <div className="text-xs text-[#464554] mt-0.5">Software Engineering & Ritel</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#eaedff] shadow-xs">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#6b38d4]">14+</div>
            <div className="text-sm font-semibold text-[#131b2e] mt-1">Project Sukses Rilis</div>
            <div className="text-xs text-[#464554] mt-0.5">POS, Web App, & Produk Digital</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#eaedff] shadow-xs">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#006577]">99.98%</div>
            <div className="text-sm font-semibold text-[#131b2e] mt-1">Stabilitas Sistem</div>
            <div className="text-xs text-[#464554] mt-0.5">Arsitektur Cloud Tangguh</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#eaedff] shadow-xs">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600">100%</div>
            <div className="text-sm font-semibold text-[#131b2e] mt-1">Source Code Klien</div>
            <div className="text-xs text-[#464554] mt-0.5">Tanpa Lock-in Vendor</div>
          </div>
        </div>
      </div>
    </section>
  );
};
