import React from 'react';
import './VerticalNav.css';  // Import the CSS for styling
import { FaHome, FaList, FaSignOutAlt } from 'react-icons/fa';  // Import icons

function VerticalNav() {
  return (
    <nav className="vertical-nav">
      <div className="nav-logo">MENU</div>
      <ul className="nav-items">
        <li className="nav-item">
          <FaHome className="nav-icon" />
          <span>Dashboard</span>
        </li>
        <li className="nav-item">
          <FaList className="nav-icon" />
          <span>District List</span>
        </li>
        <li className="nav-item">
          <FaSignOutAlt className="nav-icon" />
          <span>Sign Out</span>
        </li>
      </ul>
    </nav>
  );
}

export default VerticalNav;
