# 部署上线指南 (Vercel)

本项目已经配置好适配 Vercel 的部署结构（React 前端 + Python FastAPI 后端）。

## 1. 准备工作

确保代码已经提交到 GitHub/GitLab/Bitbucket 仓库。

## 2. 在 Vercel 创建项目

1.  登录 [Vercel Dashboard](https://vercel.com/dashboard)。
2.  点击 **"Add New..."** -> **"Project"**。
3.  导入你的 Git 仓库。

## 3. 配置项目

在 "Configure Project" 页面：

*   **Framework Preset**: 选择 `Vite`。
*   **Root Directory**: 保持默认 `./`。
*   **Build Command**: `npm run build` (默认)。
*   **Output Directory**: `dist` (默认)。

## 4. 环境变量 (Environment Variables)

这是最重要的一步。请在部署前的 **"Environment Variables"** 区域添加以下变量（参考你的 `.env` 文件）：

| 变量名 | 说明 | 示例值 |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | 前端连接 Supabase 的 URL | `https://xyz.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | 前端连接 Supabase 的公钥 | `eyJzh...` |
| `SUPABASE_URL` | 后端连接 Supabase 的 URL | 同上 |
| `SUPABASE_SERVICE_ROLE_KEY` | **重要**：后端管理用户用的密钥 | `eyJzh...` (service_role) |
| `SECRET_KEY` | 后端 JWT 加密密钥 | 生成一个随机长字符串 |

> **注意**：`SUPABASE_SERVICE_ROLE_KEY` 必须是 Service Role Key，**不能**是 Anon Key，否则无法创建用户。

## 5. 部署

点击 **"Deploy"** 按钮。

Vercel 会自动识别 `api/index.py` 并部署 Python Serverless Function，同时构建 React 前端。

## 6. 验证

部署完成后，访问生成的域名：
1.  **前端**：浏览首页、新闻页等，确认页面加载正常。
2.  **API**：尝试访问 `/api/`，应该返回 `{"message": "Welcome to Fanfei UAV API"}`。
3.  **后台登录**：访问 `/admin/login`，使用之前创建的超级管理员账号登录。

## 常见问题

*   **刷新页面 404**：请检查 `vercel.json` 是否包含 `source: "/(.*)", destination: "/index.html"` 的重写规则（已自动修复）。
*   **登录失败 (500 Error)**：通常是环境变量配置错误，特别是 `SUPABASE_SERVICE_ROLE_KEY` 或 `SECRET_KEY` 缺失。
*   **API 404**：确保 `api/index.py` 存在且 `requirements.txt` 在根目录包含所有依赖。
