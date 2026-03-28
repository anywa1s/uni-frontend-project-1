import React, { useState } from 'react';
import styles from './Help.module.css';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    id: 1,
    question: 'Как оформить заказ?',
    answer: 'Выберите товар на главной странице, нажмите «В корзину», затем перейдите в корзину и нажмите «Оформить заказ». После этого заполните форму доставки и оплаты.',
  },
  {
    id: 2,
    question: 'Как я могу оплатить заказ?',
    answer: 'Мы принимаем банковские, игральные, таро и контурные карты.',
  },
  {
    id: 3,
    question: 'Сколько стоит доставка?',
    answer: 'Где-то 2500.',
  },
  {
    id: 4,
    question: 'Сколько времени занимает доставка?',
    answer: 'Доставка по городу занимает 1–2 дня, по регионам России — 3–7 дней. Сроки могут значительно меняться в зависимости от удалённости.',
  },
  {
    id: 5,
    question: 'Есть ли международная доставка?',
    answer: 'Если лететь до 4 часов, может привезём.',
  },
  {
    id: 6,
    question: 'Могу ли я вернуть товар?',
    answer: 'Да, вы можете вернуть товар без возврата денежных средств.',
  },
  {
    id: 7,
    question: 'Как связаться со службой поддержки?',
    answer: 'Напишите нам в телегу, может ответим. Мы работаем с 11:15 до 11:30 пн-вт.',
  },
  {
    id: 8,
    question: 'Тут нет ответа на мой вопрос',
    answer: 'Ну, бывает, это ж не гугл.',
  }
];

const Help: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleQuestion = (id: number) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.faqList}>
        {faqData.map(item => (
          <div key={item.id} className={styles.faqItem}>
            <button
              className={styles.questionButton}
              onClick={() => toggleQuestion(item.id)}
              aria-expanded={openId === item.id}
            >
              <span className={styles.icon}>{openId === item.id ? '−' : '+'}</span>
              <span className={styles.questionText}>{item.question}</span>
            </button>
            {openId === item.id && (
              <div className={styles.answer}>
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;