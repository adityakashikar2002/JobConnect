// CompanyDashboard.jsx
import React from 'react';
import {Link} from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../StatsCard';
import './Dashboard.css';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const { jobs, applications } = useJobs();
  const navigate = useNavigate();

  // Filter jobs posted by this company
  const companyJobs = jobs.filter(job => job.companyId === user.id);

  // Calculate stats
  const postedJobs = companyJobs.length;
  const activeJobs = companyJobs.filter(job => job.status === 'active').length;
  const inactiveJobs = companyJobs.filter(job => job.status === 'inactive').length;
  const totalApplications = applications.filter(app =>
    companyJobs.some(job => job.id === app.jobId)
  ).length;

  const recentJobs = companyJobs.slice(0, 3).map(job => ({
    ...job,
    applications: applications.filter(app => app.jobId === job.id).length
  }));

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
    <div className="dashboard-container company">
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
          <p className="dashboard-subtitle">Your company dashboard overview</p>
        </motion.div>
        
        <motion.div 
          className="stats-cards-container"
          variants={itemVariants}
        >
          <StatsCard
            title="Posted Jobs"
            value={postedJobs}
            icon="📋"
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
          <StatsCard
            title="Total Applications"
            value={totalApplications}
            icon="📩"
            color="quaternary"
            delay={0.4}
          />
        </motion.div>

        <motion.div 
          className="dashboard-section recent-postings"
          variants={itemVariants}
        >
          <div className="section-header">
            <h2 className="section-heading">Recent Job Postings</h2>
            {/* <button className="view-all-btn">View All</button> */}
          </div>
          
          {recentJobs.length > 0 ? (
            <div className="postings-grid">
              {recentJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  className="posting-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="card-header">
                    <h3 className="job-title">{job.title}</h3>
                    <span className={`status-badge ${job.status}`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="card-body">
                    <div className="job-meta">
                      <span className="job-type">{job.type}</span>
                      <span className="job-location">{job.location}</span>
                      <span className="applications">{job.applications} Applications</span>
                    </div>
                    <div className="post-date">
                      Posted on: <span>{job.postedDate}</span>
                    </div>
                  </div>
                  <div className="card-footer">
                    <Link to={`/jobs/${job.id}`} className="job-link">View</Link>
                    <Link to={`/jobs/${job.id}/edit`} className="job-link">Edit Posting</Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="empty-icon">💼</div>
              <h3>No Job Postings Yet</h3>
              <p>Create your first job posting to attract talent</p>
              <button className="primary-btn" onClick={() => navigate('/jobs/new')}>Post a Job</button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CompanyDashboard;