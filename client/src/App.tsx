import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './store/hooks';

import { checkAuth } from './store/slices/authSlice';
import { AuthWrapper } from './wrappers/AuthWrapper';
import { CommonWrapper } from './wrappers/CommonWrapper';

import { Header } from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import About from './pages/About/About';
import Help from './pages/Help/Help';
import Cart from './pages/Cart/Cart';
import Order from './pages/Order/Order';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  
  return (
    <BrowserRouter>
      <CommonWrapper>
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/order"
              element={
                <AuthWrapper>
                  <Order />
                </AuthWrapper>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthWrapper>
                  <Profile />
                </AuthWrapper>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </CommonWrapper>
    </BrowserRouter>
  );
};

export default App;