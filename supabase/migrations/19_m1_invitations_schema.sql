-- =========================================================================
-- MIGRACIÓN 19: INFRAESTRUCTURA DE INVITACIONES Y EVENTOS (BLOQUE 4F.3 - M1)
-- Migración completamente aislada del sistema actual.
-- =========================================================================

-- Extensiones necesarias para UUIDs y funciones criptográficas de hash
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================================================================
-- 1. TIPOS Y ENUMS
-- =========================================================================

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'invitation_status_type') THEN
    CREATE TYPE invitation_status_type AS ENUM (
      'PENDING_APPROVAL',
      'APPROVED',
      'SENT',
      'ACCEPTED',
      'EXPIRED',
      'REVOKED',
      'DENIED',
      'FAILED'
    );
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'invitation_event_type') THEN
    CREATE TYPE invitation_event_type AS ENUM (
      'CREATED',
      'APPROVED',
      'SENT',
      'RESENT',
      'FAILED',
      'EXPIRED',
      'ACCEPTED',
      'REVOKED',
      'DENIED'
    );
  END IF;
END $$;

-- =========================================================================
-- 2. TABLA INVITATIONS
-- =========================================================================

CREATE TABLE IF NOT EXISTS public.invitations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invitation_type VARCHAR(50) NOT NULL,
  target_role VARCHAR(50) NOT NULL,
  player_id UUID NULL,
  team_id UUID NULL,
  scope_type VARCHAR(50) NULL,
  scope_id UUID NULL,
  invited_name VARCHAR(100) NOT NULL,
  invited_surname VARCHAR(100) NULL,
  phone VARCHAR(30) NULL,
  email VARCHAR(255) NULL,
  token_hash VARCHAR(64) UNIQUE NOT NULL,
  status invitation_status_type NOT NULL DEFAULT 'PENDING_APPROVAL',
  created_by UUID NULL,
  approved_by UUID NULL,
  sent_at TIMESTAMPTZ NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ NULL,
  revoked_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Restricciones de integridad (Constraints)
  CONSTRAINT chk_invitations_expires_after_created CHECK (expires_at > created_at),
  CONSTRAINT chk_invitations_accepted_timestamp CHECK (status != 'ACCEPTED' OR accepted_at IS NOT NULL),
  CONSTRAINT chk_invitations_revoked_timestamp CHECK (status != 'REVOKED' OR revoked_at IS NOT NULL)
);

COMMENT ON TABLE public.invitations IS 'Tabla de invitaciones para familias y personal (M1 - Bloque 4F.3)';
COMMENT ON COLUMN public.invitations.token_hash IS 'Hash SHA-256 (64 hex) del token original. Nunca almacenar el token real.';

-- =========================================================================
-- 3. TABLA INVITATION_EVENTS
-- =========================================================================

CREATE TABLE IF NOT EXISTS public.invitation_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  event_type invitation_event_type NOT NULL,
  performed_by UUID NULL,
  metadata JSONB DEFAULT '{}'::jsonb NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

COMMENT ON TABLE public.invitation_events IS 'Historial auditado de eventos de invitaciones (M1 - Bloque 4F.3)';

-- =========================================================================
-- 4. ÍNDICES DE RENDIMIENTO Y BÚSQUEDA
-- =========================================================================

CREATE INDEX IF NOT EXISTS idx_invitations_token_hash ON public.invitations(token_hash);
CREATE INDEX IF NOT EXISTS idx_invitations_status ON public.invitations(status);
CREATE INDEX IF NOT EXISTS idx_invitations_expires_at ON public.invitations(expires_at);
CREATE INDEX IF NOT EXISTS idx_invitations_player_id ON public.invitations(player_id);
CREATE INDEX IF NOT EXISTS idx_invitations_team_id ON public.invitations(team_id);
CREATE INDEX IF NOT EXISTS idx_invitations_phone ON public.invitations(phone);
CREATE INDEX IF NOT EXISTS idx_invitation_events_invitation_id ON public.invitation_events(invitation_id);

-- =========================================================================
-- 5. ROW LEVEL SECURITY (RLS)
-- =========================================================================

ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitation_events ENABLE ROW LEVEL SECURITY;

-- Por seguridad por defecto en M1, no se crean políticas públicas abiertas.
-- El acceso a las tablas queda restringido exclusivamente al backend / service-role.

-- =========================================================================
-- 6. FUNCIONES AUXILIARES DE GESTIÓN (RPC PARA PRUEBAS Y CONSUMO BACKEND)
-- =========================================================================

-- Función para generar hash SHA-256 de un token en texto plano
CREATE OR REPLACE FUNCTION public.hash_invitation_token(p_raw_token TEXT)
RETURNS VARCHAR(64) AS $$
BEGIN
  RETURN encode(digest(p_raw_token, 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql IMMUTABLE STRICT PARALLEL SAFE;

-- Función helper para actualizar fecha updated_at automáticamente
CREATE OR REPLACE FUNCTION public.update_invitation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_invitations_updated_at ON public.invitations;
CREATE TRIGGER trg_update_invitations_updated_at
  BEFORE UPDATE ON public.invitations
  FOR EACH ROW EXECUTE PROCEDURE public.update_invitation_timestamp();
