import React, { useState, useEffect } from 'react';
import { FileText, Upload, CheckCircle2, AlertTriangle } from 'lucide-react';
import DocumentRequestCard from './DocumentRequestCard';
import auditService from '../../../utils/auditService';
import Button from '../../../components/ui/Button';

const DocumentUploadSection = ({ sessionId, onDocumentsComplete }) => {
  const [documentRequests, setDocumentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDocumentRequests();
  }, [sessionId]);

  const loadDocumentRequests = async () => {
    if (!sessionId) return;

    setLoading(true);
    const result = await auditService.getDocumentRequests(sessionId);
    
    if (result.success) {
      setDocumentRequests(result.data);
    } else {
      setError(result.error || 'Error al cargar solicitudes de documentos');
    }
    
    setLoading(false);
  };

  const handleUploadComplete = (updatedDocument) => {
    setDocumentRequests(prev => 
      prev.map(doc => 
        doc.id === updatedDocument.id 
          ? { ...doc, ...updatedDocument }
          : doc
      )
    );
  };

  const getProgressStats = () => {
    const total = documentRequests.length;
    const uploaded = documentRequests.filter(doc => doc.is_uploaded).length;
    const required = documentRequests.filter(doc => doc.is_required && !doc.is_uploaded).length;
    
    return { total, uploaded, required };
  };

  const handleContinueAnalysis = () => {
    onDocumentsComplete?.();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Cargando solicitudes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center space-x-2 text-red-700">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-medium">Error</span>
        </div>
        <p className="text-sm text-red-600 mt-1">{error}</p>
      </div>
    );
  }

  const { total, uploaded, required } = getProgressStats();
  const progressPercentage = total > 0 ? Math.round((uploaded / total) * 100) : 0;
  const canContinue = required === 0;

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Documentos para Auditoría
              </h3>
              <p className="text-sm text-gray-600">
                {uploaded} de {total} documentos subidos
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {progressPercentage}%
            </div>
            <p className="text-xs text-gray-500">Completado</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        
        {/* Status indicators */}
        <div className="flex items-center justify-between mt-3 text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-gray-600">{uploaded} Completados</span>
            </div>
            {required > 0 && (
              <div className="flex items-center space-x-1">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-gray-600">{required} Pendientes</span>
              </div>
            )}
          </div>
          
          {canContinue && (
            <Button
              onClick={handleContinueAnalysis}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 text-sm"
            >
              Continuar Análisis
            </Button>
          )}
        </div>
      </div>

      {/* Document Requests */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-gray-900 flex items-center space-x-2">
          <Upload className="h-5 w-5 text-blue-500" />
          <span>Documentos Solicitados por Lia</span>
        </h4>
        
        {documentRequests.length === 0 ? (
          <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
            <FileText className="mx-auto h-8 w-8 text-gray-400 mb-3" />
            <p className="text-gray-600">No hay documentos solicitados aún.</p>
            <p className="text-sm text-gray-500 mt-1">
              Lia te pedirá los documentos necesarios durante la conversación.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {documentRequests.map((docRequest) => (
              <DocumentRequestCard
                key={docRequest.id}
                documentRequest={docRequest}
                sessionId={sessionId}
                onUploadComplete={handleUploadComplete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="text-sm font-medium text-blue-900 mb-2">
          💡 Instrucciones para Subir Documentos
        </h5>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Acepta archivos PDF, Word, Excel e imágenes</li>
          <li>• Tamaño máximo: 10MB por archivo</li>
          <li>• Los documentos marcados como "Requeridos" son obligatorios</li>
          <li>• Puedes subir múltiples archivos para cada solicitud</li>
          <li>• Todos los datos están protegidos y encriptados</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentUploadSection;