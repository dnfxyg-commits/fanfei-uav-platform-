
import React from 'react';
import { Target, Eye, Users, ShieldCheck, Globe, Cpu } from 'lucide-react';

const AboutView: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover" alt="Space" />
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6">连接天空与未来</h1>
          <p className="text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            閞飞翔科技致力于打造全球领先的低空数字基础设施运营平台，赋能智慧城市建设。
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-4 block">关于我们</span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                我们不仅仅制造无人机，<br />我们正在定义低空经济。
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  总部坐落于 上海市闵行区丰虹路9号。此地是 “虹桥长三角低空经济展贸中心” 的核心载体，享有得天独厚的政策与区位优势，为公司链接全球低空产业资源提供了战略支点。
                </p>
                <p>
                  我们希望构建一个 “产业为本、科技驱动、金融赋能、人才引领” 的闭环生态。
                </p>
                <p>
                  不仅要做大市场，更要牵头制定行业标准，并推动中国标准走向世界，在全球低空经济格局中占据重要一席。
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800" className="rounded-3xl shadow-lg mt-12" alt="Tech" />
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" className="rounded-3xl shadow-lg" alt="Lab" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">核心价值观</h2>
            <p className="text-slate-500">我们的每一步决策都源自于内心的基石</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: '技术极客', desc: '对每一行代码、每一项飞行姿态算法都追求极致的精准与极致的性能。' },
              { icon: Eye, title: '远见卓识', desc: '洞察低空经济的未来十年，提前布局数字化、自动化的核心基础设施。' },
              { icon: Users, title: '共赢共生', desc: '不仅成就自己，更要通过平台力量成就合伙人，共同构建产业生态圈。' },
              { icon: ShieldCheck, title: '安全第一', desc: '飞行的边界是安全。我们通过冗余设计与AI预警，确保每一次升空都万无一无。' },
              { icon: Globe, title: '全球视野', desc: '从中国出发，服务全球。我们在多个大洲设有服务网点，提供本土化支持。' },
              { icon: Cpu, title: '创新驱动', desc: '拒绝平庸的迭代。我们勇于突破传统航空器的限制，探索全新的低空形态。' }
            ].map((v, i) => (
              <div key={i} className="bg-white p-10 rounded-[2rem] border border-slate-100 hover:shadow-xl transition-shadow group text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <v.icon size={32} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4">{v.title}</h4>
                <p className="text-slate-500 leading-relaxed text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
           <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16 text-center">发展历程</h2>
           <div className="absolute left-1/2 top-40 bottom-20 w-0.5 bg-slate-100 -translate-x-1/2 hidden md:block"></div>
           <div className="space-y-20">
             {[
               { year: '2024', title: '全球合伙人招募', desc: '全面启动全球城市合伙人计划，首批覆盖东南亚、中东市场。' },
               { year: '2023', title: 'V系列VTOL问世', desc: '首款垂直起降长航程无人机正式商业交付，航测效率提升300%。' },
               { year: '2022', title: '全自动化机库量产', desc: 'M-Station自动化机场量产，实现无人机24小时无人值守巡检。' },
               { year: '2021', title: '閞飞翔成立', desc: '核心团队集结，获得顶级风投A轮融资，专注低空OS研发。' }
             ].map((item, idx) => (
               <div key={idx} className={`flex flex-col md:flex-row items-center gap-10 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                 <div className="md:w-1/2 flex justify-center">
                   <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-xl font-black shadow-xl shadow-blue-500/30 relative z-10">
                     {item.year}
                   </div>
                 </div>
                 <div className={`md:w-1/2 bg-slate-50 p-8 rounded-3xl border border-slate-100 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                   <h4 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h4>
                   <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default AboutView;
