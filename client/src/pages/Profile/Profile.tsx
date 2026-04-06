import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import styles from './Profile.module.css';

const Profile: React.FC = () => {
  const { user, isInitialized } = useAppSelector((state) => state.auth);

  if (!isInitialized) {
    return <div>Загрузка профиля...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.container}>
      <h1>Рады тебя видеть, <span className='accent'>{user.name}</span>!</h1>
    </div>
  );
};

export default Profile;