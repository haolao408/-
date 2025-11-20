import React, { useMemo } from 'react';

export type FlowerType = 'rose' | 'daisy' | 'tulip' | 'lily' | 'sunflower' | 'poppy';

interface BeautifulFlowerProps {
  type: FlowerType;
  color: string; // expects a tailwind color class like "text-rose-400"
  className?: string;
}

// Define vibrant, saturated palettes for better visibility against light backgrounds
const getPalette = (twClass: string) => {
  // Shifted to 500/600/700 ranges for better contrast
  if (twClass.includes('rose')) return { main: '#F43F5E', dark: '#BE123C', accent: '#FB7185', light: '#FECDD3', center: '#881337' }; // Rose
  if (twClass.includes('pink')) return { main: '#EC4899', dark: '#BE185D', accent: '#F472B6', light: '#FBCFE8', center: '#831843' }; // Pink
  if (twClass.includes('purple')) return { main: '#A855F7', dark: '#7E22CE', accent: '#C084FC', light: '#E9D5FF', center: '#581C87' }; // Purple
  if (twClass.includes('amber')) return { main: '#F59E0B', dark: '#B45309', accent: '#FBBF24', light: '#FDE68A', center: '#78350F' }; // Amber
  if (twClass.includes('red')) return { main: '#EF4444', dark: '#B91C1C', accent: '#F87171', light: '#FEE2E2', center: '#7F1D1D' }; // Red
  if (twClass.includes('yellow')) return { main: '#FACC15', dark: '#CA8A04', accent: '#FEF08A', light: '#FEF9C3', center: '#422006' }; // Yellow
  if (twClass.includes('orange')) return { main: '#F97316', dark: '#C2410C', accent: '#FDBA74', light: '#FFEDD5', center: '#431407' }; // Orange
  
  // Fallback - Rose
  return { main: '#F43F5E', dark: '#BE123C', accent: '#FB7185', light: '#FECDD3', center: '#881337' };
};

export const BeautifulFlower: React.FC<BeautifulFlowerProps> = ({ type, color, className }) => {
  const palette = getPalette(color);
  const id = useMemo(() => Math.random().toString(36).substr(2, 9), []);

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`drop-shadow-md ${className}`} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`petal_grad_${id}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(90) scale(50)">
          <stop stopColor={palette.accent} />
          <stop offset="0.6" stopColor={palette.main} />
          <stop offset="1" stopColor={palette.dark} />
        </radialGradient>
        
        <linearGradient id={`stem_grad_${id}`} x1="50" y1="100" x2="50" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#166534" /> {/* Green 800 */}
            <stop offset="0.5" stopColor="#15803d" /> {/* Green 700 */}
            <stop offset="1" stopColor="#22c55e" /> {/* Green 500 */}
        </linearGradient>

        {/* Improved drop shadow for better separation from background */}
        <filter id={`shadow_${id}`} x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="rgba(0,0,0,0.2)" />
        </filter>
      </defs>

      {/* Stem: Darker and more defined */}
      <path 
        d="M50 100 C 50 90, 52 70, 50 55" 
        stroke={`url(#stem_grad_${id})`} 
        strokeWidth="3" 
        strokeLinecap="round" 
      />

      {/* Leaves: Richer green */}
      <g>
          <path d="M50 85 Q 35 80 30 65 Q 45 75 50 85" fill="#4ADE80" stroke="#166534" strokeWidth="0.5" />
          <path d="M50 90 Q 70 85 75 70 Q 55 80 50 90" fill="#22C55E" stroke="#166534" strokeWidth="0.5" />
      </g>

      {/* Flower Head */}
      <g transform="translate(0, -10)" filter={`url(#shadow_${id})`}>
        
        {type === 'rose' && (
          <g transform="translate(0, 5)">
            {/* Back/Outer petals - Darker for depth */}
            <path d="M30 40 C 20 60 80 60 70 40 C 65 30 35 30 30 40" fill={palette.dark} />
            
            {/* Middle petals */}
            <path d="M35 45 C 25 65 75 65 65 45 C 60 35 40 35 35 45" fill={palette.main} />
            
            {/* Center Spiral */}
            <circle cx="50" cy="45" r="15" fill={palette.accent} />
            
            {/* Detail lines for spiral effect */}
            <path d="M50 45 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0" stroke={palette.center} strokeWidth="1.5" fill="none" />
            <path d="M50 45 m-7,0 a7,7 0 1,0 14,0 a7,7 0 1,0 -14,0" stroke={palette.center} strokeWidth="1.5" fill="none" />
            
            {/* Highlight for glossiness */}
            <ellipse cx="45" cy="40" rx="5" ry="3" fill="white" fillOpacity="0.4" transform="rotate(-30 45 40)" />
          </g>
        )}

        {type === 'daisy' && (
          <g transform="translate(0, 5)">
            {/* Outer Petals */}
            <g>
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((rot, i) => (
                <ellipse 
                    key={`p1-${i}`}
                    cx="50" 
                    cy="50" 
                    rx="4" 
                    ry="18" 
                    transform={`rotate(${rot} 50 50)`} 
                    fill={palette.light} 
                    stroke={palette.dark}
                    strokeWidth="0.25"
                    strokeOpacity="0.3"
                />
                ))}
            </g>
            {/* Inner Petals */}
            <g>
                {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((rot, i) => (
                <ellipse 
                    key={`p2-${i}`}
                    cx="50" 
                    cy="50" 
                    rx="3" 
                    ry="14" 
                    transform={`rotate(${rot} 50 50)`} 
                    fill={palette.accent}
                    stroke={palette.dark}
                    strokeWidth="0.25" 
                    strokeOpacity="0.2"
                />
                ))}
            </g>
            {/* Center */}
            <circle cx="50" cy="50" r="8" fill={palette.center} />
            <circle cx="50" cy="50" r="6" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
          </g>
        )}

        {type === 'tulip' && (
          <g transform="translate(0, 0)">
             {/* Back petal */}
             <path d="M40 30 Q 50 10 60 30 L 50 60 Z" fill={palette.dark} />
             {/* Left petal */}
             <path d="M50 65 Q 25 60 30 30 Q 40 15 50 35" fill={palette.main} stroke={palette.dark} strokeWidth="0.5" />
             {/* Right petal */}
             <path d="M50 65 Q 75 60 70 30 Q 60 15 50 35" fill={palette.accent} stroke={palette.dark} strokeWidth="0.5" />
             {/* Center shadow/seam */}
             <path d="M50 65 L 50 45" stroke={palette.dark} strokeWidth="1" opacity="0.5" />
          </g>
        )}

        {type === 'lily' && (
           <g transform="translate(0, 5)">
             {/* Back petals */}
             <path d="M50 50 Q 25 35 15 15 Q 40 25 50 50" fill={palette.dark} />
             <path d="M50 50 Q 75 35 85 15 Q 60 25 50 50" fill={palette.dark} />
             <path d="M50 50 Q 50 20 50 5" fill={palette.dark} />
             
             {/* Front petals */}
             <path d="M50 50 Q 30 60 20 70 Q 40 60 50 50" fill={palette.main} stroke={palette.dark} strokeWidth="0.5" />
             <path d="M50 50 Q 70 60 80 70 Q 60 60 50 50" fill={palette.main} stroke={palette.dark} strokeWidth="0.5" />
             
             {/* Center petal */}
             <path d="M50 50 Q 50 70 50 85" fill={palette.accent} stroke={palette.dark} strokeWidth="0.5" />

             {/* Stamens - High contrast */}
             <path d="M50 50 L 40 35" stroke="#78350F" strokeWidth="1" />
             <circle cx="40" cy="35" r="2" fill="#D97706" />
             <path d="M50 50 L 60 35" stroke="#78350F" strokeWidth="1" />
             <circle cx="60" cy="35" r="2" fill="#D97706" />
             <path d="M50 50 L 50 30" stroke="#78350F" strokeWidth="1" />
             <circle cx="50" cy="30" r="2" fill="#D97706" />
           </g>
        )}

        {type === 'sunflower' && (
          <g transform="translate(0, 5)">
            {/* Outer Petals Layer 1 */}
            <g>
              {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((rot, i) => (
                <ellipse 
                  key={`sf1-${i}`}
                  cx="50" 
                  cy="50" 
                  rx="3" 
                  ry="22" 
                  transform={`rotate(${rot} 50 50)`} 
                  fill={palette.dark} 
                />
              ))}
            </g>
            {/* Inner Petals Layer 2 (Offset) */}
            <g transform="rotate(10 50 50)">
              {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((rot, i) => (
                <ellipse 
                  key={`sf2-${i}`}
                  cx="50" 
                  cy="50" 
                  rx="3" 
                  ry="18" 
                  transform={`rotate(${rot} 50 50)`} 
                  fill={palette.main} 
                />
              ))}
            </g>
            
            {/* Large Dark Center */}
            <circle cx="50" cy="50" r="12" fill={palette.center} />
            
            {/* Seeds texture */}
            <circle cx="50" cy="50" r="10" fill="none" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="1 1" />
            <circle cx="50" cy="50" r="7" fill="none" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="1 1" />
            <circle cx="50" cy="50" r="4" fill="none" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="1 1" />
          </g>
        )}

        {type === 'poppy' && (
          <g transform="translate(0, 5)">
            {/* Large wide organic petals */}
            <path d="M50 50 Q 20 40 15 60 Q 10 85 45 80 Z" fill={palette.main} stroke={palette.dark} strokeWidth="0.5" />
            <path d="M50 50 Q 80 40 85 60 Q 90 85 55 80 Z" fill={palette.main} stroke={palette.dark} strokeWidth="0.5" />
            <path d="M50 50 Q 20 40 25 20 Q 50 5 50 50 Z" fill={palette.accent} stroke={palette.dark} strokeWidth="0.5" />
            <path d="M50 50 Q 80 40 75 20 Q 50 5 50 50 Z" fill={palette.accent} stroke={palette.dark} strokeWidth="0.5" />

            {/* Dark Center */}
            <circle cx="50" cy="50" r="7" fill={palette.center} />
            
            {/* Stamens around center */}
            <circle cx="50" cy="50" r="9" fill="none" stroke={palette.center} strokeWidth="1" strokeDasharray="0.5 3" />
          </g>
        )}

      </g>
    </svg>
  );
};