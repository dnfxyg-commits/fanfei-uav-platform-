
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">仪表盘</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">系统状态</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">运行中</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">欢迎</h3>
          <p className="text-lg text-gray-800 mt-2">管理员，您好！</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">操作指南</h3>
          <p className="text-gray-600 mt-2 text-sm">请从左侧菜单选择要管理的内容板块。</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
