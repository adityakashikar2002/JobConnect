import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import './CompanyProfile.css'; // Import CSS

const CompanyProfile = () => {
  const { user } = useAuth();
  const { companies, updateCompany } = useJobs();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    industry: '',
    foundedYear: '',
    employees: '',
    website: '',
    logo: '',
    address: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const currentCompany = companies.find(c => c.id === user.id);
    if (currentCompany) {
      setFormData({
        name: currentCompany.name,
        email: currentCompany.email,
        description: currentCompany.description || '',
        industry: currentCompany.industry || '',
        foundedYear: currentCompany.foundedYear || '',
        employees: currentCompany.employees || '',
        website: currentCompany.website || '',
        logo: currentCompany.logo || '',
        address: currentCompany.address || ''
      });
    }
  }, [companies, user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCompany = {
      ...user,
      ...formData
    };

    updateCompany(updatedCompany);
    setIsEditing(false);
  };

  return (
    <div className="company-profile-container">
      <div className="profile-header">
        <h1 className="profile-title">Company Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`edit-button ${isEditing ? 'cancel' : ''}`}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Company Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="form-textarea"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="industry" className="form-label">Industry</label>
            <input
              type="text"
              id="industry"
              name="industry"
              className="form-input"
              value={formData.industry}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="foundedYear" className="form-label">Founded Year</label>
            <input
              type="text"
              id="foundedYear"
              name="foundedYear"
              className="form-input"
              value={formData.foundedYear}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="employees" className="form-label">Number of Employees</label>
            <input
              type="text"
              id="employees"
              name="employees"
              className="form-input"
              value={formData.employees}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="website" className="form-label">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              className="form-input"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="logo" className="form-label">Logo URL</label>
            <input
              type="url"
              id="logo"
              name="logo"
              className="form-input"
              value={formData.logo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-input"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="save-button">Save Changes</button>
        </form>
      ) : (
        <div className="profile-details">
          <div className="logo-container">
            <img
              src={formData.logo || 'https://via.placeholder.com/150'}
              alt={formData.name}
              className="company-logo"
            />
          </div>
          <div className="detail-row">
            <span className="detail-label">Company Name:</span>
              <span className="detail-value">{formData.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{formData.email}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Industry:</span>
              <span className="detail-value">{formData.industry || 'Not provided'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Founded Year:</span>
              <span className="detail-value">{formData.foundedYear || 'Not provided'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Employees:</span>
              <span className="detail-value">{formData.employees || 'Not provided'}</span>
            </div>
            {formData.website && (
              <div className="detail-row">
                <span className="detail-label">Website:</span>
                <a
                  href={formData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-link"
                >
                  {formData.website}
                </a>
              </div>
            )}
            <div className="detail-row">
              <span className="detail-label">Address:</span>
              <span className="detail-value">{formData.address || 'Not provided'}</span>
            </div>
            {formData.description && (
              <div className="detail-row">
                <span className="detail-label">Description:</span>
                <p className="detail-value company-description">{formData.description}</p>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;