import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import heroImage from '../assets/hero.jpg';

const Home = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <h1 className="logo">FitTrack</h1>
        <nav className="nav-links">
          <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/signup" className="btn signup-btn">Sign Up</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section
  className="hero"
  style={{
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="hero-overlay">
    <h2>Start your fitness journey today</h2>
    <p>Track your workouts, set goals, and unlock your full potential.</p>
    <Link to="/signup" className="hero-cta-btn">Get Started</Link>
  </div>
</section>


      {/* Feature Cards */}
      <section className="features">
        <h3>Core Features</h3>
        <div className="feature-cards">
          <div className="card">
            <span role="img" aria-label="activity">📋</span>
            <h4>Log Activities</h4>
            <p>Quickly log your workouts and keep a record of your journey.</p>
          </div>
          <div className="card">
            <span role="img" aria-label="goal">🎯</span>
            <h4>Track Goals</h4>
            <p>Set weekly targets and measure your progress with visuals.</p>
          </div>
          <div className="card">
            <span role="img" aria-label="badge">🏆</span>
            <h4>Earn Badges</h4>
            <p>Get rewarded as you hit milestones and build healthy habits.</p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works">
        <h3>How It Works</h3>
        <div className="steps">
          <div className="step">
            <span role="img" aria-label="signup">📝</span>
            <p>Create your free account</p>
          </div>
          <div className="step">
            <span role="img" aria-label="select">⚙️</span>
            <p>Set your fitness preferences</p>
          </div>
          <div className="step">
            <span role="img" aria-label="track">📈</span>
            <p>Log workouts and track results</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h3>What Our Users Say</h3>
        <blockquote>“FitTrack helped me stay consistent and motivated. I love it!” – Areeba, London</blockquote>
        <blockquote>“The badges are super fun. I unlocked 10 in my first month!” – Haris, Manchester</blockquote>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Register</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
        <p>© 2025 FitTrack. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
