import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ExpertConnectionSection = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  const expertProfile = {
    name: "Yehisson Peñaló",
    title: "Experto en Marketing Médico",
    experience: "8+ años",
    location: "Especialista en Latinoamérica",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    credentials: [
      "Certificado en Marketing Digital Médico",
      "Especialista en Growth Hacking para Clínicas",
      "Consultor de 500+ Profesionales de Salud",
      "Experto en Regulaciones Médicas LATAM"
    ],
    specialties: [
      "Marketing Digital para Clínicas",
      "Estrategias de Retención de Pacientes",
      "Optimización de Conversiones Médicas",
      "Compliance y Regulaciones de Salud"
    ]
  };

  const successStories = [
    {
      metric: "500+",
      description: "Clínicas transformadas",
      icon: "Building"
    },
    {
      metric: "$2.3M",
      description: "Ingresos generados para clientes",
      icon: "DollarSign"
    },
    {
      metric: "156%",
      description: "Crecimiento promedio en pacientes",
      icon: "TrendingUp"
    },
    {
      metric: "94%",
      description: "Tasa de éxito en implementación",
      icon: "Target"
    }
  ];

  const consultationIncludes = [
    {
      title: "Análisis Personalizado",
      description: "Revisión detallada de su reporte y situación específica",
      icon: "Search"
    },
    {
      title: "Plan de Implementación",
      description: "Roadmap paso a paso para los próximos 90 días",
      icon: "Map"
    },
    {
      title: "Recursos Exclusivos",
      description: "Plantillas, scripts y herramientas personalizadas",
      icon: "Gift"
    },
    {
      title: "Seguimiento Estratégico",
      description: "Recomendaciones para maximizar resultados",
      icon: "Compass"
    }
  ];

  const contactMethods = [
    {
      platform: "WhatsApp",
      handle: "+57 300 123 4567",
      icon: "MessageCircle",
      color: "text-success bg-success/10",
      action: "Enviar mensaje"
    },
    {
      platform: "Instagram",
      handle: "@yehisson.marketing",
      icon: "Instagram",
      color: "text-secondary bg-secondary/10",
      action: "Seguir perfil"
    },
    {
      platform: "Email",
      handle: "yehisson@liadiagnostics.com",
      icon: "Mail",
      color: "text-primary bg-primary/10",
      action: "Enviar email"
    }
  ];

  const handleContactClick = (method) => {
    let url = '';
    switch (method.platform) {
      case 'WhatsApp':
        url = `https://wa.me/573001234567?text=Hola%20Yehisson,%20me%20interesa%20la%20consulta%20de%20marketing%20médico%20incluida%20con%20mi%20reporte%20LIA.`;
        break;
      case 'Instagram':
        url = 'https://instagram.com/yehisson.marketing';
        break;
      case 'Email':
        url = 'mailto:yehisson@liadiagnostics.com?subject=Consulta%20Marketing%20Médico%20-%20Reporte%20LIA';
        break;
      default:
        return;
    }
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Expert Introduction */}
      <div className="bg-gradient-to-br from-secondary/5 to-primary/5 rounded-xl p-8 border border-secondary/20">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Conozca a Su Experto en Marketing Médico
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cada reporte incluye una consulta personalizada de 30 minutos con Yehisson Peñaló, 
            especialista en transformar clínicas en Latinoamérica
          </p>
        </div>

        <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Expert Photo and Basic Info */}
            <div className="flex-shrink-0 text-center lg:text-left">
              <div className="w-32 h-32 mx-auto lg:mx-0 mb-4">
                <Image
                  src={expertProfile.avatar}
                  alt={expertProfile.name}
                  className="w-full h-full rounded-full object-cover border-4 border-secondary/20"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground">{expertProfile.name}</h3>
              <p className="text-secondary font-semibold">{expertProfile.title}</p>
              <p className="text-sm text-muted-foreground">{expertProfile.experience} • {expertProfile.location}</p>
              
              <div className="mt-4 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowContactModal(true)}
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Contactar Ahora
                </Button>
              </div>
            </div>

            {/* Expert Details */}
            <div className="flex-1 space-y-6">
              {/* Credentials */}
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                  <Icon name="Award" size={18} className="text-accent" />
                  <span>Credenciales y Certificaciones</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {expertProfile.credentials.map((credential, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <Icon name="CheckCircle" size={14} className="text-success flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{credential}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                  <Icon name="Star" size={18} className="text-primary" />
                  <span>Áreas de Especialización</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {expertProfile.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Metrics */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Resultados Comprobados
          </h3>
          <p className="text-muted-foreground">
            Métricas reales del impacto de Yehisson en la industria médica
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {successStories.map((story, index) => (
            <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name={story.icon} size={24} className="text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{story.metric}</div>
              <div className="text-sm text-muted-foreground">{story.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Details */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Qué Incluye Su Consulta Personalizada
          </h3>
          <p className="text-muted-foreground">
            30 minutos de consultoría estratégica valorada en $150 USD - INCLUIDA GRATIS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {consultationIncludes.map((item, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} size={20} className="text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-accent/5 rounded-lg p-4 border border-accent/20">
          <div className="flex items-start space-x-3">
            <Icon name="Calendar" size={20} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-accent mb-1">Cómo Programar Su Consulta</h4>
              <p className="text-sm text-muted-foreground">
                Después de adquirir su reporte, recibirá un enlace para programar su consulta 
                en el horario que mejor le convenga. Disponible de lunes a viernes, 
                9:00 AM - 6:00 PM (hora de Colombia).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl p-6 max-w-md w-full border border-border shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Contactar a Yehisson</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Icon name="X" size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {contactMethods.map((method, index) => (
                <button
                  key={index}
                  onClick={() => handleContactClick(method)}
                  className="w-full flex items-center space-x-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${method.color}`}>
                    <Icon name={method.icon} size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-foreground">{method.platform}</div>
                    <div className="text-sm text-muted-foreground">{method.handle}</div>
                  </div>
                  <div className="text-sm text-primary font-medium">{method.action}</div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-success/5 rounded-lg border border-success/20">
              <p className="text-sm text-success text-center">
                💡 Recuerde: Su consulta está incluida GRATIS con la compra del reporte completo
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/20 text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">
          ¿Listo para Transformar Su Clínica?
        </h3>
        <p className="text-muted-foreground mb-4">
          Obtenga su reporte completo + consulta personalizada con Yehisson por solo $10 USD
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} className="text-accent" />
            <span>Acceso inmediato</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} className="text-success" />
            <span>Garantía 30 días</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={14} className="text-primary" />
            <span>Experto certificado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertConnectionSection;