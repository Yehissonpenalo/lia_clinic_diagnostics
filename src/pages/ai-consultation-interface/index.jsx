import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { MessageSquare, FileText, BarChart3, Download, User, LogOut, Menu, X, Upload } from 'lucide-react';

import EnhancedLIAAvatar from './components/EnhancedLIAAvatar';
import EnhancedMessageBubble from './components/EnhancedMessageBubble';
import DocumentUploadSection from './components/DocumentUploadSection';
import MessageInput from './components/MessageInput';
import Button from '../../components/ui/Button';
import auditService from '../../utils/auditService';

const AiConsultationInterface = () => {
  const { user, userProfile, signOut, loading: authLoading } = useAuth();
  const [currentSession, setCurrentSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [documentRequests, setDocumentRequests] = useState([]);
  const [currentView, setCurrentView] = useState('conversation'); // conversation, documents, analysis
  const [isLiaTyping, setIsLiaTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user && userProfile) {
      initializeSession();
    }
  }, [user, userProfile]);

  const initializeSession = async () => {
    setLoading(true);
    
    try {
      // Get or create audit session
      const sessionsResult = await auditService.getUserAuditSessions();
      
      let session = null;
      if (sessionsResult.success && sessionsResult.data?.length > 0) {
        // Use the most recent session that's in progress
        session = sessionsResult.data.find(s => s.status === 'pending' || s.status === 'in_progress') || sessionsResult.data[0];
      }
      
      if (!session) {
        // Create new session
        const createResult = await auditService.createAuditSession(userProfile?.clinic_name || 'Mi Clínica');
        if (createResult.success) {
          session = createResult.data;
          
          // Add initial Lia welcome messages
          await addInitialLiaMessages(session.id);
        } else {
          setError('Error al crear sesión de auditoría');
          setLoading(false);
          return;
        }
      }
      
      setCurrentSession(session);
      
      // Load existing conversation
      await loadConversation(session.id);
      await loadDocumentRequests(session.id);
      
    } catch (error) {
      setError('Error al inicializar la sesión');
      console.log('Session initialization error:', error);
    }
    
    setLoading(false);
  };

  const addInitialLiaMessages = async (sessionId) => {
    const initialMessages = [
      {
        type: 'lia',
        content: `¡Hola ${userProfile?.full_name || 'Doctor'}! 👋 Soy Lia, tu asistente especializada en auditoría clínica. Estoy aquí para ayudarte a realizar un análisis completo de ${userProfile?.clinic_name || 'tu clínica'}.`
      },
      {
        type: 'lia', 
        content: 'Mi objetivo es identificar oportunidades de mejora, fortalezas ocultas y áreas de optimización en tu clínica. Para hacer esto de manera efectiva, necesitaré que me proporciones algunos documentos clave.'
      },
      {
        type: 'lia',
        content: '📋 Voy a solicitarte documentos específicos como estados financieros, reportes de ingresos y gastos, información sobre deudas, CVs de colaboradores, y otros datos importantes para realizar una auditoría 100% completa.'
      }
    ];

    for (const msg of initialMessages) {
      await auditService.addLiaMessage(sessionId, msg.type, msg.content);
    }

    // Add initial document requests
    const documentTypes = [
      {
        type: 'financial_statements',
        message: 'Por favor, sube los estados financieros de los últimos 12 meses. Estos me permitirán evaluar la salud económica general de la clínica.',
        required: true
      },
      {
        type: 'income_reports', 
        message: 'Necesito los reportes de ingresos mensuales para analizar tendencias de crecimiento y patrones de facturación.',
        required: true
      },
      {
        type: 'expense_reports',
        message: 'Proporciona los reportes detallados de gastos para identificar oportunidades de optimización de costos.',
        required: true
      },
      {
        type: 'debt_lists',
        message: 'Una lista completa de todas las deudas actuales (proveedores, préstamos, obligaciones) para evaluar la posición financiera.',
        required: true
      }
    ];

    for (const docType of documentTypes) {
      await auditService.requestDocument(sessionId, docType.type, docType.message, docType.required);
    }
  };

  const loadConversation = async (sessionId) => {
    const result = await auditService.getConversationMessages(sessionId);
    
    if (result.success) {
      setMessages(result.data);
    } else {
      setError('Error al cargar conversación');
    }
  };

  const loadDocumentRequests = async (sessionId) => {
    const result = await auditService.getDocumentRequests(sessionId);
    
    if (result.success) {
      setDocumentRequests(result.data);
    }
  };

  const handleSendMessage = async (content) => {
    if (!currentSession) return;

    // Add user message
    const userResult = await auditService.addLiaMessage(
      currentSession.id,
      'user',
      content
    );

    if (userResult.success) {
      setMessages(prev => [...prev, userResult.data]);
      
      // Simulate Lia typing
      setIsLiaTyping(true);
      
      setTimeout(async () => {
        // Generate Lia response based on content
        const liaResponse = generateLiaResponse(content);
        
        const liaResult = await auditService.addLiaMessage(
          currentSession.id,
          'lia',
          liaResponse.message
        );

        if (liaResult.success) {
          setMessages(prev => [...prev, liaResult.data]);
        }

        // Check if we need to request additional documents
        if (liaResponse.requestDocument) {
          await auditService.requestDocument(
            currentSession.id,
            liaResponse.requestDocument.type,
            liaResponse.requestDocument.message,
            liaResponse.requestDocument.required
          );
          
          // Reload document requests
          loadDocumentRequests(currentSession.id);
        }
        
        setIsLiaTyping(false);
      }, 2000);
    }
  };

  const generateLiaResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('empez') || message.includes('comenz') || message.includes('inici')) {
      return {
        message: '¡Perfecto! Para comenzar con el análisis de tu clínica, necesito que subas algunos documentos clave. Puedes encontrar las solicitudes en la sección de documentos. Mientras tanto, ¿podrías contarme un poco sobre los principales desafíos que enfrenta tu clínica actualmente?',
        requestDocument: null
      };
    }
    
    if (message.includes('desafío') || message.includes('problema') || message.includes('dificultad')) {
      return {
        message: 'Entiendo. Los desafíos que mencionas son muy comunes en el sector salud. Para poder darte recomendaciones específicas, también necesitaré revisar información sobre tus colaboradores. ¿Podrías subir los CVs de tu equipo clave?',
        requestDocument: {
          type: 'employee_cv',
          message: 'Por favor sube los CVs de los colaboradores clave de la clínica (médicos, administrativos, enfermería) para evaluar el capital humano y identificar oportunidades de capacitación.',
          required: false
        }
      };
    }
    
    if (message.includes('competencia') || message.includes('mercado') || message.includes('paciente')) {
      return {
        message: 'Excelente punto. El análisis competitivo es crucial para el crecimiento. Me ayudaría mucho tener información sobre tu posicionamiento en el mercado local.',
        requestDocument: {
          type: 'competitive_analysis',
          message: 'Si tienes algún análisis de competencia, estudios de mercado local, o información sobre clínicas similares en tu área, eso me ayudará a evaluar tu posición competitiva.',
          required: false
        }
      };
    }
    
    if (message.includes('marketing') || message.includes('publicidad') || message.includes('promoción')) {
      return {
        message: 'El marketing médico es fundamental para el crecimiento sostenible. ¿Tienes datos sobre tus estrategias de marketing actuales?',
        requestDocument: {
          type: 'marketing_reports',
          message: 'Comparte información sobre tus estrategias de marketing actuales, campañas realizadas, presencia digital, o cualquier material promocional que uses.',
          required: false
        }
      };
    }

    // Default response
    return {
      message: 'Interesante perspectiva. Mientras analizas eso, te sugiero que revises la sección de documentos. He preparado algunas solicitudes específicas que me ayudarán a brindarte un análisis más detallado y recomendaciones personalizadas para tu clínica.',
      requestDocument: null
    };
  };

  const handleDocumentsComplete = async () => {
    // Update session status and switch to analysis view
    await auditService.updateAuditStatus(currentSession.id, 'in_progress');
    setCurrentView('analysis');
  };

  const handleLogout = async () => {
    await signOut();
  };

  // Show preview mode for non-authenticated users
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <EnhancedLIAAvatar size="xl" mood="friendly" />
            <h1 className="text-4xl font-bold text-gray-900 mt-6 mb-4">
              Conoce a Lia
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Tu asistente especializada en auditoría clínica. Obtén análisis completos de finanzas, 
              administración, recursos humanos y oportunidades de crecimiento.
            </p>
            <div className="space-x-4">
              <Link to="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
                  Comenzar Auditoría
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="px-8 py-3">
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>

          {/* Preview Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Análisis de Documentos</h3>
              <p className="text-sm text-gray-600">
                Lia analiza tus estados financieros, reportes de ingresos y documentos clave
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Auditoría Completa</h3>
              <p className="text-sm text-gray-600">
                Evaluación integral de finanzas, administración, RRHH y operaciones
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
              <Download className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Reportes en PDF</h3>
              <p className="text-sm text-gray-600">
                Obtén reportes detallados con recomendaciones personalizadas
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Iniciando sesión con Lia...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 mb-4">
            <AlertTriangle className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error al conectar con Lia
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Intentar de nuevo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <EnhancedLIAAvatar size="small" isTyping={isLiaTyping} />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Auditoría con Lia
                </h1>
                <p className="text-sm text-gray-500">
                  {userProfile?.clinic_name || 'Mi Clínica'}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setCurrentView('conversation')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'conversation' ?'bg-blue-100 text-blue-700' :'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Conversación</span>
              </button>
              <button
                onClick={() => setCurrentView('documents')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'documents'
                    ? 'bg-blue-100 text-blue-700' :'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Documentos</span>
                {documentRequests.filter(doc => !doc.is_uploaded && doc.is_required).length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {documentRequests.filter(doc => !doc.is_uploaded && doc.is_required).length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setCurrentView('analysis')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'analysis' ?'bg-blue-100 text-blue-700' :'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Análisis</span>
              </button>
              <div className="flex items-center space-x-3 ml-6">
                <Link to="/user-profile-management">
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Perfil
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Salir
                </Button>
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              <button
                onClick={() => {
                  setCurrentView('conversation');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  currentView === 'conversation' ?'bg-blue-100 text-blue-700' :'text-gray-600'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Conversación</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('documents');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  currentView === 'documents'
                    ? 'bg-blue-100 text-blue-700' :'text-gray-600'
                }`}
              >
                <Upload className="h-4 w-4" />
                <span>Documentos</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('analysis');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  currentView === 'analysis' ?'bg-blue-100 text-blue-700' :'text-gray-600'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Análisis</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === 'conversation' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <EnhancedMessageBubble
                    key={message.id}
                    message={message}
                    isUser={message.message_type === 'user'}
                    documentRequest={message.document_requests}
                  />
                ))}
                {isLiaTyping && (
                  <div className="flex items-center space-x-3">
                    <EnhancedLIAAvatar size="small" isTyping={true} />
                    <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Message Input */}
            <div className="border-t border-gray-200 p-4">
              <MessageInput
                onSendMessage={handleSendMessage}
                disabled={isLiaTyping}
                placeholder="Escribe tu mensaje a Lia..."
              />
            </div>
          </div>
        )}

        {currentView === 'documents' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <DocumentUploadSection
              sessionId={currentSession?.id}
              onDocumentsComplete={handleDocumentsComplete}
            />
          </div>
        )}

        {currentView === 'analysis' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center py-12">
              <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Análisis en Proceso
              </h3>
              <p className="text-gray-600 mb-6">
                Lia está procesando tus documentos y preparando el análisis completo.
              </p>
              <Link to="/full-report-dashboard">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Ver Análisis Disponible
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AiConsultationInterface;