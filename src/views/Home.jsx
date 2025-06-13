import React from 'react';
import '../assets/styles/homeStyle.css';
import ecommerceLogo from '../assets/images/ecommerce-logo.png';  // import image
import ProductList from '../components/ProductList';

const Home = () => (
    <div className="home-container">
        <div className="main-content">
            <header className="header">
                <div className="header-left">
                    <img src={ecommerceLogo} alt="Logo" className="logo" />
                </div>
                <div className="header-right">
                    <button className="btn">Sign Up</button>
                    <button className="btn">Sign In</button>
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

export default Home;

