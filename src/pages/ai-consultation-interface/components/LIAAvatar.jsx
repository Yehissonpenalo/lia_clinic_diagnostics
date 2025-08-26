import React from 'react';


const LIAAvatar = ({ isTyping = false, mood = 'friendly' }) => {
  const avatarMoods = {
    friendly: {
      bgColor: 'bg-gradient-to-br from-primary to-secondary',
      iconColor: 'text-primary-foreground',
      pulseColor: 'bg-primary/20'
    },
    thinking: {
      bgColor: 'bg-gradient-to-br from-accent to-warning',
      iconColor: 'text-accent-foreground',
      pulseColor: 'bg-accent/20'
    },
    empathetic: {
      bgColor: 'bg-gradient-to-br from-secondary to-primary',
      iconColor: 'text-secondary-foreground',
      pulseColor: 'bg-secondary/20'
    }
  };

  const currentMood = avatarMoods[mood] || avatarMoods.friendly;

  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse Animation for Typing */}
      {isTyping && (
        <div className={`absolute inset-0 rounded-full ${currentMood.pulseColor} animate-ping`} />
      )}
      
      {/* Avatar Container */}
      <div className={`relative w-12 h-12 ${currentMood.bgColor} rounded-full flex items-center justify-center shadow-lg`}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={currentMood.iconColor}
        >
          <path
            d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
            fill="currentColor"
          />
          <path
            d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z"
            fill="currentColor"
            opacity="0.7"
          />
          <path
            d="M5 6L5.5 8.5L8 9L5.5 9.5L5 12L4.5 9.5L2 9L4.5 8.5L5 6Z"
            fill="currentColor"
            opacity="0.7"
          />
        </svg>
        
        {/* Status Indicator */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background flex items-center justify-center">
          <div className="w-2 h-2 bg-success-foreground rounded-full" />
        </div>
      </div>

      {/* Typing Indicator */}
      {isTyping && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-1 px-3 py-2 bg-muted rounded-full">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LIAAvatar;