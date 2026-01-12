
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Solution } from '../types';
import * as Icons from 'lucide-react';

const Solutions: React.FC = () => {
  const [solutions, setSolutions] = useState<Solution[]>([]);

  useEffect(() => {
    api.getSolutions().then(setSolutions);
  }, []);

  return (
    <section id="solutions" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">核心场景解决方案</h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            基于先进的飞行平台与多维数据感知技术，为不同行业量身定制智能化作业方案
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((item) => {
            // @ts-ignore - dynamic icon lookup
            const IconComponent = Icons[item.icon] || Icons.Zap;
            return (
              <div key={item.id} className="group relative overflow-hidden rounded-2xl bg-slate-50 border hover:border-blue-200 transition-all hover:shadow-xl">
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
