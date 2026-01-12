import { Solution, Product, PartnerBenefit, NewsItem } from '../types';

const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:8000/api';

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
  },
  submitApplication: async (data: { name: string; phone: string; company: string; target_city: string; message: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/partners/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to submit application');
      return response.json();
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  },
  
  // Admin Methods
  admin: {
    createSolution: async (data: Solution) => {
      const response = await fetch(`${API_BASE_URL}/solutions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create solution');
      return response.json();
    },
    updateSolution: async (id: string, data: Solution) => {
      const response = await fetch(`${API_BASE_URL}/solutions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update solution');
      return response.json();
    },
    deleteSolution: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/solutions/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete solution');
      return response.json();
    },
    createProduct: async (data: Product) => {
        const response = await fetch(`${API_BASE_URL}/products/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create product');
        return response.json();
      },
      updateProduct: async (id: string, data: Product) => {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update product');
        return response.json();
      },
      deleteProduct: async (id: string) => {
        const response = await fetch(`${API_BASE_URL}/products/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete product');
        return response.json();
      },
      createNews: async (data: NewsItem) => {
        const response = await fetch(`${API_BASE_URL}/news/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create news');
        return response.json();
      },
      updateNews: async (id: string, data: NewsItem) => {
        const response = await fetch(`${API_BASE_URL}/news/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update news');
        return response.json();
      },
      deleteNews: async (id: string) => {
        const response = await fetch(`${API_BASE_URL}/news/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete news');
        return response.json();
      }
  }
};
