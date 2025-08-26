import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentPreview = ({ content, onClose, onDeploy }) => {
  const [previewMode, setPreviewMode] = useState('conversation');
  const [currentStep, setCurrentStep] = useState(0);

  const mockConversation = [
    {
      type: 'ai',
      message: "¡Hola! Soy LIA, tu asistente de consultoría médica. Me alegra conocerte.",
      timestamp: new Date(Date.now() - 300000)
    },
    {
      type: 'ai',
      message: "Para poder ayudarte mejor, me gustaría conocer un poco sobre tu práctica médica. ¿Cuál es tu especialidad principal?",
      timestamp: new Date(Date.now() - 240000)
    },
    {
      type: 'user',
      message: "Soy cardiólogo con 15 años de experiencia",
      timestamp: new Date(Date.now() - 180000)
    },
    {
      type: 'ai',
      message: "Excelente, la cardiología es una especialidad fascinante y muy importante. Con 15 años de experiencia, seguramente has visto muchos casos interesantes.\n\n¿Cuáles dirías que son los principales desafíos que enfrentas actualmente en tu práctica?",
      timestamp: new Date(Date.now() - 120000)
    },
    {
      type: 'user',
      message: "Principalmente el marketing digital. No tengo tiempo para manejar redes sociales y atraer nuevos pacientes",
      timestamp: new Date(Date.now() - 60000)
    },
    {
      type: 'ai',
      message: "Entiendo perfectamente tu situación. Es muy común que los profesionales médicos se sientan abrumados con el marketing digital mientras quieren enfocarse en lo que mejor saben hacer: cuidar a sus pacientes.\n\n¿Has intentado alguna estrategia de marketing anteriormente?",
      timestamp: new Date()
    }
  ];

  const mockQuestions = [
    {
      id: 1,
      question: "¿Cuál es su especialidad médica principal?",
      type: "multiple_choice",
      options: ["Medicina General", "Cardiología", "Dermatología", "Pediatría", "Otro"],
      required: true
    },
    {
      id: 2,
      question: "¿Cuántos años de experiencia tiene en su práctica médica?",
      type: "range",
      min: 0,
      max: 50,
      required: true
    },
    {
      id: 3,
      question: "¿Cuáles son sus principales desafíos actuales?",
      type: "text",
      placeholder: "Describa brevemente los desafíos que enfrenta...",
      maxLength: 500,
      required: false
    }
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case 'multiple_choice': return 'List';
      case 'range': return 'BarChart3';
      case 'text': return 'Type';
      case 'boolean': return 'ToggleLeft';
      default: return 'HelpCircle';
    }
  };

  if (!content) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Vista Previa de Contenido</h3>
            <p className="text-sm text-muted-foreground">
              {content.name || 'Contenido sin nombre'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-muted rounded-lg p-1">
              <button
                onClick={() => setPreviewMode('conversation')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                  previewMode === 'conversation' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Conversación
              </button>
              <button
                onClick={() => setPreviewMode('questions')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                  previewMode === 'questions' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Preguntas
              </button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              className="text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {previewMode === 'conversation' ? (
            /* Conversation Preview */
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="MessageSquare" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Simulación de Conversación
                </span>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-4 space-y-4">
                {mockConversation.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${
                      message.type === 'user' ?'bg-primary text-primary-foreground' :'bg-background border border-border'
                    } rounded-lg p-3`}>
                      {message.type === 'ai' && (
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <Icon name="Bot" size={12} className="text-primary-foreground" />
                          </div>
                          <span className="text-xs font-medium text-primary">LIA</span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-line">{message.message}</p>
                      <p className={`text-xs mt-2 ${
                        message.type === 'user' ?'text-primary-foreground/70' :'text-muted-foreground'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                <div className="flex justify-start">
                  <div className="bg-background border border-border rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="Bot" size={12} className="text-primary-foreground" />
                      </div>
                      <span className="text-xs font-medium text-primary">LIA</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      <span className="text-xs text-muted-foreground ml-2">escribiendo...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Questions Preview */
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="HelpCircle" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Plantillas de Preguntas
                </span>
              </div>

              {mockQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className="bg-muted/30 rounded-lg p-4 border border-border"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Icon name={getQuestionTypeIcon(question.type)} size={16} className="text-primary" />
                      <span className="text-xs font-medium text-primary uppercase">
                        {question.type.replace('_', ' ')}
                      </span>
                      {question.required && (
                        <span className="text-xs text-error">*</span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Pregunta {index + 1}
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-medium text-foreground mb-3">
                    {question.question}
                  </h4>

                  {/* Question Type Specific Preview */}
                  {question.type === 'multiple_choice' && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex items-center space-x-2 p-2 bg-background rounded border border-border/50"
                        >
                          <div className="w-4 h-4 border-2 border-primary rounded-full" />
                          <span className="text-sm text-foreground">{option}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === 'range' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Mínimo: {question.min}</span>
                        <span>Máximo: {question.max}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full w-1/3" />
                      </div>
                    </div>
                  )}

                  {question.type === 'text' && (
                    <div className="bg-background border border-border rounded-lg p-3">
                      <p className="text-sm text-muted-foreground">
                        {question.placeholder}
                      </p>
                      {question.maxLength && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Máximo {question.maxLength} caracteres
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>Esta es una vista previa del contenido antes del despliegue</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cerrar
            </Button>
            <Button
              variant="default"
              onClick={() => onDeploy(content)}
              iconName="Rocket"
              iconPosition="left"
            >
              Desplegar a Producción
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPreview;