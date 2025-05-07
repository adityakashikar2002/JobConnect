// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import './Navbar.css'; // Import the CSS file

// const Navbar = () => {
//   const { user, isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo">
//           <span className="logo-icon"></span>JobPortal
//         </Link>

//         {isAuthenticated ? (
//           <div className="navbar-menu">
//             <div className="navbar-links">
//               <Link to="/dashboard" className="navbar-link">
//                 Dashboard
//               </Link>
//               <Link to="/jobs" className="navbar-link">
//                 Jobs
//               </Link>
//               <Link to="/profile" className="navbar-link">
//                 Profile
//               </Link>
//             </div>
//             <div className="navbar-user">
//               <span className="user-greeting">Hello, {user.name}</span>
//               <button onClick={handleLogout} className="navbar-logout-button">
//                 Logout
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="navbar-auth">
//             <Link to="/" className="navbar-login-button">
//               Login
//             </Link>
//             <Link to="/register" className="navbar-register-button">
//               Register
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/jobs', label: 'Jobs', icon: '💼' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="logo-gradient">JobConnect</span>
        </Link>

        {isAuthenticated ? (
          <div className="navbar-content">
            <ul className="nav-links">
              {navItems.map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={item.path} className="nav-link">
                    <span className="nav-icon">{item.icon}</span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="user-section">
              <motion.div 
                className="user-avatar"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {user.name.charAt(0).toUpperCase()}
              </motion.div>
              
              <motion.button
                onClick={handleLogout}
                className="logout-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="login-btn"
              onClick={() => navigate('/')}
            >
              Login
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="register-btn"
              onClick={() => navigate('/register')}
            >
              Register
            </motion.button>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;