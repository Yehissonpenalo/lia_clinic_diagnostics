import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const WeaknessAnalysis = () => {
  const weaknessData = [
    { category: 'Marketing Digital', count: 45, percentage: 78, trend: 'up' },
    { category: 'Redes Sociales', count: 38, percentage: 66, trend: 'up' },
    { category: 'SEO Local', count: 32, percentage: 55, trend: 'down' },
    { category: 'Email Marketing', count: 28, percentage: 48, trend: 'up' },
    { category: 'Automatización', count: 25, percentage: 43, trend: 'stable' },
    { category: 'Análisis Competencia', count: 22, percentage: 38, trend: 'up' },
    { category: 'Branding', count: 18, percentage: 31, trend: 'down' },
    { category: 'Publicidad Online', count: 15, percentage: 26, trend: 'stable' }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return { icon: 'TrendingUp', color: 'text-success' };
      case 'down': return { icon: 'TrendingDown', color: 'text-error' };
      default: return { icon: 'Minus', color: 'text-muted-foreground' };
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            {data.value} clínicas ({((data.value / 58) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Análisis de Debilidades</h3>
          <p className="text-sm text-muted-foreground">
            Problemas más comunes identificados en las clínicas
          </p>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="AlertTriangle" size={20} />
          <span className="text-sm font-medium">58 clínicas analizadas</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weaknessData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                type="number" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                type="category" 
                dataKey="category" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                width={120}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                fill="var(--color-primary)" 
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed List */}
        <div className="space-y-3">
          {weaknessData.map((item, index) => {
            const trendConfig = getTrendIcon(item.trend);
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {item.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={trendConfig.icon} 
                        size={14} 
                        className={trendConfig.color} 
                      />
                      <span className="text-sm font-medium text-foreground">
                        {item.count}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-10 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-primary/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">78%</div>
            <div className="text-sm text-muted-foreground">Necesitan marketing digital</div>
          </div>
          <div className="bg-secondary/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-secondary">66%</div>
            <div className="text-sm text-muted-foreground">Problemas con redes sociales</div>
          </div>
          <div className="bg-accent/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-accent">3.2</div>
            <div className="text-sm text-muted-foreground">Debilidades promedio por clínica</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeaknessAnalysis;