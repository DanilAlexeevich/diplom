export interface Category {
  title: string;
}

// Данные категорий
export const CATEGORIES: Category[] = [
  {
    title: 'Шкафы'
  },
  {
    title: 'Диваны'
  },
  {
    title: 'Стулья'
  },
  {
    title: 'Светильники'
  },
  {
    title: 'Кровати'
  },
  {
    title: 'Прочее'
  },
] as const;

export const getCategoriesColumns = () => {
  const midIndex = Math.ceil(CATEGORIES.length / 2);
  return {
    leftColumn: CATEGORIES.slice(0, midIndex),
    rightColumn: CATEGORIES.slice(midIndex),
  };
};

