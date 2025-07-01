import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Reset Your Password</h2>
      {!submitted ? (
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit" className="auth-btn">Send Reset Link</button>
        </form>
      ) : (
        <p className="confirmation-text">
          ✅ A reset link has been sent to your email address.
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;
