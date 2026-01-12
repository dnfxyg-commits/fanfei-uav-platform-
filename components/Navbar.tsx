
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
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
    { name: '低空解决方案', view: 'solutions' },
    { name: '管理系统', view: 'systems' },
    { name: '新闻中心', view: 'news' },
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
            <div className={`flex items-center gap-1 cursor-pointer pl-4 border-l ${isTransparent ? 'text-slate-100 border-white/20' : 'text-slate-600 border-slate-200'}`}>
              <Globe size={16} />
              <span className="text-xs font-bold tracking-tighter">CN</span>
              <ChevronDown size={14} />
            </div>
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
