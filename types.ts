
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
  id?: string; // UUID
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  city: string;
  tags?: string[];
  image: string;
  featured?: boolean;
  core_value?: string;
  highlights?: string[];
  created_at?: string;
}

export interface Association {
  id?: string;
  name: string;
  type: string; // '协会' | '联盟' | '媒体'
  description: string;
  content?: string;
  join_info?: string;
  logo: string;
  contact_info?: string;
  website?: string;
  created_at?: string;
}

export interface ExhibitionApplication {
  id?: number;
  exhibition_id: string;
  exhibition_title: string;
  type: 'ticket' | 'booth';
  name: string;
  company: string;
  phone: string;
  email?: string;
  message?: string;
  created_at?: string;
}
