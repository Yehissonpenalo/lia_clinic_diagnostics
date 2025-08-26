import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import Icon from '../../../components/AppIcon';

const MarketingRecommendationsSection = ({ marketingData, onMarkComplete, onContactYehisson }) => {
  const digitalPresenceData = [
    { platform: 'Google My Business', current: 65, potential: 90 },
    { platform: 'Facebook', current: 45, potential: 80 },
    { platform: 'Instagram', current: 30, potential: 85 },
    { platform: 'Website', current: 55, potential: 95 },
    { platform: 'WhatsApp Business', current: 70, potential: 88 },
    { platform: 'Reviews Online', current: 40, potential: 92 }
  ];

  const competitorAnalysis = [
    { name: 'Tu Clínica', x: 65, y: 70, z: 400 },
    { name: 'Competidor A', x: 80, y: 85, z: 600 },
    { name: 'Competidor B', x: 75, y: 60, z: 350 },
    { name: 'Competidor C', x: 55, y: 75, z: 450 },
    { name: 'Líder del Mercado', x: 90, y: 95, z: 800 }
  ];

  const recommendations = [
    {
      priority: 'Alta',
      title: 'Optimización de Google My Business',
      description: 'Completar perfil, añadir fotos profesionales y gestionar reseñas activamente.',
      impact: 'Alto',
      effort: 'Medio',
      timeline: '2-4 semanas',
      icon: 'Search',
      color: 'error'
    },
    {
      priority: 'Alta',
      title: 'Estrategia de Contenido en Redes Sociales',
      description: 'Crear contenido educativo sobre salud y mostrar casos de éxito (respetando privacidad).',
      impact: 'Alto',
      effort: 'Alto',
      timeline: '1-3 meses',
      icon: 'Share2',
      color: 'error'
    },
    {
      priority: 'Media',
      title: 'Sistema de Referidos',
      description: 'Implementar programa de incentivos para pacientes que refieran nuevos clientes.',
      impact: 'Medio',
      effort: 'Medio',
      timeline: '4-6 semanas',
      icon: 'Users',
      color: 'warning'
    },
    {
      priority: 'Media',
      title: 'Email Marketing Automatizado',
      description: 'Configurar secuencias de seguimiento post-consulta y recordatorios de citas.',
      impact: 'Medio',
      effort: 'Alto',
      timeline: '6-8 semanas',
      icon: 'Mail',
      color: 'warning'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Alta': return 'error';
      case 'Media': return 'warning';
      case 'Baja': return 'success';
      default: return 'muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Marketing Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{marketingData.overallScore}/100</p>
              <p className="text-sm text-muted-foreground">Puntuación Marketing</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-warning h-2 rounded-full transition-all duration-300"
                style={{ width: `${marketingData.overallScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Eye" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{marketingData.visibility}</p>
              <p className="text-sm text-muted-foreground">Visibilidad Online</p>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Icon name="TrendingDown" size={14} className="text-error" />
            <span className="text-sm text-error font-medium">Necesita mejora</span>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">+{marketingData.potentialGrowth}%</p>
              <p className="text-sm text-muted-foreground">Crecimiento Potencial</p>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Icon name="Zap" size={14} className="text-success" />
            <span className="text-sm text-success font-medium">Alto potencial</span>
          </div>
        </div>
      </div>

      {/* Digital Presence Analysis */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Análisis de Presencia Digital</h3>
            <p className="text-sm text-muted-foreground">Estado actual vs potencial por plataforma</p>
          </div>
          <Icon name="Smartphone" size={20} className="text-muted-foreground" />
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={digitalPresenceData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis 
                dataKey="platform" 
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: '#6B7280' }}
              />
              <Radar
                name="Estado Actual"
                dataKey="current"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Potencial"
                dataKey="potential"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Competitor Positioning */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Posicionamiento Competitivo</h3>
            <p className="text-sm text-muted-foreground">Visibilidad vs Reputación (tamaño = pacientes/mes)</p>
          </div>
          <Icon name="Target" size={20} className="text-muted-foreground" />
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart data={competitorAnalysis}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Visibilidad"
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Reputación"
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                formatter={(value, name) => [value, name === 'z' ? 'Pacientes/mes' : name]}
              />
              <Scatter 
                dataKey="z" 
                fill="#3B82F6"
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Priority Recommendations */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center space-x-3 mb-6">
          <Icon name="Lightbulb" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Recomendaciones Prioritarias</h3>
        </div>
        
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 bg-${rec.color}/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={rec.icon} size={20} className={`text-${rec.color}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-foreground">{rec.title}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${getPriorityColor(rec.priority)}/10 text-${getPriorityColor(rec.priority)}`}>
                      {rec.priority}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Zap" size={12} />
                      <span>Impacto: {rec.impact}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>Tiempo: {rec.timeline}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Activity" size={12} />
                      <span>Esfuerzo: {rec.effort}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Yehisson CTA */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-xl border border-primary/20">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MessageSquare" size={24} className="text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            ¿Listo para Implementar Estas Estrategias?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Yehisson Peñaló, experto en marketing para clínicas, puede ayudarte a implementar estas recomendaciones de manera efectiva y personalizada para tu negocio.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onContactYehisson('instagram')}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
            >
              <Icon name="Instagram" size={16} />
              <span>Contactar por Instagram</span>
            </button>
            
            <button
              onClick={() => onContactYehisson('email')}
              className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              <Icon name="Mail" size={16} />
              <span>Enviar Email</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={() => onMarkComplete('marketing')}
          className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          <Icon name="Check" size={16} />
          <span>Marcar Sección como Revisada</span>
        </button>
      </div>
    </div>
  );
};

export default MarketingRecommendationsSection;