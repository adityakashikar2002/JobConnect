// ApplicantDashboard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import StatsCard from '../StatsCard';
import './Dashboard.css';

const ApplicantDashboard = () => {
  const { user } = useAuth();
  const { jobs, applications } = useJobs();

  // Calculate stats
  const appliedJobs = applications.filter(app => app.applicantId === user.id).length;
  const activeJobs = jobs.filter(job => job.status === 'active').length;
  const inactiveJobs = jobs.filter(job => job.status === 'inactive').length;

  const recentApplications = applications
    .filter(app => app.applicantId === user.id)
    .slice(0, 3)
    .map(app => {
      const job = jobs.find(j => j.id === app.jobId);
      return { ...app, jobTitle: job?.title || 'Job not found' };
    });

  return (
    <div className="applicant-dashboard-container">
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
          title="Jobs Applied"
          value={appliedJobs}
          icon="📄"
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
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="dashboard-section recent-applications-container"
      >
        <h2 className="section-heading">Recent Applications</h2>
        
        {recentApplications.length > 0 ? (
          <div className="applications-list">
            {recentApplications.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
                className="application-item"
              >
                <div className="application-content">
                  <h3 className="job-title">{app.jobTitle}</h3>
                  <p className="application-date">
                    Applied on: <span>{app.applicationDate}</span>
                  </p>
                </div>
                <span className={`status-badge ${app.status}`}>
                  {app.status}
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="no-applications-message"
          >
            You haven't applied to any jobs yet.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default ApplicantDashboard;