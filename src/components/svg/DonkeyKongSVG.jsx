import React from 'react';

const DonkeyKongSVG = ({ className }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height="100" fill="#000" />
      
      {/* Platforms */}
      <rect x="5" y="90" width="90" height="5" fill="#ff6347" />
      <rect x="10" y="70" width="80" height="5" fill="#ff6347" />
      <rect x="5" y="50" width="85" height="5" fill="#ff6347" />
      <rect x="15" y="30" width="75" height="5" fill="#ff6347" />
      
      {/* Ladders */}
      <rect x="20" y="75" width="5" height="15" fill="#87cefa" />
      <rect x="25" y="75" width="5" height="15" fill="#87cefa" />
      <rect x="20" y="77" width="10" height="2" fill="#87cefa" />
      <rect x="20" y="82" width="10" height="2" fill="#87cefa" />
      <rect x="20" y="87" width="10" height="2" fill="#87cefa" />
      
      <rect x="70" y="55" width="5" height="15" fill="#87cefa" />
      <rect x="75" y="55" width="5" height="15" fill="#87cefa" />
      <rect x="70" y="57" width="10" height="2" fill="#87cefa" />
      <rect x="70" y="62" width="10" height="2" fill="#87cefa" />
      <rect x="70" y="67" width="10" height="2" fill="#87cefa" />
      
      <rect x="30" y="35" width="5" height="15" fill="#87cefa" />
      <rect x="35" y="35" width="5" height="15" fill="#87cefa" />
      <rect x="30" y="37" width="10" height="2" fill="#87cefa" />
      <rect x="30" y="42" width="10" height="2" fill="#87cefa" />
      <rect x="30" y="47" width="10" height="2" fill="#87cefa" />
      
      {/* Barrels */}
      <ellipse cx="55" cy="45" rx="5" ry="4" fill="#8b4513" />
      <ellipse cx="35" cy="65" rx="5" ry="4" fill="#8b4513" />
      <ellipse cx="75" cy="85" rx="5" ry="4" fill="#8b4513" />
      
      {/* Mario */}
      <g transform="translate(15, 82)">
        <rect x="0" y="0" width="6" height="8" fill="#ff0000" />
        <rect x="2" y="-3" width="2" height="3" fill="#ffcc99" />
        <rect x="1" y="-4" width="4" height="1" fill="#964b00" />
      </g>
      
      {/* Donkey Kong */}
      <g transform="translate(60, 18)">
        <rect x="0" y="0" width="20" height="12" fill="#8b4513" />
        <rect x="4" y="-6" width="12" height="6" fill="#8b4513" />
        <rect x="6" y="-8" width="2" height="2" fill="#000" />
        <rect x="12" y="-8" width="2" height="2" fill="#000" />
      </g>
      
      {/* Princess */}
      <g transform="translate(80, 20)">
        <rect x="0" y="0" width="5" height="8" fill="#ffb6c1" />
        <rect x="1" y="-3" width="3" height="3" fill="#ffcc99" />
        <rect x="1" y="-6" width="3" height="3" fill="#ffcc00" />
      </g>
    </svg>
  );
};

export default DonkeyKongSVG;