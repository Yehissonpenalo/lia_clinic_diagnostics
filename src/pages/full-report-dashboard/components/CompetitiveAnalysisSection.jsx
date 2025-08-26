import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import Icon from '../../../components/AppIcon';

const CompetitiveAnalysisSection = ({ competitiveData, onMarkComplete }) => {
  const marketShareData = [
    { name: 'Tu Clínica', share: 12, patients: 168, growth: 8 },
    { name: 'Clínica San Rafael', share: 28, patients: 420, growth: 15 },
    { name: 'Centro Médico Integral', share: 22, patients: 350, growth: 12 },
    { name: 'Clínica Familiar', share: 18, patients: 280, growth: -3 },
    { name: 'Otros', share: 20, patients: 300, growth: 5 }
  ];

  const pricingComparison = [
    { service: 'Consulta General', tuClinica: 45, promedio: 52, lider: 65 },
    { service: 'Especialidades', tuClinica: 80, promedio: 95, lider: 120 },
    { service: 'Exámenes', tuClinica: 35, promedio: 42, lider: 55 },
    { service: 'Procedimientos', tuClinica: 150, promedio: 180, lider: 220 }
  ];

  const strengthsWeaknesses = [
    {
      competitor: 'Clínica San Rafael',
      strengths: ['Ubicación céntrica', 'Tecnología avanzada', 'Especialistas reconocidos'],
      weaknesses: ['Precios altos', 'Tiempos de espera largos', 'Atención impersonal'],
      threat: 'Alto',
      color: 'error'
    },
    {
      competitor: 'Centro Médico Integral',
      strengths: ['Horarios extendidos', 'Seguros médicos', 'Instalaciones modernas'],
      weaknesses: ['Personal rotativo', 'Procesos burocráticos', 'Comunicación deficiente'],
      threat: 'Medio',
      color: 'warning'
    },
    {
      competitor: 'Clínica Familiar',
      strengths: ['Atención personalizada', 'Precios competitivos', 'Ambiente familiar'],
      weaknesses: ['Tecnología limitada', 'Pocos especialistas', 'Marketing débil'],
      threat: 'Bajo',
      color: 'success'
    }
  ];

  const opportunityGaps = [
    {
      gap: 'Telemedicina',
      description: 'Ningún competidor ofrece consultas virtuales completas',
      potential: 'Alto',
      difficulty: 'Medio',
      icon: 'Video'
    },
    {
      gap: 'Atención 24/7',
      description: 'Solo emergencias, no consultas programadas nocturnas',
      potential: 'Medio',
      difficulty: 'Alto',
      icon: 'Clock'
    },
    {
      gap: 'Programas de Bienestar',
      description: 'Falta de servicios preventivos y de estilo de vida',
      potential: 'Alto',
      difficulty: 'Bajo',
      icon: 'Heart'
    },
    {
      gap: 'App Móvil Integral',
      description: 'Aplicaciones limitadas para gestión de pacientes',
      potential: 'Medio',
      difficulty: 'Alto',
      icon: 'Smartphone'
    }
  ];

  const getThreatColor = (threat) => {
    switch (threat) {
      case 'Alto': return 'error';
      case 'Medio': return 'warning';
      case 'Bajo': return 'success';
      default: return 'muted';
    }
  };

  const getPotentialColor = (potential) => {
    switch (potential) {
      case 'Alto': return 'success';
      case 'Medio': return 'warning';
      case 'Bajo': return 'muted';
      default: return 'muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Market Position Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="PieChart" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{competitiveData.marketShare}%</p>
              <p className="text-sm text-muted-foreground">Cuota de Mercado</p>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span className="text-sm text-success font-medium">+2% este año</span>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Award" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">#{competitiveData.ranking}</p>
              <p className="text-sm text-muted-foreground">Posición en el Mercado</p>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Icon name="Target" size={14} className="text-warning" />
            <span className="text-sm text-warning font-medium">de 8 competidores</span>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{competitiveData.pricePosition}</p>
              <p className="text-sm text-muted-foreground">Posición de Precios</p>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Icon name="TrendingDown" size={14} className="text-success" />
            <span className="text-sm text-success font-medium">Competitivo</span>
          </div>
        </div>
      </div>

      {/* Market Share Analysis */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Análisis de Cuota de Mercado</h3>
            <p className="text-sm text-muted-foreground">Distribución de pacientes por competidor</p>
          </div>
          <Icon name="BarChart3" size={20} className="text-muted-foreground" />
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={marketShareData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <Bar yAxisId="left" dataKey="share" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="growth" stroke="#10B981" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pricing Comparison */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Comparación de Precios</h3>
            <p className="text-sm text-muted-foreground">Análisis por tipo de servicio (USD)</p>
          </div>
          <Icon name="DollarSign" size={20} className="text-muted-foreground" />
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pricingComparison} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="service" 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <Bar dataKey="tuClinica" fill="#10B981" name="Tu Clínica" radius={[2, 2, 0, 0]} />
              <Bar dataKey="promedio" fill="#F59E0B" name="Promedio Mercado" radius={[2, 2, 0, 0]} />
              <Bar dataKey="lider" fill="#EF4444" name="Líder del Mercado" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Competitor Analysis */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Users" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Análisis de Competidores Clave</h3>
        </div>
        
        <div className="space-y-6">
          {strengthsWeaknesses.map((comp, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-foreground">{comp.competitor}</h4>
                <span className={`px-3 py-1 text-xs font-medium rounded-full bg-${getThreatColor(comp.threat)}/10 text-${getThreatColor(comp.threat)}`}>
                  Amenaza: {comp.threat}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Plus" size={16} className="text-success" />
                    <span className="text-sm font-medium text-success">Fortalezas</span>
                  </div>
                  <ul className="space-y-1">
                    {comp.strengths.map((strength, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center space-x-2">
                        <div className="w-1 h-1 bg-success rounded-full"></div>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Minus" size={16} className="text-error" />
                    <span className="text-sm font-medium text-error">Debilidades</span>
                  </div>
                  <ul className="space-y-1">
                    {comp.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center space-x-2">
                        <div className="w-1 h-1 bg-error rounded-full"></div>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Opportunities */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Lightbulb" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Oportunidades de Mercado</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunityGaps.map((gap, index) => (
            <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 bg-${getPotentialColor(gap.potential)}/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={gap.icon} size={20} className={`text-${getPotentialColor(gap.potential)}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-foreground">{gap.gap}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${getPotentialColor(gap.potential)}/10 text-${getPotentialColor(gap.potential)}`}>
                      {gap.potential}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{gap.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Zap" size={12} />
                      <span>Potencial: {gap.potential}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Activity" size={12} />
                      <span>Dificultad: {gap.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Recommendations */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-xl border border-primary/20">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Target" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Recomendaciones Estratégicas</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-success/5 rounded-lg border border-success/20">
            <div className="flex items-start space-x-3">
              <Icon name="CheckCircle" size={16} className="text-success mt-1" />
              <div>
                <h4 className="font-medium text-success mb-1">Ventaja Competitiva</h4>
                <p className="text-sm text-foreground">
                  Enfócate en la atención personalizada y precios competitivos. Estos son tus diferenciadores clave frente a competidores más grandes.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-1" />
              <div>
                <h4 className="font-medium text-warning mb-1">Área de Riesgo</h4>
                <p className="text-sm text-foreground">
                  La tecnología limitada puede ser una desventaja. Considera inversiones graduales en equipamiento y sistemas digitales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={() => onMarkComplete('competitive')}
          className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          <Icon name="Check" size={16} />
          <span>Marcar Sección como Revisada</span>
        </button>
      </div>
    </div>
  );
};

export default CompetitiveAnalysisSection;