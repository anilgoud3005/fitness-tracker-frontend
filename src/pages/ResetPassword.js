import React, { useState } from 'react';
import './ResetPassword.css';

const ResetPassword = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Set New Password</h2>
      {!submitted ? (
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="password" placeholder="New Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit" className="auth-btn">Reset Password</button>
        </form>
      ) : (
        <p className="confirmation-text">✅ Your password has been successfully reset.</p>
      )}
    </div>
  );
};

export default ResetPassword;
