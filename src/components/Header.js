import React, { useContext } from 'react';
import './Header.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const {user, dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({type: "LOGOUT"});
    navigate("/login");
  }

  return (
    <header className="header">
      <h2 className="logo">Fitness Tracker</h2>
      <div className="user">
         {user ? (
          <>
            Welcome, {user.name} | {' '}
            <span className="logout-link" onClick={handleLogout} style={{ cursor: 'pointer', color: '#f00' }}>
              Logout
            </span>
          </>
        ) : (
          <span>
            <a href="/login">Login</a>
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
