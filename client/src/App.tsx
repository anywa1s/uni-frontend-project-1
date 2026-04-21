import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
  return (
    <BrowserRouter>
      <CommonWrapper>
        <Header />

        <main className="main-content">
          <AuthWrapper> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/about" element={<About />} />
              <Route path="/help" element={<Help />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/order" element={<Order />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthWrapper>
        </main>

        <Footer />
      </CommonWrapper>
    </BrowserRouter>
  );
};

export default App;