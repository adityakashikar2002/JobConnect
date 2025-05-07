// import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useJobs } from '../../context/JobContext';
// import { validateEmail, validatePassword, validateName } from '../../utils/validation';
// import { useNavigate } from 'react-router-dom';
// import './RegisterCompanyForm.css'

// const RegisterCompanyForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     description: '',
//     industry: '',
//     foundedYear: '',
//     employees: '',
//     website: '',
//     logo: '',
//     address: ''
//   });
//   const [error, setError] = useState('');
//   const { addCompany } = useJobs();
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');

//     // Validation
//     if (!validateName(formData.name)) {
//       setError('Company name must be at least 2 characters');
//       return;
//     }

//     if (!validateEmail(formData.email)) {
//       setError('Please enter a valid email address');
//       return;
//     }

//     if (!validatePassword(formData.password)) {
//       setError('Password must be at least 6 characters');
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     // Create new company
//     const newCompany = {
//       id: Date.now().toString(),
//       name: formData.name,
//       email: formData.email,
//       password: formData.password,
//       description: formData.description,
//       industry: formData.industry,
//       foundedYear: formData.foundedYear,
//       employees: formData.employees,
//       website: formData.website,
//       logo: formData.logo || 'https://via.placeholder.com/150',
//       address: formData.address
//     };

//     addCompany(newCompany);
//     login({ ...newCompany, type: 'company' });
//     navigate('/dashboard');
//   };

//   return (
//     <div className="register-company-container">
//       <h2 className="register-company-heading">Company Registration</h2>
//       {error && <div className="register-company-error-message">{error}</div>}
//       <form onSubmit={handleSubmit} className="register-company-form">
//         <div className="form-group">
//           <label htmlFor="name" className="form-label">Company Name</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             className="form-input"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email" className="form-label">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             className="form-input"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             className="form-input"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             className="form-input"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description" className="form-label">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             className="form-textarea"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="industry" className="form-label">Industry</label>
//           <input
//             type="text"
//             id="industry"
//             name="industry"
//             className="form-input"
//             value={formData.industry}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="foundedYear" className="form-label">Founded Year</label>
//           <input
//             type="text"
//             id="foundedYear"
//             name="foundedYear"
//             className="form-input"
//             value={formData.foundedYear}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="employees" className="form-label">Number of Employees</label>
//           <input
//             type="text"
//             id="employees"
//             name="employees"
//             className="form-input"
//             value={formData.employees}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="website" className="form-label">Website</label>
//           <input
//             type="url"
//             id="website"
//             name="website"
//             className="form-input"
//             value={formData.website}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="logo" className="form-label">Logo URL</label>
//           <input
//             type="url"
//             id="logo"
//             name="logo"
//             className="form-input"
//             value={formData.logo}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="address" className="form-label">Address</label>
//           <input
//             type="text"
//             id="address"
//             name="address"
//             className="form-input"
//             value={formData.address}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit" className="register-company-button">Register Company</button>
//       </form>
//       <div className="register-company-login-link">
//         Already have an account? <a href="/" className="login-link">Login</a>
//       </div>
//     </div>
//   );
// };

// export default RegisterCompanyForm;


import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { validateEmail, validatePassword, validateName } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './RegisterCompanyForm.css';

const RegisterCompanyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    description: '',
    industry: '',
    foundedYear: '',
    employees: '',
    website: '',
    logo: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addCompany } = useJobs();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validation
    if (!validateName(formData.name)) {
      setError('Company name must be at least 2 characters');
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 6 characters');
      setIsSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create new company
    const newCompany = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      description: formData.description,
      industry: formData.industry,
      foundedYear: formData.foundedYear,
      employees: formData.employees,
      website: formData.website,
      logo: formData.logo || 'https://via.placeholder.com/150',
      address: formData.address
    };

    addCompany(newCompany);
    login({ ...newCompany, type: 'company' });
    navigate('/dashboard');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="register-company-container">
      <div className="form-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-blur"></div>
      </div>
      
      <motion.div 
        className="register-company-card"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="form-header">
          <motion.h2 
            className="register-company-heading"
            variants={itemVariants}
          >
            Company Registration
          </motion.h2>
          <motion.p 
            className="form-subtitle"
            variants={itemVariants}
          >
            Build your corporate profile and attract top talent
          </motion.p>
        </div>

        {error && (
          <motion.div 
            className="register-company-error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="register-company-form">
          <div className="form-columns">
            <div className="form-column">
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="name" className="form-label">
                  <span className="label-icon">🏢</span>
                  Company Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Acme Corporation"
                />
              </motion.div>

              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="email" className="form-label">
                  <span className="label-icon">✉️</span>
                  Corporate Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="contact@company.com"
                />
              </motion.div>

              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="password" className="form-label">
                  <span className="label-icon">🔒</span>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                />
              </motion.div>

              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="confirmPassword" className="form-label">
                  <span className="label-icon">🔐</span>
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-input"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                />
              </motion.div>

              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="industry" className="form-label">
                  <span className="label-icon">🏭</span>
                  Industry
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  className="form-input"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="Technology, Finance, etc."
                />
              </motion.div>
            </div>

            <div className="form-column">
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="foundedYear" className="form-label">
                  <span className="label-icon">📅</span>
                  Founded Year
                </label>
                <input
                  type="text"
                  id="foundedYear"
                  name="foundedYear"
                  className="form-input"
                  value={formData.foundedYear}
                  onChange={handleChange}
                  placeholder="1999"
                />
              </motion.div>

              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="employees" className="form-label">
                  <span className="label-icon">👥</span>
                  Number of Employees
                </label>
                <input
                  type="text"
                  id="employees"
                  name="employees"
                  className="form-input"
                  value={formData.employees}
                  onChange={handleChange}
                  placeholder="100-500"
                />
              </motion.div>

              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="website" className="form-label">
                  <span className="label-icon">🌐</span>
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  className="form-input"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://company.com"
                />
              </motion.div>

              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="logo" className="form-label">
                  <span className="label-icon">🖼️</span>
                  Logo URL
                </label>
                <input
                  type="url"
                  id="logo"
                  name="logo"
                  className="form-input"
                  value={formData.logo}
                  onChange={handleChange}
                  placeholder="https://company.com/logo.png"
                />
              </motion.div>

              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="address" className="form-label">
                  <span className="label-icon">📍</span>
                  Headquarters Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-input"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Business Ave, City"
                />
              </motion.div>
            </div>
          </div>

          <motion.div className="form-group" variants={itemVariants}>
            <label htmlFor="description" className="form-label">
              <span className="label-icon">📝</span>
              Company Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-textarea"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about your company's mission, values, and what makes you unique..."
              rows="4"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.button 
              type="submit" 
              className="register-company-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="button-loading">
                  <span className="spinner"></span> Registering...
                </span>
              ) : (
                "Register Company"
              )}
            </motion.button>
          </motion.div>
        </form>

        <motion.div 
          className="register-company-login-link"
          variants={itemVariants}
        >
          Already have an account?{' '}
          <a href="/" className="login-link">
            Sign In
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterCompanyForm;