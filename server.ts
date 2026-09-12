import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// System Knowledge Base about microdata.dev & Andriawan Delv
const SYSTEM_INSTRUCTION = `Anda adalah asisten AI resmi (Customer Support & Solution Assistant) untuk "microdata.dev" - Personal Studio oleh Andriawan Delv.
Profil Studio:
- Pemilik: Andriawan Delv
- Peran: Full Stack Engineer, Software Architect & Retail POS Specialist (5+ tahun pengalaman)
- Lokasi: Pekanbaru, Riau, Indonesia
- Kontak WhatsApp: +62 822-8323-0105
- Email: halo@microdata.dev / andriawan.delta@gmail.com
- Spesialisasi Utama:
  1. Sistem POS / Kasir Cloud Multi-Cabang & Ritel F&B (Offline-first, sinkronisasi otomatis, cetak struk bluetooth/thermal, QRIS statis/dinamis)
  2. Aplikasi Web Modern & Sistem Informasi Operasional (Next.js, React, Node.js/Express, Tailwind CSS, PostgreSQL, IndexedDB)
  3. SaaS & Dashboard Analitik Bisnis Real-time
  4. Integrasi Payment Gateway (Midtrans, Xendit, QRIS) & Notifikasi WhatsApp otomatis
- Portofolio Unggulan:
  - DelPos (Sistem kasir ritel offline-ready multi-outlet)
  - MedikaFlow (SIMRS & Rekam Medis Elektronik Klinik)
  - LogistixHub (ERP pergudangan & pelacakan armada logistik)
  - FreshMart Go (Supermarket belanja instan & kurir lokal)
- Nilai Tambah & Komitmen:
  - 100% Hak Milik Source Code (No vendor lock-in, no monthly software fee kecuali hosting/server mandiri)
  - Garansi Bebas Bug 90 Hari
  - UX Ringan, Ramah Layar Sentuh / Tablet & Non-Teknis
  - Estimasi Budget Proyek: Mulai dari Rp 10.000.000 hingga Rp 80.000.000+ tergantung kompleksitas dan jumlah modul.

Tugas Anda:
1. Menyapa calon pelanggan dengan ramah, profesional, sopan, dan santun dalam Bahasa Indonesia yang alami.
2. Membantu menjawab pertanyaan tentang layanan, teknologi, estimasi waktu pengerjaan, paket POS kasir, atau alur kerja.
3. Memberikan rekomendasi solusi teknologi yang tepat sesuai skala bisnis calon pelanggan (UMKM, kafe/restoran, toko ritel, klinik, atau perusahaan logistik).
4. Mendorong dan mengajak calon pelanggan untuk melanjutkan konsultasi langsung atau menjadwalkan meeting via WhatsApp Mas Andriawan Delv (+62 822-8323-0105) atau mengisi formulir konsultasi di website.
5. Jika ditanya hal di luar lingkup layanan software/web studio, arahkan dengan sopan kembali ke solusi bisnis digital microdata.dev.
6. Berikan jawaban yang ringkas, berbobot, mudah dipahami orang non-teknis, dan gunakan format markdown rapi dengan poin/bullet jika menjelaskan fitur.`;

// Smart contextual fallback responses based on user keywords when models encounter temporary 503 high-demand spikes
function getSmartFallbackReply(userMessage: string): string {
  const query = (userMessage || '').toLowerCase();
  if (query.includes('pos') || query.includes('kasir') || query.includes('outlet') || query.includes('cabang')) {
    return `Halo! Tentu saja, **microdata.dev** sangat berpengalaman membangun **Sistem POS / Kasir Multi-Cabang & Ritel F&B** (seperti portofolio kami, *DelPos*).\n\n**Fitur & Keunggulan Utama:**\n* **Mode Offline-First**: Kasir cabang tetap beroperasi lancar saat koneksi internet terputus, dan otomatis tersinkronisasi saat kembali online.\n* **Dashboard Pusat Terintegrasi**: Pemilik dapat memantau penjualan harian, stok, dan mutasi barang dari seluruh cabang secara *real-time*.\n* **100% Hak Milik Source Code**: Tidak ada biaya sewa atau langganan software bulanan per outlet (*no subscription lock-in*).\n* **Hardware Ready**: Mendukung printer thermal bluetooth/USB, barcode scanner, dan QRIS.\n\nUntuk konsultasi spesifikasi outlet Anda, Anda dapat langsung mengontak **Mas Andriawan Delv** di WhatsApp: **[+62 822-8323-0105](https://wa.me/6282283230105)**.`;
  }
  if (query.includes('harga') || query.includes('biaya') || query.includes('tarif') || query.includes('budget') || query.includes('berapa')) {
    return `Halo! Untuk estimasi investasi di **microdata.dev**, skema pengerjaan adalah *one-time development fee* (sekali bayar dengan 100% kepemilikan source code tanpa langganan software bulanan):\n\n* **Landing Page & Web Profil Bisnis**: Rp 5.000.000 – Rp 15.000.000\n* **Sistem POS Kasir & Inventori Multi-Cabang**: Rp 12.000.000 – Rp 35.000.000\n* **Sistem Informasi Kustom / ERP Operasional**: Rp 35.000.000 – Rp 80.000.000+\n\nSetiap proyek sudah mencakup **Garansi Bebas Bug 90 Hari** dan panduan penggunaan.\n\nSilakan diskusikan rincian kebutuhan Anda bersama Mas Andriawan Delv via WhatsApp: **[+62 822-8323-0105](https://wa.me/6282283230105)** untuk penawaran resmi.`;
  }
  if (query.includes('offline') || query.includes('internet') || query.includes('mati') || query.includes('sinyal')) {
    return `Aplikasi dan sistem POS kami dibangun dengan filosofi **Offline-First**. Menggunakan database lokal peramban (IndexedDB) dan *caching*, kasir tetap dapat memproses transaksi penjualan dan cetak struk tanpa koneksi internet. Begitu internet pulih, antrean data akan tersinkronisasi otomatis ke server pusat secara aman tanpa risiko data terduplikasi.`;
  }
  if (query.includes('garansi') || query.includes('bug') || query.includes('maintenance') || query.includes('dukungan')) {
    return `Kami memberikan **Garansi Bebas Bug selama 90 Hari** penuh setelah sistem di-*deploy* ke lingkungan produksi. Jika ditemukan kendala fungsi atau bug dalam periode tersebut, tim kami akan memperbaikinya tanpa biaya tambahan.`;
  }
  if (query.includes('wa') || query.includes('whatsapp') || query.includes('kontak') || query.includes('telepon') || query.includes('hubungi') || query.includes('email')) {
    return `Anda dapat langsung berkonsultasi dengan **Mas Andriawan Delv** melalui:\n\n* **WhatsApp:** [+62 822-8323-0105](https://wa.me/6282283230105)\n* **Email:** halo@microdata.dev / andriawan.delta@gmail.com\n* **Domisili:** Pekanbaru, Riau, Indonesia`;
  }
  return `Halo! Selamat datang di **microdata.dev**. Mas Andriawan Delv (Full Stack Engineer & Retail POS Specialist) siap membantu merancang solusi sistem digital bisnis Anda—mulai dari aplikasi kasir POS multi-cabang offline-first, sistem manajemen stok & logistik, hingga aplikasi web kustom dengan **100% kepemilikan source code** dan garansi 90 hari.\n\nAda kebutuhan sistem tertentu yang ingin Anda konsultasikan? Anda juga bisa langsung chat di WhatsApp: **[+62 822-8323-0105](https://wa.me/6282283230105)**.`;
}

// Generate Gemini content with retry & fallback model on 503 / high demand spikes
async function generateGeminiReply(ai: GoogleGenAI, contents: any[]): Promise<string | null> {
  const models = ['gemini-3.8-flash', 'gemini-flash-latest'];

  for (const model of models) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            topP: 0.95,
          },
        });

        if (response.text) {
          return response.text;
        }
      } catch (err: any) {
        const errMsg = String(err?.message || '');
        const is503OrSpike =
          err?.status === 'UNAVAILABLE' ||
          err?.code === 503 ||
          errMsg.includes('503') ||
          errMsg.toLowerCase().includes('high demand') ||
          errMsg.toLowerCase().includes('unavailable');

        console.warn(`[AI Chat] ${model} (attempt ${attempt}) returned: ${errMsg.slice(0, 120)}`);

        if (is503OrSpike && attempt === 1) {
          // Wait 600ms before retrying once on high demand
          await new Promise((resolve) => setTimeout(resolve, 600));
          continue;
        }

        // Move to next fallback model
        break;
      }
    }
  }

  return null;
}

// API route for AI customer chat
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages, userMessage } = req.body;

    if (!userMessage || typeof userMessage !== 'string') {
      return res.status(400).json({ error: 'Pesan pelanggan tidak boleh kosong.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({
        reply: getSmartFallbackReply(userMessage),
      });
    }

    const ai = getGeminiClient();

    // Prepare contents history
    const contents: any[] = [];

    if (Array.isArray(messages)) {
      // Include up to last 8 messages for context
      const recentHistory = messages.slice(-8);
      for (const msg of recentHistory) {
        if (msg.role === 'user' || msg.role === 'model') {
          contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: String(msg.text || '') }],
          });
        }
      }
    }

    // Add current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }],
    });

    const replyText = await generateGeminiReply(ai, contents);

    if (replyText) {
      return res.json({ reply: replyText });
    }

    // Graceful fallback if both models are currently under temporary demand spike
    const fallbackReply = getSmartFallbackReply(userMessage);
    return res.json({ reply: fallbackReply });
  } catch (error: any) {
    console.warn('[AI Chat Exception handled]:', error?.message || error);
    const fallbackReply = getSmartFallbackReply(req.body?.userMessage || '');
    return res.json({ reply: fallbackReply });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'microdata.dev API' });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`microdata.dev server running on port ${PORT}`);
  });
}

startServer();
