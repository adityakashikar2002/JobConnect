// import React from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { useJobs } from '../../context/JobContext';
// import './JobDetails.css'; // Import CSS

// const JobDetails = () => {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const { jobs, companies, deleteJob, updateJob } = useJobs();
//   const navigate = useNavigate();

//   const job = jobs.find(j => j.id === id);
//   const company = companies.find(c => c.id === job?.companyId);

//   if (!job) {
//     return <div className="job-details-not-found">Job not found</div>;
//   }

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this job?')) {
//       deleteJob(job.id);
//       navigate('/jobs');
//     }
//   };

//   const toggleStatus = () => {
//     const updatedJob = {
//       ...job,
//       status: job.status === 'active' ? 'inactive' : 'active'
//     };
//     updateJob(updatedJob);
//   };

//   return (
//     <div className="job-details-container">
//       <div className="job-header">
//         <div>
//           <h1 className="job-title">{job.title}</h1>
//           <Link
//             to={`/jobs/${job.id}/company`}
//             className="company-name-link"
//           >
//             {company?.name || 'Unknown Company'}
//           </Link>
//         </div>
//         <span className={`status-badge ${job.status}`}>
//           {job.status}
//         </span>
//       </div>

//       <div className="job-grid">
//         <div className="job-details-section">
//           <h2 className="section-title">Job Details</h2>
//           <div className="details-list">
//             <p><span className="detail-label">Location:</span> {job.location}</p>
//             <p><span className="detail-label">Salary:</span> {job.salary}</p>
//             <p><span className="detail-label">Type:</span> {job.type}</p>
//             <p><span className="detail-label">Posted:</span> {job.postedDate}</p>
//           </div>
//         </div>

//         <div className="job-requirements-section">
//           <h2 className="section-title">Requirements</h2>
//           <ul className="requirements-list">
//             {job.requirements?.map((req, index) => (
//               <li key={index}>{req}</li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div className="job-description-section">
//         <h2 className="section-title">Description</h2>
//         <p className="description-text">{job.description}</p>
//       </div>

//       {user?.type === 'company' && user.id === job.companyId && (
//         <div className="job-actions">
//           <Link
//             to={`/jobs/${job.id}/edit`}
//             className="edit-button"
//           >
//             Edit Job
//           </Link>
//           <button
//             onClick={toggleStatus}
//             className={`status-toggle-button ${job.status === 'active' ? 'active' : 'inactive'}`}
//           >
//             {job.status === 'active' ? 'Deactivate' : 'Activate'}
//           </button>
//           <button
//             onClick={handleDelete}
//             className="delete-button"
//           >
//             Delete Job
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobDetails;


import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { motion } from 'framer-motion';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { jobs, companies, deleteJob, updateJob } = useJobs();
  const navigate = useNavigate();

  const job = jobs.find(j => j.id === id);
  const company = companies.find(c => c.id === job?.companyId);

  if (!job) {
    return (
      <motion.div 
        className="job-not-found"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Job not found</h2>
        <p>The job you're looking for doesn't exist or has been removed.</p>
        <Link to="/jobs" className="back-link">Back to Jobs</Link>
      </motion.div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      deleteJob(job.id);
      navigate('/jobs');
    }
  };

  const toggleStatus = () => {
    const updatedJob = {
      ...job,
      status: job.status === 'active' ? 'inactive' : 'active'
    };
    updateJob(updatedJob);
  };

  return (
    <motion.div 
      className="job-details-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="job-header">
        <div>
          <h1 className="job-title">{job.title}</h1>
          <Link
            to={`/jobs/${job.id}/company`}
            className="company-link"
          >
            {company?.name || 'Unknown Company'}
          </Link>
        </div>
        <span className={`job-status ${job.status}`}>
          {job.status}
        </span>
      </div>

      <div className="job-grid">
        <motion.div 
          className="job-details-section"
          whileHover={{ y: -5 }}
        >
          <h2 className="section-title">Job Details</h2>
          <div className="details-list">
            <div className="detail-item">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{job.location}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Salary:</span>
              <span className="detail-value">{job.salary}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Type:</span>
              <span className="detail-value">{job.type}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Posted:</span>
              <span className="detail-value">{job.postedDate}</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="job-requirements-section"
          whileHover={{ y: -5 }}
        >
          <h2 className="section-title">Requirements</h2>
          <ul className="requirements-list">
            {job.requirements?.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div 
        className="job-description-section"
        whileHover={{ y: -5 }}
      >
        <h2 className="section-title">Description</h2>
        <p className="description-text">{job.description}</p>
      </motion.div>

      {user?.type === 'company' && user.id === job.companyId && (
        <motion.div 
          className="job-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/jobs/${job.id}/edit`)}
            className="edit-button"
          >
            Edit Job
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleStatus}
            className={`status-button ${job.status === 'active' ? 'deactivate' : 'activate'}`}
          >
            {job.status === 'active' ? 'Deactivate' : 'Activate'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="delete-button"
          >
            Delete Job
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default JobDetails;