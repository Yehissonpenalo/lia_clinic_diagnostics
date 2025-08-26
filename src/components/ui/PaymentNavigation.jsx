import React from 'react';
import Icon from '../AppIcon';

const PaymentNavigation = ({ 
  onBack, 
  securityBadges = true, 
  testimonialAccess = false,
  onTestimonialClick 
}) => {
  const securityFeatures = [
    { icon: 'Shield', label: 'SSL Secured' },
    { icon: 'Lock', label: 'Encrypted' },
    { icon: 'CheckCircle', label: 'HIPAA Compliant' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Logo and Back Navigation */}
        <div className="flex items-center space-x-4">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
              aria-label="Go back"
            >
              <Icon name="ArrowLeft" size={20} />
            </button>
          )}
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary-foreground"
              >
                <path
                  d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                  fill="currentColor"
                />
                <path
                  d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z"
                  fill="currentColor"
                  opacity="0.7"
                />
                <path
                  d="M5 6L5.5 8.5L8 9L5.5 9.5L5 12L4.5 9.5L2 9L4.5 8.5L5 6Z"
                  fill="currentColor"
                  opacity="0.7"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">LIA</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Secure Checkout</p>
            </div>
          </div>
        </div>

        {/* Security Badges and Actions */}
        <div className="flex items-center space-x-4">
          {/* Security Indicators */}
          {securityBadges && (
            <div className="hidden md:flex items-center space-x-4">
              {securityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-3 py-1 bg-success/10 text-success rounded-full"
                  title={`${feature.label} - Your data is protected`}
                >
                  <Icon name={feature.icon} size={14} />
                  <span className="text-xs font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Mobile Security Indicator */}
          {securityBadges && (
            <div className="md:hidden flex items-center space-x-2 px-3 py-1 bg-success/10 text-success rounded-full">
              <Icon name="Shield" size={14} />
              <span className="text-xs font-medium">Secure</span>
            </div>
          )}

          {/* Testimonial Access */}
          {testimonialAccess && onTestimonialClick && (
            <button
              onClick={onTestimonialClick}
              className="flex items-center space-x-2 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
              title="View customer testimonials"
            >
              <Icon name="MessageCircle" size={16} />
              <span className="hidden sm:inline text-sm">Reviews</span>
            </button>
          )}

          {/* Help/Support */}
          <button
            onClick={() => console.log('Help clicked')}
            className="flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
            aria-label="Get help"
            title="Need help? Contact support"
          >
            <Icon name="HelpCircle" size={20} />
          </button>
        </div>
      </div>

      {/* Value Proposition Banner */}
      <div className="bg-accent/5 border-b border-accent/20">
        <div className="px-4 sm:px-6 py-2">
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-2 text-accent">
              <Icon name="Clock" size={14} />
              <span className="font-medium">Instant Access</span>
            </div>
            <div className="w-1 h-1 bg-accent/50 rounded-full" />
            <div className="flex items-center space-x-2 text-accent">
              <Icon name="Award" size={14} />
              <span className="font-medium">Expert Analysis</span>
            </div>
            <div className="w-1 h-1 bg-accent/50 rounded-full hidden sm:block" />
            <div className="hidden sm:flex items-center space-x-2 text-accent">
              <Icon name="Users" size={14} />
              <span className="font-medium">Trusted by 1000+ Clinics</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PaymentNavigation;