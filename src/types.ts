export type ProjectCategory = 'pos' | 'webapp' | 'saas' | 'digital_product' | 'mobile';

export interface ProjectMetric {
  metric: string;
  label: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  category: ProjectCategory;
  categoryLabel: string;
  tagline: string;
  client: string;
  year: string;
  status: 'Published' | 'In Progress' | 'Draft' | 'Archived';
  isFeatured: boolean;
  publishDate: string;
  author: string;
  coverImage: string;
  coverAlt: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  results: ProjectMetric[];
  techStack: string[];
  demoUrl: string;
  githubUrl: string;
  isGithubConfidential: boolean;
  metaTitle: string;
  metaDescription: string;
  gallery: string[];
  ctaButtonLabel: string;
  ctaWaTemplate: string;
  views: number;
  leadsTriggered: number;
}

export interface TimelineLog {
  time: string;
  text: string;
  type: 'neutral' | 'success' | 'primary';
}

export type LeadStatus = 
  | 'Belum Ditanggapi' 
  | 'Sedang Diskusi WA' 
  | 'Proposal Terkirim' 
  | 'Deal / Closed' 
  | 'SPK Diterbitkan' 
  | 'Arsip';

export interface InquiryLead {
  id: string;
  clientName: string;
  companyName: string;
  clientWa: string;
  clientEmail: string;
  projectType: string;
  budget: string;
  timeline: string;
  notes: string;
  projectRef?: string;
  status: LeadStatus;
  isHot: boolean;
  isRead: boolean;
  createdAt: string;
  timelineLogs: TimelineLog[];
  internalNotes: string[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  categoryLabel: string;
  tags: string[];
  status: 'Published' | 'Draft' | 'Terjadwal';
  publishDate: string;
  readTime: string;
  coverImage: string;
  coverAlt: string;
  seoScore?: number;
  seoScoreLabel?: string;
  views?: number;
  leadsTriggered?: number;
  author: string;
}

export interface SiteSettings {
  ownerName: string;
  brandName: string;
  headline: string;
  subheadline: string;
  bio: string;
  titleRole?: string;
  bioSummary?: string;
  avatarUrl: string;
  isAvailableForProjects: boolean;
  availableSlot: string;
  availabilityStatus?: string;
  availabilityDot?: boolean;
  waNumber: string;
  waVerified: boolean;
  publicEmail: string;
  location: string;
  github: string;
  githubActive: boolean;
  linkedin: string;
  linkedinActive: boolean;
  instagram: string;
  instagramActive: boolean;
  tiktok: string;
  tiktokActive: boolean;
  cvFileName: string;
  cvFileSize: string;
  cvUpdateDate: string;
  cvDownloads: number;
  cvShowOnHomepage: boolean;
  waTemplate: string;
  waAutoForward: boolean;
  metaTitle: string;
  metaDescription: string;
  googleAnalyticsId: string;
  searchConsoleToken: string;
  ogImage: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  content: string;
  rating: number;
  accentColor: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  badgeColor: string;
  accent: string;
}

export type AdminView = 
  | 'dashboard'
  | 'portfolio'
  | 'project_editor'
  | 'inbox'
  | 'articles'
  | 'settings'
  | 'services'
  | 'testimonials';
