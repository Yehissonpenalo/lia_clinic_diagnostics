import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ClinicInfoSection = ({ user, onSave, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    clinicName: user.clinicName || '',
    specialty: user.specialty || '',
    experience: user.experience || '',
    address: user.address || '',
    city: user.city || '',
    country: user.country || '',
    website: user.website || '',
    licenseNumber: user.licenseNumber || ''
  });

  const specialtyOptions = [
    { value: 'general', label: 'Medicina General' },
    { value: 'cardiology', label: 'Cardiología' },
    { value: 'dermatology', label: 'Dermatología' },
    { value: 'pediatrics', label: 'Pediatría' },
    { value: 'gynecology', label: 'Ginecología' },
    { value: 'orthopedics', label: 'Ortopedia' },
    { value: 'psychiatry', label: 'Psiquiatría' },
    { value: 'nutrition', label: 'Nutrición' },
    { value: 'fitness', label: 'Entrenamiento Físico' },
    { value: 'other', label: 'Otra Especialidad' }
  ];

  const experienceOptions = [
    { value: '0-2', label: '0-2 años' },
    { value: '3-5', label: '3-5 años' },
    { value: '6-10', label: '6-10 años' },
    { value: '11-15', label: '11-15 años' },
    { value: '16-20', label: '16-20 años' },
    { value: '20+', label: 'Más de 20 años' }
  ];

  const countryOptions = [
    { value: 'mx', label: 'México' },
    { value: 'co', label: 'Colombia' },
    { value: 'ar', label: 'Argentina' },
    { value: 'pe', label: 'Perú' },
    { value: 'cl', label: 'Chile' },
    { value: 'ec', label: 'Ecuador' },
    { value: 'uy', label: 'Uruguay' },
    { value: 'py', label: 'Paraguay' },
    { value: 'bo', label: 'Bolivia' },
    { value: 've', label: 'Venezuela' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'es', label: 'España' },
    { value: 'other', label: 'Otro País' }
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
      clinicName: user.clinicName || '',
      specialty: user.specialty || '',
      experience: user.experience || '',
      address: user.address || '',
      city: user.city || '',
      country: user.country || '',
      website: user.website || '',
      licenseNumber: user.licenseNumber || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Building2" size={20} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Información de la Clínica</h2>
            <p className="text-sm text-muted-foreground">Detalles profesionales y de práctica</p>
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
          label="Nombre de la Clínica"
          type="text"
          value={formData.clinicName}
          onChange={(e) => handleInputChange('clinicName', e.target.value)}
          disabled={!isEditing}
          placeholder="Centro Médico Ejemplo"
          required
        />

        <Select
          label="Especialidad Principal"
          options={specialtyOptions}
          value={formData.specialty}
          onChange={(value) => handleInputChange('specialty', value)}
          disabled={!isEditing}
          placeholder="Selecciona tu especialidad"
          required
        />

        <Select
          label="Años de Experiencia"
          options={experienceOptions}
          value={formData.experience}
          onChange={(value) => handleInputChange('experience', value)}
          disabled={!isEditing}
          placeholder="Selecciona tu experiencia"
        />

        <Input
          label="Número de Licencia"
          type="text"
          value={formData.licenseNumber}
          onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
          disabled={!isEditing}
          placeholder="Ej: 12345678"
          description="Número de cédula profesional"
        />

        <div className="md:col-span-2">
          <Input
            label="Dirección de la Clínica"
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            disabled={!isEditing}
            placeholder="Calle, número, colonia"
          />
        </div>

        <Input
          label="Ciudad"
          type="text"
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          disabled={!isEditing}
          placeholder="Ciudad"
        />

        <Select
          label="País"
          options={countryOptions}
          value={formData.country}
          onChange={(value) => handleInputChange('country', value)}
          disabled={!isEditing}
          placeholder="Selecciona tu país"
        />

        <div className="md:col-span-2">
          <Input
            label="Sitio Web (Opcional)"
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            disabled={!isEditing}
            placeholder="https://www.tuclinica.com"
            description="URL de tu sitio web profesional"
          />
        </div>
      </div>

      {!isEditing && (
        <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
          <div className="flex items-start space-x-3">
            <Icon name="Award" size={16} className="text-accent mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Verificación Profesional</p>
              <p className="text-muted-foreground">Esta información ayuda a LIA a proporcionar recomendaciones más precisas y personalizadas para tu práctica médica.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicInfoSection;