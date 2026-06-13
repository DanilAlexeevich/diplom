import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { setProducts, setLoading, setError } from '@/services/slices/CatalogSlice';
import { Product } from '@/types';

export const useLoadCatalogData = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.catalog);
  const isLoaded = products.length > 0;
  const isLoadingRef = useRef(false);

  useEffect(() => {
    if (isLoaded || isLoadingRef.current) return;

    const loadData = async () => {
      isLoadingRef.current = true;
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const res = await fetch('https://diplom-backend-prc3.onrender.com/products');
        if (!res.ok) throw new Error('Ошибка загрузки товаров');
        const data: Product[] = await res.json();
        dispatch(setProducts(data));
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Неизвестная ошибка'));
      } finally {
        dispatch(setLoading(false));
        isLoadingRef.current = false;
      }
    };

    loadData();
  }, [dispatch, isLoaded]);
};