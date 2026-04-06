import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import { addToCart } from '../../store/slices/cartSlice';
import { RootState } from '../../store/store';
import styles from './Home.module.css';
import bgStyles from '../../ui/bgpattern.module.css';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.items);

  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      dispatch(addToCart(product));
    }
  };

  return (
    <>
      <section className={`${bgStyles.bgpattern} ${bgStyles.bgpatternA}`}>
        <div className={styles.card}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>привет!</h1>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        <h1 className={styles.subtitle}>У НАС <span className='accent'>НОВАЯ</span> КОЛЛЕКЦИЯ</h1>
        <div className={styles.productGrid}>
          {products.map(product => (
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