// CompanyProfile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { motion } from 'framer-motion';
import './CompanyProfile.css';

const CompanyProfile = () => {
  const { user, updateUser } = useAuth(); // Import updateUser
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
    address: '',
    profilePicture: user?.profilePicture || '' // Add profilePicture to form data
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const currentCompany = companies.find(c => c.id === user?.id);
    if (currentCompany) {
      setFormData({
        id: currentCompany.id, // Make sure to include the id
        name: currentCompany.name,
        email: currentCompany.email,
        description: currentCompany.description || '',
        industry: currentCompany.industry || '',
        foundedYear: currentCompany.foundedYear || '',
        employees: currentCompany.employees || '',
        website: currentCompany.website || '',
        logo: currentCompany.logo || '',
        address: currentCompany.address || '',
        profilePicture: currentCompany.profilePicture || '' // Load existing profile picture
      });
    }
  }, [companies, user?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCompanyData = {
      ...formData
    };

    updateCompany(updatedCompanyData);
    updateUser({ profilePicture: formData.profilePicture }); // Update profile picture in AuthContext
    setIsEditing(false);
  };

  return (
    <motion.div
      className="company-profile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="profile-card"
        whileHover={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
      >
        <div className="profile-header">
          <h1 className="profile-title">Company Profile</h1>
          <motion.button
            onClick={() => setIsEditing(!isEditing)}
            className={`edit-button ${isEditing ? 'cancel' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </motion.button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Company Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
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
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="industry" className="form-label">Industry</label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  className="form-control"
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
                  className="form-control"
                  value={formData.foundedYear}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="employees" className="form-label">Employees</label>
                <input
                  type="text"
                  id="employees"
                  name="employees"
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="profilePicture" className="form-label">Profile Picture URL</label>
                <input
                  type="url"
                  id="profilePicture"
                  name="profilePicture"
                  className="form-control"
                  value={formData.profilePicture}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <motion.button
              type="submit"
              className="save-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save Changes
            </motion.button>
          </form>
        ) : (
          <div className="profile-details">
            <div className="company-logo-container">
              <img
                src={formData.logo || 'https://via.placeholder.com/150'}
                alt={formData.name}
                className="company-logo"
              />
            </div>
            {formData.profilePicture && (
              <div className="detail-row">
                <span className="detail-label">Profile Picture:</span>
                <img
                  src={formData.profilePicture}
                  alt="Profile"
                  className="profile-preview-image"
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', marginLeft: '10px' }}
                />
              </div>
            )}
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
      </motion.div>
    </motion.div>
  );
};

export default CompanyProfile;