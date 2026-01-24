import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Association } from '../../types';
import { Plus, Edit, Trash2, X, Building2 } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

const AssociationManager: React.FC = () => {
  const [associations, setAssociations] = useState<Association[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Association, 'id' | 'created_at'>>({
    name: '',
    type: '协会',
    description: '',
    content: '',
    join_info: '',
    logo: '',
    contact_info: '',
    website: '',
  });

  useEffect(() => {
    loadAssociations();
  }, []);

  const loadAssociations = async () => {
    try {
      const data = await api.getAssociations();
      setAssociations(data);
    } catch (error) {
      console.error('Failed to load associations:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.admin.updateAssociation(editingId, { ...formData, id: editingId });
      } else {
        await api.admin.createAssociation(formData);
      }
      setIsModalOpen(false);
      resetForm();
      loadAssociations();
    } catch (error) {
      console.error('Operation failed:', error);
      alert('操作失败，请重试');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('确定要删除这个组织吗？')) {
      try {
        await api.admin.deleteAssociation(id);
        loadAssociations();
      } catch (error) {
        console.error('Delete failed:', error);
        alert('删除失败');
      }
    }
  };

  const openEdit = (item: Association) => {
    setEditingId(item.id || null);
    setFormData({
      name: item.name,
      type: item.type,
      description: item.description,
      content: item.content || '',
      join_info: item.join_info || '',
      logo: item.logo,
      contact_info: item.contact_info || '',
      website: item.website || '',
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      type: '协会',
      description: '',
      content: '',
      join_info: '',
      logo: '',
      contact_info: '',
      website: '',
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="text-blue-600" />
          团体组织管理
        </h1>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          新增组织
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-700">Logo</th>
              <th className="px-6 py-4 font-semibold text-slate-700">名称</th>
              <th className="px-6 py-4 font-semibold text-slate-700">类型</th>
              <th className="px-6 py-4 font-semibold text-slate-700">简介</th>
              <th className="px-6 py-4 font-semibold text-slate-700 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {associations.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <img src={item.logo} alt={item.name} className="w-12 h-12 object-contain rounded bg-slate-100" />
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.type === '协会' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {item.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 max-w-xs truncate">{item.description}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEdit(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="编辑"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => item.id && handleDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="删除"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {associations.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                  暂无数据，请点击右上角添加
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-slate-900">
                {editingId ? '编辑组织' : '新增组织'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Logo</label>
                  <ImageUpload
                    value={formData.logo}
                    onChange={(url) => setFormData({ ...formData, logo: url })}
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">组织名称</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">类型</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="协会">协会</option>
                      <option value="联盟">联盟</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">官网链接</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="https://"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">简介 (列表显示)</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none h-24 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">详细介绍 (详情页显示)</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none h-48"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">入会方式</label>
                  <textarea
                    value={formData.join_info}
                    onChange={(e) => setFormData({ ...formData, join_info: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none h-32"
                    placeholder="入会要求、流程等"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">联系方式</label>
                  <textarea
                    value={formData.contact_info}
                    onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none h-32"
                    placeholder="电话、邮箱、地址等"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingId ? '保存修改' : '确认新增'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssociationManager;
