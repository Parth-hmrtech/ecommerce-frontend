import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../assets/styles/homeStyle.css';
import ecommerceLogo from '../assets/images/ecommerce-logo.png';
import ProductList from '../components/ProductList';

const Home = () => {
  const navigate = useNavigate(); 

  return (
    <div className="home-container">
      <div className="main-content">
        <header className="header">
          <div className="header-left">
            <img src={ecommerceLogo} alt="Logo" className="logo" />
          </div>
          <div className="header-right">
            <button className="btn" onClick={() => navigate('/signup')}>
              Sign Up
            </button>
            <button className="btn" onClick={() => navigate('/signin')}>
              Sign In
            </button>
          </div>
        </header>

        <div className="content-area">
          <ProductList />
        </div>
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} eCommerce. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
