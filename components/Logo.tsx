import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo_grad_rose" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="100%" stopColor="#F43F5E" />
        </linearGradient>
        <linearGradient id="logo_grad_amber" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="logo_grad_green" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Circle Frame */}
      <circle cx="100" cy="100" r="96" stroke="#D4A373" strokeWidth="2" strokeOpacity="0.3" />
      
      {/* Central Harmony */}
      <g filter="url(#glow)">
          {/* Left Figure */}
          <path 
            d="M70 80 Q 60 90 50 120 Q 60 150 80 160" 
            fill="url(#logo_grad_rose)" 
            opacity="0.8" 
          />
          <circle cx="65" cy="75" r="12" fill="url(#logo_grad_rose)" />
          
          {/* Right Figure */}
          <path 
            d="M130 80 Q 140 90 150 120 Q 140 150 120 160" 
            fill="url(#logo_grad_amber)" 
            opacity="0.8" 
          />
          <circle cx="135" cy="75" r="12" fill="url(#logo_grad_amber)" />
          
          {/* Center Figure */}
          <path 
            d="M100 60 Q 85 90 90 130 Q 100 140 110 130 Q 115 90 100 60" 
            fill="url(#logo_grad_green)" 
            opacity="0.8" 
          />
          <circle cx="100" cy="50" r="12" fill="url(#logo_grad_green)" />

          {/* Connection Curve */}
          <path 
            d="M50 120 Q 100 140 150 120" 
            stroke="#D4A373" 
            strokeWidth="2" 
            strokeLinecap="round" 
            opacity="0.5"
            fill="none"
          />
      </g>
    </svg>
  );
};
