import React from 'react';
import { ReactComponent as CartIcon } from '../../assets/icons/cart_icon.svg';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  onAddToCart: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  onAddToCart,
}) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={name} className={styles.image} />
      <div className={styles.info}>
        <div className={styles.row}>
          <span className={styles.price}>{price} ₽</span>
          <button
            className={styles.cartButton}
            onClick={() => onAddToCart(id)}
            aria-label="Добавить в корзину"
          >
            <CartIcon className={styles.cartIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;