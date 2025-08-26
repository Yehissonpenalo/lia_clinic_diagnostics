import React, { useState, useEffect } from 'react';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoSection from './components/PersonalInfoSection';
import ClinicInfoSection from './components/ClinicInfoSection';
import PreferencesSection from './components/PreferencesSection';
import ConsultationHistory from './components/ConsultationHistory';
import SecuritySection from './components/SecuritySection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const UserProfileManagement = () => {
  const [user, setUser] = useState({
    id: 1,
    name: "Dr. María Elena Rodríguez",
    email: "maria.rodriguez@clinicasalud.com",
    whatsapp: "+52 55 1234 5678",
    phone: "+52 55 8765 4321",
    gender: "female",
    birthDate: "1985-03-15",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    clinicName: "Clínica Salud Integral",
    specialty: "general",
    experience: "11-15",
    address: "Av. Reforma 123, Col. Centro",
    city: "Ciudad de México",
    country: "mx",
    website: "https://www.clinicasaludintegral.com",
    licenseNumber: "12345678",
    language: "es",
    joinDate: "Enero 2024",
    consultations: 12,
    reports: 8,
    score: 87,
    notifications: {
      email: true,
      whatsapp: true,
      reports: true,
      marketing: false
    },
    privacy: {
      dataCollection: true,
      analytics: true,
      thirdParty: false
    },
    consultation: {
      autoSave: true,
      detailedReports: true,
      followUp: true
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [currentLanguage, setCurrentLanguage] = useState('es');

  // Check for saved language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('userLanguage') || 'es';
    setCurrentLanguage(savedLanguage);
    setUser(prev => ({ ...prev, language: savedLanguage }));
  }, []);

  const tabs = [
    { id: 'personal', label: 'Información Personal', icon: 'User' },
    { id: 'clinic', label: 'Clínica', icon: 'Building2' },
    { id: 'preferences', label: 'Preferencias', icon: 'Settings' },
    { id: 'history', label: 'Historial', icon: 'History' },
    { id: 'security', label: 'Seguridad', icon: 'Shield' }
  ];

  const handlePersonalInfoSave = async (formData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setUser(prev => ({
        ...prev,
        ...formData
      }));
      
      console.log('Información personal actualizada:', formData);
    } catch (error) {
      console.error('Error updating personal info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClinicInfoSave = async (formData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setUser(prev => ({
        ...prev,
        ...formData
      }));
      
      console.log('Información de clínica actualizada:', formData);
    } catch (error) {
      console.error('Error updating clinic info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferencesSave = async (preferences) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update language in localStorage and state
      if (preferences.language !== currentLanguage) {
        localStorage.setItem('userLanguage', preferences.language);
        setCurrentLanguage(preferences.language);
      }
      
      setUser(prev => ({
        ...prev,
        language: preferences.language,
        notifications: preferences.notifications,
        privacy: preferences.privacy,
        consultation: preferences.consultation
      }));
      
      console.log('Preferencias actualizadas:', preferences);
    } catch (error) {
      console.error('Error updating preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (passwordData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Contraseña actualizada');
      alert('Contraseña actualizada exitosamente');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error al cambiar la contraseña');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccountDelete = async (reason) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Cuenta eliminada. Motivo:', reason);
      alert('Cuenta eliminada exitosamente');
      // In real app, redirect to login or home page
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Error al eliminar la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarClick = () => {
    console.log('Avatar clicked - open avatar selection modal');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoSection
            user={user}
            onSave={handlePersonalInfoSave}
            isLoading={isLoading}
          />
        );
      case 'clinic':
        return (
          <ClinicInfoSection
            user={user}
            onSave={handleClinicInfoSave}
            isLoading={isLoading}
          />
        );
      case 'preferences':
        return (
          <PreferencesSection
            user={user}
            onSave={handlePreferencesSave}
            isLoading={isLoading}
          />
        );
      case 'history':
        return <ConsultationHistory />;
      case 'security':
        return (
          <SecuritySection
            onPasswordChange={handlePasswordChange}
            onAccountDelete={handleAccountDelete}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavigation user={user} />
      
      <main className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <ProfileHeader user={user} onAvatarClick={handleAvatarClick} />

          {/* Navigation Tabs */}
          <div className="bg-card rounded-xl border border-border mb-6">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="animate-scale-in">
            {renderTabContent()}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Acciones Rápidas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                iconName="MessageSquare"
                iconPosition="left"
                onClick={() => console.log('Nueva consulta')}
                fullWidth
              >
                Nueva Consulta
              </Button>
              
              <Button
                variant="outline"
                iconName="FileText"
                iconPosition="left"
                onClick={() => console.log('Ver reportes')}
                fullWidth
              >
                Ver Reportes
              </Button>
              
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={() => console.log('Exportar datos')}
                fullWidth
              >
                Exportar Datos
              </Button>
              
              <Button
                variant="outline"
                iconName="HelpCircle"
                iconPosition="left"
                onClick={() => console.log('Contactar soporte')}
                fullWidth
              >
                Soporte
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  ¿Necesitas ayuda personalizada?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Conecta directamente con Yehisson Peñaló, nuestro experto en marketing médico
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="default"
                    iconName="MessageCircle"
                    iconPosition="left"
                    onClick={() => window.open(`https://wa.me/${user.whatsapp?.replace(/\D/g, '')}`, '_blank')}
                  >
                    WhatsApp
                  </Button>
                  
                  <Button
                    variant="outline"
                    iconName="Mail"
                    iconPosition="left"
                    onClick={() => window.open('mailto:yehisson@liadiagnostics.com', '_blank')}
                  >
                    Email
                  </Button>
                  
                  <Button
                    variant="outline"
                    iconName="Instagram"
                    iconPosition="left"
                    onClick={() => window.open('https://instagram.com/yehissonpenalo', '_blank')}
                  >
                    Instagram
                  </Button>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Icon name="Users" size={32} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfileManagement;