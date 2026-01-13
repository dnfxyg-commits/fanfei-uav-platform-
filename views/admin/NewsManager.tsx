
import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { supabase } from '@/lib/supabaseClient';
import { NewsItem } from '../../types';
import { Plus, Edit, Trash2, X } from 'lucide-react';

const NewsManager: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<NewsItem, 'id'>>({
    title: '',
    date: '',
    category: '',
    summary: '',
    image: '',
  });

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const data = await api.getNews();
    setNews(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.admin.updateNews(editingId, { ...formData, id: editingId });
      } else {
        await api.admin.createNews({ ...formData, id: Date.now().toString() });
      }
      setIsModalOpen(false);
      resetForm();
      loadNews();
    } catch (error) {
      console.error('Operation failed:', error);
      alert('操作失败，请重试');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('确定要删除这条新闻吗？')) {
      try {
        await api.admin.deleteNews(id);
        loadNews();
      } catch (error) {
        console.error('Delete failed:', error);
        alert('删除失败');
      }
    }
  };

  const openEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title || '',
      date: item.date || '',
      category: item.category || '',
      summary: item.summary || '',
      image: item.image || '',
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: '', date: '', category: '', summary: '', image: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">新闻管理</h1>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          <span>新增新闻</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-500">标题</th>
              <th className="px-6 py-4 font-medium text-gray-500">日期</th>
              <th className="px-6 py-4 font-medium text-gray-500">分类</th>
              <th className="px-6 py-4 font-medium text-gray-500 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {news.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                <td className="px-6 py-4 text-gray-600">{item.date}</td>
                <td className="px-6 py-4 text-gray-600">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm">{item.category}</span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {news.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  暂无数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-6">{editingId ? '编辑新闻' : '新增新闻'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">日期</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">摘要</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">图片</label>
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                />
                <input 
                  type="text" 
                  value={formData.image} 
                  required 
                  className="opacity-0 h-0 w-0 absolute"
                  onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity('请上传图片')}
                  onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsManager;
