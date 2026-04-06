import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import { addToCart } from '../../store/slices/cartSlice';
import { RootState } from '../../store/store';
import { ReactComponent as FilterIcon } from '../../assets/icons/filter_icon.svg';
import styles from './Catalog.module.css';
import checkboxStyles from '../../ui/checkbox.module.css';

const Catalog: React.FC = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.items);

  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      dispatch(addToCart(product));
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
              <label className={checkboxStyles.checkboxContainer}>
                <input type="checkbox" className={checkboxStyles.customCheckbox} />
                <span className={checkboxStyles.checkmark}></span>
                Обувь
              </label>
              <label className={checkboxStyles.checkboxContainer}>
                <input type="checkbox" className={checkboxStyles.customCheckbox} />
                <span className={checkboxStyles.checkmark}></span>
                Одежда
              </label>
              <label className={checkboxStyles.checkboxContainer}>
                <input type="checkbox" className={checkboxStyles.customCheckbox} />
                <span className={checkboxStyles.checkmark}></span>
                Акссесуары
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