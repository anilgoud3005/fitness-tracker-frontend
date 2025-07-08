import React, { useContext } from 'react';
import './Dashboard.css';
import ProgressBar from '../components/ProgressBar';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  // Calculate BMI if weight and height are present
  const bmi = user?.weight && user?.height
    ? (user.weight / ((user.height / 100) ** 2)).toFixed(1)
    : null;

  // Get BMI category and color
  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return { label: 'Underweight', color: '#3498DB' };
    if (bmi < 25) return { label: 'Normal', color: '#2ECC71' };
    if (bmi < 30) return { label: 'Overweight', color: '#F39C12' };
    return { label: 'Obese', color: '#E74C3C' };
  };

  // Get diet plan based on BMI category
  const getDietPlan = (bmi) => {
    if (bmi < 18.5) {
      return [
        "Increase calorie intake with healthy fats and proteins.",
        "Eat frequent meals with snacks in between.",
        "Include foods like nuts, dairy, and starchy vegetables.",
      ];
    } else if (bmi < 25) {
      return [
        "Maintain a balanced diet rich in vegetables, fruits, and lean proteins.",
        "Stay hydrated and limit processed foods.",
        "Continue with regular meals and moderate activity.",
      ];
    } else if (bmi < 30) {
      return [
        "Reduce sugar and refined carbs.",
        "Focus on high-fiber vegetables and lean protein.",
        "Avoid late-night snacking and sugary drinks.",
      ];
    } else {
      return [
        "Adopt a low-carb, high-fiber diet.",
        "Avoid processed foods, fried items, and sugary snacks.",
        "Consult a dietitian for a personalized weight-loss plan.",
      ];
    }
  };

  return (
    <div className="dashboard">
      {/* Greeting */}
      <section className="greeting">
        <h2>Hi {user?.name}</h2>
        <p>You're doing great! Let’s keep the momentum going.</p>
      </section>

      {/* Progress + Streak */}
      <section className="progress-streak">
        <div className="progress-card">
          <h4>Weekly Goal Progress</h4>
          <ProgressBar percentage={60} color="#2ECC71" />
          <p>3 of 5 workouts completed</p>
        </div>

        <div className="streak-card">
          <h4>Current Streak</h4>
          <p>🔥 4 days in a row</p>
        </div>
      </section>

      {/* Activity Summary Cards */}
      <section className="activity-summary">
        <div className="summary-card">
          <h5>Steps Today</h5>
          <p>7,845</p>
        </div>
        <div className="summary-card">
          <h5>Calories Burned</h5>
          <p>540 kcal</p>
        </div>
        <div className="summary-card">
          <h5>Workout Time</h5>
          <p>42 min</p>
        </div>
        {bmi && (() => {
          const { label, color } = getBmiCategory(bmi);
          return (
            <div className="summary-card" style={{ borderLeft: `5px solid ${color}` }}>
              <h5>Your BMI</h5>
              <p>{bmi} <span style={{ color }}>{label}</span></p>
            </div>
          );
        })()}
      </section>

      {/* Diet Plan Based on BMI */}
      {bmi && (
        <section className="diet-plan">
          <h3>Recommended Diet Plan</h3>
          <ul>
            {getDietPlan(bmi).map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </section>
      )}

      {/* CTA Buttons */}
      <section className="dashboard-actions">
        <button className="dashboard-btn">Log Activity</button>
        <button className="dashboard-btn secondary">Edit Goal</button>
      </section>

      {/* Motivational Quote */}
      <section className="quote-section">
        <blockquote>“It’s not about perfect. It’s about effort.”</blockquote>
      </section>
    </div>
  );
};

export default Dashboard;
