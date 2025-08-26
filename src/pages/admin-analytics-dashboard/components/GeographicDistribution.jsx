import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const GeographicDistribution = () => {
  const geographicData = [
    { name: 'Madrid', value: 35, color: 'var(--color-primary)' },
    { name: 'Barcelona', value: 28, color: 'var(--color-secondary)' },
    { name: 'Valencia', value: 18, color: 'var(--color-accent)' },
    { name: 'Sevilla', value: 12, color: 'var(--color-success)' },
    { name: 'Bilbao', value: 7, color: 'var(--color-warning)' }
  ];

  const totalUsers = geographicData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / totalUsers) * 100).toFixed(1);
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.value} usuarios ({percentage}%)
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
          <h3 className="text-lg font-semibold text-foreground">Distribución Geográfica</h3>
          <p className="text-sm text-muted-foreground">
            Profesionales de salud por ubicación
          </p>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="MapPin" size={20} />
          <span className="text-sm font-medium">{totalUsers} usuarios</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={geographicData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {geographicData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend and Statistics */}
        <div className="space-y-4">
          {geographicData.map((item, index) => {
            const percentage = ((item.value / totalUsers) * 100).toFixed(1);
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {percentage}%
                  </span>
                  <span className="text-sm font-medium text-foreground w-8 text-right">
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Insights */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">Madrid</div>
            <div className="text-sm text-muted-foreground">Mayor concentración</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">63%</div>
            <div className="text-sm text-muted-foreground">Top 2 ciudades</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">5</div>
            <div className="text-sm text-muted-foreground">Ciudades principales</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicDistribution;