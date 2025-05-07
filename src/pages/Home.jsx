// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import LoginForm from '../components/Auth/LoginForm';
// import RegisterApplicantForm from '../components/Auth/RegisterApplicantForm';
// import RegisterCompanyForm from '../components/Auth/RegisterCompanyForm';
// import './Home.css';

// const Home = () => {
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [registrationType, setRegistrationType] = useState(null);

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/dashboard');
//     }
//     // Reset registration type when the route changes away from /register
//     if (location.pathname !== '/register') {
//       setRegistrationType(null);
//     }
//   }, [isAuthenticated, navigate, location.pathname]);

//   const renderForm = () => {
//     if (location.pathname === '/register') {
//       if (registrationType === 'applicant') {
//         return <RegisterApplicantForm />;
//       } else if (registrationType === 'company') {
//         return <RegisterCompanyForm />;
//       } else {
//         return (
//           <div className="registration-type-container">
//             <h2 className="registration-type-heading">Register As</h2>
//             <div className="registration-buttons-container">
//               <button
//                 onClick={() => setRegistrationType('applicant')}
//                 className="registration-applicant-button"
//               >
//                 Job Applicant
//               </button>
//               <button
//                 onClick={() => setRegistrationType('company')}
//                 className="registration-company-button"
//               >
//                 Company
//               </button>
//             </div>
//           </div>
//         );
//       }
//     } else {
//       return <LoginForm />;
//     }
//   };

//   return (
//     <div className="home-container">
//       <div className="home-form-wrapper">
//         {renderForm()}
//       </div>
//     </div>
//   );
// };

// export default Home;



import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/Auth/LoginForm';
import RegisterApplicantForm from '../components/Auth/RegisterApplicantForm';
import RegisterCompanyForm from '../components/Auth/RegisterCompanyForm';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [registrationType, setRegistrationType] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    if (location.pathname !== '/register') {
      setRegistrationType(null);
    }
  }, [isAuthenticated, navigate, location.pathname]);

  const renderForm = () => {
    if (location.pathname === '/register') {
      if (registrationType === 'applicant') {
        return <RegisterApplicantForm />;
      } else if (registrationType === 'company') {
        return <RegisterCompanyForm />;
      } else {
        return (
          <motion.div 
            className="registration-choice"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="registration-title">Join as</h2>
            <div className="registration-options">
              <motion.div 
                className="option-card applicant-option"
                whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setRegistrationType('applicant')}
              >
                <div className="option-icon">👨‍💼</div>
                <h3>Job Seeker</h3>
                <p>Find your dream job today</p>
                <div className="option-highlight"></div>
              </motion.div>
              
              <motion.div 
                className="option-card company-option"
                whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setRegistrationType('company')}
              >
                <div className="option-icon">🏢</div>
                <h3>Employer</h3>
                <p>Hire top talent</p>
                <div className="option-highlight"></div>
              </motion.div>
            </div>
          </motion.div>
        );
      }
    } else {
      return <LoginForm />;
    }
  };

  // return (
  //   <div className="home-container">
  //     <div className="background-animation">
  //       <div className="bubble bubble-1"></div>
  //       <div className="bubble bubble-2"></div>
  //       <div className="bubble bubble-3"></div>
  //       <div className="bubble bubble-4"></div>
  //     </div>
      
  //     <motion.div 
  //       className="home-content"
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       transition={{ duration: 0.5 }}
  //     >
  //       {renderForm()}
  //     </motion.div>
  //   </div>
  // );
  return (
    <div className="home-container">
      <div className="background-animation">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
      </div>
  
      <motion.div 
        className={`home-content ${
          location.pathname === '/register' && registrationType === 'applicant' ? 'applicant-mode' :
          location.pathname === '/register' && registrationType === 'company' ? 'company-mode' :
          ''
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {renderForm()}
      </motion.div>
    </div>
  );
  
};


export default Home;