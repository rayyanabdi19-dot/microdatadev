import { Project, InquiryLead, Article, SiteSettings, Testimonial, ServiceItem } from '../types';

export const INITIAL_SETTINGS: SiteSettings = {
  ownerName: "Andriawan Delv",
  brandName: "microdata.dev",
  headline: "Digital Creator & Solusi Bisnis Digital Berbasis Dampak Nyata",
  subheadline: "Membantu UMKM, Startup, dan Bisnis bertumbuh melalui Website Modern, Aplikasi Kasir (POS) Multi-Cabang, dan Produk Digital yang Cepat, Skalabel & Siap Pakai.",
  bio: "Full Stack Engineer & Solution Architect dengan 5+ tahun pengalaman membangun sistem kasir ritel, aplikasi manajemen operasional, dan produk digital interaktif. Fokus pada kode bersih, performa tinggi, dan UX yang ramah pengguna non-teknis.",
  titleRole: "Software Architect & Retail POS Specialist",
  bioSummary: "Membangun sistem kasir cloud multi-cabang, rekayasa offline-first, dan otomasi alur kerja bisnis digital dengan performa tinggi & zero vendor lock-in.",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUS4zMVjhR_8gaK_GZoqPt9Y-fzbe8s8HaYHuJgQioOGQuIY3AochANBXD8Ax7KpyjzS6ey4QS5uGvEFv1IaXnlrV3TCGqN1tJ_3kdtm_848wrG3XUGDp79V9Y8t0vrj35eg9mJ2KaLx5RKoHGzTBZJkaD5UNsnRw51sse6-E1TtgNO0L3Uf4W1ruPWSoYhN0Mj0HlmGNQMcN_ZZ--TQe78LzTHSxPkPz7HWZU7nFBRaogBQ7y1z7c",
  isAvailableForProjects: true,
  availableSlot: "Tersedia untuk 2 Project Baru Q2 2026",
  availabilityStatus: "Tersedia untuk Proyek Q2/Q3 2026",
  availabilityDot: true,
  waNumber: "+62 822-8323-0105",
  waVerified: true,
  publicEmail: "halo@microdata.dev",
  location: "Pekanbaru, Riau, Indonesia",
  github: "https://github.com/delva-andriawan",
  githubActive: true,
  linkedin: "https://linkedin.com/in/delva-andriawan",
  linkedinActive: true,
  instagram: "https://instagram.com/microdata.dev",
  instagramActive: true,
  tiktok: "https://tiktok.com/@microdata.dev",
  tiktokActive: false,
  cvFileName: "CV_Andriawan_Delv_Fullstack_2025.pdf",
  cvFileSize: "1.4 MB",
  cvUpdateDate: "Diperbarui 10 Februari 2025",
  cvDownloads: 142,
  cvShowOnHomepage: true,
  waTemplate: "Halo Mas Andriawan Delv, saya tertarik mendiskusikan project [JENIS_SOLUSI] untuk bisnis saya. Estimasi budget sekitar [ESTIMASI_BUDGET]. Kapan kita bisa diskusi via Google Meet atau chat?",
  waAutoForward: true,
  metaTitle: "microdata.dev / Personal Studio - Andriawan Delv | Solusi Bisnis Digital",
  metaDescription: "Portofolio digital profesional dan pusat kendali CMS Andriawan Delv untuk manajemen project, studi kasus arsitektur, leads klien, dan artikel teknologi.",
  googleAnalyticsId: "G-MD88291X0K",
  searchConsoleToken: "googlesiteverification_md983210x",
  ogImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUS4zMVjhR_8gaK_GZoqPt9Y-fzbe8s8HaYHuJgQioOGQuIY3AochANBXD8Ax7KpyjzS6ey4QS5uGvEFv1IaXnlrV3TCGqN1tJ_3kdtm_848wrG3XUGDp79V9Y8t0vrj35eg9mJ2KaLx5RKoHGzTBZJkaD5UNsnRw51sse6-E1TtgNO0L3Uf4W1ruPWSoYhN0Mj0HlmGNQMcN_ZZ--TQe78LzTHSxPkPz7HWZU7nFBRaogBQ7y1z7c",
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "delpos",
    name: "DelPos - Point of Sale & Kasir Cloud Multi-Cabang",
    slug: "delpos-kasir-cloud-multi-cabang",
    category: "pos",
    categoryLabel: "POS & Kasir Cloud",
    tagline: "Sistem kasir cloud modern offline-ready untuk ritel & F&B dengan sync inventaris multi-cabang otomatis dan integrasi QRIS dinamis.",
    client: "Kopi Delva Network (12 Outlet)",
    year: "2024",
    status: "Published",
    isFeatured: true,
    publishDate: "12 Januari 2024",
    author: "Andriawan Delv",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuADI6de9pQ5vUbJywJpW9mTgpWu4eZxywsZNgoaXzQH25pMyUlYtIuDHxZLqJUl3-cgP9rKlFYRFsnKaZSqaYM7Ykt0JMk8i7L5lTPRx9tqN4VESt2Hh67gecY_Hxta5m3XThdNlaZAXGURkEc4-m8Eo26dwgvgzUjoqOFJsdZ_AXO10xxWaus5oRb_ATVt4K6v1FlKktdDykiKH-TzhPlOGt1zKxuZ6T7l8ieyovrh-w_RUNblDUtu",
    coverAlt: "Dashboard DelPos POS Kasir Multi Outlet",
    problem: "Sebelumnya outlet sering mengalami antrean kasir macet saat jam sibuk karena sistem lama bergantung penuh pada internet kabel yang sering tidak stabil. Selain itu, owner kesulitan melacak selisih stok bahan baku antar cabang utama dan cabang satelit tanpa rekonsiliasi manual berjam-jam tiap malam.",
    solution: "Merancang dan membangun arsitektur Offline-First PWA menggunakan Next.js dan IndexedDB lokal di tablet kasir. Transaksi tetap berjalan 100% cepat saat internet padam, lalu secara otomatis di-background sync ke cloud database saat koneksi pulih. Dilengkapi dashboard analitik performa cabang real-time.",
    keyFeatures: [
      "Transaksi Kilat 3-Klik dengan Full Keyboard & Barcode Scanner",
      "Offline-First Engine: Tetap Cetak Struk saat Internet Terputus",
      "Manajemen Multi-Gudang & Transfer Stok Otomatis Antar Cabang",
      "Integrasi QRIS Statis & Dinamis dengan Notifikasi Suara Instan",
      "Laporan Harian Kasir & Tutup Buku Otomatis via WhatsApp Owner"
    ],
    results: [
      { metric: "+300%", label: "Kecepatan Checkout Kasir" },
      { metric: "-85%", label: "Waktu Rekonsiliasi Kas Harian" },
      { metric: "99.98%", label: "Uptime Kasir Tanpa Henti" }
    ],
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma ORM", "Web Bluetooth API"],
    demoUrl: "https://delpos.microdata.dev",
    githubUrl: "https://github.com/delva-andriawan/delpos-cloud-core",
    isGithubConfidential: true,
    metaTitle: "Studi Kasus DelPos - Sistem Kasir Cloud Modern Multi-Cabang | microdata.dev",
    metaDescription: "Pelajari bagaimana DelPos mentransformasi efisiensi transaksi 12 outlet F&B dengan arsitektur offline-first dan sinkronisasi real-time.",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYUv2D2bV4awRUwVoNq-L88WO36BAyNXFhbPOFkup_PV5lApnO2adAfet6LJnzf4sVSwSLOsLt8haFPteuf8z8OXi0tWknOrHeeICnovS4qXLqdwWg1MycAzCxWbjfLdL99VYAsj74lBOQi3pRHcFGflDpWabSuZm86GF_G7vfsqIvSYBTgYDE-YQZNEfT_1XYWM-uoXee3HLj1P3h-amY5_RQpeBKeWnNaDFfuI-x5R5Xh_MgAxOZ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDnsT1Y8e5FpMXWzGaDS8NCOV5EebYx4CbSlY-uB5eJKA30vyZ0p4ESKrZl2XYnbFKDNomWmnU7XFf-5v3wpbGZ7kPBZLQDIWS3gkkYGKGGxmEdRdNTtiVJEF_Md0Vjue5JE7uPXEdsdcPZvprrQquirKMFsOs2PP8qWf9t64I_fPJYOztHtizNh059r3APl-wcsxSBAA1YFKEmfwmwqt1MD2dPnRkp318A575IZhFxi-4TeQM9jM-e",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBj5eeKTRPzt0VHFHHOj5PlELl3s8tPn1oRbDsNiSTtmaTQxuJtwcXl4g7XI7kn7PJjg0jPqF8ubMu-BMfhmDynfRBrPNLyygd5VLQgqQ8xcPC_HyZL91geMQR_zoeXpFi11F0f_XQhfkv6CxgWYicfZSHmOw-AobyeyyqFxtTmmzirUWiE7j80prLdD6w5PPWftOcWGfiOgokwAxl-1vC_SVdnkO5T-E-2he4Wphz97q7BSP2nR3Lp"
    ],
    ctaButtonLabel: "Konsultasi Sistem Kasir Mirip DelPos",
    ctaWaTemplate: "Halo Mas Andriawan Delv, saya tertarik mengimplementasikan sistem kasir multi-cabang seperti DelPos untuk outlet saya. Bisa jadwalkan demo teknis?",
    views: 3420,
    leadsTriggered: 19
  },
  {
    id: "buku-ajaib",
    name: "BukuAjaib - Platform Interaktif & Gamifikasi Anak",
    slug: "buku-ajaib-gamifikasi-anak",
    category: "digital_product",
    categoryLabel: "Digital Product & EdTech",
    tagline: "Aplikasi buku cerita digital interaktif dengan animasi Canvas 60fps, voice narasi adaptif, dan lembar aktivitas motorik anak usia dini.",
    client: "CV Kreasi Nusantara",
    year: "2024",
    status: "Published",
    isFeatured: true,
    publishDate: "20 Maret 2024",
    author: "Andriawan Delv",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8JMaoWN-sTZZvhV0zj7L3G347cNsXvNo5kgn2SLCeuwtPosoJQRKLDMWD3wiDERIIOgxcwNRvi7QYPEi5GrFmOpu3CxacxQQGK037HYKO6vNoSt-sCfoErwRMMpkmOHV0YhNfPhAg5gNfT-2Ba3acZrbAdXa92SAIG8QNeJ98s0a1OPPWubjnqczDPG-bt_fulbZ1tqEVrINNxtlltPt0avEKG0mWpzvfgMs9oJQoYEfd_CPDtJCV",
    coverAlt: "Platform Interaktif BukuAjaib",
    problem: "Anak-anak mudah bosan dengan buku cerita statis konvensional, sedangkan pembuatan aplikasi native di Android/iOS memakan biaya dan siklus rilis yang sangat lambat bagi penerbit indie.",
    solution: "Mengembangkan Progressive Web App dengan HTML5 Canvas animasi ultra-ringan, Web Audio API spasial, dan mini-games edukatif yang dapat diakses langsung dari browser smartphone orang tua tanpa instalasi berat.",
    keyFeatures: [
      "Animasi Karakter 60 FPS menggunakan Lightweight Canvas Engine",
      "Narasi Suara Dwi-Bahasa (Indonesia & Inggris) dengan Highlight Kata",
      "Modul Kuis Interaktif & Puzzle Kreatif dengan Sound Feedback",
      "Dashboard Pemantauan Progres Membaca Khusus Orang Tua",
      "Optimasi Ukuran Aset: Total Bundle Kurang dari 4MB"
    ],
    results: [
      { metric: "15.000+", label: "Pengguna Anak Aktif" },
      { metric: "4.9 / 5.0", label: "Rating Kepuasan Orang Tua" },
      { metric: "42 Menit", label: "Rata-rata Waktu Interaksi/Sesi" }
    ],
    techStack: ["React 19", "HTML5 Canvas", "Web Audio API", "Tailwind CSS", "Vite", "Firebase Auth"],
    demoUrl: "https://bukuajaib.microdata.dev",
    githubUrl: "https://github.com/delva-andriawan/buku-ajaib-canvas",
    isGithubConfidential: false,
    metaTitle: "BukuAjaib - Produk Digital Interaktif Anak | microdata.dev",
    metaDescription: "Studi kasus pembuatan platform web buku interaktif anak dengan performa rendering 60 FPS dan audio spasial.",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8JMaoWN-sTZZvhV0zj7L3G347cNsXvNo5kgn2SLCeuwtPosoJQRKLDMWD3wiDERIIOgxcwNRvi7QYPEi5GrFmOpu3CxacxQQGK037HYKO6vNoSt-sCfoErwRMMpkmOHV0YhNfPhAg5gNfT-2Ba3acZrbAdXa92SAIG8QNeJ98s0a1OPPWubjnqczDPG-bt_fulbZ1tqEVrINNxtlltPt0avEKG0mWpzvfgMs9oJQoYEfd_CPDtJCV"
    ],
    ctaButtonLabel: "Bangun Produk Digital Interaktif",
    ctaWaTemplate: "Halo Mas Andriawan Delv, saya punya konsep produk digital edukasi/interaktif seperti BukuAjaib. Bisakah berdiskusi mengenai arsitektur dan estimasi pembuatannya?",
    views: 2890,
    leadsTriggered: 11
  },
  {
    id: "tabsi",
    name: "TABSI - Sistem Informasi Tabungan Siswa Sekolah",
    slug: "tabsi-tabungan-siswa-sekolah",
    category: "webapp",
    categoryLabel: "Web App & Manajemen",
    tagline: "Aplikasi tata kelola simpanan siswa terintegrasi dengan kartu RFID, rekapitulasi buku kas kelas, dan notifikasi SMS/WhatsApp ke orang tua wali murid.",
    client: "Yayasan Bina Mandiri (1.200 Siswa)",
    year: "2024",
    status: "Published",
    isFeatured: true,
    publishDate: "5 Februari 2024",
    author: "Andriawan Delv",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1ZW4RV6Ew0x35JqS-dYbFm2sKPx75SUSqkVdYvqyVXgGTJ3FcX9c23cogMYfHFzbhy576tgB4_ZYNqypVQoyhzwm0s3eBk3Bcnm9aqhKDkbKWd2OaTJgF5wQmQ8KiHjgUQ8SucZtxi61LyJ3GQxfJcxV_zq1tt4mRQv099ExxRQMit_CcTI8YsGjTnXt87tgfDgzDA1T798_Zxdb1_C_Ke4JWsGPKr_qZrmRZW-e64XMzANYSuEem",
    coverAlt: "Dashboard TABSI Sistem Tabungan Sekolah",
    problem: "Pencatatan tabungan siswa manual di buku tulis sering rawan robek, salah hitung saldo, dan menimbulkan kecurigaan wali murid atas dana simpanan anak.",
    solution: "Merancang web app pembukuan tabungan dengan pemindaian barcode kartu pelajar, pencatatan setor/tarik instan oleh wali kelas, serta portal cek saldo transparan untuk orang tua.",
    keyFeatures: [
      "Input Setoran Kilat dengan Scan Barcode / RFID Siswa",
      "Laporan Tutup Kas Harian, Mingguan & Bulanan per Kelas",
      "Fitur Tarik Saldo Terkunci dengan Otorisasi Kepala Sekolah",
      "Broadcast Mutasi Saldo Otomatis ke WhatsApp Wali Murid",
      "Export Laporan Akuntansi ke format Excel & PDF Terverifikasi"
    ],
    results: [
      { metric: "100%", label: "Transparansi Saldo Buku Kas" },
      { metric: "0%", label: "Selisih Perhitungan Manual" },
      { metric: "1.200+", label: "Siswa Terlayani Tiap Hari" }
    ],
    techStack: ["Laravel 11", "Livewire 3", "Alpine.js", "Tailwind CSS", "MySQL", "WhatsApp Gateway API"],
    demoUrl: "https://tabsi.microdata.dev",
    githubUrl: "https://github.com/delva-andriawan/tabsi-school-savings",
    isGithubConfidential: true,
    metaTitle: "Studi Kasus TABSI - Sistem Tabungan Siswa Modern | microdata.dev",
    metaDescription: "Sistem digitalisasi keuangan tabungan sekolah dengan transparansi penuh untuk ribuan siswa.",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA1ZW4RV6Ew0x35JqS-dYbFm2sKPx75SUSqkVdYvqyVXgGTJ3FcX9c23cogMYfHFzbhy576tgB4_ZYNqypVQoyhzwm0s3eBk3Bcnm9aqhKDkbKWd2OaTJgF5wQmQ8KiHjgUQ8SucZtxi61LyJ3GQxfJcxV_zq1tt4mRQv099ExxRQMit_CcTI8YsGjTnXt87tgfDgzDA1T798_Zxdb1_C_Ke4JWsGPKr_qZrmRZW-e64XMzANYSuEem"
    ],
    ctaButtonLabel: "Digitalisasi Sistem Lembaga Pendidikan",
    ctaWaTemplate: "Halo Mas Andriawan Delv, saya ingin mengadopsi sistem seperti TABSI untuk sekolah/lembaga kami. Mohon info alur dan rincian biaya implementasinya.",
    views: 1980,
    leadsTriggered: 8
  },
  {
    id: "drumah-kredit",
    name: "DRumah Kredit - Portal Simulasi & Pengajuan KPR",
    slug: "drumah-kredit-simulasi-kpr",
    category: "saas",
    categoryLabel: "Fintech & Properti",
    tagline: "Platform kalkulator KPR cerdas dengan visualisasi jadwal angsuran real-time, perbandingan suku bunga bank terkemuka, dan lead capture terpadu.",
    client: "PT Sentosa Graha Mandiri",
    year: "2023",
    status: "Published",
    isFeatured: false,
    publishDate: "14 November 2023",
    author: "Andriawan Delv",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcmcqSBQNyjM8o2ZSqwwLGI70PjcvsXkn5B2imoVR8m7g3BJFFXAuPLwhrHQf9L6DzIn4JZszWZzBDpDBq9WunWJG_oCLufl6mTnBpD1XHMFfZzHYSTBGvQhOxy-n0BMEf-UcbnVCorRLKBuTV6g05lvyHbnsd7T9sMpVyL0yXWNsNWWwv0537SG4-MveXjyJiM8-qHgHuoranllUCoB7Xb2eYAiVUx_AJqh-XqEV5c6GZ2gIlnn3t",
    coverAlt: "Portal Simulasi KPR DRumah Kredit",
    problem: "Calon pembeli rumah ragu mengajukan KPR karena kebingungan menghitung bunga anuitas vs flat serta sering ditolak bank karena ketidaksiapan rasio utang (DSR).",
    solution: "Membangun website interaktif dengan kalkulator tabel amortisasi dinamis, pengecekan eligibilitas DSR mandiri, dan form pengajuan instant yang langsung terkirim ke CRM agen properti.",
    keyFeatures: [
      "Simulasi Angsuran Multi-Tenor (5, 10, 15, 20 Tahun) Real-Time",
      "Perhitungan Bunga Fixed & Floating Bank BUMN dan Swasta",
      "Kalkulator Rasio Cicilan Gaji (Debt Service Ratio Checker)",
      "Form Pengajuan Berkas KPR Terenkripsi & Notifikasi WhatsApp Sales",
      "SEO-Optimized Landing Page untuk Keyword KPR Kota Terkait"
    ],
    results: [
      { metric: "+240%", label: "Lonjakan Lead Calon Debitur" },
      { metric: "1.4 Detik", label: "Kecepatan Muat Halaman Web" },
      { metric: "8.500+", label: "Simulasi Dilakukan per Bulan" }
    ],
    techStack: ["Next.js", "Express.js", "Chart.js", "Tailwind CSS", "MongoDB"],
    demoUrl: "https://drumahkredit.microdata.dev",
    githubUrl: "https://github.com/delva-andriawan/drumah-kredit-engine",
    isGithubConfidential: true,
    metaTitle: "DRumah Kredit - Portal Simulasi KPR Pintar | microdata.dev",
    metaDescription: "Kalkulator interaktif dan manajemen lead KPR untuk perusahaan pengembang perumahan.",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcmcqSBQNyjM8o2ZSqwwLGI70PjcvsXkn5B2imoVR8m7g3BJFFXAuPLwhrHQf9L6DzIn4JZszWZzBDpDBq9WunWJG_oCLufl6mTnBpD1XHMFfZzHYSTBGvQhOxy-n0BMEf-UcbnVCorRLKBuTV6g05lvyHbnsd7T9sMpVyL0yXWNsNWWwv0537SG4-MveXjyJiM8-qHgHuoranllUCoB7Xb2eYAiVUx_AJqh-XqEV5c6GZ2gIlnn3t"
    ],
    ctaButtonLabel: "Diskusi Pembuatan Web Properti / Fintech",
    ctaWaTemplate: "Halo Mas Andriawan Delv, saya tertarik membuat portal interaktif mirip DRumah Kredit untuk bisnis properti/keuangan kami.",
    views: 4120,
    leadsTriggered: 14
  },
  {
    id: "bengkel-pos",
    name: "Bengkel POS & Antrian Montir Terpadu",
    slug: "bengkel-pos-antrian-montir",
    category: "pos",
    categoryLabel: "POS & Operasional Bengkel",
    tagline: "Software manajemen servis kendaraan, stok onderdil otomotif, pembagian komisi montir transparan, dan sistem display nomor antrian pit.",
    client: "CV Prima Otomotif (4 Cabang)",
    year: "2024",
    status: "Published",
    isFeatured: false,
    publishDate: "18 Mei 2024",
    author: "Andriawan Delv",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4srJtR3NpeDEoWd4l_U0iPeOeXBwcfDQPsPhB6VG4kc0afdagwJgWie5L-50YnFWIWuMbSqSocTsxnRiOQTwgv64wn8ugshULHcbor_AVORn8uMiDHPYptD6nCxpe8HsS6FlATYXx4494eulgCwhobgLHDi2e-rSKPyu3rcqXl2gZ42LW6vHO3TS-lFLYVaTfbE_R4ZvLntg8TZDWlK7yMG2k9EB81UjW1wd0XycmhbsO4dl2AMC9",
    coverAlt: "Aplikasi Bengkel POS & Antrian Montir",
    problem: "Owner bengkel sering mengeluhkan hilangnya suku cadang mahal tanpa tercatat di nota servis, serta perselisihan antar montir mengenai pembagian upah jasa servis harian.",
    solution: "Membangun sistem tiket servis digital: saat motor/mobil masuk, sparepart yang diambil dari gudang wajib scan barcode dan otomatis terpotong dari stok serta tercatat pada ID montir penanggung jawab.",
    keyFeatures: [
      "Tiket Servis Digital & Rekam Medis Riwayat Kendaraan Pelanggan",
      "Katalog Sparepart dengan Notifikasi Otomatis Stok Menipis",
      "Perhitungan Komisi Bagi Hasil Montir Otomatis per Tindakan",
      "Layar TV Display Antrian Pit Servis Real-Time di Ruang Tunggu",
      "Kirim Pengingat Jadwal Ganti Oli Otomatis via WhatsApp API"
    ],
    results: [
      { metric: "-50%", label: "Waktu Tunggu Registrasi Servis" },
      { metric: "100%", label: "Transparansi Stok & Jasa Montir" },
      { metric: "4 Cabang", label: "Terhubung dalam 1 Dashboard Pusat" }
    ],
    techStack: ["Vue 3", "Vite", "Tailwind CSS", "Firebase Realtime DB", "Node.js"],
    demoUrl: "https://bengkelpos.microdata.dev",
    githubUrl: "https://github.com/delva-andriawan/bengkel-pos-system",
    isGithubConfidential: true,
    metaTitle: "Bengkel POS - Solusi Kasir & Servis Otomotif | microdata.dev",
    metaDescription: "Sistem operasional bengkel modern dengan tracking sparepart dan komisi mekanik.",
    gallery: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4srJtR3NpeDEoWd4l_U0iPeOeXBwcfDQPsPhB6VG4kc0afdagwJgWie5L-50YnFWIWuMbSqSocTsxnRiOQTwgv64wn8ugshULHcbor_AVORn8uMiDHPYptD6nCxpe8HsS6FlATYXx4494eulgCwhobgLHDi2e-rSKPyu3rcqXl2gZ42LW6vHO3TS-lFLYVaTfbE_R4ZvLntg8TZDWlK7yMG2k9EB81UjW1wd0XycmhbsO4dl2AMC9"
    ],
    ctaButtonLabel: "Konsultasi Sistem Bengkel & Ritel Servis",
    ctaWaTemplate: "Halo Mas Andriawan Delv, saya punya usaha bengkel/jasa servis dan ingin berkonsultasi mengenai implementasi sistem mirip Bengkel POS.",
    views: 1740,
    leadsTriggered: 7
  }
];

export const INITIAL_LEADS: InquiryLead[] = [
  {
    id: "lead-001",
    clientName: "Hendra Wijaya",
    companyName: "CV Sentosa Abadi (Ritel & F&B)",
    clientWa: "081234567890",
    clientEmail: "hendra.w@sentosaabadi.co.id",
    projectType: "Sistem POS Multi-Cabang & Resto",
    budget: "Rp 25.000.000 - Rp 35.000.000",
    timeline: "1 - 2 Bulan (Prioritas Tinggi)",
    notes: "Halo Mas Andriawan Delv, kami punya 5 cabang coffee shop dan restoran kecil di Pekanbaru. Kami ingin mengganti sistem kasir lama kami yang sering lemot dan offline dengan solusi modern seperti DelPos. Butuh integrasi kitchen display & QRIS dinamis.",
    projectRef: "DelPos",
    status: "Belum Ditanggapi",
    isHot: true,
    isRead: false,
    createdAt: "Hari ini, 10:45 WIB",
    timelineLogs: [
      { time: "10:45 WIB", text: "Inquiry masuk dari Form Kontak Portofolio", type: "primary" },
      { time: "10:46 WIB", text: "Sistem mencocokkan referensi produk: DelPos POS Cloud", type: "neutral" }
    ],
    internalNotes: [
      "Klien memiliki 5 cabang aktif dengan omzet cukup tinggi. Sangat cocok dengan paket DelPos Enterprise Cloud."
    ]
  },
  {
    id: "lead-002",
    clientName: "Dr. Anita Rahmawati",
    companyName: "Klinik Utama Sehat Sentosa",
    clientWa: "081398765432",
    clientEmail: "anita.dr@kliniksehat.com",
    projectType: "Sistem Rekam Medis & Janji Temu Online",
    budget: "Rp 40.000.000 - Rp 50.000.000",
    timeline: "2 - 3 Bulan",
    notes: "Membutuhkan sistem manajemen antrean pasien, input rekam medis dokter yang cepat di iPad, dan pengingat jadwal konsultasi otomatis ke WhatsApp pasien H-1.",
    projectRef: "Custom Web App",
    status: "Sedang Diskusi WA",
    isHot: true,
    isRead: true,
    createdAt: "Kemarin, 16:20 WIB",
    timelineLogs: [
      { time: "Kemarin, 16:20", text: "Inquiry diterima via WhatsApp Direct", type: "primary" },
      { time: "Kemarin, 17:05", text: "Dikirim draft arsitektur & flow modul pasien", type: "success" }
    ],
    internalNotes: [
      "Sudah video call via Google Meet 30 menit. Klien menyukai konsep offline fallback."
    ]
  },
  {
    id: "lead-003",
    clientName: "Kevin Sanjaya",
    companyName: "Toko Buku Mandiri",
    clientWa: "081122334455",
    clientEmail: "kevin@tokobukumandiri.com",
    projectType: "Aplikasi Kasir & Inventaris Gudang",
    budget: "Rp 15.000.000 - Rp 20.000.000",
    timeline: "Segera (< 1 Bulan)",
    notes: "Butuh software kasir desktop/web yang bisa scan ribuan barcode buku dengan cepat, plus export laporan laba rugi bulanan langsung ke akuntan kami.",
    projectRef: "DelPos",
    status: "Belum Ditanggapi",
    isHot: false,
    isRead: false,
    createdAt: "Kemarin, 09:15 WIB",
    timelineLogs: [
      { time: "Kemarin, 09:15", text: "Inquiry masuk dari Form Kontak Portofolio", type: "primary" }
    ],
    internalNotes: [
      "Follow up pagi ini via template salam pembuka WhatsApp."
    ]
  },
  {
    id: "lead-004",
    clientName: "Bambang Santoso",
    companyName: "PT Global Distribusi Logistik",
    clientWa: "081987654321",
    clientEmail: "bambang@globaldistribusi.id",
    projectType: "ERP Sederhana & Tracking Driver",
    budget: "Rp 60.000.000+",
    timeline: "3 - 4 Bulan",
    notes: "Pengembangan sistem dispatch armada pengiriman barang, proof-of-delivery berbasis foto geolokasi di HP sopir, dan dashboard analitik biaya bahan bakar armada.",
    projectRef: "Enterprise App",
    status: "Proposal Terkirim",
    isHot: true,
    isRead: true,
    createdAt: "3 hari lalu",
    timelineLogs: [
      { time: "3 hari lalu", text: "Inquiry masuk via email resmi", type: "neutral" },
      { time: "2 hari lalu", text: "Proposal teknis v1.0 terkirim ke Direktur Operasional", type: "success" }
    ],
    internalNotes: [
      "Menunggu jadwal presentasi direksi hari Jumat jam 14:00."
    ]
  },
  {
    id: "lead-005",
    clientName: "Maya Anggraini",
    companyName: "Hijab Aesthetic Boutique",
    clientWa: "085211229988",
    clientEmail: "maya@hijabaesthetic.store",
    projectType: "Website E-Commerce & Membership",
    budget: "Rp 18.000.000",
    timeline: "1 Bulan",
    notes: "Pembuatan website katalog interaktif, checkout otomatis terhubung ekspedisi SiCepat/JNE, dan sistem poin reward loyalitas pelanggan.",
    projectRef: "Web App",
    status: "Deal / Closed",
    isHot: false,
    isRead: true,
    createdAt: "5 hari lalu",
    timelineLogs: [
      { time: "5 hari lalu", text: "Negosiasi SPK disetujui", type: "neutral" },
      { time: "4 hari lalu", text: "DP 50% diterima. Sprint 1 dimulai.", type: "success" }
    ],
    internalNotes: [
      "Desain Figma disetujui. Sedang tahap integrasi Midtrans payment gateway."
    ]
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: "umkm-excel-pos",
    title: "Mengapa UMKM Wajib Migrasi dari Excel ke Sistem Kasir Cloud di 2025",
    slug: "mengapa-umkm-wajib-migrasi-excel-ke-sistem-kasir-cloud",
    excerpt: "Analisis mendalam bahaya ketergantungan pembukuan manual Excel terhadap kebocoran stok ritel dan bagaimana sistem kasir cloud modern menghemat puluhan jam kerja mingguan.",
    content: `Dalam dekade terakhir, Microsoft Excel atau Google Sheets telah menjadi sahabat setia jutaan pemilik UMKM di Indonesia untuk mencatat transaksi dan inventaris. Namun, seiring dengan pertumbuhan volume transaksi dan persaingan bisnis yang kian dinamis di tahun 2025, mengandalkan spreadsheet manual justru menjadi penghambat utama pertumbuhan (bottleneck).

### Tiga Titik Kritis Kelemahan Spreadsheet Manual:
1. **Rawan Human Error dan Manipulasi Angka**: Satu rumus yang terhapus atau salah ketik kuantitas dapat merusak seluruh laporan laba kotor cabang.
2. **Tidak Adanya Sinkronisasi Stok Real-Time**: Ketika produk terjual di kasir, stok di file Excel tidak langsung berkurang, memicu insiden over-selling atau pesanan dibatalkan pelanggan.
3. **Ketiadaan Jejak Audit (Audit Trail) Kasir**: Sulit membuktikan kecurangan atau selisih uang kas kecil di laci kasir saat tutup toko.

### Solusi: Arsitektur Kasir Cloud Berbiaya Terjangkau
Dengan hadirnya teknologi cloud-native dan Progressive Web Apps (PWA), UMKM tidak lagi memerlukan server mahal ratusan juta. Cukup menggunakan tablet atau laptop yang sudah ada, sistem kasir dapat berjalan mulus bahkan saat internet padam sekalipun.`,
    category: "POS & Bisnis",
    categoryLabel: "Bisnis & POS",
    tags: ["Sistem Kasir", "UMKM", "Cloud POS", "Manajemen Stok"],
    status: "Published",
    publishDate: "24 Januari 2025",
    readTime: "5 Menit Baca",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-tQfRdRodoFTP3McczIByD_YIqUylsdgHVg52WNiMiUXWMLTHObD57bu84IbYN-9bzSnHWMWoSIo1WkTmaEJfHOHEoKqO94TvAProyQNacR5nEQuikBD5Q03VEycOMkcgU1VqRZJYqhQBsbzqa6Gkg1_xKaMlQBUae4DJU6esZxz9zDhMve2khp8hfCVpMhwbPv5zvc-Kg5zMVp6FkdzPKeW-FDkTfEKQCi2EpFYiRCdfsoWPU55B",
    coverAlt: "UMKM Excel vs Cloud POS",
    seoScore: 94,
    seoScoreLabel: "Sangat Baik (Green)",
    views: 4820,
    leadsTriggered: 12,
    author: "Andriawan Delv"
  },
  {
    id: "ai-agent-n8n",
    title: "Panduan Praktis Integrasi AI Agent & WhatsApp Menggunakan n8n untuk Customer Service 24/7",
    slug: "panduan-integrasi-ai-agent-whatsapp-n8n",
    excerpt: "Cara merancang alur otomasi cerdas yang mampu menjawab pertanyaan teknis produk, memeriksa status pengiriman, dan mengarahkan lead bernilai tinggi langsung ke tim sales.",
    content: `Pelanggan era sekarang menuntut respon instan dalam hitungan detik di kanal favorit mereka: WhatsApp. Artikel ini memandu langkah demi langkah menghubungkan Large Language Models (LLM) dengan workflow engine n8n dan webhook WhatsApp resmi tanpa biaya langganan platform bot yang mahal.`,
    category: "AI & Otomasi",
    categoryLabel: "AI & Otomasi",
    tags: ["AI Agent", "n8n", "WhatsApp API", "Workflow Automation"],
    status: "Published",
    publishDate: "15 Februari 2025",
    readTime: "7 Menit Baca",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB--PYcmu8AG1nsFKzN1OUz7gHr2wZz24iw178xKcxqoal_TO4BECXAjtKRo00y7Pqcz8R588eVRdEmvmzw6CBQHELswbgF06ZaLJLDIdA2jesb5dJKpbZinC-Z6IjxQnMF6rKd14NnHCQnOTIz5RetVcDOUtKv2tRDbWJaB-sHajyM4a3Fj9ZmQU1sIyeaTDGMR128rmR-VFaqVUV0ZA-jQA-yCEhJ28U1oX3GpJWmW8M8XeWYIQcP",
    coverAlt: "AI Agent WhatsApp n8n Workflow",
    seoScore: 98,
    seoScoreLabel: "Sempurna (Green)",
    views: 6190,
    leadsTriggered: 18,
    author: "Andriawan Delv"
  },
  {
    id: "checklist-pesan-web",
    title: "Checklist Wajib Sebelum Memesan Jasa Pembuatan Aplikasi Web agar Tidak Boncos",
    slug: "checklist-wajib-sebelum-memesan-jasa-pembuatan-aplikasi-web",
    excerpt: "Daftar periksa esensial bagi business owner agar proyek software selesai tepat waktu, sesuai ekspektasi fungsional, dan memiliki kepemilikan source code yang transparan.",
    content: `Banyak founder dan pengusaha kecewa setelah membayar puluhan juta kepada vendor software karena sistem yang diserahkan lambat, sulit dikembangkan, atau vendor menghilang tanpa dokumentasi. Simak 7 poin krusial yang wajib ada di dalam SPK kontrak kerja sama.`,
    category: "Tips Klien",
    categoryLabel: "Tips Bisnis",
    tags: ["Tips Klien", "Kontrak Software", "Web Development", "Manajemen Proyek"],
    status: "Published",
    publishDate: "8 Januari 2025",
    readTime: "4 Menit Baca",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0GcCbEjgH9lXyAAiDQrBDa16aUmpbfREkjs5-E6xXvzAimb7ybrujFsI1tj7UENLMnxsWsV7O9DpYF2ryA0xenSrBb7WhME3L7vRo3vEM6YChp6HZeMAm9dfqSjgGMmVryLI5xp_QqjUVW0ET3JDPgAylU02Mg83zrR-z6PKEwUX5xYlD24Z4JRi2gUHvSqK4xKXrkrZDfSTB-09SyNW9MkDuK_t1Z0sXotghcjuc9pbQcnoVioKF",
    coverAlt: "Checklist Pemesanan Aplikasi Web",
    seoScore: 91,
    seoScoreLabel: "Baik (Green)",
    views: 3240,
    leadsTriggered: 9,
    author: "Andriawan Delv"
  },
  {
    id: "arsitektur-offline-first",
    title: "Membangun Arsitektur Web POS Offline-First dengan PWA dan IndexedDB",
    slug: "arsitektur-web-pos-offline-first-pwa-indexeddb",
    excerpt: "Bedah arsitektur teknis bagaimana kami membuat DelPos tetap beroperasi tanpa lag di kasir saat internet padam, serta strategi rekonsiliasi konflik saat kembali online.",
    content: `Di Indonesia, stabilitas koneksi internet seluler dan kabel masih menjadi tantangan utama bisnis ritel fisik. Artikel teknis ini mengulas bagaimana Service Workers, IndexedDB, dan queue background sync bekerja sama menciptakan user experience kasir kelas dunia.`,
    category: "Teknikal",
    categoryLabel: "Arsitektur & Tech",
    tags: ["PWA", "IndexedDB", "Offline First", "Next.js", "Service Worker"],
    status: "Published",
    publishDate: "28 Desember 2024",
    readTime: "9 Menit Baca",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCFbXZ6l_nO38PgVtJwczozeOuWfWjOUkQ9YHs8D4URfFHYI7WeasfoQl4xE7UbefoJY-Ek2ka3VSembSadeZdv544WeSkS7wc98Y3Mp4bKuMHNJ9SJqDh16aTcN-tpkSJ27YO3OnBvwJOqk8-EcJC3jAV_ZCJhpz6JJWg5jLZvKrPKNB9l8zmViRNXbzz_mqy6ZKwKcnbHVDjEJZnsW7NRNn22_TN7Hyj3aU2qWSwT8FrO-kPRVKH",
    coverAlt: "Arsitektur Offline First PWA",
    seoScore: 96,
    seoScoreLabel: "Sangat Baik (Green)",
    views: 5410,
    leadsTriggered: 14,
    author: "Andriawan Delv"
  },
  {
    id: "nextjs-vs-laravel",
    title: "Next.js vs Laravel: Mana Framework Terbaik untuk Bisnis Anda di 2025?",
    slug: "nextjs-vs-laravel-framework-terbaik-bisnis",
    excerpt: "Perbandingan objektif dari sisi kecepatan rilis (time-to-market), biaya hosting infrastruktur, ketersediaan talenta programmer, dan skalabilitas jangka panjang.",
    content: `Debat antara ekosistem Node.js/React dan PHP/Laravel sering membingungkan para pembuat keputusan bisnis. Pelajari matriks perbandingan performa nyata dan studi kasus kapan harus memilih Laravel dan kapan harus menggunakan Next.js.`,
    category: "Teknikal",
    categoryLabel: "Arsitektur & Tech",
    tags: ["Next.js", "Laravel", "Tech Stack", "Full Stack"],
    status: "Published",
    publishDate: "12 Desember 2024",
    readTime: "6 Menit Baca",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAo1JLA1pHhyOWwDnepF-d9IKDPHUjN5avnHte1dDhdvrKorygNnmTJCSWNkObfemeSmsJBpYUdhyMmCDbMrvseIwKV-93j9cO2LR7kM_15WOYnvFmiEsERRdDoBvvyVQZpEbw1-Ot5ZT01RjVWdNM_Lxyzu_9yN7jDJN44cgzS6nn81FMEm5U3-iRicoEw6W6BwP0_OI_e2h2f9rpK6CS2iCVNXJkRJHzJwpj4HTBCk10LwSybQKZO",
    coverAlt: "Next.js vs Laravel Comparison",
    seoScore: 89,
    seoScoreLabel: "Cukup Baik (Yellow)",
    views: 4180,
    leadsTriggered: 7,
    author: "Andriawan Delv"
  },
  {
    id: "uiux-kasir-tablet",
    title: "Studi Kasus Redesain UI/UX Kasir Tablet yang Mengurangi Error Input 80%",
    slug: "studi-kasus-redesain-ui-ux-kasir-tablet",
    excerpt: "Bagaimana penataan tombol Fitts' Law, ukuran target sentuh 48px, dan kontras warna high-visibility mempercepat proses transaksi barista di jam sibuk.",
    content: `Kasir F&B bekerja di bawah tekanan tinggi dengan jari yang sering kali basah atau berminyak. Simak bagaimana riset lapangan dan observasi langsung di meja kasir menghasilkan tata letak tombol kasir yang intuitif tanpa perlu pelatihan berhari-hari.`,
    category: "UI/UX & Desain",
    categoryLabel: "UI/UX & Desain",
    tags: ["UI/UX", "Desain Kasir", "Fitts Law", "Ergonomi"],
    status: "Published",
    publishDate: "30 November 2024",
    readTime: "5 Menit Baca",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3nUwbfXu492fe20cY2k0yN9Vg0Renwz7wqZlviya0jP17SiSDnLOFpY9aRsvxHWJhU6xsbCUNpher6X142ozX3TOhLNkMc2VQgG4OX-8WP8mhZ_j-hz_GqKsA2yRukdkCkienQSYbdQJ54Wn1cKBDKK0THk1Oq0oQmG6993FX3PlHNjJ1FZ5xvmmO3bzA4nRaumqWr7oFYLvjGDuJ0MFoYgpZuGNOiMdxlbXBtGfc3pwCyybx-y_P",
    coverAlt: "Redesain UI UX Kasir Tablet",
    seoScore: 95,
    seoScoreLabel: "Sangat Baik (Green)",
    views: 4560,
    leadsTriggered: 11,
    author: "Andriawan Delv"
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "testi-1",
    name: "Ardiansyah Pratama",
    role: "Operational Director",
    company: "Kopi Delva Group",
    initials: "AP",
    content: "Sistem kasir DelPos yang dibangun Mas Andriawan Delv benar-benar mengubah operasional 12 outlet kami. Sebelumnya setiap akhir pekan pasti kasir macet dan laporan rekonsiliasi malam selalu selisih. Sekarang transaksi secepat kilat dan laporan harian otomatis terkirim ke WA saya. Sangat recommended!",
    rating: 5,
    accentColor: "#4648d4"
  },
  {
    id: "testi-2",
    name: "Siti Nurhaliza",
    role: "Founder & Creative Director",
    company: "Kreasi Edukasi Nusantara",
    initials: "SN",
    content: "BukuAjaib melampaui ekspektasi kami. Animasi buku interaktifnya sangat halus di HP orang tua tanpa perlu install aplikasi yang berat di Playstore. Mas Andriawan Delv tidak hanya jago ngoding, tapi juga sangat paham psikologi UX anak dan kemudahan orang tua.",
    rating: 5,
    accentColor: "#6b38d4"
  },
  {
    id: "testi-3",
    name: "Drs. H. Mulyadi",
    role: "Ketua Yayasan Pendidikan",
    company: "Bina Mandiri",
    initials: "HM",
    content: "Aplikasi TABSI membuat buku kas tabungan siswa kami 100% transparan dan bebas dari salah hitung manual. Para wali murid sangat senang karena setiap kali anak menabung langsung ada notifikasi WhatsApp. Profesional, cepat, dan purna jualnya sangat bertanggung jawab.",
    rating: 5,
    accentColor: "#006577"
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "srv-web",
    title: "Website Development",
    description: "Company profile modern, landing page berkonversi tinggi, dan portal informasi dengan load time di bawah 1.5 detik & SEO optimal.",
    icon: "language",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    accent: "from-blue-600 to-indigo-600"
  },
  {
    id: "srv-app",
    title: "Application Development",
    description: "Sistem informasi custom, dashboard operasional manajemen, dan aplikasi web bisnis spesifik yang dirancang sesuai alur kerja perusahaan.",
    icon: "code_blocks",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    accent: "from-purple-600 to-indigo-600"
  },
  {
    id: "srv-pos",
    title: "POS & Management System",
    description: "Software kasir ritel & F&B multi-outlet offline-ready dengan kontrol stok gudang, laporan laba-rugi instan, dan integrasi QRIS dinamis.",
    icon: "point_of_sale",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    accent: "from-emerald-600 to-teal-600"
  },
  {
    id: "srv-product",
    title: "Digital Product Ready",
    description: "Pengembangan produk SaaS, platform edukasi interaktif, kalkulator cerdas, dan produk digital siap komersialisasi ke pasar.",
    icon: "rocket_launch",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    accent: "from-amber-600 to-orange-600"
  },
  {
    id: "srv-ai",
    title: "AI & Otomasi Bisnis",
    description: "Integrasi AI Agent WhatsApp Customer Service 24/7, otomasi workflow invoice dengan n8n, dan ekstraksi data dokumen otomatis.",
    icon: "smart_toy",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    accent: "from-indigo-600 to-purple-600"
  },
  {
    id: "srv-support",
    title: "Maintenance & Support",
    description: "Garansi bebas bug, monitoring server 24/7, backup cloud berkala, dan pendampingan teknis agar operasional bisnis selalu aman.",
    icon: "verified_user",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    accent: "from-cyan-600 to-blue-600"
  }
];

export const SKILL_CATEGORIES = [
  {
    title: "Backend & Basis Data",
    icon: "database",
    skills: ["Node.js / Express", "Laravel 11", "PostgreSQL", "MySQL", "Prisma ORM", "Supabase / Firebase", "RESTful API & Webhooks"]
  },
  {
    title: "Frontend & Mobile Web",
    icon: "devices",
    skills: ["React 19 & Next.js 14", "TypeScript", "Tailwind CSS v4", "Progressive Web Apps (PWA)", "IndexedDB & Offline Engine", "Canvas API & Framer Motion"]
  },
  {
    title: "DevOps, Cloud & Integrasi",
    icon: "cloud_sync",
    skills: ["Docker & Cloud Run", "Vercel / Railway", "Payment Gateway (Midtrans/Xendit)", "WhatsApp Gateway API", "QRIS Dinamis API", "Thermal Bluetooth Printing"]
  },
  {
    title: "AI, Otomasi & Analitik",
    icon: "psychology",
    skills: ["Google Gemini API", "n8n Workflow Automation", "AI Chatbot Customer Support", "Google Analytics 4", "Search Console & Technical SEO", "Business Logic Modeling"]
  }
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Audit Masalah & Riset Alur Bisnis",
    desc: "Kami membedah langsung hambatan operasional Anda, menganalisis proses kasir/manajemen saat ini, dan merumuskan spesifikasi fitur yang esensial tanpa bloatware."
  },
  {
    step: "02",
    title: "Arsitektur Solusi & Prototipe Interaktif",
    desc: "Menyusun skema basis data, pemilihan tech stack yang tepat guna, serta wireframe UI/UX yang dapat dicoba sebelum satu baris kode pun ditulis."
  },
  {
    step: "03",
    title: "Pengembangan Cepat & Transparan",
    desc: "Pengerjaan dengan metodologi agile modular. Anda mendapatkan akses ke link demo staging untuk memantau progres mingguan secara transparan."
  },
  {
    step: "04",
    title: "Pengujian Ketat & Simulasi Lapangan",
    desc: "Uji beban kecepatan transaksi kasir, simulasi internet terputus (offline fallback), verifikasi keamanan data finansial, dan kompatibilitas printer kasir."
  },
  {
    step: "05",
    title: "Deployment Cloud & Training Tim",
    desc: "Peluncuran ke production server dengan SSL, setup backup harian otomatis, serta video tutorial & pendampingan tim kasir / admin hingga mahir."
  },
  {
    step: "06",
    title: "Garansi & Dukungan Berkelanjutan",
    desc: "Garansi perbaikan bug gratis 3-6 bulan dan opsi SLA maintenance untuk memastikan sistem bisnis Anda terus berkembang seiring penambahan cabang."
  }
];
