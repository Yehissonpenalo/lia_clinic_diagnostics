import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentUpload = ({ onUploadComplete }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const supportedFormats = [
    { type: 'PDF', extension: '.pdf', icon: 'FileText' },
    { type: 'Word', extension: '.docx', icon: 'FileText' },
    { type: 'Excel', extension: '.xlsx', icon: 'FileSpreadsheet' },
    { type: 'PowerPoint', extension: '.pptx', icon: 'Presentation' },
    { type: 'Text', extension: '.txt', icon: 'File' }
  ];

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  }, []);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files) => {
    files.forEach((file) => {
      const fileId = `${file.name}-${Date.now()}`;
      
      // Simulate upload progress
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[fileId] || 0;
          if (currentProgress >= 100) {
            clearInterval(interval);
            // Add to uploaded files
            setUploadedFiles(prevFiles => [...prevFiles, {
              id: fileId,
              name: file.name,
              size: file.size,
              type: file.type,
              uploadedAt: new Date(),
              status: 'completed'
            }]);
            // Remove from progress tracking
            const { [fileId]: removed, ...rest } = prev;
            return rest;
          }
          return { ...prev, [fileId]: currentProgress + 10 };
        });
      }, 200);
    });
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Subir Documentos de Entrenamiento</h3>
        <p className="text-sm text-muted-foreground">
          Sube documentos para entrenar a LIA con nuevo conocimiento médico y de consultoría
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Upload" size={32} className="text-primary" />
          </div>
          <div>
            <h4 className="text-lg font-medium text-foreground mb-2">
              Arrastra archivos aquí o haz clic para seleccionar
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Soporta múltiples archivos hasta 10MB cada uno
            </p>
          </div>
          <input
            type="file"
            multiple
            accept=".pdf,.docx,.xlsx,.pptx,.txt"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById('file-upload').click()}
            iconName="FolderOpen"
            iconPosition="left"
          >
            Seleccionar Archivos
          </Button>
        </div>
      </div>

      {/* Supported Formats */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Formatos Soportados</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {supportedFormats.map((format) => (
            <div
              key={format.type}
              className="flex items-center space-x-2 p-2 bg-muted rounded-lg"
            >
              <Icon name={format.icon} size={16} className="text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">{format.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Subiendo Archivos</h4>
          <div className="space-y-3">
            {Object.entries(uploadProgress).map(([fileId, progress]) => (
              <div key={fileId} className="flex items-center space-x-3">
                <Icon name="File" size={16} className="text-muted-foreground" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {fileId.split('-')[0]}
                    </span>
                    <span className="text-xs text-muted-foreground">{progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Archivos Subidos Recientemente</h4>
          <div className="space-y-2">
            {uploadedFiles.slice(0, 3).map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)} • Subido hace {Math.floor((Date.now() - file.uploadedAt.getTime()) / 60000)} min
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file.id)}
                  iconName="X"
                  className="text-muted-foreground hover:text-error"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;