import React from 'react';
import type { ProductFilters } from '@/types';
import { CATEGORIES } from '@/data/categories';
import styles from './FilterSideBar.module.scss';

interface FilterSideBarProps {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const FilterSideBar: React.FC<FilterSideBarProps> = ({ filters, onChange, isOpen, onClose }) => {
  const handleCategory = (category: string) => {
    onChange({
      ...filters,
      category: filters.category === category ? null : category,
    });
  };  

  const handleStatus = (status: ProductFilters['status']) => {
    onChange({ ...filters, status });
  };

  const handlePriceMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, priceMin: Number(e.target.value) || undefined });
  };

  const handlePriceMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, priceMax: Number(e.target.value) || undefined });
  };

  const handleReset = () => {
    onChange({ category: null, status: 'all' });
  };

  return (
    <>
      {/* Затемнение фона — только на мобиле */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.header}>
          <h3 className={styles.title}>Фильтры</h3>
          <div className={styles.headerActions}>
            <button className={styles.reset} onClick={handleReset}>Сбросить</button>
            {/* Крестик — только на мобиле */}
            <button className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">✕</button>
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Категория</h4>
          <div className={styles.list}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.title}
                className={`${styles.categoryBtn} ${filters.category === cat.title ? styles.active : ''}`}
                onClick={() => handleCategory(cat.title)}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Наличие</h4>
          <div className={styles.list}>
            {(['all', 'active', 'out_of_stock'] as const).map((s) => (
              <button
                key={s}
                className={`${styles.categoryBtn} ${filters.status === s ? styles.active : ''}`}
                onClick={() => handleStatus(s)}
              >
                {s === 'all' ? 'Все' : s === 'active' ? 'В наличии' : 'Нет в наличии'}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Цена</h4>
          <div className={styles.priceRow}>
            <input className={styles.priceInput} type="number" placeholder="От"
              value={filters.priceMin ?? ''} onChange={handlePriceMin} />
            <span>—</span>
            <input className={styles.priceInput} type="number" placeholder="До"
              value={filters.priceMax ?? ''} onChange={handlePriceMax} />
          </div>
        </div>
      </aside>
    </>
  );
};
