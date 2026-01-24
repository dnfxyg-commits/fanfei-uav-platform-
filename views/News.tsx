
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { NewsItem } from '../types';
import { Calendar, Tag, ArrowRight, ChevronRight, ArrowLeft, Share2, MessageCircle } from 'lucide-react';
import { NEWS_CATEGORY_OPTIONS } from '../constants';

const NewsView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const categories = ['全部', ...NEWS_CATEGORY_OPTIONS];

  useEffect(() => {
    api.getNews().then(setNewsItems);
  }, []);

  const filteredNews = activeCategory === '全部' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  const handleShareWeChat = () => {
    try {
      const url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
          alert('已复制页面链接，请在微信中粘贴分享给好友或朋友圈。');
        }).catch(() => {
          alert('请手动复制浏览器地址栏中的链接，在微信中分享。');
        });
      } else {
        alert('请手动复制浏览器地址栏中的链接，在微信中分享。');
      }
    } catch {
      alert('请手动复制浏览器地址栏中的链接，在微信中分享。');
    }
  };

  const handleShareWeibo = (item: NewsItem) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(item.title);
    const pic = encodeURIComponent(item.image || '');
    const shareUrl = `https://service.weibo.com/share/share.php?url=${url}&title=${title}&pic=${pic}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="animate-fade-in bg-white min-h-screen">
      {/* Header */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">新闻中心</h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              获取閞飞翔的最新动态、技术突破以及低空产业的深度观察。
            </p>
          </div>
        </div>
      </section>

      {selectedNews ? (
        <>
          <section className="sticky top-[72px] md:top-[80px] z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
              <button
                onClick={() => setSelectedNews(null)}
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600"
              >
                <ArrowLeft size={16} />
                返回商机列表
              </button>
              <span className="text-xs text-slate-400">Business Opportunities</span>
            </div>
          </section>

          <section className="py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mr-3">
                  {selectedNews.category}
                </span>
                <span className="inline-flex items-center gap-1 text-slate-400 text-xs">
                  <Calendar size={12} />
                  <span>{selectedNews.date}</span>
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-snug">
                {selectedNews.title}
              </h1>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8 text-xs text-slate-500">
                <div className="flex flex-wrap gap-3">
                  <span>文章来源：{selectedNews.source || '閞飞翔低空产业平台'}</span>
                  <span>作者：{selectedNews.author || '品牌公关部'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">分享到：</span>
                  <button
                    onClick={handleShareWeChat}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-600 hover:bg-green-100 text-xs font-bold"
                  >
                    <MessageCircle size={14} />
                    微信
                  </button>
                  {selectedNews && (
                    <button
                      onClick={() => handleShareWeibo(selectedNews)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold"
                    >
                      <Share2 size={14} />
                      微博
                    </button>
                  )}
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden mb-10 bg-slate-100">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full max-h-[420px] object-cover"
                />
              </div>
              <div className="prose prose-slate max-w-none text-base md:text-lg leading-relaxed">
                <p className="mb-4">{selectedNews.summary}</p>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="sticky top-[72px] md:top-[80px] z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 whitespace-nowrap scrollbar-hide">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                        activeCategory === cat 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {filteredNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {filteredNews.map((item) => (
                    <article key={item.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500">
                      <div className="relative aspect-video overflow-hidden bg-slate-100">
                        <img 
                          src={item.image} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          alt={item.title} 
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-8 flex-grow flex flex-col">
                        <div className="flex items-center gap-4 text-slate-400 text-xs mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{item.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Tag size={12} />
                            <span>閞飞翔</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">
                          {item.summary}
                        </p>
                        <button
                          onClick={() => {
                            setSelectedNews(item);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="mt-auto flex items-center gap-2 text-blue-600 font-bold text-sm group-hover:gap-3 transition-all"
                        >
                          阅读全文
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">暂无相关商机</h3>
                  <p className="text-slate-500">请尝试切换其他分类查看</p>
                </div>
              )}
              
              <div className="mt-20 flex justify-center gap-4">
                <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50">
                  <ChevronRight size={20} className="rotate-180" />
                </button>
                <button className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-500/30">1</button>
                <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 font-bold">2</button>
                <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </section>

          <section className="py-24 bg-blue-600 text-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">订阅行业内参</h2>
              <p className="text-blue-100 mb-10 text-lg">每月一次，为您汇总低空经济领域的政策解读、技术趋势与閞飞翔核心月报。</p>
              <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="请输入您的电子邮箱" 
                  className="flex-grow px-8 py-4 rounded-full bg-white text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-400/50"
                />
                <button className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all">
                  立即订阅
                </button>
              </form>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default NewsView;
