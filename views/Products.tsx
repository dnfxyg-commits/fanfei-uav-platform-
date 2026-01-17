
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Product } from '../types';
import { Search, Filter, ShoppingCart, Zap, Battery, Signal } from 'lucide-react';
import { HARDWARE_CATEGORY_OPTIONS } from '../constants';

const ProductsView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const categories = ['全部', ...HARDWARE_CATEGORY_OPTIONS];

  useEffect(() => {
    api.getProducts().then(setProducts);
  }, []);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredProducts = products.filter(p => {
    const matchCategory = activeCategory === '全部' || p.category === activeCategory;
    const text = `${p.name}${p.description}`.toLowerCase();
    const matchSearch = !normalizedSearch || text.includes(normalizedSearch);
    return matchCategory && matchSearch;
  });

  return (
    <div className="animate-fade-in bg-white min-h-screen">
      {/* Header */}
      <section className="py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">硬件产品目录</h1>
              <p className="text-lg text-slate-500">
                专为极端作业环境设计的工业级飞行平台，定义低空效率新标准。
              </p>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="搜索产品..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-slate-50 border rounded-full text-sm focus:ring-2 focus:ring-blue-100 outline-none w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-[72px] md:top-[80px] z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="flex gap-4 whitespace-nowrap pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProducts.map((p) => (
                <div key={p.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                    <img 
                      src={p.image} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      alt={p.name} 
                    />
                    <div className="absolute top-5 right-5">
                      <button className="w-10 h-10 bg-white/90 backdrop-blur shadow-lg rounded-full flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-colors">
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">{p.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{p.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">{p.description}</p>
                    
                    <div className="grid grid-cols-3 gap-2 mb-8 border-t border-slate-50 pt-6">
                      <div className="text-center">
                        <Zap size={14} className="mx-auto text-blue-500 mb-1" />
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Max Speed</span>
                        <span className="text-xs font-bold text-slate-700">85km/h</span>
                      </div>
                      <div className="text-center border-x border-slate-50">
                        <Battery size={14} className="mx-auto text-blue-500 mb-1" />
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Endurance</span>
                        <span className="text-xs font-bold text-slate-700">55min</span>
                      </div>
                      <div className="text-center">
                        <Signal size={14} className="mx-auto text-blue-500 mb-1" />
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Range</span>
                        <span className="text-xs font-bold text-slate-700">15km</span>
                      </div>
                    </div>

                    <button className="mt-auto w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                      获取详细报价
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter size={32} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">未找到匹配产品</h3>
              <p className="text-slate-500">请尝试切换其他分类或联系客服获取定制化建议</p>
            </div>
          )}
        </div>
      </section>

      {/* Comparison Tool CTA */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">寻找最适合您的设备？</h2>
            <p className="text-slate-400 text-lg">我们的资深技术专家将为您提供免费的产品选型建议，确保您的投资能够获得最大的生产力回报。</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="px-10 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-all">
              联系销售专家
            </button>
            <button className="px-10 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all">
              下载产品白皮书
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsView;
