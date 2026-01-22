
import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '../../types';
import { Plus, Edit, Trash2, X, ArrowUp, ArrowDown } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import { PRODUCT_CATEGORY_OPTIONS } from '../../constants';

const CATEGORY_OPTIONS = PRODUCT_CATEGORY_OPTIONS;

const getCategoryColor = (category: string) => {
  if (category.includes('云端') || category.includes('系统')) return 'bg-blue-50 text-blue-600 border border-blue-100';
  if (category.includes('硬件') || category.includes('固定翼') || category.includes('VTOL') || category.includes('机库') || category.includes('消费')) return 'bg-purple-50 text-purple-600 border border-purple-100';
  if (category.includes('服务') || category.includes('巡检')) return 'bg-green-50 text-green-600 border border-green-100';
  return 'bg-gray-100 text-gray-600 border border-gray-100';
};

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    category: '',
    description: '',
    image: '',
    video: '',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await api.getProducts();
    setProducts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.admin.updateProduct(editingId, { ...formData, id: editingId });
      } else {
        await api.admin.createProduct({ ...formData, id: Date.now().toString() });
      }
      setIsModalOpen(false);
      resetForm();
      loadProducts();
    } catch (error) {
      console.error('Operation failed:', error);
      if (error instanceof Error) {
        alert(`操作失败：${error.message}`);
      } else {
        alert('操作失败，请重试');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('确定要删除这个产品吗？')) {
      try {
        await api.admin.deleteProduct(id);
        loadProducts();
      } catch (error) {
        console.error('Delete failed:', error);
        alert('删除失败');
      }
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === products.length - 1)
    ) {
      return;
    }

    const newProducts = [...products];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap locally
    [newProducts[index], newProducts[targetIndex]] = [newProducts[targetIndex], newProducts[index]];
    setProducts(newProducts);

    // Calculate new orders (simple implementation: use index * 10)
    // To ensure consistency, we update ALL items with their new index * 10
    const updates = newProducts.map((p, idx) => ({
      id: p.id,
      sort_order: idx * 10
    }));

    try {
      await api.admin.reorderProducts(updates);
    } catch (error) {
      console.error('Reorder failed:', error);
      alert('排序更新失败');
      loadProducts(); // Revert on error
    }
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name || '',
      category: product.category || '',
      description: product.description || '',
      image: product.image || '',
      video: product.video || '',
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: '', category: '', description: '', image: '', video: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">产品管理</h1>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          <span>新增产品</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-500">产品名称</th>
              <th className="px-6 py-4 font-medium text-gray-500 w-24 text-center">排序</th>
              <th className="px-6 py-4 font-medium text-gray-500">类别</th>
              <th className="px-6 py-4 font-medium text-gray-500">描述</th>
              <th className="px-6 py-4 font-medium text-gray-500 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                     <button 
                        onClick={() => handleMove(index, 'up')}
                        disabled={index === 0}
                        className={`p-1 rounded hover:bg-gray-100 ${index === 0 ? 'text-gray-300' : 'text-gray-600'}`}
                        title="上移"
                     >
                        <ArrowUp size={16} />
                     </button>
                     <button 
                        onClick={() => handleMove(index, 'down')}
                        disabled={index === products.length - 1}
                        className={`p-1 rounded hover:bg-gray-100 ${index === products.length - 1 ? 'text-gray-300' : 'text-gray-600'}`}
                        title="下移"
                     >
                        <ArrowDown size={16} />
                     </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(product.category || '')}`}>{product.category}</span>
                </td>
                <td className="px-6 py-4 text-gray-600 max-w-md truncate">{product.description}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => openEdit(product)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
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
            <h2 className="text-xl font-bold mb-6">{editingId ? '编辑产品' : '新增产品'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">产品名称</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">类别</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  required
                >
                  <option value="" disabled>
                    请选择类别
                  </option>
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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

export default ProductManager;
