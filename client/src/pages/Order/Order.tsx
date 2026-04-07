import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createOrder } from '../../store/slices/orderSlice';
import BackButton from '../../ui/BackButton/BackButton';
import styles from './Order.module.css';
import { selectCartTotal } from '../../store/selectors/cartSelector';

const Order: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.settings.isLoading);
  const cartItems = useAppSelector((state) => state.cart.items);

  const [recipientName, setRecipientName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');

  const total = useAppSelector(selectCartTotal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Корзина пуста');
      return;
    }
    
    const result = await dispatch(
      createOrder({
        items: cartItems,
        total,
        recipientName,
        address,
        phone,
        comment,
      })
    );

    if (createOrder.fulfilled.match(result)) {
      navigate('/profile/orders');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backWrapper}>
        <BackButton onClick={() => navigate('/cart')} text="НАЗАД" />
      </div>

      <div className={styles.card}>
        <h2 className={styles.title}>ОФОРМЛЕНИЕ</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">ФИО получателя</label>
            <input
              id="name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="phone">Телефон получателя</label>
            <input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="comment">Email получателя</label>
            <input
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="address">Адрес</label>
            <input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'ОФОРМЛЕНИЕ...' : 'ОФОРМИТЬ'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Order;