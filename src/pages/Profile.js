import React, { useContext, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, token, dispatch } = useContext(AuthContext);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    password: '',
    gender: user.gender || '',
    phone: user.phone || '',
    address: user.address || '',
    weight: user.weight || '',
    height: user.height || '',
    age: user.age || ''
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`http://localhost:5050/api/user/update/${user.id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch({ type: 'LOGIN', payload: { user: res.data.user, token } });
      setEditMode(false);
    } catch (err) {
      console.error('Update failed:', err.response?.data || err.message);
    }
  };

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      <div className="avatar-section">
        <span role="img" aria-label="avatar" className="avatar">🧑‍💻</span>
        <p>{form.name}</p>
      </div>

      <div className="profile-info">
        {[
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Password', name: 'password', type: 'password', placeholder: '••••••' },
          { label: 'Gender', name: 'gender', type: 'text' },
          { label: 'Phone', name: 'phone', type: 'text' },
          { label: 'Address', name: 'address', type: 'text' },
          { label: 'Weight (kg)', name: 'weight', type: 'number' },
          { label: 'Height (cm)', name: 'height', type: 'number' },
          { label: 'Age', name: 'age', type: 'number' }
        ].map(field => (
          <React.Fragment key={field.name}>
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder || ''}
              value={form[field.name]}
              onChange={handleChange}
              disabled={!editMode}
            />
          </React.Fragment>
        ))}

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
