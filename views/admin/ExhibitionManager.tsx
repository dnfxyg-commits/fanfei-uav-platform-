
import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Exhibition } from '../../types';
import { Plus, Edit, Trash2, X, Calendar } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

const ExhibitionManager: React.FC = () => {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Exhibition, 'id' | 'created_at'>>({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    city: '',
    tags: [],
    image: '',
    featured: false,
    core_value: '',
    highlights: [],
  });

  // Helper state for array inputs
  const [tagsInput, setTagsInput] = useState('');
  const [highlightsInput, setHighlightsInput] = useState('');

  useEffect(() => {
    loadExhibitions();
  }, []);

  const loadExhibitions = async () => {
    try {
      const data = await api.getExhibitions();
      setExhibitions(data);
    } catch (error) {
      console.error('Failed to load exhibitions:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Process array inputs
      const processedData = {
        ...formData,
        tags: tagsInput.split(',').map(t => t.trim()).filter(t => t),
        highlights: highlightsInput.split(',').map(h => h.trim()).filter(h => h),
      };

      if (editingId) {
        await api.admin.updateExhibition(editingId, { ...processedData, id: editingId });
      } else {
        await api.admin.createExhibition(processedData);
      }
      setIsModalOpen(false);
      resetForm();
      loadExhibitions();
    } catch (error) {
      console.error('Operation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`操作失败: ${errorMessage}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('确定要删除这个展会吗？')) {
      try {
        await api.admin.deleteExhibition(id);
        loadExhibitions();
      } catch (error) {
        console.error('Delete failed:', error);
        alert('删除失败');
      }
    }
  };

  const openEdit = (item: Exhibition) => {
    setEditingId(item.id || null);
    setFormData({
      title: item.title,
      description: item.description,
      start_date: item.start_date,
      end_date: item.end_date,
      location: item.location,
      city: item.city,
      tags: item.tags || [],
      image: item.image,
      featured: item.featured || false,
      core_value: item.core_value || '',
      highlights: item.highlights || [],
    });
    setTagsInput((item.tags || []).join(', '));
    setHighlightsInput((item.highlights || []).join(', '));
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      location: '',
      city: '',
      tags: [],
      image: '',
      featured: false,
      core_value: '',
      highlights: [],
    });
    setTagsInput('');
    setHighlightsInput('');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">展会管理</h1>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          <span>发布展会</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-500">展会名称</th>
              <th className="px-6 py-4 font-medium text-gray-500">时间</th>
              <th className="px-6 py-4 font-medium text-gray-500">地点</th>
              <th className="px-6 py-4 font-medium text-gray-500">城市</th>
              <th className="px-6 py-4 font-medium text-gray-500 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {exhibitions.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.title} className="w-10 h-10 rounded object-cover" />
                    <div>
                      <div>{item.title}</div>
                      {item.featured && <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">推荐</span>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {item.start_date} ~ {item.end_date}
                </td>
                <td className="px-6 py-4 text-gray-600">{item.location}</td>
                <td className="px-6 py-4 text-gray-600">{item.city}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id!)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {exhibitions.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  暂无展会数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-10">
          <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative my-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-6">{editingId ? '编辑展会' : '发布展会'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">展会名称</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">举办城市</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                    placeholder="例如：北京"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">具体地点</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                    placeholder="例如：国家会议中心"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">展会简介</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">核心价值 (选填)</label>
                <input
                  type="text"
                  value={formData.core_value || ''}
                  onChange={(e) => setFormData({ ...formData, core_value: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="例如：连接全球低空经济产业链"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">标签 (逗号分隔)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="例如：无人机, 通用航空, 低空经济"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">亮点 (逗号分隔)</label>
                  <input
                    type="text"
                    value={highlightsInput}
                    onChange={(e) => setHighlightsInput(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="例如：500+展商, 顶级论坛"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">设为推荐展会</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">封面图片</label>
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

export default ExhibitionManager;
