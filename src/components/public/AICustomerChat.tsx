import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MessageCircle, 
  ChevronDown, 
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  Clock,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  time: string;
}

const SUGGESTED_QUESTIONS = [
  'Berapa estimasi biaya sistem POS kasir?',
  'Bisa buat fitur kasir offline tanpa internet?',
  'Berapa lama pengerjaan aplikasi web custom?',
  'Bagaimana sistem garansi dan kepemilikan code?'
];

export const AICustomerChat: React.FC = () => {
  const { settings, openContactModal, isAIChatOpen, setIsAIChatOpen } = useApp();
  const isOpen = isAIChatOpen;
  const setIsOpen = setIsAIChatOpen;
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      text: `Halo! 👋 Saya Asisten AI **microdata.dev** dari Mas Andriawan Delv.\n\nAda yang bisa saya bantu terkait kebutuhan pembuatan **Sistem POS Kasir**, **Website Bisnis**, atau **Aplikasi Web Custom**?`,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasNewMessage(false);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: text,
          messages: messages.map((m) => ({ role: m.role, text: m.text })),
        }),
      });

      const data = await response.json();
      const reply = data.reply || data.fallback || 'Terima kasih atas pertanyaannya! Silakan hubungi Mas Andriawan Delv langsung via WhatsApp untuk diskusi mendalam.';

      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: reply,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelMsg]);
      if (!isOpen) setHasNewMessage(true);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: 'Mohon maaf, terjadi gangguan koneksi sementara. Anda dapat langsung mengklik tombol konsultasi WhatsApp untuk berbicara langsung dengan Mas Andriawan Delv!',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: `Halo kembali! 👋 Ada proyek sistem atau aplikasi yang ingin Anda diskusikan hari ini?`,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const cleanWa = (settings.waNumber || '').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(
    'Halo Mas Andriawan Delv, saya baru saja bertanya ke AI Assistant di website dan ingin konsultasi lebih lanjut via WhatsApp.'
  )}`;

  return (
    <>
      {/* Floating Trigger Button (Bottom Right, integrated beside WA button) */}
      <motion.div
        initial={{ opacity: 0, x: 80, y: 80, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 22,
          delay: 0.3,
        }}
        className="fixed bottom-6 right-24 z-40"
      >
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative h-14 px-4 rounded-2xl flex items-center gap-2.5 shadow-xl transition-all cursor-pointer font-semibold text-xs sm:text-sm border border-white/20 ${
            isOpen
              ? 'bg-[#131b2e] text-white'
              : 'bg-gradient-to-r from-[#4648d4] via-[#593bd6] to-[#6b38d4] text-white shadow-[#4648d4]/30 hover:shadow-[#4648d4]/40'
          }`}
          aria-label="Buka Chat AI Asisten Pelanggan"
        >
          <div className="relative">
            <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white"></span>
          </div>
          <span className="whitespace-nowrap font-medium">Tanya AI</span>

          {hasNewMessage && !isOpen && (
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-[10px] font-bold text-white items-center justify-center">
                1
              </span>
            </span>
          )}
        </motion.button>
      </motion.div>

      {/* Interactive Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[640px] h-[82vh] bg-white rounded-3xl shadow-2xl border border-[#eaedff] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#131b2e] via-[#1c243a] to-[#252b48] text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#4648d4] to-[#8042f0] flex items-center justify-center text-white shadow-inner">
                  <Bot className="w-5 h-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#131b2e]"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white">AI Solution Assistant</h3>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-[#4648d4]/40 text-[#c0c1ff]">
                      24/7 Aktif
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-300">
                    microdata.dev &bull; {settings.ownerName || 'Andriawan Delv'} Studio
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reset percakapan"
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Tutup chat"
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Notice Banner */}
            <div className="px-4 py-2 bg-[#f4f3ff] border-b border-[#eaedff] flex items-center justify-between text-[11px] text-[#4648d4]">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#4648d4]" />
                Didukung Gemini AI untuk tanya-jawab seputar layanan
              </span>
            </div>

            {/* Chat Body & Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#faf8ff]/60">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-end gap-2 max-w-[85%]">
                    {msg.role === 'model' && (
                      <div className="w-7 h-7 rounded-lg bg-[#eaedff] text-[#4648d4] flex items-center justify-center shrink-0 mb-1">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#4648d4] text-white rounded-br-none shadow-sm'
                          : 'bg-white text-[#131b2e] border border-[#eaedff] rounded-bl-none shadow-sm'
                      }`}
                    >
                      <div className="whitespace-pre-line space-y-1.5">
                        {msg.text}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-end gap-2 max-w-[85%]">
                  <div className="w-7 h-7 rounded-lg bg-[#eaedff] text-[#4648d4] flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white border border-[#eaedff] rounded-bl-none shadow-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#4648d4] animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-[#4648d4] animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-[#4648d4] animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Chips */}
            <div className="px-3 py-2 bg-white border-t border-[#eaedff] overflow-x-auto no-scrollbar flex items-center gap-1.5">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSendMessage(q)}
                  className="whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-medium bg-[#f0f2ff] text-[#4648d4] hover:bg-[#e2e7ff] border border-[#d8defe] transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Quick Action Footer to WhatsApp or Contact Modal */}
            <div className="px-3 py-2 bg-[#faf8ff] border-t border-[#eaedff] flex items-center justify-between gap-2 text-xs">
              <span className="text-[11px] text-gray-500 truncate">
                Ingin diskusi harga & SPK?
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    openContactModal({ solution: 'Konsultasi via AI Chat' });
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#eaedff] hover:bg-[#dae2fd] text-[#4648d4] font-semibold text-[11px] transition-colors"
                >
                  Form Proyek
                </button>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] flex items-center gap-1 transition-colors"
                >
                  <MessageCircle className="w-3 h-3 fill-current" />
                  <span>WA Langsung</span>
                </a>
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-[#eaedff] flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ketik pertanyaan untuk asisten AI..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#eaedff] text-xs text-[#131b2e] focus:border-[#4648d4] focus:ring-2 focus:ring-[#4648d4]/15 outline-none transition-all disabled:bg-gray-50"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#4648d4] to-[#6b38d4] text-white flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 cursor-pointer"
                title="Kirim pesan"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
