import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

const Step4 = () => {
  const navigate = useNavigate();
  const [reminder, setReminder] = useState('');

  const handleFinish = () => {
    navigate('/dashboard');
  };

  return (
    <div className="onboard-container">
      <h2>Set Your Daily Reminder Time</h2>
      <input
        type="time"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
      />
      <button className="onboard-btn" onClick={handleFinish}>Finish Setup</button>
    </div>
  );
};

export default Step4;
