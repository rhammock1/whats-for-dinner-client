import React from 'react';


const NewRestaurant = function() {
  return (
    <>
      <div className='form-group'>
        <label htmlFor='title'>Restaurant Name: <span>* required</span></label>
        <input type='text' id='title' name='title' required placeholder='e.g. Papi Queso' />        
      </div>
      <div className='form-group'>
        <label htmlFor='phone-number'>Phone Number: <span>* optional</span></label>
        <input type='tel' id='phone-number' name='phone-number' placeholder='e.g. 123-456-7890' pattern='^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$'/>        
      </div>
      <div className='form-group'>
        <label htmlFor='website'>Website: <span>* optional</span></label>
        <input type='url' id='website' name='website' placeholder='e.g. http://cool-restaurant.com/'  />        
      </div>
      <div className='form-group'>
        <label htmlFor='address'>Address: <span>* optional</span></label>
        <input type='text' id='address' placeholder='e.g. 123 Main St.' />        
      </div>
    </>
    )
}

export default NewRestaurant;