import React, { useState } from 'react';
import { HelpCircle, X, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface InfoTooltipProps {
  title: string;
  text: string;
  className?: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ title, text, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className={`text-stone-300 hover:text-[#D4A373] transition-colors p-1 rounded-full hover:bg-stone-100 ${className}`}
        aria-label="Информация"
      >
        <HelpCircle size={18} />
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[80] flex items-center justify-center p-6 bg-stone-900/20 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        >
          <div 
            className="bg-white w-full max-w-xs rounded-3xl p-6 shadow-2xl relative animate-scale-in border border-white/50"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-50 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mb-4 text-rose-400">
              <Sparkles size={20} />
            </div>

            <h3 className="text-xl font-serif text-stone-800 mb-3 pr-6">{title}</h3>
            <p className="text-stone-500 text-sm leading-relaxed mb-6">{text}</p>

            <Button 
              fullWidth 
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              variant="secondary"
              className="py-3 text-sm"
            >
              Понятно
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
