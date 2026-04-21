import React, { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { checkAuth } from '../store/slices/authSlice';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const ProtectedRoutes = ['/order', '/profile'];
const GuestRoutes = ['/login', '/register'];

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { token, isInitialized } = useAppSelector((state) => state.auth);

  const isProtected = ProtectedRoutes.includes(location.pathname);
  const isGuestRoute = GuestRoutes.includes(location.pathname);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(checkAuth());
    }
  }, [isInitialized, dispatch]);

  if (token && isGuestRoute) {
    return <Navigate to="/" replace />;
  }

  if (isProtected && !token) {
    return <Login />;
  }

  return <>{children}</>;
};