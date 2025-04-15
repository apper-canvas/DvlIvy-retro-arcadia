import React from 'react';

const TetrisSVG = ({ className }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" fill="#000" />
      
      {/* Tetris blocks */}
      <g>
        {/* L shape */}
        <rect x="10" y="10" width="10" height="10" fill="#FFA500" />
        <rect x="10" y="20" width="10" height="10" fill="#FFA500" />
        <rect x="10" y="30" width="10" height="10" fill="#FFA500" />
        <rect x="20" y="30" width="10" height="10" fill="#FFA500" />
        
        {/* I shape */}
        <rect x="40" y="10" width="10" height="10" fill="#00FFFF" />
        <rect x="40" y="20" width="10" height="10" fill="#00FFFF" />
        <rect x="40" y="30" width="10" height="10" fill="#00FFFF" />
        <rect x="40" y="40" width="10" height="10" fill="#00FFFF" />
        
        {/* T shape */}
        <rect x="60" y="10" width="10" height="10" fill="#800080" />
        <rect x="70" y="10" width="10" height="10" fill="#800080" />
        <rect x="80" y="10" width="10" height="10" fill="#800080" />
        <rect x="70" y="20" width="10" height="10" fill="#800080" />
        
        {/* Z shape */}
        <rect x="60" y="40" width="10" height="10" fill="#FF0000" />
        <rect x="70" y="40" width="10" height="10" fill="#FF0000" />
        <rect x="70" y="50" width="10" height="10" fill="#FF0000" />
        <rect x="80" y="50" width="10" height="10" fill="#FF0000" />
        
        {/* O shape */}
        <rect x="10" y="60" width="10" height="10" fill="#FFFF00" />
        <rect x="20" y="60" width="10" height="10" fill="#FFFF00" />
        <rect x="10" y="70" width="10" height="10" fill="#FFFF00" />
        <rect x="20" y="70" width="10" height="10" fill="#FFFF00" />
        
        {/* S shape */}
        <rect x="40" y="60" width="10" height="10" fill="#00FF00" />
        <rect x="50" y="60" width="10" height="10" fill="#00FF00" />
        <rect x="30" y="70" width="10" height="10" fill="#00FF00" />
        <rect x="40" y="70" width="10" height="10" fill="#00FF00" />
      </g>
      
      {/* Grid lines */}
      <path d="M0 0 v100 h100 v-100 h-100 M10 0 v100 M20 0 v100 M30 0 v100 M40 0 v100 M50 0 v100 M60 0 v100 M70 0 v100 M80 0 v100 M90 0 v100 M0 10 h100 M0 20 h100 M0 30 h100 M0 40 h100 M0 50 h100 M0 60 h100 M0 70 h100 M0 80 h100 M0 90 h100" 
        stroke="rgba(255,255,255,0.2)" 
        strokeWidth="0.5" 
        fill="none" 
      />
    </svg>
  );
};

export default TetrisSVG;