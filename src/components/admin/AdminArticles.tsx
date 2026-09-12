import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Article } from '../../types';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Calendar, 
  Clock, 
  CheckCircle2,
  X,
  Save
} from 'lucide-react';

export const AdminArticles: React.FC = () => {
  const { articles, saveArticle, deleteArticle, setSelectedPublicArticle, showToast } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    slug: '',
    category: 'pos',
    categoryLabel: 'POS & Ritel Modern',
    excerpt: '',
    content: '',
    readTime: '5 Menit',
    publishDate: 'Hari ini',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADI6de9pQ5vUbJywJpW9mTgpWu4eZxywsZNgoaXzQH25pMyUlYtIuDHxZLqJUl3-cgP9rKlFYRFsnKaZSqaYM7Ykt0JMk8i7L5lTPRx9tqN4VESt2Hh67gecY_Hxta5m3XThdNlaZAXGURkEc4-m8Eo26dwgvgzUjoqOFJsdZ_AXO10xxWaus5oRb_ATVt4K6v1FlKktdDykiKH-TzhPlOGt1zKxuZ6T7l8ieyovrh-w_RUNblDUtu',
    coverAlt: 'Cover Artikel',
    status: 'Published',
    tags: ['POS', 'Cloud', 'Bisnis'],
  });

  const handleOpenAdd = () => {
    setEditingArticle(null);
    setFormData({
      title: '',
      slug: '',
      category: 'pos',
      categoryLabel: 'POS & Ritel Modern',
      excerpt: '',
      content: 'Tulis isi artikel edukasi di sini...',
      readTime: '5 Menit',
      publishDate: 'Hari ini',
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADI6de9pQ5vUbJywJpW9mTgpWu4eZxywsZNgoaXzQH25pMyUlYtIuDHxZLqJUl3-cgP9rKlFYRFsnKaZSqaYM7Ykt0JMk8i7L5lTPRx9tqN4VESt2Hh67gecY_Hxta5m3XThdNlaZAXGURkEc4-m8Eo26dwgvgzUjoqOFJsdZ_AXO10xxWaus5oRb_ATVt4K6v1FlKktdDykiKH-TzhPlOGt1zKxuZ6T7l8ieyovrh-w_RUNblDUtu',
      coverAlt: 'Cover Artikel',
      status: 'Published',
      tags: ['Arsitektur', 'Bisnis'],
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (art: Article) => {
    setEditingArticle(art);
    setFormData(art);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      showToast('Judul artikel wajib diisi', 'error');
      return;
    }

    const articleToSave: Article = {
      id: editingArticle ? editingArticle.id : `art-${Date.now()}`,
      title: formData.title!,
      slug: formData.slug || formData.title!.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: formData.category || 'pos',
      categoryLabel: formData.categoryLabel || 'Teknologi Bisnis',
      excerpt: formData.excerpt || '',
      content: formData.content || '',
      readTime: formData.readTime || '5 Menit',
      publishDate: formData.publishDate || 'Hari ini',
      coverImage: formData.coverImage || '',
      coverAlt: formData.coverAlt || formData.title!,
      status: formData.status || 'Published',
      tags: formData.tags || [],
      author: formData.author || 'Andriawan Delv',
      seoScore: 92,
      seoScoreLabel: 'Optimal',
      views: editingArticle ? editingArticle.views : 0,
      leadsTriggered: editingArticle ? editingArticle.leadsTriggered : 0,
    };

    saveArticle(articleToSave);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#131b2e] tracking-tight">
            Artikel & Edukasi Teknologi
          </h1>
          <p className="text-xs sm:text-sm text-[#464554] mt-1">
            Publikasikan wawasan teknis, strategi pemilihan POS ritel, dan panduan memilih vendor software.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4648d4] hover:bg-[#2f2ebe] text-white text-xs font-bold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-3xl border border-[#eaedff] overflow-hidden shadow-xs hover:border-[#c0c1ff] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-[#4648d4] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {art.categoryLabel}
                </span>
                <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  art.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {art.status}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <span>{art.publishDate}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="text-sm font-bold text-[#131b2e] line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-xs text-[#464554] line-clamp-3">
                  {art.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-[#eaedff] flex items-center justify-between mt-4">
              <button
                onClick={() => setSelectedPublicArticle(art)}
                className="text-xs font-bold text-[#4648d4] hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Lihat Pratinjau</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(art)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-[#4648d4] hover:bg-[#eaedff]"
                  title="Edit Artikel"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteArticle(art.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50"
                  title="Hapus Artikel"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-[#eaedff] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
              <h3 className="text-base font-bold text-[#131b2e]">
                {editingArticle ? 'Edit Artikel' : 'Tulis Artikel Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Judul Artikel <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title ?? ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaedff] text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Kategori Label
                  </label>
                  <input
                    type="text"
                    value={formData.categoryLabel ?? ''}
                    onChange={(e) => setFormData({ ...formData, categoryLabel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaedff] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status ?? 'Published'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaedff] text-xs bg-white"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Ringkasan / Excerpt
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt ?? ''}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Konten Lengkap
                </label>
                <textarea
                  rows={6}
                  value={formData.content ?? ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={formData.coverImage ?? ''}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#eaedff] text-xs"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-gray-500 hover:text-gray-900"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#4648d4] text-white text-xs font-bold hover:bg-[#2f2ebe]"
                >
                  Simpan Artikel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
