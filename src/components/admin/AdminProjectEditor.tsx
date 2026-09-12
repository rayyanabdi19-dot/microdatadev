import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, ProjectCategory } from '../../types';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Sparkles, 
  Plus, 
  Trash2, 
  Copy, 
  ExternalLink, 
  Upload, 
  Image as ImageIcon,
  CheckCircle2,
  Lock,
  Globe,
  Share2,
  MessageSquare
} from 'lucide-react';

export const AdminProjectEditor: React.FC = () => {
  const { 
    projects, 
    editingProjectId, 
    saveProject, 
    setActiveAdminView, 
    setSelectedPublicProject, 
    showToast 
  } = useApp();

  const existingProject = projects.find((p) => p.id === editingProjectId);

  const getCleanProject = (p?: Project): Project => {
    if (p) {
      return {
        ...p,
        name: p.name ?? '',
        slug: p.slug ?? '',
        category: p.category ?? 'pos',
        categoryLabel: p.categoryLabel ?? 'POS & Kasir Cloud',
        tagline: p.tagline ?? '',
        client: p.client ?? '',
        year: p.year ?? '2025',
        status: p.status ?? 'Draft',
        isFeatured: p.isFeatured ?? false,
        publishDate: p.publishDate ?? 'Hari ini',
        author: p.author ?? 'Andriawan Delv',
        coverImage: p.coverImage ?? '',
        coverAlt: p.coverAlt ?? 'Cover Project Portofolio',
        problem: p.problem ?? '',
        solution: p.solution ?? '',
        keyFeatures: Array.isArray(p.keyFeatures) ? p.keyFeatures : [],
        results: Array.isArray(p.results) ? p.results : [],
        techStack: Array.isArray(p.techStack) ? p.techStack : [],
        demoUrl: p.demoUrl ?? '',
        githubUrl: p.githubUrl ?? '',
        isGithubConfidential: p.isGithubConfidential ?? true,
        metaTitle: p.metaTitle ?? '',
        metaDescription: p.metaDescription ?? '',
        gallery: Array.isArray(p.gallery) ? p.gallery : [],
        ctaButtonLabel: p.ctaButtonLabel ?? 'Konsultasi Sistem Serupa',
        ctaWaTemplate: p.ctaWaTemplate ?? 'Halo Mas Andriawan Delv, saya tertarik mendiskusikan sistem ini untuk bisnis saya.',
        views: p.views ?? 120,
        leadsTriggered: p.leadsTriggered ?? 2
      };
    }
    return {
      id: `proj-${Date.now().toString().slice(-6)}`,
      name: '',
      slug: '',
      category: 'pos',
      categoryLabel: 'POS & Kasir Cloud',
      tagline: '',
      client: '',
      year: '2025',
      status: 'Draft',
      isFeatured: false,
      publishDate: 'Hari ini',
      author: 'Andriawan Delv',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADI6de9pQ5vUbJywJpW9mTgpWu4eZxywsZNgoaXzQH25pMyUlYtIuDHxZLqJUl3-cgP9rKlFYRFsnKaZSqaYM7Ykt0JMk8i7L5lTPRx9tqN4VESt2Hh67gecY_Hxta5m3XThdNlaZAXGURkEc4-m8Eo26dwgvgzUjoqOFJsdZ_AXO10xxWaus5oRb_ATVt4K6v1FlKktdDykiKH-TzhPlOGt1zKxuZ6T7l8ieyovrh-w_RUNblDUtu',
      coverAlt: 'Cover Project Portofolio',
      problem: '',
      solution: '',
      keyFeatures: ['Fitur Utama Pertama', 'Fitur Utama Kedua'],
      results: [
        { metric: '+150%', label: 'Efisiensi Operasional' },
        { metric: '99.9%', label: 'Uptime Sistem' }
      ],
      techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
      demoUrl: 'https://demo.microdata.dev',
      githubUrl: '',
      isGithubConfidential: true,
      metaTitle: '',
      metaDescription: '',
      gallery: [],
      ctaButtonLabel: 'Konsultasi Sistem Serupa',
      ctaWaTemplate: 'Halo Mas Andriawan Delv, saya tertarik mendiskusikan sistem ini untuk bisnis saya.',
      views: 120,
      leadsTriggered: 2
    };
  };

  const [formData, setFormData] = useState<Project>(() => getCleanProject(existingProject));

  useEffect(() => {
    if (editingProjectId) {
      const proj = projects.find((p) => p.id === editingProjectId);
      if (proj) {
        setFormData(getCleanProject(proj));
      }
    }
  }, [editingProjectId, projects]);

  const [activeCaseStudyTab, setActiveCaseStudyTab] = useState<'problem' | 'solution' | 'features' | 'impact'>('problem');
  const [newTechInput, setNewTechInput] = useState('');
  const [newFeatureInput, setNewFeatureInput] = useState('');

  // Auto generate slug from name
  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev.slug === '' || prev.slug.startsWith(prev.name.toLowerCase().slice(0, 5)) ? slug : prev.slug,
      metaTitle: prev.metaTitle || `${name} - Studi Kasus Solusi Digital | microdata.dev`
    }));
  };

  const handleCategorySelect = (cat: ProjectCategory) => {
    const labels: Record<ProjectCategory, string> = {
      pos: 'POS & Kasir Cloud',
      webapp: 'Web App & Manajemen',
      saas: 'SaaS & Fintech',
      digital_product: 'Digital Product & EdTech',
      mobile: 'Mobile & PWA'
    };
    setFormData((prev) => ({
      ...prev,
      category: cat,
      categoryLabel: labels[cat]
    }));
  };

  const handleAddFeature = () => {
    if (!newFeatureInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      keyFeatures: [...prev.keyFeatures, newFeatureInput.trim()]
    }));
    setNewFeatureInput('');
  };

  const handleRemoveFeature = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== idx)
    }));
  };

  const handleAddTech = () => {
    if (!newTechInput.trim()) return;
    if (!formData.techStack.includes(newTechInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, newTechInput.trim()]
      }));
    }
    setNewTechInput('');
  };

  const handleRemoveTech = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tech)
    }));
  };

  const handleAddMetric = () => {
    setFormData((prev) => ({
      ...prev,
      results: [...prev.results, { metric: '+100%', label: 'Peningkatan Kinerja' }]
    }));
  };

  const handleMetricChange = (index: number, field: 'metric' | 'label', value: string) => {
    setFormData((prev) => {
      const nextResults = [...prev.results];
      nextResults[index] = { ...nextResults[index], [field]: value };
      return { ...prev, results: nextResults };
    });
  };

  const handleRemoveMetric = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index)
    }));
  };

  const handleSave = (publish = false) => {
    if (!formData.name.trim()) {
      showToast('Mohon isi nama project terlebih dahulu', 'error');
      return;
    }

    const updated: Project = {
      ...formData,
      status: publish ? 'Published' : formData.status,
    };
    saveProject(updated);
    setActiveAdminView('dashboard');
  };

  const handlePreviewPublic = () => {
    setSelectedPublicProject(formData);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] pb-24">
      {/* Top Sticky Header (Matching Screenshot 3) */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-3.5 border-b border-[#eaedff] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveAdminView('dashboard')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#464554] hover:bg-[#faf8ff] border border-[#eaedff] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Tersimpan di Cloudinary & Database • Baru Saja</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveAdminView('dashboard')}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handlePreviewPublic}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#eaedff] text-[#4648d4] hover:bg-[#dae2fd] text-xs font-bold transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview Live Studi Kasus</span>
          </button>
          <button
            onClick={() => handleSave(true)}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#4648d4] hover:bg-[#2f2ebe] text-white text-xs font-bold shadow-md shadow-[#4648d4]/20 transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan & Publikasikan</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Main Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Informasi Utama */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eaedff] shadow-xs space-y-6">
              <h2 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4648d4]"></span>
                <span>Informasi Utama Project</span>
              </h2>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1.5">
                  Nama Project Portfolio <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name ?? ''}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Contoh: DelPos - Point of Sale & Kasir Cloud Multi-Cabang"
                  className="w-full px-4 py-3 rounded-xl border border-[#eaedff] text-sm text-[#131b2e] focus:border-[#4648d4] focus:ring-2 focus:ring-[#4648d4]/15 outline-none font-semibold"
                />
              </div>

              {/* Auto Slug Bar */}
              <div className="bg-[#faf8ff] p-3 rounded-xl border border-[#eaedff] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate text-gray-500">
                  <span className="font-mono text-gray-400">microdata.dev/portfolio/</span>
                  <input
                    type="text"
                    value={formData.slug ?? ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="bg-transparent font-mono text-[#4648d4] font-semibold outline-none truncate"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(`https://microdata.dev/portfolio/${formData.slug || ''}`);
                    showToast('Link slug tersalin!', 'info');
                  }}
                  className="p-1 rounded text-gray-400 hover:text-gray-600"
                  title="Copy slug URL"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Category Selection Pills */}
              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-2">
                  Kategori Utama
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'pos', label: 'POS & Kasir Cloud' },
                    { id: 'webapp', label: 'Web App & Manajemen' },
                    { id: 'saas', label: 'SaaS & Fintech' },
                    { id: 'digital_product', label: 'Digital Product' },
                    { id: 'mobile', label: 'Mobile & PWA' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.id as ProjectCategory)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        formData.category === cat.id
                          ? 'bg-[#4648d4] text-white shadow-xs'
                          : 'bg-[#faf8ff] border border-[#eaedff] text-gray-600 hover:bg-[#eaedff]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tagline */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#131b2e]">
                    Tagline Ringkas / Value Proposition
                  </label>
                  <span className="text-[10px] text-gray-400">
                    {(formData.tagline || '').length}/150 Karakter
                  </span>
                </div>
                <textarea
                  rows={2}
                  maxLength={180}
                  value={formData.tagline ?? ''}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Deskripsi satu kalimat yang menyoroti solusi teknis dan keuntungan bisnis..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#eaedff] text-xs text-[#131b2e] focus:border-[#4648d4] outline-none resize-none"
                />
              </div>

              {/* Client & Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Nama Klien / Perusahaan
                  </label>
                  <input
                    type="text"
                    value={formData.client ?? ''}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="Contoh: Kopi Delva Network (12 Outlet)"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs outline-none focus:border-[#4648d4]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Tahun Pengerjaan
                  </label>
                  <input
                    type="text"
                    value={formData.year ?? ''}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2024 / 2025"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs outline-none focus:border-[#4648d4]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Studi Kasus Mendalam (Interactive Tabs) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eaedff] shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6b38d4]"></span>
                  <span>Studi Kasus Arsitektur Mendalam</span>
                </h2>
              </div>

              {/* Tab Selector */}
              <div className="flex flex-wrap gap-1.5 bg-[#faf8ff] p-1.5 rounded-2xl border border-[#eaedff]">
                {[
                  { id: 'problem', label: '1. Masalah / Pain Points' },
                  { id: 'solution', label: '2. Solusi & Arsitektur' },
                  { id: 'features', label: `3. Fitur Utama (${(formData.keyFeatures || []).length})` },
                  { id: 'impact', label: `4. Hasil & Dampak (${(formData.results || []).length})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCaseStudyTab(tab.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      activeCaseStudyTab === tab.id
                        ? 'bg-[#4648d4] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content: Problem */}
              {activeCaseStudyTab === 'problem' && (
                <div className="space-y-3 animate-in fade-in">
                  <label className="block text-xs font-bold text-orange-900">
                    Tantangan & Masalah Lapangan yang Dihadapi Klien
                  </label>
                  <p className="text-[11px] text-gray-500">
                    Ceritakan kendala nyata operasional, antrean kasir, atau selisih pembukuan sebelum Anda membangun sistem ini.
                  </p>
                  <textarea
                    rows={5}
                    value={formData.problem ?? ''}
                    onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    placeholder="Sebelumnya outlet sering mengalami antrean kasir macet saat jam sibuk karena koneksi internet kabel yang sering tidak stabil..."
                    className="w-full p-4 rounded-xl border border-orange-200 bg-[#fffaf5] text-xs text-orange-950 focus:border-orange-500 outline-none leading-relaxed"
                  />
                </div>
              )}

              {/* Tab Content: Solution */}
              {activeCaseStudyTab === 'solution' && (
                <div className="space-y-3 animate-in fade-in">
                  <label className="block text-xs font-bold text-emerald-900">
                    Arsitektur & Rekayasa Solusi yang Anda Rancang
                  </label>
                  <p className="text-[11px] text-gray-500">
                    Jelaskan bagaimana pendekatan teknis (misal: Offline-First PWA, background synchronization, WebSocket) menyelesaikan masalah tersebut.
                  </p>
                  <textarea
                    rows={5}
                    value={formData.solution ?? ''}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    placeholder="Merancang dan membangun arsitektur Offline-First PWA menggunakan Next.js dan IndexedDB lokal di tablet kasir..."
                    className="w-full p-4 rounded-xl border border-emerald-200 bg-[#f6fdf8] text-xs text-emerald-950 focus:border-emerald-500 outline-none leading-relaxed"
                  />
                </div>
              )}

              {/* Tab Content: Key Features Repeater */}
              {activeCaseStudyTab === 'features' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFeatureInput ?? ''}
                      onChange={(e) => setNewFeatureInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                      placeholder="Tambah poin fitur unggulan baru..."
                      className="flex-1 px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs outline-none focus:border-[#4648d4]"
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 rounded-xl bg-[#4648d4] text-white text-xs font-bold hover:bg-[#2f2ebe]"
                    >
                      Tambah
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(formData.keyFeatures || []).map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-[#131b2e] font-medium">{feat}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab Content: Business Impact Metrics */}
              {activeCaseStudyTab === 'impact' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Angka peningkatan kinerja bisnis (ROI / efisiensi waktu)
                    </span>
                    <button
                      type="button"
                      onClick={handleAddMetric}
                      className="text-xs font-bold text-[#4648d4] hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Kartu Metrik</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(formData.results || []).map((res, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] space-y-2 relative group"
                      >
                        <button
                          type="button"
                          onClick={() => handleRemoveMetric(idx)}
                          className="absolute top-2 right-2 text-gray-300 hover:text-red-500"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                        <div>
                          <label className="block text-[10px] text-gray-400 font-bold uppercase">
                            Angka / Persentase
                          </label>
                          <input
                            type="text"
                            value={res.metric ?? ''}
                            onChange={(e) => handleMetricChange(idx, 'metric', e.target.value)}
                            className="w-full font-black text-lg text-[#4648d4] bg-transparent outline-none"
                            placeholder="+300%"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-400 font-bold uppercase">
                            Keterangan Metrik
                          </label>
                          <input
                            type="text"
                            value={res.label ?? ''}
                            onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                            className="w-full text-xs text-[#131b2e] font-medium bg-transparent outline-none"
                            placeholder="Kecepatan Checkout Kasir"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Tech Stack & Integration */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eaedff] shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006577]"></span>
                <span>Stack Teknologi & Integrasi</span>
              </h2>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTechInput ?? ''}
                  onChange={(e) => setNewTechInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                  placeholder="Contoh: React 19, Supabase, IndexedDB, Tailwind CSS..."
                  className="flex-1 px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs outline-none focus:border-[#4648d4]"
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  className="px-4 py-2 rounded-xl bg-[#eaedff] text-[#4648d4] hover:bg-[#dae2fd] text-xs font-bold"
                >
                  + Tambah Stack
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {(formData.techStack || []).map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-xs font-semibold text-[#131b2e]"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* 4. Demo & Repository Links */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eaedff] shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#131b2e]">
                Tautan Demo & Repositori Source Code
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-[#131b2e]">
                      URL Live Demo Interaktif
                    </label>
                    {formData.demoUrl && (
                      <a
                        href={formData.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-[#4648d4] font-semibold hover:underline flex items-center gap-0.5"
                      >
                        <span>Tes Link</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                  <input
                    type="url"
                    value={formData.demoUrl ?? ''}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    placeholder="https://delpos.microdata.dev"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs outline-none focus:border-[#4648d4]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-[#131b2e]">
                      URL Repositori GitHub
                    </label>
                    <label className="flex items-center gap-1 text-[10px] text-gray-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(formData.isGithubConfidential)}
                        onChange={(e) => setFormData({ ...formData, isGithubConfidential: e.target.checked })}
                        className="rounded text-[#4648d4]"
                      />
                      <span>Repo Rahasia Klien</span>
                    </label>
                  </div>
                  <input
                    type="url"
                    value={formData.githubUrl ?? ''}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/delva-andriawan/delpos-core"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs outline-none focus:border-[#4648d4]"
                  />
                </div>
              </div>
            </div>

            {/* 5. SEO & Google SERP Card Preview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eaedff] shadow-xs space-y-4">
              <h2 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#4648d4]" />
                <span>SEO & Google Snippet Preview</span>
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle ?? ''}
                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                    placeholder="Judul halaman untuk mesin pencari Google"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs outline-none focus:border-[#4648d4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={formData.metaDescription ?? ''}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    placeholder="Ringkasan halaman untuk hasil pencarian Google..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs outline-none focus:border-[#4648d4] resize-none"
                  />
                </div>
              </div>

              {/* SERP Card Visual */}
              <div className="p-4 rounded-2xl bg-[#faf8ff] border border-[#eaedff] space-y-1">
                <span className="text-[10px] text-gray-400 font-mono">
                  https://microdata.dev › portfolio › {formData.slug || 'delpos-cloud'}
                </span>
                <div className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer">
                  {formData.metaTitle || formData.name}
                </div>
                <div className="text-xs text-gray-600 line-clamp-2">
                  {formData.metaDescription || formData.tagline || 'Pelajari studi kasus arsitektur sistem modern dari Andriawan Delv di microdata.dev.'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Settings Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Visibilitas & Status */}
            <div className="bg-white rounded-3xl p-6 border border-[#eaedff] shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Visibilitas & Publikasi
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Status Project
                </label>
                <select
                  value={formData.status ?? 'Draft'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eaedff] text-xs bg-white focus:border-[#4648d4] outline-none"
                >
                  <option value="Published">Published (Tampil di Website)</option>
                  <option value="Draft">Draft (Hanya di Admin)</option>
                  <option value="Archived">Archived (Arsip Pribadi)</option>
                </select>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                <div>
                  <span className="text-xs font-bold text-[#131b2e] block">
                    Featured Project
                  </span>
                  <span className="text-[10px] text-gray-500 block">
                    Sorot di bagian teratas
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.isFeatured)}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#4648d4]"></div>
                </label>
              </div>
            </div>

            {/* Thumbnail Utama */}
            <div className="bg-white rounded-3xl p-6 border border-[#eaedff] shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Thumbnail Cover Utama
              </h3>

              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 border border-[#eaedff]">
                <img
                  src={formData.coverImage}
                  alt={formData.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  URL Cover Image
                </label>
                <input
                  type="text"
                  value={formData.coverImage ?? ''}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eaedff] text-xs outline-none focus:border-[#4648d4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Alt Text Aksesibilitas
                </label>
                <input
                  type="text"
                  value={formData.coverAlt ?? ''}
                  onChange={(e) => setFormData({ ...formData, coverAlt: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eaedff] text-xs outline-none focus:border-[#4648d4]"
                />
              </div>
            </div>

            {/* Konversi WhatsApp CTA */}
            <div className="bg-white rounded-3xl p-6 border border-[#eaedff] shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Trigger CTA WhatsApp Klien</span>
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Teks Tombol CTA
                </label>
                <input
                  type="text"
                  value={formData.ctaButtonLabel ?? ''}
                  onChange={(e) => setFormData({ ...formData, ctaButtonLabel: e.target.value })}
                  placeholder="Konsultasi Sistem Kasir Mirip DelPos"
                  className="w-full px-3 py-2 rounded-xl border border-[#eaedff] text-xs outline-none focus:border-[#4648d4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Template Otomatis Pesan WA
                </label>
                <textarea
                  rows={3}
                  value={formData.ctaWaTemplate ?? ''}
                  onChange={(e) => setFormData({ ...formData, ctaWaTemplate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#eaedff] text-xs outline-none focus:border-[#4648d4] resize-none"
                />
              </div>

              {/* WA Preview Bubble */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                <span className="text-[10px] text-emerald-700 font-bold block mb-1">
                  Pratinjau Bubble Chat:
                </span>
                "{formData.ctaWaTemplate}"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
