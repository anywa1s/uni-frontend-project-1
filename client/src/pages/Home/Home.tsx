import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Home.module.css';
import { Product } from '../../types/product';

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Кроссовки Nike',
    price: 4990,
    imageUrl: 'https://via.placeholder.com/280x180?text=Nike',
  },
  {
    id: 2,
    name: 'Футболка Adidas',
    price: 1990,
    imageUrl: 'https://via.placeholder.com/280x180?text=Adidas',
  },
  {
    id: 3,
    name: 'Рюкзак Puma',
    price: 2990,
    imageUrl: 'https://via.placeholder.com/280x180?text=Puma',
  },
  {
    id: 4,
    name: 'Кепка New Era',
    price: 1490,
    imageUrl: 'https://via.placeholder.com/280x180?text=New+Era',
  },
];

const Home: React.FC = () => {
  const handleAddToCart = (productId: number) => {
    console.log('Добавлен товар с id:', productId);
  };

  return (
    <>
      {}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>привет!</h1>
          <p className={styles.heroSubtitle}>
            У нас для тебя кое-что есть...
          </p>
        </div>
      </section>

      {}
      <div className={styles.container}>
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
      </div>
    </>
  );
};

export default Home;