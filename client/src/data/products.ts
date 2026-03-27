import { Product } from '../types/product';
import product_cola from '../assets/products/product_cola.jpg';
import product_pepsi from '../assets/products/product_pepsi.jpg';
import product_wh_monster from '../assets/products/product_white_monster.jpg';
import product_mms from '../assets/products/product_mms.jpg';

export const products: Product[] = [
  {
    id: 1,
    name: 'Штука',
    price: 4990,
    imageUrl: product_cola,
  },
  {
    id: 2,
    name: 'Другая штука',
    price: 1990,
    imageUrl: product_pepsi,
  },
  {
    id: 3,
    name: 'Ещё штука',
    price: 2990,
    imageUrl: product_wh_monster,
  },
  {
    id: 4,
    name: 'Другая другая штука',
    price: 1490,
    imageUrl: product_mms,
  },
];
