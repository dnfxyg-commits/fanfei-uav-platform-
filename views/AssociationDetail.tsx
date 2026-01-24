import React, { useEffect, useState } from 'react';
import { ArrowLeft, Globe, Phone, Mail, FileText, UserPlus } from 'lucide-react';
import { api } from '../services/api';
import { Association } from '../types';
import { ViewType } from '../App';
import { Loader2 } from 'lucide-react';

interface AssociationDetailProps {
  id: string;
  onNavigate: (view: ViewType) => void;
}

const AssociationDetail: React.FC<AssociationDetailProps> = ({ id, onNavigate }) => {
  const [association, setAssociation] = useState<Association | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssociation = async () => {
      if (!id) return;
      try {
        const data = await api.getAssociation(id);
        setAssociation(data);
      } catch (error) {
        console.error('Failed to load association:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssociation();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (!association) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <p className="text-slate-500 mb-4">未找到该组织信息</p>
        <button
          onClick={() => onNavigate('associations')}
          className="text-blue-600 hover:underline"
        >
          返回列表
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => onNavigate('associations')}
            className="flex items-center text-slate-500 hover:text-blue-600 transition-colors mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            返回列表
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-24 h-24 bg-slate-50 rounded-xl border border-slate-100 p-4 flex items-center justify-center flex-shrink-0">
              <img src={association.logo} alt={association.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-slate-900">{association.name}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  association.type === '协会' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {association.type}
                </span>
              </div>
              <p className="text-slate-500 text-lg max-w-3xl">{association.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <FileText className="text-blue-600" />
                组织介绍
              </h2>
              <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-600 leading-relaxed">
                {association.content || '暂无详细介绍'}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <UserPlus className="text-blue-600" />
                入会方式
              </h2>
              <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-600 leading-relaxed bg-blue-50 p-6 rounded-xl border border-blue-100">
                {association.join_info || '请联系我们咨询入会事宜。'}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">联系信息</h3>
              <div className="space-y-4">
                {association.website && (
                  <a 
                    href={association.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-slate-600 hover:text-blue-600 transition-colors p-3 rounded-lg hover:bg-slate-50"
                  >
                    <Globe size={20} className="mt-0.5" />
                    <span className="break-all">{association.website}</span>
                    <ExternalLink size={16} className="ml-auto mt-0.5 opacity-50" />
                  </a>
                )}
                {association.contact_info && (
                  <div className="flex items-start gap-3 text-slate-600 p-3">
                    <Phone size={20} className="mt-0.5" />
                    <div className="whitespace-pre-wrap">{association.contact_info}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssociationDetail;
