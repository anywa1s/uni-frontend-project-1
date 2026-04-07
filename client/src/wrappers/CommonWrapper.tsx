import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import ErrorModal from '../components/ErrorModal/ErrorModal';

interface CommonWrapperProps {
  children: React.ReactNode;
}

export const CommonWrapper: React.FC<CommonWrapperProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.settings);

  return (
    <>
      {children}

      {isLoading && (
        <div className="global-loader">
          <div className="loader">Загрузка...</div>
        </div>
      )}

      <ErrorModal />
    </>
  );
};