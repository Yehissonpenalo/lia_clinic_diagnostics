import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecuritySection = ({ onPasswordChange, onAccountDelete, isLoading }) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    confirmText: '',
    confirmDelete: false,
    reason: ''
  });

  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Encriptación de Datos',
      description: 'Todos tus datos están protegidos con encriptación AES-256',
      status: 'active'
    },
    {
      icon: 'Lock',
      title: 'Autenticación Segura',
      description: 'Acceso protegido con verificación de identidad',
      status: 'active'
    },
    {
      icon: 'Eye',
      title: 'Monitoreo de Acceso',
      description: 'Registro de todos los accesos a tu cuenta',
      status: 'active'
    },
    {
      icon: 'AlertTriangle',
      title: 'Alertas de Seguridad',
      description: 'Notificaciones automáticas ante actividad sospechosa',
      status: 'active'
    }
  ];

  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    await onPasswordChange(passwordData);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordForm(false);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation.confirmText !== 'ELIMINAR' || !deleteConfirmation.confirmDelete) {
      alert('Por favor confirma la eliminación correctamente');
      return;
    }
    
    await onAccountDelete(deleteConfirmation.reason);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
          <Icon name="Shield" size={20} className="text-error" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Seguridad y Privacidad</h2>
          <p className="text-sm text-muted-foreground">Gestiona la seguridad de tu cuenta</p>
        </div>
      </div>

      {/* Security Features Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3 p-4 bg-success/5 rounded-lg border border-success/20">
            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature.icon} size={16} className="text-success" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-foreground">{feature.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
            </div>
            <div className="flex items-center space-x-1 text-success">
              <Icon name="CheckCircle" size={14} />
              <span className="text-xs font-medium">Activo</span>
            </div>
          </div>
        ))}
      </div>

      {/* Password Change Section */}
      <div className="space-y-6">
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-medium text-foreground">Cambiar Contraseña</h3>
              <p className="text-sm text-muted-foreground">Actualiza tu contraseña regularmente para mayor seguridad</p>
            </div>
            <Button
              variant="outline"
              iconName={showPasswordForm ? "X" : "Key"}
              onClick={() => setShowPasswordForm(!showPasswordForm)}
            >
              {showPasswordForm ? 'Cancelar' : 'Cambiar'}
            </Button>
          </div>

          {showPasswordForm && (
            <div className="space-y-4 pt-4 border-t border-border">
              <Input
                label="Contraseña Actual"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                placeholder="Ingresa tu contraseña actual"
                required
              />
              
              <Input
                label="Nueva Contraseña"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                placeholder="Ingresa tu nueva contraseña"
                description="Mínimo 8 caracteres, incluye mayúsculas, minúsculas y números"
                required
              />
              
              <Input
                label="Confirmar Nueva Contraseña"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Confirma tu nueva contraseña"
                required
              />

              <div className="flex space-x-2">
                <Button
                  variant="default"
                  iconName="Save"
                  iconPosition="left"
                  onClick={handlePasswordSubmit}
                  loading={isLoading}
                >
                  Actualizar Contraseña
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Account Deletion Section */}
        <div className="border border-error/20 rounded-lg p-4 bg-error/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-medium text-foreground flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-error" />
                <span>Eliminar Cuenta</span>
              </h3>
              <p className="text-sm text-muted-foreground">Esta acción es permanente e irreversible</p>
            </div>
            <Button
              variant="destructive"
              iconName={showDeleteForm ? "X" : "Trash2"}
              onClick={() => setShowDeleteForm(!showDeleteForm)}
            >
              {showDeleteForm ? 'Cancelar' : 'Eliminar'}
            </Button>
          </div>

          {showDeleteForm && (
            <div className="space-y-4 pt-4 border-t border-error/20">
              <div className="bg-error/10 border border-error/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground mb-1">¿Estás seguro?</p>
                    <p className="text-muted-foreground">
                      Al eliminar tu cuenta perderás permanentemente:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                      <li>Todos tus datos de consultas</li>
                      <li>Historial de reportes generados</li>
                      <li>Configuraciones personalizadas</li>
                      <li>Acceso a servicios premium</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Input
                label="Motivo de Eliminación (Opcional)"
                type="text"
                value={deleteConfirmation.reason}
                onChange={(e) => setDeleteConfirmation(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="Ayúdanos a mejorar contándonos por qué eliminas tu cuenta"
              />

              <Input
                label="Confirmar Eliminación"
                type="text"
                value={deleteConfirmation.confirmText}
                onChange={(e) => setDeleteConfirmation(prev => ({ ...prev, confirmText: e.target.value }))}
                placeholder="Escribe 'ELIMINAR' para confirmar"
                description="Escribe exactamente 'ELIMINAR' en mayúsculas"
                required
              />

              <Checkbox
                label="Confirmo que entiendo que esta acción es irreversible"
                checked={deleteConfirmation.confirmDelete}
                onChange={(e) => setDeleteConfirmation(prev => ({ ...prev, confirmDelete: e.target.checked }))}
                required
              />

              <Button
                variant="destructive"
                iconName="Trash2"
                iconPosition="left"
                onClick={handleDeleteAccount}
                loading={isLoading}
                disabled={deleteConfirmation.confirmText !== 'ELIMINAR' || !deleteConfirmation.confirmDelete}
                fullWidth
              >
                Eliminar Cuenta Permanentemente
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;