import React from 'react';
import styles from './BackButton.module.css';

interface BackButtonProps {
  onClick: () => void;
  text?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, text = 'Назад в корзину' }) => {
  return (
    <button className={styles.backButton} onClick={onClick} type="button">
      <div className={styles.iconWrapper}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          height="20px"
          width="20px"
          className={styles.icon}
        >
          <path
            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
            fill="currentColor"
          />
          <path
            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
            fill="currentColor"
          />
        </svg>
      </div>
      <p className={styles.text}>{text}</p>
    </button>
  );
};

export default BackButton;