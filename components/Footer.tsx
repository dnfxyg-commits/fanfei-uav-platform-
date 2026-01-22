import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from 'lucide-react';
import { ViewType } from '../App';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">閞</span>
              </div>
              <span className="text-3xl font-bold tracking-tight">閞飞翔</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              领航全球低空经济新纪元，为千行百业提供顶尖的无人机系统、自动化设施及数字化管理平台。
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8">快速链接</h4>
            <ul className="space-y-4 text-slate-400">
              <li><button onClick={() => onNavigate('home')} className="hover:text-blue-500 transition-colors">首页</button></li>
              <li><button onClick={() => onNavigate('exhibitions')} className="hover:text-blue-500 transition-colors">国内展会</button></li>
              <li><button onClick={() => onNavigate('solutions')} className="hover:text-blue-500 transition-colors">低空解决方案</button></li>
              <li><button onClick={() => onNavigate('systems')} className="hover:text-blue-500 transition-colors">管理系统</button></li>
              <li><button onClick={() => onNavigate('news')} className="hover:text-blue-500 transition-colors">新闻中心</button></li>
              <li><button onClick={() => onNavigate('partner')} className="hover:text-blue-500 transition-colors">合伙人计划</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-blue-500 transition-colors">关于我们</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8">联系我们</h4>
            <ul className="space-y-5">
              <li className="flex gap-4 text-slate-400">
                <MapPin className="text-blue-500 shrink-0" size={24} />
                {/* 👇 修改下面的地址 */}
                <span className="text-sm">上海虹桥商务区閞飞翔大厦</span>
              </li>
              <li className="flex gap-4 text-slate-400">
                <Phone className="text-blue-500 shrink-0" size={24} />
                {/* 👇 修改下面的电话 */}
                <span className="text-sm">18516330891 (9:00-18:00)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">隐私政策</a>
            <a href="#" className="hover:text-white transition-colors">服务协议</a>
            <a href="#" className="hover:text-white transition-colors">合规声明</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
