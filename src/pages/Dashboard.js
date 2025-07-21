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
  const [dietPlan, setDietPlan] = useState([]);

  // Fetch BMI and Diet Plan
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

        // Fetch diet plan for this BMI
        const dietRes = await axios.get(`http://localhost:5050/api/diet/bmi/${bmi}`);
        setDietPlan(dietRes.data.diet || []);
      } catch (err) {
        console.error('Error fetching BMI or diet plan:', err.response?.data || err.message);
      }
    };

    if (user?.id) fetchBMI();
  }, [user, token]);

  // Save new height/weight and refetch diet
  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5050/api/auth/bmi/${user.id}`,
        {
          height: localHeight,
          weight: localWeight
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const { height, weight } = res.data.user;
      const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
      let category = '';

      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';

      setBmiData({ bmi, category, height, weight });
      setEditing(false);

      const dietRes = await axios.get(`http://localhost:5050/api/diet/bmi/${bmi}`);
      setDietPlan(dietRes.data.diet || []);
    } catch (err) {
      console.error('Error updating BMI:', err.response?.data || err.message);
    }
  };

  // Group diet plans by meal type
  const groupedDietPlan = dietPlan.reduce((acc, item) => {
    const mealType = item.MealType?.name || 'Other';
    if (!acc[mealType]) acc[mealType] = [];
    acc[mealType].push(item);
    return acc;
  }, {});

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

      {/* Diet Plan Grouped by Meal Type */}
      {bmiData.bmi && (
        <section className="diet-plan">
          <h3>Recommended Diet Plan</h3>
          {Object.keys(groupedDietPlan).length > 0 ? (
            Object.keys(groupedDietPlan).map((mealType, idx) => (
              <div key={idx} className="meal-group">
                <h4>{mealType}</h4>
                <ul>
                  {groupedDietPlan[mealType].map((plan, i) => (
                    <li key={i}>
                      <strong>{plan.title}</strong><br />
                      {plan.instructions && <em>{plan.instructions}</em>}<br />
                      Calories: {plan.calories} kcal |
                      Protein: {plan.protein_grams}g |
                      Carbs: {plan.carb_grams}g |
                      Fats: {plan.fat_grams}g
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No diet plan found for your BMI.</p>
          )}
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

// Color coding for BMI
const getColor = (bmi) => {
  if (bmi < 18.5) return '#3498DB';
  if (bmi < 25) return '#2ECC71';
  if (bmi < 30) return '#F39C12';
  return '#E74C3C';
};

export default Dashboard;
