import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const PreferencesSection = ({ user, onSave, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [preferences, setPreferences] = useState({
    language: user.language || 'es',
    notifications: {
      email: user.notifications?.email ?? true,
      whatsapp: user.notifications?.whatsapp ?? true,
      reports: user.notifications?.reports ?? true,
      marketing: user.notifications?.marketing ?? false
    },
    privacy: {
      dataCollection: user.privacy?.dataCollection ?? true,
      analytics: user.privacy?.analytics ?? true,
      thirdParty: user.privacy?.thirdParty ?? false
    },
    consultation: {
      autoSave: user.consultation?.autoSave ?? true,
      detailedReports: user.consultation?.detailedReports ?? true,
      followUp: user.consultation?.followUp ?? true
    }
  });

  const languageOptions = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' }
  ];

  const handleLanguageChange = (language) => {
    setPreferences(prev => ({
      ...prev,
      language
    }));
  };

  const handleNotificationChange = (key, checked) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: checked
      }
    }));
  };

  const handlePrivacyChange = (key, checked) => {
    setPreferences(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: checked
      }
    }));
  };

  const handleConsultationChange = (key, checked) => {
    setPreferences(prev => ({
      ...prev,
      consultation: {
        ...prev.consultation,
        [key]: checked
      }
    }));
  };

  const handleSave = async () => {
    await onSave(preferences);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPreferences({
      language: user.language || 'es',
      notifications: {
        email: user.notifications?.email ?? true,
        whatsapp: user.notifications?.whatsapp ?? true,
        reports: user.notifications?.reports ?? true,
        marketing: user.notifications?.marketing ?? false
      },
      privacy: {
        dataCollection: user.privacy?.dataCollection ?? true,
        analytics: user.privacy?.analytics ?? true,
        thirdParty: user.privacy?.thirdParty ?? false
      },
      consultation: {
        autoSave: user.consultation?.autoSave ?? true,
        detailedReports: user.consultation?.detailedReports ?? true,
        followUp: user.consultation?.followUp ?? true
      }
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Preferencias</h2>
            <p className="text-sm text-muted-foreground">Personaliza tu experiencia con LIA</p>
          </div>
        </div>
        
        {!isEditing ? (
          <Button
            variant="outline"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Editar
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              iconName="X"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              variant="default"
              iconName="Save"
              iconPosition="left"
              onClick={handleSave}
              loading={isLoading}
            >
              Guardar
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Language Preferences */}
        <div>
          <h3 className="text-base font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Globe" size={16} className="text-primary" />
            <span>Idioma</span>
          </h3>
          <Select
            label="Idioma de la Interfaz"
            options={languageOptions}
            value={preferences.language}
            onChange={handleLanguageChange}
            disabled={!isEditing}
            description="Los cambios se aplicarán inmediatamente"
          />
        </div>

        {/* Notification Preferences */}
        <div>
          <h3 className="text-base font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Bell" size={16} className="text-primary" />
            <span>Notificaciones</span>
          </h3>
          <div className="space-y-4">
            <Checkbox
              label="Notificaciones por Email"
              description="Recibir actualizaciones y reportes por correo electrónico"
              checked={preferences.notifications.email}
              onChange={(e) => handleNotificationChange('email', e.target.checked)}
              disabled={!isEditing}
            />
            <Checkbox
              label="Notificaciones por WhatsApp"
              description="Recibir alertas importantes por WhatsApp"
              checked={preferences.notifications.whatsapp}
              onChange={(e) => handleNotificationChange('whatsapp', e.target.checked)}
              disabled={!isEditing}
            />
            <Checkbox
              label="Alertas de Reportes"
              description="Notificar cuando los reportes estén listos"
              checked={preferences.notifications.reports}
              onChange={(e) => handleNotificationChange('reports', e.target.checked)}
              disabled={!isEditing}
            />
            <Checkbox
              label="Comunicaciones de Marketing"
              description="Recibir consejos y actualizaciones sobre marketing médico"
              checked={preferences.notifications.marketing}
              onChange={(e) => handleNotificationChange('marketing', e.target.checked)}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Privacy Settings */}
        <div>
          <h3 className="text-base font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-primary" />
            <span>Privacidad y Datos</span>
          </h3>
          <div className="space-y-4">
            <Checkbox
              label="Recopilación de Datos"
              description="Permitir recopilación de datos para mejorar el servicio"
              checked={preferences.privacy.dataCollection}
              onChange={(e) => handlePrivacyChange('dataCollection', e.target.checked)}
              disabled={!isEditing}
            />
            <Checkbox
              label="Análisis de Uso"
              description="Compartir datos anónimos para análisis y mejoras"
              checked={preferences.privacy.analytics}
              onChange={(e) => handlePrivacyChange('analytics', e.target.checked)}
              disabled={!isEditing}
            />
            <Checkbox
              label="Compartir con Terceros"
              description="Permitir compartir datos con socios de confianza"
              checked={preferences.privacy.thirdParty}
              onChange={(e) => handlePrivacyChange('thirdParty', e.target.checked)}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Consultation Preferences */}
        <div>
          <h3 className="text-base font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="MessageSquare" size={16} className="text-primary" />
            <span>Consultas</span>
          </h3>
          <div className="space-y-4">
            <Checkbox
              label="Guardado Automático"
              description="Guardar automáticamente el progreso de las consultas"
              checked={preferences.consultation.autoSave}
              onChange={(e) => handleConsultationChange('autoSave', e.target.checked)}
              disabled={!isEditing}
            />
            <Checkbox
              label="Reportes Detallados"
              description="Generar reportes con análisis profundo por defecto"
              checked={preferences.consultation.detailedReports}
              onChange={(e) => handleConsultationChange('detailedReports', e.target.checked)}
              disabled={!isEditing}
            />
            <Checkbox
              label="Seguimiento Automático"
              description="Programar recordatorios para consultas de seguimiento"
              checked={preferences.consultation.followUp}
              onChange={(e) => handleConsultationChange('followUp', e.target.checked)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      {!isEditing && (
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Configuración Personalizada</p>
              <p className="text-muted-foreground">Estas preferencias se aplicarán a todas tus interacciones con LIA y pueden modificarse en cualquier momento.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreferencesSection;