import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { SiteSettings } from '../../types';
import { 
  Settings, 
  Save, 
  User, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin, 
  Instagram, 
  CheckCircle2, 
  Sparkles,
  Camera,
  Upload,
  Image as ImageIcon,
  Check,
  RotateCcw,
  X
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings, showToast, projects, articles } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryTab, setGalleryTab] = useState<'presets' | 'portfolio' | 'articles' | 'custom'>('presets');

  const getCleanSettings = (s: SiteSettings): SiteSettings => ({
    ...s,
    avatarUrl: s.avatarUrl || '',
    ownerName: s.ownerName || '',
    brandName: s.brandName || '',
    headline: s.headline || '',
    subheadline: s.subheadline || '',
    bio: s.bio || '',
    titleRole: s.titleRole || 'Software Architect & Retail POS Specialist',
    bioSummary: s.bioSummary || s.bio || '',
    availabilityStatus: s.availabilityStatus || 'Tersedia untuk Proyek Q2/Q3 2026',
    availabilityDot: s.availabilityDot ?? true,
    availableSlot: s.availableSlot || 'Tersedia untuk 2 Project Baru Q2 2026',
    isAvailableForProjects: s.isAvailableForProjects ?? true,
    waNumber: s.waNumber || '',
    waVerified: s.waVerified ?? true,
    publicEmail: s.publicEmail || '',
    location: s.location || '',
    github: s.github || '',
    githubActive: s.githubActive ?? true,
    linkedin: s.linkedin || '',
    linkedinActive: s.linkedinActive ?? true,
    instagram: s.instagram || '',
    instagramActive: s.instagramActive ?? true,
    tiktok: s.tiktok || '',
    tiktokActive: s.tiktokActive ?? false,
    cvFileName: s.cvFileName || '',
    cvFileSize: s.cvFileSize || '',
    cvUpdateDate: s.cvUpdateDate || '',
    cvDownloads: s.cvDownloads ?? 0,
    cvShowOnHomepage: s.cvShowOnHomepage ?? true,
    waTemplate: s.waTemplate || '',
    waAutoForward: s.waAutoForward ?? true,
    metaTitle: s.metaTitle || '',
    metaDescription: s.metaDescription || '',
    googleAnalyticsId: s.googleAnalyticsId || '',
    searchConsoleToken: s.searchConsoleToken || '',
    ogImage: s.ogImage || '',
  });

  const [formData, setFormData] = useState<SiteSettings>(() => getCleanSettings(settings));

  useEffect(() => {
    setFormData(getCleanSettings(settings));
  }, [settings]);

  // Handle upload from device gallery / camera
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast('Ukuran foto terlalu besar (maksimal 5MB)', 'error');
      return;
    }

    // Convert image file to Data URL for instant preview and offline persistence
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setFormData((prev) => ({
          ...prev,
          avatarUrl: result,
          ogImage: prev.ogImage === prev.avatarUrl ? result : prev.ogImage,
        }));
        showToast('Foto berhasil dimuat dari galeri perangkat!', 'success');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Preset professional avatar options
  const presetAvatars = [
    {
      id: 'default',
      label: 'Foto Profil Utama (Studio)',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUS4zMVjhR_8gaK_GZoqPt9Y-fzbe8s8HaYHuJgQioOGQuIY3AochANBXD8Ax7KpyjzS6ey4QS5uGvEFv1IaXnlrV3TCGqN1tJ_3kdtm_848wrG3XUGDp79V9Y8t0vrj35eg9mJ2KaLx5RKoHGzTBZJkaD5UNsnRw51sse6-E1TtgNO0L3Uf4W1ruPWSoYhN0Mj0HlmGNQMcN_ZZ--TQe78LzTHSxPkPz7HWZU7nFBRaogBQ7y1z7c',
    },
    {
      id: 'casual_tech',
      label: 'Tech Architect (Navy)',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'executive_formal',
      label: 'Professional Formal (Dark)',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'workspace_coder',
      label: 'Developer at Workspace',
      url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'minimal_creative',
      label: 'Creative Minimalist',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // Portfolio image gallery pool
  const portfolioImages = projects.flatMap((p) => [
    { source: `${p.name} (Cover)`, url: p.coverImage },
    ...(p.gallery || []).map((imgUrl, i) => ({ source: `${p.name} (Galeri #${i + 1})`, url: imgUrl })),
  ]).filter((item) => Boolean(item.url));

  // Article image gallery pool
  const articleImages = articles.map((a) => ({
    source: `${a.title} (Cover Artikel)`,
    url: a.coverImage,
  })).filter((item) => Boolean(item.url));

  const handleSelectFromGallery = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      avatarUrl: url,
    }));
    setIsGalleryModalOpen(false);
    showToast('Foto profil berhasil dipilih dari galeri!', 'success');
  };

  const handleResetToDefault = () => {
    setFormData((prev) => ({
      ...prev,
      avatarUrl: presetAvatars[0].url,
    }));
    showToast('Foto profil dikembalikan ke foto awal studio', 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Hidden File Input for Device Gallery / Camera */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#131b2e] tracking-tight">
            Pengaturan Profil CMS & Identitas Studio
          </h1>
          <p className="text-xs sm:text-sm text-[#464554] mt-1">
            Perbarui identitas profil arsitek, foto personal dari galeri/perangkat, status ketersediaan proyek, dan kontak resmi.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#4648d4] hover:bg-[#2f2ebe] text-white text-xs font-bold shadow-md shadow-[#4648d4]/20 transition-all cursor-pointer"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Simpan Perubahan</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Profil & Identitas Utama */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eaedff] shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
              <User className="w-4 h-4 text-[#4648d4]" />
              <span>Identitas Personal & Studio</span>
            </h2>
            <span className="text-[11px] font-medium text-[#464554] bg-[#faf8ff] px-2.5 py-1 rounded-lg border border-[#eaedff]">
              Tampil di Hero, About, & Navigasi
            </span>
          </div>

          {/* Avatar & Photo Picker Section */}
          <div className="p-5 rounded-2xl bg-[#faf8ff] border border-[#eaedff] space-y-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {/* Photo Preview Container */}
              <div className="relative group shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-[#e2e7ff] relative">
                  <img
                    src={formData.avatarUrl || presetAvatars[0].url}
                    alt={formData.ownerName || 'Foto Profil'}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = presetAvatars[0].url;
                    }}
                  />
                  {/* Hover Overlay with Camera */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer"
                    title="Ganti Foto dari Galeri"
                  >
                    <Upload className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold">Ganti Foto</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-[#4648d4] hover:bg-[#2f2ebe] text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:scale-105"
                  title="Upload Foto dari HP / Laptop"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Action Controls for Photo */}
              <div className="space-y-3 flex-1 text-center sm:text-left">
                <div>
                  <h3 className="text-xs font-bold text-[#131b2e]">
                    Foto Personal & Avatar Studio
                  </h3>
                  <p className="text-[11px] text-[#464554] mt-0.5">
                    Pilih foto langsung dari <strong>galeri HP/laptop</strong>, ambil dari <strong>galeri aset/portofolio</strong>, atau masukkan tautan URL gambar.
                  </p>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#4648d4] text-white text-xs font-semibold hover:bg-[#2f2ebe] shadow-xs cursor-pointer transition-all hover:-translate-y-0.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload dari Galeri / Kamera</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsGalleryModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#4648d4] border border-[#c0c1ff] text-xs font-semibold hover:bg-[#eaedff] cursor-pointer transition-all hover:-translate-y-0.5"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Buka Galeri Foto Studio</span>
                  </button>

                  {formData.avatarUrl !== presetAvatars[0].url && (
                    <button
                      type="button"
                      onClick={handleResetToDefault}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 text-xs font-medium cursor-pointer transition-colors"
                      title="Kembalikan ke foto bawaan"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Foto Awal</span>
                    </button>
                  )}
                </div>

                {/* Direct URL input field with quick collapse/helper */}
                <div className="pt-2">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Atau Input Langsung Tautan URL Gambar:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={formData.avatarUrl ?? ''}
                      onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                      placeholder="https://... / data:image/..."
                      className="w-full px-3 py-1.5 rounded-xl border border-[#eaedff] bg-white text-xs outline-none focus:border-[#4648d4]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Preset Avatars Carousel */}
            <div className="pt-3 border-t border-[#eaedff]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#131b2e] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pilihan Cepat Foto Personal:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(true)}
                  className="text-[11px] font-semibold text-[#4648d4] hover:underline"
                >
                  Lihat Semua Galeri ({presetAvatars.length + portfolioImages.length})
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {presetAvatars.map((preset) => {
                  const isSelected = formData.avatarUrl === preset.url;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectFromGallery(preset.url)}
                      className={`relative p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-2 ${
                        isSelected
                          ? 'border-[#4648d4] bg-[#eaedff] shadow-xs'
                          : 'border-[#eaedff] bg-white hover:border-[#c0c1ff] hover:bg-gray-50'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-8 h-8 rounded-lg object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="overflow-hidden">
                        <p className="text-[10px] font-bold text-[#131b2e] truncate">{preset.label}</p>
                        <p className="text-[9px] text-[#464554]">
                          {isSelected ? '✓ Terpilih' : 'Klik Pilih'}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#4648d4] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1">
                Nama Lengkap Arsitek
              </label>
              <input
                type="text"
                value={formData.ownerName ?? ''}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1">
                Nama Brand / Studio
              </label>
              <input
                type="text"
                value={formData.brandName ?? ''}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#131b2e] mb-1">
              Gelar / Subtitle Profesi
            </label>
            <input
              type="text"
              value={formData.titleRole ?? ''}
              onChange={(e) => setFormData({ ...formData, titleRole: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#131b2e] mb-1">
              Ringkasan Bio & Filosofi Desain Sistem
            </label>
            <textarea
              rows={3}
              value={formData.bioSummary ?? ''}
              onChange={(e) => setFormData({ ...formData, bioSummary: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaedff] text-xs leading-relaxed outline-none focus:border-[#4648d4] resize-none"
            />
          </div>
        </div>

        {/* 2. Status Ketersediaan */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eaedff] shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Status Ketersediaan Proyek (Public Badge)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1">
                Teks Badge Ketersediaan
              </label>
              <input
                type="text"
                value={formData.availabilityStatus ?? ''}
                onChange={(e) => setFormData({ ...formData, availabilityStatus: e.target.value })}
                placeholder="Tersedia untuk Proyek Q2/Q3 2026"
                className="w-full px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
              <div>
                <span className="text-xs font-bold text-[#131b2e] block">
                  Tampilkan Badge Hijau Berkedip
                </span>
                <span className="text-[10px] text-gray-500">
                  Menandakan Anda sedang aktif menerima konsultasi
                </span>
              </div>
              <input
                type="checkbox"
                checked={Boolean(formData.availabilityDot)}
                onChange={(e) => setFormData({ ...formData, availabilityDot: e.target.checked })}
                className="rounded text-[#4648d4] w-4 h-4"
              />
            </div>
          </div>
        </div>

        {/* 3. Kontak & Saluran Komunikasi */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eaedff] shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#4648d4]" />
            <span>Kontak Resmi & Basis Operasional</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1">
                Nomor WhatsApp Resmi
              </label>
              <input
                type="text"
                value={formData.waNumber ?? ''}
                onChange={(e) => setFormData({ ...formData, waNumber: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1">
                Email Bisnis
              </label>
              <input
                type="email"
                value={formData.publicEmail ?? ''}
                onChange={(e) => setFormData({ ...formData, publicEmail: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#131b2e] mb-1">
                Lokasi Domisili
              </label>
              <input
                type="text"
                value={formData.location ?? ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs"
              />
            </div>
          </div>
        </div>

        {/* 4. Social Links */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eaedff] shadow-xs space-y-4">
          <h2 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#4648d4]" />
            <span>Tautan Jejaring Sosial & Portofolio Eksternal</span>
          </h2>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-gray-700 shrink-0" />
              <input
                type="url"
                value={formData.github ?? ''}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                placeholder="https://github.com/delva-andriawan"
                className="flex-1 px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs"
              />
              <label className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.githubActive)}
                  onChange={(e) => setFormData({ ...formData, githubActive: e.target.checked })}
                  className="rounded text-[#4648d4]"
                />
                <span>Aktif</span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <Linkedin className="w-5 h-5 text-blue-600 shrink-0" />
              <input
                type="url"
                value={formData.linkedin ?? ''}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/delva-andriawan"
                className="flex-1 px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs"
              />
              <label className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.linkedinActive)}
                  onChange={(e) => setFormData({ ...formData, linkedinActive: e.target.checked })}
                  className="rounded text-[#4648d4]"
                />
                <span>Aktif</span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <Instagram className="w-5 h-5 text-pink-600 shrink-0" />
              <input
                type="url"
                value={formData.instagram ?? ''}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="https://instagram.com/delva.andriawan"
                className="flex-1 px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs"
              />
              <label className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.instagramActive)}
                  onChange={(e) => setFormData({ ...formData, instagramActive: e.target.checked })}
                  className="rounded text-[#4648d4]"
                />
                <span>Aktif</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4648d4] to-[#6b38d4] hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-[#4648d4]/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Semua Pengaturan CMS</span>
          </button>
        </div>
      </form>

      {/* Interactive Gallery Modal */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#eaedff] overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#eaedff] flex items-center justify-between bg-[#faf8ff]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#eaedff] text-[#4648d4] flex items-center justify-center">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#131b2e]">
                    Galeri Foto Profil & Aset Studio
                  </h3>
                  <p className="text-xs text-[#464554]">
                    Pilih foto personal dari koleksi foto studio, galeri portofolio, atau upload foto baru
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsGalleryModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Gallery Tabs */}
            <div className="px-6 pt-4 pb-2 border-b border-[#eaedff] flex items-center gap-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => setGalleryTab('presets')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  galleryTab === 'presets'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'bg-[#faf8ff] text-gray-600 hover:bg-gray-100 border border-[#eaedff]'
                }`}
              >
                Foto Profil Studio ({presetAvatars.length})
              </button>
              <button
                type="button"
                onClick={() => setGalleryTab('portfolio')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  galleryTab === 'portfolio'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'bg-[#faf8ff] text-gray-600 hover:bg-gray-100 border border-[#eaedff]'
                }`}
              >
                Galeri Portfolio ({portfolioImages.length})
              </button>
              <button
                type="button"
                onClick={() => setGalleryTab('articles')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  galleryTab === 'articles'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'bg-[#faf8ff] text-gray-600 hover:bg-gray-100 border border-[#eaedff]'
                }`}
              >
                Media Artikel ({articleImages.length})
              </button>
            </div>

            {/* Gallery Content */}
            <div className="p-6 overflow-y-auto max-h-[55vh] space-y-4">
              {/* Presets Grid */}
              {galleryTab === 'presets' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {presetAvatars.map((preset) => {
                    const isSelected = formData.avatarUrl === preset.url;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => handleSelectFromGallery(preset.url)}
                        className={`group relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer flex flex-col bg-[#faf8ff] ${
                          isSelected
                            ? 'border-[#4648d4] ring-2 ring-[#4648d4]/20 shadow-md'
                            : 'border-[#eaedff] hover:border-[#c0c1ff] hover:shadow-sm'
                        }`}
                      >
                        <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100 relative">
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#4648d4] text-white flex items-center justify-center shadow-md">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                        <div className="p-2.5">
                          <p className="text-xs font-bold text-[#131b2e] truncate">{preset.label}</p>
                          <p className="text-[10px] text-[#464554] mt-0.5">
                            {isSelected ? '✓ Foto Aktif' : 'Klik untuk Gunakan'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Portfolio Images Grid */}
              {galleryTab === 'portfolio' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {portfolioImages.map((img, idx) => {
                    const isSelected = formData.avatarUrl === img.url;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectFromGallery(img.url)}
                        className={`group relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer flex flex-col bg-[#faf8ff] ${
                          isSelected
                            ? 'border-[#4648d4] ring-2 ring-[#4648d4]/20'
                            : 'border-[#eaedff] hover:border-[#c0c1ff]'
                        }`}
                      >
                        <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                          <img
                            src={img.url}
                            alt={img.source}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#4648d4] text-white flex items-center justify-center shadow-md">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                        <div className="p-2">
                          <p className="text-[11px] font-semibold text-[#131b2e] truncate">{img.source}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Article Images Grid */}
              {galleryTab === 'articles' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {articleImages.map((img, idx) => {
                    const isSelected = formData.avatarUrl === img.url;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectFromGallery(img.url)}
                        className={`group relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer flex flex-col bg-[#faf8ff] ${
                          isSelected
                            ? 'border-[#4648d4] ring-2 ring-[#4648d4]/20'
                            : 'border-[#eaedff] hover:border-[#c0c1ff]'
                        }`}
                      >
                        <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                          <img
                            src={img.url}
                            alt={img.source}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#4648d4] text-white flex items-center justify-center shadow-md">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                        <div className="p-2">
                          <p className="text-[11px] font-semibold text-[#131b2e] truncate">{img.source}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#eaedff] bg-gray-50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#c0c1ff] text-[#4648d4] text-xs font-bold hover:bg-[#eaedff] cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Foto Baru dari Perangkat</span>
              </button>

              <button
                type="button"
                onClick={() => setIsGalleryModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#4648d4] text-white text-xs font-bold hover:bg-[#2f2ebe] cursor-pointer"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
