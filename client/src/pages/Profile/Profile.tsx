import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { Link, Navigate } from 'react-router-dom';
import styles from './Profile.module.css';

const Profile: React.FC = () => {
  const { user, isInitialized } = useAppSelector((state) => state.auth);

  // Ждем, пока проверка закончится
  if (!isInitialized) {
    return <div>Загрузка профиля...</div>;
  }

  // Только когда мы ТОЧНО проверили и юзера нет — тогда просим войти
  if (!user) {
    return (
      <div className={styles.container}>
        <h2>Пожалуйста, войдите в аккаунт</h2>
        <Link to="/login">Перейти ко входу</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Рады тебя видеть, <span className='accent'>{user.name}</span>!</h1>
    </div>
  );
};

export default Profile;