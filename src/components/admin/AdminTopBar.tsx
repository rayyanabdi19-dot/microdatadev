import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Bell, 
  Plus, 
  ExternalLink, 
  Globe, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const AdminTopBar: React.FC = () => {
  const { setViewMode, setActiveAdminView, setEditingProjectId, leads, settings } = useApp();
  const unreadCount = leads.filter((l) => !l.isRead).length;

  return (
    <header className="h-16 bg-white border-b border-[#eaedff] px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search Input */}
      <div className="relative w-72 md:w-96">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Cari project, klien, nomor WhatsApp, atau artikel..."
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-xs focus:ring-2 focus:ring-[#4648d4]/15 focus:border-[#4648d4] outline-none"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Add Project Button */}
        <button
          onClick={() => {
            setEditingProjectId(null);
            setActiveAdminView('project_editor');
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#4648d4] hover:bg-[#2f2ebe] text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Project</span>
        </button>

        {/* View Public Website */}
        <button
          onClick={() => setViewMode('public')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#eaedff] hover:bg-[#dae2fd] text-[#4648d4] text-xs font-semibold border border-[#c0c1ff]/50 transition-colors"
        >
          <Globe className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Web Publik</span>
          <ExternalLink className="w-3 h-3" />
        </button>

        {/* Notifications Icon */}
        <button
          onClick={() => setActiveAdminView('inbox')}
          className="relative p-2 rounded-xl text-gray-500 hover:text-[#4648d4] hover:bg-[#faf8ff] transition-colors"
          title="Inbox Notifikasi"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
          )}
        </button>
      </div>
    </header>
  );
};
