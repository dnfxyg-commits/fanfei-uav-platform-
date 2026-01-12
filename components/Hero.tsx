
import React from 'react';
import { ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image / Placeholder for Video */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=2000"
          alt="UAV background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight animate-fade-in">
            閞飞翔 <br />
            <span className="text-blue-400">领航低空经济新纪元</span>
          </h1>
          <p className="mt-6 text-xl text-slate-200 max-w-2xl leading-relaxed">
            我们致力于打造全球领先的智慧无人机全产业链平台，通过科技赋能每一个低空作业场景，构建高效、智能、互联的蓝天新未来。
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="#partner"
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/30"
            >
              招募全球城市合伙人
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#solutions"
              className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center"
            >
              探索低空方案
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-white to-transparent opacity-50"></div>
      </div>
    </div>
  );
};

export default Hero;
