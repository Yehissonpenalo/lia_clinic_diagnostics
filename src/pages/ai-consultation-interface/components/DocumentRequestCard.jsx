import React, { useState } from 'react';
import { Upload, FileText, Check, AlertCircle, X } from 'lucide-react';
import Button from '../../../components/ui/Button';
import auditService from '../../../utils/auditService';

const DocumentRequestCard = ({ 
  documentRequest, 
  onUploadComplete,
  sessionId 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const documentTypeLabels = {
    financial_statements: '📊 Estados Financieros',
    income_reports: '💰 Reportes de Ingresos',
    expense_reports: '📉 Reportes de Gastos',
    debt_lists: '📋 Lista de Deudas',
    employee_cv: '👥 CVs de Colaboradores',
    operational_reports: '⚙️ Reportes Operacionales',
    competitive_analysis: '🎯 Análisis Competitivo',
    marketing_reports: '📈 Reportes de Marketing',
    other: '📄 Otros Documentos'
  };

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('El archivo es demasiado grande. Máximo 10MB.');
      return;
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png'
    ];

    if (!allowedTypes.includes(file.type)) {
      setUploadError('Tipo de archivo no permitido. Solo PDF, Excel, Word o imágenes.');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    const result = await auditService.uploadDocument(
      sessionId,
      documentRequest.id,
      file
    );

    if (result.success) {
      onUploadComplete?.(result.data);
    } else {
      setUploadError(result.error || 'Error al subir el archivo');
    }

    setIsUploading(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFileUpload(files);
  };

  if (documentRequest.is_uploaded) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-green-800 mb-1">
              {documentTypeLabels[documentRequest.document_type]}
            </h4>
            <p className="text-sm text-green-700">
              Documento subido exitosamente
            </p>
            <p className="text-xs text-green-600 mt-1">
              Subido el {new Date(documentRequest.uploaded_at).toLocaleDateString('es-ES')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex items-start space-x-3 mb-4">
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="text-sm font-medium text-gray-900">
              {documentTypeLabels[documentRequest.document_type]}
            </h4>
            {documentRequest.is_required && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Requerido
              </span>
            )}
          </div>
          <p className="text-sm text-gray-700">
            {documentRequest.request_message}
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200
          ${dragOver 
            ? 'border-blue-400 bg-blue-50' :'border-gray-300 bg-gray-50 hover:bg-gray-100'
          }
          ${isUploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById(`file-${documentRequest.id}`)?.click()}
      >
        <input
          id={`file-${documentRequest.id}`}
          type="file"
          className="hidden"
          onChange={handleFileInput}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
          disabled={isUploading}
        />

        <div className="space-y-2">
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          
          {isUploading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600">Subiendo archivo...</span>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600">Haz clic para subir</span> o arrastra y suelta
              </p>
              <p className="text-xs text-gray-500">
                PDF, Word, Excel o imágenes (máx. 10MB)
              </p>
            </>
          )}
        </div>
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="mt-3 flex items-center space-x-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{uploadError}</span>
          <button
            onClick={() => setUploadError('')}
            className="flex-shrink-0 text-red-400 hover:text-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Optional Documents */}
      {!documentRequest.is_required && (
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500">Este documento es opcional</span>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => {/* Handle skip functionality */}}
          >
            Omitir por ahora
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentRequestCard;