import React, { useState } from 'react';
import './AdminAddCandidate.css';


const constituencies = [
  "Agadir-Ida-Ou-Tanane", "Aïn Chock (Casablanca)", "Al Fida - Mers Sultan (Casablanca)", "Al Hoceïma",
  "Assa-Zag", "Azilal", "Beni Mellal", "Ben Slimane", "Berkane", "Berrechid",
  "Boujdour", "Boulmane", "Casablanca-Anfa", "Chefchaouen", "Chichaoua", "Chtouka Ait Baha",
  "El Hajeb", "El Jadida", "El Kelaa des Sraghna", "Errachidia", "Essaouira", "Fès", "Figuig", "Guelmim",
  "Guercif", "Ifrane", "Jerada", "Kénitra", "Khemisset", "Khenifra", "Khouribga", "Laâyoune",
  "Larache", "Marrakech", "M'diq-Fnideq", "Mediouna", "Meknès", "Mohammedia", "Moulay Yacoub",
  "Nador", "Nouaceur", "Ouarzazate", "Oued Ed-Dahab", "Oujda-Angad", "Rabat", "Safi", "Salé",
  "Sefrou", "Settat", "Sidi Bennour", "Sidi Ifni", "Sidi Kacem", "Sidi Slimane", "Sidi Youssef Ben Ali (Marrakech)",
  "Skhirate-Témara", "Tanger-Assilah", "Tan-Tan", "Taounate", "Taourirt", "Tarfaya", "Taroudant",
  "Tata", "Taza", "Tétouan", "Tiznit", "Youssoufia", "Zagora", "Aïn Sebaâ - Hay Mohammadi (Casablanca)",
  "Ben M'sick (Casablanca)", "Hay Hassani (Casablanca)", "Mechouar Kasba (Marrakech)", "Menara (Marrakech)",
  "Moulay Rachid (Casablanca)", "Sidi Bernoussi (Casablanca)", "Sidi Moumen (Casablanca)",
  "Al Massira (Agadir)", "Annakhil (Marrakech)", "Mouassine (Marrakech)", "Jdid (Marrakech)",
  "Sidi Youssef (Marrakech)", "El Harti (Marrakech)", "M'Hamid (Marrakech)", "Agdal (Rabat)",
  "Hassan (Rabat)", "Souissi (Rabat)", "Yacoub El Mansour (Rabat)", "Ain Atiq (Rabat)",
  "Sale Medina (Salé)", "Tabriquet (Salé)", "Bettana (Salé)", "Hay Karima (Salé)", "Hay Rahma (Salé)"
];

const regions = [
  "Tanger-Tétouan-Al Hoceïma",
  "L'Oriental",
  "Fès-Meknès",
  "Rabat-Salé-Kénitra",
  "Béni Mellal-Khénifra",
  "Casablanca-Settat",
  "Marrakech-Safi",
  "Drâa-Tafilalet",
  "Souss-Massa",
  "Guelmim-Oued Noun",
  "Laâyoune-Sakia El Hamra",
  "Dakhla-Oued Ed-Dahab"
];

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
        <select value={districtName} onChange={e => setDistrictName(e.target.value)} required>
          <option value="">Select District Name</option>
          {districtType === DistrictType.local && constituencies.map(name => <option key={name} value={name}>{name}</option>)}
          {districtType === DistrictType.regional && regions.map(name => <option key={name} value={name}>{name}</option>)}
        </select>
      </label>
      <button type="submit">Add Candidate</button>
    </form>
  );
}

export default AddCandidateForm;
