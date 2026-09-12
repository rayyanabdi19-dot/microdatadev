import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Send, 
  MessageSquare, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { settings, submitPublicInquiry, showToast } = useApp();

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

  const [submittedLead, setSubmittedLead] = useState<{ id: string; waLink: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.clientWa.trim()) {
      showToast('Mohon lengkapi nama dan nomor WhatsApp Anda', 'error');
      return;
    }

    const lead = submitPublicInquiry({
      clientName: formData.clientName,
      companyName: formData.companyName || 'Pribadi / UMKM',
      clientWa: formData.clientWa,
      clientEmail: formData.clientEmail || '-',
      projectType: formData.projectType,
      budget: formData.budget,
      timeline: formData.timeline,
      notes: formData.notes || 'Tertarik berkonsultasi solusi digital.',
      status: 'Belum Ditanggapi',
      isHot: true,
    });

    const waText = `Halo Mas Andriawan Delv, saya ${formData.clientName}${
      formData.companyName ? ` dari ${formData.companyName}` : ''
    }. Saya tertarik mendiskusikan project *${formData.projectType}*. Estimasi budget: ${
      formData.budget
    }. Catatan kebutuhan: ${formData.notes || 'Bisa jadwalkan demo / diskusi singkat?'}`;

    const cleanWa = settings.waNumber.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(waText)}`;

    setSubmittedLead({
      id: lead.id,
      waLink: waUrl,
    });
  };

  return (
    <section id="kontak" className="py-24 bg-[#faf8ff] ambient-radial-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Value Proposition */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eaedff] text-xs font-bold text-[#4648d4] tracking-wide">
                <span>HUBUNGI LANGSUNG</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#131b2e] tracking-tight">
                Mari Diskusikan Solusi Tepat untuk Bisnis Anda
              </h2>
              <p className="text-[#464554] text-sm sm:text-base leading-relaxed">
                Punya ide aplikasi kasir, sistem manajemen internal, atau ingin memigrasikan spreadsheet toko ke cloud? 
                Kirimkan rincian kebutuhan Anda untuk estimasi rancangan arsitektur dan transparansi biaya tanpa komitmen awal.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-4">
              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/${settings.waNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  'Halo Mas Andriawan Delv, saya ingin berkonsultasi mengenai project software bisnis.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded-2xl bg-white border border-[#eaedff] hover:border-[#c0c1ff] hover:shadow-md transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#131b2e]">WhatsApp Resmi</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-extrabold">Aktif</span>
                    </div>
                    <span className="text-sm font-semibold text-[#4648d4]">{settings.waNumber}</span>
                    <span className="text-[11px] text-gray-400 block">Respon rata-rata &lt; 15 menit di jam kerja</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#4648d4]" />
              </a>

              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-white border border-[#eaedff] flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#eaedff] text-[#4648d4] flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#131b2e] block">Email Bisnis & Proposal</span>
                  <span className="text-sm font-semibold text-[#464554]">{settings.publicEmail}</span>
                  <span className="text-[11px] text-gray-400 block">Untuk permintaan NDA dan TOR formal</span>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-5 rounded-2xl bg-white border border-[#eaedff] flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f2eaff] text-[#6b38d4] flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#131b2e] block">Basis Operasional</span>
                  <span className="text-sm font-semibold text-[#464554]">{settings.location}</span>
                  <span className="text-[11px] text-gray-400 block">Menerima project seluruh Indonesia via Remote / On-Site Meeting</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#eaedff] shadow-xl">
              {submittedLead ? (
                <div className="text-center py-10 space-y-6">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[#131b2e]">
                      Terima Kasih, Data Project Anda Diterima!
                    </h3>
                    <p className="text-sm text-[#464554] max-w-md mx-auto">
                      Pesan Anda telah tercatat otomatis di sistem CRM kami. Untuk mempercepat proses konsultasi, silakan klik tombol di bawah untuk melanjutkan chat langsung di WhatsApp Mas Andriawan Delv.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href={submittedLead.waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Buka Langsung di WhatsApp</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmittedLead(null);
                        setFormData({
                          clientName: '',
                          companyName: '',
                          clientWa: '',
                          clientEmail: '',
                          projectType: 'Sistem POS Multi-Cabang & Ritel',
                          budget: 'Rp 15.000.000 - Rp 30.000.000',
                          timeline: '1 - 2 Bulan',
                          notes: '',
                        });
                      }}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#faf8ff] text-[#464554] hover:bg-[#eaedff] text-sm font-semibold border border-[#eaedff]"
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#131b2e] mb-1.5">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.clientName ?? ''}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full px-4 py-3 rounded-xl border border-[#eaedff] focus:border-[#4648d4] focus:ring-2 focus:ring-[#4648d4]/15 outline-none text-sm text-[#131b2e] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#131b2e] mb-1.5">
                        Nama Usaha / Perusahaan
                      </label>
                      <input
                        type="text"
                        value={formData.companyName ?? ''}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Contoh: Kopi Kita Nusantara"
                        className="w-full px-4 py-3 rounded-xl border border-[#eaedff] focus:border-[#4648d4] focus:ring-2 focus:ring-[#4648d4]/15 outline-none text-sm text-[#131b2e] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#131b2e] mb-1.5">
                        Nomor WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.clientWa ?? ''}
                        onChange={(e) => setFormData({ ...formData, clientWa: e.target.value })}
                        placeholder="0812-3456-7890"
                        className="w-full px-4 py-3 rounded-xl border border-[#eaedff] focus:border-[#4648d4] focus:ring-2 focus:ring-[#4648d4]/15 outline-none text-sm text-[#131b2e] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#131b2e] mb-1.5">
                        Alamat Email Kerja
                      </label>
                      <input
                        type="email"
                        value={formData.clientEmail ?? ''}
                        onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                        placeholder="budi@perusahaan.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#eaedff] focus:border-[#4648d4] focus:ring-2 focus:ring-[#4648d4]/15 outline-none text-sm text-[#131b2e] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#131b2e] mb-1.5">
                        Jenis Solusi yang Dibutuhkan
                      </label>
                      <select
                        value={formData.projectType ?? 'Sistem POS Multi-Cabang & Ritel'}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#eaedff] focus:border-[#4648d4] focus:ring-2 focus:ring-[#4648d4]/15 outline-none text-sm text-[#131b2e] transition-all bg-white"
                      >
                        <option value="Sistem POS Multi-Cabang & Ritel">Sistem POS Multi-Cabang & Ritel</option>
                        <option value="Custom Web Application & Dashboard">Custom Web Application & Dashboard</option>
                        <option value="Digital Product / EdTech / SaaS">Digital Product / EdTech / SaaS</option>
                        <option value="Otomasi AI & WhatsApp Agent">Otomasi AI & WhatsApp Agent</option>
                        <option value="Website Perusahaan Berkinerja Tinggi">Website Perusahaan Berkinerja Tinggi</option>
                        <option value="Audit & Maintenance Sistem Lama">Audit & Maintenance Sistem Lama</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#131b2e] mb-1.5">
                        Estimasi Alokasi Investasi (Budget)
                      </label>
                      <select
                        value={formData.budget ?? 'Rp 15.000.000 - Rp 30.000.000'}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#eaedff] focus:border-[#4648d4] focus:ring-2 focus:ring-[#4648d4]/15 outline-none text-sm text-[#131b2e] transition-all bg-white"
                      >
                        <option value="< Rp 15.000.000">&lt; Rp 15.000.000 (Skala Awal)</option>
                        <option value="Rp 15.000.000 - Rp 30.000.000">Rp 15.000.000 - Rp 30.000.000 (Standar Bisnis)</option>
                        <option value="Rp 30.000.000 - Rp 50.000.000">Rp 30.000.000 - Rp 50.000.000 (Multi Cabang)</option>
                        <option value="Rp 50.000.000+">Rp 50.000.000+ (Enterprise Custom)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#131b2e] mb-1.5">
                      Catatan Masalah atau Ekspektasi Sistem
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes ?? ''}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Jelaskan secara singkat kendala operasional saat ini, jumlah cabang/kasir, atau fitur khusus yang Anda inginkan..."
                      className="w-full px-4 py-3 rounded-xl border border-[#eaedff] focus:border-[#4648d4] focus:ring-2 focus:ring-[#4648d4]/15 outline-none text-sm text-[#131b2e] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#4648d4] to-[#6b38d4] hover:opacity-95 text-white font-bold text-base shadow-lg shadow-[#4648d4]/25 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>Kirim Formulir & Konsultasi Gratis</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <p className="text-center text-[11px] text-gray-400">
                    Data Anda aman dan terenkripsi. Tidak ada spam atau panggilan promosi mengganggu.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
