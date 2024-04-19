import React from 'react';
import '../AdminPage/AdminPage.css';
import '../../components/VerticalNav/VerticalNav.css';
import CreateDistrict from '../../components/CreateDistrict/CreateDistrict'; // import your Create District component
import VerticalNav from '../../components/VerticalNav/VerticalNav';
const DistrictsPage = () => {
  // Dummy data for districts list
  const districts = [
    { id: 1, name: 'District 1', description: 'Please make me the winner!' },
    { id: 2, name: 'District 2', description: 'Vote for change!' },
    // Add more district data here
  ];

  return (
    <div className="admin-page-container">
      <VerticalNav /> {/* Your vertical navigation component */}
      <div className="main-content">
        <header className="page-header">Districts</header>
        <div className="districts-list">
          {districts.map((district) => (
            <div key={district.id} className="district-card">
              <div className="district-info">
                <h3>{district.name}</h3>
                <p>{district.description}</p>
                {/* Additional district information can go here */}
              </div>
              {/* Other elements like voting button can go here */}
            </div>
          ))}
        </div>
        <div className="create-district-container">
          <CreateDistrict /> {/* Your existing Create District component */}
        </div>
      </div>
    </div>
  );
};

export default DistrictsPage;
