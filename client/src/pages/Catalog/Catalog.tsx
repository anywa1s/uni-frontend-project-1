import React, { useState } from 'react';
import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ReactComponent as FilterIcon } from '../../assets/icons/filter_icon.svg';
import styles from './Catalog.module.css';
import '../../ui/checkbox.css';

const Catalog: React.FC = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState('default');

  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      console.log('Добавлен товар:', product.name);
    }
  };

  const openFilterModal = () => setIsFilterModalOpen(true);
  const closeFilterModal = () => setIsFilterModalOpen(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.filterButton} onClick={openFilterModal}>
            <FilterIcon className={styles.filterIcon} />
            ФИЛЬТР
          </button>
        </div>

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
      </div>

      {isFilterModalOpen && (
        <div className={styles.modalOverlay} onClick={closeFilterModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h2>Фильтры</h2>
            <div className={styles.filterGroup}>
              <label className="checkbox-container">
                <input type="checkbox" className="custom-checkbox" />
                <span className="checkmark"></span>
                Обувь
              </label>
              <label className="checkbox-container">
                <input type="checkbox" className="custom-checkbox" />
                <span className="checkmark"></span>
                Одежда
              </label>
              <label className="checkbox-container">
                <input type="checkbox" className="custom-checkbox" />
                <span className="checkmark"></span>
                Аксессуары
              </label>
              <label className="checkbox-container">
                <input type="checkbox" className="custom-checkbox" />
                <span className="checkmark"></span>
                Спорт
              </label>
            </div>
            <button className={styles.applyButton} onClick={closeFilterModal}>
              Применить
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Catalog;