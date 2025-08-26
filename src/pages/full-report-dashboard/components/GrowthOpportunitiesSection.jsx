import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const GrowthOpportunitiesSection = ({ growthData, onMarkComplete, onContactYehisson }) => {
  const growthProjections = [
    { month: 'Actual', conservative: 168, optimistic: 168, aggressive: 168 },
    { month: 'Mes 1', conservative: 175, optimistic: 185, aggressive: 200 },
    { month: 'Mes 2', conservative: 182, optimistic: 205, aggressive: 235 },
    { month: 'Mes 3', conservative: 190, optimistic: 225, aggressive: 275 },
    { month: 'Mes 6', conservative: 210, optimistic: 280, aggressive: 350 },
    { month: 'Mes 12', conservative: 245, optimistic: 350, aggressive: 500 }
  ];

  const revenueOpportunities = [
    {
      opportunity: 'Servicios Premium',
      currentRevenue: 0,
      potentialRevenue: 3500,
      implementation: 'Medio',
      timeframe: '2-3 meses',
      description: 'Consultas VIP, atención domiciliaria, paquetes de bienestar',
      icon: 'Crown'
    },
    {
      opportunity: 'Telemedicina',
      currentRevenue: 0,
      potentialRevenue: 2800,
      implementation: 'Alto',
      timeframe: '3-4 meses',
      description: 'Consultas virtuales, seguimiento remoto, segunda opinión',
      icon: 'Video'
    },
    {
      opportunity: 'Programas Preventivos',
      currentRevenue: 500,
      potentialRevenue: 4200,
      implementation: 'Bajo',
      timeframe: '1-2 meses',
      description: 'Chequeos anuales, programas de vacunación, medicina preventiva',
      icon: 'Shield'
    },
    {
      opportunity: 'Alianzas Estratégicas',
      currentRevenue: 0,
      potentialRevenue: 1800,
      implementation: 'Medio',
      timeframe: '4-6 meses',
      description: 'Convenios empresariales, seguros médicos, centros deportivos',
      icon: 'Handshake'
    }
  ];

  const patientJourneyOptimization = [
    { stage: 'Descubrimiento', current: 1000, optimized: 1500, conversion: 15 },
    { stage: 'Consideración', current: 150, optimized: 300, conversion: 50 },
    { stage: 'Primera Cita', current: 75, optimized: 150, conversion: 80 },
    { stage: 'Tratamiento', current: 60, optimized: 120, conversion: 90 },
    { stage: 'Fidelización', current: 54, optimized: 108, conversion: 95 }
  ];

  const actionPlan = [
    {
      phase: 'Fase 1: Fundación (Mes 1-2)',
      priority: 'Crítico',
      actions: [
        'Optimizar Google My Business y presencia online',
        'Implementar sistema de reseñas y testimonios',
        'Crear contenido educativo básico',
        'Establecer procesos de seguimiento post-consulta'
      ],
      expectedImpact: '+15% pacientes nuevos',
      color: 'error'
    },
    {
      phase: 'Fase 2: Expansión (Mes 3-4)',
      priority: 'Alto',
      actions: [
        'Lanzar programas preventivos y paquetes',
        'Desarrollar estrategia de redes sociales',
        'Implementar sistema de referidos',
        'Mejorar experiencia del paciente'
      ],
      expectedImpact: '+25% ingresos por paciente',
      color: 'warning'
    },
    {
      phase: 'Fase 3: Innovación (Mes 5-6)',
      priority: 'Medio',
      actions: [
        'Evaluar implementación de telemedicina',
        'Desarrollar servicios premium',
        'Establecer alianzas estratégicas',
        'Automatizar procesos de marketing'
      ],
      expectedImpact: '+40% crecimiento total',
      color: 'success'
    }
  ];

  const getImplementationColor = (level) => {
    switch (level) {
      case 'Bajo': return 'success';
      case 'Medio': return 'warning';
      case 'Alto': return 'error';
      default: return 'muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Crítico': return 'error';
      case 'Alto': return 'warning';
      case 'Medio': return 'success';
      default: return 'muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Growth Potential Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">+{growthData.potentialGrowth}%</p>
              <p className="text-sm text-muted-foreground">Crecimiento Potencial</p>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Icon name="Calendar" size={14} className="text-success" />
            <span className="text-sm text-success font-medium">En 12 meses</span>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">${growthData.additionalRevenue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Ingresos Adicionales</p>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Icon name="Zap" size={14} className="text-primary" />
            <span className="text-sm text-primary font-medium">Potencial mensual</span>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">+{growthData.newPatients}</p>
              <p className="text-sm text-muted-foreground">Nuevos Pacientes</p>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Icon name="Target" size={14} className="text-accent" />
            <span className="text-sm text-accent font-medium">Meta mensual</span>
          </div>
        </div>
      </div>

      {/* Growth Projections */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Proyecciones de Crecimiento</h3>
            <p className="text-sm text-muted-foreground">Escenarios de crecimiento de pacientes por mes</p>
          </div>
          <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthProjections} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <Area
                type="monotone"
                dataKey="conservative"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.3}
                name="Conservador"
              />
              <Area
                type="monotone"
                dataKey="optimistic"
                stackId="2"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
                name="Optimista"
              />
              <Area
                type="monotone"
                dataKey="aggressive"
                stackId="3"
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.3}
                name="Agresivo"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Opportunities */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="DollarSign" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Oportunidades de Ingresos</h3>
        </div>
        
        <div className="space-y-4">
          {revenueOpportunities.map((opp, index) => (
            <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={opp.icon} size={20} className="text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{opp.opportunity}</h4>
                    <div className="text-right">
                      <p className="text-lg font-bold text-success">+${opp.potentialRevenue.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">potencial mensual</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{opp.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Tiempo: {opp.timeframe}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Activity" size={12} className={`text-${getImplementationColor(opp.implementation)}`} />
                      <span className={`text-${getImplementationColor(opp.implementation)}`}>
                        Implementación: {opp.implementation}
                      </span>
                    </div>
                    {opp.currentRevenue > 0 && (
                      <div className="flex items-center space-x-1">
                        <Icon name="DollarSign" size={12} className="text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Actual: ${opp.currentRevenue.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Journey Optimization */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Optimización del Embudo de Pacientes</h3>
            <p className="text-sm text-muted-foreground">Mejoras potenciales en cada etapa</p>
          </div>
          <Icon name="Filter" size={20} className="text-muted-foreground" />
        </div>
        
        <div className="space-y-4">
          {patientJourneyOptimization.map((stage, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">{stage.stage}</h4>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Actual: {stage.current}</span>
                  <Icon name="ArrowRight" size={14} />
                  <span className="text-success font-medium">Optimizado: {stage.optimized}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-success">
                  +{Math.round(((stage.optimized - stage.current) / stage.current) * 100)}%
                </p>
                <p className="text-xs text-muted-foreground">mejora</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Plan */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="CheckSquare" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Plan de Acción Recomendado</h3>
        </div>
        
        <div className="space-y-6">
          {actionPlan.map((phase, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-foreground">{phase.phase}</h4>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full bg-${getPriorityColor(phase.priority)}/10 text-${getPriorityColor(phase.priority)}`}>
                    {phase.priority}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-success">{phase.expectedImpact}</p>
                  <p className="text-xs text-muted-foreground">impacto esperado</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {phase.actions.map((action, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Support CTA */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-xl border border-primary/20">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Rocket" size={24} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            ¿Listo para Acelerar tu Crecimiento?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Yehisson Peñaló puede ayudarte a implementar este plan de crecimiento paso a paso, adaptándolo a las necesidades específicas de tu clínica y asegurando resultados medibles.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onContactYehisson('consultation')}
              className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              <Icon name="Calendar" size={16} />
              <span>Agendar Consulta Estratégica</span>
            </button>
            
            <button
              onClick={() => onContactYehisson('whatsapp')}
              className="flex items-center space-x-2 px-6 py-3 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-colors duration-200"
            >
              <Icon name="MessageCircle" size={16} />
              <span>Contactar por WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={() => onMarkComplete('growth')}
          className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          <Icon name="Check" size={16} />
          <span>Marcar Sección como Revisada</span>
        </button>
      </div>
    </div>
  );
};

export default GrowthOpportunitiesSection;