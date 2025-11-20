import React from 'react';
import { NavigationTab } from '../types';
import { Home, Feather, Flower2, BookOpen, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  // Updated navigation items: Removed Community, kept Library (Knowledge)
  const navItems = [
    { id: 'home', label: 'День', icon: Home },
    { id: 'practices', label: 'Практики', icon: Feather },
    { id: 'garden', label: 'Сад', icon: Flower2 },
    { id: 'journal', label: 'Дневник', icon: BookOpen },
    { id: 'library', label: 'Знания', icon: User },
  ];

  return (
    <div className="h-screen bg-stone-50 flex flex-col font-sans text-stone-800 max-w-lg mx-auto shadow-2xl relative overflow-hidden">
       {/* Decorative background elements with float animation */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] bg-rose-100/40 rounded-full blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[30%] bg-amber-50/50 rounded-full blur-3xl pointer-events-none animate-float-delayed"></div>

      <main className="flex-1 overflow-y-auto pb-24 relative z-10 scroll-smooth">
        {/* Key added to trigger animation on tab switch */}
        <div key={activeTab} className="min-h-full">
            {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-stone-100 px-2 py-3 flex justify-around items-center z-50 pb-8 pt-3 safe-area-bottom shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id as NavigationTab)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 group min-w-[3rem] ${
                isActive ? 'text-[#D4A373]' : 'text-stone-400 hover:text-stone-500'
              }`}
            >
              <div className={`relative p-1 transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-1' : 'group-hover:scale-105'}`}>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className={`transition-all duration-300 ${isActive ? 'drop-shadow-sm' : ''}`}/>
                  {isActive && (
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#D4A373] rounded-full animate-scale-in"></span>
                  )}
              </div>
              <span className={`text-[9px] font-medium tracking-wide transition-all duration-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-70'}`}>
                  {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
