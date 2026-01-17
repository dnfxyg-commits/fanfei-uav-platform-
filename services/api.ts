import { Solution, Product, PartnerBenefit, NewsItem } from '../types';

const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:8000/api';

async function handleJsonResponse(response: Response, defaultMessage: string) {
  if (response.ok) {
    return response.json();
  }

  let detail = '';
  try {
    const data = await response.json();
    if (data && typeof data === 'object') {
      if ('detail' in data && typeof (data as any).detail === 'string') {
        detail = (data as any).detail;
      } else {
        detail = JSON.stringify(data);
      }
    }
  } catch {
    try {
      detail = await response.text();
    } catch {
      detail = '';
    }
  }

  const message = detail ? `${defaultMessage}: ${response.status} ${detail}` : `${defaultMessage}: ${response.status}`;
  throw new Error(message);
}

export const api = {
  getSolutions: async (): Promise<Solution[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/solutions/`);
      return await handleJsonResponse(response, 'Failed to fetch solutions');
    } catch (error) {
      console.error('Error fetching solutions:', error);
      return [];
    }
  },
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/`);
      return await handleJsonResponse(response, 'Failed to fetch products');
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },
  getBenefits: async (): Promise<PartnerBenefit[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/partners/`);
      return await handleJsonResponse(response, 'Failed to fetch benefits');
    } catch (error) {
      console.error('Error fetching benefits:', error);
      return [];
    }
  },
  getNews: async (): Promise<NewsItem[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/news/`);
      return await handleJsonResponse(response, 'Failed to fetch news');
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
      return await handleJsonResponse(response, 'Failed to submit application');
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  },
  admin: {
    createSolution: async (data: Solution) => {
      const response = await fetch(`${API_BASE_URL}/solutions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await handleJsonResponse(response, 'Failed to create solution');
    },
    updateSolution: async (id: string, data: Solution) => {
      const response = await fetch(`${API_BASE_URL}/solutions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await handleJsonResponse(response, 'Failed to update solution');
    },
    deleteSolution: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/solutions/${id}`, {
        method: 'DELETE',
      });
      return await handleJsonResponse(response, 'Failed to delete solution');
    },
    createProduct: async (data: Product) => {
      const response = await fetch(`${API_BASE_URL}/products/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await handleJsonResponse(response, 'Failed to create product');
    },
    updateProduct: async (id: string, data: Product) => {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await handleJsonResponse(response, 'Failed to update product');
    },
    deleteProduct: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
      return await handleJsonResponse(response, 'Failed to delete product');
    },
    createNews: async (data: NewsItem) => {
      const response = await fetch(`${API_BASE_URL}/news/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await handleJsonResponse(response, 'Failed to create news');
    },
    updateNews: async (id: string, data: NewsItem) => {
      const response = await fetch(`${API_BASE_URL}/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await handleJsonResponse(response, 'Failed to update news');
    },
    deleteNews: async (id: string) => {
      const response = await fetch(`${API_BASE_URL}/news/${id}`, {
        method: 'DELETE',
      });
      return await handleJsonResponse(response, 'Failed to delete news');
    },
    getApplications: async () => {
      const response = await fetch(`${API_BASE_URL}/partners/applications`);
      return await handleJsonResponse(response, 'Failed to fetch applications');
    },
  },
  checkHealth: async () => {
    try {
      const response = await fetch(`${API_BASE_URL.replace('/api', '')}/`);
      return response.ok;
    } catch (e) {
      return false;
    }
  },
};
