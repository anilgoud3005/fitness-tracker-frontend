import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

const Step1 = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/onboarding/step-2');
  };

  return (
    <div className="onboard-container">
      <h2>👋 Welcome to FitTrack</h2>
      <p>We’ll help you set up your fitness goals in just a few steps.</p>
      <button className="onboard-btn" onClick={handleNext}>Get Started</button>
    </div>
  );
};

export default Step1;
