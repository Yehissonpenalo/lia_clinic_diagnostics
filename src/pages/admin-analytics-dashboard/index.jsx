import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/ui/AdminSidebar';
import MetricsCard from './components/MetricsCard';
import ConsultationChart from './components/ConsultationChart';
import UserResponseTable from './components/UserResponseTable';
import GeographicDistribution from './components/GeographicDistribution';
import WeaknessAnalysis from './components/WeaknessAnalysis';
import RealtimeNotifications from './components/RealtimeNotifications';
import RevenueAnalytics from './components/RevenueAnalytics';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminAnalyticsDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [dateRange, setDateRange] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'es';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const handleNotificationClick = () => {
    setNotifications(0);
  };

  const metricsData = [
    {
      title: 'Total Consultas',
      value: '1,247',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'MessageSquare',
      description: 'Consultas iniciadas este mes'
    },
    {
      title: 'Tasa de Conversión',
      value: '24.8%',
      change: '+3.2%',
      changeType: 'positive',
      icon: 'TrendingUp',
      description: 'De consulta a compra'
    },
    {
      title: 'Ingresos Totales',
      value: '$3,100',
      change: '+18.7%',
      changeType: 'positive',
      icon: 'DollarSign',
      description: 'Ingresos por reportes'
    },
    {
      title: 'Usuarios Activos',
      value: '892',
      change: '-2.1%',
      changeType: 'negative',
      icon: 'Users',
      description: 'Profesionales registrados'
    },
    {
      title: 'Tiempo Promedio',
      value: '18.5 min',
      change: '+1.3 min',
      changeType: 'neutral',
      icon: 'Clock',
      description: 'Duración de consulta'
    },
    {
      title: 'Satisfacción',
      value: '4.7/5',
      change: '+0.2',
      changeType: 'positive',
      icon: 'Star',
      description: 'Calificación promedio'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar 
        notifications={notifications} 
        onNotificationClick={handleNotificationClick}
      />
      
      {/* Main Content */}
      <div className="lg:pl-64 pb-16 lg:pb-0">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Panel de Análisis</h1>
                <p className="text-sm text-muted-foreground">
                  Inteligencia empresarial y métricas del sistema LIA
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="7d">Últimos 7 días</option>
                  <option value="30d">Últimos 30 días</option>
                  <option value="90d">Últimos 90 días</option>
                  <option value="1y">Último año</option>
                </select>
                
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  loading={refreshing}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Actualizar
                </Button>
                
                <Button
                  variant="default"
                  iconName="Download"
                  iconPosition="left"
                >
                  Exportar
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {metricsData.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                description={metric.description}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <ConsultationChart
              type="line"
              title="Tendencia de Consultas"
              height={350}
            />
            <ConsultationChart
              type="bar"
              title="Conversiones Mensuales"
              height={350}
            />
          </div>

          {/* Geographic and Weakness Analysis */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <GeographicDistribution />
            <WeaknessAnalysis />
          </div>

          {/* Revenue Analytics */}
          <div className="mb-8">
            <RevenueAnalytics />
          </div>

          {/* Notifications and User Table */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="xl:col-span-1">
              <RealtimeNotifications />
            </div>
            <div className="xl:col-span-2">
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Resumen de Actividad</h3>
                    <p className="text-sm text-muted-foreground">
                      Actividad reciente del sistema
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-primary/5 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="Users" size={24} className="text-primary" />
                      <div>
                        <div className="text-lg font-bold text-foreground">23</div>
                        <div className="text-sm text-muted-foreground">Nuevos usuarios hoy</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-success/5 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="CheckCircle" size={24} className="text-success" />
                      <div>
                        <div className="text-lg font-bold text-foreground">18</div>
                        <div className="text-sm text-muted-foreground">Consultas completadas</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-warning/5 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="Clock" size={24} className="text-warning" />
                      <div>
                        <div className="text-lg font-bold text-foreground">7</div>
                        <div className="text-sm text-muted-foreground">Consultas en progreso</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/5 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Icon name="DollarSign" size={24} className="text-secondary" />
                      <div>
                        <div className="text-lg font-bold text-foreground">$180</div>
                        <div className="text-sm text-muted-foreground">Ingresos hoy</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Response Table */}
          <UserResponseTable />
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsDashboard;