import React from 'react';
import Icon from '../../../components/AppIcon';

const ReportTabs = ({ activeTab, onTabChange, completedSections }) => {
  const tabs = [
    {
      id: 'analysis',
      label: 'Análisis de Clínica',
      icon: 'BarChart3',
      description: 'Evaluación integral del estado actual'
    },
    {
      id: 'marketing',
      label: 'Recomendaciones',
      icon: 'Target',
      description: 'Estrategias de marketing personalizadas'
    },
    {
      id: 'competitive',
      label: 'Análisis Competitivo',
      icon: 'TrendingUp',
      description: 'Posicionamiento en el mercado'
    },
    {
      id: 'growth',
      label: 'Oportunidades',
      icon: 'Zap',
      description: 'Áreas de crecimiento identificadas'
    }
  ];

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      {/* Desktop Tabs */}
      <div className="hidden md:flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex items-center space-x-3 px-6 py-4 text-left transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-primary/5 text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <div className="relative">
              <Icon name={tab.icon} size={20} />
              {completedSections.includes(tab.id) && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Check" size={8} className="text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="font-medium">{tab.label}</div>
              <div className="text-xs opacity-75">{tab.description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Mobile Tabs */}
      <div className="md:hidden">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-shrink-0 flex flex-col items-center space-y-2 px-4 py-4 min-w-[100px] transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary/5 text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="relative">
                <Icon name={tab.icon} size={20} />
                {completedSections.includes(tab.id) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={8} className="text-white" />
                  </div>
                )}
              </div>
              <span className="text-xs font-medium text-center leading-tight">
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportTabs;