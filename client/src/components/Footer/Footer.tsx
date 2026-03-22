import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <h3>Интернет-магазин</h3>
            <p>Лучшие товары по лучшим ценам</p>
          </div>
          <div className={styles.column}>
            <h3>Контакты</h3>
            <p>Email: info@myshop.ru</p>
            <p>Телефон: +7 (777) 777-77-77</p>
          </div>
          <div className={styles.column}>
            <h3>Информация</h3>
            <ul className={styles.list}>
              <li><a href="#">Политика конфиденциальности</a></li>
              <li><a href="#">Публичная оферта</a></li>
              <li><a href="#">Доставка и оплата</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {currentYear} Мой магазин.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;