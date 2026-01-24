import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Association } from '../types';
import { Building2, ArrowRight, ExternalLink } from 'lucide-react';
import { ViewType } from '../App';

interface AssociationsViewProps {
  onNavigate: (view: ViewType) => void;
  onSelectAssociation: (id: string) => void;
}

const AssociationsView: React.FC<AssociationsViewProps> = ({ onNavigate, onSelectAssociation }) => {
  const [associations, setAssociations] = useState<Association[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | '协会' | '联盟'>('all');

  useEffect(() => {
    const loadAssociations = async () => {
      try {
        const data = await api.getAssociations();
        setAssociations(data);
      } catch (error) {
        console.error('Failed to load associations:', error);
      }
    };
    loadAssociations();
  }, []);

  const filteredAssociations = activeTab === 'all' 
    ? associations 
    : associations.filter(a => a.type === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 opacity-90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">低空产业团体组织</h1>
            <p className="text-xl text-slate-300">
              汇聚行业力量，共建低空经济生态圈。连接政府、企业与科研机构的桥梁。
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-xl shadow-lg p-2 flex justify-center space-x-2 max-w-md mx-auto">
          {['all', '协会', '联盟'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab === 'all' ? '全部组织' : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAssociations.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col cursor-pointer"
              onClick={() => item.id && onSelectAssociation(item.id)}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-slate-50 p-2 flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                  {item.logo ? (
                    <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
                  ) : (
                    <Building2 className="text-slate-400" size={32} />
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.type === '协会' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                }`}>
                  {item.type}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {item.name}
              </h3>
              
              <p className="text-slate-500 mb-6 line-clamp-3 flex-grow">
                {item.description}
              </p>
              
              <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                查看详情 <ArrowRight className="ml-2" size={16} />
              </div>
            </div>
          ))}
        </div>

        {filteredAssociations.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            暂无相关组织信息
          </div>
        )}
      </div>
    </div>
  );
};

export default AssociationsView;
