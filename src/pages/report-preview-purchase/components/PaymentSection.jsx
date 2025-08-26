import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentSection = ({ onPurchase, isLoading = false }) => {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Tarjeta de Crédito/Débito',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, American Express',
      popular: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'Wallet',
      description: 'Pago seguro con PayPal',
      popular: false
    }
  ];

  const securityFeatures = [
    { icon: 'Shield', text: 'Encriptación SSL 256-bit' },
    { icon: 'Lock', text: 'Datos protegidos por Stripe' },
    { icon: 'CheckCircle', text: 'Cumplimiento PCI DSS' },
    { icon: 'Eye', text: 'No almacenamos información de pago' }
  ];

  const pricingBreakdown = {
    reportValue: 97,
    consultationValue: 150,
    discount: 237,
    finalPrice: 10
  };

  const guarantees = [
    'Garantía de satisfacción 30 días',
    'Acceso inmediato tras el pago',
    'Descarga en PDF de por vida',
    'Consulta con experto incluida'
  ];

  const handlePurchase = () => {
    if (onPurchase) {
      onPurchase(selectedPayment);
    }
  };

  return (
    <div className="space-y-6">
      {/* Pricing Summary */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/20">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Obtenga Su Reporte Completo Ahora
          </h2>
          <p className="text-muted-foreground">
            Acceso inmediato a su análisis personalizado y plan de acción
          </p>
        </div>

        {/* Price Breakdown */}
        <div className="bg-card rounded-lg p-6 border border-border mb-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Reporte Diagnóstico Completo</span>
              <span className="text-muted-foreground line-through">${pricingBreakdown.reportValue}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Consulta con Experto (30 min)</span>
              <span className="text-muted-foreground line-through">${pricingBreakdown.consultationValue}</span>
            </div>
            <div className="flex justify-between items-center text-success">
              <span className="font-medium">Descuento de Lanzamiento</span>
              <span className="font-medium">-${pricingBreakdown.discount}</span>
            </div>
            <hr className="border-border" />
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-foreground">Total Hoy</span>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">${pricingBreakdown.finalPrice} USD</div>
                <div className="text-sm text-success">Ahorro del 96%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Highlights */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
              <span className="text-muted-foreground">{guarantee}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Seleccione Método de Pago
        </h3>

        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => (
            <div key={method.id} className="relative">
              <input
                type="radio"
                id={method.id}
                name="payment"
                value={method.id}
                checked={selectedPayment === method.id}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="sr-only"
              />
              <label
                htmlFor={method.id}
                className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedPayment === method.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPayment === method.id
                    ? 'border-primary bg-primary' :'border-muted'
                }`}>
                  {selectedPayment === method.id && (
                    <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  )}
                </div>
                
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedPayment === method.id ? 'bg-primary/10' : 'bg-muted/50'
                }`}>
                  <Icon 
                    name={method.icon} 
                    size={20} 
                    className={selectedPayment === method.id ? 'text-primary' : 'text-muted-foreground'} 
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{method.name}</span>
                    {method.popular && (
                      <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
              </label>
            </div>
          ))}
        </div>

        {/* Security Information */}
        <div className="bg-success/5 rounded-lg p-4 border border-success/20 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-success flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-success mb-2">Pago 100% Seguro</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <Icon name={feature.icon} size={14} className="text-success" />
                    <span className="text-muted-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Button */}
        <Button
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          onClick={handlePurchase}
          iconName="CreditCard"
          iconPosition="left"
          className="mb-4"
        >
          {isLoading ? 'Procesando Pago...' : `Pagar $${pricingBreakdown.finalPrice} USD - Acceso Inmediato`}
        </Button>

        {/* Additional Security Info */}
        <div className="text-center">
          <button
            onClick={() => setShowSecurityInfo(!showSecurityInfo)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center space-x-1 mx-auto"
          >
            <Icon name="Info" size={14} />
            <span>¿Por qué es seguro pagar aquí?</span>
            <Icon name={showSecurityInfo ? "ChevronUp" : "ChevronDown"} size={14} />
          </button>

          {showSecurityInfo && (
            <div className="mt-4 p-4 bg-muted/30 rounded-lg text-left">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Stripe:</strong> Procesamos pagos a través de Stripe, 
                  la misma plataforma que usan empresas como Shopify, Lyft y Deliveroo.
                </p>
                <p>
                  <strong className="text-foreground">Encriptación:</strong> Todos los datos se transmiten 
                  con encriptación SSL de grado bancario.
                </p>
                <p>
                  <strong className="text-foreground">Privacidad:</strong> No almacenamos ni tenemos acceso 
                  a su información de tarjeta de crédito.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Urgency Reminder */}
      <div className="bg-warning/5 rounded-lg p-4 border border-warning/20">
        <div className="flex items-center space-x-3">
          <Icon name="Clock" size={20} className="text-warning flex-shrink-0" />
          <div>
            <p className="text-sm text-foreground font-medium">
              ⚡ Oferta de lanzamiento por tiempo limitado
            </p>
            <p className="text-xs text-muted-foreground">
              El precio regular es $97 USD. Esta oferta especial termina pronto.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} className="text-success" />
          <span>SSL Seguro</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Lock" size={14} className="text-primary" />
          <span>Datos Protegidos</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="CheckCircle" size={14} className="text-accent" />
          <span>Pago Verificado</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;