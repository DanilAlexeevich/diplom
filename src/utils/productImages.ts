import divany1 from '@/assets/products/divany/1.jpg';
import divany2 from '@/assets/products/divany/2.jpg';
import divany3 from '@/assets/products/divany/3.jpg';

import krovati1 from '@/assets/products/krovati/1.jpg';
import krovati2 from '@/assets/products/krovati/2.jpg';
import krovati3 from '@/assets/products/krovati/3.jpg';

import stulya1 from '@/assets/products/stulya/1.jpg';
import stulya2 from '@/assets/products/stulya/2.jpg';
import stulya3 from '@/assets/products/stulya/3.jpg';

import svetilniki1 from '@/assets/products/svetilniki/1.jpg';
import svetilniki2 from '@/assets/products/svetilniki/2.jpg';
import svetilniki3 from '@/assets/products/svetilniki/3.jpg';

import shkafy1 from '@/assets/products/shkafy/1.jpg';
import shkafy2 from '@/assets/products/shkafy/2.jpg';
import shkafy3 from '@/assets/products/shkafy/3.jpg';

const imageMap: Record<string, string[]> = {
  'Диваны': [divany1, divany2, divany3],
  'Кровати': [krovati1, krovati2, krovati3],
  'Стулья': [stulya1, stulya2, stulya3],
  'Светильники': [svetilniki1, svetilniki2, svetilniki3],
  'Шкафы': [shkafy1, shkafy2, shkafy3],
};

export const getRandomProductImage = (category?: string): string | undefined => {
  if (!category || !imageMap[category]) return undefined;
  const images = imageMap[category];
  return images[Math.floor(Math.random() * images.length)];
};
