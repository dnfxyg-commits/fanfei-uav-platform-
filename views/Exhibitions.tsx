import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Globe, ArrowRight, Filter } from 'lucide-react';
import { api } from '../services/api';
import { Exhibition } from '../types';
import { ViewType } from '../App';

interface ExhibitionsViewProps {
  onNavigate: (view: ViewType) => void;
  onSelectExhibition: (id: string) => void;
}

const MONTHS = [
  '2026年1月', '2026年2月', '2026年3月', '2026年4月', '2026年5月', '2026年6月',
  '2026年7月', '2026年8月', '2026年9月', '2026年10月', '2026年11月', '2026年12月'
];

const CITIES = [
  '深圳', '广州', '北京', '上海', '成都', '珠海', '杭州', '西安', '南京'
];

const ExhibitionsView: React.FC<ExhibitionsViewProps> = ({ onNavigate, onSelectExhibition }) => {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('全部');
  const [selectedCity, setSelectedCity] = useState<string>('全部');

  useEffect(() => {
    const loadExhibitions = async () => {
      try {
        const data = await api.getExhibitions();
        setExhibitions(data);
      } catch (error) {
        console.error('Failed to load exhibitions:', error);
      }
    };
    loadExhibitions();
  }, []);

  const filteredExhibitions = exhibitions.filter(ex => {
    const cityMatch = selectedCity === '全部' || ex.city === selectedCity;
    // For now, date filtering is not implemented strictly as it requires parsing
    return cityMatch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Filters Section */}
      <section className="bg-white pt-8 pb-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-xl shadow-slate-200/50">
            
            {/* Time Filter */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8 border-b border-slate-50 pb-8">
              <span className="font-bold text-slate-900 min-w-[80px]">展示时间</span>
              <div className="flex flex-wrap gap-3 flex-1">
                <button
                  onClick={() => setSelectedMonth('全部')}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                    selectedMonth === '全部' 
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                      : 'bg-transparent text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  全部
                </button>
                {MONTHS.map(month => (
                  <button
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedMonth === month
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                        : 'text-slate-500 hover:text-orange-500 hover:bg-orange-50'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>

            {/* City Filter */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <span className="font-bold text-slate-900 min-w-[80px]">热门城市</span>
              <div className="flex flex-wrap gap-3 flex-1">
                <button
                  onClick={() => setSelectedCity('全部')}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                    selectedCity === '全部' 
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                      : 'bg-transparent text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  全部
                </button>
                {CITIES.map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedCity === city
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                        : 'text-slate-500 hover:text-orange-500 hover:bg-orange-50'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Filter className="text-blue-600" size={24} />
            <h2 className="text-xl font-bold text-slate-900">为您甄选 <span className="text-slate-400 text-base font-normal ml-2">{filteredExhibitions.length} RESULTS</span></h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExhibitions.map((item) => (
              <div 
                key={item.id} 
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 cursor-pointer flex flex-col h-full"
                onClick={() => onSelectExhibition(item.id)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                        tag === 'FEATURED' ? 'bg-amber-400 text-amber-900' : 'bg-blue-600 text-white'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 mb-6 line-clamp-2 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="mt-auto space-y-3 pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-3 text-slate-600 text-sm">
                      <Calendar size={16} className="text-blue-500" />
                      <span>{item.start_date} - {item.end_date && item.end_date.split('-')[2]}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-sm">
                      <MapPin size={16} className="text-blue-500" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-sm">
                      <Globe size={16} className="text-blue-500" />
                      <span>China</span>
                    </div>
                    <div className="flex items-center gap-3 text-blue-600 text-sm font-medium pt-2">
                      <Globe size={16} />
                      <span>官方网站</span>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-2 group-hover:gap-3 transition-all">
                      查看详情 <ArrowRight size={16} />
                    </span>
                    <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <Globe size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredExhibitions.length === 0 && (
               <div className="col-span-full py-12 text-center text-slate-500">
                 暂无相关展会数据
               </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExhibitionsView;
