import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export const ContactModal: React.FC = () => {
  const { isContactModalOpen, setIsContactModalOpen, contactModalPreset, submitPublicInquiry, settings, showToast } = useApp();

  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    clientWa: '',
    clientEmail: '',
    projectType: 'Sistem POS Multi-Cabang & Ritel',
    budget: 'Rp 15.000.000 - Rp 30.000.000',
    timeline: '1 - 2 Bulan',
    notes: '',
  });

  const [successWaUrl, setSuccessWaUrl] = useState<string | null>(null);

  useEffect(() => {
    if (contactModalPreset) {
      setFormData((prev) => ({
        ...prev,
        projectType: contactModalPreset.solution || prev.projectType || 'Sistem POS Multi-Cabang & Ritel',
        budget: contactModalPreset.budget || prev.budget || 'Rp 15.000.000 - Rp 30.000.000',
        notes: contactModalPreset.projectRef ? `Tertarik mendiskusikan sistem serupa dengan: ${contactModalPreset.projectRef}` : (prev.notes || ''),
      }));
    }
  }, [contactModalPreset]);

  if (!isContactModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.clientWa.trim()) {
      showToast('Mohon lengkapi nama dan nomor WhatsApp Anda', 'error');
      return;
    }

    submitPublicInquiry({
      clientName: formData.clientName,
      companyName: formData.companyName || 'Pribadi / Bisnis',
      clientWa: formData.clientWa,
      clientEmail: formData.clientEmail || '-',
      projectType: formData.projectType,
      budget: formData.budget,
      timeline: formData.timeline,
      notes: formData.notes || 'Inquiry dari Pop-up Modal.',
      projectRef: contactModalPreset?.projectRef,
      status: 'Belum Ditanggapi',
      isHot: true,
    });

    const waText = `Halo Mas Andriawan Delv, saya ${formData.clientName}${formData.companyName ? ` (${formData.companyName})` : ''}. Saya tertarik mendiskusikan *${formData.projectType}*. Budget: ${formData.budget}. Kebutuhan: ${formData.notes || 'Bisa diskusi singkat?'}`;
    const cleanWa = settings.waNumber.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(waText)}`;

    setSuccessWaUrl(waUrl);
  };

  const handleClose = () => {
    setIsContactModalOpen(false);
    setSuccessWaUrl(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#eaedff] animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#faf8ff] hover:bg-[#eaedff] text-gray-500 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {successWaUrl ? (
          <div className="text-center py-6 space-y-5">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#131b2e]">
                Inquiry Berhasil Tercatat!
              </h3>
              <p className="text-xs text-[#464554] mt-2">
                Data Anda sudah tersimpan di CRM kami. Silakan klik tombol di bawah untuk langsung menyapa Mas Andriawan Delv di WhatsApp.
              </p>
            </div>
            <div className="space-y-2">
              <a
                href={successWaUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Buka WhatsApp Sekarang</span>
              </a>
              <button
                onClick={handleClose}
                className="w-full py-2.5 text-xs text-gray-500 hover:text-gray-700"
              >
                Tutup Jendela Ini
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4648d4]">
                KONSULTASI SINGKAT
              </span>
              <h3 className="text-xl font-bold text-[#131b2e]">
                Mulai Kolaborasi Digital
              </h3>
              <p className="text-xs text-[#464554]">
                Isi form cepat ini untuk mendapatkan respon dan estimasi awal.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Nama Anda <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.clientName ?? ''}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Nama lengkap atau panggilan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaedff] text-xs focus:ring-2 focus:ring-[#4648d4]/15 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.clientWa ?? ''}
                    onChange={(e) => setFormData({ ...formData, clientWa: e.target.value })}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaedff] text-xs focus:ring-2 focus:ring-[#4648d4]/15 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Nama Usaha / Usulan
                  </label>
                  <input
                    type="text"
                    value={formData.companyName ?? ''}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Nama bisnis"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaedff] text-xs focus:ring-2 focus:ring-[#4648d4]/15 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Kebutuhan Sistem
                </label>
                <input
                  type="text"
                  value={formData.projectType ?? ''}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaedff] text-xs focus:ring-2 focus:ring-[#4648d4]/15 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Catatan Kebutuhan Singkat
                </label>
                <textarea
                  rows={2}
                  value={formData.notes ?? ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Kira-kira apa yang ingin Anda selesaikan?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaedff] text-xs focus:ring-2 focus:ring-[#4648d4]/15 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#4648d4] to-[#6b38d4] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Kirim & Hubungi via WhatsApp</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
