// JobsPage.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import JobsList from '../components/Jobs/JobsList';
import JobDetails from '../components/Jobs/JobDetails';
import JobForm from '../components/Jobs/JobForm';
import CompanyDetails from '../components/Jobs/CompanyDetails';
import './JobsPage.css';

const JobsPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="jobs-page-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="jobs-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-blur"></div>
      </div>

      <div className="jobs-content">
        <Routes>
          <Route path="/" element={<JobsList />} />
          <Route path="/new" element={<JobForm />} />
          <Route path="/:id" element={<JobDetails />} />
          <Route path="/:id/edit" element={<JobForm />} />
          <Route path="/:id/company" element={<CompanyDetails />} />
        </Routes>
      </div>
    </motion.div>
  );
};

export default JobsPage;