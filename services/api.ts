import { Solution, Product, PartnerBenefit, NewsItem } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  getSolutions: async (): Promise<Solution[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/solutions/`);
      if (!response.ok) throw new Error('Failed to fetch solutions');
      return response.json();
    } catch (error) {
      console.error('Error fetching solutions:', error);
      return [];
    }
  },
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },
  getBenefits: async (): Promise<PartnerBenefit[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/partners/`);
      if (!response.ok) throw new Error('Failed to fetch benefits');
      return response.json();
    } catch (error) {
      console.error('Error fetching benefits:', error);
      return [];
    }
  },
  getNews: async (): Promise<NewsItem[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/news/`);
      if (!response.ok) throw new Error('Failed to fetch news');
      return response.json();
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }
};
