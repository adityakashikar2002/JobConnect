import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { validateEmail, validatePassword, validateName, validatePhone } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import './RegisterApplicantForm.css';

const RegisterApplicantForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    skills: '',
    experience: '',
    education: '',
    resume: ''
  });
  const [error, setError] = useState('');
  const { addApplicant } = useJobs();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!validateName(formData.name)) {
      setError('Name must be at least 2 characters');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      setError('Please enter a valid phone number (10 digits)');
      return;
    }

    // Create new applicant
    const newApplicant = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      skills: formData.skills.split(',').map(skill => skill.trim()),
      experience: formData.experience,
      education: formData.education,
      resume: formData.resume
    };

    addApplicant(newApplicant);
    login({ ...newApplicant, type: 'applicant' });
    navigate('/dashboard');
  };

  return (
    <div className="register-applicant-container">
      <h2 className="register-applicant-heading">Applicant Registration</h2>
      {error && <div className="register-applicant-error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="register-applicant-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name</label>
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-input"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="skills" className="form-label">Skills (comma separated)</label>
          <input
            type="text"
            id="skills"
            name="skills"
            className="form-input"
            value={formData.skills}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="experience" className="form-label">Experience</label>
          <input
            type="text"
            id="experience"
            name="experience"
            className="form-input"
            value={formData.experience}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="education" className="form-label">Education</label>
          <input
            type="text"
            id="education"
            name="education"
            className="form-input"
            value={formData.education}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="resume" className="form-label">Resume URL</label>
          <input
            type="url"
            id="resume"
            name="resume"
            className="form-input"
            value={formData.resume}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="register-applicant-button">Register</button>
      </form>
      <div className="register-applicant-login-link">
        Already have an account? <a href="/" className="login-link">Login</a>
      </div>
    </div>
  );
};

export default RegisterApplicantForm;