import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RealtimeNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const mockNotifications = [
    {
      id: 1,
      type: 'new_consultation',
      title: 'Nueva Consulta Iniciada',
      message: 'Dr. María González ha comenzado una consulta',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      priority: 'medium',
      read: false,
      data: {
        userId: 'user_123',
        userName: 'Dr. María González',
        clinicType: 'Medicina General'
      }
    },
    {
      id: 2,
      type: 'payment_completed',
      title: 'Pago Completado',
      message: 'Dr. Carlos Rodríguez ha completado el pago de $10',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      priority: 'high',
      read: false,
      data: {
        userId: 'user_456',
        userName: 'Dr. Carlos Rodríguez',
        amount: 10
      }
    },
    {
      id: 3,
      type: 'consultation_completed',
      title: 'Consulta Completada',
      message: 'Dra. Ana Martínez ha finalizado su consulta',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      priority: 'medium',
      read: true,
      data: {
        userId: 'user_789',
        userName: 'Dra. Ana Martínez',
        completionRate: 100
      }
    },
    {
      id: 4,
      type: 'user_abandoned',
      title: 'Usuario Abandonó Consulta',
      message: 'Dr. Luis Fernández abandonó la consulta al 45%',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      priority: 'low',
      read: true,
      data: {
        userId: 'user_101',
        userName: 'Dr. Luis Fernández',
        completionRate: 45
      }
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_consultation': return 'MessageSquare';
      case 'payment_completed': return 'CreditCard';
      case 'consultation_completed': return 'CheckCircle';
      case 'user_abandoned': return 'AlertTriangle';
      default: return 'Bell';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `hace ${minutes} min`;
    } else {
      return `hace ${hours}h`;
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const displayNotifications = isExpanded ? notifications : notifications.slice(0, 3);

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Icon name="Bell" size={24} className="text-primary" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Notificaciones en Tiempo Real</h3>
              <p className="text-sm text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} notificaciones sin leer` : 'Todas las notificaciones leídas'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                onClick={markAllAsRead}
                className="text-xs"
              >
                Marcar todas como leídas
              </Button>
            )}
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" title="Sistema activo" />
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {displayNotifications.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No hay notificaciones</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {displayNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-muted/30 transition-colors duration-150 ${
                  !notification.read ? 'bg-primary/5' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                    !notification.read ? 'bg-primary/10' : 'bg-muted/50'
                  }`}>
                    <Icon 
                      name={getNotificationIcon(notification.type)} 
                      size={18} 
                      className={!notification.read ? 'text-primary' : 'text-muted-foreground'} 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-medium ${
                        !notification.read ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {notification.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name="Clock" 
                          size={12} 
                          className={getPriorityColor(notification.priority)} 
                        />
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(notification.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs text-primary hover:text-primary/80 transition-colors duration-150"
                      >
                        Marcar como leída
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {notifications.length > 3 && (
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            fullWidth
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Ver menos' : `Ver todas (${notifications.length})`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RealtimeNotifications;