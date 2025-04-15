import React from 'react';

const SpaceInvadersSVG = ({ className }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" fill="#000" />
      
      {/* Classic invader 1 */}
      <g transform="translate(30, 20) scale(0.6)">
        <rect x="20" y="0" width="10" height="10" fill="#3f6" />
        <rect x="30" y="0" width="10" height="10" fill="#3f6" />
        <rect x="60" y="0" width="10" height="10" fill="#3f6" />
        <rect x="70" y="0" width="10" height="10" fill="#3f6" />
        
        <rect x="10" y="10" width="10" height="10" fill="#3f6" />
        <rect x="20" y="10" width="10" height="10" fill="#3f6" />
        <rect x="30" y="10" width="10" height="10" fill="#3f6" />
        <rect x="40" y="10" width="10" height="10" fill="#3f6" />
        <rect x="50" y="10" width="10" height="10" fill="#3f6" />
        <rect x="60" y="10" width="10" height="10" fill="#3f6" />
        <rect x="70" y="10" width="10" height="10" fill="#3f6" />
        <rect x="80" y="10" width="10" height="10" fill="#3f6" />
        
        <rect x="0" y="20" width="10" height="10" fill="#3f6" />
        <rect x="10" y="20" width="10" height="10" fill="#3f6" />
        <rect x="20" y="20" width="10" height="10" fill="#3f6" />
        <rect x="30" y="20" width="10" height="10" fill="#3f6" />
        <rect x="40" y="20" width="10" height="10" fill="#3f6" />
        <rect x="50" y="20" width="10" height="10" fill="#3f6" />
        <rect x="60" y="20" width="10" height="10" fill="#3f6" />
        <rect x="70" y="20" width="10" height="10" fill="#3f6" />
        <rect x="80" y="20" width="10" height="10" fill="#3f6" />
        <rect x="90" y="20" width="10" height="10" fill="#3f6" />
        
        <rect x="0" y="30" width="10" height="10" fill="#3f6" />
        <rect x="10" y="30" width="10" height="10" fill="#3f6" />
        <rect x="20" y="30" width="10" height="10" fill="#3f6" />
        <rect x="30" y="30" width="10" height="10" fill="#3f6" />
        <rect x="40" y="30" width="10" height="10" fill="#3f6" />
        <rect x="50" y="30" width="10" height="10" fill="#3f6" />
        <rect x="60" y="30" width="10" height="10" fill="#3f6" />
        <rect x="70" y="30" width="10" height="10" fill="#3f6" />
        <rect x="80" y="30" width="10" height="10" fill="#3f6" />
        <rect x="90" y="30" width="10" height="10" fill="#3f6" />
        
        <rect x="10" y="40" width="10" height="10" fill="#3f6" />
        <rect x="30" y="40" width="10" height="10" fill="#3f6" />
        <rect x="60" y="40" width="10" height="10" fill="#3f6" />
        <rect x="80" y="40" width="10" height="10" fill="#3f6" />
      </g>
      
      {/* Ship at bottom */}
      <g transform="translate(40, 80)">
        <rect x="0" y="0" width="20" height="5" fill="#3f6" />
        <rect x="8" y="-5" width="4" height="5" fill="#3f6" />
      </g>
      
      {/* Laser beam */}
      <line x1="50" y1="75" x2="50" y2="60" stroke="#f00" strokeWidth="1" />
      
      {/* Defensive barriers */}
      <rect x="10" y="70" width="15" height="5" fill="#3f6" />
      <rect x="43" y="70" width="15" height="5" fill="#3f6" />
      <rect x="76" y="70" width="15" height="5" fill="#3f6" />
    </svg>
  );
};

export default SpaceInvadersSVG;