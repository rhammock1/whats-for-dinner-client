import React from 'react';
import './Popup.css';

function Popup(props) {
  return (
    <div className='popup'>
      <p>To test please use demo account: <br />
      username: demo <br />
      password: P@ssword123
      </p>
      <button onClick={props.handleClear}>Clear</button>
    </div>

  )
}

export default Popup;