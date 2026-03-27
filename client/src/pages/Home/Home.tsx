import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Home.module.css';
import { Product } from '../../types/product';
import product_cola from '../../assets/products/product_cola.jpg';
import product_pepsi from '../../assets/products/product_pepsi.jpg';
import product_wh_monster from '../../assets/products/product_white_monster.jpg';
import product_mms from '../../assets/products/product_mms.jpg';


const sampleProducts: Product[] = [
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

const Home: React.FC = () => {
  const handleAddToCart = (productId: number) => {
    console.log('Добавлен товар с id:', productId);
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.card}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>привет!</h1>
            {/* <p className={styles.heroSubtitle}>
              У нас для тебя кое-что есть...
            </p> */}
          </div>
        </div>
      </section>

      <div className={styles.container}>
        <h1 className={styles.subtitle}>У НАС <span className='accent'>НОВАЯ</span> КОЛЛЕКЦИЯ</h1>
        <div className={styles.productGrid}>
          {sampleProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
        <h2 className={styles.subtitle}>ТАМ ПОТОМ БУДЕТ <span className='accent'>ЕЩЁ</span> КОЛЛЕКЦИЯ</h2>
      </div>
    </>
  );
};

export default Home;