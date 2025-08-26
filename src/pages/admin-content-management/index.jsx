import React, { useState } from 'react';
import AdminSidebar from '../../components/ui/AdminSidebar';
import DocumentUpload from './components/DocumentUpload';
import ContentLibrary from './components/ContentLibrary';
import KnowledgeBase from './components/KnowledgeBase';
import ContentAnalytics from './components/ContentAnalytics';
import ContentPreview from './components/ContentPreview';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminContentManagement = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [previewContent, setPreviewContent] = useState(null);
  const [notifications] = useState(3);

  const tabs = [
    {
      id: 'upload',
      label: 'Subir Documentos',
      icon: 'Upload',
      description: 'Cargar nuevos materiales de entrenamiento'
    },
    {
      id: 'library',
      label: 'Biblioteca',
      icon: 'Library',
      description: 'Gestionar contenido existente'
    },
    {
      id: 'knowledge',
      label: 'Base de Conocimiento',
      icon: 'Brain',
      description: 'Flujos y patrones de conversación'
    },
    {
      id: 'analytics',
      label: 'Análisis',
      icon: 'BarChart3',
      description: 'Métricas de rendimiento'
    }
  ];

  const handleUploadComplete = (files) => {
    console.log('Files uploaded:', files);
    // Here you would typically update the content library
  };

  const handleEditContent = (content) => {
    console.log('Edit content:', content);
    // Here you would open an edit modal or navigate to edit page
  };

  const handlePreviewContent = (content) => {
    setPreviewContent(content);
  };

  const handleClosePreview = () => {
    setPreviewContent(null);
  };

  const handleDeployContent = (content) => {
    console.log('Deploy content:', content);
    setPreviewContent(null);
    // Here you would deploy the content to production
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'upload':
        return <DocumentUpload onUploadComplete={handleUploadComplete} />;
      case 'library':
        return <ContentLibrary onEditContent={handleEditContent} />;
      case 'knowledge':
        return <KnowledgeBase onPreviewContent={handlePreviewContent} />;
      case 'analytics':
        return <ContentAnalytics />;
      default:
        return <DocumentUpload onUploadComplete={handleUploadComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar 
        notifications={notifications}
        onNotificationClick={() => console.log('Notifications clicked')}
      />
      
      {/* Main Content */}
      <div className="lg:pl-64 pb-16 lg:pb-0">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Gestión de Contenido</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Entrena y optimiza el conocimiento de LIA para mejores consultas
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => console.log('Sync content')}
                >
                  Sincronizar
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Save"
                  iconPosition="left"
                  onClick={() => console.log('Save changes')}
                >
                  Guardar Cambios
                </Button>
              </div>
            </div>
          </div>

          {/* Status Banner */}
          <div className="bg-success/5 border border-success/20 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <div>
                <h3 className="text-sm font-medium text-success">Sistema Operativo</h3>
                <p className="text-xs text-success/80">
                  LIA está funcionando correctamente. Última actualización: hace 2 horas
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Tab Description */}
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                {tabs.find(tab => tab.id === activeTab)?.description}
              </p>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {renderTabContent()}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Acciones Rápidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => console.log('Backup knowledge base')}
                className="flex items-center space-x-3 p-4 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Database" size={20} className="text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-medium text-foreground">Crear Respaldo</h4>
                  <p className="text-xs text-muted-foreground">Respaldar base de conocimiento</p>
                </div>
              </button>
              
              <button
                onClick={() => console.log('Export content')}
                className="flex items-center space-x-3 p-4 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Download" size={20} className="text-secondary" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-medium text-foreground">Exportar Contenido</h4>
                  <p className="text-xs text-muted-foreground">Descargar todo el contenido</p>
                </div>
              </button>
              
              <button
                onClick={() => console.log('Test LIA')}
                className="flex items-center space-x-3 p-4 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Play" size={20} className="text-accent" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-medium text-foreground">Probar LIA</h4>
                  <p className="text-xs text-muted-foreground">Ejecutar pruebas de conversación</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Preview Modal */}
      {previewContent && (
        <ContentPreview
          content={previewContent}
          onClose={handleClosePreview}
          onDeploy={handleDeployContent}
        />
      )}
    </div>
  );
};

export default AdminContentManagement;