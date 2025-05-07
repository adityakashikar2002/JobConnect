import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import './JobDetails.css'; // Import CSS

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { jobs, companies, deleteJob, updateJob } = useJobs();
  const navigate = useNavigate();

  const job = jobs.find(j => j.id === id);
  const company = companies.find(c => c.id === job?.companyId);

  if (!job) {
    return <div className="job-details-not-found">Job not found</div>;
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
    <div className="job-details-container">
      <div className="job-header">
        <div>
          <h1 className="job-title">{job.title}</h1>
          <Link
            to={`/jobs/${job.id}/company`}
            className="company-name-link"
          >
            {company?.name || 'Unknown Company'}
          </Link>
        </div>
        <span className={`status-badge ${job.status}`}>
          {job.status}
        </span>
      </div>

      <div className="job-grid">
        <div className="job-details-section">
          <h2 className="section-title">Job Details</h2>
          <div className="details-list">
            <p><span className="detail-label">Location:</span> {job.location}</p>
            <p><span className="detail-label">Salary:</span> {job.salary}</p>
            <p><span className="detail-label">Type:</span> {job.type}</p>
            <p><span className="detail-label">Posted:</span> {job.postedDate}</p>
          </div>
        </div>

        <div className="job-requirements-section">
          <h2 className="section-title">Requirements</h2>
          <ul className="requirements-list">
            {job.requirements?.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="job-description-section">
        <h2 className="section-title">Description</h2>
        <p className="description-text">{job.description}</p>
      </div>

      {user?.type === 'company' && user.id === job.companyId && (
        <div className="job-actions">
          <Link
            to={`/jobs/${job.id}/edit`}
            className="edit-button"
          >
            Edit Job
          </Link>
          <button
            onClick={toggleStatus}
            className={`status-toggle-button ${job.status === 'active' ? 'active' : 'inactive'}`}
          >
            {job.status === 'active' ? 'Deactivate' : 'Activate'}
          </button>
          <button
            onClick={handleDelete}
            className="delete-button"
          >
            Delete Job
          </button>
        </div>
      )}
    </div>
  );
};

export default JobDetails;