import React from 'react';

const PacManSVG = ({ className }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="45" fill="#FFCC00" />
      <path 
        d="M50 5 L50 50 L5 50 A45 45 0 0 1 50 5" 
        fill="#000" 
      />
      <circle cx="50" cy="25" r="7" fill="#000" />
      
      {/* Ghost */}
      <g transform="translate(75, 55) scale(0.3)">
        <path 
          d="M45 0 A45 45 0 0 1 135 0 V100 L112.5 80 L90 100 L67.5 80 L45 100 Z" 
          fill="#FF0000" 
        />
        <circle cx="70" cy="40" r="12" fill="#FFF" />
        <circle cx="70" cy="40" r="6" fill="#000" />
        <circle cx="110" cy="40" r="12" fill="#FFF" />
        <circle cx="110" cy="40" r="6" fill="#000" />
      </g>
      
      {/* Dots */}
      <circle cx="15" cy="75" r="3" fill="#FFCC00" />
      <circle cx="25" cy="75" r="3" fill="#FFCC00" />
      <circle cx="35" cy="75" r="3" fill="#FFCC00" />
    </svg>
  );
};

export default PacManSVG;