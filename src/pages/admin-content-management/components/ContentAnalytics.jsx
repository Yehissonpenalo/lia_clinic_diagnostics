import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const ContentAnalytics = () => {
  const usageData = [
    { name: 'Ene', consultations: 145, satisfaction: 4.2 },
    { name: 'Feb', consultations: 189, satisfaction: 4.4 },
    { name: 'Mar', consultations: 234, satisfaction: 4.3 },
    { name: 'Abr', consultations: 198, satisfaction: 4.5 },
    { name: 'May', consultations: 267, satisfaction: 4.6 },
    { name: 'Jun', consultations: 312, satisfaction: 4.4 },
    { name: 'Jul', consultations: 289, satisfaction: 4.7 }
  ];

  const contentPerformance = [
    { category: 'Cardiología', usage: 156, effectiveness: 92 },
    { category: 'Dermatología', usage: 89, effectiveness: 88 },
    { category: 'Pediatría', usage: 134, effectiveness: 95 },
    { category: 'Marketing', usage: 234, effectiveness: 87 },
    { category: 'General', usage: 178, effectiveness: 90 }
  ];

  const responseTypes = [
    { name: 'Empática', value: 45, color: '#2563EB' },
    { name: 'Informativa', value: 30, color: '#7C3AED' },
    { name: 'Directiva', value: 15, color: '#F59E0B' },
    { name: 'Exploratoria', value: 10, color: '#10B981' }
  ];

  const topQuestions = [
    {
      question: "¿Cuáles son sus principales desafíos de marketing?",
      usage: 234,
      satisfaction: 4.6,
      category: "Marketing"
    },
    {
      question: "¿Qué síntomas cardiovasculares observa más frecuentemente?",
      usage: 189,
      satisfaction: 4.8,
      category: "Cardiología"
    },
    {
      question: "¿Cómo maneja las consultas pediátricas complejas?",
      usage: 167,
      satisfaction: 4.7,
      category: "Pediatría"
    },
    {
      question: "¿Qué estrategias digitales ha implementado?",
      usage: 145,
      satisfaction: 4.4,
      category: "Marketing"
    }
  ];

  const improvementAreas = [
    {
      area: "Respuestas sobre precios",
      currentScore: 3.2,
      targetScore: 4.5,
      priority: "high",
      suggestions: "Agregar más contexto sobre valor y ROI"
    },
    {
      area: "Flujo de síntomas complejos",
      currentScore: 3.8,
      targetScore: 4.5,
      priority: "medium",
      suggestions: "Incluir más preguntas de seguimiento"
    },
    {
      area: "Respuestas técnicas",
      currentScore: 4.1,
      targetScore: 4.6,
      priority: "low",
      suggestions: "Simplificar lenguaje médico"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return 'Normal';
    }
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Análisis de Contenido</h3>
        <p className="text-sm text-muted-foreground">
          Métricas de rendimiento y efectividad del contenido de LIA
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="MessageSquare" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Consultas Totales</span>
          </div>
          <p className="text-2xl font-bold text-primary">1,634</p>
          <p className="text-xs text-success">+12% vs mes anterior</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Star" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Satisfacción Promedio</span>
          </div>
          <p className="text-2xl font-bold text-accent">4.5</p>
          <p className="text-xs text-success">+0.3 vs mes anterior</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Efectividad</span>
          </div>
          <p className="text-2xl font-bold text-success">91%</p>
          <p className="text-xs text-success">+5% vs mes anterior</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-foreground">Tiempo Promedio</span>
          </div>
          <p className="text-2xl font-bold text-secondary">8.2m</p>
          <p className="text-xs text-error">+1.2m vs mes anterior</p>
        </div>
      </div>

      {/* Usage Trends */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-md font-semibold text-foreground mb-4">Tendencias de Uso y Satisfacción</h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
              <YAxis yAxisId="left" stroke="var(--color-muted-foreground)" />
              <YAxis yAxisId="right" orientation="right" stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }} 
              />
              <Bar yAxisId="left" dataKey="consultations" fill="var(--color-primary)" name="Consultas" />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="satisfaction" 
                stroke="var(--color-accent)" 
                strokeWidth={3}
                name="Satisfacción"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Performance */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="text-md font-semibold text-foreground mb-4">Rendimiento por Categoría</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contentPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="category" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="usage" fill="var(--color-primary)" name="Uso" />
                <Bar dataKey="effectiveness" fill="var(--color-success)" name="Efectividad %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Response Types Distribution */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="text-md font-semibold text-foreground mb-4">Distribución de Tipos de Respuesta</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={responseTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {responseTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Performing Questions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-md font-semibold text-foreground mb-4">Preguntas Más Efectivas</h4>
        <div className="space-y-3">
          {topQuestions.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
            >
              <div className="flex-1">
                <h5 className="text-sm font-medium text-foreground mb-1">{item.question}</h5>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-accent/10 text-accent rounded-full">
                    {item.category}
                  </span>
                  <span>Usado {item.usage} veces</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-accent" />
                    <span>{item.satisfaction}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{item.usage}</p>
                  <p className="text-xs text-muted-foreground">usos</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Areas */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-md font-semibold text-foreground mb-4">Áreas de Mejora</h4>
        <div className="space-y-4">
          {improvementAreas.map((area, index) => (
            <div
              key={index}
              className="p-4 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-sm font-medium text-foreground">{area.area}</h5>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(area.priority)}`}>
                  Prioridad {getPriorityLabel(area.priority)}
                </span>
              </div>
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Actual: {area.currentScore}</span>
                    <span>Objetivo: {area.targetScore}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(area.currentScore / area.targetScore) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{area.suggestions}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentAnalytics;