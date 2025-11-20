import React, { useMemo } from 'react';
import { Flower } from 'lucide-react';
import { BeautifulFlower, FlowerType } from './BeautifulFlower';

interface GardenProps {
  flowerCount: number;
}

// Pastel and Vibrant colors for flowers
const FLOWER_COLORS = [
  "text-rose-400",
  "text-pink-400",
  "text-purple-400",
  "text-amber-400",
  "text-red-400",
  "text-yellow-400",
  "text-orange-400"
];

const FLOWER_TYPES: FlowerType[] = ['rose', 'daisy', 'tulip', 'lily', 'sunflower', 'poppy'];

export const Garden: React.FC<GardenProps> = ({ flowerCount }) => {
  // Memoize flower positions so they don't jump around on re-render
  // Using a stable generation strategy: items are deterministic based on index
  const flowers = useMemo(() => {
    const items = [];
    // Limit rendering to last 50 flowers for performance, but visual variety
    const maxRender = 50;
    const startIdx = Math.max(0, flowerCount - maxRender);
    
    for (let i = startIdx; i < flowerCount; i++) {
        // Use a pseudo-random generator seeded by index 'i' to keep positions stable
        const seed = i * 123.45;
        const rand = (n: number) => {
            const x = Math.sin(seed + n) * 10000;
            return x - Math.floor(x);
        };

        items.push({
            id: i,
            left: `${10 + rand(1) * 80}%`, // 10% - 90%
            top: `${25 + rand(2) * 55}%`, // 25% - 80%
            scale: 0.8 + rand(3) * 0.7, // 0.8 - 1.5
            type: FLOWER_TYPES[Math.floor(rand(4) * FLOWER_TYPES.length)],
            color: FLOWER_COLORS[Math.floor(rand(5) * FLOWER_COLORS.length)],
            delay: rand(6) * 2, // 0-2s delay for animation start
            swayDuration: 4 + rand(7) * 3, // 4-7s sway
            zIndex: Math.floor(rand(2) * 100) // base z-index
        });
    }
    // Sort by top (y-axis) so closer flowers (higher top value) are on top (higher z-index)
    return items.sort((a, b) => parseFloat(a.top) - parseFloat(b.top));
  }, [flowerCount]);

  // Fireflies / Particles
  const fireflies = useMemo(() => {
      return Array.from({ length: 8 }).map((_, i) => ({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 80}%`,
          delay: Math.random() * 5
      }));
  }, []);

  return (
    <div className="w-full aspect-square max-w-md mx-auto rounded-[2.5rem] relative overflow-hidden shadow-[inset_0_2px_20px_rgba(0,0,0,0.05)] mt-4 transition-all duration-500 group ring-4 ring-white ring-opacity-40">
      
      {/* Background Layers */}
      {/* 1. Base Soft Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-green-50 to-emerald-100/80"></div>
      
      {/* 2. Dreamy Lights (Bokeh) */}
      <div className="absolute inset-0">
          <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-rose-100/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-amber-100/40 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-[40%] left-[30%] w-32 h-32 bg-white rounded-full blur-[50px] opacity-60"></div>
      </div>

      {/* 3. Sunbeams */}
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(255,255,255,0.2)_0deg,transparent_25deg,rgba(255,255,255,0.2)_50deg,transparent_75deg)] animate-[spin_60s_linear_infinite] pointer-events-none opacity-40 mix-blend-overlay"></div>

      {/* Fireflies */}
      <div className="absolute inset-0 pointer-events-none">
          {fireflies.map(f => (
              <div 
                key={f.id}
                className="absolute w-1.5 h-1.5 bg-yellow-200 rounded-full blur-[1px] animate-firefly shadow-[0_0_4px_rgba(253,224,71,0.8)]"
                style={{
                    left: f.left,
                    top: f.top,
                    animationDelay: `${f.delay}s`
                }}
              />
          ))}
      </div>

      {/* Empty State */}
      {flowers.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-800/30 animate-fade-in z-10">
            <Flower size={48} className="mb-2 opacity-40 animate-float" />
            <p className="text-sm font-medium font-serif tracking-wide">Сад ждёт первых семян</p>
            <p className="text-xs mt-2 opacity-70 max-w-[200px] text-center">Выполни практику, чтобы здесь расцвел первый цветок</p>
        </div>
      )}

      {/* Flowers Layer */}
      <div className="absolute inset-0 z-10">
        {flowers.map((f, i) => (
          <div
            key={f.id}
            className="absolute transition-all duration-500 ease-out hover:z-50 cursor-pointer group/flower"
            style={{
              left: f.left,
              top: f.top,
              transformOrigin: 'bottom center',
              zIndex: 10 + i, // Ensure layered correctly
            }}
          >
             <div 
               className="origin-bottom relative"
               style={{
                 transform: `scale(${f.scale})`,
                 animation: `bloom 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${f.delay}s forwards, sway ${f.swayDuration}s ease-in-out infinite` 
               }}
             >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-white/30 blur-xl rounded-full opacity-0 group-hover/flower:opacity-100 transition-opacity duration-500 scale-150"></div>
                
                <BeautifulFlower type={f.type} color={f.color} className="w-14 h-14 sm:w-20 sm:h-20 drop-shadow-sm" />
             </div>
          </div>
        ))}
      </div>
      
      {/* Foreground Elements - Depth of Field */}
      {/* Blurry grass blades in foreground */}
      <div className="absolute bottom-0 left-0 right-0 h-16 z-20 pointer-events-none flex justify-around items-end opacity-40">
          <div className="w-2 h-12 bg-emerald-300 rounded-t-full blur-[2px] transform -rotate-6"></div>
          <div className="w-3 h-16 bg-green-300 rounded-t-full blur-[3px] transform rotate-3"></div>
          <div className="w-2 h-10 bg-emerald-200 rounded-t-full blur-[2px] transform -rotate-12"></div>
          <div className="w-4 h-14 bg-green-200 rounded-t-full blur-[3px] transform rotate-6"></div>
          <div className="w-2 h-8 bg-emerald-300 rounded-t-full blur-[2px] transform -rotate-3"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/40 to-transparent pointer-events-none z-30"></div>
      
      {/* Glass Overlay / Highlight */}
      <div className="absolute inset-0 border-[6px] border-white/30 rounded-[2.5rem] pointer-events-none z-40 shadow-[inset_0_0_20px_rgba(255,255,255,0.5)]"></div>
    </div>
  );
};