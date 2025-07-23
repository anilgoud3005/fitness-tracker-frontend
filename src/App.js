import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Core pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Onboarding
import Step1 from './pages/Onboarding/Step1';
import Step2 from './pages/Onboarding/Step2';
import Step3 from './pages/Onboarding/Step3';
import Step4 from './pages/Onboarding/Step4';

// App pages
import Dashboard from './pages/Dashboard';
import LogActivity from './pages/LogActivity';
import Goals from './pages/Goals';
import ActivityHistory from './pages/ActivityHistory';
import Achievements from './pages/Achievements';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Optional: Layout wrapper with sidebar/footer if needed
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import PrivateRoute from './routes/PrivateRoute';

import Blogs from './pages/Blogs';
import Videos from './pages/Videos';


function App() {
  return (
    <Router>
      <Routes>

        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Onboarding steps */}
        <Route path="/onboarding/step-1" element={<Step1 />} />
        <Route path="/onboarding/step-2" element={<Step2 />} />
        <Route path="/onboarding/step-3" element={<Step3 />} />
        <Route path="/onboarding/step-4" element={<Step4 />} />

        {/* Main app (with sidebar/header/footer) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <>
                <Header />
                <Sidebar />
                <Dashboard />
                <Footer />
              </>
            </PrivateRoute>

          }
        />
        <Route
          path="/log"
          element={
            <PrivateRoute>
              <>
                <Header />
                <Sidebar />
                <LogActivity />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/goals"
          element={
            <PrivateRoute>
              <>
                <Header />
                <Sidebar />
                <Goals />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <>
                <Header />
                <Sidebar />
                <ActivityHistory />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/achievements"
          element={
            <PrivateRoute>
              <>
                <Header />
                <Sidebar />
                <Achievements />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <>
                <Header />
                <Sidebar />
                <Profile />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <PrivateRoute>
              <>
                <Header />
                <Sidebar />
                <Blogs />
                <Footer />
              </>
            </PrivateRoute>
          }
        />

        <Route
          path="/videos"
          element={
            <PrivateRoute>
              <>
                <Header />
                <Sidebar />
                <Videos />
                <Footer />
              </>
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <>
                <Header />
                <Sidebar />
                <Settings />
                <Footer />
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
