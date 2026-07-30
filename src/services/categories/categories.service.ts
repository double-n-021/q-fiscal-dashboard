import { apiClient } from '@/lib/api-client';

export interface CategoryDto {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  status: 'PUBLISHED' | 'HIDDEN';
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export const categoryApi = {
  /** Lấy danh sách categories công khai */
  getPublicCategories: async (): Promise<CategoryDto[]> => {
    return await apiClient.get<CategoryDto[]>('/categories');
  },
};
