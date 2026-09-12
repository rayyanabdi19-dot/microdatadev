import React from 'react';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md border text-sm font-medium"
          style={{
            backgroundColor:
              toast.type === 'error'
                ? '#fff1f0'
                : toast.type === 'info'
                ? '#eef2ff'
                : '#f0fdf4',
            borderColor:
              toast.type === 'error'
                ? '#fca5a5'
                : toast.type === 'info'
                ? '#c7d2fe'
                : '#86efac',
            color:
              toast.type === 'error'
                ? '#991b1b'
                : toast.type === 'info'
                ? '#3730a3'
                : '#166534',
          }}
        >
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-indigo-600 shrink-0" />}
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
          <span>{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
