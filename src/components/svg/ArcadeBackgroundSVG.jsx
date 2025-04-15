import React from 'react';

const ArcadeBackgroundSVG = ({ className }) => {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      </pattern>
      
      {/* Arcade elements */}
      <rect width="100%" height="100%" fill="rgba(0,0,0,0.8)" />
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      {/* Arcade cabinet silhouettes */}
      <rect x="10" y="30" width="20" height="40" rx="2" fill="rgba(40,40,60,0.7)" />
      <rect x="40" y="20" width="20" height="50" rx="2" fill="rgba(40,40,60,0.7)" />
      <rect x="70" y="25" width="20" height="45" rx="2" fill="rgba(40,40,60,0.7)" />
      
      {/* Neon lights */}
      <path d="M 0 10 L 100 10" stroke="rgba(255,0,255,0.1)" strokeWidth="2" />
      <path d="M 0 90 L 100 90" stroke="rgba(0,255,255,0.1)" strokeWidth="2" />
    </svg>
  );
};

export default ArcadeBackgroundSVG;