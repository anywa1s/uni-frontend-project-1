import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { RootState } from '../../store/store';
import { updateQuantity, removeFromCart } from '../../store/slices/cartSlice';
import styles from './Cart.module.css';
import { selectCartTotal } from '../../store/selectors/cartSelector';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);

  const totalSum = useAppSelector(selectCartTotal);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        {/* <h1 className={styles.title}>КОРЗИНА</h1> */}
        <p className={styles.empty}>Тут пока пусто... давай это <Link to="/catalog" className={styles.link}>исправим</Link></p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* <h1 className={styles.title}>КОРЗИНА</h1> */}
      <div className={styles.cartLayout}>
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
            <div className={styles.itemTotal}>{item.price * item.quantity} ₽</div>
            <button
              className={styles.removeBtn}
              onClick={() => handleRemove(item.id)}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
      <div className={styles.summary}>
        <div className={styles.total}>
          <span>ИТОГО:</span>
          <span>{totalSum} ₽</span>
        </div>
        <button className={styles.checkoutBtn} onClick={handleCheckout => navigate('/order')}>
          ОФОРМИТЬ ЗАКАЗ
        </button>
      </div>
      </div>
    </div>
  );
};

export default Cart;