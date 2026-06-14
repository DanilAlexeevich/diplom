import divany1 from '@/assets/products/divany/1.jpg';
import divany2 from '@/assets/products/divany/2.jpg';
import divany3 from '@/assets/products/divany/3.jpg';
import divany4 from '@/assets/products/divany/4.jpg';
import divany5 from '@/assets/products/divany/5.jpg';

import krovati1 from '@/assets/products/krovati/1.jpg';
import krovati2 from '@/assets/products/krovati/2.jpg';
import krovati3 from '@/assets/products/krovati/3.jpg';
import krovati4 from '@/assets/products/krovati/4.jpg';
import krovati5 from '@/assets/products/krovati/5.jpg';

import stulya1 from '@/assets/products/stulya/1.jpg';
import stulya2 from '@/assets/products/stulya/2.jpg';
import stulya3 from '@/assets/products/stulya/3.jpg';
import stulya4 from '@/assets/products/stulya/4.jpg';
import stulya5 from '@/assets/products/stulya/5.jpg';

import svetilniki1 from '@/assets/products/svetilniki/1.jpg';
import svetilniki2 from '@/assets/products/svetilniki/2.jpg';
import svetilniki3 from '@/assets/products/svetilniki/3.jpg';
import svetilniki4 from '@/assets/products/svetilniki/4.jpg';
import svetilniki5 from '@/assets/products/svetilniki/5.jpg';

import shkafy1 from '@/assets/products/shkafy/1.jpg';
import shkafy2 from '@/assets/products/shkafy/2.jpg';
import shkafy3 from '@/assets/products/shkafy/3.jpg';
import shkafy4 from '@/assets/products/shkafy/4.jpg';
import shkafy5 from '@/assets/products/shkafy/5.jpg';

import other1 from '@/assets/products/other/1.jpg';
import other2 from '@/assets/products/other/2.jpg';
import other3 from '@/assets/products/other/3.jpg';
import other4 from '@/assets/products/other/4.jpg';
import other5 from '@/assets/products/other/5.jpg';

const imageMap: Record<string, string[]> = {
  'Диваны': [divany1, divany2, divany3, divany4, divany5],
  'Кровати': [krovati1, krovati2, krovati3, krovati4, krovati5],
  'Стулья': [stulya1, stulya2, stulya3, stulya4, stulya5],
  'Светильники': [svetilniki1, svetilniki2, svetilniki3, svetilniki4, svetilniki5],
  'Шкафы': [shkafy1, shkafy2, shkafy3, shkafy4, shkafy5],
  'Прочее': [other1, other2, other3, other4, other5],
};

export const getRandomProductImage = (category?: string): string | undefined => {
  if (!category || !imageMap[category]) return undefined;
  const images = imageMap[category];
  return images[Math.floor(Math.random() * images.length)];
};
