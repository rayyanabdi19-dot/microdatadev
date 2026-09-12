import React from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, ArrowUp, Github, Linkedin, Instagram, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setViewMode } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#131b2e] text-white pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-800">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4648d4] to-[#6b38d4] flex items-center justify-center text-white font-black text-xl">
                2R
              </div>
              <span className="text-xl font-bold tracking-tight">
                {settings.brandName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              Personal Engineering Studio Andriawan Delv. Membangun sistem kasir ritel cloud, aplikasi web internal, dan otomasi bisnis berkinerja tinggi.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {settings.githubActive && (
                <a
                  href={settings.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {settings.linkedinActive && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {settings.instagramActive && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#tentang" className="hover:text-[#c0c1ff] transition-colors">Tentang & Filosofi</a></li>
              <li><a href="#layanan" className="hover:text-[#c0c1ff] transition-colors">Layanan Spesialis</a></li>
              <li><a href="#portfolio" className="hover:text-[#c0c1ff] transition-colors">Portfolio & Studi Kasus</a></li>
              <li><a href="#alur-kerja" className="hover:text-[#c0c1ff] transition-colors">Alur Kerja & Metodologi</a></li>
              <li><a href="#artikel" className="hover:text-[#c0c1ff] transition-colors">Artikel & Edukasi</a></li>
              <li><a href="#kontak" className="hover:text-[#c0c1ff] transition-colors">Formulir Konsultasi</a></li>
            </ul>
          </div>

          {/* Portal Akses & Hubungi */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Pusat Kendali Pengelola
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Login ke Admin Studio Console untuk mengelola artikel, menambah proyek baru, meninjau status pesan masuk CRM, dan memperbarui profil CMS.
            </p>
            <button
              onClick={() => setViewMode('admin')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-[#c0c1ff] text-xs font-bold border border-gray-700 transition-all hover:border-[#4648d4]"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Buka Admin Console CMS</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2025 - 2026 {settings.brandName} • {settings.ownerName || 'Andriawan Delv'}. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
