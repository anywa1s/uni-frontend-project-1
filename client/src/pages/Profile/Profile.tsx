import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { Link, Navigate } from 'react-router-dom';
import styles from './Profile.module.css';

const Profile: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return (
        <Navigate to="/login" />
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Рады тебя видеть, <span className='accent'>{user.name}</span>!
      </h1>
    </div>
  );
};

export default Profile;