export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  status?: 'HIDDEN' | 'VISIBLE' | 'PUBLISHED';
}

export interface ProductConfig {
  isVisible: boolean;
  showPrice: boolean;
  showStock: boolean;
}

export interface ProductSpecifics {
  brand: string;
  origin: string;
  warranty: string;
  specs: Record<string, string>; // Maps to JSON field in DB
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number; // Percentage or absolute amount (assuming percentage for now)
  stock: number;
  isActive: boolean;
  sku: string;
  
  // Relations
  category: Category; // Through product_categories
  images: ProductImage[];
  config: ProductConfig;
  specifics: ProductSpecifics;
  
  // Calculated fields (Frontend convenience)
  discountedPrice?: number;
  hasDiscount: boolean;
  averageRating: number;
  reviewCount: number;
}
