import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Menu, 
  X, 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  ExternalLink,
  PhoneCall,
  LayoutDashboard,
  Bot
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { settings, setViewMode, openContactModal, isAdminLoggedIn, openAIChat } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Tentang', href: '#tentang' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Alur Kerja', href: '#alur-kerja' },
    { label: 'Artikel & Edukasi', href: '#artikel' },
    { label: 'Kontak', href: '#kontak' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#faf8ff]/90 backdrop-blur-md shadow-sm border-b border-[#eaedff]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a
            id="brand-logo-link"
            href="#"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4648d4] to-[#6b38d4] flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              2R
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#131b2e] block">
                {settings.brandName}
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-[#4648d4] block">
                Personal Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[#464554] hover:text-[#4648d4] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* AI Assistant Quick Trigger */}
            <button
              id="nav-btn-ai-assistant"
              onClick={() => openAIChat()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-[#4648d4]/10 to-[#6b38d4]/10 text-[#4648d4] hover:bg-[#eaedff] transition-colors border border-[#c0c1ff]/60 cursor-pointer"
              title="Tanya AI Asisten Studio"
            >
              <Bot className="w-3.5 h-3.5 text-[#4648d4]" />
              <span>Tanya AI</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            {/* Admin Console Portal Shortcut */}
            <button
              id="nav-btn-admin-portal"
              onClick={() => setViewMode('admin')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#eaedff] text-[#4648d4] hover:bg-[#dae2fd] transition-colors border border-[#c0c1ff]/50"
              title="Akses Admin Console CMS"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin Console</span>
              {isAdminLoggedIn && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </button>

            {/* Direct WhatsApp Call */}
            <a
              id="nav-btn-wa-direct"
              href={`https://wa.me/${settings.waNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                'Halo Mas Andriawan Delv, saya ingin konsultasi kebutuhan sistem digital bisnis saya.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-[#006577] hover:bg-[#e2f7fb] transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{settings.waNumber}</span>
            </a>

            {/* Primary Collaboration CTA */}
            <button
              id="nav-btn-collaborate"
              onClick={() => openContactModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4648d4] to-[#6b38d4] text-white text-sm font-semibold shadow-md shadow-[#4648d4]/20 hover:opacity-95 hover:shadow-lg hover:shadow-[#4648d4]/30 hover:-translate-y-0.5 transition-all"
            >
              <span>Mari Bekerja Sama</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="nav-btn-admin-mobile"
              onClick={() => setViewMode('admin')}
              className="p-2 rounded-lg bg-[#eaedff] text-[#4648d4] text-xs font-semibold flex items-center gap-1"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#131b2e] hover:bg-[#eaedff] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf8ff] border-b border-[#eaedff] px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-[#131b2e] hover:text-[#4648d4] py-1 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#eaedff] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAIChat();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#eaedff] text-[#4648d4] font-semibold text-sm border border-[#c0c1ff]/60"
            >
              <Bot className="w-4 h-4" />
              <span>Tanya AI Asisten Pelanggan</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setViewMode('admin');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-100 text-[#131b2e] font-semibold text-sm"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Akses Admin Console CMS</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openContactModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#4648d4] to-[#6b38d4] text-white font-semibold text-sm shadow-md"
            >
              <span>Mari Bekerja Sama</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
