import React, { useState } from 'react';
import './ActivityHistory.css';

const mockLogs = [
  { id: 1, type: 'Running', duration: '30 min', date: '2025-06-22' },
  { id: 2, type: 'Gym', duration: '45 min', date: '2025-06-21' },
  { id: 3, type: 'Cycling', duration: '25 min', date: '2025-06-20' },
];

const ActivityHistory = () => {
  const [filter, setFilter] = useState('All');

  const filteredLogs = filter === 'All'
    ? mockLogs
    : mockLogs.filter(log => log.type === filter);

  return (
    <div className="history-page">
      <h2>Activity History</h2>

      {/* Filters */}
      <div className="filter-bar">
        <label>Filter by Type:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Running">Running</option>
          <option value="Gym">Gym</option>
          <option value="Cycling">Cycling</option>
        </select>
      </div>

      {/* Log Cards */}
      <div className="log-list">
        {filteredLogs.map(log => (
          <div className="log-card" key={log.id}>
            <h4>{log.type}</h4>
            <p><strong>Duration:</strong> {log.duration}</p>
            <p><strong>Date:</strong> {log.date}</p>
            <div className="log-actions">
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
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
