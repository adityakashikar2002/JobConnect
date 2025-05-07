// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useJobs } from '../../context/JobContext';
// import './CompanyDetails.css'; // Import CSS

// const CompanyDetails = () => {
//   const { id } = useParams();
//   const { companies, jobs } = useJobs();

//   // If coming from job details, get companyId from job
//   const job = jobs.find(j => j.id === id);
//   const companyId = job ? job.companyId : id;
//   const company = companies.find(c => c.id === companyId);

//   if (!company) {
//     return <div className="company-details-not-found">Company not found</div>;
//   }

//   // Get company's active jobs
//   const companyJobs = jobs.filter(j =>
//     j.companyId === company.id && j.status === 'active'
//   );

//   return (
//     <div className="company-details-container">
//       <div className="company-header">
//         <img
//           src={company.logo || 'https://via.placeholder.com/150'}
//           alt={company.name}
//           className="company-logo"
//         />
//         <div className="company-info">
//           <h1 className="company-name">{company.name}</h1>
//           <p className="company-industry">{company.industry}</p>
//         </div>
//       </div>

//       <div className="company-grid">
//         <div className="company-details-section">
//           <h2 className="section-title">Company Details</h2>
//           <div className="details-list">
//             <p><span className="detail-label">Email:</span> {company.email}</p>
//             <p><span className="detail-label">Founded:</span> {company.foundedYear || 'N/A'}</p>
//             <p><span className="detail-label">Employees:</span> {company.employees || 'N/A'}</p>
//             <p><span className="detail-label">Website:</span>
//               {company.website ? (
//                 <a
//                   href={company.website}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="company-website-link"
//                 >
//                   {company.website}
//                 </a>
//               ) : ' N/A'}
//             </p>
//             <p><span className="detail-label">Address:</span> {company.address || 'N/A'}</p>
//           </div>
//         </div>

//         <div className="company-about-section">
//           <h2 className="section-title">About</h2>
//           <p className="company-description">{company.description || 'No description available.'}</p>
//         </div>
//       </div>

//       <div className="company-jobs-section">
//         <h2 className="section-title">Active Job Postings ({companyJobs.length})</h2>
//         {companyJobs.length > 0 ? (
//           <div className="jobs-list">
//             {companyJobs.map(job => (
//               <div key={job.id} className="job-item">
//                 <h3 className="job-title">{job.title}</h3>
//                 <p className="job-location">{job.location} • {job.type}</p>
//                 <p className="job-salary">{job.salary}</p>
//                 <Link to={`/jobs/${job.id}`} className="job-details-link">View Details</Link>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="no-jobs-message">This company has no active job postings.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompanyDetails;


import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useJobs } from '../../context/JobContext';
import { motion } from 'framer-motion';
import './CompanyDetails.css';

const CompanyDetails = () => {
  const { id } = useParams();
  const { jobs, companies } = useJobs();

  // If coming from job details, get companyId from job
  const job = jobs.find(j => j.id === id);
  const companyId = job ? job.companyId : id;
  const company = companies.find(c => c.id === companyId);

  if (!company) {
    return (
      <motion.div 
        className="company-not-found"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Company not found</h2>
        <p>The company you're looking for doesn't exist or has been removed.</p>
        <Link to="/jobs" className="back-link">Back to Jobs</Link>
      </motion.div>
    );
  }

  // Get company's active jobs
  const companyJobs = jobs.filter(j =>
    j.companyId === company.id && j.status === 'active'
  );

  return (
    <motion.div 
      className="company-details-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="company-header"
        whileHover={{ y: -5 }}
      >
        <div className="logo-container">
          <img
            src={company.logo || 'https://via.placeholder.com/150'}
            alt={company.name}
            className="company-logo"
          />
        </div>
        <div className="company-info">
          <h1 className="company-name">{company.name}</h1>
          <p className="company-industry">{company.industry}</p>
        </div>
      </motion.div>

      <div className="company-grid">
        <motion.div 
          className="company-details-section"
          whileHover={{ y: -5 }}
        >
          <h2 className="section-title">Company Details</h2>
          <div className="details-list">
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{company.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Founded:</span>
              <span className="detail-value">{company.foundedYear || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Employees:</span>
              <span className="detail-value">{company.employees || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Website:</span>
              {company.website ? (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-link"
                >
                  {company.website}
                </a>
              ) : (
                <span className="detail-value">N/A</span>
              )}
            </div>
            <div className="detail-item">
              <span className="detail-label">Address:</span>
              <span className="detail-value">{company.address || 'N/A'}</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="company-about-section"
          whileHover={{ y: -5 }}
        >
          <h2 className="section-title">About</h2>
          <p className="company-description">
            {company.description || 'No description available.'}
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="company-jobs-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="section-title">Active Job Postings ({companyJobs.length})</h2>
        {companyJobs.length > 0 ? (
          <div className="jobs-list">
            {companyJobs.map((job, index) => (
              <motion.div
                key={job.id}
                className="job-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="job-title">{job.title}</h3>
                <p className="job-meta">
                  <span className="job-location">{job.location}</span> • 
                  <span className="job-type">{job.type}</span>
                </p>
                <p className="job-salary">{job.salary}</p>
                <Link to={`/jobs/${job.id}`} className="job-link">View Details</Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="no-jobs-message">This company has no active job postings.</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CompanyDetails;