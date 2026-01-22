
import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { FileText, RefreshCw, Users, Ticket, Store } from 'lucide-react';
import { ExhibitionApplication } from '../../types';

interface Application {
  id: number;
  name: string;
  phone: string;
  company: string;
  target_city: string;
  message: string;
  created_at: string;
}

const ApplicationManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'partner' | 'ticket' | 'booth'>('partner');
  const [applications, setApplications] = useState<Application[]>([]);
  const [exhibitionApps, setExhibitionApps] = useState<ExhibitionApplication[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'partner') {
        const data = await api.admin.getApplications();
        setApplications(data);
      } else {
        // Load all exhibition applications, filtering is done in render
        const data = await api.admin.getExhibitionApplications();
        setExhibitionApps(data);
      }
    } catch (error) {
      console.error('Failed to load applications:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">表单提交管理</h1>
        <button
          onClick={loadData}
          className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          <span>刷新列表</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('partner')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'partner'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Users size={20} />
          合伙人申请
        </button>
        <button
          onClick={() => setActiveTab('ticket')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'ticket'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Ticket size={20} />
          门票预订
        </button>
        <button
          onClick={() => setActiveTab('booth')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'booth'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Store size={20} />
          展位申请
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {activeTab === 'partner' ? (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-500">提交时间</th>
                <th className="px-6 py-4 font-medium text-gray-500">姓名</th>
                <th className="px-6 py-4 font-medium text-gray-500">联系电话</th>
                <th className="px-6 py-4 font-medium text-gray-500">公司/机构</th>
                <th className="px-6 py-4 font-medium text-gray-500">目标城市</th>
                <th className="px-6 py-4 font-medium text-gray-500">留言内容</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-3">
                      <FileText size={48} className="opacity-20" />
                      <p>暂无合伙人申请记录</p>
                    </div>
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(app.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{app.name}</td>
                    <td className="px-6 py-4 text-gray-600">{app.phone}</td>
                    <td className="px-6 py-4 text-gray-600">{app.company || '-'}</td>
                    <td className="px-6 py-4 text-gray-600">{app.target_city}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={app.message}>
                      {app.message || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-500">提交时间</th>
                <th className="px-6 py-4 font-medium text-gray-500">类型</th>
                <th className="px-6 py-4 font-medium text-gray-500">展会名称</th>
                <th className="px-6 py-4 font-medium text-gray-500">姓名</th>
                <th className="px-6 py-4 font-medium text-gray-500">联系电话</th>
                <th className="px-6 py-4 font-medium text-gray-500">公司</th>
                <th className="px-6 py-4 font-medium text-gray-500">留言内容</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {exhibitionApps.filter(app => app.type === activeTab).length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-3">
                      <FileText size={48} className="opacity-20" />
                      <p>暂无{activeTab === 'ticket' ? '门票预订' : '展位申请'}记录</p>
                    </div>
                  </td>
                </tr>
              ) : (
                exhibitionApps
                  .filter(app => app.type === activeTab)
                  .map((app, idx) => (
                  <tr key={app.id || idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {app.created_at ? new Date(app.created_at).toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                        app.type === 'ticket' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {app.type === 'ticket' ? '门票预订' : '展位申请'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{app.exhibition_title}</td>
                    <td className="px-6 py-4 text-gray-600">{app.name}</td>
                    <td className="px-6 py-4 text-gray-600">{app.phone}</td>
                    <td className="px-6 py-4 text-gray-600">{app.company}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={app.message}>
                      {app.message || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ApplicationManager;
