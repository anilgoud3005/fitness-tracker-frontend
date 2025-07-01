import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ label, percentage, color = '#2ECC71' }) => {
  return (
    <div className="progress-bar-wrapper">
      {label && <div className="progress-label">{label}</div>}
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <div className="progress-percent">{percentage}%</div>
    </div>
  );
};

export default ProgressBar;
