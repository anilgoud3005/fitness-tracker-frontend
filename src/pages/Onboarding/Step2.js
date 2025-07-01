import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

const activityOptions = ['Walking', 'Running', 'Swimming', 'Gym', 'Cycling', 'Yoga'];

const Step2 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const toggleOption = (option) => {
    setSelected(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const handleNext = () => {
    navigate('/onboarding/step-3');
  };

  return (
    <div className="onboard-container">
      <h2>Select Your Preferred Activities</h2>
      <div className="checkbox-list">
        {activityOptions.map((activity, index) => (
          <label key={index}>
            <input
              type="checkbox"
              value={activity}
              checked={selected.includes(activity)}
              onChange={() => toggleOption(activity)}
            />
            {activity}
          </label>
        ))}
      </div>
      <button className="onboard-btn" onClick={handleNext}>Next</button>
    </div>
  );
};

export default Step2;
