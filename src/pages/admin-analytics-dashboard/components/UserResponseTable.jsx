import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserResponseTable = () => {
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');

  const responses = [
    {
      id: 1,
      name: "Dr. María González",
      email: "maria.gonzalez@clinicasalud.com",
      clinicType: "Medicina General",
      location: "Madrid, España",
      completionRate: 95,
      status: "completed",
      paymentStatus: "paid",
      timestamp: new Date('2025-01-22T14:30:00'),
      weaknesses: ["Marketing Digital", "Gestión de Redes Sociales"]
    },
    {
      id: 2,
      name: "Dr. Carlos Rodríguez",
      email: "carlos.rodriguez@dentalsalud.es",
      clinicType: "Odontología",
      location: "Barcelona, España",
      completionRate: 78,
      status: "in-progress",
      paymentStatus: "pending",
      timestamp: new Date('2025-01-22T11:15:00'),
      weaknesses: ["SEO Local", "Gestión de Pacientes"]
    },
    {
      id: 3,
      name: "Dra. Ana Martínez",
      email: "ana.martinez@fisioterapia.com",
      clinicType: "Fisioterapia",
      location: "Valencia, España",
      completionRate: 100,
      status: "completed",
      paymentStatus: "paid",
      timestamp: new Date('2025-01-21T16:45:00'),
      weaknesses: ["Automatización", "Email Marketing"]
    },
    {
      id: 4,
      name: "Dr. Luis Fernández",
      email: "luis.fernandez@nutricion.es",
      clinicType: "Nutrición",
      location: "Sevilla, España",
      completionRate: 45,
      status: "abandoned",
      paymentStatus: "none",
      timestamp: new Date('2025-01-21T09:20:00'),
      weaknesses: ["Branding", "Contenido Digital"]
    },
    {
      id: 5,
      name: "Dra. Carmen López",
      email: "carmen.lopez@psicologia.com",
      clinicType: "Psicología",
      location: "Bilbao, España",
      completionRate: 88,
      status: "completed",
      paymentStatus: "paid",
      timestamp: new Date('2025-01-20T13:10:00'),
      weaknesses: ["Publicidad Online", "Análisis de Competencia"]
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-success/10 text-success', label: 'Completado' },
      'in-progress': { color: 'bg-warning/10 text-warning', label: 'En Progreso' },
      abandoned: { color: 'bg-error/10 text-error', label: 'Abandonado' }
    };
    
    const config = statusConfig[status] || statusConfig.abandoned;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getPaymentBadge = (paymentStatus) => {
    const paymentConfig = {
      paid: { color: 'bg-success/10 text-success', label: 'Pagado', icon: 'CheckCircle' },
      pending: { color: 'bg-warning/10 text-warning', label: 'Pendiente', icon: 'Clock' },
      none: { color: 'bg-muted/10 text-muted-foreground', label: 'Sin Pago', icon: 'Minus' }
    };
    
    const config = paymentConfig[paymentStatus] || paymentConfig.none;
    return (
      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} />
        <span>{config.label}</span>
      </div>
    );
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredResponses = responses.filter(response => {
    if (filterStatus === 'all') return true;
    return response.status === filterStatus;
  });

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Respuestas de Usuarios</h3>
            <p className="text-sm text-muted-foreground">
              Análisis detallado de consultas y conversiones
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Todos los Estados</option>
              <option value="completed">Completados</option>
              <option value="in-progress">En Progreso</option>
              <option value="abandoned">Abandonados</option>
            </select>
            
            <Button variant="outline" iconName="Download" iconPosition="left">
              Exportar
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Usuario</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Clínica
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('completionRate')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Progreso</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Pago
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('timestamp')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Fecha</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredResponses.map((response) => (
              <tr key={response.id} className="hover:bg-muted/30 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">{response.name}</div>
                    <div className="text-sm text-muted-foreground">{response.email}</div>
                    <div className="text-xs text-muted-foreground">{response.location}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">{response.clinicType}</div>
                  <div className="text-xs text-muted-foreground">
                    Debilidades: {response.weaknesses.join(', ')}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${response.completionRate}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {response.completionRate}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(response.status)}
                </td>
                <td className="px-6 py-4">
                  {getPaymentBadge(response.paymentStatus)}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">
                    {formatDate(response.timestamp)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-primary hover:text-primary/80 transition-colors duration-150"
                      title="Ver detalles"
                    >
                      <Icon name="Eye" size={16} />
                    </button>
                    <button
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                      title="Descargar reporte"
                    >
                      <Icon name="Download" size={16} />
                    </button>
                    <button
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                      title="Contactar"
                    >
                      <Icon name="MessageCircle" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserResponseTable;