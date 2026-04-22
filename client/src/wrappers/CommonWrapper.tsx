import React from 'react';
import { useAppSelector } from '../store/hooks';
import ErrorModal from '../components/ErrorModal/ErrorModal';
import styles from './CommonWrapper.module.css';

interface CommonWrapperProps {
  children: React.ReactNode;
}

export const CommonWrapper: React.FC<CommonWrapperProps> = ({ children }) => {
  const { isLoading } = useAppSelector((state) => state.settings);

  return (
    <>
      {children}

      {isLoading && (
        <div className={styles.globalLoader}>
          <div className={styles.loader}>Загрузка...</div>
        </div>
      )}

      <ErrorModal />
    </>
  );
};