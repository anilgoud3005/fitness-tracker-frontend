import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('Anil');
  const [email, setEmail] = useState('anil@example.com');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    setEditMode(false);
    // Send update to backend here
  };

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      {/* Avatar */}
      <div className="avatar-section">
        <span role="img" aria-label="avatar" className="avatar">🧑‍💻</span>
        <p>{name}</p>
      </div>

      {/* Stats */}
      <div className="profile-stats">
        <div className="stat-block">
          <h5>Total Workouts</h5>
          <p>18</p>
        </div>
        <div className="stat-block">
          <h5>Total Minutes</h5>
          <p>720</p>
        </div>
      </div>

      {/* Edit Fields */}
      <div className="profile-info">
        <label>Name</label>
        <input
          type="text"
          value={name}
          disabled={!editMode}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          disabled={!editMode}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="••••••"
          value={password}
          disabled={!editMode}
          onChange={(e) => setPassword(e.target.value)}
        />

        {editMode ? (
          <button className="profile-btn" onClick={handleSave}>Save Changes</button>
        ) : (
          <button className="profile-btn edit" onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default Profile;
