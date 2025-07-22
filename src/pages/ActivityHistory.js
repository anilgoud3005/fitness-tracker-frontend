import React, { useState, useEffect, useContext } from 'react';
import './ActivityHistory.css';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ActivityHistory = () => {
  const { user, token } = useContext(AuthContext);
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('All');

  // Fetch activities
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/activity/user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLogs(res.data);
      } catch (err) {
        console.error('Error fetching activities:', err.response?.data || err.message);
      }
    };

    if (user?.id) fetchLogs();
  }, [user, token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this activity?')) return;

    try {
      await axios.delete(`http://localhost:5050/api/activity/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLogs(logs.filter(log => log.id !== id));
    } catch (err) {
      console.error('Delete failed:', err.response?.data || err.message);
    }
  };

  const filteredLogs = filter === 'All' ? logs : logs.filter(log => log.activity_type === filter);

  const activityTypes = [...new Set(logs.map(log => log.activity_type))];

  return (
    <div className="history-page">
      <h2>Activity History</h2>

      {/* Filters */}
      <div className="filter-bar">
        <label>Filter by Type:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          {activityTypes.map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Log Cards */}
      <div className="log-list">
        {filteredLogs.map(log => (
          <div className="log-card" key={log.id}>
            <h4>{log.activity_type}</h4>
            <p><strong>Duration:</strong> {log.duration_minutes} min</p>
            <p><strong>Date:</strong> {new Date(log.created_at).toLocaleDateString()}</p>
            <div className="log-actions">
              {/* Optional: add edit later */}
              <button className="delete-btn" onClick={() => handleDelete(log.id)}>Delete</button>
            </div>
          </div>
        ))}
        {filteredLogs.length === 0 && (
          <p className="no-results">No activities found for this filter.</p>
        )}
      </div>
    </div>
  );
};

export default ActivityHistory;
