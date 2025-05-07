import React from 'react';
import './StatsCard.css'; // Import updated CSS

const StatsCard = ({ title, value, icon, color = 'primary', animation = '' }) => {
  const style = {
    '--glow-color': color,
  };

  return (
    <div className={`stats-card ${animation}`} style={style}>
      <div className="icon-container">
        <span className="icon">{icon}</span>
      </div>
      <div className="text-container">
        <h3 className="title">{title}</h3>
        <p className="value">{value}</p>
      </div>
      <div className="glow-effect"></div>
    </div>
  );
};

export default StatsCard;