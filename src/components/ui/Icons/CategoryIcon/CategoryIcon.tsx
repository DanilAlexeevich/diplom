import React from 'react';
import styles from './CategoryIcon.module.scss';

import wardrobeIcon from '@/assets/icons/categories/wardrobe.svg';
import chairIcon from '@/assets/icons/categories/chair.svg';
import seatIcon from '@/assets/icons/categories/seat.svg';
import lampIcon from '@/assets/icons/categories/lamp.svg';
import bedIcon from '@/assets/icons/categories/bed.svg';
import otherIcon from '@/assets/icons/categories/other.svg';

const iconMap = {
  'Шкафы': wardrobeIcon,
  'Диваны': chairIcon,
  'Стулья': seatIcon,
  'Светильники': lampIcon,
  'Кровати': bedIcon,
  'Прочее': otherIcon,
} as const;

const colorClassMap = {
  'Шкафы': styles.business,
  'Диваны': styles.languages,
  'Стулья': styles.home,
  'Светильники': styles.art,
  'Кровати': styles.education,
  'Прочее': styles.health,
} as const;

interface CategoryIconProps {
  categoryTitle: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ categoryTitle, className = '' }) => {
  const iconSrc = iconMap[categoryTitle as keyof typeof iconMap];
  const colorClass = colorClassMap[categoryTitle as keyof typeof colorClassMap];

  if (!iconSrc || !colorClass) {
    console.warn(`Неизвестная категория "${categoryTitle}"`);
    return null;
  }

  return (
    <div className={`${styles.iconWrapper} ${colorClass} ${className}`}>
      <img src={iconSrc} alt="" className={styles.icon} width={24} height={24} aria-hidden="true" />
    </div>
  );
};
