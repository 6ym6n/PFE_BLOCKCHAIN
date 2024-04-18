import React, { useState } from 'react';
import './style.css';

const CreateDistrict = () => {
  const [districtType, setDistrictType] = useState('local');
  const [districtName, setDistrictName] = useState('');
  const [seatsToWin, setSeatsToWin] = useState(0);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`District Created:\nType: ${districtType}\nName: ${districtName}\nSeats to Win: ${seatsToWin}`);
  };

  return (
<div className="form-container">
  <h1>Create District</h1>
  <form onSubmit={handleSubmit}>
    <label>
      District Type:
      <select value={districtType} onChange={e => setDistrictType(e.target.value)}>
        <option value="local">Local</option>
        <option value="regional">Regional</option>
      </select>
    </label>
    <label>
      District Name:
      <input type="text" value={districtName} onChange={e => setDistrictName(e.target.value)} required />
    </label>
    <label>
      Seats to Win:
      <input type="number" value={seatsToWin} onChange={e => setSeatsToWin(parseInt(e.target.value, 10))} required />
    </label>
    <button type="submit">Create District</button>
  </form>
  <div className="note">
    Note: District creation will take several minutes.
  </div>
</div>
  );
};

export default CreateDistrict;
