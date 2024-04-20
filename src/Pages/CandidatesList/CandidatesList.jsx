import React,{useState} from 'react';
import './CandidatesList.css';
import '../../components/VerticalNav/VerticalNav.css';
import AddCandidates from '../../components/adminAddCandidate/AdminAddCandidate'; // Fix import path
import VerticalNav from '../../components/VerticalNav/VerticalNav'; // Fix import path



const CandidatesList = () => {

  const [candidates, setCandidates] = useState([]); // This state holds the list of candidates


  // Function to handle new candidate submissions
  const handleNewCandidate = (candidateData) => {
    setCandidates([...candidates, candidateData]); // Add new candidate to the list
  };

return (
    <div className="admin-page-container">
      <VerticalNav />
      <AddCandidates onSubmit={handleNewCandidate} />
      <div className="candidates-table">
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Party</th>
              <th>District Type</th>
              <th>District Name</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index}>
                <td>{candidate.fullName}</td>
                <td>{candidate.age}</td>
                <td>{candidate.gender}</td>
                <td>{candidate.party}</td>
                <td>{candidate.districtType}</td>
                <td>{candidate.districtName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidatesList;
