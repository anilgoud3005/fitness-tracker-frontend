// src/pages/Goals.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import ProgressBar from '../components/ProgressBar';
import AddGoalForm from './AddGoalForm';
import './Goals.css';

const Goals = () => {
  const { user, token } = useContext(AuthContext);
  const [goals, setGoals] = useState([]);
  const [reminderOn, setReminderOn] = useState(true);

  const fetchGoals = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/goals/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGoals(res.data);
    } catch (err) {
      console.error('Error loading goals:', err);
    }
  };

  useEffect(() => {
    if (user?.id) fetchGoals();
  }, [user]);

  const toggleReminder = () => setReminderOn(!reminderOn);

  const handleCompleteStep = async (goalId) => {
    try {
      await axios.patch(`http://localhost:5050/api/goals/increment/${goalId}`, null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchGoals();
    } catch (err) {
      console.error('Error completing step:', err.response?.data || err.message);
    }
  };

  const activeGoals = goals.filter(goal => goal.achieved_count < goal.target_count);
  const completedGoals = goals.filter(goal => goal.achieved_count >= goal.target_count);

  return (
    <div className="goals-page">
      <h2>My Fitness Goals</h2>

      <AddGoalForm onGoalAdded={fetchGoals} />

      {activeGoals.length > 0 ? (
        activeGoals.map((goal) => (
          <section key={goal.id} className="goal-card">
            <h4>🏃 Goal: {goal.goal_type}</h4>

            <ProgressBar
              label="Progress"
              percentage={(goal.achieved_count / goal.target_count) * 100}
              color="#2ECC71"
            />

            <p>
              Progress: {goal.achieved_count} of {goal.target_count} completed
            </p>

            {goal.achieved_count < goal.target_count && (
              <button className="edit-btn" onClick={() => handleCompleteStep(goal.id)}>
                ✅ Mark One Step Done
              </button>
            )}

            {goal.achieved_count >= goal.target_count && (
              <p style={{ color: '#2ECC71', fontWeight: 'bold' }}>🎉 Goal Completed!</p>
            )}
          </section>
        ))
      ) : (
        <p>No active goals yet. Add one!</p>
      )}

      <section className="reminder-toggle">
        <label>
          <input type="checkbox" checked={reminderOn} onChange={toggleReminder} />
          Daily Reminder Notifications
        </label>
      </section>

      {completedGoals.length > 0 && (
        <section className="goal-history">
          <h4>Past Goals</h4>
          <ul>
            {completedGoals.map((goal, i) => (
              <li key={i}>
                ✅ {goal.goal_type} — {goal.achieved_count}/{goal.target_count} (
                {new Date(goal.start_date).toDateString()} - {new Date(goal.end_date).toDateString()})
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Goals;
