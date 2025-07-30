import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './AddGoalForm.css';

const activityOptions = ['Walking', 'Running', 'Swimming', 'Cycling', 'Gym', 'Yoga'];

const AddGoalForm = ({ onGoalAdded }) => {
  const { user, token } = useContext(AuthContext);
  const [goalType, setGoalType] = useState('');
  const [target, setTarget] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5050/api/goals', {
        user_id: user.id,
        goal_type: goalType,
        target_count: target,
        start_date: start,
        end_date: end,
        reminder_enabled: true
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      onGoalAdded();
      setGoalType('');
      setTarget('');
      setStart('');
      setEnd('');
    } catch (err) {
      console.error('Failed to add goal:', err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-goal-form">
      <h3>Add New Goal</h3>

      <label htmlFor="goalType">Goal Type</label>
      <select
        id="goalType"
        value={goalType}
        onChange={(e) => setGoalType(e.target.value)}
        required
      >
        <option value="">-- Select Activity --</option>
        {activityOptions.map((activity) => (
          <option key={activity} value={activity}>
            {activity}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Target Count"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        required
      />

      <input
        type="date"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        required
      />

      <input
        type="date"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        required
      />

      <button type="submit">Add Goal</button>
    </form>
  );
};

export default AddGoalForm;
