import React, { useState, useEffect } from 'react';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import ReportHeader from './components/ReportHeader';
import ReportTabs from './components/ReportTabs';
import ClinicAnalysisSection from './components/ClinicAnalysisSection';
import MarketingRecommendationsSection from './components/MarketingRecommendationsSection';
import CompetitiveAnalysisSection from './components/CompetitiveAnalysisSection';
import GrowthOpportunitiesSection from './components/GrowthOpportunitiesSection';
import FloatingActionButton from './components/FloatingActionButton';
import ProgressTracker from './components/ProgressTracker';
import Icon from '../../components/AppIcon';

const FullReportDashboard = () => {
  const [activeTab, setActiveTab] = useState('analysis');
  const [completedSections, setCompletedSections] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [user] = useState({
    name: 'Dr. María González',
    role: 'Directora Médica',
    email: 'maria.gonzalez@clinicasalud.com'
  });

  // Mock report data
  const reportData = {
    reportId: 'RPT-2025-001',
    clinicName: 'Clínica Salud Integral',
    generatedDate: '22 de Enero, 2025',
    totalPatients: 168,
    monthlyRevenue: 21000,
    satisfactionScore: 4.2
  };

  const analysisData = {
    totalPatients: 168,
    monthlyRevenue: 21000,
    satisfactionScore: 4.2,
    growthRate: 12
  };

  const marketingData = {
    overallScore: 58,
    visibility: 'Baja',
    potentialGrowth: 85
  };

  const competitiveData = {
    marketShare: 12,
    ranking: 4,
    pricePosition: 'Competitivo'
  };

  const growthData = {
    potentialGrowth: 120,
    additionalRevenue: 12500,
    newPatients: 85
  };

  // Load completed sections from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('completedSections');
    if (saved) {
      setCompletedSections(JSON.parse(saved));
    }
  }, []);

  // Save completed sections to localStorage
  useEffect(() => {
    localStorage.setItem('completedSections', JSON.stringify(completedSections));
  }, [completedSections]);

  const handleMarkComplete = (sectionId) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections(prev => [...prev, sectionId]);
    }
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create a mock download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `Informe_Completo_${reportData.clinicName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsDownloading(false);
    
    // Show success message
    alert('¡Informe descargado exitosamente!');
  };

  const handleContactYehisson = (method) => {
    const messages = {
      instagram: 'Abriendo Instagram de Yehisson Peñaló...',
      email: 'Abriendo cliente de email para contactar a Yehisson...',
      whatsapp: 'Abriendo WhatsApp para contactar a Yehisson...',
      consultation: 'Redirigiendo a calendario de consultas...'
    };
    
    alert(messages[method] || 'Contactando a Yehisson Peñaló...');
    
    // Mock contact actions
    switch (method) {
      case 'instagram':
        window.open('https://instagram.com/yehissonpenalo', '_blank');
        break;
      case 'email':
        window.location.href = 'mailto:yehisson@marketingclinicas.com?subject=Consulta sobre Informe de Diagnóstico&body=Hola Yehisson, he revisado mi informe de diagnóstico y me gustaría agendar una consulta para implementar las recomendaciones.';
        break;
      case 'whatsapp':
        window.open('https://wa.me/1234567890?text=Hola Yehisson, he revisado mi informe de diagnóstico y me gustaría agendar una consulta.', '_blank');
        break;
      case 'consultation':
        window.open('https://calendly.com/yehissonpenalo', '_blank');
        break;
      default:
        break;
    }
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'analysis':
        return (
          <ClinicAnalysisSection
            analysisData={analysisData}
            onMarkComplete={handleMarkComplete}
          />
        );
      case 'marketing':
        return (
          <MarketingRecommendationsSection
            marketingData={marketingData}
            onMarkComplete={handleMarkComplete}
            onContactYehisson={handleContactYehisson}
          />
        );
      case 'competitive':
        return (
          <CompetitiveAnalysisSection
            competitiveData={competitiveData}
            onMarkComplete={handleMarkComplete}
          />
        );
      case 'growth':
        return (
          <GrowthOpportunitiesSection
            growthData={growthData}
            onMarkComplete={handleMarkComplete}
            onContactYehisson={handleContactYehisson}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavigation user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Report Header */}
          <ReportHeader
            reportData={reportData}
            onDownloadPDF={handleDownloadPDF}
            isDownloading={isDownloading}
          />

          {/* Progress Tracker */}
          <ProgressTracker
            completedSections={completedSections}
            totalSections={4}
          />

          {/* Report Tabs */}
          <ReportTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            completedSections={completedSections}
          />

          {/* Active Section Content */}
          <div className="bg-card rounded-xl border border-border shadow-sm">
            <div className="p-6">
              {renderActiveSection()}
            </div>
          </div>

          {/* Next Steps CTA */}
          {completedSections.length === 4 && (
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-xl border border-primary/20">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="CheckCircle" size={32} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  ¡Felicitaciones! Has Completado tu Análisis
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Ahora tienes una visión completa del estado de tu clínica y las oportunidades de crecimiento. 
                  El siguiente paso es implementar estas estrategias con la ayuda de un experto.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => handleContactYehisson('consultation')}
                    className="flex items-center space-x-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 text-lg font-medium"
                  >
                    <Icon name="Calendar" size={20} />
                    <span>Agendar Consulta Estratégica</span>
                  </button>
                  
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="flex items-center space-x-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors duration-200 text-lg font-medium disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin"></div>
                        <span>Descargando...</span>
                      </>
                    ) : (
                      <>
                        <Icon name="Download" size={20} />
                        <span>Descargar Informe Completo</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton
        onDownloadPDF={handleDownloadPDF}
        onContactYehisson={handleContactYehisson}
      />
    </div>
  );
};

export default FullReportDashboard;