
import React, { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react';
import { ViewType } from '../App';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; view: ViewType; primary?: boolean }[] = [
    { name: '首页', view: 'home' },
    { name: '国内展会', view: 'exhibitions' },
    { name: '团体组织', view: 'associations' },
    { name: '低空解决方案', view: 'solutions' },
    { name: '产业装备库', view: 'systems' },
    { name: '产业商机', view: 'news' },
    { name: '关于我们', view: 'about' },
    { name: '合伙人计划', view: 'partner', primary: true },
  ];

  const isTransparent = !scrolled && currentView === 'home';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent py-5' : 'bg-white/90 backdrop-blur-md shadow-sm py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">閞</span>
            </div>
            <span className={`text-2xl font-bold tracking-tight transition-colors ${isTransparent ? 'text-white' : 'text-slate-900'}`}>閞飞翔</span>
            <span className={`hidden sm:block ml-3 pl-3 border-l ${isTransparent ? 'border-white/30 text-blue-100' : 'border-slate-300 text-slate-500'} text-sm font-medium tracking-wide`}>低空经济数字港</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => onNavigate(link.view)}
                className={`text-sm font-medium transition-all relative ${
                  link.primary
                    ? 'bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20'
                    : currentView === link.view
                      ? 'text-blue-600 font-bold'
                      : isTransparent ? 'text-slate-100 hover:text-white' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {link.name}
                {!link.primary && currentView === link.view && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                )}
              </button>
            ))}

            {/* Admin Login - Replaces Language Selector */}
            <a 
              href="/admin/login"
              className={`flex items-center gap-2 cursor-pointer pl-6 border-l transition-colors ${isTransparent ? 'text-slate-100 border-white/20 hover:text-white' : 'text-slate-600 border-slate-200 hover:text-blue-600'}`}
              title="进入管理后台"
            >
              <Lock size={16} />
              <span className="text-sm font-medium">管理后台</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={isTransparent ? 'text-white' : 'text-slate-900'}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  onNavigate(link.view);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                  currentView === link.view
                    ? 'bg-blue-50 text-blue-600'
                    : link.primary
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </button>
            ))}
            
            <a
              href="/admin/login"
              target="_blank"
              className="block w-full text-left px-4 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-colors flex items-center gap-2"
            >
              <Lock size={18} />
              管理后台
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
