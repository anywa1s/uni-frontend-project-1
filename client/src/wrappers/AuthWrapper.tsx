import React, { useEffect } from 'react';
import Login from '../pages/Login/Login';
import { useAppSelector } from '../store/hooks';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { token, isInitialized } = useAppSelector((state) => state.auth);

  if (!isInitialized) {
    return (
      <div className="loader-container">
        <div className="loader">Загрузка...</div>
      </div>
    );
  }

  if (!token) {
    return <Login />;
  }

  return <>{children}</>;
};