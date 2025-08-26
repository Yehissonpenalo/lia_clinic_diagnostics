import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ConsultationComplete = ({ onViewReport, onStartNew, reportPreview }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 m-4">
      <div className="text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-foreground mb-2">
          ¡Consulta Completada!
        </h2>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
          He analizado toda la información de tu clínica y he generado un diagnóstico completo con recomendaciones personalizadas para hacer crecer tu negocio.
        </p>

        {/* Report Preview Stats */}
        {reportPreview && (
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {reportPreview.weaknessesFound || 5}
                </div>
                <div className="text-xs text-muted-foreground">
                  Áreas de mejora identificadas
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">
                  {reportPreview.recommendationsCount || 12}
                </div>
                <div className="text-xs text-muted-foreground">
                  Recomendaciones personalizadas
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="default"
            fullWidth
            onClick={onViewReport}
            iconName="FileText"
            iconPosition="left"
          >
            Ver Reporte Completo
          </Button>

          <Button
            variant="outline"
            fullWidth
            onClick={onStartNew}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Nueva Consulta
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-accent mb-1">
                ¿Necesitas ayuda implementando estas recomendaciones?
              </p>
              <p className="text-xs text-muted-foreground">
                Conecta con nuestro experto en marketing Yehisson Peñaló para una consulta personalizada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationComplete;