// components/Home.js
// components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to the Restaurant App</h2>
      <p>Choose a restaurant and explore the menu!</p>
      
      <div className="navigation-buttons">
        <Link to="/restaurants" className="button-link">Explore Restaurants</Link>
        <Link to="/cart" className="button-link">View Cart</Link>
      </div>
    </div>
  );
};

export default Home;
