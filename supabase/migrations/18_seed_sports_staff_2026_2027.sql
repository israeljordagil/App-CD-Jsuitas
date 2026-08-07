-- =========================================================================
-- MIGRACIÓN 18: SEED CANÓNICO DE PERSONAL DEPORTIVO Y ASIGNACIONES (2026/2027)
-- Temporada 2026/2027 — CD Jesuitas
-- =========================================================================

BEGIN;

INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000001', 'Carlos', 'Díaz', 'Carlos Díaz', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000002', 'Daniel', 'Escobar', 'Daniel Escobar', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000003', 'Nicolás', 'Guillem', 'Nicolás Guillem', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000004', 'Vicente', 'Alcaide', 'Vicente Alcaide', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000005', 'Miguel', 'Civera', 'Miguel Civera', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000006', 'Pedro', 'Rado', 'Pedro Rado', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000007', 'Rubén', 'Balaguer', 'Rubén Balaguer', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000008', 'Daniel', 'Sobero', 'Daniel Sobero', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000009', 'Daniel', 'Roig', 'Daniel Roig', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000010', 'David', 'Soler', 'David Soler', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000011', 'Antonio', 'Cogollos', 'Antonio Cogollos', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000012', 'Sancho', 'Rochina', 'Sancho Rochina', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000013', 'Lucas', 'Longo', 'Lucas Longo', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000014', 'Martina', 'Heras', 'Martina Heras', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000015', 'Max', 'Soler', 'Max Soler', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000016', 'Raúl', 'García', 'Raúl García', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000017', 'Raúl', 'Fuentes', 'Raúl Fuentes', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000018', 'Rubén', 'Boluda', 'Rubén Boluda', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000019', 'David', 'Cogollos', 'David Cogollos', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000020', 'Sergio', 'Aceituno', 'Sergio Aceituno', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000021', 'Daniel', 'Salinas', 'Daniel Salinas', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000022', 'José', 'Montero', 'José Montero', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000023', 'Miguel', 'Mocholí', 'Miguel Mocholí', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000024', 'Víctor', 'Palacín', 'Víctor Palacín', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000025', 'Pablo', 'Alhambra', 'Pablo Alhambra', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000026', 'Iván', 'Esteva', 'Iván Esteva', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000027', 'Guillem', 'Cardona', 'Guillem Cardona', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000028', 'Marcos', 'García', 'Marcos García', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000029', 'Miguel', 'Nieto', 'Miguel Nieto', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000030', 'Israel', 'Jordá', 'Israel Jordá', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000031', 'Álvaro', 'Sancho', 'Álvaro Sancho', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000032', 'Ismael', 'Fontelles', 'Ismael Fontelles', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000033', 'José', 'Miguel', 'José Miguel', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000034', 'Lucas', 'Martínez', 'Lucas Martínez', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000035', 'Lucas', 'Sánchez', 'Lucas Sánchez', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000036', 'Alejandro', 'Sanchís', 'Alejandro Sanchís', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000037', 'Carlos', 'Navarro', 'Carlos Navarro', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000038', 'Lucas', 'Mora', 'Lucas Mora', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000039', 'Marcos', 'Monleón', 'Marcos Monleón', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000040', 'Marcos', 'Olmo', 'Marcos Olmo', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000041', 'Álvaro', 'Cervera', 'Álvaro Cervera', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000042', 'Luis', 'Núñez', 'Luis Núñez', 'COACH', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000043', 'Alejandro', 'Abellanes Jiménez', 'Alejandro Abellanes Jiménez', 'PHYSICAL_TRAINER', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;
INSERT INTO public.personal_deportivo (
  id, first_name, last_name, display_name, person_type, status
) VALUES (
  'd1000001-0000-4000-8000-000000000044', 'Jorge', 'Martínez', 'Jorge Martínez', 'PHYSIOTHERAPIST', 'ACTIVE'
) ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  person_type = EXCLUDED.person_type;

-- ASIGNACIONES DE PERSONAL DEPORTIVO A EQUIPOS (2026/2027)

INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000001', 'd1000001-0000-4000-8000-000000000001', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000002', 'd1000001-0000-4000-8000-000000000002', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000003', 'd1000001-0000-4000-8000-000000000003', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000004', 'd1000001-0000-4000-8000-000000000004', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000005', 'd1000001-0000-4000-8000-000000000005', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000006', 'd1000001-0000-4000-8000-000000000006', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000007', 'd1000001-0000-4000-8000-000000000007', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000008', 'd1000001-0000-4000-8000-000000000008', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000009', 'd1000001-0000-4000-8000-000000000003', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000010', 'd1000001-0000-4000-8000-000000000009', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000011', 'd1000001-0000-4000-8000-000000000010', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000012', 'd1000001-0000-4000-8000-000000000011', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000013', 'd1000001-0000-4000-8000-000000000012', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000014', 'd1000001-0000-4000-8000-000000000013', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000015', 'd1000001-0000-4000-8000-000000000014', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000016', 'd1000001-0000-4000-8000-000000000015', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000017', 'd1000001-0000-4000-8000-000000000016', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000018', 'd1000001-0000-4000-8000-000000000017', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000019', 'd1000001-0000-4000-8000-000000000006', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000020', 'd1000001-0000-4000-8000-000000000018', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000021', 'd1000001-0000-4000-8000-000000000009', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000022', 'd1000001-0000-4000-8000-000000000019', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000023', 'd1000001-0000-4000-8000-000000000020', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000024', 'd1000001-0000-4000-8000-000000000021', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000025', 'd1000001-0000-4000-8000-000000000007', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000026', 'd1000001-0000-4000-8000-000000000013', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000027', 'd1000001-0000-4000-8000-000000000022', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000028', 'd1000001-0000-4000-8000-000000000023', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000029', 'd1000001-0000-4000-8000-000000000024', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000030', 'd1000001-0000-4000-8000-000000000025', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000031', 'd1000001-0000-4000-8000-000000000026', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000032', 'd1000001-0000-4000-8000-000000000008', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000033', 'd1000001-0000-4000-8000-000000000022', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000034', 'd1000001-0000-4000-8000-000000000027', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000035', 'd1000001-0000-4000-8000-000000000028', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000036', 'd1000001-0000-4000-8000-000000000029', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000037', 'd1000001-0000-4000-8000-000000000017', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000038', 'd1000001-0000-4000-8000-000000000030', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000039', 'd1000001-0000-4000-8000-000000000018', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000040', 'd1000001-0000-4000-8000-000000000031', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000041', 'd1000001-0000-4000-8000-000000000007', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000042', 'd1000001-0000-4000-8000-000000000032', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000043', 'd1000001-0000-4000-8000-000000000033', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000044', 'd1000001-0000-4000-8000-000000000034', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000045', 'd1000001-0000-4000-8000-000000000016', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000046', 'd1000001-0000-4000-8000-000000000030', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000047', 'd1000001-0000-4000-8000-000000000026', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000048', 'd1000001-0000-4000-8000-000000000035', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000049', 'd1000001-0000-4000-8000-000000000012', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000050', 'd1000001-0000-4000-8000-000000000036', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000051', 'd1000001-0000-4000-8000-000000000037', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000052', 'd1000001-0000-4000-8000-000000000038', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000053', 'd1000001-0000-4000-8000-000000000021', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000054', 'd1000001-0000-4000-8000-000000000039', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000055', 'd1000001-0000-4000-8000-000000000017', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000028'), '2026/2027', 'HEAD_COACH', 'NONE', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active, notes
) VALUES (
  'd2000001-0000-4000-8000-000000000056', 'd1000001-0000-4000-8000-000000000019', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000028'), '2026/2027', 'OTHER', 'HEAD_COACH', TRUE, 'Entrenador primer nivel asignado en acta federativa FFCV'
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000057', 'd1000001-0000-4000-8000-000000000035', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000028'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000058', 'd1000001-0000-4000-8000-000000000011', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000059', 'd1000001-0000-4000-8000-000000000040', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000060', 'd1000001-0000-4000-8000-000000000041', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000030'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000061', 'd1000001-0000-4000-8000-000000000042', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000030'), '2026/2027', 'ASSISTANT_COACH', 'ASSISTANT_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;
INSERT INTO public.personal_equipo (
  id, person_id, team_id, season, operational_role, federation_role, is_active
) VALUES (
  'd2000001-0000-4000-8000-000000000062', 'd1000001-0000-4000-8000-000000000019', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000031'), '2026/2027', 'HEAD_COACH', 'HEAD_COACH', TRUE
) ON CONFLICT (person_id, team_id, season, operational_role) DO UPDATE SET
  is_active = EXCLUDED.is_active;

COMMIT;