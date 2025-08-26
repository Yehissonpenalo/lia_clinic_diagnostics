import React from 'react';
import { Heart, Sparkles, Brain } from 'lucide-react';

const EnhancedLIAAvatar = ({ size = 'medium', isTyping = false, mood = 'friendly' }) => {
  const sizeClasses = {
    small: 'h-12 w-12',
    medium: 'h-16 w-16',
    large: 'h-24 w-24',
    xl: 'h-32 w-32'
  };

  const moodColors = {
    friendly: 'from-blue-500 to-purple-600',
    analytical: 'from-purple-600 to-indigo-700',
    caring: 'from-pink-500 to-purple-600',
    professional: 'from-blue-600 to-cyan-600'
  };

  const moodIcons = {
    friendly: Heart,
    analytical: Brain,
    caring: Heart,
    professional: Sparkles
  };

  const IconComponent = moodIcons[mood];

  return (
    <div className="relative">
      <div 
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          bg-gradient-to-r 
          ${moodColors[mood]} 
          flex 
          items-center 
          justify-center 
          shadow-lg 
          ${isTyping ? 'animate-pulse' : ''}
          transition-all 
          duration-300 
          hover:shadow-xl
        `}
      >
        <div className={`
          ${size === 'small' ? 'h-10 w-10' : size === 'medium' ? 'h-14 w-14' : size === 'large' ? 'h-20 w-20' : 'h-28 w-28'} 
          rounded-full 
          bg-white 
          flex 
          items-center 
          justify-center 
          shadow-inner
        `}>
          <IconComponent 
            className={`
              ${size === 'small' ? 'h-5 w-5' : size === 'medium' ? 'h-7 w-7' : size === 'large' ? 'h-10 w-10' : 'h-14 w-14'} 
              ${moodColors[mood].includes('blue') ? 'text-blue-500' : 
                moodColors[mood].includes('purple') ? 'text-purple-500' : 
                moodColors[mood].includes('pink') ? 'text-pink-500' : 'text-blue-500'}
            `} 
          />
        </div>
      </div>

      {/* Lia Label */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
        <span className="text-xs font-medium text-gray-600 bg-white px-2 py-1 rounded-full shadow-sm border">
          Lia
        </span>
      </div>

      {/* Typing indicator */}
      {isTyping && (
        <div className="absolute -bottom-2 -right-2">
          <div className="bg-green-500 h-4 w-4 rounded-full flex items-center justify-center">
            <div className="flex space-x-0.5">
              <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Sparkle effects for professional mood */}
      {mood === 'professional' && (
        <div className="absolute inset-0 pointer-events-none">
          <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
          <Sparkles className="absolute -bottom-1 -left-1 h-3 w-3 text-blue-400 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      )}
    </div>
  );
};

export default EnhancedLIAAvatar;