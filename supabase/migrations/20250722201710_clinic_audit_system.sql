-- Location: supabase/migrations/20250722201710_clinic_audit_system.sql
-- Comprehensive clinic audit system with authentication

-- 1. Types and Enums
CREATE TYPE public.user_role AS ENUM ('admin', 'clinic_owner', 'auditor', 'subscriber');
CREATE TYPE public.audit_status AS ENUM ('pending', 'in_progress', 'completed', 'paid');
CREATE TYPE public.document_type AS ENUM (
    'financial_statements', 'income_reports', 'expense_reports', 
    'debt_lists', 'employee_cv', 'operational_reports', 
    'competitive_analysis', 'marketing_reports', 'other'
);
CREATE TYPE public.audit_category AS ENUM (
    'financial_analysis', 'administrative_management', 'human_resources',
    'operational_efficiency', 'competitive_analysis', 'swot_analysis'
);

-- 2. Core Tables
-- Critical intermediary table for PostgREST compatibility
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    clinic_name TEXT,
    clinic_address TEXT,
    role public.user_role DEFAULT 'clinic_owner'::public.user_role,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Audit sessions table
CREATE TABLE public.audit_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    clinic_name TEXT NOT NULL,
    status public.audit_status DEFAULT 'pending'::public.audit_status,
    total_documents INTEGER DEFAULT 0,
    uploaded_documents INTEGER DEFAULT 0,
    audit_score INTEGER,
    payment_status BOOLEAN DEFAULT false,
    payment_amount DECIMAL(10,2) DEFAULT 299.99,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMPTZ,
    paid_at TIMESTAMPTZ
);

-- Document requests table
CREATE TABLE public.document_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    audit_session_id UUID REFERENCES public.audit_sessions(id) ON DELETE CASCADE,
    document_type public.document_type NOT NULL,
    request_message TEXT NOT NULL,
    is_required BOOLEAN DEFAULT true,
    is_uploaded BOOLEAN DEFAULT false,
    file_path TEXT,
    uploaded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Lia conversation messages
CREATE TABLE public.lia_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    audit_session_id UUID REFERENCES public.audit_sessions(id) ON DELETE CASCADE,
    message_type TEXT CHECK (message_type IN ('user', 'lia', 'system')) NOT NULL,
    content TEXT NOT NULL,
    document_request_id UUID REFERENCES public.document_requests(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Audit reports table
CREATE TABLE public.audit_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    audit_session_id UUID REFERENCES public.audit_sessions(id) ON DELETE CASCADE,
    category public.audit_category NOT NULL,
    analysis_data JSONB,
    recommendations TEXT,
    score INTEGER CHECK (score >= 0 AND score <= 100),
    strengths TEXT[],
    weaknesses TEXT[],
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Essential Indexes
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(id);
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_audit_sessions_user_id ON public.audit_sessions(user_id);
CREATE INDEX idx_audit_sessions_status ON public.audit_sessions(status);
CREATE INDEX idx_document_requests_session_id ON public.document_requests(audit_session_id);
CREATE INDEX idx_lia_messages_session_id ON public.lia_messages(audit_session_id);
CREATE INDEX idx_audit_reports_session_id ON public.audit_reports(audit_session_id);

-- 4. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lia_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_reports ENABLE ROW LEVEL SECURITY;

-- 5. Helper Functions
CREATE OR REPLACE FUNCTION public.is_audit_participant(session_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.audit_sessions aus
    WHERE aus.id = session_uuid AND aus.user_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.has_admin_role()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'::public.user_role
)
$$;

CREATE OR REPLACE FUNCTION public.is_report_owner(session_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.audit_sessions aus
    WHERE aus.id = session_uuid 
    AND aus.user_id = auth.uid() 
    AND aus.payment_status = true
)
$$;

-- Function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role, clinic_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'clinic_owner'::public.user_role),
    COALESCE(NEW.raw_user_meta_data->>'clinic_name', 'Mi Clínica')
  );
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. RLS Policies
CREATE POLICY "users_own_profile" ON public.user_profiles 
FOR ALL TO authenticated
USING (auth.uid() = id) 
WITH CHECK (auth.uid() = id);

CREATE POLICY "users_manage_audit_sessions" ON public.audit_sessions 
FOR ALL TO authenticated
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "admins_view_all_sessions" ON public.audit_sessions 
FOR SELECT TO authenticated
USING (public.has_admin_role());

CREATE POLICY "audit_participants_access_documents" ON public.document_requests 
FOR ALL TO authenticated
USING (public.is_audit_participant(audit_session_id)) 
WITH CHECK (public.is_audit_participant(audit_session_id));

CREATE POLICY "audit_participants_access_messages" ON public.lia_messages 
FOR ALL TO authenticated
USING (public.is_audit_participant(audit_session_id)) 
WITH CHECK (public.is_audit_participant(audit_session_id));

CREATE POLICY "paid_users_access_reports" ON public.audit_reports 
FOR SELECT TO authenticated
USING (public.is_report_owner(audit_session_id));

CREATE POLICY "admins_manage_reports" ON public.audit_reports 
FOR ALL TO authenticated
USING (public.has_admin_role()) 
WITH CHECK (public.has_admin_role());

-- 7. Complete Mock Data
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    clinic_owner_uuid UUID := gen_random_uuid();
    audit_session_uuid UUID := gen_random_uuid();
    doc_request_1 UUID := gen_random_uuid();
    doc_request_2 UUID := gen_random_uuid();
    doc_request_3 UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@clinicaudit.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Administrador Sistema", "role": "admin"}'::jsonb, 
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (clinic_owner_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'doctor.martinez@clinicasalud.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Dr. María Martínez", "clinic_name": "Clínica Salud Integral", "role": "clinic_owner"}'::jsonb,
         '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create audit session
    INSERT INTO public.audit_sessions (id, user_id, clinic_name, status, total_documents, uploaded_documents)
    VALUES (audit_session_uuid, clinic_owner_uuid, 'Clínica Salud Integral', 'in_progress'::public.audit_status, 10, 3);

    -- Create document requests
    INSERT INTO public.document_requests (id, audit_session_id, document_type, request_message, is_required)
    VALUES 
        (doc_request_1, audit_session_uuid, 'financial_statements'::public.document_type, 
         'Por favor, suba los estados financieros de los últimos 12 meses para analizar la salud económica de la clínica.', true),
        (doc_request_2, audit_session_uuid, 'income_reports'::public.document_type,
         'Necesito los reportes de ingresos mensuales para evaluar el rendimiento financiero y tendencias de crecimiento.', true),
        (doc_request_3, audit_session_uuid, 'debt_lists'::public.document_type,
         'Proporcione una lista detallada de todas las deudas actuales, incluyendo proveedores, préstamos y obligaciones pendientes.', true);

    -- Create Lia conversation messages
    INSERT INTO public.lia_messages (audit_session_id, message_type, content, document_request_id)
    VALUES 
        (audit_session_uuid, 'lia', '¡Hola! Soy Lia, tu asistente especializada en auditoría clínica. Voy a ayudarte a realizar un análisis completo de tu clínica para identificar oportunidades de mejora y fortalezas. Para comenzar, necesito que me proporciones algunos documentos clave.', null),
        (audit_session_uuid, 'lia', 'Para realizar una auditoría 100% efectiva, necesito analizar los siguientes documentos:', null),
        (audit_session_uuid, 'lia', '📊 Estados financieros de los últimos 12 meses', doc_request_1),
        (audit_session_uuid, 'user', 'Perfecto Lia, tengo algunos documentos listos. ¿Por dónde empiezo?', null),
        (audit_session_uuid, 'lia', '💰 Reportes de ingresos y gastos mensuales detallados', doc_request_2),
        (audit_session_uuid, 'lia', '📋 Lista completa de deudas y obligaciones actuales', doc_request_3);

    -- Create sample audit reports
    INSERT INTO public.audit_reports (audit_session_id, category, score, strengths, weaknesses, recommendations)
    VALUES 
        (audit_session_uuid, 'financial_analysis'::public.audit_category, 75, 
         ARRAY['Flujo de caja positivo', 'Crecimiento en ingresos del 15%', 'Control de gastos operativos'],
         ARRAY['Alta dependencia de pocos pacientes', 'Falta de diversificación de servicios', 'Capital de trabajo limitado'],
         'Recomiendo diversificar los servicios médicos y establecer un fondo de emergencia de al menos 3 meses de gastos operativos.'),
        (audit_session_uuid, 'administrative_management'::public.audit_category, 68,
         ARRAY['Procesos digitalizados', 'Sistema de citas eficiente', 'Historiales médicos organizados'],
         ARRAY['Falta de protocolos estandarizados', 'Comunicación interna deficiente', 'Ausencia de KPIs'],
         'Implementar un sistema de gestión de calidad ISO 9001 y establecer métricas de desempeño clave para todos los procesos.');

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Error de clave foránea: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Error de restricción única: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Error inesperado: %', SQLERRM;
END $$;

-- 8. Utility Functions for Cleanup
CREATE OR REPLACE FUNCTION public.cleanup_audit_test_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    auth_user_ids_to_delete UUID[];
BEGIN
    -- Get auth user IDs for test data
    SELECT ARRAY_AGG(id) INTO auth_user_ids_to_delete
    FROM auth.users
    WHERE email LIKE '%@clinicaudit.com' OR email LIKE '%@clinicasalud.com';

    -- Delete in dependency order (children first)
    DELETE FROM public.audit_reports WHERE audit_session_id IN (
        SELECT id FROM public.audit_sessions WHERE user_id = ANY(auth_user_ids_to_delete)
    );
    DELETE FROM public.lia_messages WHERE audit_session_id IN (
        SELECT id FROM public.audit_sessions WHERE user_id = ANY(auth_user_ids_to_delete)
    );
    DELETE FROM public.document_requests WHERE audit_session_id IN (
        SELECT id FROM public.audit_sessions WHERE user_id = ANY(auth_user_ids_to_delete)
    );
    DELETE FROM public.audit_sessions WHERE user_id = ANY(auth_user_ids_to_delete);
    DELETE FROM public.user_profiles WHERE id = ANY(auth_user_ids_to_delete);

    -- Delete auth.users last
    DELETE FROM auth.users WHERE id = ANY(auth_user_ids_to_delete);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Error al eliminar datos de prueba: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Error de limpieza: %', SQLERRM;
END;
$$;