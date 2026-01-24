
import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Solutions from '../components/Solutions';
import { ViewType } from '../App';
import { TrendingUp, Award, Zap, Globe } from 'lucide-react';
import { api } from '../services/api';
import { Product } from '../types';
import { PRODUCTS } from '../constants';

interface HomeViewProps {
  onNavigate: (view: ViewType) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.getProducts().then(setProducts).catch(() => {});
  }, []);

  const sourceProducts = products.length > 0 ? products : PRODUCTS;
  const cloudSystem =
    sourceProducts.find(p => p.category === '云端管理平台') || sourceProducts[0];
  const aiSystem =
    sourceProducts.find(p => p.category === '行业应用系统') || sourceProducts[1] || sourceProducts[0];

  return (
    <>
      <Hero />
      
      {/* Dynamic Stats Banner */}
      <section className="relative -mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="text-blue-200" size={24} />
                <span className="text-3xl md:text-5xl font-extrabold">50+</span>
              </div>
              <p className="text-blue-100 text-sm font-medium tracking-wide">全球覆盖城市</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-blue-200" size={24} />
                <span className="text-3xl md:text-5xl font-extrabold">200k+</span>
              </div>
              <p className="text-blue-100 text-sm font-medium tracking-wide">安全飞行小时</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="text-blue-200" size={24} />
                <span className="text-3xl md:text-5xl font-extrabold">1000+</span>
              </div>
              <p className="text-blue-100 text-sm font-medium tracking-wide">认证合伙人</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="text-blue-200" size={24} />
                <span className="text-3xl md:text-5xl font-extrabold">30+</span>
              </div>
              <p className="text-blue-100 text-sm font-medium tracking-wide">行业核心专利</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-4 block">产业趋势</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                低空经济：<br />下一个万亿级蓝海市场
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                随着国家政策的全面放开与技术的飞速迭代，低空空域正从“禁飞区”转变为“生产力”。
                閞飞翔通过构建“云、端、站”一体化的基础设施，正在为智慧物流、精准农业、城市安全等领域带来颠覆性的效率提升。
              </p>
              <button 
                onClick={() => onNavigate('solutions')}
                className="px-8 py-3.5 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors"
              >
                了解更多行业应用
              </button>
            </div>
            <div className="md:w-1/2 relative">
              <img 
                src="https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&q=80&w=1000" 
                className="rounded-[2.5rem] shadow-2xl relative z-10" 
                alt="Technology Insight" 
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-100 rounded-full -z-0"></div>
              <div className="absolute -top-6 -left-6 w-48 h-48 border-2 border-slate-100 rounded-full -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      <Solutions />

      {/* Featured Systems Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">全栈数字化管理系统</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            从空域管控到行业分析，我们提供完整的数字化软件套件，为低空作业提供智慧大脑。
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <div className="group relative h-[450px] overflow-hidden rounded-[2rem] shadow-lg bg-slate-900">
            {cloudSystem ? (
              <>
                <img
                  src={cloudSystem.image}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={cloudSystem.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
                  <h3 className="text-3xl font-bold text-white mb-3">{cloudSystem.name}</h3>
                  <p className="text-slate-200 mb-6">{cloudSystem.description}</p>
                  <button
                    onClick={() => onNavigate('systems')}
                    className="w-fit px-6 py-2.5 bg-white text-slate-900 rounded-full font-bold text-sm hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    进入装备库
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-slate-200" />
            )}
          </div>
          <div className="group relative h-[450px] overflow-hidden rounded-[2rem] shadow-lg bg-slate-900">
            {aiSystem ? (
              <>
                <img
                  src={aiSystem.image}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt={aiSystem.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
                  <h3 className="text-3xl font-bold text-white mb-3">{aiSystem.name}</h3>
                  <p className="text-slate-200 mb-6">{aiSystem.description}</p>
                  <button
                    onClick={() => onNavigate('systems')}
                    className="w-fit px-6 py-2.5 bg-white text-slate-900 rounded-full font-bold text-sm hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    进入装备库
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-slate-200" />
            )}
          </div>
        </div>
      </section>

      {/* Global Call */}
      <section className="py-24 bg-blue-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">开启您的低空事业新篇章</h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            閞飞翔现面向全球招募“城市合伙人”。我们将提供全栈式技术支持、成熟的商业模式与全球品牌赋能，与您共同挖掘低空蓝天下的无限可能。
          </p>
          <button 
            onClick={() => onNavigate('partner')}
            className="px-10 py-5 bg-blue-600 hover:bg-blue-500 rounded-full font-bold text-xl transition-all shadow-xl shadow-blue-500/30"
          >
            申请加入合伙人计划
          </button>
        </div>
      </section>
    </>
  );
};

export default HomeView;
