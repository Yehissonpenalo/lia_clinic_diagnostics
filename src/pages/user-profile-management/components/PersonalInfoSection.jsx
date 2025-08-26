import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PersonalInfoSection = ({ user, onSave, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    whatsapp: user.whatsapp || '',
    gender: user.gender || '',
    birthDate: user.birthDate || '',
    phone: user.phone || ''
  });

  const genderOptions = [
    { value: 'male', label: 'Masculino' },
    { value: 'female', label: 'Femenino' },
    { value: 'other', label: 'Otro' },
    { value: 'prefer-not-to-say', label: 'Prefiero no decir' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    await onSave(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      whatsapp: user.whatsapp || '',
      gender: user.gender || '',
      birthDate: user.birthDate || '',
      phone: user.phone || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Información Personal</h2>
            <p className="text-sm text-muted-foreground">Gestiona tu información básica</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Nombre Completo"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          disabled={!isEditing}
          required
          placeholder="Ingresa tu nombre completo"
        />

        <Input
          label="Correo Electrónico"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          disabled={!isEditing}
          required
          placeholder="tu@email.com"
        />

        <Input
          label="WhatsApp"
          type="tel"
          value={formData.whatsapp}
          onChange={(e) => handleInputChange('whatsapp', e.target.value)}
          disabled={!isEditing}
          placeholder="+1 234 567 8900"
          description="Número para contacto directo"
        />

        <Input
          label="Teléfono Adicional"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          disabled={!isEditing}
          placeholder="+1 234 567 8901"
        />

        <Select
          label="Género"
          options={genderOptions}
          value={formData.gender}
          onChange={(value) => handleInputChange('gender', value)}
          disabled={!isEditing}
          placeholder="Selecciona tu género"
        />

        <Input
          label="Fecha de Nacimiento"
          type="date"
          value={formData.birthDate}
          onChange={(e) => handleInputChange('birthDate', e.target.value)}
          disabled={!isEditing}
        />
      </div>

      {!isEditing && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Información Protegida</p>
              <p>Tus datos personales están encriptados y protegidos según las normativas HIPAA. Solo tú y los profesionales autorizados pueden acceder a esta información.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoSection;