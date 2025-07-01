import React from 'react';
import './Achievements.css';

const badges = [
  { id: 1, label: 'First Workout', earned: true },
  { id: 2, label: '7-Day Streak', earned: true },
  { id: 3, label: '5 Workouts in a Week', earned: false },
  { id: 4, label: '10 Hours Total', earned: false },
];

const Achievements = () => {
  return (
    <div className="achievements-page">
      <h2>Achievements</h2>

      {/* Badge Grid */}
      <section className="badge-grid">
        {badges.map(badge => (
          <div key={badge.id} className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}>
            <span role="img" aria-label="badge">🏅</span>
            <p>{badge.label}</p>
            {!badge.earned && <div className="locked-overlay">🔒</div>}
          </div>
        ))}
      </section>

      {/* Current Streak Summary */}
      <section className="streak-summary">
        <h4>🔥 Current Streak: <span>4 days</span></h4>
      </section>

      {/* Total Stats */}
      <section className="total-stats">
        <div className="stat-block">
          <h5>Workouts Completed</h5>
          <p>18</p>
        </div>
        <div className="stat-block">
          <h5>Total Hours Logged</h5>
          <p>12 hrs</p>
        </div>
      </section>
    </div>
  );
};

export default Achievements;
