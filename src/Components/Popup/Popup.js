import React from 'react';
import './Popup.css';

function Popup(props) {
  const { handleClear } = props;
  return (
    <div className="popup">
      <p className="demo">
        To test please use demo account:
        <br />
        username:
        {' '}
        <strong>demo</strong>
        <br />
        password:
        {' '}
        <strong>P@ssword123</strong>
      </p>
      <p className="info">
        <strong>You do not need to be logged in to use this app.</strong>
        <br />
        <br />
        This app&apos;s goal is to help you decide what to eat.
        You can choose between viewing restaurants, recipes, or both
        in the filter below. Then spin the wheel to see what&apos;s for dinner!
      </p>
      <p>
        If you are logged in and have added favorites, 3 of those favorites will
        always appear on the wheel. If you have added more than 3 local restaurants
        then a new style option will appear to filter by local restaurants.
      </p>
      <button type="button" onClick={handleClear}>Clear</button>
    </div>

  );
}

export default Popup;
