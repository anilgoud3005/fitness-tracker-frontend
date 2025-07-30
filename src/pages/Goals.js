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
      fetchGoals(); // Refresh after update
    } catch (err) {
      console.error('Error completing step:', err.response?.data || err.message);
    }
  };

  return (
    <div className="goals-page">
      <h2>My Fitness Goals</h2>

      {/* Form to add goal */}
      <AddGoalForm onGoalAdded={fetchGoals} />

      {/* Current Goal */}
      {goals.length > 0 && (
        <section className="goal-card">
          <h4>🏃 Goal: {goals[0].goal_type}</h4>

          <ProgressBar
            label="Progress"
            percentage={(goals[0].achieved_count / goals[0].target_count) * 100}
            color="#2ECC71"
          />

          <p>
            Progress: {goals[0].achieved_count} of {goals[0].target_count} completed
          </p>

          {goals[0].achieved_count < goals[0].target_count && (
            <button className="edit-btn" onClick={() => handleCompleteStep(goals[0].id)}>
              ✅ Mark One Step Done
            </button>
          )}

          {goals[0].achieved_count >= goals[0].target_count && (
            <p style={{ color: '#2ECC71', fontWeight: 'bold' }}>🎉 Goal Completed!</p>
          )}
        </section>
      )}

      {/* Reminder Setting */}
      <section className="reminder-toggle">
        <label>
          <input type="checkbox" checked={reminderOn} onChange={toggleReminder} />
          Daily Reminder Notifications
        </label>
      </section>

      {/* Past Goal History */}
      {goals.length > 1 && (
        <section className="goal-history">
          <h4>Past Goals</h4>
          <ul>
            {goals.slice(1).map((goal, i) => (
              <li key={i}>
                {goal.achieved_count >= goal.target_count ? '✅' : '❌'}{' '}
                {goal.achieved_count}/{goal.target_count} {goal.goal_type} (
                {new Date(goal.start_date).toDateString()} to{' '}
                {new Date(goal.end_date).toDateString()})
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Goals;
