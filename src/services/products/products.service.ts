import { apiClient } from '@/lib/api-client';
import type { CategoryDto } from '@/services/categories/categories.service';
import type { ProductImageDto } from '@/services/product-images/product-images.service';

// ─── Response DTOs ───────────────────────────────────────────────

export interface ProductConfigDto {
  id: string;
  isVisible: boolean;
  showPrice: boolean;
  showStock: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface ProductSpecificDto {
  id: string;
  brand?: string;
  origin?: string;
  warranty?: string;
  specs?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface ProductDto {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description?: string;
  price: number;
  discount?: number;
  stock: number;
  isActive: boolean;
  config?: ProductConfigDto;
  specific?: ProductSpecificDto;
  categories?: CategoryDto[];
  images?: ProductImageDto[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}

// ─── Service (Read-Only cho Frontend) ────────────────────────────

export const productApi = {
  /** Lấy danh sách tất cả sản phẩm */
  getProducts: async (): Promise<ProductDto[]> => {
    return await apiClient.get<ProductDto[]>('/products');
  },

  /** Lấy chi tiết sản phẩm theo slug */
  getProductBySlug: async (slug: string): Promise<ProductDto> => {
    return await apiClient.get<ProductDto>(`/products/${slug}`);
  },
};
