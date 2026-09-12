import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Lock, 
  Mail, 
  ArrowLeft, 
  ShieldCheck, 
  KeyRound,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, setViewMode, adminUser, settings } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const ok = loginAdmin(email, password);
    if (!ok) {
      setErrorMsg('Email atau password salah. Silakan periksa kembali kredensial Anda.');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-[#eaedff] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Brand Narrative & Security Shield */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#131b2e] via-[#283044] to-[#131b2e] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#4648d4]/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          {/* Top Brand Header */}
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#4648d4] to-[#6b38d4] flex items-center justify-center text-white font-black text-xl shadow-lg">
                2R
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight block">
                  {settings.brandName}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#c0c1ff] block">
                  CMS Control Studio v2.4
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white leading-snug">
                Pusat Kendali Portofolio & Otomasi CRM Bisnis
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                Kelola data studi kasus arsitektur, kelola respon lead calon klien, publikasikan tulisan teknikal, dan sesuaikan konfigurasi CMS real-time.
              </p>
            </div>
          </div>

          {/* Quote Card */}
          <div className="relative z-10 my-8 p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-3">
            <p className="text-xs italic text-gray-200 leading-relaxed">
              "Sistem kasir cloud yang andal bukan sekadar kemewahan teknis, melainkan fondasi efisiensi operasional setiap rupiah omzet klien."
            </p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#4648d4] flex items-center justify-center text-[10px] font-bold">
                AD
              </div>
              <span className="text-[11px] font-semibold text-[#c0c1ff]">
                Andriawan Delv • Lead Architect
              </span>
            </div>
          </div>

          {/* Bottom Security Badge */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>256-Bit SSL Protected Session</span>
            </div>
            <span>v2.4.0 Live</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-8 bg-white">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaedff] text-xs font-bold text-[#4648d4]">
              <Lock className="w-3.5 h-3.5" />
              <span>ADMIN RESTRICTED AREA</span>
            </div>
            <span className="text-xs font-mono text-gray-400">#SEC-2026-891A</span>
          </div>

          <div className="space-y-6">
            {/* User Avatar & Greeting */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#faf8ff] border border-[#eaedff]">
              <div className="relative">
                <img
                  src={adminUser.avatar}
                  alt={adminUser.name}
                  className="w-13 h-13 rounded-xl object-cover border border-[#c0c1ff]"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#131b2e]">
                  Portal Autentikasi Administrator
                </h3>
                <p className="text-xs text-gray-500">Masukkan kredensial resmi untuk mengakses pusat kendali studio</p>
              </div>
            </div>

            {/* Error Notification Alert */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1.5">
                  Email Administrator
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email ?? ''}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@domain.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#eaedff] text-sm text-[#131b2e] focus:border-[#4648d4] focus:ring-2 focus:ring-[#4648d4]/15 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#131b2e]">
                    Kata Sandi Keamanan
                  </label>
                  <span className="text-[11px] text-[#4648d4] hover:underline cursor-pointer">
                    Lupa Sandi?
                  </span>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password ?? ''}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-[#eaedff] text-sm text-[#131b2e] focus:border-[#4648d4] focus:ring-2 focus:ring-[#4648d4]/15 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                    title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[#464554]">
                  <input
                    type="checkbox"
                    checked={Boolean(rememberMe)}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-[#4648d4] focus:ring-0"
                  />
                  <span>Ingat sesi browser ini</span>
                </label>
                <span className="text-gray-400">Token auto-refresh</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#4648d4] to-[#6b38d4] hover:opacity-95 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Masuk ke Admin Console</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Footer Return Link */}
          <div className="pt-6 border-t border-[#eaedff] text-center">
            <button
              onClick={() => setViewMode('public')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#4648d4] hover:text-[#2f2ebe]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman Portofolio Publik</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
