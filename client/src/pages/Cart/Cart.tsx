import React from 'react';
import styles from './Cart.module.css';
import { CartItem } from '../../types/cart';
import product_cola from '../../assets/products/product_cola.jpg';
import product_pepsi from '../../assets/products/product_pepsi.jpg';
import product_wh_monster from '../../assets/products/product_white_monster.jpg';

// Пример данных корзины (заглушка)
const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Штука',
    price: 4990,
    imageUrl: product_cola,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Другая штука',
    price: 1990,
    imageUrl: product_pepsi,
    quantity: 2,
  },
  {
    id: 3,
    name: 'Ещё штука',
    price: 2990,
    imageUrl: product_wh_monster,
    quantity: 1,
  },
];

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>(initialCartItems);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalSum = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('Оформление заказа (заглушка)');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Корзина</h1>
      {cartItems.length === 0 ? (
        <p className={styles.empty}>Ваша корзина пуста</p>
      ) : (
        <>
          <div className={styles.items}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.item}>
                <img src={item.imageUrl} alt={item.name} className={styles.image} />
                <div className={styles.details}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemPrice}>{item.price} ₽</p>
                </div>
                <div className={styles.quantity}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className={styles.qtyValue}>{item.quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className={styles.itemTotal}>
                  {item.price * item.quantity} ₽
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
          <div className={styles.summary}>
            <div className={styles.total}>
              <span>Итого:</span>
              <span>{totalSum} ₽</span>
            </div>
            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;