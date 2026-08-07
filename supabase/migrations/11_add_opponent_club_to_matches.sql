-- =========================================================================
-- MIGRACIÓN 11: ANEXO NO DESTRUCTIVO DE VINCULACIÓN CON CLUBES RIVALES
-- Añade public.partidos.opponent_club_id y la clave foránea tras crear opponent_clubs
-- =========================================================================

ALTER TABLE public.partidos
  ADD COLUMN IF NOT EXISTS opponent_club_id UUID NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'partidos_opponent_club_id_fkey'
      AND conrelid = 'public.partidos'::regclass
  ) THEN
    ALTER TABLE public.partidos
      ADD CONSTRAINT partidos_opponent_club_id_fkey
      FOREIGN KEY (opponent_club_id)
      REFERENCES public.opponent_clubs(id)
      ON DELETE SET NULL;
  END IF;
END $$;
