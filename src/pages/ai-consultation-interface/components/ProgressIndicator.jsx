import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ progress = 0, currentStep = 1, totalSteps = 10 }) => {
  const progressPercentage = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className="bg-card border border-border rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="MessageSquare" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Progreso de Consulta</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {currentStep} de {totalSteps}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Progress Text */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">
          {progressPercentage < 25 && "Comenzando evaluación..."}
          {progressPercentage >= 25 && progressPercentage < 50 && "Recopilando información..."}
          {progressPercentage >= 50 && progressPercentage < 75 && "Analizando situación..."}
          {progressPercentage >= 75 && progressPercentage < 100 && "Finalizando diagnóstico..."}
          {progressPercentage === 100 && "¡Consulta completada!"}
        </span>
        <span className="font-medium text-primary">
          {Math.round(progressPercentage)}%
        </span>
      </div>

      {/* Milestone Indicators */}
      <div className="flex justify-between mt-3 px-1">
        {[0, 25, 50, 75, 100].map((milestone, index) => (
          <div
            key={milestone}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              progressPercentage >= milestone
                ? 'bg-primary' :'bg-muted'
            }`}
            title={`${milestone}% completado`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;