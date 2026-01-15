
import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { supabase } from '@/lib/supabaseClient';
import { Activity, ShieldCheck, Database, Server } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [dbStatus, setDbStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    checkSystem();
  }, []);

  const checkSystem = async () => {
    // Check Backend
    const isBackendOnline = await api.checkHealth();
    setBackendStatus(isBackendOnline ? 'online' : 'offline');

    // Check Database (via Supabase Auth session)
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setDbStatus('online');
      setUserEmail(session.user.email || '管理员');
    } else {
      setDbStatus('offline');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">仪表盘</h1>
      
      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className={`p-3 rounded-full ${backendStatus === 'online' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            <Server size={24} />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">后端服务 (API)</h3>
            <p className="text-xl font-bold text-gray-800 mt-1">
              {backendStatus === 'checking' ? '检测中...' : (backendStatus === 'online' ? '运行正常' : '连接失败')}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className={`p-3 rounded-full ${dbStatus === 'online' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            <Database size={24} />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">数据库 & 认证</h3>
            <p className="text-xl font-bold text-gray-800 mt-1">
              {dbStatus === 'checking' ? '检测中...' : (dbStatus === 'online' ? '已连接' : '未连接')}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">当前用户</h3>
            <p className="text-lg font-bold text-gray-800 mt-1 truncate max-w-[150px]" title={userEmail}>
              {userEmail || '...'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">欢迎回来</h2>
        <p className="text-gray-600">
          您现在可以管理产品、新闻、解决方案以及查看合伙人申请表单。
          <br />
          如果遇到"连接失败"的情况，请检查本地 Python 后端是否已启动 (py backend/main.py)。
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
