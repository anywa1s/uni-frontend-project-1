import React from 'react';
import styles from './About.module.css';
import teamImg from '../../assets/about_team.jpg';
import productsImg from '../../assets/about_products.jpg';

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        {/* <div className={styles.form}></div> */}
        <div className={styles.oval1}></div>
        <div className={styles.oval2}></div>
        <h1 className={styles.title}>{`с Вашего позволения, \n`} <span className="accent">представимся</span></h1>
      </div>

      <div className={styles.content}>
        <div className={styles.block}>
          <div className={styles.textBlock}>
            <p className={styles.paragraph}>
              Наш проект появился в 2026 году. Мы — команда энтузиастов, объединённых любовью к качественным и стильным вещам.
              С самого начала мы ставили перед собой цель — создавать магазин, в котором приятно и безопасно покупать.
            </p>
          </div>
          <div className={styles.imageBlock}>
            <img src={teamImg} alt="Наша команда" className={styles.image} />
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.imageBlock}>
            <img src={productsImg} alt="Мы используем сами" className={styles.image} />
          </div>
          <div className={styles.textBlock}>
            <p className={styles.paragraph}>
              Мы продаём только те товары, которые используем сами. Каждый продукт проходит тщательный отбор,
              чтобы вы получали лучшее. Мы не боимся нести ответственность за качество — потому что доверяем своему выбору.
            </p>
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.textBlock}>
            <p className={styles.paragraph}>
              Круглосуточная поддержка, быстрая доставка и забота о каждом клиенте — наши главные принципы.
              Мы всегда на связи, чтобы помочь с выбором, ответить на вопросы и сделать ваш шопинг приятным.
            </p>
          </div>
          <div className={styles.imageBlock}>
            <img src="https://via.placeholder.com/500x300" alt="Поддержка" className={styles.image} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;