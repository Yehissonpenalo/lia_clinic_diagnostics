import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ReportPreviewSection = () => {
  const executiveSummary = {
    clinicName: "Clínica Salud Integral",
    analysisDate: "22 de Julio, 2025",
    overallScore: 72,
    criticalAreas: 3,
    opportunities: 8
  };

  const keyFindings = [
    {
      category: "Presencia Digital",
      score: 45,
      status: "Crítico",
      description: "Su clínica carece de una estrategia digital sólida que limite significativamente su alcance."
    },
    {
      category: "Retención de Pacientes",
      score: 78,
      status: "Bueno",
      description: "Excelente satisfacción del paciente, pero falta seguimiento post-consulta."
    },
    {
      category: "Gestión de Citas",
      score: 62,
      status: "Regular",
      description: "Sistema manual que genera ineficiencias y pérdida de oportunidades."
    }
  ];

  const marketingData = [
    { name: 'Redes Sociales', actual: 25, potencial: 85 },
    { name: 'SEO Local', actual: 15, potencial: 90 },
    { name: 'Email Marketing', actual: 10, potencial: 75 },
    { name: 'Referidos', actual: 60, potencial: 95 }
  ];

  const patientSourceData = [
    { name: 'Referidos', value: 45, color: '#2563EB' },
    { name: 'Búsqueda Online', value: 20, color: '#7C3AED' },
    { name: 'Redes Sociales', value: 15, color: '#F59E0B' },
    { name: 'Publicidad', value: 10, color: '#10B981' },
    { name: 'Otros', value: 10, color: '#6B7280' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Crítico': return 'text-error bg-error/10';
      case 'Regular': return 'text-warning bg-warning/10';
      case 'Bueno': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-8">
      {/* Executive Summary */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Resumen Ejecutivo</h2>
            <p className="text-sm text-muted-foreground">Análisis integral de su clínica</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">{executiveSummary.overallScore}%</div>
            <div className="text-sm text-muted-foreground">Puntuación General</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-error mb-1">{executiveSummary.criticalAreas}</div>
            <div className="text-sm text-muted-foreground">Áreas Críticas</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-success mb-1">{executiveSummary.opportunities}</div>
            <div className="text-sm text-muted-foreground">Oportunidades</div>
          </div>
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-secondary mb-1">$2.5K</div>
            <div className="text-sm text-muted-foreground">Potencial Mensual</div>
          </div>
        </div>

        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
          <p className="text-sm text-foreground">
            <strong>{executiveSummary.clinicName}</strong> muestra un potencial significativo de crecimiento. 
            Nuestro análisis identifica oportunidades clave para aumentar su base de pacientes en un 
            <span className="text-accent font-semibold"> 40-60% en los próximos 6 meses</span> mediante 
            estrategias de marketing digital específicas.
          </p>
        </div>
      </div>

      {/* Key Findings */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Hallazgos Clave</h2>
            <p className="text-sm text-muted-foreground">Áreas de mayor impacto identificadas</p>
          </div>
        </div>

        <div className="space-y-4">
          {keyFindings.map((finding, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">{finding.category}</h3>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(finding.status)}`}>
                    {finding.status}
                  </span>
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">{finding.score}%</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{finding.description}</p>
              <div className="mt-3 bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${finding.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marketing Performance Chart */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Análisis de Marketing</h2>
            <p className="text-sm text-muted-foreground">Rendimiento actual vs. potencial</p>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={marketingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                stroke="#6B7280"
                fontSize={12}
                tick={{ fill: '#6B7280' }}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tick={{ fill: '#6B7280' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="actual" fill="#EF4444" name="Actual" radius={[4, 4, 0, 0]} />
              <Bar dataKey="potencial" fill="#10B981" name="Potencial" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full" />
            <span className="text-muted-foreground">Rendimiento Actual</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-muted-foreground">Potencial Identificado</span>
          </div>
        </div>
      </div>

      {/* Patient Source Analysis */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="PieChart" size={20} className="text-success" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Fuentes de Pacientes</h2>
            <p className="text-sm text-muted-foreground">Distribución actual de adquisición</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={patientSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {patientSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {patientSourceData.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-sm font-medium text-foreground">{source.name}</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{source.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Cutoff */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8 border border-primary/20 text-center">
        <div className="max-w-2xl mx-auto">
          <Icon name="Lock" size={48} className="text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Contenido Completo Disponible
          </h3>
          <p className="text-muted-foreground mb-6">
            Este es solo el 30% de su análisis completo. El reporte completo incluye:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
            <div className="flex items-start space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
              <div>
                <div className="font-semibold text-foreground">Plan de Acción Detallado</div>
                <div className="text-sm text-muted-foreground">Estrategias específicas paso a paso</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
              <div>
                <div className="font-semibold text-foreground">Análisis Competitivo</div>
                <div className="text-sm text-muted-foreground">Comparación con clínicas similares</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
              <div>
                <div className="font-semibold text-foreground">Proyecciones Financieras</div>
                <div className="text-sm text-muted-foreground">ROI esperado y cronograma</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
              <div>
                <div className="font-semibold text-foreground">Recursos y Plantillas</div>
                <div className="text-sm text-muted-foreground">Herramientas listas para usar</div>
              </div>
            </div>
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-accent font-medium">
              ⚡ Acceso inmediato tras el pago • Descarga en PDF • Consulta con experto incluida
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPreviewSection;