import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, Calendar, MapPin, Globe, CheckCircle, Ticket, Store, Zap, X, Loader2 } from 'lucide-react';
import { ViewType } from '../App';
import { api } from '../services/api';
import { Exhibition, ExhibitionApplication } from '../types';

interface ExhibitionDetailViewProps {
  id: string;
  onNavigate: (view: ViewType) => void;
}

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'ticket' | 'booth';
  exhibitionTitle: string;
  exhibitionId: string;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, type, exhibitionTitle, exhibitionId }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const applicationData: ExhibitionApplication = {
        exhibition_id: exhibitionId,
        exhibition_title: exhibitionTitle,
        type: type,
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        email: formData.email,
        message: formData.message
      };

      await api.submitExhibitionApplication(applicationData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({ name: '', phone: '', company: '', email: '', message: '' });
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Submission error:', err);
      setError('提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl scale-100 animate-scale-in">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {type === 'ticket' ? '门票预订' : '展位申请'}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {exhibitionTitle}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">提交成功</h4>
              <p className="text-slate-500">我们会尽快与您联系</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">姓名 <span className="text-red-500">*</span></label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="您的姓名"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">公司名称 <span className="text-red-500">*</span></label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="公司全称"
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">联系电话 <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="tel"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="手机号码"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">电子邮箱</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="选填"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">留言备注</label>
                <textarea
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all h-24 resize-none"
                  placeholder="如有特殊需求请留言..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    提交中...
                  </>
                ) : (
                  '确认提交'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

const ExhibitionDetailView: React.FC<ExhibitionDetailViewProps> = ({ id, onNavigate }) => {
  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState<{ isOpen: boolean; type: 'ticket' | 'booth' }>({
    isOpen: false,
    type: 'ticket'
  });

  useEffect(() => {
    const fetchExhibition = async () => {
      if (!id) return;
      try {
        const data = await api.getExhibition(id);
        setExhibition(data);
      } catch (error) {
        console.error('Failed to load exhibition:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibition();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

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
                  <div className="font-bold">{exhibition.start_date} - {exhibition.end_date?.split('-')[2]}</div>
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
              {exhibition.core_value && (
                <p className="text-lg text-slate-600 leading-relaxed">
                  {exhibition.core_value}
                </p>
              )}
            </div>

            {/* Highlights */}
            <div className="bg-blue-50/50 rounded-3xl p-8 md:p-12 border border-blue-100">
              <h3 className="text-xl font-bold text-slate-900 mb-8">重点展示内容</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {exhibition.highlights && exhibition.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    <p className="text-slate-700 font-medium pt-2">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">往届精彩瞬间</h3>
              {exhibition.gallery_images && exhibition.gallery_images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {exhibition.gallery_images.map((img, i) => (
                    <div key={i} className="aspect-square rounded-xl bg-slate-100 overflow-hidden">
                      <img 
                        src={img} 
                        alt="Gallery" 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-xl">
                  暂无图片
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
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
                  <button 
                    onClick={() => setModalState({ isOpen: true, type: 'ticket' })}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 group"
                  >
                    <Ticket size={20} className="group-hover:-rotate-12 transition-transform" />
                    免费预订门票
                  </button>
                  <button 
                    onClick={() => setModalState({ isOpen: true, type: 'booth' })}
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <Store size={20} />
                    申请展位
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ApplicationModal 
        isOpen={modalState.isOpen} 
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        type={modalState.type}
        exhibitionTitle={exhibition.title}
        exhibitionId={exhibition.id}
      />
    </div>
  );
};

export default ExhibitionDetailView;
