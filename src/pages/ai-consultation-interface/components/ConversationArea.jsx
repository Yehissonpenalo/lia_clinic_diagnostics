import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import QuickResponseButtons from './QuickResponseButtons';

const ConversationArea = ({ 
  messages = [], 
  isLIATyping = false, 
  quickResponses = [], 
  onQuickResponse,
  liaTypingMessage = ""
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLIATyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {/* Welcome Message */}
      {messages.length === 0 && !isLIATyping && (
        <div className="text-center py-8">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary-foreground"
              >
                <path
                  d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              ¡Hola! Soy LIA
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tu consultora de IA especializada en clínicas de salud. Estoy aquí para ayudarte a evaluar la situación actual de tu clínica y encontrar las mejores soluciones para hacer crecer tu negocio.
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id || index}
          message={message.content}
          isLIA={message.sender === 'lia'}
          timestamp={message.timestamp}
          mood={message.mood || 'friendly'}
        />
      ))}

      {/* LIA Typing Indicator */}
      {isLIATyping && (
        <MessageBubble
          isLIA={true}
          isTyping={true}
          mood="thinking"
        />
      )}

      {/* Quick Response Buttons */}
      {quickResponses.length > 0 && !isLIATyping && (
        <div className="px-4">
          <QuickResponseButtons
            options={quickResponses}
            onSelect={onQuickResponse}
            disabled={isLIATyping}
          />
        </div>
      )}

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ConversationArea;