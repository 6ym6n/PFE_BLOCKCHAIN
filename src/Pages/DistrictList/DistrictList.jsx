import React from 'react';
import './DistrictList.css';
import '../../components/VerticalNav/VerticalNav.css';
import CreateDistrict from '../../components/CreateDistrict/CreateDistrict'; // import your Create District component
import VerticalNav from '../../components/VerticalNav/VerticalNav';
const DistrictsPage = () => {
  // Dummy data for districts list
 

  return (
    <div className="admin-page-container">
      <VerticalNav /> {/* Your vertical navigation component */}
      <div className="main-content">
        <div className='center'>

        
        <header className="page-header">Districts</header>
        <div className="district-panels">
      <div className="local-districts-panel district-panel">
        <h2>Local Districts</h2>
        {/* Local districts will be listed here */}
      </div>
      <div className="regional-districts-panel district-panel">
        <h2>Regional Districts</h2>
        {/* Regional districts will be listed here */}
      </div></div>
    </div>
        <div className="create-district-container">
          <CreateDistrict /> {/* Your existing Create District component */}
        </div>
      </div>
    </div>
  );
};

export default DistrictsPage;
