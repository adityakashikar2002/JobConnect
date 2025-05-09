// ApplicantDashboard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import StatsCard from '../StatsCard';
import './Dashboard.css';
import { Link, useNavigate } from 'react-router-dom';


const ApplicantDashboard = () => {
  const { user } = useAuth();
  const { jobs, applications } = useJobs();
  const navigate = useNavigate();

  // Calculate stats
  const appliedJobs = applications.filter(app => app.applicantId === user.id).length;
  const activeJobs = jobs.filter(job => job.status === 'active').length;
  const inactiveJobs = jobs.filter(job => job.status === 'inactive').length;
  const companies = JSON.parse(localStorage.getItem('jobPortalCompanies')) || [];

  const recentApplications = applications
  .filter(app => app.applicantId === user.id)
  .slice(0, 3)
  .map(app => {
    const job = jobs.find(j => j.id === app.jobId);
    const company = companies.find(c => c.id === job?.companyId);
    return { 
      ...app, 
      jobTitle: job?.title || 'Job not found',
      company: company?.name || 'Unknown',
      location: job?.location || 'Remote'
    };
  });


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="dashboard-container applicant">
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
        <motion.div variants={itemVariants}>
          <h1 className="dashboard-heading">
            Welcome back, <span className="text-gradient">{user.name}</span>
          </h1>
          <p className="dashboard-subtitle">Here's your job search overview</p>
        </motion.div>
        
        <motion.div 
          className="stats-cards-container"
          variants={itemVariants}
        >
          <StatsCard
            title="Jobs Applied"
            value={appliedJobs}
            icon="📄"
            color="primary"
            delay={0.1}
          />
          <StatsCard
            title="Active Jobs"
            value={activeJobs}
            icon="✅"
            color="secondary"
            delay={0.2}
          />
          <StatsCard
            title="Inactive Jobs"
            value={inactiveJobs}
            icon="⏸️"
            color="tertiary"
            delay={0.3}
          />
        </motion.div>

        <motion.div 
          className="dashboard-section recent-applications"
          variants={itemVariants}
        >
          <div className="section-header">
            <h2 className="section-heading">Recent Applications</h2>
            {/* <button className="view-all-btn">View All</button> */}
          </div>
          
          {recentApplications.length > 0 ? (
            <div className="applications-grid">
              {recentApplications.map((app, index) => (
                <motion.div
                  key={app.id}
                  className="application-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="card-header">
                    <h3 className="job-title">{app.jobTitle}</h3>
                    <span className={`status-badge ${app.status}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="card-body">
                    <div className="company-info">
                      <span className="company">{app.company}</span>
                      <span className="location">{app.location}</span>
                    </div>
                    <div className="application-date">
                      Applied on: <span>{app.applicationDate}</span>
                    </div>
                  </div>
                  <div className="card-footer">
                    <Link to={`/jobs/${app.jobId}`} className="job-link">View Details</Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="empty-icon">🔍</div>
              <h3>No Applications Yet</h3>
              <p>Start applying to jobs to see them appear here</p>
              <button className="primary-btn" onClick={() => navigate('/jobs')}>Browse Jobs</button>
            </motion.div>
          )}
        </motion.div>

      </motion.div>
    </div>
  );
};

export default ApplicantDashboard;