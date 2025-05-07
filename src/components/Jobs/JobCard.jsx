// JobCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { motion } from 'framer-motion';
import './JobCard.css';

const JobCard = ({ job }) => {
  const { user } = useAuth();
  const { companies, applications, applyForJob } = useJobs();

  const company = companies.find(c => c.id === job.companyId);
  const hasApplied = applications.some(app =>
    app.jobId === job.id && app.applicantId === user?.id
  );

  const handleApply = (e) => {
    e.stopPropagation();
    if (user?.type !== 'applicant') return;

    const newApplication = {
      id: Date.now().toString(),
      jobId: job.id,
      applicantId: user.id,
      applicationDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    applyForJob(newApplication);
    createConfetti();
  };

  const createConfetti = () => {
    const colors = ['#6c5ce7', '#fd79a8', '#00cec9', '#fdcb6e', '#a29bfe'];

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.top = '-10px';
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
  };

  return (
    <motion.div 
      className="job-card"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="job-card-header">
        <span className={`job-status ${job.status}`}>
          {job.status}
        </span>
        
        <div className="company-info">
          <img
            src={company?.logo || 'https://via.placeholder.com/50'}
            alt={company?.name}
            className="company-logo-job-card"
          />
          <div>
            <Link 
              to={`/jobs/${job.id}/company`} 
              className="company-name"
              onClick={(e) => e.stopPropagation()}
            >
              {company?.name || 'Unknown Company'}
            </Link>
            <p className="job-posted">Posted: {job.postedDate}</p>
          </div>
        </div>
      </div>

      <Link to={`/jobs/${job.id}`} className="job-content">
        <h3 className="job-title">{job.title}</h3>
        
        <div className="job-meta">
          <span className="job-location">{job.location}</span>
          <span className="job-type">{job.type}</span>
          <span className="job-salary">{job.salary}</span>
        </div>
        
        <p className="job-description">
          {job.description.length > 150 
            ? `${job.description.substring(0, 150)}...` 
            : job.description}
        </p>
        
        <div className="job-skills">
          {job.requirements?.slice(0, 3).map((req, index) => (
            <span key={index} className="skill-tag">{req}</span>
          ))}
          {job.requirements?.length > 3 && (
            <span className="more-skills">+{job.requirements.length - 3} more</span>
          )}
        </div>
      </Link>

      <div className="job-actions">
        {user?.type === 'company' && user.id === job.companyId ? (
          <Link
            to={`/jobs/${job.id}`}
            className="manage-btn"
          >
            Manage
          </Link>
        ) : user?.type === 'applicant' ? (
          <motion.button
            onClick={handleApply}
            disabled={hasApplied}
            className={`apply-btn ${hasApplied ? 'applied' : ''}`}
            whileHover={!hasApplied ? { scale: 1.05 } : {}}
            whileTap={!hasApplied ? { scale: 0.95 } : {}}
          >
            {hasApplied ? 'Applied' : 'Apply Now'}
          </motion.button>
        ) : null}
      </div>
    </motion.div>
  );
};

export default JobCard;