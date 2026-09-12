import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileText, 
  Download, 
  MessageSquare, 
  Target, 
  Cpu, 
  Smile, 
  ShieldCheck,
  CheckCircle,
  Sparkles
} from 'lucide-react';

export const About: React.FC = () => {
  const { settings, openContactModal, showToast } = useApp();

  const handleDownloadCV = () => {
    showToast(`Mengunduh ${settings.cvFileName}...`, 'success');
  };

  const pillars = [
    {
      icon: Target,
      title: 'Problem-First Mindset',
      description: 'Tidak sekadar mengetik kode, melainkan membedah alur operasional dan hambatan finansial bisnis Anda untuk menghasilkan solusi yang berdampak nyata.',
      color: 'text-[#4648d4]',
      bg: 'bg-[#eaedff]',
    },
    {
      icon: Cpu,
      title: 'Arsitektur Bersih & Skalabel',
      description: 'Struktur kode modular dan basis data terindeks rapi, siap bertumbuh dari 1 outlet kasir hingga puluhan cabang multi-gudang tanpa refactoring mahal.',
      color: 'text-[#6b38d4]',
      bg: 'bg-[#f2eaff]',
    },
    {
      icon: Smile,
      title: 'UX Ramah Karyawan Non-Teknis',
      description: 'Dirancang ergonomis dengan target sentuh jempol yang presisi, kontras tinggi, dan shortcut keyboard agar kasir tidak salah input di jam sibuk.',
      color: 'text-[#006577]',
      bg: 'bg-[#e0f7fa]',
    },
    {
      icon: ShieldCheck,
      title: 'Garansi & Transparansi 100%',
      description: 'Kepemilikan penuh hak cipta dan repository source code Anda tanpa biaya sewa tersembunyi, didukung garansi perbaikan bug purna rilis.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <section id="tentang" className="py-24 bg-white border-y border-[#eaedff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Personal Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eaedff] text-xs font-bold text-[#4648d4] tracking-wide">
              <span>TENTANG SAYA & FILOSOFI</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#131b2e] tracking-tight leading-tight">
              Bukan Sekadar Software Vendor, Tapi Mitra Solusi Bisnis Digital Anda.
            </h2>

            <p className="text-[#464554] text-base sm:text-lg leading-relaxed">
              Halo! Saya <strong className="text-[#131b2e] font-semibold">{settings.ownerName}</strong>, 
              seorang Software Engineer dan Solution Architect yang berfokus membangun sistem kasir ritel (POS Cloud), 
              aplikasi manajemen operasional internal, dan produk digital siap pasar.
            </p>

            <p className="text-[#464554] text-sm sm:text-base leading-relaxed">
              {settings.bio}
            </p>

            {/* Credentials / Core Values */}
            <div className="pt-2 space-y-2.5 text-sm text-[#131b2e] font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#4648d4]" />
                <span>Pengalaman nyata terjun mengamati alur kasir toko fisik & F&B</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#4648d4]" />
                <span>Pemilihan stack teknologi yang efisien & minim biaya maintenance cloud harian</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#4648d4]" />
                <span>Komunikasi proaktif, jujur mengenai batas waktu dan kelayakan teknis</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              {settings.cvShowOnHomepage && (
                <button
                  id="about-btn-download-cv"
                  onClick={handleDownloadCV}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#faf8ff] text-[#131b2e] hover:bg-[#eaedff] border border-[#c0c1ff] text-sm font-semibold transition-all hover:-translate-y-0.5"
                >
                  <Download className="w-4 h-4 text-[#4648d4]" />
                  <span>Unduh Resume / CV (PDF)</span>
                  <span className="text-xs text-gray-400">({settings.cvFileSize})</span>
                </button>
              )}

              <button
                id="about-btn-discuss"
                onClick={() => openContactModal({ solution: 'Diskusi Kebutuhan Project' })}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#4648d4] to-[#6b38d4] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Mulai Diskusi Project</span>
              </button>
            </div>
          </div>

          {/* Right Column: 4 Architecture & Philosophy Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#faf8ff] border border-[#eaedff] hover:border-[#c0c1ff] hover:shadow-md transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl ${pillar.bg} ${pillar.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#131b2e] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#464554] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
