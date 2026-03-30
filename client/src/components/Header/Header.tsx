import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/">МАГАЗИН</NavLink>
      </div>
      <nav className={styles.nav}>
        <NavLink 
          to="/catalog" 
          className={({ isActive }) => isActive ? styles.active : ''}
        >
          КАТАЛОГ
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => isActive ? styles.active : ''}
        >
          О НАС
        </NavLink>
        <NavLink 
          to="/help" 
          className={({ isActive }) => isActive ? styles.active : ''}
        >
          ПОМОЩЬ
        </NavLink>
        <NavLink 
          to="/cart" 
          className={({ isActive }) => isActive ? styles.active : ''}
        >
          КОРЗИНА
        </NavLink>
        <NavLink 
          to="/profile" 
          className={({ isActive }) => isActive ? styles.active : ''}
        >
          ПРОФИЛЬ
        </NavLink>
      </nav>
    </header>
  );
};