import React from 'react';

const GalagaSVG = ({ className }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" fill="#000" />
      
      {/* Stars */}
      <circle cx="20" cy="20" r="1" fill="#fff" />
      <circle cx="40" cy="10" r="1" fill="#fff" />
      <circle cx="60" cy="25" r="1" fill="#fff" />
      <circle cx="80" cy="15" r="1" fill="#fff" />
      <circle cx="15" cy="40" r="1" fill="#fff" />
      <circle cx="35" cy="60" r="1" fill="#fff" />
      <circle cx="55" cy="70" r="1" fill="#fff" />
      <circle cx="75" cy="50" r="1" fill="#fff" />
      <circle cx="90" cy="80" r="1" fill="#fff" />
      <circle cx="25" cy="85" r="1" fill="#fff" />
      
      {/* Player ship */}
      <g transform="translate(42, 85)">
        <path d="M0,0 L8,0 L16,0 L13,-5 L3,-5 Z" fill="#00f" />
        <rect x="7" y="-10" width="2" height="5" fill="#f00" />
      </g>
      
      {/* Enemy ships */}
      <g transform="translate(25, 20)">
        <path d="M0,0 L10,0 L10,-2 L8,-2 L8,-4 L2,-4 L2,-2 L0,-2 Z" fill="#f0f" />
        <rect x="4" y="0" width="2" height="2" fill="#f0f" />
      </g>
      
      <g transform="translate(45, 25)">
        <path d="M0,0 L10,0 L10,-2 L8,-2 L8,-4 L2,-4 L2,-2 L0,-2 Z" fill="#0ff" />
        <rect x="4" y="0" width="2" height="2" fill="#0ff" />
      </g>
      
      <g transform="translate(65, 20)">
        <path d="M0,0 L10,0 L10,-2 L8,-2 L8,-4 L2,-4 L2,-2 L0,-2 Z" fill="#ff0" />
        <rect x="4" y="0" width="2" height="2" fill="#ff0" />
      </g>
      
      <g transform="translate(20, 35)">
        <path d="M0,0 L10,0 L10,-2 L8,-2 L8,-4 L2,-4 L2,-2 L0,-2 Z" fill="#0f0" />
        <rect x="4" y="0" width="2" height="2" fill="#0f0" />
      </g>
      
      <g transform="translate(40, 40)">
        <path d="M0,0 L10,0 L10,-2 L8,-2 L8,-4 L2,-4 L2,-2 L0,-2 Z" fill="#f00" />
        <rect x="4" y="0" width="2" height="2" fill="#f00" />
      </g>
      
      <g transform="translate(60, 35)">
        <path d="M0,0 L10,0 L10,-2 L8,-2 L8,-4 L2,-4 L2,-2 L0,-2 Z" fill="#f50" />
        <rect x="4" y="0" width="2" height="2" fill="#f50" />
      </g>
      
      {/* Missiles */}
      <line x1="50" y1="80" x2="50" y2="60" stroke="#f00" strokeWidth="1" />
      <line x1="30" y1="25" x2="30" y2="40" stroke="#0f0" strokeWidth="1" />
      <line x1="70" y1="25" x2="70" y2="40" stroke="#0f0" strokeWidth="1" />
    </svg>
  );
};

export default GalagaSVG;