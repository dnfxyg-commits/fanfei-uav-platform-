
import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { FileText, RefreshCw } from 'lucide-react';

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
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await api.admin.getApplications();
      setApplications(data);
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
          onClick={loadApplications}
          className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          <span>刷新列表</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
                    <p>暂无提交记录</p>
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
      </div>
    </div>
  );
};

export default ApplicationManager;
