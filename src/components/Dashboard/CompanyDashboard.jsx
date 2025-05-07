// CompanyDashboard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import StatsCard from '../StatsCard';
import './Dashboard.css';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const { jobs, applications } = useJobs();

  // Filter jobs posted by this company
  const companyJobs = jobs.filter(job => job.companyId === user.id);

  // Calculate stats
  const postedJobs = companyJobs.length;
  const activeJobs = companyJobs.filter(job => job.status === 'active').length;
  const inactiveJobs = companyJobs.filter(job => job.status === 'inactive').length;
  const totalApplications = applications.filter(app =>
    companyJobs.some(job => job.id === app.jobId)
  ).length;

  const recentJobs = companyJobs.slice(0, 3);

  return (
    <div className="company-dashboard-container">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="dashboard-heading"
      >
        Welcome back, <span className="text-gradient">{user.name}</span>
      </motion.h1>
      
      <div className="stats-cards-container">
        <StatsCard
          title="Posted Jobs"
          value={postedJobs}
          icon="📋"
          color="primary"
        />
        <StatsCard
          title="Active Jobs"
          value={activeJobs}
          icon="✅"
          color="secondary"
        />
        <StatsCard
          title="Inactive Jobs"
          value={inactiveJobs}
          icon="⏸️"
          color="info"
        />
        <StatsCard
          title="Total Applications"
          value={totalApplications}
          icon="📩"
          color="warning"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="dashboard-section recent-postings-container"
      >
        <h2 className="section-heading">Recent Job Postings</h2>
        
        {recentJobs.length > 0 ? (
          <div className="postings-list">
            {recentJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
                className="posting-item"
              >
                <div className="job-info">
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-details">
                    {job.location} • {job.type}
                  </p>
                  <p className="post-date">
                    Posted on: <span>{job.postedDate}</span>
                  </p>
                </div>
                <span className={`status-badge ${job.status}`}>
                  {job.status}
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="no-postings-message"
          >
            You haven't posted any jobs yet.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default CompanyDashboard;