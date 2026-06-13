import type { TProductStatus } from "./product";

export interface Product {
  id: number;
  name: string;
  price: number;
  status: TProductStatus;
  image_url?: string;
  category?: string;
  description?: string;
}

export interface ProductFilters {
  category: string | null;
  status: TProductStatus | 'all';
  priceMin?: number;
  priceMax?: number;
  search?: string;
}