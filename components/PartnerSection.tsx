
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { PartnerBenefit } from '../types';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const PartnerSection: React.FC = () => {
  const [benefits, setBenefits] = useState<PartnerBenefit[]>([]);

  useEffect(() => {
    api.getBenefits().then(setBenefits);
  }, []);

  return (
    <section id="partner" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              加入全球城市合伙人计划 <br />
              <span className="text-blue-500">共建低空产业生态圈</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10">
              低空经济已成为全球战略性新兴产业。閞飞翔正面向全球城市招募具备当地资源优势的合伙人，
              通过输出先进产品与商业闭环模型，助力合伙人快速占领当地低空业务蓝海。
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, idx) => {
                // @ts-ignore
                const Icon = Icons[benefit.icon] || Icons.CheckCircle;
                return (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-600/30">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-sm text-slate-400">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 text-slate-900 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">申请成为合伙人</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">姓名</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg bg-slate-50 border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="请输入姓名" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">联系电话</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-lg bg-slate-50 border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="常用手机号" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">所属公司/机构</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg bg-slate-50 border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="公司名称" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">目标加盟城市/地区</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg bg-slate-50 border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="例如：上海、迪拜、曼谷" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">留言说明</label>
                <textarea rows={3} className="w-full px-4 py-3 rounded-lg bg-slate-50 border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="简述您的资源优势或合作意向"></textarea>
              </div>
              <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group">
                提交加盟申请
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-xs text-slate-400">
                提交后我们的业务经理将在1-3个工作日内与您取得联系。
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
