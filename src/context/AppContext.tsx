import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, InquiryLead, Article, SiteSettings, Testimonial, AdminView } from '../types';
import { 
  INITIAL_SETTINGS, 
  INITIAL_PROJECTS, 
  INITIAL_LEADS, 
  INITIAL_ARTICLES, 
  INITIAL_TESTIMONIALS 
} from '../data/initialData';

interface AdminUser {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface AppContextType {
  // State
  projects: Project[];
  leads: InquiryLead[];
  articles: Article[];
  settings: SiteSettings;
  testimonials: Testimonial[];
  
  // Navigation & View Mode
  viewMode: 'public' | 'admin';
  setViewMode: (mode: 'public' | 'admin') => void;
  activeAdminView: AdminView;
  setActiveAdminView: (view: AdminView) => void;
  
  // Auth
  isAdminLoggedIn: boolean;
  adminUser: AdminUser;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
  
  // Project operations
  editingProjectId: string | null;
  setEditingProjectId: (id: string | null) => void;
  saveProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  
  // Lead / CRM operations
  selectedLeadId: string | null;
  setSelectedLeadId: (id: string | null) => void;
  submitPublicInquiry: (inquiry: Omit<InquiryLead, 'id' | 'createdAt' | 'timelineLogs' | 'internalNotes' | 'isRead'>) => InquiryLead;
  updateLeadStatus: (leadId: string, status: InquiryLead['status']) => void;
  addLeadNote: (leadId: string, note: string) => void;
  markLeadAsRead: (leadId: string) => void;
  deleteLead: (leadId: string) => void;
  
  // Article operations
  editingArticleId: string | null;
  setEditingArticleId: (id: string | null) => void;
  saveArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;
  
  // Settings operations
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  
  // Public Modals
  selectedPublicProject: Project | null;
  setSelectedPublicProject: (p: Project | null) => void;
  selectedPublicArticle: Article | null;
  setSelectedPublicArticle: (a: Article | null) => void;
  isContactModalOpen: boolean;
  setIsContactModalOpen: (open: boolean) => void;
  contactModalPreset: { solution?: string; budget?: string; projectRef?: string } | null;
  openContactModal: (preset?: { solution?: string; budget?: string; projectRef?: string }) => void;
  isAIChatOpen: boolean;
  setIsAIChatOpen: (open: boolean) => void;
  openAIChat: () => void;
  
  // Toast notifications
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROJECTS: 'microdata_projects_v2',
  LEADS: 'microdata_leads_v2',
  ARTICLES: 'microdata_articles_v2',
  SETTINGS: 'microdata_settings_v2',
  TESTIMONIALS: 'microdata_testimonials_v2',
  AUTH: 'microdata_admin_auth_v2',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Projects
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  // 2. Leads
  const [leads, setLeads] = useState<InquiryLead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  // 3. Articles
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
    } catch {
      return INITIAL_ARTICLES;
    }
  });

  // 4. Settings
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Seamless migration if cached settings still have previous name
        if (parsed.ownerName && parsed.ownerName.includes('Ridho')) {
          parsed.ownerName = 'Andriawan Delv';
        }
        if (parsed.metaTitle && parsed.metaTitle.includes('Ridho')) {
          parsed.metaTitle = parsed.metaTitle.replace(/M\.\s*Ridho/g, 'Andriawan Delv');
        }
        if (parsed.metaDescription && parsed.metaDescription.includes('Ridho')) {
          parsed.metaDescription = parsed.metaDescription.replace(/M\.\s*Ridho/g, 'Andriawan Delv');
        }
        if (parsed.waTemplate && parsed.waTemplate.includes('Ridho')) {
          parsed.waTemplate = parsed.waTemplate.replace(/Mas\s*Ridho/g, 'Mas Andriawan Delv');
        }
        if (parsed.cvFileName && parsed.cvFileName.includes('Ridho')) {
          parsed.cvFileName = 'CV_Andriawan_Delv_Fullstack_2025.pdf';
        }
        return { ...INITIAL_SETTINGS, ...parsed };
      }
      return INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // 5. Testimonials
  const [testimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  // 6. Navigation
  const [viewMode, setViewMode] = useState<'public' | 'admin'>('public');
  const [activeAdminView, setActiveAdminView] = useState<AdminView>('dashboard');

  // 7. Auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const adminUser: AdminUser = {
    name: 'Andriawan Delv',
    email: 'andriawan.delta@gmail.com',
    role: 'Vibe Coder / Solution Architect',
    avatar: settings.avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUS4zMVjhR_8gaK_GZoqPt9Y-fzbe8s8HaYHuJgQioOGQuIY3AochANBXD8Ax7KpyjzS6ey4QS5uGvEFv1IaXnlrV3TCGqN1tJ_3kdtm_848wrG3XUGDp79V9Y8t0vrj35eg9mJ2KaLx5RKoHGzTBZJkaD5UNsnRw51sse6-E1TtgNO0L3Uf4W1ruPWSoYhN0Mj0HlmGNQMcN_ZZ--TQe78LzTHSxPkPz7HWZU7nFBRaogBQ7y1z7c',
  };

  // 8. Selections & Modals
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(leads[0]?.id || null);
  
  const [selectedPublicProject, setSelectedPublicProject] = useState<Project | null>(null);
  const [selectedPublicArticle, setSelectedPublicArticle] = useState<Article | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactModalPreset, setContactModalPreset] = useState<{ solution?: string; budget?: string; projectRef?: string } | null>(null);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // 9. Toast Notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // Auth methods
  const loginAdmin = (email: string, pass: string): boolean => {
    const validEmail = 'andriawan.delta@gmail.com';
    const validPassword = 'Tehgelas1@';

    if (email.trim().toLowerCase() === validEmail && pass === validPassword) {
      setIsAdminLoggedIn(true);
      showToast('Berhasil masuk ke Admin Console Studio', 'success');
      return true;
    }
    showToast('Email atau password salah! Akses ditolak.', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setViewMode('public');
    showToast('Berhasil keluar dari Admin Console', 'info');
  };

  // Project operations
  const saveProject = (project: Project) => {
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === project.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = project;
        return next;
      }
      return [project, ...prev];
    });
    showToast(`Project "${project.name}" berhasil disimpan!`, 'success');
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast('Project telah dihapus dari portofolio', 'info');
  };

  // Lead / CRM operations
  const submitPublicInquiry = (inquiryData: Omit<InquiryLead, 'id' | 'createdAt' | 'timelineLogs' | 'internalNotes' | 'isRead'>): InquiryLead => {
    const newLead: InquiryLead = {
      ...inquiryData,
      id: `lead-${Date.now().toString().slice(-6)}`,
      createdAt: 'Baru saja',
      isRead: false,
      timelineLogs: [
        { time: 'Baru saja', text: 'Inquiry baru dikirim melalui website publik', type: 'primary' },
        ...(inquiryData.projectRef ? [{ time: 'Baru saja', text: `Referensi ketertarikan: ${inquiryData.projectRef}`, type: 'neutral' as const }] : [])
      ],
      internalNotes: [
        'Lead baru masuk via form website. Segera hubungi via WhatsApp untuk menjaga respon time prima.'
      ]
    };

    setLeads((prev) => [newLead, ...prev]);
    setSelectedLeadId(newLead.id);
    showToast('Pesan berhasil terkirim! Mas Andriawan Delv akan segera menghubungi via WhatsApp.', 'success');
    return newLead;
  };

  const updateLeadStatus = (leadId: string, status: InquiryLead['status']) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          return {
            ...lead,
            status,
            timelineLogs: [
              ...lead.timelineLogs,
              { time: 'Hari ini, baru saja', text: `Status diperbarui menjadi: "${status}"`, type: 'success' }
            ]
          };
        }
        return lead;
      })
    );
    showToast(`Status lead diperbarui ke: ${status}`, 'success');
  };

  const addLeadNote = (leadId: string, note: string) => {
    if (!note.trim()) return;
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          return {
            ...lead,
            internalNotes: [...lead.internalNotes, note.trim()],
            timelineLogs: [
              ...lead.timelineLogs,
              { time: 'Hari ini, baru saja', text: `Catatan internal baru ditambahkan`, type: 'neutral' }
            ]
          };
        }
        return lead;
      })
    );
    showToast('Catatan internal tersimpan', 'success');
  };

  const markLeadAsRead = (leadId: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, isRead: true } : l))
    );
  };

  const deleteLead = (leadId: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    if (selectedLeadId === leadId) {
      setSelectedLeadId(leads.find((l) => l.id !== leadId)?.id || null);
    }
    showToast('Lead berhasil dihapus dari arsip', 'info');
  };

  // Article operations
  const saveArticle = (article: Article) => {
    setArticles((prev) => {
      const idx = prev.findIndex((a) => a.id === article.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = article;
        return next;
      }
      return [article, ...prev];
    });
    showToast(`Artikel "${article.title}" berhasil disimpan!`, 'success');
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    showToast('Artikel berhasil dihapus', 'info');
  };

  // Settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Pengaturan CMS dan profil berhasil diperbarui', 'success');
  };

  const openContactModal = (preset?: { solution?: string; budget?: string; projectRef?: string }) => {
    setContactModalPreset(preset || null);
    setIsContactModalOpen(true);
  };

  const openAIChat = () => {
    setIsAIChatOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        leads,
        articles,
        settings,
        testimonials,
        viewMode,
        setViewMode,
        activeAdminView,
        setActiveAdminView,
        isAdminLoggedIn,
        adminUser,
        loginAdmin,
        logoutAdmin,
        editingProjectId,
        setEditingProjectId,
        saveProject,
        deleteProject,
        selectedLeadId,
        setSelectedLeadId,
        submitPublicInquiry,
        updateLeadStatus,
        addLeadNote,
        markLeadAsRead,
        deleteLead,
        editingArticleId,
        setEditingArticleId,
        saveArticle,
        deleteArticle,
        updateSettings,
        selectedPublicProject,
        setSelectedPublicProject,
        selectedPublicArticle,
        setSelectedPublicArticle,
        isContactModalOpen,
        setIsContactModalOpen,
        contactModalPreset,
        openContactModal,
        isAIChatOpen,
        setIsAIChatOpen,
        openAIChat,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
