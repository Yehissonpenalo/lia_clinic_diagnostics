import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const KnowledgeBase = ({ onPreviewContent }) => {
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const conversationFlows = [
    {
      id: 1,
      name: "Flujo de Consulta Inicial",
      description: "Preguntas introductorias para nuevos usuarios",
      questions: 8,
      responses: 24,
      lastUpdated: "2025-01-22",
      status: "active",
      usage: 89
    },
    {
      id: 2,
      name: "Evaluación de Síntomas",
      description: "Preguntas específicas sobre síntomas del paciente",
      questions: 15,
      responses: 45,
      lastUpdated: "2025-01-20",
      status: "active",
      usage: 156
    },
    {
      id: 3,
      name: "Análisis de Marketing",
      description: "Evaluación de estrategias de marketing actuales",
      questions: 12,
      responses: 36,
      lastUpdated: "2025-01-18",
      status: "draft",
      usage: 23
    }
  ];

  const questionTemplates = [
    {
      id: 1,
      flowId: 1,
      question: "¿Cuál es su especialidad médica principal?",
      type: "multiple_choice",
      options: ["Medicina General", "Cardiología", "Dermatología", "Pediatría", "Otro"],
      required: true,
      order: 1
    },
    {
      id: 2,
      flowId: 1,
      question: "¿Cuántos años de experiencia tiene en su práctica médica?",
      type: "range",
      min: 0,
      max: 50,
      required: true,
      order: 2
    },
    {
      id: 3,
      flowId: 1,
      question: "Describa brevemente los principales desafíos que enfrenta en su clínica",
      type: "text",
      maxLength: 500,
      required: false,
      order: 3
    }
  ];

  const responsePatterns = [
    {
      id: 1,
      trigger: "síntomas cardiovasculares",
      response: `Entiendo que está preocupado por síntomas cardiovasculares. Es importante que evaluemos esto cuidadosamente.\n\n¿Podría describir específicamente qué síntomas ha observado en sus pacientes?`,
      tone: "empathetic",
      followUp: ["¿Con qué frecuencia ocurren?", "¿Hay factores desencadenantes?"]
    },
    {
      id: 2,
      trigger: "marketing digital",
      response: `El marketing digital para clínicas requiere un enfoque especializado. Me alegra que esté considerando esta área.\n\n¿Qué estrategias de marketing ha intentado anteriormente?`,
      tone: "supportive",
      followUp: ["¿Cuál fue el resultado?", "¿Qué presupuesto maneja?"]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'draft': return 'text-warning bg-warning/10';
      case 'inactive': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
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

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Base de Conocimiento de LIA</h3>
        <p className="text-sm text-muted-foreground">
          Gestiona flujos de conversación, plantillas de preguntas y patrones de respuesta
        </p>
      </div>

      {/* Knowledge Base Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="GitBranch" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Flujos</span>
          </div>
          <p className="text-2xl font-bold text-primary">{conversationFlows.length}</p>
        </div>
        <div className="bg-secondary/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="HelpCircle" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-foreground">Preguntas</span>
          </div>
          <p className="text-2xl font-bold text-secondary">
            {conversationFlows.reduce((sum, flow) => sum + flow.questions, 0)}
          </p>
        </div>
        <div className="bg-accent/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="MessageSquare" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Respuestas</span>
          </div>
          <p className="text-2xl font-bold text-accent">
            {conversationFlows.reduce((sum, flow) => sum + flow.responses, 0)}
          </p>
        </div>
        <div className="bg-success/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Activity" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Uso Total</span>
          </div>
          <p className="text-2xl font-bold text-success">
            {conversationFlows.reduce((sum, flow) => sum + flow.usage, 0)}
          </p>
        </div>
      </div>

      {/* Conversation Flows */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-semibold text-foreground">Flujos de Conversación</h4>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={() => console.log('Add new flow')}
          >
            Nuevo Flujo
          </Button>
        </div>
        <div className="space-y-3">
          {conversationFlows.map((flow) => (
            <div
              key={flow.id}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                selectedFlow === flow.id
                  ? 'border-primary bg-primary/5' :'border-border bg-muted/30 hover:bg-muted/50'
              }`}
              onClick={() => setSelectedFlow(selectedFlow === flow.id ? null : flow.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h5 className="text-sm font-medium text-foreground">{flow.name}</h5>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(flow.status)}`}>
                      {flow.status === 'active' ? 'Activo' : flow.status === 'draft' ? 'Borrador' : 'Inactivo'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{flow.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{flow.questions} preguntas</span>
                    <span>•</span>
                    <span>{flow.responses} respuestas</span>
                    <span>•</span>
                    <span>Usado {flow.usage} veces</span>
                    <span>•</span>
                    <span>Actualizado: {flow.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPreviewContent(flow);
                    }}
                    iconName="Eye"
                    className="text-muted-foreground hover:text-foreground"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Edit flow', flow.id);
                    }}
                    iconName="Edit"
                    className="text-muted-foreground hover:text-foreground"
                  />
                  <Icon 
                    name={selectedFlow === flow.id ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-muted-foreground" 
                  />
                </div>
              </div>

              {/* Expanded Flow Details */}
              {selectedFlow === flow.id && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Question Templates */}
                    <div>
                      <h6 className="text-sm font-medium text-foreground mb-3">Plantillas de Preguntas</h6>
                      <div className="space-y-2">
                        {questionTemplates
                          .filter(q => q.flowId === flow.id)
                          .map((question) => (
                            <div
                              key={question.id}
                              className="p-3 bg-background rounded-lg border border-border"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <Icon name={getQuestionTypeIcon(question.type)} size={14} className="text-primary" />
                                  <span className="text-xs font-medium text-primary">
                                    {question.type.replace('_', ' ').toUpperCase()}
                                  </span>
                                  {question.required && (
                                    <span className="text-xs text-error">*</span>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingQuestion(question.id)}
                                  iconName="Edit"
                                  className="text-muted-foreground hover:text-foreground"
                                />
                              </div>
                              <p className="text-xs text-foreground mb-2">{question.question}</p>
                              {question.options && (
                                <div className="flex flex-wrap gap-1">
                                  {question.options.slice(0, 3).map((option, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded"
                                    >
                                      {option}
                                    </span>
                                  ))}
                                  {question.options.length > 3 && (
                                    <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                                      +{question.options.length - 3} más
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Response Patterns */}
                    <div>
                      <h6 className="text-sm font-medium text-foreground mb-3">Patrones de Respuesta</h6>
                      <div className="space-y-2">
                        {responsePatterns.slice(0, 2).map((pattern) => (
                          <div
                            key={pattern.id}
                            className="p-3 bg-background rounded-lg border border-border"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-accent">
                                Trigger: {pattern.trigger}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {pattern.tone}
                              </span>
                            </div>
                            <p className="text-xs text-foreground mb-2 line-clamp-2">
                              {pattern.response}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {pattern.followUp.map((followUp, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded"
                                >
                                  {followUp}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Version Control */}
      <div>
        <h4 className="text-md font-semibold text-foreground mb-4">Control de Versiones</h4>
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h5 className="text-sm font-medium text-foreground">Versión Actual: v2.3.1</h5>
              <p className="text-xs text-muted-foreground">
                Última actualización: 22 de enero, 2025 - 14:30
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="RotateCcw"
                iconPosition="left"
                onClick={() => console.log('Rollback version')}
              >
                Revertir
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="Save"
                iconPosition="left"
                onClick={() => console.log('Create backup')}
              >
                Crear Respaldo
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 text-xs">
              <Icon name="GitCommit" size={12} className="text-success" />
              <span className="text-success font-medium">v2.3.1</span>
              <span className="text-muted-foreground">Agregadas preguntas de marketing digital</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">hace 2 horas</span>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <Icon name="GitCommit" size={12} className="text-muted-foreground" />
              <span className="text-muted-foreground font-medium">v2.3.0</span>
              <span className="text-muted-foreground">Mejorados patrones de respuesta empática</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">hace 1 día</span>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <Icon name="GitCommit" size={12} className="text-muted-foreground" />
              <span className="text-muted-foreground font-medium">v2.2.9</span>
              <span className="text-muted-foreground">Corregidos errores en flujo de pediatría</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">hace 3 días</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;