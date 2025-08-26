import React from 'react';
import Icon from '../../../components/AppIcon';

const ValuePropositionSection = () => {
  const benefits = [
    {
      icon: 'TrendingUp',
      title: 'Crecimiento Garantizado',
      description: 'Estrategias probadas que han ayudado a más de 500 clínicas a aumentar sus pacientes en un 40-60%.',
      color: 'text-success bg-success/10'
    },
    {
      icon: 'Clock',
      title: 'Ahorro de Tiempo',
      description: 'Deje de perder horas en marketing inefectivo. Nuestro plan le da 20+ horas semanales para sus pacientes.',
      color: 'text-primary bg-primary/10'
    },
    {
      icon: 'DollarSign',
      title: 'ROI Comprobado',
      description: 'Inversión que se paga sola. Clientes reportan incrementos de $5,000-$15,000 mensuales en 90 días.',
      color: 'text-accent bg-accent/10'
    },
    {
      icon: 'Users',
      title: 'Más Pacientes Ideales',
      description: 'Atraiga pacientes que valoran su expertise y están dispuestos a pagar por calidad médica.',
      color: 'text-secondary bg-secondary/10'
    }
  ];

  const includedFeatures = [
    'Análisis completo de 47 puntos críticos',
    'Plan de marketing personalizado de 90 días',
    'Plantillas de contenido para redes sociales',
    'Estrategias de retención de pacientes',
    'Análisis competitivo detallado',
    'Proyecciones financieras realistas',
    'Consulta de 30 minutos con Yehisson Peñaló',
    'Acceso a recursos exclusivos y actualizaciones'
  ];

  const urgencyFactors = [
    {
      icon: 'AlertTriangle',
      text: 'Cada día sin estrategia = pacientes perdidos ante la competencia'
    },
    {
      icon: 'Calendar',
      text: 'Solo 50 reportes disponibles este mes (quedan 23)'
    },
    {
      icon: 'Star',
      text: 'Precio especial de lanzamiento - valor real $97 USD'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Main Value Proposition */}
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 border border-primary/20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Transforme Su Clínica en una Máquina de Crecimiento
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Deje de luchar con el marketing y enfóquese en lo que mejor hace: cuidar pacientes. 
            Nuestro reporte completo le da el mapa exacto para duplicar su base de pacientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${benefit.color}`}>
                  <Icon name={benefit.icon} size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Numbers */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Clínicas Transformadas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success mb-1">$2.3M</div>
              <div className="text-sm text-muted-foreground">Ingresos Generados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-1">94%</div>
              <div className="text-sm text-muted-foreground">Tasa de Éxito</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary mb-1">4.9/5</div>
              <div className="text-sm text-muted-foreground">Satisfacción</div>
            </div>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Qué Incluye Su Reporte Completo
          </h2>
          <p className="text-muted-foreground">
            Todo lo que necesita para implementar una estrategia de marketing ganadora
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {includedFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0" />
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg p-6 border border-accent/30">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Gift" size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Bonus Exclusivo</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Consulta personalizada de 30 minutos con Yehisson Peñaló, experto en marketing 
                médico con más de 8 años transformando clínicas en Latinoamérica.
              </p>
              <div className="text-xs text-accent font-medium">
                Valor: $150 USD • Incluido GRATIS con su reporte
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Urgency Section */}
      <div className="bg-gradient-to-r from-error/5 to-warning/5 rounded-xl p-6 border border-error/20">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-foreground mb-2">
            ⚠️ No Espere Más - Su Competencia Ya Está Actuando
          </h3>
          <p className="text-muted-foreground">
            Cada día que pasa sin una estrategia clara es dinero y pacientes perdidos
          </p>
        </div>

        <div className="space-y-3">
          {urgencyFactors.map((factor, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border">
              <Icon name={factor.icon} size={20} className="text-warning flex-shrink-0" />
              <span className="text-sm text-foreground">{factor.text}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-warning/10 text-warning rounded-full text-sm font-medium">
            <Icon name="Clock" size={16} />
            <span>Oferta válida por tiempo limitado</span>
          </div>
        </div>
      </div>

      {/* Risk Reversal */}
      <div className="bg-success/5 rounded-xl p-6 border border-success/20">
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={32} className="text-success" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3">
            Garantía de Satisfacción 100%
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Si no está completamente satisfecho con su reporte y no ve valor inmediato 
            en las estrategias proporcionadas, le devolvemos su dinero sin preguntas. 
            Su éxito es nuestra prioridad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValuePropositionSection;