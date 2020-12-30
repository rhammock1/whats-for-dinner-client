import React from 'react';


const NewRestaurant = function() {
  return (
    <>
      <div className='form-group'>
        <label htmlFor='title'>Restaurant Name: <span>* required</span></label>
        <input type='text' id='title' name='title' required placeholder='e.g. Papi Queso' />        
      </div>
      <div className='form-group'>
        <label htmlFor='style'>Is it Chain or Local? <span>* required</span></label>
        <select id='style' name='style' required>
          <option value=''>Please Choose one:</option>
          <option value='chain'>Chain</option>
          <option value='local'>Local</option>
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='phone_number'>Phone Number: <span>* optional</span></label>
        <input type='tel' id='phone_number' name='phone_number' placeholder='e.g. 123-456-7890' pattern='^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$'/>        
      </div>
      <div className='form-group'>
        <label htmlFor='web_url'>Website: <span>* optional</span></label>
        <input type='url' id='web_url' name='web_url' placeholder='e.g. http://cool-restaurant.com/'  />        
      </div>
      <div className='form-group'>
        <label htmlFor='restaurant_address'>Address: <span>* optional</span></label>
        <input type='text' id='restaurant_address' placeholder='e.g. 123 Main St.' name='restaurant_address' />        
      </div>
    </>
    )
}

export default NewRestaurant;