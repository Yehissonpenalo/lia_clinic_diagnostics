import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import ReportPreviewSection from './components/ReportPreviewSection';
import ValuePropositionSection from './components/ValuePropositionSection';
import TestimonialSection from './components/TestimonialSection';
import PaymentSection from './components/PaymentSection';
import ExpertConnectionSection from './components/ExpertConnectionSection';
import Icon from '../../components/AppIcon';

const ReportPreviewPurchase = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);

  // Mock user data
  const user = {
    name: "Dr. María González",
    role: "Directora Médica",
    email: "maria.gonzalez@clinicasalud.com"
  };

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'es';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handlePurchase = async (paymentMethod) => {
    setIsLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock successful payment
      console.log('Payment processed:', paymentMethod);
      
      // Navigate to full report dashboard
      navigate('/full-report-dashboard', { 
        state: { 
          purchaseSuccess: true,
          paymentMethod: paymentMethod,
          reportId: 'RPT-' + Date.now()
        }
      });
    } catch (error) {
      console.error('Payment failed:', error);
      // Handle payment error
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <DashboardNavigation user={user} />

      {/* Main Content */}
      <main className="pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center py-8 mb-8">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Su Análisis Diagnóstico Personalizado
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Descubra las oportunidades exactas para hacer crecer su clínica con estrategias 
                probadas que han transformado más de 500 prácticas médicas en Latinoamérica
              </p>
              
              {/* Quick Navigation */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <button
                  onClick={() => scrollToSection('preview')}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors duration-200"
                >
                  <Icon name="Eye" size={16} />
                  <span className="text-sm font-medium">Ver Preview</span>
                </button>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="flex items-center space-x-2 px-4 py-2 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-colors duration-200"
                >
                  <Icon name="MessageCircle" size={16} />
                  <span className="text-sm font-medium">Testimonios</span>
                </button>
                <button
                  onClick={() => scrollToSection('purchase')}
                  className="flex items-center space-x-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200"
                >
                  <Icon name="CreditCard" size={16} />
                  <span className="text-sm font-medium">Obtener Reporte</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span>Pago Seguro</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span>Acceso Inmediato</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={16} className="text-accent" />
                  <span>Garantía 30 Días</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-16">
            {/* Report Preview Section */}
            <section id="preview" className="scroll-mt-20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Vista Previa de Su Reporte (30%)
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Esto es solo una muestra de lo que encontrará en su análisis completo. 
                  El reporte completo incluye estrategias detalladas y plan de implementación.
                </p>
              </div>
              <ReportPreviewSection />
            </section>

            {/* Value Proposition Section */}
            <section id="value" className="scroll-mt-20">
              <ValuePropositionSection />
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="scroll-mt-20">
              <TestimonialSection />
            </section>

            {/* Expert Connection Section */}
            <section id="expert" className="scroll-mt-20">
              <ExpertConnectionSection />
            </section>

            {/* Payment Section */}
            <section id="purchase" className="scroll-mt-20">
              <div className="max-w-2xl mx-auto">
                <PaymentSection 
                  onPurchase={handlePurchase}
                  isLoading={isLoading}
                />
              </div>
            </section>
          </div>

          {/* Final CTA Section */}
          <div className="py-16 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  ¿Listo para Transformar Su Clínica?
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Únase a más de 500 profesionales de la salud que ya han transformado 
                  sus prácticas con nuestras estrategias probadas.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4">
                    <div className="text-2xl font-bold text-primary mb-1">$10</div>
                    <div className="text-sm text-muted-foreground">Inversión única</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-2xl font-bold text-success mb-1">$5K+</div>
                    <div className="text-sm text-muted-foreground">Ingresos adicionales promedio</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-2xl font-bold text-accent mb-1">90 días</div>
                    <div className="text-sm text-muted-foreground">Para ver resultados</div>
                  </div>
                </div>

                <button
                  onClick={() => scrollToSection('purchase')}
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 text-lg font-semibold"
                >
                  <Icon name="ArrowRight" size={20} />
                  <span>Obtener Mi Reporte Ahora</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-xl p-8 max-w-md w-full mx-4 text-center border border-border shadow-xl">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="animate-spin">
                <Icon name="Loader2" size={32} className="text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Procesando Su Pago
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Por favor espere mientras procesamos su transacción de forma segura...
            </p>
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Shield" size={14} className="text-success" />
              <span>Conexión segura SSL</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => scrollToSection('purchase')}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all duration-200 flex items-center justify-center group"
          aria-label="Ir a comprar reporte"
        >
          <Icon name="ShoppingCart" size={24} className="group-hover:scale-110 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};

export default ReportPreviewPurchase;