import React from 'react';
import { User, Upload } from 'lucide-react';
import EnhancedLIAAvatar from './EnhancedLIAAvatar';

const EnhancedMessageBubble = ({ message, isUser = false, documentRequest = null }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDocumentTypeIcon = (documentType) => {
    const icons = {
      financial_statements: '📊',
      income_reports: '💰',
      expense_reports: '📉',
      debt_lists: '📋',
      employee_cv: '👥',
      operational_reports: '⚙️',
      competitive_analysis: '🎯',
      marketing_reports: '📈',
      other: '📄'
    };
    return icons[documentType] || '📄';
  };

  if (isUser) {
    return (
      <div className="flex items-start space-x-3 mb-6 justify-end">
        <div className="flex flex-col items-end max-w-xs lg:max-w-md">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-md">
            <p className="text-sm font-medium">{message.content}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1">
            {formatTime(message.created_at)}
          </span>
        </div>
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    );
  }

  // Lia message
  return (
    <div className="flex items-start space-x-3 mb-6">
      <div className="flex-shrink-0">
        <EnhancedLIAAvatar 
          size="small" 
          mood={documentRequest ? 'professional' : 'friendly'}
        />
      </div>
      <div className="flex flex-col max-w-xs lg:max-w-md">
        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
          <p className="text-sm text-gray-800 leading-relaxed">
            {message.content}
          </p>
          
          {/* Document request indicator */}
          {documentRequest && (
            <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2">
                <span className="text-lg">
                  {getDocumentTypeIcon(documentRequest.document_type)}
                </span>
                <div className="flex-1">
                  <p className="text-xs font-medium text-blue-800">
                    Documento solicitado
                  </p>
                  <p className="text-xs text-blue-600">
                    {documentRequest.document_type.replace('_', ' ')}
                  </p>
                </div>
                <Upload className="h-4 w-4 text-blue-500" />
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs text-gray-500">
            Lia • {formatTime(message.created_at)}
          </span>
          {message.message_type === 'system' && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Sistema
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedMessageBubble;