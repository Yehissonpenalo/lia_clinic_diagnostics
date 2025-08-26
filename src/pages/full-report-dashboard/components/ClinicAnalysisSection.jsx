import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const ClinicAnalysisSection = ({ analysisData, onMarkComplete }) => {
  const strengthsData = [
    { area: 'Atención al Paciente', score: 85, color: '#10B981' },
    { area: 'Tecnología Médica', score: 72, color: '#3B82F6' },
    { area: 'Personal Médico', score: 90, color: '#8B5CF6' },
    { area: 'Instalaciones', score: 68, color: '#F59E0B' },
    { area: 'Procesos', score: 75, color: '#EF4444' }
  ];

  const monthlyTrends = [
    { mes: 'Ene', pacientes: 120, ingresos: 15000 },
    { mes: 'Feb', pacientes: 135, ingresos: 16800 },
    { mes: 'Mar', pacientes: 142, ingresos: 17750 },
    { mes: 'Abr', pacientes: 128, ingresos: 16000 },
    { mes: 'May', pacientes: 155, ingresos: 19400 },
    { mes: 'Jun', pacientes: 168, ingresos: 21000 }
  ];

  const patientDistribution = [
    { name: 'Consulta General', value: 45, color: '#3B82F6' },
    { name: 'Especialidades', value: 30, color: '#10B981' },
    { name: 'Emergencias', value: 15, color: '#F59E0B' },
    { name: 'Seguimiento', value: 10, color: '#8B5CF6' }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{analysisData.totalPatients}</p>
              <p className="text-sm text-muted-foreground">Pacientes Totales</p>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span className="text-sm text-success font-medium">+12% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">${analysisData.monthlyRevenue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Ingresos Mensuales</p>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span className="text-sm text-success font-medium">+8% vs mes anterior</span>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Star" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{analysisData.satisfactionScore}/5</p>
              <p className="text-sm text-muted-foreground">Satisfacción Promedio</p>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span className="text-sm text-success font-medium">Excelente nivel</span>
          </div>
        </div>
      </div>

      {/* Strengths Analysis */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Análisis de Fortalezas</h3>
            <p className="text-sm text-muted-foreground">Evaluación por áreas clave de la clínica</p>
          </div>
          <Icon name="BarChart3" size={20} className="text-muted-foreground" />
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={strengthsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="area" 
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
              <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Tendencia de Pacientes</h3>
              <p className="text-sm text-muted-foreground">Últimos 6 meses</p>
            </div>
            <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="pacientes" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Distribución de Servicios</h3>
              <p className="text-sm text-muted-foreground">Por tipo de consulta</p>
            </div>
            <Icon name="PieChart" size={20} className="text-muted-foreground" />
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={patientDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {patientDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            {patientDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-card p-6 rounded-xl border border-border">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Lightbulb" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Insights Clave</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-success/5 rounded-lg border border-success/20">
            <div className="flex items-start space-x-3">
              <Icon name="CheckCircle" size={16} className="text-success mt-1" />
              <div>
                <h4 className="font-medium text-success mb-1">Fortaleza Principal</h4>
                <p className="text-sm text-foreground">
                  Excelente calidad en atención al paciente (90/100). Los pacientes valoran altamente el trato personalizado y profesional.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-1" />
              <div>
                <h4 className="font-medium text-warning mb-1">Área de Mejora</h4>
                <p className="text-sm text-foreground">
                  Las instalaciones necesitan modernización (68/100). Considerar renovación de espacios comunes y equipamiento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={() => onMarkComplete('analysis')}
          className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
          <Icon name="Check" size={16} />
          <span>Marcar Sección como Revisada</span>
        </button>
      </div>
    </div>
  );
};

export default ClinicAnalysisSection;