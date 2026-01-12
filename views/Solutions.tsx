
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Solution } from '../types';
import * as Icons from 'lucide-react';
import { CheckCircle } from 'lucide-react';

const SolutionsView: React.FC = () => {
  const [solutions, setSolutions] = useState<Solution[]>([]);

  useEffect(() => {
    api.getSolutions().then(setSolutions);
  }, []);

  return (
    <div className="animate-fade-in">
      <section className="py-20 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">全行业低空解决方案</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            结合边缘计算、AI识别与自主飞行算法，我们为千行百业提供可落地的低空智能化转型方案。
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        {solutions.map((item, index) => {
          // @ts-ignore
          const IconComponent = Icons[item.icon] || Icons.Zap;
          const isEven = index % 2 === 0;
          return (
            <div key={item.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-sm mb-6">
                  <IconComponent size={18} />
                  <span>行业案例 0{index + 1}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">{item.title}</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {item.description} 基于閞飞翔自研的低空数字孪生平台，能够实现实时环境建模与动态路径优化，解决传统方案成本高、风险大的痛点。
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  <div className="flex items-center gap-3 text-slate-700">
                    <CheckCircle className="text-blue-500" size={20} />
                    <span>成本降低 45% 以上</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <CheckCircle className="text-blue-500" size={20} />
                    <span>全自动化无人值守</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <CheckCircle className="text-blue-500" size={20} />
                    <span>AI 实时隐患预警</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <CheckCircle className="text-blue-500" size={20} />
                    <span>数据全链路云同步</span>
                  </div>
                </div>
                <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                  方案咨询
                </button>
              </div>
              <div className="lg:w-1/2 group relative">
                <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-3 scale-95 opacity-5 -z-0 group-hover:rotate-1 transition-transform"></div>
                <img 
                  src={item.image} 
                  className="rounded-[3rem] shadow-2xl relative z-10 w-full aspect-video object-cover" 
                  alt={item.title} 
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Process Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">标准化交付流程</h2>
            <p className="text-slate-600">从需求调研到长期维保，我们提供全生命周期的服务支持</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: '需求诊断', desc: '深度调研现场作业环境与痛点，输出行业分析报告。' },
              { step: '02', title: '方案定制', desc: '基于场景适配硬件载荷与私有化软件部署。' },
              { step: '03', title: '现场部署', desc: '专业工程师入场，完成航线规划与硬件联调。' },
              { step: '04', title: '维保升级', desc: '7×24小时在线支持，季度硬件巡检与系统更新。' }
            ].map((s) => (
              <div key={s.step} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <span className="text-5xl font-black text-blue-50/50 mb-4 block leading-none">{s.step}</span>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsView;
