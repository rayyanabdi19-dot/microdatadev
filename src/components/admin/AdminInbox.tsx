import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InquiryLead, LeadStatus } from '../../types';
import { 
  Inbox, 
  MessageSquare, 
  Mail, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronDown, 
  ExternalLink,
  Flame,
  Search,
  Filter
} from 'lucide-react';

export const AdminInbox: React.FC = () => {
  const { leads, updateLeadStatus, deleteLead, showToast, settings } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);

  const filteredLeads = leads.filter((lead) => {
    if (filterStatus !== 'all' && lead.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        lead.clientName.toLowerCase().includes(q) ||
        lead.companyName.toLowerCase().includes(q) ||
        lead.clientWa.includes(q) ||
        lead.projectType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    updateLeadStatus(id, newStatus);
  };

  const handleOpenWa = (lead: InquiryLead) => {
    const text = `Halo Bapak/Ibu ${lead.clientName}${
      lead.companyName ? ` (${lead.companyName})` : ''
    }, terima kasih telah mengisi form inquiry di microdata.dev. Saya ${settings.ownerName || 'Andriawan Delv'} ingin menindaklanjuti kebutuhan sistem *${lead.projectType}*. Kapan waktu yang cocok untuk kita diskusi singkat?`;
    
    const cleanWa = lead.clientWa.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#131b2e] tracking-tight">
            Inbox Calon Klien & Konsultasi Proyek
          </h1>
          <p className="text-xs sm:text-sm text-[#464554] mt-1">
            Kelola formulir masuk, pantau status prospek CRM, dan hubungi langsung via WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-red-100 text-red-700 text-xs font-bold">
            {leads.filter((l) => l.status === 'Belum Ditanggapi').length} Belum Ditanggapi
          </span>
          <span className="px-3 py-1 rounded-xl bg-[#eaedff] text-[#4648d4] text-xs font-bold">
            Total {leads.length} Leads
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-[#eaedff] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'Semua Status' },
            { id: 'Belum Ditanggapi', label: 'Belum Ditanggapi' },
            { id: 'Sedang Diskusi', label: 'Sedang Diskusi' },
            { id: 'Deal Proyek', label: 'Deal Proyek' },
            { id: 'Selesai / Arsip', label: 'Selesai' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setFilterStatus(st.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterStatus === st.id
                  ? 'bg-[#4648d4] text-white shadow-xs'
                  : 'bg-[#faf8ff] text-gray-600 hover:bg-[#eaedff]'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery ?? ''}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, perusahaan, WA..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#eaedff] text-xs focus:ring-2 focus:ring-[#4648d4]/15 outline-none"
          />
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#eaedff] space-y-3">
            <Inbox className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-base font-bold text-[#131b2e]">Tidak ada inquiry ditemukan</h3>
            <p className="text-xs text-gray-500">Ubah filter pencarian atau tunggu pengunjung mengirimkan form kontak.</p>
          </div>
        ) : (
          filteredLeads.map((lead) => {
            const isExpanded = expandedLeadId === lead.id;
            return (
              <div
                key={lead.id}
                className="bg-white rounded-3xl border border-[#eaedff] hover:border-[#c0c1ff] shadow-xs transition-all overflow-hidden"
              >
                {/* Main Card Line */}
                <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Lead Info */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-base font-bold text-[#131b2e]">
                        {lead.clientName}
                      </h3>
                      <span className="text-xs font-semibold text-gray-500">
                        • {lead.companyName}
                      </span>
                      {lead.isHot && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">
                          <Flame className="w-3 h-3 text-amber-600 fill-amber-500" />
                          <span>Prospek Hangat</span>
                        </span>
                      )}
                      <span className="text-xs text-gray-400">({lead.createdAt})</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#464554]">
                      <span className="font-semibold text-[#4648d4] bg-[#eaedff] px-2.5 py-0.5 rounded-md">
                        {lead.projectType}
                      </span>
                      <span>Budget: <strong>{lead.budget}</strong></span>
                      <span>Timeline: <strong>{lead.timeline}</strong></span>
                      <span>WA: <strong>{lead.clientWa}</strong></span>
                      {lead.clientEmail && <span>Email: {lead.clientEmail}</span>}
                    </div>
                  </div>

                  {/* Right Actions & Status Control */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {/* Status Dropdown */}
                    <select
                      value={lead.status ?? 'Belum Ditanggapi'}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border outline-none cursor-pointer ${
                        lead.status === 'Belum Ditanggapi'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : lead.status === 'Sedang Diskusi'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : lead.status === 'Deal Proyek'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-gray-100 text-gray-700 border-gray-200'
                      }`}
                    >
                      <option value="Belum Ditanggapi">Belum Ditanggapi</option>
                      <option value="Sedang Diskusi">Sedang Diskusi</option>
                      <option value="Deal Proyek">Deal Proyek</option>
                      <option value="Selesai / Arsip">Selesai / Arsip</option>
                    </select>

                    {/* WhatsApp Button */}
                    <button
                      onClick={() => handleOpenWa(lead)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat WhatsApp</span>
                    </button>

                    {/* Toggle Details */}
                    <button
                      onClick={() => setExpandedLeadId(isExpanded ? null : lead.id)}
                      className="p-2 rounded-xl bg-[#faf8ff] text-gray-600 hover:bg-[#eaedff] transition-colors"
                      title="Lihat Detail Pesan"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      title="Hapus Lead"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="bg-[#faf8ff] p-6 border-t border-[#eaedff] space-y-4 animate-in fade-in">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                        Catatan Kebutuhan Klien
                      </h4>
                      <p className="text-xs sm:text-sm text-[#131b2e] leading-relaxed bg-white p-4 rounded-xl border border-[#eaedff]">
                        {lead.notes}
                      </p>
                    </div>

                    {lead.projectRef && (
                      <div className="text-xs text-gray-500">
                        Tertarik karena melihat project: <span className="font-semibold text-[#4648d4]">{lead.projectRef}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
