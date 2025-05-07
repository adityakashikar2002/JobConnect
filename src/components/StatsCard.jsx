// import React from 'react';
// import './StatsCard.css'; // Import updated CSS

// const StatsCard = ({ title, value, icon, color = 'primary', animation = '' }) => {
//   const style = {
//     '--glow-color': color,
//   };

//   return (
//     <div className={`stats-card ${animation}`} style={style}>
//       <div className="icon-container">
//         <span className="icon">{icon}</span>
//       </div>
//       <div className="text-container">
//         <h3 className="title">{title}</h3>
//         <p className="value">{value}</p>
//       </div>
//       <div className="glow-effect"></div>
//     </div>
//   );
// };

// export default StatsCard;

import React from 'react';
import { motion } from 'framer-motion';
import './StatsCard.css';

const StatsCard = ({ title, value, icon, color, delay = 0 }) => {
  const colorMap = {
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    tertiary: 'var(--tertiary)',
    quaternary: 'var(--quaternary)',
    warning: 'var(--warning)',
    danger: 'var(--danger)',
    success: 'var(--success)'
  };

  return (
    <motion.div
      className="stats-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      style={{ 
        '--card-color': colorMap[color] || colorMap.primary 
      }}
    >
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-value">{value}</p>
      </div>
    </motion.div>
  );
};

export default StatsCard;