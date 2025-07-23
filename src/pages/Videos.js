import React, { useEffect, useState } from 'react';
import './Videos.css';

const mockVideos = [
  {
    id: 1,
    title: 'Full Body Home Workout',
    embedUrl: 'https://www.youtube.com/embed/UItWltVZZmE',
    category: 'Workout',
    tags: ['full-body', 'no-equipment', 'home'],
  },
  {
    id: 2,
    title: 'Yoga for Flexibility',
    embedUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE',
    category: 'Yoga',
    tags: ['yoga', 'stretching', 'flexibility'],
  },
  {
    id: 3,
    title: 'HIIT Fat Burn 🔥',
    embedUrl: 'https://www.youtube.com/embed/ml6cT4AZdqI',
    category: 'HIIT',
    tags: ['hiit', 'fat-loss', 'intense'],
  },
];

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    // Replace with API call in future
    setVideos(mockVideos);
  }, []);

  const filtered = videos.filter(video =>
    (category === 'All' || video.category === category) &&
    video.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="videos-page">
      <h2>🎥 Fitness Videos</h2>

      {/* Filters */}
      <div className="video-filters">
        <input
          type="text"
          placeholder="Search videos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          <option>Workout</option>
          <option>Yoga</option>
          <option>HIIT</option>
        </select>
      </div>

      {/* Video Grid */}
      <div className="video-grid">
        {filtered.map(video => (
          <div key={video.id} className="video-card">
            <div className="video-embed">
              <iframe
                src={video.embedUrl}
                title={video.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-details">
              <h4>{video.title}</h4>
              <p className="category-label">{video.category}</p>
              <div className="video-tags">
                {video.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
              <button className="watch-later-btn">⏰ Watch Later</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="no-results">No videos match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default Videos;
