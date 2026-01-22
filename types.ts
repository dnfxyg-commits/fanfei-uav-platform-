
export interface Solution {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  video?: string;
}

export interface PartnerBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  image: string;
  source?: string;
  author?: string;
}

export type AdminRole = 'super_admin' | 'content_operator' | 'business_operator';

export interface AdminUser {
  id: string;
  username: string;
  role: AdminRole;
  created_at: string;
}

export interface AdminUserCreate {
    username: string;
    password: string;
    role: AdminRole;
}

export interface Exhibition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  city: string;
  tags: string[];
  image: string;
  featured?: boolean;
  coreValue?: string;
  highlights?: string[];
}
