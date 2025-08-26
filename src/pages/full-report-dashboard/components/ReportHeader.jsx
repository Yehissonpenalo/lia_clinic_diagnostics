import React from 'react';
import Icon from '../../../components/AppIcon';

const ReportHeader = ({ reportData, onDownloadPDF, isDownloading }) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Icon name="FileText" size={24} className="text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              Informe Completo de Diagnóstico
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Análisis integral para {reportData.clinicName}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
              <span>Generado: {reportData.generatedDate}</span>
              <span>•</span>
              <span>ID: {reportData.reportId}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">Estado del Informe</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs text-success font-medium">Completo</span>
            </div>
          </div>
          
          <button
            onClick={onDownloadPDF}
            disabled={isDownloading}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50"
          >
            {isDownloading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                <span className="text-sm font-medium">Descargando...</span>
              </>
            ) : (
              <>
                <Icon name="Download" size={16} />
                <span className="text-sm font-medium">Descargar PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;