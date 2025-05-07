// JobsList.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import JobCard from './JobCard';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './JobsList.css';

const JobsList = () => {
  const { user } = useAuth();
  const { jobs, companies } = useJobs();
  const navigate = useNavigate();
  
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
    
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (company && company.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = locationFilter === '' || 
      job.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    const matchesJobType = jobTypeFilter === '' || 
      job.type === jobTypeFilter;
    
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
    
    const matchesStatus = statusFilter === '' || 
      job.status === statusFilter;
    
    const matchesCompanyName = companyNameFilter === '' || 
      (company && company.name.toLowerCase().includes(companyNameFilter.toLowerCase()));
    
    const isOwnJob = user?.type !== 'company' || job.companyId === user.id;
    
    return matchesSearch && matchesLocation && matchesJobType && 
           matchesSalary && matchesStatus && matchesCompanyName && isOwnJob;
  });

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
    <motion.div 
      className="jobs-list-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="list-header">
        <h1 className="list-title">
          {user?.type === 'company' ? 'Your Job Postings' : 'Available Jobs'}
        </h1>
        {user?.type === 'company' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="post-job-button"
            onClick={() => navigate('/jobs/new')}
          >
            Post New Job
          </motion.button>
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearAllFilters}
            className="clear-filters-button"
          >
            Clear Filters
          </motion.button>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-count">
        {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <motion.div 
          className="job-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {filteredJobs.map(job => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
          className="empty-list-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="message-text">
            {user?.type === 'company'
              ? 'No jobs match your filters.'
              : 'No available jobs match your filters.'}
          </p>
          {user?.type === 'company' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/jobs/new')}
              className="post-job-button primary"
            >
              Post New Job
            </motion.button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default JobsList;