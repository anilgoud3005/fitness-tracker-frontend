import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5050/api/auth/login', formData);
      const { token, user } = res.data;

      // Save to context and localStorage
      dispatch({ type: 'LOGIN', payload: { token, user } });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">FitTrack Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="auth-links">
          <Link to="/forgot-password" className="auth-link">Forgot password?</Link>
          <Link to="/signup" className="auth-link">Create an account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
