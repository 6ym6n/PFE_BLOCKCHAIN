import React from 'react';
import VerticalNav from '../../components/VerticalNav/VerticalNav';
import './AdminPage.css';  // Make sure to import the CSS file for styling

function AdminPage() {
  return (
    <div className="admin-page">
      <VerticalNav />
      <main className="main-content">
        <h1>Welcome, Admin</h1>
        {/* Rest of the page content */}
      </main>
    </div>
  );
}

export default AdminPage;
