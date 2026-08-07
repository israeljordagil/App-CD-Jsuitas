-- =========================================================================
-- MIGRACIÓN 16: SEED CANÓNICO DEFINITIVO DE JUGADORES REALES FFCV (2026/2027)
-- Temporada 2026/2027 — CD Jesuitas (456 Jugadores / 31 Equipos)
-- =========================================================================

BEGIN;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000001', NULL, 'Marc', 'Domínguez Marqués', 'Marc Domínguez Marqués', '2010-03-24', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000001', 'a1000001-0000-4000-8000-000000000001', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000002', NULL, 'David', 'Guillot López', 'David Guillot López', '2010-12-12', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000002', 'a1000001-0000-4000-8000-000000000002', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000003', NULL, 'Rubén', 'Cabanes Martínez', 'Rubén Cabanes Martínez', '2010-07-28', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000003', 'a1000001-0000-4000-8000-000000000003', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000004', NULL, 'Marc', 'Fort Campos', 'Marc Fort Campos', '2010-02-26', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000004', 'a1000001-0000-4000-8000-000000000004', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000005', NULL, 'Guillermo', 'Montaner Campos', 'Guillermo Montaner Campos', '2010-12-30', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000005', 'a1000001-0000-4000-8000-000000000005', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000006', NULL, 'Diego', 'Esteban Platero', 'Diego Esteban Platero', '2010-11-15', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000006', 'a1000001-0000-4000-8000-000000000006', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000007', NULL, 'Nacho', 'Mondragón Peciña', 'Nacho Mondragón Peciña', '2010-09-05', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000007', 'a1000001-0000-4000-8000-000000000007', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000008', NULL, 'Borja', 'Pérez Morales', 'Borja Pérez Morales', '2011-06-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000008', 'a1000001-0000-4000-8000-000000000008', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000009', NULL, 'Alejandro', 'Herrero Cog', 'Alejandro Herrero Cog', '2008-05-27', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000009', 'a1000001-0000-4000-8000-000000000009', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000010', NULL, 'Marcos', 'García Macías', 'Marcos García Macías', '2008-11-17', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000010', 'a1000001-0000-4000-8000-000000000010', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000011', NULL, 'Izan', 'Albiach Jiménez', 'Izan Albiach Jiménez', '2008-08-28', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000011', 'a1000001-0000-4000-8000-000000000011', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000012', NULL, 'Izan', 'González Prats', 'Izan González Prats', '2009-06-15', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000012', 'a1000001-0000-4000-8000-000000000012', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000013', NULL, 'Guillem', 'Palacios Estrelles', 'Guillem Palacios Estrelles', '2009-07-20', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000013', 'a1000001-0000-4000-8000-000000000013', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000014', NULL, 'Alfredo', 'Liñana Ros', 'Alfredo Liñana Ros', '2009-07-27', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000014', 'a1000001-0000-4000-8000-000000000014', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000015', NULL, 'Miguel', 'Nieto Medina', 'Miguel Nieto Medina', '2009-02-11', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000015', 'a1000001-0000-4000-8000-000000000015', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000016', NULL, 'Lucas', 'Domenech Tomás', 'Lucas Domenech Tomás', '2009-06-18', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000016', 'a1000001-0000-4000-8000-000000000016', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000017', NULL, 'Héctor', 'Cabanes Aparicio', 'Héctor Cabanes Aparicio', '2009-06-30', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000017', 'a1000001-0000-4000-8000-000000000017', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000018', NULL, 'Marc', 'Domínguez Marques', 'Marc Domínguez Marques', '2010-03-24', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000018', 'a1000001-0000-4000-8000-000000000018', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000019', NULL, 'Nicolás', 'Ferreiro de Castro', 'Nicolás Ferreiro de Castro', '2010-11-12', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000019', 'a1000001-0000-4000-8000-000000000019', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000020', NULL, 'Daniel Eduardo', 'Rapino Fernández', 'Daniel Eduardo Rapino Fernández', '2010-07-07', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000020', 'a1000001-0000-4000-8000-000000000020', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000021', NULL, 'Jaime', 'Rivera Gómez', 'Jaime Rivera Gómez', '2010-04-13', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000021', 'a1000001-0000-4000-8000-000000000021', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000022', NULL, 'Ángel', 'Cebriá García', 'Ángel Cebriá García', '2010-02-05', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000022', 'a1000001-0000-4000-8000-000000000022', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000023', NULL, 'Christopher Alex', 'Meinhardt Lugo', 'Christopher Alex Meinhardt Lugo', '2010-01-14', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000023', 'a1000001-0000-4000-8000-000000000023', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000024', NULL, 'Bautista', 'Vega Despouy', 'Bautista Vega Despouy', '2010-03-31', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000024', 'a1000001-0000-4000-8000-000000000024', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000025', NULL, 'Iván', 'Gómez Martínez', 'Iván Gómez Martínez', '2010-08-08', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000025', 'a1000001-0000-4000-8000-000000000025', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000026', NULL, 'Alfredo Vicente', 'Espert Dalmau', 'Alfredo Vicente Espert Dalmau', '2010-11-12', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000026', 'a1000001-0000-4000-8000-000000000026', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000027', NULL, 'Xavi', 'Jiménez Bermell', 'Xavi Jiménez Bermell', '2010-03-29', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000027', 'a1000001-0000-4000-8000-000000000027', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000028', NULL, 'Josep-Manel', 'Carcel Muñoz', 'Josep-Manel Carcel Muñoz', '2010-07-30', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000028', 'a1000001-0000-4000-8000-000000000028', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000029', NULL, 'Javier', 'Mira Abarca', 'Javier Mira Abarca', '2009-09-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000029', 'a1000001-0000-4000-8000-000000000029', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000030', NULL, 'Adrián', 'Díaz Benedicto', 'Adrián Díaz Benedicto', '2009-04-28', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000030', 'a1000001-0000-4000-8000-000000000030', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000031', NULL, 'Guillermo', 'Ramírez Máñez', 'Guillermo Ramírez Máñez', '2009-02-13', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000031', 'a1000001-0000-4000-8000-000000000031', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000032', NULL, 'Jorge', 'Sebastián Cano', 'Jorge Sebastián Cano', '2009-11-10', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000032', 'a1000001-0000-4000-8000-000000000032', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000033', NULL, 'Bastian', 'Ferrer Pastor', 'Bastian Ferrer Pastor', '2008-02-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000033', 'a1000001-0000-4000-8000-000000000033', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000034', NULL, 'Pablo', 'Alegrete Larrea', 'Pablo Alegrete Larrea', '2009-07-27', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000034', 'a1000001-0000-4000-8000-000000000034', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000035', NULL, 'Alejandro Bueno', 'Bueno Ribes', 'Alejandro Bueno Bueno Ribes', '2009-05-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000035', 'a1000001-0000-4000-8000-000000000035', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000036', NULL, 'Sergio', 'Bru Herrero', 'Sergio Bru Herrero', '2011-04-10', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Juvenil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000036', 'a1000001-0000-4000-8000-000000000036', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000037', NULL, 'Nacho', 'Guillot Libros', 'Nacho Guillot Libros', '2011-09-09', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000037', 'a1000001-0000-4000-8000-000000000037', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000038', NULL, 'Guillem', 'Pérez Rico', 'Guillem Pérez Rico', '2011-05-17', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000038', 'a1000001-0000-4000-8000-000000000038', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000039', NULL, 'Pedro', 'Carrilero Fernández', 'Pedro Carrilero Fernández', '2011-09-18', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000039', 'a1000001-0000-4000-8000-000000000039', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000040', NULL, 'Adrián', 'Fernández Arribas', 'Adrián Fernández Arribas', '2011-07-21', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000040', 'a1000001-0000-4000-8000-000000000040', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000041', NULL, 'Manel Antoni', 'Canet Mascarell', 'Manel Antoni Canet Mascarell', '2011-08-10', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000041', 'a1000001-0000-4000-8000-000000000041', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000042', NULL, 'Martín J.', 'Benetó Ferrer', 'Martín J. Benetó Ferrer', '2011-03-12', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000042', 'a1000001-0000-4000-8000-000000000042', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000043', NULL, 'Martín', 'Gisbert Oliván', 'Martín Gisbert Oliván', '2011-02-13', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000043', 'a1000001-0000-4000-8000-000000000043', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000044', NULL, 'Matteo', 'De Claviere', 'Matteo De Claviere', '2011-02-19', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000044', 'a1000001-0000-4000-8000-000000000044', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000045', NULL, 'Adrián', 'López Antón', 'Adrián López Antón', '2011-02-09', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000045', 'a1000001-0000-4000-8000-000000000045', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000046', NULL, 'Ignacio', 'Cases Lozanos', 'Ignacio Cases Lozanos', '2011-09-12', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000046', 'a1000001-0000-4000-8000-000000000046', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000047', NULL, 'Pablo', 'Martínez Castro', 'Pablo Martínez Castro', '2011-12-20', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000047', 'a1000001-0000-4000-8000-000000000047', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000048', NULL, 'Pablo', 'Muñoz Piera', 'Pablo Muñoz Piera', '2011-05-21', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000048', 'a1000001-0000-4000-8000-000000000048', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000049', NULL, 'Bruno', 'Miralles Martí', 'Bruno Miralles Martí', '2011-01-26', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000049', 'a1000001-0000-4000-8000-000000000049', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000050', NULL, 'José Ángel', 'Traver Ballestero', 'José Ángel Traver Ballestero', '2011-06-05', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000050', 'a1000001-0000-4000-8000-000000000050', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000051', NULL, 'Adrián', 'Boronat Huerta', 'Adrián Boronat Huerta', '2011-02-19', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000051', 'a1000001-0000-4000-8000-000000000051', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000052', NULL, 'Pablo', 'Cervero Franco', 'Pablo Cervero Franco', '2011-09-03', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000052', 'a1000001-0000-4000-8000-000000000052', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000053', NULL, 'Gonzalo', 'Orts Martínez', 'Gonzalo Orts Martínez', '2012-03-13', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000053', 'a1000001-0000-4000-8000-000000000053', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000054', NULL, 'Carlos', 'García Pitarch', 'Carlos García Pitarch', '2012-02-13', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000054', 'a1000001-0000-4000-8000-000000000054', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000055', NULL, 'Erik', 'Rico Fromm', 'Erik Rico Fromm', '2011-01-28', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000055', 'a1000001-0000-4000-8000-000000000055', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000056', NULL, 'Jugador_1', 'Intranet Cadete A', 'Jugador_1 Intranet Cadete A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000056', 'a1000001-0000-4000-8000-000000000056', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000057', NULL, 'Pablo', 'Kalu Ela', 'Pablo Kalu Ela', '2011-11-26', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000057', 'a1000001-0000-4000-8000-000000000057', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000058', NULL, 'Paco', 'Pineda Martos', 'Paco Pineda Martos', '2011-10-16', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000058', 'a1000001-0000-4000-8000-000000000058', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000059', NULL, 'Daniel', 'Moreno Izquierdo', 'Daniel Moreno Izquierdo', '2011-08-20', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000059', 'a1000001-0000-4000-8000-000000000059', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000060', NULL, 'Marcos', 'Cruz Barragán', 'Marcos Cruz Barragán', '2011-07-21', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000060', 'a1000001-0000-4000-8000-000000000060', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000061', NULL, 'Raúl', 'Fuster Saiz', 'Raúl Fuster Saiz', '2011-05-21', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000061', 'a1000001-0000-4000-8000-000000000061', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000062', NULL, 'Joaquín', 'Aracil Griol', 'Joaquín Aracil Griol', '2011-01-25', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000062', 'a1000001-0000-4000-8000-000000000062', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000063', NULL, 'Alejandro', 'Barreiro Bueno', 'Alejandro Barreiro Bueno', '2011-03-19', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000063', 'a1000001-0000-4000-8000-000000000063', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000064', NULL, 'Pablo', 'Garde Dura', 'Pablo Garde Dura', '2011-12-17', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000064', 'a1000001-0000-4000-8000-000000000064', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000065', NULL, 'Alejandro', 'Jara León', 'Alejandro Jara León', '2011-02-11', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000065', 'a1000001-0000-4000-8000-000000000065', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000066', NULL, 'Pepe', 'Belenguer Aguilar', 'Pepe Belenguer Aguilar', '2011-03-07', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000066', 'a1000001-0000-4000-8000-000000000066', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000067', NULL, 'Roberto', 'Ferreira Martín', 'Roberto Ferreira Martín', '2011-03-17', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000067', 'a1000001-0000-4000-8000-000000000067', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000068', NULL, 'Álvaro', 'Mateo Bas', 'Álvaro Mateo Bas', '2011-08-30', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000068', 'a1000001-0000-4000-8000-000000000068', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000069', NULL, 'Héctor', 'García Galdón', 'Héctor García Galdón', '2011-09-27', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000069', 'a1000001-0000-4000-8000-000000000069', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000070', NULL, 'Juan', 'Vivó Iranzo', 'Juan Vivó Iranzo', '2011-06-27', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000070', 'a1000001-0000-4000-8000-000000000070', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000071', NULL, 'Hugo', 'Rodrigo Llorens', 'Hugo Rodrigo Llorens', '2011-05-16', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000071', 'a1000001-0000-4000-8000-000000000071', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000072', NULL, 'Martín', 'Herrera Rochina', 'Martín Herrera Rochina', '2011-11-24', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000072', 'a1000001-0000-4000-8000-000000000072', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000073', NULL, 'Pau', 'Olmos Luján', 'Pau Olmos Luján', '2011-01-06', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000073', 'a1000001-0000-4000-8000-000000000073', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000074', NULL, 'Pablo', 'Garrido Gabaldón', 'Pablo Garrido Gabaldón', '2011-06-14', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000074', 'a1000001-0000-4000-8000-000000000074', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000075', NULL, 'Sam', 'Mostafa', 'Sam Mostafa', '2011-01-14', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000075', 'a1000001-0000-4000-8000-000000000075', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000076', NULL, 'David', 'Giménez Pastor', 'David Giménez Pastor', '2012-08-16', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000076', 'a1000001-0000-4000-8000-000000000076', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000077', NULL, 'Joel', 'Estellés Redó', 'Joel Estellés Redó', '2012-11-19', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000077', 'a1000001-0000-4000-8000-000000000077', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000078', NULL, 'Samuel', 'Repiso Chacón', 'Samuel Repiso Chacón', '2012-03-10', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000078', 'a1000001-0000-4000-8000-000000000078', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000079', NULL, 'Enzo', 'Olmeda Ferru', 'Enzo Olmeda Ferru', '2012-05-29', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000079', 'a1000001-0000-4000-8000-000000000079', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000080', NULL, 'Amir', 'Redrady El Quas', 'Amir Redrady El Quas', '2012-06-14', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000080', 'a1000001-0000-4000-8000-000000000080', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000081', NULL, 'Sergio', 'Sanz Vivancos', 'Sergio Sanz Vivancos', '2012-02-23', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000081', 'a1000001-0000-4000-8000-000000000081', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000082', NULL, 'Hugo', 'Hans Ramírez', 'Hugo Hans Ramírez', '2012-04-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000082', 'a1000001-0000-4000-8000-000000000082', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000083', NULL, 'Mario', 'Sevilla Cejudo', 'Mario Sevilla Cejudo', '2012-01-20', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000083', 'a1000001-0000-4000-8000-000000000083', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000084', NULL, 'David', 'Bru Rubio', 'David Bru Rubio', '2012-04-14', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000084', 'a1000001-0000-4000-8000-000000000084', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000085', NULL, 'Guillermo', 'Llácer Libros', 'Guillermo Llácer Libros', '2012-04-20', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000085', 'a1000001-0000-4000-8000-000000000085', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000086', NULL, 'Alejandro', 'Alves García', 'Alejandro Alves García', '2012-04-05', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000086', 'a1000001-0000-4000-8000-000000000086', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000087', NULL, 'Alejandro', 'Cortés Toro', 'Alejandro Cortés Toro', '2012-08-26', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000087', 'a1000001-0000-4000-8000-000000000087', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000088', NULL, 'Álvaro', 'Guzmán García', 'Álvaro Guzmán García', '2012-05-05', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000088', 'a1000001-0000-4000-8000-000000000088', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000089', NULL, 'Iván', 'Cuevas Fuertes', 'Iván Cuevas Fuertes', '2012-08-10', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000089', 'a1000001-0000-4000-8000-000000000089', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000090', NULL, 'Nacho', 'López Vidal', 'Nacho López Vidal', '2012-06-10', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000090', 'a1000001-0000-4000-8000-000000000090', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000091', NULL, 'Jorge (Jordi)', 'Lapeña Herna', 'Jorge (Jordi) Lapeña Herna', '2012-12-28', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000091', 'a1000001-0000-4000-8000-000000000091', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000092', NULL, 'Raúl', 'Gil García', 'Raúl Gil García', '2012-10-18', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000092', 'a1000001-0000-4000-8000-000000000092', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000093', NULL, 'Marc', 'Pascual Loeches', 'Marc Pascual Loeches', '2012-05-30', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000093', 'a1000001-0000-4000-8000-000000000093', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000094', NULL, 'Álvaro', 'Pascual Loeches', 'Álvaro Pascual Loeches', '2012-05-30', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000094', 'a1000001-0000-4000-8000-000000000094', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000095', NULL, 'Ariel Alexander', 'Escobar Chasna', 'Ariel Alexander Escobar Chasna', '2012-11-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000095', 'a1000001-0000-4000-8000-000000000095', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000096', NULL, 'Hugo', 'Pastor Pérez', 'Hugo Pastor Pérez', '2012-07-09', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000096', 'a1000001-0000-4000-8000-000000000096', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000097', NULL, 'Alex', 'Manresa Bañeras', 'Alex Manresa Bañeras', '2012-12-30', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000097', 'a1000001-0000-4000-8000-000000000097', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000098', NULL, 'Alberto', 'Miralles Soler', 'Alberto Miralles Soler', '2012-09-29', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000098', 'a1000001-0000-4000-8000-000000000098', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000099', NULL, 'Mario', 'Navarrete Cruz', 'Mario Navarrete Cruz', '2012-12-29', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000099', 'a1000001-0000-4000-8000-000000000099', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000100', NULL, 'Vicente', 'Mascarós Sanchis', 'Vicente Mascarós Sanchis', '2012-02-07', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000100', 'a1000001-0000-4000-8000-000000000100', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000101', NULL, 'Álvaro', 'García Martín', 'Álvaro García Martín', '2012-12-08', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000101', 'a1000001-0000-4000-8000-000000000101', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000102', NULL, 'Johan', 'Brand Sastre', 'Johan Brand Sastre', '2021-11-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000102', 'a1000001-0000-4000-8000-000000000102', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000103', NULL, 'Mario', 'Solsona Pérez', 'Mario Solsona Pérez', '2012-06-28', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000103', 'a1000001-0000-4000-8000-000000000103', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000104', NULL, 'Rodrigo', 'Gallego Zaro', 'Rodrigo Gallego Zaro', '2012-09-21', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000104', 'a1000001-0000-4000-8000-000000000104', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000105', NULL, 'Francisco', 'Semproni Salmon', 'Francisco Semproni Salmon', '2012-11-30', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000105', 'a1000001-0000-4000-8000-000000000105', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000106', NULL, 'Óscar', 'Domínguez Martínez', 'Óscar Domínguez Martínez', '2012-02-28', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000106', 'a1000001-0000-4000-8000-000000000106', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000107', NULL, 'Diego', 'Grimaldo López', 'Diego Grimaldo López', '2012-01-30', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000107', 'a1000001-0000-4000-8000-000000000107', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000108', NULL, 'Marcos', 'López Piqueras', 'Marcos López Piqueras', '2012-01-04', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000108', 'a1000001-0000-4000-8000-000000000108', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000109', NULL, 'Fran J.', 'Clavel Orón', 'Fran J. Clavel Orón', '2012-01-25', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000109', 'a1000001-0000-4000-8000-000000000109', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000110', NULL, 'Adrián', 'González Prats', 'Adrián González Prats', '2012-06-02', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000110', 'a1000001-0000-4000-8000-000000000110', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000111', NULL, 'Carlos', 'Villalba Gamiz', 'Carlos Villalba Gamiz', '2012-06-14', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000111', 'a1000001-0000-4000-8000-000000000111', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000112', NULL, 'Leo', 'Fernández Miguel', 'Leo Fernández Miguel', '2012-12-27', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000112', 'a1000001-0000-4000-8000-000000000112', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000113', NULL, 'Luís', 'Doménech Verdejo', 'Luís Doménech Verdejo', '2012-01-17', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000113', 'a1000001-0000-4000-8000-000000000113', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000114', NULL, 'Ariel Alexander', 'Escobar Chasnamote', 'Ariel Alexander Escobar Chasnamote', '2012-11-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000114', 'a1000001-0000-4000-8000-000000000114', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000115', NULL, 'Nicolas', 'Monteagudo', 'Nicolas Monteagudo', '2011-06-14', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000115', 'a1000001-0000-4000-8000-000000000115', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000116', NULL, 'Mateo', 'Palacios', 'Mateo Palacios', '2011-06-18', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000116', 'a1000001-0000-4000-8000-000000000116', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000117', NULL, 'Pedro Marcos', 'Ncogo Ekoho', 'Pedro Marcos Ncogo Ekoho', '2011-11-16', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000117', 'a1000001-0000-4000-8000-000000000117', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000118', NULL, 'José Miguel', 'Zambrano Areva', 'José Miguel Zambrano Areva', '2011-11-30', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000118', 'a1000001-0000-4000-8000-000000000118', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000119', NULL, 'Vicente', 'Madrid Guillot', 'Vicente Madrid Guillot', '2011-12-16', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000119', 'a1000001-0000-4000-8000-000000000119', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000120', NULL, 'Miguel', 'Gutiérrez Ruiz', 'Miguel Gutiérrez Ruiz', '2011-12-19', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000120', 'a1000001-0000-4000-8000-000000000120', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000121', NULL, 'Mario', 'Estrella', 'Mario Estrella', '2011-02-09', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000121', 'a1000001-0000-4000-8000-000000000121', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000122', NULL, 'Bence', 'Borsós Szabó', 'Bence Borsós Szabó', '2011-03-29', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000122', 'a1000001-0000-4000-8000-000000000122', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000123', NULL, 'Ian Miquel', 'Albuixech', 'Ian Miquel Albuixech', '2011-03-11', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000123', 'a1000001-0000-4000-8000-000000000123', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000124', NULL, 'Sebastián Matías', 'Fernández', 'Sebastián Matías Fernández', '2011-03-11', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000124', 'a1000001-0000-4000-8000-000000000124', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000125', NULL, 'David', 'Meza Guzmán', 'David Meza Guzmán', '2012-07-02', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000125', 'a1000001-0000-4000-8000-000000000125', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000126', NULL, 'Erik Shamir', 'Nizola Saez', 'Erik Shamir Nizola Saez', '2012-03-13', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000126', 'a1000001-0000-4000-8000-000000000126', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000127', NULL, 'Nicolas', 'Marco Mora', 'Nicolas Marco Mora', '2012-04-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000127', 'a1000001-0000-4000-8000-000000000127', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000128', NULL, 'Sebastian', 'Schilling', 'Sebastian Schilling', '2012-06-05', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000128', 'a1000001-0000-4000-8000-000000000128', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000129', NULL, 'Nico', 'Areiza', 'Nico Areiza', '2012-04-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000129', 'a1000001-0000-4000-8000-000000000129', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000130', NULL, 'Jorge', 'Monreal del Cura', 'Jorge Monreal del Cura', '2011-04-21', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000130', 'a1000001-0000-4000-8000-000000000130', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000131', NULL, 'Alex', 'Maigua', 'Alex Maigua', '2011-07-12', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000131', 'a1000001-0000-4000-8000-000000000131', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000132', NULL, 'Daniil', 'Derzhakov', 'Daniil Derzhakov', '2012-11-15', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000132', 'a1000001-0000-4000-8000-000000000132', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000133', NULL, 'Jugador_1', 'Intranet Cadete E', 'Jugador_1 Intranet Cadete E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000133', 'a1000001-0000-4000-8000-000000000133', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000134', NULL, 'Vega', 'Bellver Saiz', 'Vega Bellver Saiz', '2012-04-02', 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000134', 'a1000001-0000-4000-8000-000000000134', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000135', NULL, 'Carlota', 'Antón Rodríguez', 'Carlota Antón Rodríguez', '2012-11-06', 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000135', 'a1000001-0000-4000-8000-000000000135', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000136', NULL, 'Daniela', 'Rodríguez Gimeno', 'Daniela Rodríguez Gimeno', '2012-07-27', 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000136', 'a1000001-0000-4000-8000-000000000136', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000137', NULL, 'Vega', 'Valenciano Ponce', 'Vega Valenciano Ponce', '2012-09-11', 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000137', 'a1000001-0000-4000-8000-000000000137', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000138', NULL, 'Eva', 'Navarro Hervás', 'Eva Navarro Hervás', '2011-08-14', 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000138', 'a1000001-0000-4000-8000-000000000138', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000139', NULL, 'Noa', 'Domínguez Pala', 'Noa Domínguez Pala', '2012-08-16', 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000139', 'a1000001-0000-4000-8000-000000000139', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000140', NULL, 'Noa', 'Barcelón del', 'Noa Barcelón del', '2012-09-07', 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000140', 'a1000001-0000-4000-8000-000000000140', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000141', NULL, 'Lucía', 'Mengó Mingue', 'Lucía Mengó Mingue', '2012-07-23', 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000141', 'a1000001-0000-4000-8000-000000000141', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000142', NULL, 'Julia', 'Pardo Calvo', 'Julia Pardo Calvo', '2012-08-21', 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000142', 'a1000001-0000-4000-8000-000000000142', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000143', NULL, 'Francesca', 'Ballico', 'Francesca Ballico', '2012-08-30', 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000143', 'a1000001-0000-4000-8000-000000000143', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000144', NULL, 'Marisa', 'Sanz Pérez', 'Marisa Sanz Pérez', '2012-09-02', 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000144', 'a1000001-0000-4000-8000-000000000144', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000145', NULL, 'María Brenda', 'Santos Bazán', 'María Brenda Santos Bazán', '2011-06-25', 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000145', 'a1000001-0000-4000-8000-000000000145', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000146', NULL, 'Carla', 'Montero García', 'Carla Montero García', '2012-01-29', 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000146', 'a1000001-0000-4000-8000-000000000146', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000147', NULL, 'Daniela', 'Reig Sánchez', 'Daniela Reig Sánchez', '2011-05-05', 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000147', 'a1000001-0000-4000-8000-000000000147', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000148', NULL, 'Nerea', 'Ureña Romeo', 'Nerea Ureña Romeo', '2011-12-06', 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000148', 'a1000001-0000-4000-8000-000000000148', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000149', NULL, 'Ingrid Tatiana', 'Valdiviezo López', 'Ingrid Tatiana Valdiviezo López', '2012-12-13', 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000149', 'a1000001-0000-4000-8000-000000000149', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000150', NULL, 'Claudia', 'Melgoso Valero', 'Claudia Melgoso Valero', '2011-10-25', 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000150', 'a1000001-0000-4000-8000-000000000150', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000151', NULL, 'Lucía', 'Valiente', 'Lucía Valiente', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000151', 'a1000001-0000-4000-8000-000000000151', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000152', NULL, 'Lucía', 'Romero', 'Lucía Romero', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000152', 'a1000001-0000-4000-8000-000000000152', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000153', NULL, 'Jugador_1', 'Intranet Cadete Femenino', 'Jugador_1 Intranet Cadete Femenino', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Cadete Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000153', 'a1000001-0000-4000-8000-000000000153', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000154', NULL, 'Pablo', 'Domínguez Marqués', 'Pablo Domínguez Marqués', '2013-03-15', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000154', 'a1000001-0000-4000-8000-000000000154', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000155', NULL, 'Hugo', 'Zubeldia Tortajada', 'Hugo Zubeldia Tortajada', '2013-05-20', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000155', 'a1000001-0000-4000-8000-000000000155', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000156', NULL, 'Martín', 'Sanchis Rodríguez', 'Martín Sanchis Rodríguez', '2013-01-10', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000156', 'a1000001-0000-4000-8000-000000000156', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000157', NULL, 'Lucas', 'Rocati Mansilla', 'Lucas Rocati Mansilla', '2013-07-04', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000157', 'a1000001-0000-4000-8000-000000000157', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000158', NULL, 'José', 'Acosta Zaragoza', 'José Acosta Zaragoza', '2013-09-12', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000158', 'a1000001-0000-4000-8000-000000000158', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000159', NULL, 'Romeo', 'Tomás Verde', 'Romeo Tomás Verde', '2013-02-28', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000159', 'a1000001-0000-4000-8000-000000000159', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000160', NULL, 'Alejandro', 'Gómez Gómez', 'Alejandro Gómez Gómez', '2013-11-05', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000160', 'a1000001-0000-4000-8000-000000000160', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000161', NULL, 'Jorge', 'Monleón Gómez', 'Jorge Monleón Gómez', '2013-04-18', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000161', 'a1000001-0000-4000-8000-000000000161', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000162', NULL, 'David', 'Bolumar Morata', 'David Bolumar Morata', '2013-08-22', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000162', 'a1000001-0000-4000-8000-000000000162', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000163', NULL, 'Tymur', 'Zhyzhnevskyy', 'Tymur Zhyzhnevskyy', '2013-06-30', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000163', 'a1000001-0000-4000-8000-000000000163', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000164', NULL, 'Pedro', 'Clavería Añón', 'Pedro Clavería Añón', '2013-10-14', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000164', 'a1000001-0000-4000-8000-000000000164', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000165', NULL, 'Aaron', 'Herraiz Medina', 'Aaron Herraiz Medina', '2013-12-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000165', 'a1000001-0000-4000-8000-000000000165', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000166', NULL, 'Marco', 'García-Prieto Barja', 'Marco García-Prieto Barja', '2013-03-25', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000166', 'a1000001-0000-4000-8000-000000000166', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000167', NULL, 'Daniel', 'Serrano Grau', 'Daniel Serrano Grau', '2013-05-11', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000167', 'a1000001-0000-4000-8000-000000000167', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000168', NULL, 'Máximo', 'Vento Ricó', 'Máximo Vento Ricó', '2013-07-19', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000168', 'a1000001-0000-4000-8000-000000000168', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000169', NULL, 'Albert', 'García García', 'Albert García García', '2013-09-08', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000169', 'a1000001-0000-4000-8000-000000000169', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000170', NULL, 'Javier', 'Mariscal Centelles', 'Javier Mariscal Centelles', '2013-02-14', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000170', 'a1000001-0000-4000-8000-000000000170', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000171', NULL, 'Aitor', 'García Arnau', 'Aitor García Arnau', '2013-11-05', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000171', 'a1000001-0000-4000-8000-000000000171', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000172', NULL, 'Pablo', 'Ballester López', 'Pablo Ballester López', '2013-04-30', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000172', 'a1000001-0000-4000-8000-000000000172', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000173', NULL, 'Juan Pablo', 'Robertson Arteaga', 'Juan Pablo Robertson Arteaga', '2013-05-10', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000173', 'a1000001-0000-4000-8000-000000000173', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000174', NULL, 'Izan Rinescu', 'Rimescu Osma', 'Izan Rinescu Rimescu Osma', '2013-07-19', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000174', 'a1000001-0000-4000-8000-000000000174', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000175', NULL, 'Pablo', 'Flores Moreno', 'Pablo Flores Moreno', '2013-11-11', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000175', 'a1000001-0000-4000-8000-000000000175', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000176', NULL, 'Jorge', 'Martínez Sorlí', 'Jorge Martínez Sorlí', '2013-12-16', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000176', 'a1000001-0000-4000-8000-000000000176', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000177', NULL, 'Kai', 'Claramunt Rica', 'Kai Claramunt Rica', '2013-04-23', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000177', 'a1000001-0000-4000-8000-000000000177', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000178', NULL, 'José Fco. (Pepo)', 'Navarro Talavera', 'José Fco. (Pepo) Navarro Talavera', '2013-08-26', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000178', 'a1000001-0000-4000-8000-000000000178', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000179', NULL, 'Sergio', 'Ferrando Crespo', 'Sergio Ferrando Crespo', '2013-09-11', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000179', 'a1000001-0000-4000-8000-000000000179', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000180', NULL, 'Martín', 'Benito Castelló', 'Martín Benito Castelló', '2013-08-28', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000180', 'a1000001-0000-4000-8000-000000000180', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000181', NULL, 'Pablo', 'Sebastián Fernández', 'Pablo Sebastián Fernández', '2013-12-02', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000181', 'a1000001-0000-4000-8000-000000000181', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000182', NULL, 'Álvaro', 'Gil Pérez', 'Álvaro Gil Pérez', '2013-11-10', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000182', 'a1000001-0000-4000-8000-000000000182', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000183', NULL, 'David', 'Martínez Julve', 'David Martínez Julve', '2013-06-18', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000183', 'a1000001-0000-4000-8000-000000000183', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000184', NULL, 'Jordi', 'Castelló Pérez', 'Jordi Castelló Pérez', '2013-08-16', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000184', 'a1000001-0000-4000-8000-000000000184', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000185', NULL, 'Javier', 'Martínez Matías', 'Javier Martínez Matías', '2013-06-19', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000185', 'a1000001-0000-4000-8000-000000000185', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000186', NULL, 'Erik', 'Buendía Gómez', 'Erik Buendía Gómez', '2013-01-07', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000186', 'a1000001-0000-4000-8000-000000000186', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000187', NULL, 'Marcos', 'Barreiro Bueno', 'Marcos Barreiro Bueno', '2013-10-11', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000187', 'a1000001-0000-4000-8000-000000000187', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000188', NULL, 'Carlos', 'Medina Lezcano', 'Carlos Medina Lezcano', '2013-11-02', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000188', 'a1000001-0000-4000-8000-000000000188', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000189', NULL, 'Daniel', 'Furio Fernández', 'Daniel Furio Fernández', '2013-03-05', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000189', 'a1000001-0000-4000-8000-000000000189', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000190', NULL, 'Samuel', 'De Mariana Poves', 'Samuel De Mariana Poves', '2013-08-04', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000190', 'a1000001-0000-4000-8000-000000000190', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000191', NULL, 'Jaime', 'Martí López', 'Jaime Martí López', '2014-02-25', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000191', 'a1000001-0000-4000-8000-000000000191', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000192', NULL, 'Marc', 'Saiz Villalba', 'Marc Saiz Villalba', '2014-03-13', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000192', 'a1000001-0000-4000-8000-000000000192', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000193', NULL, 'Rubén', 'Sáez García', 'Rubén Sáez García', '2014-09-26', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000193', 'a1000001-0000-4000-8000-000000000193', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000194', NULL, 'Martín', 'Herrero Castiller', 'Martín Herrero Castiller', '2014-11-10', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000194', 'a1000001-0000-4000-8000-000000000194', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000195', NULL, 'Alan', 'Rodríguez La Cruz', 'Alan Rodríguez La Cruz', '2014-03-07', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000195', 'a1000001-0000-4000-8000-000000000195', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000196', NULL, 'Luis', 'Zafrilla Pérez', 'Luis Zafrilla Pérez', '2014-09-06', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000196', 'a1000001-0000-4000-8000-000000000196', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000197', NULL, 'Pablo', 'Rivera Gómez', 'Pablo Rivera Gómez', '2014-04-14', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000197', 'a1000001-0000-4000-8000-000000000197', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000198', NULL, 'Nacho', 'Laveda Aragonés', 'Nacho Laveda Aragonés', '2014-03-30', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000198', 'a1000001-0000-4000-8000-000000000198', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000199', NULL, 'Tomás', 'Melgoso Valero', 'Tomás Melgoso Valero', '2014-12-05', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000199', 'a1000001-0000-4000-8000-000000000199', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000200', NULL, 'Fernando', 'Almagro García', 'Fernando Almagro García', '2014-11-15', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000200', 'a1000001-0000-4000-8000-000000000200', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000201', NULL, 'Nacho', 'Pineda Saval', 'Nacho Pineda Saval', '2014-01-31', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000201', 'a1000001-0000-4000-8000-000000000201', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000202', NULL, 'Diego', 'Díez Rodríguez', 'Diego Díez Rodríguez', '2014-10-10', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000202', 'a1000001-0000-4000-8000-000000000202', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000203', NULL, 'Lucas', 'Vázquez Martínez', 'Lucas Vázquez Martínez', '2014-11-12', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000203', 'a1000001-0000-4000-8000-000000000203', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000204', NULL, 'Mustafo', 'Selima', 'Mustafo Selima', '2014-06-19', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000204', 'a1000001-0000-4000-8000-000000000204', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000205', NULL, 'Enzo', 'González López', 'Enzo González López', '2014-12-27', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000205', 'a1000001-0000-4000-8000-000000000205', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000206', NULL, 'Luca', 'Medvedev', 'Luca Medvedev', '2014-05-30', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000206', 'a1000001-0000-4000-8000-000000000206', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000207', NULL, 'Lucas', 'Alamar Colorado', 'Lucas Alamar Colorado', '2014-06-17', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000207', 'a1000001-0000-4000-8000-000000000207', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000208', NULL, 'Ciro', 'Condo Pugliese', 'Ciro Condo Pugliese', '2014-02-28', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000208', 'a1000001-0000-4000-8000-000000000208', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000209', NULL, 'Alejandro', 'Mengual Travé', 'Alejandro Mengual Travé', '2014-10-08', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000209', 'a1000001-0000-4000-8000-000000000209', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000210', NULL, 'Álvaro', 'De la Cruz Carrasco', 'Álvaro De la Cruz Carrasco', '2014-05-14', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000210', 'a1000001-0000-4000-8000-000000000210', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000211', NULL, 'Daniel', 'De Pablos Kronberg', 'Daniel De Pablos Kronberg', '2014-12-11', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000211', 'a1000001-0000-4000-8000-000000000211', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000212', NULL, 'Álvaro', 'Del Hoyo Simarro', 'Álvaro Del Hoyo Simarro', '2014-02-04', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000212', 'a1000001-0000-4000-8000-000000000212', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000213', NULL, 'Massimiliano', 'Gaglione Rojas', 'Massimiliano Gaglione Rojas', '2014-02-17', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000213', 'a1000001-0000-4000-8000-000000000213', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000214', NULL, 'Andreu', 'García Galdón', 'Andreu García Galdón', '2014-01-20', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000214', 'a1000001-0000-4000-8000-000000000214', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000215', NULL, 'Tomás', 'Grau Castillo', 'Tomás Grau Castillo', '2014-02-11', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000215', 'a1000001-0000-4000-8000-000000000215', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000216', NULL, 'Lucas', 'Gutiérrez Ruiz', 'Lucas Gutiérrez Ruiz', '2014-03-22', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000216', 'a1000001-0000-4000-8000-000000000216', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000217', NULL, 'Eric', 'López-Tarruella Ase', 'Eric López-Tarruella Ase', '2014-02-22', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000217', 'a1000001-0000-4000-8000-000000000217', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000218', NULL, 'Diego', 'Manzano Navaza', 'Diego Manzano Navaza', '2014-11-18', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000218', 'a1000001-0000-4000-8000-000000000218', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000219', NULL, 'Diego', 'Mateo Muñoz', 'Diego Mateo Muñoz', '2014-02-25', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000219', 'a1000001-0000-4000-8000-000000000219', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000220', NULL, 'Javier', 'Morote Galdón', 'Javier Morote Galdón', '2014-04-17', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000220', 'a1000001-0000-4000-8000-000000000220', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000221', NULL, 'Leonardo', 'Nassar Saad', 'Leonardo Nassar Saad', '2014-05-28', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000221', 'a1000001-0000-4000-8000-000000000221', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000222', NULL, 'Leo', 'Picó Feiten', 'Leo Picó Feiten', '2014-09-18', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000222', 'a1000001-0000-4000-8000-000000000222', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000223', NULL, 'Xavi', 'Ridaura Napoleón', 'Xavi Ridaura Napoleón', '2014-09-30', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000223', 'a1000001-0000-4000-8000-000000000223', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000224', NULL, 'Diego', 'Romero Cubells', 'Diego Romero Cubells', '2014-05-20', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000224', 'a1000001-0000-4000-8000-000000000224', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000225', NULL, 'Noel', 'Rosa Giménez', 'Noel Rosa Giménez', '2014-11-03', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000225', 'a1000001-0000-4000-8000-000000000225', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000226', NULL, 'Humberto Sebastián', 'Benítez Romero', 'Humberto Sebastián Benítez Romero', '2014-11-18', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000226', 'a1000001-0000-4000-8000-000000000226', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000227', NULL, 'Santiago', 'Muñoz Barrera', 'Santiago Muñoz Barrera', '2014-01-28', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000227', 'a1000001-0000-4000-8000-000000000227', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000228', NULL, 'Albert', 'Martínez Barceló', 'Albert Martínez Barceló', '2014-01-29', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000228', 'a1000001-0000-4000-8000-000000000228', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000229', NULL, 'Christian Alejandro', 'Meinhardt Lugo', 'Christian Alejandro Meinhardt Lugo', '2014-06-28', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000229', 'a1000001-0000-4000-8000-000000000229', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000230', NULL, 'Fran', 'Valiente Casado', 'Fran Valiente Casado', '2014-10-21', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000230', 'a1000001-0000-4000-8000-000000000230', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000231', NULL, 'Nicolás', 'Clemares Est', 'Nicolás Clemares Est', '2014-11-06', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000231', 'a1000001-0000-4000-8000-000000000231', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000232', NULL, 'Lucas', 'Vicente Rodrigo', 'Lucas Vicente Rodrigo', '2014-11-10', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000232', 'a1000001-0000-4000-8000-000000000232', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000233', NULL, 'Diego', 'Guillot Martínez', 'Diego Guillot Martínez', '2014-11-24', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000233', 'a1000001-0000-4000-8000-000000000233', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000234', NULL, 'Jacobo', 'Esteller Armas', 'Jacobo Esteller Armas', '2014-07-07', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000234', 'a1000001-0000-4000-8000-000000000234', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000235', NULL, 'Pedro David', 'Cámara Montoro', 'Pedro David Cámara Montoro', '2014-07-31', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000235', 'a1000001-0000-4000-8000-000000000235', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000236', NULL, 'Matías Jesús', 'Fernandes Marq', 'Matías Jesús Fernandes Marq', '2014-12-25', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000236', 'a1000001-0000-4000-8000-000000000236', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000237', NULL, 'Nicolás', 'Poquet Terán', 'Nicolás Poquet Terán', '2013-10-21', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000237', 'a1000001-0000-4000-8000-000000000237', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000238', NULL, 'Ángel', 'Torres Novoa', 'Ángel Torres Novoa', '2013-06-05', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000238', 'a1000001-0000-4000-8000-000000000238', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000239', NULL, 'Pablo', 'Vicente Rodrigo', 'Pablo Vicente Rodrigo', '2013-08-03', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000239', 'a1000001-0000-4000-8000-000000000239', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000240', NULL, 'Xavi', 'Colomer Manzan', 'Xavi Colomer Manzan', '2013-08-21', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000240', 'a1000001-0000-4000-8000-000000000240', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000241', NULL, 'Aarav', 'Bhartiya', 'Aarav Bhartiya', '2013-11-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000241', 'a1000001-0000-4000-8000-000000000241', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000242', NULL, 'Nicolás', 'Biot Baeza', 'Nicolás Biot Baeza', '2013-06-21', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000242', 'a1000001-0000-4000-8000-000000000242', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000243', NULL, 'Chibuikem Trevor', 'Nwadike Oraezu', 'Chibuikem Trevor Nwadike Oraezu', '2013-11-21', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000243', 'a1000001-0000-4000-8000-000000000243', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000244', NULL, 'Marc Alexander', 'Albuixech Lar', 'Marc Alexander Albuixech Lar', '2013-07-12', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000244', 'a1000001-0000-4000-8000-000000000244', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000245', NULL, 'Jacob', 'Zevallos Flores', 'Jacob Zevallos Flores', '2014-05-12', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000245', 'a1000001-0000-4000-8000-000000000245', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000246', NULL, 'Mateo', 'Jiménez Troyano', 'Mateo Jiménez Troyano', '2014-12-21', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000246', 'a1000001-0000-4000-8000-000000000246', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000247', NULL, 'Jugador_1', 'Intranet Infantil Femenino', 'Jugador_1 Intranet Infantil Femenino', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000247', 'a1000001-0000-4000-8000-000000000247', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000248', NULL, 'Jugador_2', 'Intranet Infantil Femenino', 'Jugador_2 Intranet Infantil Femenino', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000248', 'a1000001-0000-4000-8000-000000000248', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000249', NULL, 'Jugador_3', 'Intranet Infantil Femenino', 'Jugador_3 Intranet Infantil Femenino', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000249', 'a1000001-0000-4000-8000-000000000249', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000250', NULL, 'Jugador_4', 'Intranet Infantil Femenino', 'Jugador_4 Intranet Infantil Femenino', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000250', 'a1000001-0000-4000-8000-000000000250', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000251', NULL, 'Jugador_5', 'Intranet Infantil Femenino', 'Jugador_5 Intranet Infantil Femenino', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000251', 'a1000001-0000-4000-8000-000000000251', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000252', NULL, 'Jugador_6', 'Intranet Infantil Femenino', 'Jugador_6 Intranet Infantil Femenino', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000252', 'a1000001-0000-4000-8000-000000000252', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000253', NULL, 'Jugador_7', 'Intranet Infantil Femenino', 'Jugador_7 Intranet Infantil Femenino', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000253', 'a1000001-0000-4000-8000-000000000253', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000254', NULL, 'Jugador_8', 'Intranet Infantil Femenino', 'Jugador_8 Intranet Infantil Femenino', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000254', 'a1000001-0000-4000-8000-000000000254', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000255', NULL, 'Jugador_9', 'Intranet Infantil Femenino', 'Jugador_9 Intranet Infantil Femenino', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000255', 'a1000001-0000-4000-8000-000000000255', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000256', NULL, 'Jugador_10', 'Intranet Infantil Femenino', 'Jugador_10 Intranet Infantil Femenino', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000256', 'a1000001-0000-4000-8000-000000000256', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000257', NULL, 'Jugador_11', 'Intranet Infantil Femenino', 'Jugador_11 Intranet Infantil Femenino', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000257', 'a1000001-0000-4000-8000-000000000257', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000258', NULL, 'Jugador_12', 'Intranet Infantil Femenino', 'Jugador_12 Intranet Infantil Femenino', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000258', 'a1000001-0000-4000-8000-000000000258', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000259', NULL, 'Jugador_13', 'Intranet Infantil Femenino', 'Jugador_13 Intranet Infantil Femenino', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000259', 'a1000001-0000-4000-8000-000000000259', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000260', NULL, 'Jugador_14', 'Intranet Infantil Femenino', 'Jugador_14 Intranet Infantil Femenino', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000260', 'a1000001-0000-4000-8000-000000000260', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000261', NULL, 'Jugador_15', 'Intranet Infantil Femenino', 'Jugador_15 Intranet Infantil Femenino', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000261', 'a1000001-0000-4000-8000-000000000261', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000262', NULL, 'Jugador_16', 'Intranet Infantil Femenino', 'Jugador_16 Intranet Infantil Femenino', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Infantil Femenino', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000262', 'a1000001-0000-4000-8000-000000000262', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000263', NULL, 'Joel', 'Comes', 'Joel Comes', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000263', 'a1000001-0000-4000-8000-000000000263', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000264', NULL, 'Dani', 'García', 'Dani García', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000264', 'a1000001-0000-4000-8000-000000000264', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000265', NULL, 'Benas', 'Visniauskas', 'Benas Visniauskas', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000265', 'a1000001-0000-4000-8000-000000000265', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000266', NULL, 'Pablo', 'Sanchís', 'Pablo Sanchís', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000266', 'a1000001-0000-4000-8000-000000000266', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000267', NULL, 'Lucas', 'Gómez', 'Lucas Gómez', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000267', 'a1000001-0000-4000-8000-000000000267', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000268', NULL, 'Gabriel', 'Cerveró', 'Gabriel Cerveró', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000268', 'a1000001-0000-4000-8000-000000000268', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000269', NULL, 'Lucas', 'Palacín', 'Lucas Palacín', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000269', 'a1000001-0000-4000-8000-000000000269', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000270', NULL, 'Asier', 'Laín', 'Asier Laín', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000270', 'a1000001-0000-4000-8000-000000000270', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000271', NULL, 'Enzo', 'Tomás', 'Enzo Tomás', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000271', 'a1000001-0000-4000-8000-000000000271', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000272', NULL, 'Jorge', 'Albarracín', 'Jorge Albarracín', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000272', 'a1000001-0000-4000-8000-000000000272', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000273', NULL, 'Elías', 'Caballero', 'Elías Caballero', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000273', 'a1000001-0000-4000-8000-000000000273', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000274', NULL, 'Noah', 'Escolano', 'Noah Escolano', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000274', 'a1000001-0000-4000-8000-000000000274', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000275', NULL, 'Martín', 'Rodríguez', 'Martín Rodríguez', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000275', 'a1000001-0000-4000-8000-000000000275', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000276', NULL, 'Pablo', 'Arenas', 'Pablo Arenas', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000276', 'a1000001-0000-4000-8000-000000000276', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000277', NULL, 'Jesus', 'Romero', 'Jesus Romero', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000277', 'a1000001-0000-4000-8000-000000000277', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000278', NULL, 'Claudio', 'Suarez', 'Claudio Suarez', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000278', 'a1000001-0000-4000-8000-000000000278', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000279', NULL, 'Eric', 'Hortelano', 'Eric Hortelano', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000279', 'a1000001-0000-4000-8000-000000000279', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000280', NULL, 'Gonzalo', 'Gallego', 'Gonzalo Gallego', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000280', 'a1000001-0000-4000-8000-000000000280', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000281', NULL, 'Julen', 'Melia', 'Julen Melia', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000281', 'a1000001-0000-4000-8000-000000000281', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000282', NULL, 'Javier', 'Alfaro', 'Javier Alfaro', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000282', 'a1000001-0000-4000-8000-000000000282', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000283', NULL, 'Lucas', 'Carrascosa', 'Lucas Carrascosa', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000283', 'a1000001-0000-4000-8000-000000000283', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000284', NULL, 'Javier', 'Moreno', 'Javier Moreno', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000284', 'a1000001-0000-4000-8000-000000000284', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000285', NULL, 'Sergio', 'Garcia', 'Sergio Garcia', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000285', 'a1000001-0000-4000-8000-000000000285', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000286', NULL, 'Miquel', 'Serradilla', 'Miquel Serradilla', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000286', 'a1000001-0000-4000-8000-000000000286', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000287', NULL, 'Rodrigo', 'Revilla', 'Rodrigo Revilla', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000287', 'a1000001-0000-4000-8000-000000000287', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000288', NULL, 'Ignacio', 'Mariña', 'Ignacio Mariña', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000288', 'a1000001-0000-4000-8000-000000000288', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000289', NULL, 'Hugo', 'Ruiz', 'Hugo Ruiz', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000289', 'a1000001-0000-4000-8000-000000000289', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000290', NULL, 'Mohujadmadula', 'Ndiaye', 'Mohujadmadula Ndiaye', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000290', 'a1000001-0000-4000-8000-000000000290', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000291', NULL, 'Carlos', 'López', 'Carlos López', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000291', 'a1000001-0000-4000-8000-000000000291', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000292', NULL, 'Daniel', 'Jaime Torres', 'Daniel Jaime Torres', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000292', 'a1000001-0000-4000-8000-000000000292', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000293', NULL, 'Marc', 'Rochina', 'Marc Rochina', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000293', 'a1000001-0000-4000-8000-000000000293', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000294', NULL, 'Álvaro', 'Pascual', 'Álvaro Pascual', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000294', 'a1000001-0000-4000-8000-000000000294', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000295', NULL, 'Bruno', 'Pirola', 'Bruno Pirola', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000295', 'a1000001-0000-4000-8000-000000000295', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000296', NULL, 'Sebastián', 'Soler', 'Sebastián Soler', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000296', 'a1000001-0000-4000-8000-000000000296', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000297', NULL, 'Eduardo', 'Cervera', 'Eduardo Cervera', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000297', 'a1000001-0000-4000-8000-000000000297', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000298', NULL, 'Oliver', 'Comino', 'Oliver Comino', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000298', 'a1000001-0000-4000-8000-000000000298', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000299', NULL, 'Thiago', 'Primosich', 'Thiago Primosich', '2015-01-01', 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000299', 'a1000001-0000-4000-8000-000000000299', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000300', NULL, 'Alba', 'Ballesteros Mena', 'Alba Ballesteros Mena', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000300', 'a1000001-0000-4000-8000-000000000300', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000301', NULL, 'Jugador_2', 'Intranet Alevín D', 'Jugador_2 Intranet Alevín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000301', 'a1000001-0000-4000-8000-000000000301', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000302', NULL, 'Jugador_3', 'Intranet Alevín D', 'Jugador_3 Intranet Alevín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000302', 'a1000001-0000-4000-8000-000000000302', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000303', NULL, 'Jugador_4', 'Intranet Alevín D', 'Jugador_4 Intranet Alevín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000303', 'a1000001-0000-4000-8000-000000000303', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000304', NULL, 'Jugador_5', 'Intranet Alevín D', 'Jugador_5 Intranet Alevín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000304', 'a1000001-0000-4000-8000-000000000304', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000305', NULL, 'Jugador_6', 'Intranet Alevín D', 'Jugador_6 Intranet Alevín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000305', 'a1000001-0000-4000-8000-000000000305', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000306', NULL, 'Jugador_7', 'Intranet Alevín D', 'Jugador_7 Intranet Alevín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000306', 'a1000001-0000-4000-8000-000000000306', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000307', NULL, 'Jugador_8', 'Intranet Alevín D', 'Jugador_8 Intranet Alevín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000307', 'a1000001-0000-4000-8000-000000000307', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000308', NULL, 'Jugador_9', 'Intranet Alevín D', 'Jugador_9 Intranet Alevín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000308', 'a1000001-0000-4000-8000-000000000308', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000309', NULL, 'Jugador_10', 'Intranet Alevín D', 'Jugador_10 Intranet Alevín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000309', 'a1000001-0000-4000-8000-000000000309', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000310', NULL, 'Jugador_1', 'Intranet Alevín E', 'Jugador_1 Intranet Alevín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000310', 'a1000001-0000-4000-8000-000000000310', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000311', NULL, 'Jugador_2', 'Intranet Alevín E', 'Jugador_2 Intranet Alevín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000311', 'a1000001-0000-4000-8000-000000000311', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000312', NULL, 'Jugador_3', 'Intranet Alevín E', 'Jugador_3 Intranet Alevín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000312', 'a1000001-0000-4000-8000-000000000312', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000313', NULL, 'Jugador_4', 'Intranet Alevín E', 'Jugador_4 Intranet Alevín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000313', 'a1000001-0000-4000-8000-000000000313', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000314', NULL, 'Jugador_5', 'Intranet Alevín E', 'Jugador_5 Intranet Alevín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000314', 'a1000001-0000-4000-8000-000000000314', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000315', NULL, 'Jugador_6', 'Intranet Alevín E', 'Jugador_6 Intranet Alevín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000315', 'a1000001-0000-4000-8000-000000000315', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000316', NULL, 'Jugador_7', 'Intranet Alevín E', 'Jugador_7 Intranet Alevín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000316', 'a1000001-0000-4000-8000-000000000316', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000317', NULL, 'Jugador_8', 'Intranet Alevín E', 'Jugador_8 Intranet Alevín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000317', 'a1000001-0000-4000-8000-000000000317', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000318', NULL, 'Jugador_9', 'Intranet Alevín E', 'Jugador_9 Intranet Alevín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000318', 'a1000001-0000-4000-8000-000000000318', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000319', NULL, 'Jugador_10', 'Intranet Alevín E', 'Jugador_10 Intranet Alevín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000319', 'a1000001-0000-4000-8000-000000000319', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000320', NULL, 'Jugador_11', 'Intranet Alevín E', 'Jugador_11 Intranet Alevín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000320', 'a1000001-0000-4000-8000-000000000320', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000321', NULL, 'Jugador_1', 'Intranet Alevín F', 'Jugador_1 Intranet Alevín F', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín F', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000321', 'a1000001-0000-4000-8000-000000000321', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000322', NULL, 'Jugador_2', 'Intranet Alevín F', 'Jugador_2 Intranet Alevín F', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín F', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000322', 'a1000001-0000-4000-8000-000000000322', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000323', NULL, 'Jugador_3', 'Intranet Alevín F', 'Jugador_3 Intranet Alevín F', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín F', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000323', 'a1000001-0000-4000-8000-000000000323', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000324', NULL, 'Jugador_4', 'Intranet Alevín F', 'Jugador_4 Intranet Alevín F', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín F', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000324', 'a1000001-0000-4000-8000-000000000324', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000325', NULL, 'Jugador_5', 'Intranet Alevín F', 'Jugador_5 Intranet Alevín F', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín F', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000325', 'a1000001-0000-4000-8000-000000000325', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000326', NULL, 'Jugador_6', 'Intranet Alevín F', 'Jugador_6 Intranet Alevín F', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín F', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000326', 'a1000001-0000-4000-8000-000000000326', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000327', NULL, 'Jugador_7', 'Intranet Alevín F', 'Jugador_7 Intranet Alevín F', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín F', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000327', 'a1000001-0000-4000-8000-000000000327', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000328', NULL, 'Jugador_8', 'Intranet Alevín F', 'Jugador_8 Intranet Alevín F', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín F', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000328', 'a1000001-0000-4000-8000-000000000328', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000329', NULL, 'Jugador_9', 'Intranet Alevín F', 'Jugador_9 Intranet Alevín F', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín F', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000329', 'a1000001-0000-4000-8000-000000000329', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000330', NULL, 'Jugador_10', 'Intranet Alevín F', 'Jugador_10 Intranet Alevín F', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín F', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000330', 'a1000001-0000-4000-8000-000000000330', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000331', NULL, 'Jugador_11', 'Intranet Alevín F', 'Jugador_11 Intranet Alevín F', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín F', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000331', 'a1000001-0000-4000-8000-000000000331', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000332', NULL, 'Jugador_12', 'Intranet Alevín F', 'Jugador_12 Intranet Alevín F', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín F', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000332', 'a1000001-0000-4000-8000-000000000332', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000333', NULL, 'Jugador_13', 'Intranet Alevín F', 'Jugador_13 Intranet Alevín F', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín F', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000333', 'a1000001-0000-4000-8000-000000000333', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000334', NULL, 'Jugador_14', 'Intranet Alevín F', 'Jugador_14 Intranet Alevín F', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín F', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000334', 'a1000001-0000-4000-8000-000000000334', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000335', NULL, 'Jugador_15', 'Intranet Alevín F', 'Jugador_15 Intranet Alevín F', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín F', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000335', 'a1000001-0000-4000-8000-000000000335', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000336', NULL, 'María', 'Miralles Soler', 'María Miralles Soler', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín G', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000336', 'a1000001-0000-4000-8000-000000000336', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000337', NULL, 'Jugador_2', 'Intranet Alevín G', 'Jugador_2 Intranet Alevín G', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín G', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000337', 'a1000001-0000-4000-8000-000000000337', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000338', NULL, 'Jugador_3', 'Intranet Alevín G', 'Jugador_3 Intranet Alevín G', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín G', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000338', 'a1000001-0000-4000-8000-000000000338', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000339', NULL, 'Jugador_4', 'Intranet Alevín G', 'Jugador_4 Intranet Alevín G', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín G', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000339', 'a1000001-0000-4000-8000-000000000339', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000340', NULL, 'Jugador_5', 'Intranet Alevín G', 'Jugador_5 Intranet Alevín G', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín G', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000340', 'a1000001-0000-4000-8000-000000000340', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000341', NULL, 'Jugador_6', 'Intranet Alevín G', 'Jugador_6 Intranet Alevín G', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín G', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000341', 'a1000001-0000-4000-8000-000000000341', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000342', NULL, 'Jugador_7', 'Intranet Alevín G', 'Jugador_7 Intranet Alevín G', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín G', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000342', 'a1000001-0000-4000-8000-000000000342', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000343', NULL, 'Jugador_8', 'Intranet Alevín G', 'Jugador_8 Intranet Alevín G', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín G', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000343', 'a1000001-0000-4000-8000-000000000343', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000344', NULL, 'Jugador_9', 'Intranet Alevín G', 'Jugador_9 Intranet Alevín G', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín G', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000344', 'a1000001-0000-4000-8000-000000000344', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000345', NULL, 'Jugador_10', 'Intranet Alevín G', 'Jugador_10 Intranet Alevín G', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín G', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000345', 'a1000001-0000-4000-8000-000000000345', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000346', NULL, 'Jugador_11', 'Intranet Alevín G', 'Jugador_11 Intranet Alevín G', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín G', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000346', 'a1000001-0000-4000-8000-000000000346', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000347', NULL, 'Jugador_12', 'Intranet Alevín G', 'Jugador_12 Intranet Alevín G', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín G', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000347', 'a1000001-0000-4000-8000-000000000347', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000348', NULL, 'Jugador_13', 'Intranet Alevín G', 'Jugador_13 Intranet Alevín G', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín G', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000348', 'a1000001-0000-4000-8000-000000000348', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000349', NULL, 'Jugador_1', 'Intranet Alevín H', 'Jugador_1 Intranet Alevín H', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín H', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000349', 'a1000001-0000-4000-8000-000000000349', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000350', NULL, 'Jugador_2', 'Intranet Alevín H', 'Jugador_2 Intranet Alevín H', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín H', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000350', 'a1000001-0000-4000-8000-000000000350', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000351', NULL, 'Jugador_3', 'Intranet Alevín H', 'Jugador_3 Intranet Alevín H', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín H', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000351', 'a1000001-0000-4000-8000-000000000351', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000352', NULL, 'Jugador_4', 'Intranet Alevín H', 'Jugador_4 Intranet Alevín H', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín H', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000352', 'a1000001-0000-4000-8000-000000000352', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000353', NULL, 'Jugador_5', 'Intranet Alevín H', 'Jugador_5 Intranet Alevín H', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín H', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000353', 'a1000001-0000-4000-8000-000000000353', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000354', NULL, 'Jugador_6', 'Intranet Alevín H', 'Jugador_6 Intranet Alevín H', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín H', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000354', 'a1000001-0000-4000-8000-000000000354', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000355', NULL, 'Jugador_7', 'Intranet Alevín H', 'Jugador_7 Intranet Alevín H', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín H', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000355', 'a1000001-0000-4000-8000-000000000355', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000356', NULL, 'Jugador_8', 'Intranet Alevín H', 'Jugador_8 Intranet Alevín H', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín H', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000356', 'a1000001-0000-4000-8000-000000000356', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000357', NULL, 'Jugador_9', 'Intranet Alevín H', 'Jugador_9 Intranet Alevín H', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín H', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000357', 'a1000001-0000-4000-8000-000000000357', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000358', NULL, 'Jugador_10', 'Intranet Alevín H', 'Jugador_10 Intranet Alevín H', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín H', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000358', 'a1000001-0000-4000-8000-000000000358', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000359', NULL, 'Jugador_11', 'Intranet Alevín H', 'Jugador_11 Intranet Alevín H', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín H', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000359', 'a1000001-0000-4000-8000-000000000359', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000360', NULL, 'Jugador_12', 'Intranet Alevín H', 'Jugador_12 Intranet Alevín H', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín H', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000360', 'a1000001-0000-4000-8000-000000000360', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000361', NULL, 'Jugador_13', 'Intranet Alevín H', 'Jugador_13 Intranet Alevín H', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín H', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000361', 'a1000001-0000-4000-8000-000000000361', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000362', NULL, 'Jugador_14', 'Intranet Alevín H', 'Jugador_14 Intranet Alevín H', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Alevín H', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000362', 'a1000001-0000-4000-8000-000000000362', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000363', NULL, 'Jugador_1', 'Intranet Benjamín A', 'Jugador_1 Intranet Benjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000363', 'a1000001-0000-4000-8000-000000000363', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000364', NULL, 'Jugador_2', 'Intranet Benjamín A', 'Jugador_2 Intranet Benjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000364', 'a1000001-0000-4000-8000-000000000364', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000365', NULL, 'Jugador_3', 'Intranet Benjamín A', 'Jugador_3 Intranet Benjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000365', 'a1000001-0000-4000-8000-000000000365', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000366', NULL, 'Jugador_4', 'Intranet Benjamín A', 'Jugador_4 Intranet Benjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000366', 'a1000001-0000-4000-8000-000000000366', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000367', NULL, 'Jugador_5', 'Intranet Benjamín A', 'Jugador_5 Intranet Benjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000367', 'a1000001-0000-4000-8000-000000000367', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000368', NULL, 'Jugador_6', 'Intranet Benjamín A', 'Jugador_6 Intranet Benjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000368', 'a1000001-0000-4000-8000-000000000368', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000369', NULL, 'Jugador_7', 'Intranet Benjamín A', 'Jugador_7 Intranet Benjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000369', 'a1000001-0000-4000-8000-000000000369', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000370', NULL, 'Jugador_8', 'Intranet Benjamín A', 'Jugador_8 Intranet Benjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000370', 'a1000001-0000-4000-8000-000000000370', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000371', NULL, 'Jugador_9', 'Intranet Benjamín A', 'Jugador_9 Intranet Benjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000371', 'a1000001-0000-4000-8000-000000000371', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000372', NULL, 'Jugador_10', 'Intranet Benjamín A', 'Jugador_10 Intranet Benjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000372', 'a1000001-0000-4000-8000-000000000372', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000373', NULL, 'Jugador_11', 'Intranet Benjamín A', 'Jugador_11 Intranet Benjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000373', 'a1000001-0000-4000-8000-000000000373', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000374', NULL, 'Jugador_12', 'Intranet Benjamín A', 'Jugador_12 Intranet Benjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000374', 'a1000001-0000-4000-8000-000000000374', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000375', NULL, 'Jugador_13', 'Intranet Benjamín A', 'Jugador_13 Intranet Benjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000375', 'a1000001-0000-4000-8000-000000000375', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000376', NULL, 'Alejandra', 'Cañete Mateu', 'Alejandra Cañete Mateu', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000376', 'a1000001-0000-4000-8000-000000000376', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000377', NULL, 'Luciana', 'Diez Pinto', 'Luciana Diez Pinto', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000377', 'a1000001-0000-4000-8000-000000000377', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000378', NULL, 'María', 'Moreno Ferri', 'María Moreno Ferri', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000378', 'a1000001-0000-4000-8000-000000000378', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000379', NULL, 'Jugador_4', 'Intranet Benjamín B', 'Jugador_4 Intranet Benjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000379', 'a1000001-0000-4000-8000-000000000379', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000380', NULL, 'Jugador_5', 'Intranet Benjamín B', 'Jugador_5 Intranet Benjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000380', 'a1000001-0000-4000-8000-000000000380', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000381', NULL, 'Jugador_6', 'Intranet Benjamín B', 'Jugador_6 Intranet Benjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000381', 'a1000001-0000-4000-8000-000000000381', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000382', NULL, 'Jugador_7', 'Intranet Benjamín B', 'Jugador_7 Intranet Benjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000382', 'a1000001-0000-4000-8000-000000000382', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000383', NULL, 'Jugador_8', 'Intranet Benjamín B', 'Jugador_8 Intranet Benjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000383', 'a1000001-0000-4000-8000-000000000383', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000384', NULL, 'Jugador_9', 'Intranet Benjamín B', 'Jugador_9 Intranet Benjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000384', 'a1000001-0000-4000-8000-000000000384', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000385', NULL, 'Jugador_10', 'Intranet Benjamín B', 'Jugador_10 Intranet Benjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000385', 'a1000001-0000-4000-8000-000000000385', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000386', NULL, 'Jugador_11', 'Intranet Benjamín B', 'Jugador_11 Intranet Benjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000386', 'a1000001-0000-4000-8000-000000000386', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000387', NULL, 'Jugador_12', 'Intranet Benjamín B', 'Jugador_12 Intranet Benjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000387', 'a1000001-0000-4000-8000-000000000387', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000388', NULL, 'Jugador_13', 'Intranet Benjamín B', 'Jugador_13 Intranet Benjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000388', 'a1000001-0000-4000-8000-000000000388', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000389', NULL, 'Jugador_14', 'Intranet Benjamín B', 'Jugador_14 Intranet Benjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000389', 'a1000001-0000-4000-8000-000000000389', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000390', NULL, 'Jugador_1', 'Intranet Benjamín C', 'Jugador_1 Intranet Benjamín C', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000390', 'a1000001-0000-4000-8000-000000000390', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000391', NULL, 'Jugador_2', 'Intranet Benjamín C', 'Jugador_2 Intranet Benjamín C', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000391', 'a1000001-0000-4000-8000-000000000391', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000392', NULL, 'Jugador_3', 'Intranet Benjamín C', 'Jugador_3 Intranet Benjamín C', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000392', 'a1000001-0000-4000-8000-000000000392', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000393', NULL, 'Jugador_4', 'Intranet Benjamín C', 'Jugador_4 Intranet Benjamín C', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000393', 'a1000001-0000-4000-8000-000000000393', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000394', NULL, 'Jugador_5', 'Intranet Benjamín C', 'Jugador_5 Intranet Benjamín C', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000394', 'a1000001-0000-4000-8000-000000000394', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000395', NULL, 'Jugador_6', 'Intranet Benjamín C', 'Jugador_6 Intranet Benjamín C', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000395', 'a1000001-0000-4000-8000-000000000395', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000396', NULL, 'Jugador_7', 'Intranet Benjamín C', 'Jugador_7 Intranet Benjamín C', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000396', 'a1000001-0000-4000-8000-000000000396', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000397', NULL, 'Jugador_8', 'Intranet Benjamín C', 'Jugador_8 Intranet Benjamín C', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000397', 'a1000001-0000-4000-8000-000000000397', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000398', NULL, 'Jugador_9', 'Intranet Benjamín C', 'Jugador_9 Intranet Benjamín C', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000398', 'a1000001-0000-4000-8000-000000000398', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000399', NULL, 'Jugador_10', 'Intranet Benjamín C', 'Jugador_10 Intranet Benjamín C', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000399', 'a1000001-0000-4000-8000-000000000399', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000400', NULL, 'Jugador_1', 'Intranet Benjamín D', 'Jugador_1 Intranet Benjamín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000400', 'a1000001-0000-4000-8000-000000000400', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000401', NULL, 'Jugador_2', 'Intranet Benjamín D', 'Jugador_2 Intranet Benjamín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000401', 'a1000001-0000-4000-8000-000000000401', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000402', NULL, 'Jugador_3', 'Intranet Benjamín D', 'Jugador_3 Intranet Benjamín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000402', 'a1000001-0000-4000-8000-000000000402', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000403', NULL, 'Jugador_4', 'Intranet Benjamín D', 'Jugador_4 Intranet Benjamín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000403', 'a1000001-0000-4000-8000-000000000403', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000404', NULL, 'Jugador_5', 'Intranet Benjamín D', 'Jugador_5 Intranet Benjamín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000404', 'a1000001-0000-4000-8000-000000000404', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000405', NULL, 'Jugador_6', 'Intranet Benjamín D', 'Jugador_6 Intranet Benjamín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000405', 'a1000001-0000-4000-8000-000000000405', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000406', NULL, 'Jugador_7', 'Intranet Benjamín D', 'Jugador_7 Intranet Benjamín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000406', 'a1000001-0000-4000-8000-000000000406', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000407', NULL, 'Jugador_8', 'Intranet Benjamín D', 'Jugador_8 Intranet Benjamín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000407', 'a1000001-0000-4000-8000-000000000407', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000408', NULL, 'Jugador_9', 'Intranet Benjamín D', 'Jugador_9 Intranet Benjamín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000408', 'a1000001-0000-4000-8000-000000000408', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000409', NULL, 'Jugador_10', 'Intranet Benjamín D', 'Jugador_10 Intranet Benjamín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000409', 'a1000001-0000-4000-8000-000000000409', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000410', NULL, 'Jugador_11', 'Intranet Benjamín D', 'Jugador_11 Intranet Benjamín D', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín D', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000410', 'a1000001-0000-4000-8000-000000000410', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000411', NULL, 'Laia', 'Sellés Sánchez', 'Laia Sellés Sánchez', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000411', 'a1000001-0000-4000-8000-000000000411', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000412', NULL, 'Jugador_2', 'Intranet Benjamín E', 'Jugador_2 Intranet Benjamín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000412', 'a1000001-0000-4000-8000-000000000412', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000413', NULL, 'Jugador_3', 'Intranet Benjamín E', 'Jugador_3 Intranet Benjamín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000413', 'a1000001-0000-4000-8000-000000000413', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000414', NULL, 'Jugador_4', 'Intranet Benjamín E', 'Jugador_4 Intranet Benjamín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000414', 'a1000001-0000-4000-8000-000000000414', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000415', NULL, 'Jugador_5', 'Intranet Benjamín E', 'Jugador_5 Intranet Benjamín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000415', 'a1000001-0000-4000-8000-000000000415', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000416', NULL, 'Jugador_6', 'Intranet Benjamín E', 'Jugador_6 Intranet Benjamín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000416', 'a1000001-0000-4000-8000-000000000416', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000417', NULL, 'Jugador_7', 'Intranet Benjamín E', 'Jugador_7 Intranet Benjamín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000417', 'a1000001-0000-4000-8000-000000000417', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000418', NULL, 'Jugador_8', 'Intranet Benjamín E', 'Jugador_8 Intranet Benjamín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000418', 'a1000001-0000-4000-8000-000000000418', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000419', NULL, 'Jugador_9', 'Intranet Benjamín E', 'Jugador_9 Intranet Benjamín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000419', 'a1000001-0000-4000-8000-000000000419', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000420', NULL, 'Jugador_10', 'Intranet Benjamín E', 'Jugador_10 Intranet Benjamín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000420', 'a1000001-0000-4000-8000-000000000420', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000421', NULL, 'Jugador_11', 'Intranet Benjamín E', 'Jugador_11 Intranet Benjamín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000421', 'a1000001-0000-4000-8000-000000000421', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000422', NULL, 'Jugador_12', 'Intranet Benjamín E', 'Jugador_12 Intranet Benjamín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000422', 'a1000001-0000-4000-8000-000000000422', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000423', NULL, 'Jugador_13', 'Intranet Benjamín E', 'Jugador_13 Intranet Benjamín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000423', 'a1000001-0000-4000-8000-000000000423', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000424', NULL, 'Jugador_14', 'Intranet Benjamín E', 'Jugador_14 Intranet Benjamín E', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Benjamín E', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000424', 'a1000001-0000-4000-8000-000000000424', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000425', NULL, 'Jugador_1', 'Intranet Prebenjamín A', 'Jugador_1 Intranet Prebenjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000425', 'a1000001-0000-4000-8000-000000000425', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000028'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000426', NULL, 'Jugador_2', 'Intranet Prebenjamín A', 'Jugador_2 Intranet Prebenjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000426', 'a1000001-0000-4000-8000-000000000426', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000028'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000427', NULL, 'Jugador_3', 'Intranet Prebenjamín A', 'Jugador_3 Intranet Prebenjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000427', 'a1000001-0000-4000-8000-000000000427', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000028'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000428', NULL, 'Jugador_4', 'Intranet Prebenjamín A', 'Jugador_4 Intranet Prebenjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000428', 'a1000001-0000-4000-8000-000000000428', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000028'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000429', NULL, 'Jugador_5', 'Intranet Prebenjamín A', 'Jugador_5 Intranet Prebenjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000429', 'a1000001-0000-4000-8000-000000000429', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000028'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000430', NULL, 'Jugador_6', 'Intranet Prebenjamín A', 'Jugador_6 Intranet Prebenjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000430', 'a1000001-0000-4000-8000-000000000430', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000028'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000431', NULL, 'Jugador_7', 'Intranet Prebenjamín A', 'Jugador_7 Intranet Prebenjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000431', 'a1000001-0000-4000-8000-000000000431', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000028'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000432', NULL, 'Jugador_8', 'Intranet Prebenjamín A', 'Jugador_8 Intranet Prebenjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000432', 'a1000001-0000-4000-8000-000000000432', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000028'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000433', NULL, 'Jugador_9', 'Intranet Prebenjamín A', 'Jugador_9 Intranet Prebenjamín A', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín A', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000433', 'a1000001-0000-4000-8000-000000000433', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000028'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000434', NULL, 'Jugador_1', 'Intranet Prebenjamín B', 'Jugador_1 Intranet Prebenjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000434', 'a1000001-0000-4000-8000-000000000434', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000435', NULL, 'Jugador_2', 'Intranet Prebenjamín B', 'Jugador_2 Intranet Prebenjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000435', 'a1000001-0000-4000-8000-000000000435', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000436', NULL, 'Jugador_3', 'Intranet Prebenjamín B', 'Jugador_3 Intranet Prebenjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000436', 'a1000001-0000-4000-8000-000000000436', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000437', NULL, 'Jugador_4', 'Intranet Prebenjamín B', 'Jugador_4 Intranet Prebenjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000437', 'a1000001-0000-4000-8000-000000000437', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000438', NULL, 'Jugador_5', 'Intranet Prebenjamín B', 'Jugador_5 Intranet Prebenjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000438', 'a1000001-0000-4000-8000-000000000438', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000439', NULL, 'Jugador_6', 'Intranet Prebenjamín B', 'Jugador_6 Intranet Prebenjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000439', 'a1000001-0000-4000-8000-000000000439', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000440', NULL, 'Jugador_7', 'Intranet Prebenjamín B', 'Jugador_7 Intranet Prebenjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000440', 'a1000001-0000-4000-8000-000000000440', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000441', NULL, 'Jugador_8', 'Intranet Prebenjamín B', 'Jugador_8 Intranet Prebenjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000441', 'a1000001-0000-4000-8000-000000000441', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000442', NULL, 'Jugador_9', 'Intranet Prebenjamín B', 'Jugador_9 Intranet Prebenjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000442', 'a1000001-0000-4000-8000-000000000442', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000443', NULL, 'Jugador_10', 'Intranet Prebenjamín B', 'Jugador_10 Intranet Prebenjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000443', 'a1000001-0000-4000-8000-000000000443', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000444', NULL, 'Jugador_11', 'Intranet Prebenjamín B', 'Jugador_11 Intranet Prebenjamín B', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín B', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000444', 'a1000001-0000-4000-8000-000000000444', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000445', NULL, 'Paula', 'Tomás Rovira', 'Paula Tomás Rovira', NULL, 'FEMALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000445', 'a1000001-0000-4000-8000-000000000445', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000030'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000446', NULL, 'Jugador_2', 'Intranet Prebenjamín C', 'Jugador_2 Intranet Prebenjamín C', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000446', 'a1000001-0000-4000-8000-000000000446', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000030'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000447', NULL, 'Jugador_3', 'Intranet Prebenjamín C', 'Jugador_3 Intranet Prebenjamín C', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000447', 'a1000001-0000-4000-8000-000000000447', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000030'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000448', NULL, 'Jugador_4', 'Intranet Prebenjamín C', 'Jugador_4 Intranet Prebenjamín C', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000448', 'a1000001-0000-4000-8000-000000000448', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000030'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000449', NULL, 'Jugador_5', 'Intranet Prebenjamín C', 'Jugador_5 Intranet Prebenjamín C', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000449', 'a1000001-0000-4000-8000-000000000449', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000030'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000450', NULL, 'Jugador_6', 'Intranet Prebenjamín C', 'Jugador_6 Intranet Prebenjamín C', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000450', 'a1000001-0000-4000-8000-000000000450', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000030'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000451', NULL, 'Jugador_7', 'Intranet Prebenjamín C', 'Jugador_7 Intranet Prebenjamín C', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000451', 'a1000001-0000-4000-8000-000000000451', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000030'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000452', NULL, 'Jugador_8', 'Intranet Prebenjamín C', 'Jugador_8 Intranet Prebenjamín C', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Prebenjamín C', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000452', 'a1000001-0000-4000-8000-000000000452', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000030'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000453', NULL, 'Jugador_1', 'Intranet Querubines', 'Jugador_1 Intranet Querubines', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Querubines', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000453', 'a1000001-0000-4000-8000-000000000453', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000031'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000454', NULL, 'Jugador_2', 'Intranet Querubines', 'Jugador_2 Intranet Querubines', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Querubines', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000454', 'a1000001-0000-4000-8000-000000000454', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000031'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000455', NULL, 'Jugador_3', 'Intranet Querubines', 'Jugador_3 Intranet Querubines', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Querubines', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000455', 'a1000001-0000-4000-8000-000000000455', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000031'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

INSERT INTO public.jugadores (
  id, federation_player_id, first_name, last_name, display_name, birth_date, gender, federation_status, source, source_reference, status
) VALUES (
  'a1000001-0000-4000-8000-000000000456', NULL, 'Jugador_4', 'Intranet Querubines', 'Jugador_4 Intranet Querubines', NULL, 'MALE', 'PENDING_DOCUMENTATION', 'FFCV_INTRANET', 'Intranet FFCV 2026/2027 - Querubines', 'PENDING_VERIFICATION'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  federation_status = EXCLUDED.federation_status;
INSERT INTO public.jugador_equipos (
  id, player_id, team_id, season, assignment_type, registration_status, is_primary_team, is_active
) VALUES (
  'a2000001-0000-4000-8000-000000000456', 'a1000001-0000-4000-8000-000000000456', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000031'), '2026/2027', 'FEDERATIVE', 'PENDING', TRUE, TRUE
) ON CONFLICT (player_id, team_id, season, assignment_type) DO UPDATE SET
  is_active = EXCLUDED.is_active;

COMMIT;