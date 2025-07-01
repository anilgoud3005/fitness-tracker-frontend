import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [contrast, setContrast] = useState('normal');

  return (
    <div className="settings-page">
      <h2>Settings</h2>

      {/* Notifications */}
      <section className="settings-section">
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          Enable Reminder Notifications
        </label>
      </section>

      {/* Accessibility */}
      <section className="settings-section">
        <h4>Accessibility</h4>

        <label>
          Font Size:
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>

        <label>
          Contrast:
          <select
            value={contrast}
            onChange={(e) => setContrast(e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="high">High Contrast</option>
          </select>
        </label>
      </section>

      {/* Dark Mode */}
      <section className="settings-section">
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Enable Dark Mode
        </label>
      </section>

      {/* Export & Delete */}
      <section className="settings-section">
        <button className="settings-btn export">Export Data (CSV)</button>
        <button className="settings-btn delete">Delete Account</button>
      </section>
    </div>
  );
};

export default Settings;
