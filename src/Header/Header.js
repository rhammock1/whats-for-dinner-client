import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header>
      <Link to={'/'}><h1>Whats's For Dinner!?</h1></Link>
      {/* Need to conditionally render based on presence of a web browswer token */}
      <div className='login-container'>
        <button>Login</button>
        <button>Sign Up</button>
      </div>
      
    </header>
  )
}

export default Header;