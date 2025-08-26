import { supabase } from './supabase';

class AuditService {
  // Create new audit session
  async createAuditSession(clinicName) {
    try {
      const { data, error } = await supabase
        .from('audit_sessions')
        .insert({
          clinic_name: clinicName,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Error al crear sesión de auditoría' };
    }
  }

  // Get audit sessions for user
  async getUserAuditSessions() {
    try {
      const { data, error } = await supabase
        .from('audit_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Error al obtener sesiones de auditoría' };
    }
  }

  // Get audit session by ID
  async getAuditSession(sessionId) {
    try {
      const { data, error } = await supabase
        .from('audit_sessions')
        .select('*')
        .eq('id', sessionId)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Error al obtener sesión de auditoría' };
    }
  }

  // Request documents for audit
  async requestDocument(sessionId, documentType, requestMessage, isRequired = true) {
    try {
      const { data, error } = await supabase
        .from('document_requests')
        .insert({
          audit_session_id: sessionId,
          document_type: documentType,
          request_message: requestMessage,
          is_required: isRequired
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Error al solicitar documento' };
    }
  }

  // Get document requests for session
  async getDocumentRequests(sessionId) {
    try {
      const { data, error } = await supabase
        .from('document_requests')
        .select('*')
        .eq('audit_session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Error al obtener solicitudes de documentos' };
    }
  }

  // Upload document file
  async uploadDocument(sessionId, documentRequestId, file) {
    try {
      const fileName = `${sessionId}/${documentRequestId}/${file.name}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('audit-documents')
        .upload(fileName, file);

      if (uploadError) {
        return { success: false, error: uploadError.message };
      }

      // Update document request with file path
      const { data, error } = await supabase
        .from('document_requests')
        .update({
          is_uploaded: true,
          file_path: uploadData.path,
          uploaded_at: new Date().toISOString()
        })
        .eq('id', documentRequestId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Error al subir documento' };
    }
  }

  // Add Lia message
  async addLiaMessage(sessionId, messageType, content, documentRequestId = null) {
    try {
      const { data, error } = await supabase
        .from('lia_messages')
        .insert({
          audit_session_id: sessionId,
          message_type: messageType,
          content: content,
          document_request_id: documentRequestId
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Error al agregar mensaje' };
    }
  }

  // Get conversation messages
  async getConversationMessages(sessionId) {
    try {
      const { data, error } = await supabase
        .from('lia_messages')
        .select('*, document_requests(document_type)')
        .eq('audit_session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Error al obtener mensajes' };
    }
  }

  // Update audit session status
  async updateAuditStatus(sessionId, status, additionalData = {}) {
    try {
      const { data, error } = await supabase
        .from('audit_sessions')
        .update({ 
          status: status,
          ...additionalData 
        })
        .eq('id', sessionId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Error al actualizar estado de auditoría' };
    }
  }

  // Generate audit report
  async generateAuditReport(sessionId, category, analysisData, recommendations, score, strengths, weaknesses) {
    try {
      const { data, error } = await supabase
        .from('audit_reports')
        .insert({
          audit_session_id: sessionId,
          category: category,
          analysis_data: analysisData,
          recommendations: recommendations,
          score: score,
          strengths: strengths,
          weaknesses: weaknesses
        })
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Error al generar reporte de auditoría' };
    }
  }

  // Get audit reports for session
  async getAuditReports(sessionId) {
    try {
      const { data, error } = await supabase
        .from('audit_reports')
        .select('*')
        .eq('audit_session_id', sessionId)
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Error al obtener reportes de auditoría' };
    }
  }

  // Process payment for report
  async processReportPayment(sessionId, paymentAmount) {
    try {
      const { data, error } = await supabase
        .from('audit_sessions')
        .update({
          payment_status: true,
          payment_amount: paymentAmount,
          paid_at: new Date().toISOString()
        })
        .eq('id', sessionId)
        .select()
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Error al procesar pago' };
    }
  }

  // Listen to real-time updates
  subscribeToAuditSession(sessionId, callback) {
    return supabase
      .channel(`audit-session-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'lia_messages',
          filter: `audit_session_id=eq.${sessionId}`
        },
        callback
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'document_requests',
          filter: `audit_session_id=eq.${sessionId}`
        },
        callback
      )
      .subscribe();
  }
}

const auditService = new AuditService();
export default auditService;