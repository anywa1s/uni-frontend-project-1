import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.code}>404</div>
          <div className={styles.message}>
            <span>страница</span>
            <span>не найдена</span>
          </div>
        </div>
        <Link to="/" className={styles.button}>
          НА ГЛАВНУЮ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;