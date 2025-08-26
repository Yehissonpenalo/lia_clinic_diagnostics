import React from 'react';
import LIAAvatar from './LIAAvatar';

const MessageBubble = ({ 
  message, 
  isLIA = false, 
  timestamp, 
  isTyping = false,
  mood = 'friendly'
}) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLIA) {
    return (
      <div className="flex items-start space-x-3 mb-6">
        <LIAAvatar isTyping={isTyping} mood={mood} />
        <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg">
          {!isTyping && (
            <>
              <div className="bg-primary text-primary-foreground rounded-2xl rounded-tl-md px-4 py-3 shadow-soft">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
              </div>
              {timestamp && (
                <p className="text-xs text-muted-foreground mt-1 ml-2">
                  LIA • {formatTime(timestamp)}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-end space-x-3 mb-6">
      <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg">
        <div className="bg-muted text-foreground rounded-2xl rounded-tr-md px-4 py-3 shadow-soft ml-auto">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        </div>
        {timestamp && (
          <p className="text-xs text-muted-foreground mt-1 mr-2 text-right">
            Tú • {formatTime(timestamp)}
          </p>
        )}
      </div>
      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
        <span className="text-secondary-foreground font-medium text-sm">Tú</span>
      </div>
    </div>
  );
};

export default MessageBubble;