import React, { useState } from 'react';
import './LogActivity.css';

const activityTypes = ['Walking', 'Running', 'Swimming', 'Cycling', 'Gym', 'Yoga'];

const LogActivity = () => {
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, you'd send data to backend here
    setSubmitted(true);
  };

  return (
    <div className="log-activity">
      <h2>Log New Activity</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="log-form">
          <label>Activity Type</label>
          <div className="activity-options">
            {activityTypes.map((type) => (
              <button
                type="button"
                key={type}
                className={`activity-btn ${activity === type ? 'selected' : ''}`}
                onClick={() => setActivity(type)}
              >
                {type}
              </button>
            ))}
          </div>

          <label>Duration (in minutes)</label>
          <input
            type="number"
            placeholder="e.g. 30"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />

          <label>Notes (optional)</label>
          <textarea
            placeholder="Add any notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button type="submit" className="submit-btn">Submit Activity</button>
        </form>
      ) : (
        <div className="confirmation-msg">
          ✅ Activity logged successfully!
        </div>
      )}
    </div>
  );
};

export default LogActivity;
