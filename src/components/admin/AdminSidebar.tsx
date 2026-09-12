import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdminView } from '../../types';
import { 
  LayoutDashboard, 
  FolderPlus, 
  Inbox, 
  FileText, 
  Settings, 
  ExternalLink, 
  LogOut, 
  HardDrive,
  Cloud,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const { 
    activeAdminView, 
    setActiveAdminView, 
    setEditingProjectId, 
    leads, 
    logoutAdmin, 
    setViewMode, 
    adminUser, 
    settings 
  } = useApp();

  const unreadLeadsCount = leads.filter((l) => !l.isRead).length;

  const menuItems: { id: AdminView; label: string; icon: string; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard & Portfolio', icon: 'dashboard' },
    { id: 'project_editor', label: 'Tambah / Edit Project', icon: 'add_circle' },
    { id: 'inbox', label: 'Inbox & CRM Leads', icon: 'mark_email_unread', badge: unreadLeadsCount },
    { id: 'articles', label: 'Artikel & Blog', icon: 'article' },
    { id: 'settings', label: 'Pengaturan CMS', icon: 'settings' },
  ];

  const handleNavClick = (view: AdminView) => {
    if (view === 'project_editor') {
      setEditingProjectId(null); // start fresh for new project
    }
    setActiveAdminView(view);
  };

  return (
    <aside className="w-64 bg-[#131b2e] text-white flex flex-col justify-between h-screen sticky top-0 shrink-0 border-r border-gray-800 z-30">
      {/* Top Brand Header */}
      <div>
        <div className="p-6 border-b border-gray-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4648d4] to-[#6b38d4] flex items-center justify-center text-white font-black text-xl shadow-md">
              2R
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight block">
                {settings.brandName}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#c0c1ff] block">
                Admin Console v2.4
              </span>
            </div>
          </div>
        </div>

        {/* Quick Web Live Button */}
        <div className="px-4 pt-4">
          <button
            onClick={() => setViewMode('public')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-[#c0c1ff] border border-white/10 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Lihat Live Website</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Menu Utama
          </div>
          {menuItems.map((item) => {
            const isActive = activeAdminView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#4648d4] text-white shadow-md shadow-[#4648d4]/30 font-semibold'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-lg">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Media Storage & User Pill */}
      <div className="p-4 space-y-4 border-t border-gray-800">
        {/* Cloudinary Gauge */}
        <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5 text-gray-400">
              <Cloud className="w-3.5 h-3.5 text-[#4648d4]" />
              <span>Media CDN Storage</span>
            </span>
            <span className="text-white font-bold">24%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-gray-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#4648d4] to-emerald-400 w-[24%]" />
          </div>
          <div className="text-[10px] text-gray-400">
            1.2 GB terpakai dari 5.0 GB limit
          </div>
        </div>

        {/* User Pill & Logout */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={adminUser.avatar}
              alt={adminUser.name}
              className="w-8 h-8 rounded-lg object-cover shrink-0 border border-gray-700"
              referrerPolicy="no-referrer"
            />
            <div className="overflow-hidden">
              <span className="text-xs font-bold text-white block truncate">
                {adminUser.name}
              </span>
              <span className="text-[10px] text-gray-400 block truncate">
                {adminUser.role}
              </span>
            </div>
          </div>

          <button
            onClick={logoutAdmin}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors shrink-0"
            title="Keluar dari Admin Console"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
