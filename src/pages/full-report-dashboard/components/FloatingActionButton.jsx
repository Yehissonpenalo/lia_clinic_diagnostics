import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FloatingActionButton = ({ onDownloadPDF, onContactYehisson }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await onDownloadPDF();
    } finally {
      setIsDownloading(false);
      setIsExpanded(false);
    }
  };

  const handleContact = (method) => {
    onContactYehisson(method);
    setIsExpanded(false);
  };

  const actions = [
    {
      id: 'download',
      label: 'Descargar PDF',
      icon: 'Download',
      color: 'primary',
      onClick: handleDownload,
      disabled: isDownloading
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'success',
      onClick: () => handleContact('whatsapp')
    },
    {
      id: 'email',
      label: 'Email',
      icon: 'Mail',
      color: 'secondary',
      onClick: () => handleContact('email')
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: 'Instagram',
      color: 'accent',
      onClick: () => handleContact('instagram')
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 mb-2">
          {actions.map((action, index) => (
            <div
              key={action.id}
              className="flex items-center space-x-3 animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="bg-card text-foreground px-3 py-2 rounded-lg text-sm font-medium shadow-lg border border-border whitespace-nowrap">
                {action.label}
              </span>
              <button
                onClick={action.onClick}
                disabled={action.disabled}
                className={`w-12 h-12 bg-${action.color} text-${action.color}-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
                title={action.label}
              >
                {action.id === 'download' && isDownloading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                ) : (
                  <Icon name={action.icon} size={20} />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
          isExpanded ? 'rotate-45' : 'rotate-0'
        }`}
        aria-label={isExpanded ? 'Cerrar menú' : 'Abrir menú de acciones'}
      >
        <Icon name={isExpanded ? 'X' : 'Plus'} size={24} />
      </button>

      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionButton;