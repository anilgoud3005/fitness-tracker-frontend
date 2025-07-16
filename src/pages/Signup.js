import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    phone: '',
    address: '',
    age: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5050/api/auth/register', formData);
      const { token, user } = res.data;

      dispatch({ type: 'LOGIN', payload: { token, user } });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Create Your Account</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" name="name" onChange={handleChange} required />
        <input type="email" placeholder="Email" name="email" onChange={handleChange} required />
        <input type="password" placeholder="Password" name="password" onChange={handleChange} required />
        <input type="number" placeholder="Age" name="age" onChange={handleChange} required />
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="tel" placeholder="Phone Number" name="phone" onChange={handleChange} required />
        <textarea placeholder="Address" name="address" onChange={handleChange} required />

        <button type="submit" className="auth-btn">
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

        <p className="privacy-text">
          By signing up, you agree to our <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>.
        </p>

        {error && <p className="error-text">{error}</p>}

        <div className="auth-links">
          <Link to="/login" className="auth-link">Already have an account? Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
