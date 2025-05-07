// DashboardPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import ApplicantDashboard from '../components/Dashboard/ApplicantDashboard';
import CompanyDashboard from '../components/Dashboard/CompanyDashboard';
import { motion } from 'framer-motion';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <motion.div 
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {user?.type === 'applicant' ? (
        <ApplicantDashboard />
      ) : (
        <CompanyDashboard />
      )}
    </motion.div>
  );
};

export default DashboardPage;