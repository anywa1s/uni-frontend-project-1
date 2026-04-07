import React from 'react';
import { useAppSelector } from '../../store/hooks';
import styles from './Profile.module.css';

const Profile: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className={styles.container}>
      <h1>Рады тебя видеть, <span className='accent'>{user?.name}</span>!</h1>
    </div>
  );
};

export default Profile;