import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MessageInput = ({ onSendMessage, disabled = false, placeholder = "Escribe tu respuesta..." }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // Voice recording functionality would be implemented here
    console.log('Voice recording:', !isRecording);
  };

  return (
    <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Voice Input Button */}
        <Button
          type="button"
          variant={isRecording ? "destructive" : "outline"}
          size="icon"
          onClick={handleVoiceToggle}
          disabled={disabled}
          className="flex-shrink-0"
          title={isRecording ? "Detener grabación" : "Grabar mensaje de voz"}
        >
          <Icon 
            name={isRecording ? "MicOff" : "Mic"} 
            size={18} 
          />
        </Button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 pr-12 bg-input border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm placeholder:text-muted-foreground"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          
          {/* Character Count */}
          {message.length > 0 && (
            <div className="absolute bottom-1 right-1 text-xs text-muted-foreground bg-background px-1 rounded">
              {message.length}
            </div>
          )}
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          variant="default"
          size="icon"
          disabled={!message.trim() || disabled}
          className="flex-shrink-0"
          title="Enviar mensaje"
        >
          <Icon name="Send" size={18} />
        </Button>
      </form>

      {/* Voice Recording Indicator */}
      {isRecording && (
        <div className="flex items-center justify-center mt-3 p-2 bg-destructive/10 text-destructive rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
            <span className="text-sm font-medium">Grabando...</span>
            <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageInput;