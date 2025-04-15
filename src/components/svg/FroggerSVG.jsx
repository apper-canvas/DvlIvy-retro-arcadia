import React from 'react';

const FroggerSVG = ({ className }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" fill="#000" />
      
      {/* Water section */}
      <rect x="0" y="0" width="100" height="40" fill="#0077be" />
      
      {/* Road section */}
      <rect x="0" y="50" width="100" height="40" fill="#3a3a3a" />
      
      {/* Safe zones */}
      <rect x="0" y="40" width="100" height="10" fill="#007700" />
      <rect x="0" y="90" width="100" height="10" fill="#007700" />
      
      {/* Road markings */}
      <rect x="0" y="70" width="10" height="2" fill="#fff" />
      <rect x="20" y="70" width="10" height="2" fill="#fff" />
      <rect x="40" y="70" width="10" height="2" fill="#fff" />
      <rect x="60" y="70" width="10" height="2" fill="#fff" />
      <rect x="80" y="70" width="10" height="2" fill="#fff" />
      
      {/* Logs */}
      <rect x="10" y="10" width="30" height="8" rx="2" fill="#8b4513" />
      <rect x="60" y="25" width="25" height="8" rx="2" fill="#8b4513" />
      
      {/* Cars */}
      <rect x="20" y="55" width="15" height="8" rx="1" fill="#ff0000" />
      <rect x="70" y="65" width="15" height="8" rx="1" fill="#0000ff" />
      <rect x="50" y="75" width="15" height="8" rx="1" fill="#ffff00" />
      
      {/* Turtles */}
      <circle cx="30" cy="35" r="3" fill="#2e8b57" />
      <circle cx="40" cy="35" r="3" fill="#2e8b57" />
      <circle cx="50" cy="35" r="3" fill="#2e8b57" />
      
      {/* Frog */}
      <g transform="translate(48, 92)">
        <circle cx="0" cy="0" r="4" fill="#00ff00" />
        <circle cx="-2" cy="-1" r="1" fill="#000" />
        <circle cx="2" cy="-1" r="1" fill="#000" />
      </g>
    </svg>
  );
};

export default FroggerSVG;