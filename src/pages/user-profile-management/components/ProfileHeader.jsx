import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfileHeader = ({ user, onAvatarClick }) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
        {/* Avatar Section */}
        <div className="relative">
          <div 
            className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={onAvatarClick}
          >
            {user.avatar ? (
              <Image 
                src={user.avatar} 
                alt="Profile Avatar" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <Icon name="User" size={32} className="text-white" />
            )}
          </div>
          <button
            onClick={onAvatarClick}
            className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors duration-200"
            aria-label="Cambiar avatar"
          >
            <Icon name="Camera" size={14} />
          </button>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            {user.name || 'Profesional de la Salud'}
          </h1>
          <p className="text-muted-foreground mb-2">
            {user.specialty || 'Especialidad Médica'} • {user.clinicName || 'Clínica'}
          </p>
          
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-1 px-3 py-1 bg-success/10 text-success rounded-full text-sm">
              <Icon name="CheckCircle" size={14} />
              <span>Perfil Verificado</span>
            </div>
            <div className="flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              <Icon name="Calendar" size={14} />
              <span>Miembro desde {user.joinDate || 'Enero 2024'}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-foreground">{user.consultations || 0}</div>
            <div className="text-sm text-muted-foreground">Consultas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{user.reports || 0}</div>
            <div className="text-sm text-muted-foreground">Reportes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{user.score || 85}%</div>
            <div className="text-sm text-muted-foreground">Puntuación</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;