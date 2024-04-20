import React from 'react';
import './AddVoter.css';



const AddVoter = () => {
  

  return (
    <div className="form-addvoter">
      <h1 className='add'>Add Voter</h1>
      <form >
        <label>
          Email:
        <label>
          
          <input type='Email' className='email' />
        </label>
        </label>
        
        
        <button type="submit">Add</button>
      </form>
      
    </div>
  );
};

export default AddVoter;
