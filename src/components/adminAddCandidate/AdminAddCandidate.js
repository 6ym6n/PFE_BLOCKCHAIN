import React, { useState } from 'react';
import './style.css';
// Enum definitions to match the smart contract
const Gender = {
  male: 'male',
  female: 'female',
  other: 'other'
};

const DistrictType = {
  local: 'local',
  regional: 'regional'
};

function AddCandidateForm({ onSubmit }) {
  // State for each form field
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [party, setParty] = useState('');
  const [districtType, setDistrictType] = useState('');
  const [districtName, setDistrictName] = useState('');

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the candidate data
    const candidateData = {
      fullName,
      age: parseInt(age, 10),
      gender,
      party,
      districtType,
      districtName
    };

    // Optional: Add validation based on the smart contract requirements before submitting
    if ((districtType === DistrictType.local || districtType === DistrictType.regional) &&
        (districtType !== DistrictType.regional || (age > 18 && age < 40) || gender === Gender.female)) {
      onSubmit(candidateData);
    } else {
      alert("Please make sure all fields are filled correctly according to the rules.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>
        Full Name:
        <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required />
      </label>
      <label>
        Age:
        <input type="number" value={age} onChange={e => setAge(e.target.value)} required />
      </label>
      <label>
        Gender:
        <select value={gender} onChange={e => setGender(e.target.value)} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        Party:
        <input type="text" value={party} onChange={e => setParty(e.target.value)} required />
      </label>
      <label>
        District Type:
        <select value={districtType} onChange={e => setDistrictType(e.target.value)} required>
          <option value="">Select District Type</option>
          <option value="local">Local</option>
          <option value="regional">Regional</option>
        </select>
      </label>
      <label>
        District Name:
        <input type="text" value={districtName} onChange={e => setDistrictName(e.target.value)} required />
      </label>
      <button type="submit">Add Candidate</button>
    </form>
  );
}

export default AddCandidateForm;
