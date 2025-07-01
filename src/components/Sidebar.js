import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-links">
        <Link to="/dashboard">🏠 Dashboard</Link>
        <Link to="/log">📝 Log Activity</Link>
        <Link to="/goals">🎯 Goals</Link>
        <Link to="/history">📅 History</Link>
        <Link to="/achievements">🏅 Achievements</Link>
        <Link to="/profile">👤 Profile</Link>
        <Link to="/settings">⚙️ Settings</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
