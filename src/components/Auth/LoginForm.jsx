// import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useJobs } from '../../context/JobContext';
// import { validateEmail } from '../../utils/validation';
// import { useNavigate } from 'react-router-dom';
// import './LoginForm.css';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const { applicants, companies } = useJobs();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');

//     if (!validateEmail(email)) {
//       setError('Please enter a valid email address');
//       return;
//     }

//     // Check applicants first
//     const applicant = applicants.find(a => a.email === email && a.password === password);
//     if (applicant) {
//       login({ ...applicant, type: 'applicant' });
//       navigate('/dashboard');
//       return;
//     }

//     // Then check companies
//     const company = companies.find(c => c.email === email && c.password === password);
//     if (company) {
//       login({ ...company, type: 'company' });
//       navigate('/dashboard');
//       return;
//     }

//     setError('Invalid email or password');
//   };

//   return (
//     <div className="login-container">
//       <h2 className="login-heading">Welcome Back!</h2>
//       {error && <div className="login-error-message">{error}</div>}
//       <form onSubmit={handleSubmit} className="login-form">
//         <div className="form-group">
//           <label htmlFor="email" className="form-label">Email</label>
//           <input
//             type="email"
//             id="email"
//             className="form-input"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input
//             type="password"
//             id="password"
//             className="form-input"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="login-button">Login</button>
//       </form>
//       <div className="login-signup-link">
//         Don't have an account? <a href="/register" className="signup-link">Register</a>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { validateEmail } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { applicants, companies } = useJobs();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const applicant = applicants.find(a => a.email === email && a.password === password);
    if (applicant) {
      login({ ...applicant, type: 'applicant' });
      navigate('/dashboard');
      return;
    }

    const company = companies.find(c => c.email === email && c.password === password);
    if (company) {
      login({ ...company, type: 'company' });
      navigate('/dashboard');
      return;
    }

    setError('Invalid email or password');
  };

  return (
    <motion.div 
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="login-header">
        <h2>Welcome Back!</h2>
        <p>Sign in to access your account</p>
      </div>
      
      {error && (
        <motion.div 
          className="error-message"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        
        <motion.button
          type="submit"
          className="login-button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Login
        </motion.button>
      </form>
      
      <div className="login-footer">
        <p>Don't have an account? <a href="/register">Register</a></p>
        {/* <a href="#" className="forgot-password">Forgot password?</a> */}
      </div>
    </motion.div>
  );
};

export default LoginForm;