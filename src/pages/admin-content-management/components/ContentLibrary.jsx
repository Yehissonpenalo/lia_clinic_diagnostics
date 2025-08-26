import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContentLibrary = ({ onEditContent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const categories = [
    { value: 'all', label: 'Todas las Categorías' },
    { value: 'cardiology', label: 'Cardiología' },
    { value: 'dermatology', label: 'Dermatología' },
    { value: 'pediatrics', label: 'Pediatría' },
    { value: 'general', label: 'Medicina General' },
    { value: 'marketing', label: 'Marketing Médico' }
  ];

  const contentTypes = [
    { value: 'all', label: 'Todos los Tipos' },
    { value: 'questions', label: 'Preguntas de Consulta' },
    { value: 'responses', label: 'Respuestas Tipo' },
    { value: 'guidelines', label: 'Guías Clínicas' },
    { value: 'templates', label: 'Plantillas' },
    { value: 'training', label: 'Material de Entrenamiento' }
  ];

  const mockDocuments = [
    {
      id: 1,
      name: "Guía de Consulta Cardiológica",
      category: "cardiology",
      type: "guidelines",
      size: "2.4 MB",
      uploadedAt: "2025-01-15",
      status: "active",
      usage: 156,
      tags: ["consulta", "cardiología", "diagnóstico"]
    },
    {
      id: 2,
      name: "Preguntas Frecuentes Dermatología",
      category: "dermatology", 
      type: "questions",
      size: "1.8 MB",
      uploadedAt: "2025-01-18",
      status: "active",
      usage: 89,
      tags: ["dermatología", "preguntas", "síntomas"]
    },
    {
      id: 3,
      name: "Plantillas de Respuesta Pediatría",
      category: "pediatrics",
      type: "templates",
      size: "3.1 MB",
      uploadedAt: "2025-01-20",
      status: "draft",
      usage: 23,
      tags: ["pediatría", "plantillas", "respuestas"]
    },
    {
      id: 4,
      name: "Estrategias Marketing Clínicas",
      category: "marketing",
      type: "training",
      size: "5.2 MB",
      uploadedAt: "2025-01-22",
      status: "active",
      usage: 234,
      tags: ["marketing", "estrategias", "clínicas"]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'draft': return 'text-warning bg-warning/10';
      case 'inactive': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'draft': return 'Borrador';
      case 'inactive': return 'Inactivo';
      default: return 'Desconocido';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'questions': return 'HelpCircle';
      case 'responses': return 'MessageSquare';
      case 'guidelines': return 'BookOpen';
      case 'templates': return 'Layout';
      case 'training': return 'GraduationCap';
      default: return 'File';
    }
  };

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Biblioteca de Contenido</h3>
        <p className="text-sm text-muted-foreground">
          Gestiona y organiza todo el contenido de entrenamiento de LIA
        </p>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          type="search"
          placeholder="Buscar documentos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:col-span-1"
        />
        <Select
          options={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Filtrar por categoría"
        />
        <Select
          options={contentTypes}
          value={selectedType}
          onChange={setSelectedType}
          placeholder="Filtrar por tipo"
        />
      </div>

      {/* Content Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="FileText" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Total</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{mockDocuments.length}</p>
        </div>
        <div className="bg-success/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Activos</span>
          </div>
          <p className="text-2xl font-bold text-success">
            {mockDocuments.filter(doc => doc.status === 'active').length}
          </p>
        </div>
        <div className="bg-warning/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Borradores</span>
          </div>
          <p className="text-2xl font-bold text-warning">
            {mockDocuments.filter(doc => doc.status === 'draft').length}
          </p>
        </div>
        <div className="bg-primary/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Uso Total</span>
          </div>
          <p className="text-2xl font-bold text-primary">
            {mockDocuments.reduce((sum, doc) => sum + doc.usage, 0)}
          </p>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {filteredDocuments.map((document) => (
          <div
            key={document.id}
            className="flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 rounded-lg border border-border/50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={getTypeIcon(document.type)} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground mb-1">{document.name}</h4>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>{document.size}</span>
                  <span>•</span>
                  <span>Subido: {document.uploadedAt}</span>
                  <span>•</span>
                  <span>Usado {document.usage} veces</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  {document.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(document.status)}`}>
                {getStatusLabel(document.status)}
              </span>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditContent(document)}
                  iconName="Edit"
                  className="text-muted-foreground hover:text-foreground"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => console.log('Download', document.id)}
                  iconName="Download"
                  className="text-muted-foreground hover:text-foreground"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => console.log('Delete', document.id)}
                  iconName="Trash2"
                  className="text-muted-foreground hover:text-error"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">No se encontraron documentos</h4>
          <p className="text-sm text-muted-foreground">
            Intenta ajustar los filtros de búsqueda o sube nuevos documentos
          </p>
        </div>
      )}
    </div>
  );
};

export default ContentLibrary;