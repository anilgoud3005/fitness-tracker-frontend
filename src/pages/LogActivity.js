import React, { useState, useContext } from 'react';
import './LogActivity.css';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const activityTypes = ['Walking', 'Running', 'Swimming', 'Cycling', 'Gym', 'Yoga'];

const LogActivity = () => {
  const { user, token } = useContext(AuthContext);
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!activity || !duration) {
      setError('Please select an activity and enter duration.');
      return;
    }

    try {
      await axios.post('http://localhost:5050/api/activity/log', {
        user_id: user.id,
        activity_type: activity,
        duration_minutes: parseInt(duration),
        notes,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Failed to log activity.');
    }
  };

  return (
    <div className="log-activity">
      <h2>Log New Activity</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="log-form">
          {error && <p className="error-text">{error}</p>}

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
