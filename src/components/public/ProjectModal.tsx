import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare,
  Sparkles,
  Layers,
  Calendar,
  UserCheck
} from 'lucide-react';

export const ProjectModal: React.FC = () => {
  const { selectedPublicProject, setSelectedPublicProject, settings, openContactModal } = useApp();

  if (!selectedPublicProject) return null;

  const project = selectedPublicProject;

  const handleWaContact = () => {
    const waText = project.ctaWaTemplate || `Halo Mas Andriawan Delv, saya melihat studi kasus ${project.name} di portfolio Anda. Saya tertarik mendiskusikan sistem serupa untuk bisnis saya.`;
    const cleanWa = settings.waNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(waText)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#eaedff] custom-scrollbar animate-in fade-in zoom-in-95 duration-200">
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 sm:px-8 py-4 border-b border-[#eaedff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#eaedff] text-[#4648d4] text-xs font-bold">
              {project.categoryLabel}
            </span>
            <span className="text-xs text-gray-500">• {project.client} ({project.year})</span>
          </div>

          <button
            onClick={() => setSelectedPublicProject(null)}
            className="w-9 h-9 rounded-full bg-[#faf8ff] hover:bg-[#eaedff] text-gray-600 flex items-center justify-center transition-colors"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Title & Tagline */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-[#131b2e] leading-tight">
              {project.name}
            </h2>
            <p className="text-sm sm:text-base text-[#464554] leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Cover & Gallery Banner */}
          <div className="rounded-2xl overflow-hidden bg-[#e2e7ff] border border-[#eaedff] relative">
            <img
              src={project.coverImage}
              alt={project.coverAlt || project.name}
              className="w-full max-h-[380px] object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4648d4] text-white text-xs font-bold hover:bg-[#2f2ebe] shadow-xs transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Buka Demo Live Interaktif</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#faf8ff] text-[#131b2e] text-xs font-bold border border-[#eaedff] hover:bg-[#eaedff] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>{project.isGithubConfidential ? 'Repo Proprietary Klien' : 'Lihat Source Code'}</span>
              </a>
            )}
          </div>

          {/* Measured Results & Impact */}
          {project.results && project.results.length > 0 && (
            <div className="bg-[#faf8ff] p-6 rounded-2xl border border-[#eaedff]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4648d4] mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Dampak Bisnis & Hasil Terukur</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.results.map((res, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-[#eaedff]">
                    <div className="text-2xl font-black text-[#4648d4]">
                      {res.metric}
                    </div>
                    <div className="text-xs font-medium text-[#131b2e] mt-1">
                      {res.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Problem */}
            <div className="bg-[#fff7ed] p-6 rounded-2xl border border-orange-200">
              <h4 className="text-sm font-bold text-orange-950 mb-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                <span>Tantangan & Masalah Lapangan</span>
              </h4>
              <p className="text-xs sm:text-sm text-orange-900/90 leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* The Solution */}
            <div className="bg-[#f0fdf4] p-6 rounded-2xl border border-emerald-200">
              <h4 className="text-sm font-bold text-emerald-950 mb-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span>Arsitektur & Rekayasa Solusi</span>
              </h4>
              <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features Repeater */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#131b2e]">
                Fitur Kunci & Keunggulan Fungsional
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-[#464554] font-medium leading-normal">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Tech Stack & Integrasi
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-[#eaedff] text-[#4648d4] text-xs font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Gallery Screenshots */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-[#eaedff]">
              <h4 className="text-sm font-bold text-[#131b2e]">
                Tampilan Antarmuka & Layar Operasional
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((img, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-[#eaedff] bg-gray-50">
                    <img
                      src={img}
                      alt={`${project.name} screenshot ${idx + 1}`}
                      className="w-full h-auto object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WhatsApp CTA Conversion Footer */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#4648d4] to-[#6b38d4] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg font-bold">
                Tertarik Mengembangkan Sistem Mirip {project.name}?
              </h4>
              <p className="text-xs text-[#e1e0ff]">
                Diskusikan estimasi waktu pengerjaan dan alur kebutuhan bisnis Anda langsung dengan {settings.ownerName || 'Andriawan Delv'}.
              </p>
            </div>

            <button
              onClick={handleWaContact}
              className="px-6 py-3 rounded-xl bg-white text-[#4648d4] hover:bg-[#faf8ff] font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{project.ctaButtonLabel || 'Konsultasi via WhatsApp'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
