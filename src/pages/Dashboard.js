import React, { useContext, useEffect, useState } from 'react';
import './Dashboard.css';
import ProgressBar from '../components/ProgressBar';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);

  const [editing, setEditing] = useState(false);
  const [localHeight, setLocalHeight] = useState('');
  const [localWeight, setLocalWeight] = useState('');
  const [bmiData, setBmiData] = useState({ bmi: null, category: '', height: '', weight: '' });

  // Fetch BMI from API
  useEffect(() => {
    const fetchBMI = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/auth/bmi/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { bmi, category, height, weight } = res.data;
        setBmiData({ bmi, category, height, weight });
        setLocalHeight(height);
        setLocalWeight(weight);
      } catch (err) {
        console.error('BMI fetch error:', err.response?.data || err.message);
      }
    };

    if (user?.id) fetchBMI();
  }, [user, token]);

  const handleSave = async () => {
  try {
    const res = await axios.put(`http://localhost:5050/api/auth/bmi/${user.id}`, {
      height: localHeight,
      weight: localWeight
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const { height, weight } = res.data.user;
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    let category = '';

    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    setBmiData({ bmi, category, height, weight });
    setEditing(false);
  } catch (err) {
    console.error('Error updating BMI:', err.response?.data || err.message);
  }
};


  // Diet Plan
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
        <div className="summary-card">
          <h5>Your BMI</h5>
          {editing ? (
            <>
              <input
                type="number"
                placeholder="Weight (kg)"
                value={localWeight}
                onChange={(e) => setLocalWeight(e.target.value)}
              />
              <input
                type="number"
                placeholder="Height (cm)"
                value={localHeight}
                onChange={(e) => setLocalHeight(e.target.value)}
              />
              <button onClick={handleSave} className="bmi-save-btn">Save</button>
            </>
          ) : (
            <>
              {bmiData.bmi ? (
                <p>
                  {bmiData.bmi} <span style={{ color: getColor(bmiData.bmi) }}>{bmiData.category}</span>
                  <button className="bmi-edit-btn" onClick={() => setEditing(true)}>Edit</button>
                </p>
              ) : (
                <p>
                  No data yet. <button className="bmi-edit-btn" onClick={() => setEditing(true)}>Add</button>
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* Diet Plan */}
      {bmiData.bmi && (
        <section className="diet-plan">
          <h3>Recommended Diet Plan</h3>
          <ul>
            {getDietPlan(bmiData.bmi).map((tip, index) => (
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

// Optional color coding
const getColor = (bmi) => {
  if (bmi < 18.5) return '#3498DB';
  if (bmi < 25) return '#2ECC71';
  if (bmi < 30) return '#F39C12';
  return '#E74C3C';
};

export default Dashboard;
