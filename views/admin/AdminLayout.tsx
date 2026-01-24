
import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Briefcase, FileText, LogOut, ClipboardList, Shield, Users, Calendar, Building2 } from 'lucide-react';
import { AdminRole } from '@/types';

const AdminLayout: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<AdminRole | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
        const token = localStorage.getItem('access_token');
        const savedRole = localStorage.getItem('admin_role') as AdminRole;
        
        if (!token || !savedRole) {
            navigate('/admin/login');
            return;
        }
        
        setRole(savedRole);
        setLoading(false);
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('admin_username');
    localStorage.removeItem('admin_role');
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Define menu items
  const allNavItems = [
    { path: '/admin/dashboard', label: '仪表盘', icon: LayoutDashboard, roles: ['super_admin', 'content_operator', 'business_operator'] },
    { path: '/admin/exhibitions', label: '展会管理', icon: Calendar, roles: ['super_admin', 'content_operator'] },
    { path: '/admin/solutions', label: '解决方案', icon: Briefcase, roles: ['super_admin', 'content_operator'] },
    { path: '/admin/products', label: '产品管理', icon: Package, roles: ['super_admin', 'content_operator'] },
    { path: '/admin/news', label: '新闻动态', icon: FileText, roles: ['super_admin', 'content_operator'] },
    { path: '/admin/applications', label: '表单提交', icon: ClipboardList, roles: ['super_admin', 'business_operator'] },
    { path: '/admin/users', label: '用户管理', icon: Users, roles: ['super_admin'] },
  ];

  // Filter items based on role
  // If role is null (e.g. table not ready), we might show nothing or all (let's show nothing safe)
  // Or for development, if no role found but logged in, maybe show dashboard?
  // Let's strict:
  const navItems = allNavItems.filter(item => 
    role && item.roles.includes(role)
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Shield className="text-blue-500" />
            后台管理系统
          </h1>
          {role && (
            <div className="mt-2 text-xs text-slate-400 uppercase tracking-wider bg-slate-800 py-1 px-2 rounded w-fit">
              {role === 'super_admin' && '超级管理员'}
              {role === 'content_operator' && '内容运营'}
              {role === 'business_operator' && '业务运营'}
            </div>
          )}
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={20} />
            <span>退出登录</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
