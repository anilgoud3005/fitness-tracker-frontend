import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

const Step3 = () => {
  const navigate = useNavigate();
  const [activity, setActivity] = useState('');
  const [goal, setGoal] = useState('');

  const handleNext = () => {
    navigate('/onboarding/step-4');
  };

  return (
    <div className="onboard-container">
      <h2>Set Your First Goal</h2>
      <select value={activity} onChange={(e) => setActivity(e.target.value)}>
        <option value="">Choose activity type</option>
        <option value="Walking">Walking</option>
        <option value="Running">Running</option>
        <option value="Gym">Gym</option>
        <option value="Swimming">Swimming</option>
      </select>
      <input
        type="text"
        placeholder="e.g. 5 workouts/week"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <button className="onboard-btn" onClick={handleNext}>Next</button>
    </div>
  );
};

export default Step3;
