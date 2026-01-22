import React from 'react';
import { ArrowLeft, Calendar, MapPin, Globe, CheckCircle, Ticket, Store, Zap } from 'lucide-react';
import { EXHIBITIONS } from '../constants';
import { ViewType } from '../App';

interface ExhibitionDetailViewProps {
  id: string;
  onNavigate: (view: ViewType) => void;
}

const ExhibitionDetailView: React.FC<ExhibitionDetailViewProps> = ({ id, onNavigate }) => {
  const exhibition = EXHIBITIONS.find(e => e.id === id);

  if (!exhibition) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Exhibition Not Found</h2>
          <button 
            onClick={() => onNavigate('exhibitions')}
            className="text-blue-600 hover:underline"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 animate-fade-in pb-20">
      {/* Breadcrumb / Back */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={() => onNavigate('exhibitions')}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            展会列表 / {exhibition.title}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <img 
          src={exhibition.image} 
          alt={exhibition.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-3 mb-6">
              {exhibition.tags.map(tag => (
                <span key={tag} className="px-4 py-1.5 bg-white text-slate-900 rounded-full text-xs font-bold uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight max-w-4xl">
              {exhibition.title}
            </h1>
            
            <div className="flex flex-wrap gap-8 text-white/90">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
                  <Calendar className="text-blue-400" size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">举办日期</div>
                  <div className="font-bold">{exhibition.startDate} - {exhibition.endDate?.split('-')[2]}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
                  <MapPin className="text-blue-400" size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">地点</div>
                  <div className="font-bold">{exhibition.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
                  <Globe className="text-blue-400" size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">地区</div>
                  <div className="font-bold">China</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Content */}
          <div className="lg:w-2/3 space-y-8">
            {/* Core Value */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="text-blue-600" size={28} />
                <h2 className="text-2xl font-bold text-slate-900">展会核心价值</h2>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {exhibition.description}
              </p>
              {exhibition.coreValue && (
                <p className="text-lg text-slate-600 leading-relaxed">
                  {exhibition.coreValue}
                </p>
              )}
            </div>

            {/* Highlights */}
            <div className="bg-blue-50/50 rounded-3xl p-8 md:p-12 border border-blue-100">
              <h3 className="text-xl font-bold text-slate-900 mb-8">重点展示内容</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {exhibition.highlights?.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <CheckCircle size={14} className="text-blue-600" />
                    </div>
                    <span className="text-slate-700 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 bg-slate-900 text-white rounded-3xl p-8 shadow-2xl shadow-slate-900/20">
              <div className="space-y-6 mb-8 border-b border-slate-700 pb-8">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">入场申请</span>
                  <span className="text-green-400 flex items-center gap-2 text-sm font-bold">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    正在开放
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">预计展商</span>
                  <span className="font-bold text-lg">2,500+ 全球名企</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">专业观众</span>
                  <span className="font-bold text-lg">50,000+ 预计</span>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-colors shadow-lg shadow-blue-600/30">
                  <Ticket size={20} />
                  门票预订
                </button>
                <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center justify-center gap-3 transition-colors border border-slate-700">
                  <Store size={20} />
                  展位申请
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Need to import Zap but it's not imported above, let's fix imports
// Wait, I imported Calendar, MapPin, Globe, CheckCircle, Ticket, Store, ArrowLeft
// I missed Zap.
// Re-importing all needed icons.

export default ExhibitionDetailView;
