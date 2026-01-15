
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Product } from '../types';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.getProducts().then(setProducts);
  }, []);

  return (
    <section id="products" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">高性能低空载体</h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            工业级标准，满足各种极端环境下的高频次、高难度作业需求
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
              <div className="relative group overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{product.name}</h3>
                <p className="text-slate-600 mb-6 line-clamp-2">{product.description}</p>
                <button className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1 group">
                  查看技术参数
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
