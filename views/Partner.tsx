
import React from 'react';
import PartnerSection from '../components/PartnerSection';
import { Rocket, ShieldCheck, Briefcase, Zap, Star, Layout } from 'lucide-react';

const PartnerView: React.FC = () => {
  return (
    <div className="animate-fade-in bg-white">
      {/* Intro */}
      <section className="pt-24 pb-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-black rounded-full mb-6 tracking-widest uppercase">Global Partnership</span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
            共享低空万亿市场 <br />
            <span className="text-blue-600">成就您的天空事业</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
            我们不仅寻找经销商，我们寻找的是深度绑定的事业伙伴。
            閞飞翔通过“技术、品牌、资源、资金”四位一体赋能，协助合伙人在当地建立低空产业护城河。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm border border-slate-100">
              <Star className="text-yellow-400" size={18} fill="currentColor" />
              <span className="font-bold text-slate-700">独家经营权</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm border border-slate-100">
              <Star className="text-yellow-400" size={18} fill="currentColor" />
              <span className="font-bold text-slate-700">全链条毛利</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm border border-slate-100">
              <Star className="text-yellow-400" size={18} fill="currentColor" />
              <span className="font-bold text-slate-700">技术背书</span>
            </div>
          </div>
        </div>
      </section>

      {/* Support Types */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">全方位赋能支撑</h2>
            <p className="text-slate-500">从零到一，全程陪伴您的业务增长</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Layout, title: '品牌形象支撑', desc: '提供统一的SI/VI形象设计支持，助力合伙人快速建立专业品牌形象。' },
              { icon: Zap, title: '技术输出支撑', desc: '开放平台API接口与底层算法库，协助合伙人针对本地需求进行二次开发。' },
              { icon: Briefcase, title: '营销推广支撑', desc: '共享官方流量池与展会资源，提供专业的商业路演模板与营销策划案。' },
              { icon: ShieldCheck, title: '运维售后支撑', desc: '建立区域备品备件库，提供7×24小时远程诊断服务与飞行保险方案。' },
              { icon: Rocket, title: '培训认证支撑', desc: '低空学院定期开班，为合伙人团队培养飞手、技术及管理精英。' },
              { icon: Briefcase, title: '金融方案支撑', desc: '联合第三方金融机构提供设备租赁、消费信贷等多元化资金闭环方案。' }
            ].map((s, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <s.icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{s.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">四步轻松开启合作</h2>
          <p className="text-slate-400">标准化加盟流程，助力快速上线</p>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {[
              { step: '01', title: '意向咨询', desc: '提交在线申请，业务经理与您深入沟通。' },
              { step: '02', title: '资质审核', desc: '进行区域资源调研与合伙人背景评估。' },
              { step: '03', title: '签约授权', desc: '签署正式协议，获得品牌及区域经营授权。' },
              { step: '04', title: '全面赋能', desc: '团队进场培训，首批设备交付并正式开业。' }
            ].map((s, idx) => (
              <React.Fragment key={s.step}>
                <div className="flex-1 text-center bg-white/5 p-6 rounded-2xl border border-white/10">
                  <span className="text-blue-500 font-black text-2xl mb-4 block">STEP {s.step}</span>
                  <h4 className="text-lg font-bold mb-2">{s.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block w-8 h-px bg-white/20"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Reuse the PartnerSection which contains the form */}
      <PartnerSection />
    </div>
  );
};

export default PartnerView;
