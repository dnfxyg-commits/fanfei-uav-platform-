
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
}
