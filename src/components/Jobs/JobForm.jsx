import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import './JobForm.css'; // Import CSS

const JobForm = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { jobs, addJob, updateJob } = useJobs();
  const navigate = useNavigate();

  const isEditing = !!id;
  const jobToEdit = jobs.find(j => j.id === id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
    type: 'Full-time',
    status: 'active'
  });

  useEffect(() => {
    if (isEditing && jobToEdit) {
      setFormData({
        title: jobToEdit.title,
        description: jobToEdit.description,
        requirements: jobToEdit.requirements.join(', '),
        location: jobToEdit.location,
        salary: jobToEdit.salary,
        type: jobToEdit.type,
        status: jobToEdit.status
      });
    }
  }, [isEditing, jobToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobData = {
      ...formData,
      requirements: formData.requirements.split(',').map(req => req.trim()),
      companyId: user.id,
      postedDate: new Date().toISOString().split('T')[0]
    };

    if (isEditing) {
      updateJob({ ...jobToEdit, ...jobData });
    } else {
      addJob({
        ...jobData,
        id: Date.now().toString()
      });
    }

    navigate('/jobs');
  };

  return (
    <div className="job-form-container">
      <h1 className="form-title">{isEditing ? 'Edit Job' : 'Post New Job'}</h1>
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-input"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            rows="7"
            className="form-textarea"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="requirements" className="form-label">Requirements (comma separated)</label>
          <textarea
            id="requirements"
            name="requirements"
            rows="4"
            className="form-textarea"
            value={formData.requirements}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="location" className="form-label">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              className="form-input"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="salary" className="form-label">Salary Range</label>
            <input
              type="text"
              id="salary"
              name="salary"
              className="form-input"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type" className="form-label">Job Type</label>
            <select
              id="type"
              name="type"
              className="form-select"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          {isEditing && (
            <div className="form-group">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                id="status"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          )}
        </div>
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/jobs')}
            className="cancel-button"
          >
            Cancel
          </button>
          <button type="submit" className="submit-button">
            {isEditing ? 'Update Job' : 'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;