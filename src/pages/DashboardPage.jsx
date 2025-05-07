// DashboardPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import ApplicantDashboard from '../components/Dashboard/ApplicantDashboard';
import CompanyDashboard from '../components/Dashboard/CompanyDashboard';
import { motion } from 'framer-motion';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-blur"></div>
      </div>

      <motion.div 
        className="dashboard-content"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {user?.type === 'applicant' ? (
          <ApplicantDashboard />
        ) : (
          <CompanyDashboard />
        )}
      </motion.div>
    </div>
  );
};

export default DashboardPage;