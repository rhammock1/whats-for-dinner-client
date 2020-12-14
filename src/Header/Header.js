import React from 'react';
import './Header.css';

function Header() {
  return (
    <header>
      <h1>Whats's For Dinner!?</h1>
      {/* Need to conditionally render based on presence of a web browswer token */}
      <div className='login-container'>
        <button>Login</button>
        <button>Sign Up</button>
      </div>
      
    </header>
  )
}

export default Header;