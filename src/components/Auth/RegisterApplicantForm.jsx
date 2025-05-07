// import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useJobs } from '../../context/JobContext';
// import { validateEmail, validatePassword, validateName, validatePhone } from '../../utils/validation';
// import { useNavigate } from 'react-router-dom';
// import './RegisterApplicantForm.css';

// const RegisterApplicantForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//     skills: '',
//     experience: '',
//     education: '',
//     resume: ''
//   });
//   const [error, setError] = useState('');
//   const { addApplicant } = useJobs();
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
//       setError('Name must be at least 2 characters');
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

//     if (formData.phone && !validatePhone(formData.phone)) {
//       setError('Please enter a valid phone number (10 digits)');
//       return;
//     }

//     // Create new applicant
//     const newApplicant = {
//       id: Date.now().toString(),
//       name: formData.name,
//       email: formData.email,
//       password: formData.password,
//       phone: formData.phone,
//       skills: formData.skills.split(',').map(skill => skill.trim()),
//       experience: formData.experience,
//       education: formData.education,
//       resume: formData.resume
//     };

//     addApplicant(newApplicant);
//     login({ ...newApplicant, type: 'applicant' });
//     navigate('/dashboard');
//   };

//   return (
//     <div className="register-applicant-container">
//       <h2 className="register-applicant-heading">Applicant Registration</h2>
//       {error && <div className="register-applicant-error-message">{error}</div>}
//       <form onSubmit={handleSubmit} className="register-applicant-form">
//         <div className="form-group">
//           <label htmlFor="name" className="form-label">Full Name</label>
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
//           <label htmlFor="phone" className="form-label">Phone Number</label>
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             className="form-input"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="skills" className="form-label">Skills (comma separated)</label>
//           <input
//             type="text"
//             id="skills"
//             name="skills"
//             className="form-input"
//             value={formData.skills}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="experience" className="form-label">Experience</label>
//           <input
//             type="text"
//             id="experience"
//             name="experience"
//             className="form-input"
//             value={formData.experience}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="education" className="form-label">Education</label>
//           <input
//             type="text"
//             id="education"
//             name="education"
//             className="form-input"
//             value={formData.education}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="resume" className="form-label">Resume URL</label>
//           <input
//             type="url"
//             id="resume"
//             name="resume"
//             className="form-input"
//             value={formData.resume}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit" className="register-applicant-button">Register</button>
//       </form>
//       <div className="register-applicant-login-link">
//         Already have an account? <a href="/" className="login-link">Login</a>
//       </div>
//     </div>
//   );
// };

// export default RegisterApplicantForm;




import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { validateEmail, validatePassword, validateName, validatePhone } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addApplicant } = useJobs();
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
      setError('Name must be at least 2 characters');
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

    if (formData.phone && !validatePhone(formData.phone)) {
      setError('Please enter a valid phone number (10 digits)');
      setIsSubmitting(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
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
    <div className="register-applicant-container">
      <div className="form-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-blur"></div>
      </div>
      
      <motion.div 
        className="register-applicant-card"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="form-header">
          <motion.h2 
            className="register-applicant-heading"
            variants={itemVariants}
          >
            Join Our Talent Network
          </motion.h2>
          <motion.p 
            className="form-subtitle"
            variants={itemVariants}
          >
            Create your profile and unlock amazing opportunities
          </motion.p>
        </div>

        {error && (
          <motion.div 
            className="register-applicant-error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="register-applicant-form">
          <div className="form-columns">
            <div className="form-column">
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="name" className="form-label">
                  <span className="label-icon">👤</span>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </motion.div>

              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="email" className="form-label">
                  <span className="label-icon">✉️</span>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
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
            </div>

            <div className="form-column">
              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="phone" className="form-label">
                  <span className="label-icon">📱</span>
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                />
              </motion.div>

              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="skills" className="form-label">
                  <span className="label-icon">🛠️</span>
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  className="form-input"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="JavaScript, React, Node.js"
                />
              </motion.div>

              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="experience" className="form-label">
                  <span className="label-icon">💼</span>
                  Experience
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  className="form-input"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="5 years as Frontend Developer"
                />
              </motion.div>

              <motion.div className="form-group" variants={itemVariants}>
                <label htmlFor="education" className="form-label">
                  <span className="label-icon">🎓</span>
                  Education
                </label>
                <input
                  type="text"
                  id="education"
                  name="education"
                  className="form-input"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="B.Sc. Computer Science"
                />
              </motion.div>
            </div>
          </div>

          <motion.div className="form-group" variants={itemVariants}>
            <label htmlFor="resume" className="form-label">
              <span className="label-icon">📄</span>
              Resume URL
            </label>
            <input
              type="url"
              id="resume"
              name="resume"
              className="form-input"
              value={formData.resume}
              onChange={handleChange}
              placeholder="https://example.com/resume.pdf"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.button 
              type="submit" 
              className="register-applicant-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="button-loading">
                  <span className="spinner"></span> Processing...
                </span>
              ) : (
                "Create My Profile"
              )}
            </motion.button>
          </motion.div>
        </form>

        <motion.div 
          className="register-applicant-login-link"
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

export default RegisterApplicantForm;