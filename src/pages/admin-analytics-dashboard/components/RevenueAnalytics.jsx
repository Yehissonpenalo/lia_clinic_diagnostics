import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';

const RevenueAnalytics = () => {
  const revenueData = [
    { month: 'Ene', revenue: 120, transactions: 12, avgOrder: 10 },
    { month: 'Feb', revenue: 180, transactions: 18, avgOrder: 10 },
    { month: 'Mar', revenue: 150, transactions: 15, avgOrder: 10 },
    { month: 'Abr', revenue: 220, transactions: 22, avgOrder: 10 },
    { month: 'May', revenue: 190, transactions: 19, avgOrder: 10 },
    { month: 'Jun', revenue: 280, transactions: 28, avgOrder: 10 },
    { month: 'Jul', revenue: 310, transactions: 31, avgOrder: 10 }
  ];

  const conversionFunnel = [
    { stage: 'Visitantes', count: 1250, percentage: 100 },
    { stage: 'Iniciaron Consulta', count: 875, percentage: 70 },
    { stage: 'Completaron Consulta', count: 525, percentage: 42 },
    { stage: 'Vieron Preview', count: 420, percentage: 34 },
    { stage: 'Compraron Reporte', count: 310, percentage: 25 }
  ];

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalTransactions = revenueData.reduce((sum, item) => sum + item.transactions, 0);
  const avgOrderValue = totalRevenue / totalTransactions;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-success">
            Ingresos: ${data.revenue}
          </p>
          <p className="text-sm text-primary">
            Transacciones: {data.transactions}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Revenue Chart */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Análisis de Ingresos</h3>
            <p className="text-sm text-muted-foreground">
              Evolución mensual de ingresos y transacciones
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-success">${totalRevenue}</div>
              <div className="text-sm text-muted-foreground">Total 2025</div>
            </div>
          </div>
        </div>

        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-success)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-success/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success">${avgOrderValue.toFixed(0)}</div>
            <div className="text-sm text-muted-foreground">Valor promedio por orden</div>
          </div>
          <div className="bg-primary/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{totalTransactions}</div>
            <div className="text-sm text-muted-foreground">Total transacciones</div>
          </div>
          <div className="bg-secondary/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-secondary">25%</div>
            <div className="text-sm text-muted-foreground">Tasa de conversión</div>
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Embudo de Conversión</h3>
            <p className="text-sm text-muted-foreground">
              Análisis del proceso de conversión de usuarios
            </p>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="TrendingDown" size={20} />
            <span className="text-sm font-medium">Último mes</span>
          </div>
        </div>

        <div className="space-y-4">
          {conversionFunnel.map((stage, index) => {
            const isLast = index === conversionFunnel.length - 1;
            const dropoffRate = index > 0 ? 
              ((conversionFunnel[index - 1].count - stage.count) / conversionFunnel[index - 1].count * 100).toFixed(1) : 0;
            
            return (
              <div key={index} className="relative">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{stage.stage}</div>
                      {index > 0 && dropoffRate > 0 && (
                        <div className="text-xs text-error">
                          -{dropoffRate}% abandono
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">{stage.count}</div>
                      <div className="text-sm text-muted-foreground">{stage.percentage}%</div>
                    </div>
                    <div className="w-32 bg-muted rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full transition-all duration-300"
                        style={{ width: `${stage.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                {!isLast && (
                  <div className="flex justify-center py-2">
                    <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Conversion Insights */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-warning/5 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                <span className="text-sm font-medium text-foreground">Mayor Abandono</span>
              </div>
              <p className="text-sm text-muted-foreground">
                30% de usuarios abandonan después de iniciar la consulta
              </p>
            </div>
            <div className="bg-success/5 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingUp" size={16} className="text-success" />
                <span className="text-sm font-medium text-foreground">Oportunidad</span>
              </div>
              <p className="text-sm text-muted-foreground">
                80% de quienes ven el preview compran el reporte completo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;