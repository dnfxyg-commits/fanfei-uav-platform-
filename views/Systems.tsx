
import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { Search, Filter, Terminal, Cpu, Cloud, Database, BarChart3, Lock, Activity, Play } from 'lucide-react';

const SystemsView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('全部');
  const categories = ['全部', '云端管理平台', '地面控制软件', '行业应用系统'];

  const filteredSystems = activeCategory === '全部' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="animate-fade-in bg-white min-h-screen">
      {/* Header */}
      <section className="py-16 border-b border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2 block">Management Systems</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">管理系统目录</h1>
              <p className="text-lg text-slate-500">
                定义低空数字化效率，全栈式无人机云管控与智能分析系统。
              </p>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="搜索系统功能..." 
                  className="pl-10 pr-4 py-2.5 bg-white border rounded-full text-sm focus:ring-2 focus:ring-blue-100 outline-none w-64 shadow-sm"
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
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border'
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
          {filteredSystems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredSystems.map((s) => (
                <div key={s.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 flex flex-col">
                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    {s.video ? (
                      <video 
                        src={s.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100"
                      />
                    ) : (
                      <img 
                        src={s.image} 
                        className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-100" 
                        alt={s.name} 
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                    
                    {/* Live Badge if video exists */}
                    {s.video && (
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-blue-600/80 backdrop-blur rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                        Live Demo
                      </div>
                    )}

                    <div className="absolute top-5 right-5">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white">
                        {s.video ? <Play size={18} fill="currentColor" /> : <Terminal size={18} />}
                      </div>
                    </div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">{s.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{s.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">{s.description}</p>
                    
                    <div className="grid grid-cols-3 gap-2 mb-8 border-t border-slate-50 pt-6">
                      <div className="text-center">
                        <Cloud size={14} className="mx-auto text-blue-500 mb-1" />
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Cloud</span>
                        <span className="text-xs font-bold text-slate-700">Native</span>
                      </div>
                      <div className="text-center border-x border-slate-50">
                        <BarChart3 size={14} className="mx-auto text-blue-500 mb-1" />
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Latency</span>
                        <span className="text-xs font-bold text-slate-700">&lt;100ms</span>
                      </div>
                      <div className="text-center">
                        <Lock size={14} className="mx-auto text-blue-500 mb-1" />
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Security</span>
                        <span className="text-xs font-bold text-slate-700">AES-256</span>
                      </div>
                    </div>

                    <button className="mt-auto w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 group">
                      获取系统试用
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Database size={32} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">未找到匹配系统</h3>
              <p className="text-slate-500">请尝试切换其他分类或联系客服获取定制化建议</p>
            </div>
          )}
        </div>
      </section>

      {/* Optimized Tech Stack Section */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        {/* Background Large Text */}
        <div className="absolute top-10 left-10 pointer-events-none opacity-[0.03] select-none whitespace-nowrap">
          <span className="text-[12rem] font-black italic">数字化技术栈</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {[
              { icon: Cpu, title: '边缘计算', desc: '低延迟机载AI推理，实现实时环境感知与精准决策。', color: 'blue' },
              { icon: Cloud, title: '云端协同', desc: '海量航拍数据云端秒级处理，支持跨地域多终端实时同步。', color: 'indigo' },
              { icon: Database, title: '数字孪生', desc: '三维高精度地图实时渲染，动态飞行航迹全景可视化叠加。', color: 'purple' },
              { icon: Lock, title: '合规安全', desc: '严格遵守国家无人机管控标准，AES-256全链路加密传输。', color: 'cyan' }
            ].map((t, i) => (
              <div key={i} className="group p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className={`w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <t.icon size={30} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-3">{t.title}</h4>
                    <p className="text-slate-400 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Monitoring Bar */}
          <div className="relative pt-12">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm tracking-widest uppercase">
                <Activity size={16} className="animate-pulse" />
                <span>实时状态监控系统</span>
              </div>
            </div>
            
            <div className="relative h-12 bg-white/5 rounded-full overflow-hidden flex items-center px-2">
              <div className="absolute inset-y-1.5 left-1.5 w-3/4 bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
              <div className="relative w-full flex justify-between px-8 text-[10px] font-bold text-white/40 tracking-widest">
                <span>SYSTEM_ID: FN-9912</span>
                <span>LATENCY: 42ms</span>
                <span>AVAILABILITY: 99.9%</span>
                <span className="hidden md:block">SIGNAL: EXCELLENT</span>
              </div>
            </div>

            {/* Traffic Card */}
            <div className="absolute -top-10 right-0 lg:-right-4 bg-white text-slate-950 p-6 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-6 min-w-[240px]">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                <BarChart3 size={24} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">Real-time Traffic</div>
                <div className="text-2xl font-black text-blue-600">1,284 Flights</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SystemsView;
