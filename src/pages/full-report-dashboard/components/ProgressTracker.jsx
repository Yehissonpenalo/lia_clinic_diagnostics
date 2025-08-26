import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ completedSections, totalSections }) => {
  const progressPercentage = (completedSections.length / totalSections) * 100;
  
  const sections = [
    { id: 'analysis', label: 'Análisis', icon: 'BarChart3' },
    { id: 'marketing', label: 'Marketing', icon: 'Target' },
    { id: 'competitive', label: 'Competencia', icon: 'TrendingUp' },
    { id: 'growth', label: 'Crecimiento', icon: 'Zap' }
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Progreso del Informe</h3>
          <p className="text-sm text-muted-foreground">
            {completedSections.length} de {totalSections} secciones completadas
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</p>
          <p className="text-xs text-muted-foreground">Completado</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-3 mb-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Section Status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sections.map((section) => {
          const isCompleted = completedSections.includes(section.id);
          return (
            <div
              key={section.id}
              className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                isCompleted
                  ? 'bg-success/10 text-success' :'bg-muted/50 text-muted-foreground'
              }`}
            >
              <div className="relative mb-2">
                <Icon name={section.icon} size={20} />
                {isCompleted && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={10} className="text-white" />
                  </div>
                )}
              </div>
              <span className="text-xs font-medium text-center">{section.label}</span>
            </div>
          );
        })}
      </div>

      {/* Completion Message */}
      {progressPercentage === 100 && (
        <div className="mt-4 p-4 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <div>
              <p className="font-medium text-success">¡Informe Completado!</p>
              <p className="text-sm text-success/80">
                Has revisado todas las secciones del análisis
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Encouragement Message */}
      {progressPercentage > 0 && progressPercentage < 100 && (
        <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-3">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <div>
              <p className="font-medium text-primary">¡Excelente Progreso!</p>
              <p className="text-sm text-primary/80">
                Continúa revisando las secciones para obtener insights completos
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;