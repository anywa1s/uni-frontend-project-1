import React from 'react';
import teamImg from '../../assets/about_team.jpg';
import productsImg from '../../assets/about_products.jpg';
import helpImg from '../../assets/about_help.jpg';
import styles from './About.module.css';
import bgStyles from '../../ui/bgpattern.module.css'

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={`${bgStyles.bgpattern} ${bgStyles.bgpatternA}`}>
        <div className={styles.oval1}></div>
        <div className={styles.oval2}></div>
        <h1 className={styles.title}>{`с Вашего позволения, \n`} <span className="accent">представимся</span></h1>
      </div>

      <div className={styles.content}>
        <div className={styles.block}>
          <div className={styles.textBlock}>
            <p className={styles.paragraph}>
              Наш проект появился в 2026 году. Мы — команда энтузиастов, объединённых любовью к <span className='accent'>качественным</span> и <span className='accent'>стильным</span> вещам.
              С самого начала мы ставили перед собой цель — создавать магазин, в котором <span className='accent'>приятно</span> и <span className='accent'>безопасно</span> покупать.
            </p>
          </div>
          <div className={styles.imageBlock}>
            <img src={teamImg} className={styles.image} />
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.imageBlock}>
            <img src={productsImg} className={styles.image} />
          </div>
          <div className={styles.textBlock}>
            <p className={styles.paragraph}>
              Мы продаём только те товары, которые <span className='accent'>используем сами</span>. Каждый продукт проходит тщательный отбор,
              чтобы вы получали лучшее. Мы не боимся нести ответственность за <span className='accent'>качество</span> — потому что <span className='accent'>доверяем своему выбору</span>.
            </p>
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.textBlock}>
            <p className={styles.paragraph}>
              Круглосуточная поддержка, быстрая доставка и <span className='accent'>забота о каждом клиенте</span> — наши главные принципы.
              Мы всегда на связи, чтобы помочь с выбором, ответить на вопросы и сделать ваш шопинг приятным.
            </p>
          </div>
          <div className={styles.imageBlock}>
            <img src={helpImg} className={styles.image} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;