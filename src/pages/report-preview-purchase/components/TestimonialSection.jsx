import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Dr. María Elena Rodríguez",
      specialty: "Medicina Interna",
      location: "Bogotá, Colombia",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: `El reporte de LIA cambió completamente mi perspectiva sobre el marketing médico. En 3 meses pasé de 40 pacientes mensuales a 95. Las estrategias son específicas y fáciles de implementar.`,
      results: "Incremento del 137% en pacientes nuevos",
      timeframe: "3 meses"
    },
    {
      id: 2,
      name: "Dr. Carlos Mendoza",
      specialty: "Cardiología",
      location: "Ciudad de México, México",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: `Después de años luchando con el marketing, finalmente encontré una guía clara. El análisis identificó exactamente dónde estaba perdiendo pacientes. Ahora mi agenda está llena por 2 meses.`,
      results: "Lista de espera de 8 semanas",
      timeframe: "4 meses"
    },
    {
      id: 3,
      name: "Dra. Ana Sofía Herrera",
      specialty: "Ginecología",
      location: "Lima, Perú",
      avatar: "https://images.unsplash.com/photo-1594824475317-29bb4b8e3a2c?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: `Lo que más me gustó fue la consulta con Yehisson. Me ayudó a implementar las estrategias paso a paso. Mi clínica ahora genera $12,000 USD mensuales adicionales.`,
      results: "$12,000 USD adicionales/mes",
      timeframe: "5 meses"
    },
    {
      id: 4,
      name: "Dr. Roberto Silva",
      specialty: "Dermatología",
      location: "Santiago, Chile",
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: `Invertí $10 y recuperé más de $8,000 en el primer mes. Las plantillas de contenido y estrategias de redes sociales funcionan increíblemente bien para atraer pacientes de calidad.`,
      results: "ROI de 800% primer mes",
      timeframe: "1 mes"
    },
    {
      id: 5,
      name: "Dra. Patricia Vásquez",
      specialty: "Pediatría",
      location: "Quito, Ecuador",
      avatar: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      content: `Como pediatra, pensé que el marketing digital no funcionaría para mi especialidad. Me equivoqué completamente. Ahora tengo una comunidad de 2,500 padres que confían en mi expertise.`,
      results: "2,500 seguidores comprometidos",
      timeframe: "6 meses"
    }
  ];

  const successMetrics = [
    { label: "Promedio de Crecimiento", value: "156%", icon: "TrendingUp" },
    { label: "Tiempo de Implementación", value: "30 días", icon: "Clock" },
    { label: "ROI Promedio", value: "450%", icon: "DollarSign" },
    { label: "Satisfacción", value: "98%", icon: "Heart" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-accent fill-current" : "text-muted"}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Success Metrics */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Resultados Reales de Profesionales Como Usted
          </h2>
          <p className="text-muted-foreground">
            Más de 500 clínicas han transformado su práctica con nuestras estrategias
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {successMetrics.map((metric, index) => (
            <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name={metric.icon} size={24} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Testimonial Carousel */}
      <div className="bg-gradient-to-br from-secondary/5 to-primary/5 rounded-xl p-8 border border-secondary/20">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Lo Que Dicen Nuestros Colegas
          </h3>
          <p className="text-muted-foreground">
            Testimonios reales de profesionales de la salud en Latinoamérica
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar and Info */}
              <div className="flex-shrink-0 text-center md:text-left">
                <div className="w-20 h-20 mx-auto md:mx-0 mb-4">
                  <Image
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-full h-full rounded-full object-cover border-4 border-secondary/20"
                  />
                </div>
                <h4 className="font-semibold text-foreground">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-sm text-secondary font-medium">
                  {testimonials[currentTestimonial].specialty}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonials[currentTestimonial].location}
                </p>
                <div className="flex justify-center md:justify-start space-x-1 mt-2">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1">
                <div className="mb-4">
                  <Icon name="Quote" size={32} className="text-secondary/30 mb-4" />
                  <p className="text-foreground text-lg leading-relaxed italic">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-success/10 rounded-lg p-4 border border-success/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="TrendingUp" size={16} className="text-success" />
                      <span className="text-sm font-medium text-success">Resultado</span>
                    </div>
                    <p className="text-sm text-foreground font-semibold">
                      {testimonials[currentTestimonial].results}
                    </p>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Calendar" size={16} className="text-primary" />
                      <span className="text-sm font-medium text-primary">Tiempo</span>
                    </div>
                    <p className="text-sm text-foreground font-semibold">
                      {testimonials[currentTestimonial].timeframe}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
              aria-label="Testimonio anterior"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentTestimonial ? 'bg-secondary' : 'bg-muted'
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
              aria-label="Siguiente testimonio"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.slice(0, 3).map((testimonial) => (
          <div key={testimonial.id} className="bg-card rounded-lg p-6 border border-border shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                <p className="text-xs text-muted-foreground">{testimonial.specialty}</p>
                <div className="flex space-x-1 mt-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              "{testimonial.content.substring(0, 120)}..."
            </p>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="text-xs text-success font-medium">
                {testimonial.results}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="bg-muted/30 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span>Datos Verificados</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span>500+ Profesionales</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={16} className="text-accent" />
            <span>Resultados Garantizados</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;