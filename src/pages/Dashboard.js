import React, { useContext, useEffect, useState } from 'react';
import './Dashboard.css';
import ProgressBar from '../components/ProgressBar';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [localHeight, setLocalHeight] = useState('');
  const [localWeight, setLocalWeight] = useState('');
  const [bmiData, setBmiData] = useState({ bmi: null, category: '', height: '', weight: '' });
  const [dietPlan, setDietPlan] = useState([]);
  const [stepsToday, setStepsToday] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [workoutMinutes, setWorkoutMinutes] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [activeGoal, setActiveGoal] = useState(null);
  const [pastGoals, setPastGoals] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetchBMI();
      fetchActivitySummary();
      fetchGoalProgress();
      fetchCurrentGoal();
      fetchPastGoals(); // 🆕 Fetch list of past goals
    }
  }, [user]);

  const fetchBMI = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/auth/bmi/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { bmi, category, height, weight } = res.data;
      setBmiData({ bmi, category, height, weight });
      setLocalHeight(height);
      setLocalWeight(weight);

      const dietRes = await axios.get(`http://localhost:5050/api/diet/bmi/${bmi}`);
      setDietPlan(dietRes.data.diet || []);
    } catch (err) {
      console.error('Error fetching BMI or diet plan:', err.response?.data || err.message);
    }
  };

  const fetchActivitySummary = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/activity/summary/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStepsToday(res.data.steps || 0);
      setCaloriesBurned(res.data.calories || 0);
      setWorkoutMinutes(res.data.totalMinutes || 0);
    } catch (err) {
      console.error('Error fetching activity summary:', err);
    }
  };

  const fetchGoalProgress = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/goals/progress/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentStreak(res.data.streak || 0);
    } catch (err) {
      console.error('Error fetching goal streak:', err);
    }
  };

  const fetchCurrentGoal = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/goals/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const goals = res.data;
      const nextGoal = goals.find(goal => goal.achieved_count < goal.target_count);
      setActiveGoal(nextGoal || null);
    } catch (err) {
      console.error('Error fetching current goal:', err);
    }
  };

  const fetchPastGoals = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/goals/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const completed = res.data.filter(goal => goal.achieved_count >= goal.target_count);
      setPastGoals(completed);
    } catch (err) {
      console.error('Error fetching past goals:', err);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5050/api/auth/bmi/${user.id}`,
        { height: localHeight, weight: localWeight },
        { headers: { Authorization: `Bearer ${token}` } }
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

      {/* Completed Goals Count */}
      <section className="streak-card">
        <h4>Past Goals Completed</h4>
        <p>🏁 {currentStreak} goals completed</p>
      </section>

      {/* Active Goal */}
      {activeGoal ? (
        <section className="progress-card">
          <h4>🎯 Active Goal: {activeGoal.goal_type}</h4>
          <ProgressBar
            percentage={(activeGoal.achieved_count / activeGoal.target_count) * 100}
            color="#3A5A99"
          />
          <p>{activeGoal.achieved_count} of {activeGoal.target_count} completed</p>
          <button
            className="dashboard-btn"
            onClick={async () => {
              try {
                await axios.patch(`http://localhost:5050/api/goals/increment/${activeGoal.id}`, null, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                fetchCurrentGoal();
                fetchGoalProgress();
                fetchPastGoals(); // ✅ Refresh past goals list
              } catch (err) {
                console.error('Step update error:', err);
              }
            }}
          >
            ✅ Mark One Step Done
          </button>
        </section>
      ) : (
        <section className="progress-card">
          <h4>🎉 All goals completed!</h4>
          <p>You’ve completed {currentStreak} goals. Great job!</p>
        </section>
      )}

      {/* ✅ Past Goals List */}
      {pastGoals.length > 0 && (
        <section className="goal-history">
          <h4>Past Goals</h4>
          <ul>
            {pastGoals.map((goal, i) => (
              <li key={i}>
                ✅ {goal.goal_type} — {goal.achieved_count}/{goal.target_count} (
                {new Date(goal.start_date).toDateString()} - {new Date(goal.end_date).toDateString()})
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Activity Summary */}
      <section className="activity-summary">
        <div className="summary-card">
          <h5>Steps Today</h5>
          <p>{stepsToday.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h5>Calories Burned</h5>
          <p>{caloriesBurned.toFixed(0)} kcal</p>
        </div>
        <div className="summary-card">
          <h5>Workout Time</h5>
          <p>{workoutMinutes} min</p>
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
                  {bmiData.bmi}{' '}
                  <span style={{ color: getColor(bmiData.bmi) }}>{bmiData.category}</span>{' '}
                  <button className="bmi-edit-btn" onClick={() => setEditing(true)}>Edit</button>
                </p>
              ) : (
                <p>No data yet. <button className="bmi-edit-btn" onClick={() => setEditing(true)}>Add</button></p>
              )}
            </>
          )}
        </div>
      </section>

      {/* Diet Plan */}
      {bmiData.bmi && (
        <section className="diet-plan">
          <h3>Recommended Diet Plan</h3>
          {Object.keys(groupedDietPlan).length > 0 ? (
            Object.entries(groupedDietPlan).map(([mealType, meals], idx) => (
              <div key={idx} className="meal-group">
                <h4>{mealType}</h4>
                <ul>
                  {meals.map((plan, i) => (
                    <li key={i}>
                      <strong>{plan.title}</strong><br />
                      <em>{plan.instructions}</em><br />
                      Calories: {plan.calories} kcal | Protein: {plan.protein_grams}g | Carbs: {plan.carb_grams}g | Fats: {plan.fat_grams}g
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

      {/* Actions */}
      <section className="dashboard-actions">
        <button className="dashboard-btn" onClick={() => navigate('/log')}>Log Activity</button>
        <button className="dashboard-btn secondary" onClick={() => navigate('/goals')}>Edit Goal</button>
      </section>

      {/* Quote */}
      <section className="quote-section">
        <blockquote>“It’s not about perfect. It’s about effort.”</blockquote>
      </section>
    </div>
  );
};

const getColor = (bmi) => {
  if (bmi < 18.5) return '#3498DB';
  if (bmi < 25) return '#2ECC71';
  if (bmi < 30) return '#F39C12';
  return '#E74C3C';
};

export default Dashboard;
