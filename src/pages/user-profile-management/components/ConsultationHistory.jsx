import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConsultationHistory = ({ consultations = [] }) => {
  const [expandedConsultation, setExpandedConsultation] = useState(null);

  const mockConsultations = consultations.length > 0 ? consultations : [
    {
      id: 1,
      date: '2024-07-20',
      time: '14:30',
      status: 'completed',
      type: 'Evaluación Inicial',
      duration: '45 min',
      score: 78,
      reportGenerated: true,
      summary: `Consulta inicial completa sobre estrategias de marketing digital para clínica de medicina general.\n\nSe identificaron oportunidades de mejora en redes sociales y presencia online.`,
      recommendations: [
        'Implementar estrategia de contenido en Instagram',
        'Optimizar perfil de Google My Business',
        'Desarrollar programa de referidos'
      ]
    },
    {
      id: 2,
      date: '2024-07-15',
      time: '10:15',
      status: 'completed',
      type: 'Seguimiento',
      duration: '30 min',
      score: 85,
      reportGenerated: true,
      summary: `Revisión de progreso en implementación de estrategias de marketing.\n\nMejoras significativas en engagement y nuevos pacientes.`,
      recommendations: [
        'Continuar con estrategia actual',
        'Expandir a nuevas plataformas',
        'Implementar sistema de testimonios'
      ]
    },
    {
      id: 3,
      date: '2024-07-10',
      time: '16:45',
      status: 'incomplete',
      type: 'Evaluación Especializada',
      duration: '20 min',
      score: null,
      reportGenerated: false,
      summary: 'Consulta interrumpida - Pendiente de completar',
      recommendations: []
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10 border-success/20';
      case 'incomplete':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'scheduled':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'incomplete':
        return 'Incompleta';
      case 'scheduled':
        return 'Programada';
      default:
        return 'Desconocido';
    }
  };

  const toggleExpanded = (consultationId) => {
    setExpandedConsultation(
      expandedConsultation === consultationId ? null : consultationId
    );
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="History" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Historial de Consultas</h2>
            <p className="text-sm text-muted-foreground">
              {mockConsultations.length} consulta{mockConsultations.length !== 1 ? 's' : ''} registrada{mockConsultations.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          onClick={() => console.log('Nueva consulta')}
        >
          Nueva Consulta
        </Button>
      </div>

      <div className="space-y-4">
        {mockConsultations.map((consultation) => (
          <div
            key={consultation.id}
            className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {consultation.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {consultation.date} • {consultation.time}
                  </span>
                </div>
                
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(consultation.status)}`}>
                  {getStatusLabel(consultation.status)}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {consultation.score && (
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">{consultation.score}%</div>
                    <div className="text-xs text-muted-foreground">Puntuación</div>
                  </div>
                )}
                
                <Button
                  variant="ghost"
                  iconName={expandedConsultation === consultation.id ? "ChevronUp" : "ChevronDown"}
                  onClick={() => toggleExpanded(consultation.id)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-3">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{consultation.duration}</span>
              </div>
              
              {consultation.reportGenerated && (
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="FileText" size={14} />
                  <span>Reporte Generado</span>
                </div>
              )}
            </div>

            {expandedConsultation === consultation.id && (
              <div className="mt-4 pt-4 border-t border-border space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Resumen</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {consultation.summary}
                  </p>
                </div>

                {consultation.recommendations.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Recomendaciones</h4>
                    <ul className="space-y-1">
                      {consultation.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                          <Icon name="CheckCircle" size={14} className="text-success mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  {consultation.reportGenerated && (
                    <Button
                      variant="outline"
                      iconName="Download"
                      iconPosition="left"
                      onClick={() => console.log('Descargar reporte', consultation.id)}
                    >
                      Descargar Reporte
                    </Button>
                  )}
                  
                  {consultation.status === 'incomplete' && (
                    <Button
                      variant="default"
                      iconName="Play"
                      iconPosition="left"
                      onClick={() => console.log('Continuar consulta', consultation.id)}
                    >
                      Continuar
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {mockConsultations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MessageSquare" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No hay consultas registradas</h3>
          <p className="text-muted-foreground mb-4">
            Comienza tu primera consulta con LIA para obtener insights sobre tu clínica
          </p>
          <Button
            variant="default"
            iconName="MessageSquare"
            iconPosition="left"
            onClick={() => console.log('Iniciar primera consulta')}
          >
            Iniciar Primera Consulta
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConsultationHistory;