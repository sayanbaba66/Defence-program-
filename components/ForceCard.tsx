import React from 'react';
import { DefenceCategory } from '../types';

interface ForceCardProps {
  category: DefenceCategory;
  onClick: () => void;
  logoUrl?: string; // App logo
}

const ForceCard: React.FC<ForceCardProps> = ({ category, onClick, logoUrl }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl h-64 w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
    >
      {/* Background - Subtle Pattern to make logo pop */}
      <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50 dark:opacity-20"></div>
      
      {/* Accent Line */}
      <div className={`absolute top-0 left-0 w-full h-1.5 ${category.color}`} />

      {/* Main Logo Image (Centered) */}
      <div className="absolute inset-0 flex items-center justify-center p-8 pb-16">
          <img 
            src={category.imageUrl} 
            alt={category.name} 
            className="w-full h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110 opacity-90 dark:opacity-80"
          />
      </div>

      {/* App Logo (Indian Flag) - Top Left */}
      {logoUrl && (
          <div className="absolute top-4 left-4 w-8 h-8 rounded-full overflow-hidden border border-gray-200 shadow-sm z-20 bg-white">
            <img src={logoUrl} alt="India Flag" className="w-full h-full object-cover" />
          </div>
      )}

      {/* Force Specific Logo - Top Right (If different from main image, but usually redundant if main is logo, keep for consistency) */}
      {category.specificLogoUrl && category.specificLogoUrl !== category.imageUrl && (
          <div className="absolute top-4 right-4 bg-white/80 dark:bg-black/50 backdrop-blur-sm p-1.5 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm z-20">
              <img src={category.specificLogoUrl} alt="Logo" className="w-8 h-8 object-contain" />
          </div>
      )}

      {/* Content Overlay */}
      <div className={`absolute inset-x-0 bottom-0 p-4 ${category.color} bg-opacity-95 backdrop-blur-sm transition-all duration-300 flex flex-col justify-end min-h-[80px]`}>
        <div className="flex items-center gap-3 text-white">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30 shrink-0">
                <i className={`fa-solid ${category.icon} text-sm`}></i>
            </div>
            <h3 className="text-xl font-bold leading-tight tracking-tight shadow-black drop-shadow-sm">
                {category.name}
            </h3>
        </div>
        <p className="text-xs text-white/80 mt-2 line-clamp-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto overflow-hidden">
            {category.description}
        </p>
      </div>
    </div>
  );
};

export default ForceCard;