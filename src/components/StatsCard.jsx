import React from 'react';
import { motion } from 'framer-motion';
import './StatsCard.css';

const StatsCard = ({ title, value, icon, color = 'primary', animation = '' }) => {
  const colorMap = {
    primary: '#6c5ce7',
    secondary: '#fd79a8',
    accent: '#00cec9',
    success: '#00b894',
    warning: '#fdcb6e',
    danger: '#ff7675',
    info: '#0984e3'
  };

  const animationMap = {
    pulse: 'pulse',
    float: 'float',
    none: ''
  };

  return (
    <motion.div 
      className={`stats-card ${animationMap[animation]}`}
      whileHover={{ scale: 1.05 }}
      style={{ '--card-color': colorMap[color] }}
    >
      <div className="card-icon" style={{ backgroundColor: colorMap[color] }}>
        {icon}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-value">{value}</p>
      </div>
    </motion.div>
  );
};

export default StatsCard;