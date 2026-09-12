import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, ProjectCategory } from '../../types';
import { 
  FolderPlus, 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Share2, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  FileText, 
  CheckCircle2, 
  Eye, 
  Clock,
  ArrowUpRight
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    projects, 
    leads, 
    articles, 
    setEditingProjectId, 
    setActiveAdminView, 
    deleteProject, 
    showToast,
    setSelectedLeadId,
    settings
  } = useApp();

  const [filterTab, setFilterTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    if (filterTab === 'draft' && p.status !== 'Draft') return false;
    if (filterTab !== 'all' && filterTab !== 'draft' && p.category !== filterTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.techStack.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });

  const handleEdit = (id: string) => {
    setEditingProjectId(id);
    setActiveAdminView('project_editor');
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredProjects.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProjects.map((p) => p.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleExportCSV = () => {
    showToast('Mengekspor daftar project portofolio ke CSV...', 'success');
  };

  const handleShareWa = (project: Project) => {
    const text = `Halo, silakan cek studi kasus implementasi ${project.name} di microdata.dev: ${window.location.origin}/#portfolio`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#131b2e] tracking-tight">
            Dashboard & Portfolio Manager
          </h1>
          <p className="text-xs sm:text-sm text-[#464554] mt-1">
            Pantau metrik studi kasus, kelola entri proyek, dan tanggapi inquiry calon klien real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#eaedff] text-xs font-semibold text-[#464554] hover:bg-[#faf8ff] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor CSV</span>
          </button>

          <button
            onClick={() => {
              setEditingProjectId(null);
              setActiveAdminView('project_editor');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4648d4] hover:bg-[#2f2ebe] text-white text-xs font-bold shadow-md shadow-[#4648d4]/20 transition-all"
          >
            <FolderPlus className="w-4 h-4" />
            <span>+ Tambah Project Baru</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards (Matching Image 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#eaedff] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Total Portfolio Projects</span>
            <div className="w-8 h-8 rounded-lg bg-[#eaedff] text-[#4648d4] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#131b2e] mt-2">
            {projects.length} Project
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <span>+{projects.filter(p => p.status === 'Published').length} Publik Live</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#eaedff] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Inquiry Calon Klien</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#131b2e] mt-2">
            {leads.length} Leads
          </div>
          <div className="text-[11px] text-amber-600 font-medium mt-1">
            {leads.filter(l => l.status === 'Belum Ditanggapi').length} Butuh Respon Segera
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#eaedff] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Estimasi Pipeline Aktif</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <span className="text-xs font-bold font-mono">Rp</span>
            </div>
          </div>
          <div className="text-2xl font-black text-[#131b2e] mt-2">
            Rp 85.5M
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            +68.2% Konversi Deal
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#eaedff] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Artikel & Blog Views</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#131b2e] mt-2">
            28.4k
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            Rata-rata 4.8 Menit Baca
          </div>
        </div>
      </div>

      {/* Projects Table & Filter Section */}
      <div className="bg-white rounded-3xl border border-[#eaedff] shadow-xs overflow-hidden">
        {/* Table Controls */}
        <div className="p-5 border-b border-[#eaedff] flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#faf8ff] p-1 rounded-xl border border-[#eaedff]">
            {[
              { id: 'all', label: 'Semua Project' },
              { id: 'pos', label: 'POS & Kasir' },
              { id: 'webapp', label: 'Web App & SaaS' },
              { id: 'digital_product', label: 'Digital Product' },
              { id: 'draft', label: 'Draft' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterTab === tab.id
                    ? 'bg-white text-[#4648d4] shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama project, stack..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#eaedff] text-xs focus:ring-2 focus:ring-[#4648d4]/15 outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#faf8ff] border-b border-[#eaedff] text-gray-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="p-4 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.length > 0 && selectedIds.length === filteredProjects.length}
                    onChange={handleSelectAll}
                    className="rounded text-[#4648d4]"
                  />
                </th>
                <th className="p-4">Project & Tagline</th>
                <th className="p-4">Kategori & Stack</th>
                <th className="p-4">Klien & Tahun</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Performa</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaedff]">
              {filteredProjects.map((proj) => {
                const isSelected = selectedIds.includes(proj.id);
                return (
                  <tr
                    key={proj.id}
                    className={`hover:bg-[#faf8ff] transition-colors ${
                      isSelected ? 'bg-[#f2f3ff]' : ''
                    }`}
                  >
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(proj.id)}
                        className="rounded text-[#4648d4]"
                      />
                    </td>

                    {/* Thumbnail & Title */}
                    <td className="p-4">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={proj.coverImage}
                          alt={proj.name}
                          className="w-14 h-10 rounded-lg object-cover bg-gray-100 shrink-0 border border-[#eaedff]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="max-w-xs">
                          <span className="font-bold text-[#131b2e] block truncate text-xs hover:text-[#4648d4] cursor-pointer" onClick={() => handleEdit(proj.id)}>
                            {proj.name}
                          </span>
                          <span className="text-[11px] text-gray-400 block truncate">
                            {proj.tagline}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category & Stack */}
                    <td className="p-4">
                      <span className="inline-block px-2 py-0.5 rounded bg-[#eaedff] text-[#4648d4] font-semibold text-[10px] mb-1">
                        {proj.categoryLabel}
                      </span>
                      <div className="text-[10px] text-gray-500 truncate max-w-[150px]">
                        {proj.techStack.slice(0, 2).join(', ')}
                      </div>
                    </td>

                    {/* Client & Year */}
                    <td className="p-4">
                      <div className="font-semibold text-[#131b2e]">{proj.client}</div>
                      <div className="text-[10px] text-gray-400">{proj.year}</div>
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          proj.status === 'Published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : proj.status === 'Draft'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${proj.status === 'Published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span>{proj.status}</span>
                      </span>
                    </td>

                    {/* Views / Leads */}
                    <td className="p-4 text-center">
                      <div className="font-bold text-[#131b2e]">{proj.views || 1200} views</div>
                      <div className="text-[10px] text-emerald-600 font-semibold">{proj.leadsTriggered || 5} leads</div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {proj.demoUrl && (
                          <a
                            href={proj.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-[#4648d4] hover:bg-[#eaedff] transition-colors"
                            title="Buka Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => handleShareWa(proj)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                          title="Bagikan ke WhatsApp"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleEdit(proj.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-[#4648d4] hover:bg-[#eaedff] transition-colors"
                          title="Edit Project"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProject(proj.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Leads Section: Pesan Masuk Terbaru (Matching Bottom Image 2) */}
      <div className="bg-white rounded-3xl p-6 border border-[#eaedff] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#4648d4]" />
            <h3 className="text-sm font-bold text-[#131b2e]">
              Inquiry & Form Masuk Terbaru
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">
              {leads.filter((l) => !l.isRead).length} Baru
            </span>
          </div>

          <button
            onClick={() => setActiveAdminView('inbox')}
            className="text-xs font-bold text-[#4648d4] hover:text-[#2f2ebe] flex items-center gap-1"
          >
            <span>Buka Seluruh CRM Leads ({leads.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {leads.slice(0, 2).map((lead) => (
            <div
              key={lead.id}
              className="p-4 rounded-2xl bg-[#faf8ff] border border-[#eaedff] flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-[#131b2e]">
                    {lead.clientName}
                  </span>
                  <span className="text-[10px] text-gray-400">{lead.createdAt}</span>
                </div>
                <p className="text-[11px] text-[#464554] line-clamp-2">
                  "{lead.notes}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#eaedff]/60">
                <span className="text-[10px] font-bold text-[#4648d4]">
                  {lead.projectType}
                </span>
                <a
                  href={`https://wa.me/${lead.clientWa.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Halo Bapak/Ibu ${lead.clientName}, terima kasih telah menghubungi microdata.dev. Saya ${settings.ownerName || 'Andriawan Delv'} ingin menindaklanjuti rencana project ${lead.projectType}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition-colors"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Balas via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
