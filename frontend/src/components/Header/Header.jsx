// import React from 'react'
import logo from '../../assets/logo.png';
import NavTag from "../NavTag/NavTag";
// import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import PropTypes from 'prop-types';


const Header = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear all auth data
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("username");
        delete axios.defaults.headers.common["Authorization"];
        
        // Update authentication state
        setIsAuthenticated(false);
        
        // Navigate to login page
        navigate("/login", { replace: true });
        
        // Dispatch custom event
        window.dispatchEvent(new Event('logout'));
    };

  return (
    <div className='fixed top-0 z-50 left-0 right-0 flex items-center justify-between space-x-4 p-4 font-bold bg-[#0f172a]'>
          <Link to='/home'>
            <NavTag image={logo} />
          </Link>
          <button 
            onClick={handleLogout}
            className="text-white hover:text-gray-300 px-4 py-2 rounded-md transition-colors"
          >
            Logout
          </button>


          {/* <section className='flex space-x-4'>
            <NavTag 
              isSelected={selectedTopic === 'portfolio'} 
              select={() => xyz('portfolio')}

              // onClick={onPortfolioClick}
            >
              Portfolio
            </NavTag>

            <NavTag 
              isSelected={selectedTopic === 'contact'} 
              select={() => xyz('contact')}
            >
              Contact
            </NavTag>

            <NavTag 
              isSelected={selectedTopic === 'shop'} 
              select={() => xyz('shop')}
            >
              Shop
            </NavTag>

          </section>
           */}


    </div>
  )
}

Header.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired
};

export default Header