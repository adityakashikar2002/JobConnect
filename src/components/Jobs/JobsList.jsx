// import React from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useJobs } from '../../context/JobContext';
// import JobCard from './JobCard';
// import { Link } from 'react-router-dom';
// import './JobsList.css'; // Import CSS

// const JobsList = () => {
//   const { user } = useAuth();
//   const { jobs } = useJobs();

//   // Filter jobs based on user type
//   let filteredJobs = [];
//   if (user?.type === 'company') {
//     filteredJobs = jobs.filter(job => job.companyId === user.id);
//   } else {
//     filteredJobs = jobs.filter(job => job.status === 'active');
//   }

//   return (
//     <div className="jobs-list-container">
//       <div className="list-header">
//         <h1 className="list-title">
//           {user?.type === 'company' ? 'Your Job Postings' : 'Available Jobs'}
//         </h1>
//         {user?.type === 'company' && (
//           <Link to="/jobs/new" className="post-job-button">
//             Post New Job
//           </Link>
//         )}
//       </div>

//       {filteredJobs.length > 0 ? (
//         <div className="job-grid">
//           {filteredJobs.map(job => (
//             <JobCard key={job.id} job={job} />
//           ))}
//         </div>
//       ) : (
//         <div className="empty-list-message">
//           <p className="message-text">
//             {user?.type === 'company'
//               ? 'You have not posted any jobs yet.'
//               : 'No available jobs at the moment.'}
//           </p>
//           {user?.type === 'company' && (
//             <Link to="/jobs/new" className="post-job-button primary">
//               Post Your First Job
//             </Link>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobsList;



// JobsList.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import JobCard from './JobCard';
import { Link } from 'react-router-dom';
import './JobsList.css';

const JobsList = () => {
  const { user } = useAuth();
  const { jobs, companies } = useJobs();
  
  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [salaryRangeFilter, setSalaryRangeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('active');
  const [companyNameFilter, setCompanyNameFilter] = useState('');

  // Get unique values for filter options
  const jobTypes = [...new Set(jobs.map(job => job.type))];
  const locations = [...new Set(jobs.map(job => job.location))];
  const companyNames = [...new Set(companies.map(company => company.name))];

  // Filter jobs based on all criteria
  const filteredJobs = jobs.filter(job => {
    const company = companies.find(c => c.id === job.companyId);
    
    // Search term matches title or company name
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (company && company.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Location filter
    const matchesLocation = locationFilter === '' || 
      job.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    // Job type filter
    const matchesJobType = jobTypeFilter === '' || 
      job.type === jobTypeFilter;
    
    // Salary range filter
    const matchesSalary = salaryRangeFilter === '' || 
      (() => {
        const salary = job.salary;
        if (!salary) return false;
        
        const numbers = salary.match(/\d+/g);
        if (!numbers || numbers.length < 2) return false;
        
        const minSalary = parseInt(numbers[0]);
        const maxSalary = parseInt(numbers[1]);
        
        switch(salaryRangeFilter) {
          case '0-50000':
            return maxSalary <= 50000;
          case '50000-100000':
            return minSalary >= 50000 && maxSalary <= 100000;
          case '100000+':
            return minSalary >= 100000;
          default:
            return true;
        }
      })();
    
    // Status filter
    const matchesStatus = statusFilter === '' || 
      job.status === statusFilter;
    
    // Company name filter
    const matchesCompanyName = companyNameFilter === '' || 
      (company && company.name.toLowerCase().includes(companyNameFilter.toLowerCase()));
    
    // For company users, only show their own jobs
    const isOwnJob = user?.type !== 'company' || job.companyId === user.id;
    
    return matchesSearch && matchesLocation && matchesJobType && 
           matchesSalary && matchesStatus && matchesCompanyName && isOwnJob;
  });

  // Reset filters when user changes
  useEffect(() => {
    setSearchTerm('');
    setLocationFilter('');
    setJobTypeFilter('');
    setSalaryRangeFilter('');
    setCompanyNameFilter('');
    setStatusFilter(user?.type === 'company' ? '' : 'active');
  }, [user]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setJobTypeFilter('');
    setSalaryRangeFilter('');
    setCompanyNameFilter('');
    setStatusFilter(user?.type === 'company' ? '' : 'active');
  };

  return (
    <div className="jobs-list-container">
      <div className="list-header">
        <h1 className="list-title">
          {user?.type === 'company' ? 'Your Job Postings' : 'Available Jobs'}
        </h1>
        {user?.type === 'company' && (
          <Link to="/jobs/new" className="post-job-button">
            Post New Job
          </Link>
        )}
      </div>

      {/* Search and Filter Section */}
      <div className="filters-section">
        {/* General Search */}
        <div className="filter-group">
          <label htmlFor="search" className="filter-label">Search</label>
          <input
            type="text"
            id="search"
            placeholder="Search by job title or company"
            className="filter-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Company Name Filter */}
        <div className="filter-group">
          <label htmlFor="company" className="filter-label">Company</label>
          <select
            id="company"
            className="filter-select"
            value={companyNameFilter}
            onChange={(e) => setCompanyNameFilter(e.target.value)}
          >
            <option value="">All Companies</option>
            {companyNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="filter-group">
          <label htmlFor="location" className="filter-label">Location</label>
          <select
            id="location"
            className="filter-select"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Job Type Filter */}
        <div className="filter-group">
          <label htmlFor="jobType" className="filter-label">Job Type</label>
          <select
            id="jobType"
            className="filter-select"
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            {jobTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Salary Range Filter */}
        <div className="filter-group">
          <label htmlFor="salary" className="filter-label">Salary Range</label>
          <select
            id="salary"
            className="filter-select"
            value={salaryRangeFilter}
            onChange={(e) => setSalaryRangeFilter(e.target.value)}
          >
            <option value="">All Ranges</option>
            <option value="0-50000">Up to ₹50,000</option>
            <option value="50000-100000">₹50,000 - ₹100,000</option>
            <option value="100000+">₹100,000+</option>
          </select>
        </div>

        {/* Status Filter (only visible for companies) */}
        {user?.type === 'company' && (
          <div className="filter-group">
            <label htmlFor="status" className="filter-label">Status</label>
            <select
              id="status"
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        )}
        {/* Clear Filters Button */}
        <div className="filter-group">
          <label className="filter-label" style={{ visibility: 'hidden' }}>Clear</label>
          <button 
            onClick={clearAllFilters}
            className="clear-filters-button"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-count">
        {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <div className="job-grid">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="empty-list-message">
          <p className="message-text">
            {user?.type === 'company'
              ? 'No jobs match your filters.'
              : 'No available jobs match your filters.'}
          </p>
          {user?.type === 'company' && (
            <Link to="/jobs/new" className="post-job-button primary">
              Post New Job
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default JobsList;