import React from 'react';
import './VoterList.css';
import '../../components/VerticalNav/VerticalNav.css';
import VotersList from '../../components/AddVoters/AddVoter'; // import your Create District component
import VerticalNav from '../../components/VerticalNav/VerticalNav';
const VoterList = () => {
  // Dummy data for districts list
 

  return (
    <div className="admin-page-container">
      <VerticalNav /> {/* Your vertical navigation component */}
      <div className="main-content">
        <div className='center'>

        
        <header className="page-header">Voters</header>
        
          <VotersList /> {/* Your existing Create District component */}
        </div>
      </div>
    </div>
  );
};

export default VoterList;
