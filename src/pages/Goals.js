import React, { useState } from 'react';
import './Goals.css';
import ProgressBar from '../components/ProgressBar';

const Goals = () => {
  const [reminderOn, setReminderOn] = useState(true);

  const toggleReminder = () => {
    setReminderOn(!reminderOn);
  };

  return (
    <div className="goals-page">
      <h2>My Fitness Goals</h2>

      {/* Active Goal Overview */}
      <section className="goal-card">
        <h4>🏃 Goal: 5 Workouts / Week</h4>
        <ProgressBar label="Progress" percentage={60} color="#2ECC71" />

        <p>Progress: 3 of 5 completed</p>
        <button className="edit-btn">Edit Goal</button>
      </section>

      {/* Reminder Toggle */}
      <section className="reminder-toggle">
        <label>
          <input
            type="checkbox"
            checked={reminderOn}
            onChange={toggleReminder}
          />
          Daily Reminder Notifications
        </label>
      </section>

      {/* Past Goal Archive */}
      <section className="goal-history">
        <h4>Past Goals</h4>
        <ul>
          <li>✅ 4/4 Gym Workouts (Last Week)</li>
          <li>✅ 3/3 Walks (2 Weeks Ago)</li>
          <li>❌ 2/5 Runs (Missed Target)</li>
        </ul>
      </section>
    </div>
  );
};

export default Goals;
