
import React from 'react';
import { Shield, Plane, TrendingUp, Globe, Users, Briefcase, Zap, MapPin } from 'lucide-react';
import { Solution, Product, PartnerBenefit, NewsItem } from './types';

export const PRODUCT_CATEGORY_OPTIONS = [
  '云端管理平台',
  '地面控制软件',
  '行业应用系统',
  '工业巡检级',
  '垂直起降(VTOL)',
  '自动化机库',
  '消费者级',
  '固定翼',
];

export const SYSTEM_CATEGORY_OPTIONS = [
  '云端管理平台',
  '地面控制软件',
  '行业应用系统',
];

export const HARDWARE_CATEGORY_OPTIONS = PRODUCT_CATEGORY_OPTIONS.filter(
  (c) => !SYSTEM_CATEGORY_OPTIONS.includes(c)
);

export const SOLUTIONS: Solution[] = [
  {
    id: 'agriculture',
    title: '智慧农业',
    description: '通过高精度多光谱分析与自动喷洒系统，实现精准作业，提升农业生产力。',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1200',
    icon: 'Zap'
  },
  {
    id: 'security',
    title: '公共安全',
    description: '全天候自动化巡检，实时视频回传与AI识别，协助警方与安保团队保障城市安全。',
    image: 'https://images.unsplash.com/photo-1477285286154-bb3959433399?auto=format&fit=crop&q=80&w=1200',
    icon: 'Shield'
  },
  {
    id: 'infrastructure',
    title: '能源巡检',
    description: '针对电力线、风力发电机及油气管道的自动建模与缺陷检测，降低运维风险。',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200',
    icon: 'Briefcase'
  },
  {
    id: 'logistics',
    title: '末端物流',
    description: '解决复杂地形的“最后一公里”配送难题，提升偏远地区物资转运效率。',
    image: 'https://images.unsplash.com/photo-1510519133415-cdaaa3e2419b?auto=format&fit=crop&q=80&w=1200',
    icon: 'Plane'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 's1',
    name: '閞飞云·低空大脑',
    category: '云端管理平台',
    description: '全域低空空域数字化管控系统，支持万级终端并发接入，提供实时航路规划与冲突解脱。',
    image: 'https://images.unsplash.com/photo-1551288049-bbda38a5f452?auto=format&fit=crop&q=80&w=1000',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-world-map-with-data-points-4467-large.mp4'
  },
  {
    id: 's2',
    name: '翔翼·地面站控制系统',
    category: '地面控制软件',
    description: '专业级单机/群蜂控制界面，集成三维数字孪生场景，支持手势及语音交互控飞。',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-drone-flying-over-a-forest-4252-large.mp4'
  },
  {
    id: 's3',
    name: '慧眼·AI数据分析系统',
    category: '行业应用系统',
    description: '针对电力、光伏、水利等垂直行业的巡检影像自动识别引擎，隐患检测准确率高达99%。',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e905263543?auto=format&fit=crop&q=80&w=1000',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-at-his-desk-34533-large.mp4'
  }
];

export const PARTNER_BENEFITS: PartnerBenefit[] = [
  {
    title: '区域独家授权',
    description: '获得指定城市的独家业务经营权，保护合伙人长远利益。',
    icon: 'MapPin'
  },
  {
    title: '全栈技术支撑',
    description: '提供涵盖硬件、云平台及行业算法的全套解决方案技术支持。',
    icon: 'TrendingUp'
  },
  {
    title: '行业资源对接',
    description: '共享平台在全球低空经济领域的政府及大客户合作资源。',
    icon: 'Users'
  },
  {
    title: '专业培训体系',
    description: '包含飞手培训、技术运维、市场营销在内的闭环赋能课程。',
    icon: 'Globe'
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'n1',
    title: '閞飞翔受邀参加2024全球低空经济发展大会',
    date: '2024-05-20',
    category: '公司动态',
    summary: '閞飞翔在大会现场展示了最新的“低空大脑”数字化管理系统，并发表了关于低空经济基础设施建设的主题演讲。',
    image: 'https://images.unsplash.com/photo-1540575861501-7ad060e39fe5?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'n2',
    title: '閞飞云·低空大脑 2.0 版本正式上线',
    date: '2024-04-12',
    category: '技术创新',
    summary: '新版本实现了万级无人机终端的秒级实时调度，并新增了基于AI的航路冲突自动规避算法。',
    image: 'https://images.unsplash.com/photo-1551288049-bbda38a5f452?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'n3',
    title: '閞飞翔与多地政府达成低空物流战略合作',
    date: '2024-03-05',
    category: '市场合作',
    summary: '双方将共同探索“无人机+末端配送”的新型物流模式，旨在解决偏远地区配送“最后一公里”难题。',
    image: 'https://images.unsplash.com/photo-1510519133415-cdaaa3e2419b?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'n4',
    title: '全球合伙人招募计划首季报：新增30座加盟城市',
    date: '2024-02-18',
    category: '公司动态',
    summary: '城市合伙人计划推行首季度表现强劲，閞飞翔已成功在多个核心二线城市完成样板点部署。',
    image: 'https://images.unsplash.com/photo-152207182399e-b89e7df830c5?auto=format&fit=crop&q=80&w=1000'
  }
];
