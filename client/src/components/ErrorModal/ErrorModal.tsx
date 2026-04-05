import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { hideErrorModal } from '../../store/slices/settingsSlice';
import styles from './ErrorModal.module.css';

const ErrorModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isErrorModalOpen, errorMessage } = useAppSelector((state) => state.settings);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isErrorModalOpen) {
        dispatch(hideErrorModal());
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [dispatch, isErrorModalOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(hideErrorModal());
    }
  };

  if (!isErrorModalOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>ОШИБКА</h3>
        </div>
        <div className={styles.content}>
          <p>{errorMessage || 'Произошла неизвестная ошибка'}</p>
        </div>
        <div className={styles.footer}>
          <button 
            className={styles.okButton} 
            onClick={() => dispatch(hideErrorModal())}
          >
            ЗАКРЫТЬ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;