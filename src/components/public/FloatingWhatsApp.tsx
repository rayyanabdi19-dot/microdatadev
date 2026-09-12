import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useApp();
  const [showTooltip, setShowTooltip] = useState(true);

  const cleanWa = (settings.waNumber || '').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(
    settings.waTemplate || 'Halo Mas Andriawan Delv, saya melihat portofolio microdata.dev dan ingin konsultasi pembuatan sistem/website.'
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 80, y: 80, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 22,
        delay: 0.4,
      }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 pointer-events-auto"
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 15 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: 15 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white shadow-xl border border-[#eaedff] text-xs font-semibold text-[#131b2e]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Konsultasi Cepat via WA?</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-gray-400 hover:text-gray-600 ml-1 p-0.5 rounded hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Tutup tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-14 h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/25 flex items-center justify-center transition-colors group cursor-pointer"
        aria-label="Hubungi WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white animate-pulse"></span>
        <MessageCircle className="w-6 h-6 fill-current" />
      </motion.a>
    </motion.div>
  );
};
