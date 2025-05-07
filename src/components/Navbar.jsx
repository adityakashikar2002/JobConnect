// Navbar.jsx
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