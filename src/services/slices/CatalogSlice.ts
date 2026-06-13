import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductFilters } from '@/types';

export interface CatalogState {
  products: Product[];
  filters: ProductFilters;
  loading: boolean;
  error: string | null;
}

const initialState: CatalogState = {
  products: [],
  filters: { category: null, status: 'all' },
  loading: true,
  error: null,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setFilters: (state, action: PayloadAction<ProductFilters>) => {
      state.filters = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setFilters, setLoading, setError } = catalogSlice.actions;
export default catalogSlice.reducer;