import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

// API Response wrapper từ Backend
interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
  path: string;
}

// Tạo axios instance trỏ về chính Next.js API routes (BFF)
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Typed API client — chỉ expose phương thức GET (read-only cho Frontend)
export const apiClient = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await instance.get<ApiResponse<T>>(url, config);
    return response.data.data;
  },
};

export default apiClient;
