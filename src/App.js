//App.js
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import JobsPage from './pages/JobsPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import { initializeMockData } from './utils/storage';
import PrivateRoute from './components/Auth/PrivateRoute';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';

const AnimationWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <AnimationWrapper>
            <Home />
          </AnimationWrapper>
        } />
        <Route path="/register" element={
          <AnimationWrapper>
            <Home />
          </AnimationWrapper>
        } />
        <Route path="/dashboard/*" element={
          <PrivateRoute>
            <AnimationWrapper>
              <DashboardPage />
            </AnimationWrapper>
          </PrivateRoute>
        } />
        <Route path="/jobs/*" element={
          <PrivateRoute>
            <AnimationWrapper>
              <JobsPage />
            </AnimationWrapper>
          </PrivateRoute>
        } />
        <Route path="/profile/*" element={
          <PrivateRoute>
            <AnimationWrapper>
              <ProfilePage />
            </AnimationWrapper>
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  initializeMockData();

  return (
    <Router>
      <AuthProvider>
        <JobProvider>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <AnimatedRoutes />
            </main>
          </div>
        </JobProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;