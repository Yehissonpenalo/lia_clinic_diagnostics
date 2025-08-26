import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ConsultationChart = ({ type = 'line', data, title, height = 300 }) => {
  const chartData = [
    { name: 'Ene', consultations: 45, conversions: 12 },
    { name: 'Feb', consultations: 52, conversions: 18 },
    { name: 'Mar', consultations: 48, conversions: 15 },
    { name: 'Abr', consultations: 61, conversions: 22 },
    { name: 'May', consultations: 55, conversions: 19 },
    { name: 'Jun', consultations: 67, conversions: 28 },
    { name: 'Jul', consultations: 73, conversions: 31 }
  ];

  const renderChart = () => {
    if (type === 'bar') {
      return (
        <BarChart data={data || chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis 
            dataKey="name" 
            stroke="var(--color-muted-foreground)"
            fontSize={12}
          />
          <YAxis 
            stroke="var(--color-muted-foreground)"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px'
            }}
          />
          <Bar dataKey="consultations" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="conversions" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
        </BarChart>
      );
    }

    return (
      <LineChart data={data || chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis 
          dataKey="name" 
          stroke="var(--color-muted-foreground)"
          fontSize={12}
        />
        <YAxis 
          stroke="var(--color-muted-foreground)"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="consultations" 
          stroke="var(--color-primary)" 
          strokeWidth={3}
          dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="conversions" 
          stroke="var(--color-secondary)" 
          strokeWidth={3}
          dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Consultas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span className="text-muted-foreground">Conversiones</span>
          </div>
        </div>
      </div>
      
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConsultationChart;