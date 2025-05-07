import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import './CompanyDetails.css'; // Import CSS

const CompanyDetails = () => {
  const { id } = useParams();
  const { companies, jobs } = useJobs();

  // If coming from job details, get companyId from job
  const job = jobs.find(j => j.id === id);
  const companyId = job ? job.companyId : id;
  const company = companies.find(c => c.id === companyId);

  if (!company) {
    return <div className="company-details-not-found">Company not found</div>;
  }

  // Get company's active jobs
  const companyJobs = jobs.filter(j =>
    j.companyId === company.id && j.status === 'active'
  );

  return (
    <div className="company-details-container">
      <div className="company-header">
        <img
          src={company.logo || 'https://via.placeholder.com/150'}
          alt={company.name}
          className="company-logo"
        />
        <div className="company-info">
          <h1 className="company-name">{company.name}</h1>
          <p className="company-industry">{company.industry}</p>
        </div>
      </div>

      <div className="company-grid">
        <div className="company-details-section">
          <h2 className="section-title">Company Details</h2>
          <div className="details-list">
            <p><span className="detail-label">Email:</span> {company.email}</p>
            <p><span className="detail-label">Founded:</span> {company.foundedYear || 'N/A'}</p>
            <p><span className="detail-label">Employees:</span> {company.employees || 'N/A'}</p>
            <p><span className="detail-label">Website:</span>
              {company.website ? (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-website-link"
                >
                  {company.website}
                </a>
              ) : ' N/A'}
            </p>
            <p><span className="detail-label">Address:</span> {company.address || 'N/A'}</p>
          </div>
        </div>

        <div className="company-about-section">
          <h2 className="section-title">About</h2>
          <p className="company-description">{company.description || 'No description available.'}</p>
        </div>
      </div>

      <div className="company-jobs-section">
        <h2 className="section-title">Active Job Postings ({companyJobs.length})</h2>
        {companyJobs.length > 0 ? (
          <div className="jobs-list">
            {companyJobs.map(job => (
              <div key={job.id} className="job-item">
                <h3 className="job-title">{job.title}</h3>
                <p className="job-location">{job.location} • {job.type}</p>
                <p className="job-salary">{job.salary}</p>
                <Link to={`/jobs/${job.id}`} className="job-details-link">View Details</Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-jobs-message">This company has no active job postings.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyDetails;