import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden px-6 py-3 rounded-full font-medium transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2 group";
  
  const variants = {
    primary: "bg-[#D4A373] text-white hover:bg-[#C29263] shadow-md hover:shadow-xl hover:shadow-[#D4A373]/20", // Warm Sand/Bronze
    secondary: "bg-[#E8DCCA] text-[#5C5C5C] hover:bg-[#DDD0BC] hover:shadow-md", // Soft Beige
    outline: "border-2 border-[#D4A373] text-[#D4A373] hover:bg-[#FFF8F0]",
    ghost: "bg-transparent text-[#8C8C8C] hover:bg-stone-100 hover:text-stone-600"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
      )}
    </button>
  );
};