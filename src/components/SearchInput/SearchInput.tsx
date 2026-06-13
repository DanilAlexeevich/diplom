import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '@/services/slices/CatalogSlice';
import type { RootState, AppDispatch } from '@/services/store';
import styles from './SearchInput.module.scss';
import searchIcon from '@/assets/icons/search.svg';

interface SearchInputProps {
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ className = '' }) => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.catalog.filters);
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    dispatch(setFilters({ ...filters, search: e.target.value }));
  };

  const handleClear = () => {
    setValue('');
    dispatch(setFilters({ ...filters, search: '' }));
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <img src={searchIcon} alt="" className={styles.icon} />
      <input
        className={styles.input}
        type="text"
        placeholder="Поиск по названию..."
        value={value}
        onChange={handleChange}
      />
      {value && (
        <button className={styles.clear} onClick={handleClear} aria-label="Очистить">✕</button>
      )}
    </div>
  );
};
