import React, { useEffect, useState } from 'react';
import './Blogs.css';

const mockBlogs = [
  {
    id: 1,
    title: '10 Ways to Boost Your Fitness',
    author: 'FitCoach',
    date: '2025-07-01',
    category: 'Training',
    content: `Discover simple strategies to improve your stamina, strength, and overall health. This blog covers warm-ups, dynamic routines, progressive overload, and tracking tips for beginners and pros alike.`,
  },
  {
    id: 2,
    title: 'Eating for Energy: Nutrition Tips',
    author: 'NutritionPro',
    date: '2025-06-28',
    category: 'Nutrition',
    content: `Learn how your diet can help maintain energy levels throughout your workouts. We talk about carbs, protein timing, hydration, and micronutrient balance.`,
  },
  {
    id: 3,
    title: 'How Sleep Affects Your Recovery',
    author: 'Dr. Wellness',
    date: '2025-06-24',
    category: 'Recovery',
    content: `You grow stronger when you rest—not when you train. Discover why sleep is essential for performance, and how to optimize it for max results.`,
  },
];

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    // Replace with real API call if needed
    setBlogs(mockBlogs);
  }, []);

  const filtered = blogs.filter(blog => {
    return (
      (category === 'All' || blog.category === category) &&
      blog.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="blogs-page">
      <h2>📚 Fitness Blogs</h2>

      {/* Filters */}
      <div className="blog-filters">
        <input
          type="text"
          placeholder="Search blog titles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          <option>Training</option>
          <option>Nutrition</option>
          <option>Recovery</option>
        </select>
      </div>

      {/* Blog Cards */}
      <div className="blog-list">
        {filtered.length > 0 ? (
          filtered.map(blog => (
            <div key={blog.id} className="blog-card">
              <h3>{blog.title}</h3>
              <p className="blog-meta">By {blog.author} on {new Date(blog.date).toLocaleDateString()} · {blog.category}</p>
              <p className="blog-snippet">
                {expanded === blog.id
                  ? blog.content
                  : `${blog.content.slice(0, 100)}...`
                }
              </p>
              <button className="read-btn" onClick={() => setExpanded(expanded === blog.id ? null : blog.id)}>
                {expanded === blog.id ? 'Read Less ▲' : 'Read More ▼'}
              </button>
            </div>
          ))
        ) : (
          <p className="no-results">No blogs match your search/filter.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
