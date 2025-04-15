import React from 'react';

const ScanlineSVG = ({ className }) => {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 4 4"
      preserveAspectRatio="none"
    >
      <pattern id="scanlines" width="4" height="4" patternUnits="userSpaceOnUse">
        <path d="M 0 1 L 4 1" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <path d="M 0 3 L 4 3" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#scanlines)" />
    </svg>
  );
};

export default ScanlineSVG;