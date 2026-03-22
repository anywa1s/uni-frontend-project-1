import React from 'react';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>привет</h1>
      <img 
        src="https://via.placeholder.com/600x400" 
        alt="Placeholder" 
        className={styles.image}
      />
    </div>
  );
};

export default Home;