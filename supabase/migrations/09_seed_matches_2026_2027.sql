-- =========================================================================
-- MIGRACIÓN 09: SEED IDEMPOTENTE DE 138 AMISTOSOS DE PRETEMPORADA 2026/27
-- Protegido contra la sobrescritura de correcciones manuales (MANUAL_OVERRIDE)
-- =========================================================================

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000001', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', NULL, 'ffcv:EQU-000015:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_alevin_a.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Salgui', 'salgui',
  NULL, NULL, NULL, '2026-09-05', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-05', '2026-09-06',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 5 al 6 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000002', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', NULL, 'ffcv:EQU-000015:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_alevin_a.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Cracks A', 'cracks-a',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000003', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', NULL, 'ffcv:EQU-000015:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_alevin_a.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rumbo', 'rumbo',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000004', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', NULL, 'ffcv:EQU-000015:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_alevin_a.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Patacona', 'patacona',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000005', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', NULL, 'ffcv:EQU-000016:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_alevin_b.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Don Bosco', 'don-bosco',
  NULL, NULL, NULL, '2026-09-05', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-05', '2026-09-06',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 5 al 6 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000006', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', NULL, 'ffcv:EQU-000016:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_alevin_b.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Cracks B', 'cracks-b',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000007', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', NULL, 'ffcv:EQU-000016:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_alevin_b.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Patacona', 'patacona',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000008', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', NULL, 'ffcv:EQU-000016:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_alevin_b.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Apolo', 'apolo',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000009', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', NULL, 'ffcv:EQU-000016:2026/2027:friendly:j5', 'FFCV_HTML', 'calendario_alevin_b.html',
  5, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Atlético Moncadense', 'atletico-moncadense',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000010', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', NULL, 'ffcv:EQU-000017:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_alevin_c.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Cracks C', 'cracks-c',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000011', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', NULL, 'ffcv:EQU-000017:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_alevin_c.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rocafort', 'rocafort',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000012', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', NULL, 'ffcv:EQU-000017:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_alevin_c.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Apolo', 'apolo',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000013', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', NULL, 'ffcv:EQU-000017:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_alevin_c.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Atlético Moncadense', 'atletico-moncadense',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000014', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', NULL, 'ffcv:EQU-000018:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_alevin_d.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Cracks D', 'cracks-d',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000015', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', NULL, 'ffcv:EQU-000018:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_alevin_d.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'San Marcelino', 'san-marcelino',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000016', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', NULL, 'ffcv:EQU-000018:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_alevin_d.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Don Bosco', 'don-bosco',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000017', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', NULL, 'ffcv:EQU-000018:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_alevin_d.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrent CF', 'torrent-cf',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000018', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', NULL, 'ffcv:EQU-000019:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_alevin_e.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrent CF', 'torrent-cf',
  NULL, NULL, NULL, '2026-09-05', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-05', '2026-09-06',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 5 al 6 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000019', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', NULL, 'ffcv:EQU-000019:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_alevin_e.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Cracks E', 'cracks-e',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000020', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', NULL, 'ffcv:EQU-000019:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_alevin_e.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rumbo', 'rumbo',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000021', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', NULL, 'ffcv:EQU-000019:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_alevin_e.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rocafort', 'rocafort',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000022', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', NULL, 'ffcv:EQU-000019:2026/2027:friendly:j5', 'FFCV_HTML', 'calendario_alevin_e.html',
  5, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Don Bosco', 'don-bosco',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000023', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', NULL, 'ffcv:EQU-000019:2026/2027:friendly:j6', 'FFCV_HTML', 'calendario_alevin_e.html',
  6, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Atlético Moncadense', 'atletico-moncadense',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000024', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', NULL, 'ffcv:EQU-000020:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_alevin_f.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Cracks F', 'cracks-f',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000025', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', NULL, 'ffcv:EQU-000020:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_alevin_f.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rocafort', 'rocafort',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000026', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', NULL, 'ffcv:EQU-000020:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_alevin_f.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Apolo', 'apolo',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000027', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', NULL, 'ffcv:EQU-000020:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_alevin_f.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrent CF', 'torrent-cf',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000028', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', NULL, 'ffcv:EQU-000021:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_alevin_g.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Cracks G', 'cracks-g',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000029', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', NULL, 'ffcv:EQU-000021:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_alevin_g.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'San Marcelino', 'san-marcelino',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000030', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', NULL, 'ffcv:EQU-000021:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_alevin_g.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Extramurs', 'extramurs',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000031', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', NULL, 'ffcv:EQU-000021:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_alevin_g.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Atlético Moncadense', 'atletico-moncadense',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000032', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', NULL, 'ffcv:EQU-000022:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_alevin_h.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Salgui', 'salgui',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000033', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', NULL, 'ffcv:EQU-000022:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_alevin_h.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Patacona', 'patacona',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000034', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', NULL, 'ffcv:EQU-000022:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_alevin_h.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Extramurs', 'extramurs',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000035', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', NULL, 'ffcv:EQU-000022:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_alevin_h.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Atlético Moncadense', 'atletico-moncadense',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000036', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', NULL, 'ffcv:EQU-000023:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_benjamin_a.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrent CF', 'torrent-cf',
  NULL, NULL, NULL, '2026-09-05', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-05', '2026-09-06',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 5 al 6 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000037', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', NULL, 'ffcv:EQU-000023:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_benjamin_a.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Cracks A', 'cracks-a',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000038', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', NULL, 'ffcv:EQU-000023:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_benjamin_a.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rumbo', 'rumbo',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000039', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', NULL, 'ffcv:EQU-000023:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_benjamin_a.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rocafort', 'rocafort',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000040', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', NULL, 'ffcv:EQU-000023:2026/2027:friendly:j5', 'FFCV_HTML', 'calendario_benjamin_a.html',
  5, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Malilla', 'malilla',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000041', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', NULL, 'ffcv:EQU-000023:2026/2027:friendly:j6', 'FFCV_HTML', 'calendario_benjamin_a.html',
  6, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Atlético Moncadense', 'atletico-moncadense',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000042', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', NULL, 'ffcv:EQU-000024:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_benjamin_b.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Cracks B', 'cracks-b',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000043', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', NULL, 'ffcv:EQU-000024:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_benjamin_b.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rocafort', 'rocafort',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000044', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', NULL, 'ffcv:EQU-000024:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_benjamin_b.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Don Bosco', 'don-bosco',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000045', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', NULL, 'ffcv:EQU-000024:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_benjamin_b.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Atlético Moncadense', 'atletico-moncadense',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000046', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', NULL, 'ffcv:EQU-000025:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_benjamin_c.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Malilla', 'malilla',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000047', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', NULL, 'ffcv:EQU-000025:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_benjamin_c.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Barrio de la Luz', 'barrio-de-la-luz',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000048', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', NULL, 'ffcv:EQU-000025:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_benjamin_c.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Apolo', 'apolo',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000049', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', NULL, 'ffcv:EQU-000025:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_benjamin_c.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrent CF', 'torrent-cf',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000050', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', NULL, 'ffcv:EQU-000026:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_benjamin_d.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Cracks C', 'cracks-c',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000051', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', NULL, 'ffcv:EQU-000026:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_benjamin_d.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rocafort', 'rocafort',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000052', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', NULL, 'ffcv:EQU-000026:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_benjamin_d.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Historics', 'historics',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000053', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', NULL, 'ffcv:EQU-000026:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_benjamin_d.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrent CF', 'torrent-cf',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000054', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', NULL, 'ffcv:EQU-000027:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_benjamin_e.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Cracks D', 'cracks-d',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000055', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', NULL, 'ffcv:EQU-000027:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_benjamin_e.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Don Bosco', 'don-bosco',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000056', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', NULL, 'ffcv:EQU-000027:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_benjamin_e.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Historics', 'historics',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000057', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', NULL, 'ffcv:EQU-000027:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_benjamin_e.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Atlético Moncadense', 'atletico-moncadense',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000058', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', NULL, 'ffcv:EQU-000003:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_cadete_a.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Extramurs B', 'extramurs-b',
  NULL, NULL, NULL, '2026-09-05', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-05', '2026-09-06',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 5 al 6 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000059', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', NULL, 'ffcv:EQU-000003:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_cadete_a.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Salgui', 'salgui',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000060', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', NULL, 'ffcv:EQU-000003:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_cadete_a.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rumbo', 'rumbo',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000061', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', NULL, 'ffcv:EQU-000003:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_cadete_a.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrelevante C', 'torrelevante-c',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000062', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', NULL, 'ffcv:EQU-000003:2026/2027:friendly:j5', 'FFCV_HTML', 'calendario_cadete_a.html',
  5, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rocafort', 'rocafort',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000063', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', NULL, 'ffcv:EQU-000003:2026/2027:friendly:j6', 'FFCV_HTML', 'calendario_cadete_a.html',
  6, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Benicalap', 'benicalap',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000064', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', NULL, 'ffcv:EQU-000004:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_cadete_b.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Extramurs C', 'extramurs-c',
  NULL, NULL, NULL, '2026-09-05', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-05', '2026-09-06',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 5 al 6 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000065', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', NULL, 'ffcv:EQU-000004:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_cadete_b.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rocafort', 'rocafort',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000066', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', NULL, 'ffcv:EQU-000004:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_cadete_b.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'San Marcelino', 'san-marcelino',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000067', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', NULL, 'ffcv:EQU-000004:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_cadete_b.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'L''Eliana', 'l-eliana',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000068', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', NULL, 'ffcv:EQU-000004:2026/2027:friendly:j5', 'FFCV_HTML', 'calendario_cadete_b.html',
  5, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrent CF', 'torrent-cf',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000069', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', NULL, 'ffcv:EQU-000005:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_cadete_c.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrelevante', 'torrelevante',
  NULL, NULL, NULL, '2026-09-05', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-05', '2026-09-06',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 5 al 6 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000070', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', NULL, 'ffcv:EQU-000005:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_cadete_c.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Xirivella', 'xirivella',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000071', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', NULL, 'ffcv:EQU-000005:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_cadete_c.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rumbo', 'rumbo',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000072', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', NULL, 'ffcv:EQU-000005:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_cadete_c.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'San Marcelino', 'san-marcelino',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000073', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', NULL, 'ffcv:EQU-000005:2026/2027:friendly:j5', 'FFCV_HTML', 'calendario_cadete_c.html',
  5, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'L''Eliana', 'l-eliana',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000074', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', NULL, 'ffcv:EQU-000005:2026/2027:friendly:j6', 'FFCV_HTML', 'calendario_cadete_c.html',
  6, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Benicalap', 'benicalap',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000075', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', NULL, 'ffcv:EQU-000006:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_cadete_d.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rafelbunyol', 'rafelbunyol',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000076', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', NULL, 'ffcv:EQU-000006:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_cadete_d.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Cracks B', 'cracks-b',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000077', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', NULL, 'ffcv:EQU-000006:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_cadete_d.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Ciutat F', 'ciutat-f',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000078', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', NULL, 'ffcv:EQU-000006:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_cadete_d.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrent CF', 'torrent-cf',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000079', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', NULL, 'ffcv:EQU-000007:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_cadete_e.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'E1 Paiporta - E Gayà', 'e1-paiporta-e-gaya',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000080', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', NULL, 'ffcv:EQU-000007:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_cadete_e.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrelevante', 'torrelevante',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000081', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', NULL, 'ffcv:EQU-000007:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_cadete_e.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Ciutat E', 'ciutat-e',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000082', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', NULL, 'ffcv:EQU-000007:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_cadete_e.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrent CF', 'torrent-cf',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000083', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', NULL, 'ffcv:EQU-000008:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_cadete_femenino.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Maritim', 'maritim',
  NULL, NULL, NULL, '2026-09-05', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-05', '2026-09-06',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 5 al 6 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000084', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', NULL, 'ffcv:EQU-000008:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_cadete_femenino.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Sagunto FEM', 'sagunto-fem',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000085', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', NULL, 'ffcv:EQU-000008:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_cadete_femenino.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Don Bosco', 'don-bosco',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000086', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', NULL, 'ffcv:EQU-000008:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_cadete_femenino.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrent CF', 'torrent-cf',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000087', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', NULL, 'ffcv:EQU-000009:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_infantil_a.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Salgui', 'salgui',
  NULL, NULL, NULL, '2026-08-29', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-08-29', '2026-08-30',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 29 al 30 de agosto de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000088', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', NULL, 'ffcv:EQU-000009:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_infantil_a.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Extramurs B', 'extramurs-b',
  NULL, NULL, NULL, '2026-09-05', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-05', '2026-09-06',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 5 al 6 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000089', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', NULL, 'ffcv:EQU-000009:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_infantil_a.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Malilla', 'malilla',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000090', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', NULL, 'ffcv:EQU-000009:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_infantil_a.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rumbo', 'rumbo',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000091', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', NULL, 'ffcv:EQU-000009:2026/2027:friendly:j5', 'FFCV_HTML', 'calendario_infantil_a.html',
  5, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Serranos', 'serranos',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000092', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', NULL, 'ffcv:EQU-000010:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_infantil_b.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Extramurs E', 'extramurs-e',
  NULL, NULL, NULL, '2026-09-05', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-05', '2026-09-06',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 5 al 6 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000093', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', NULL, 'ffcv:EQU-000010:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_infantil_b.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'San Marcelino', 'san-marcelino',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000094', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', NULL, 'ffcv:EQU-000010:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_infantil_b.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrelevante', 'torrelevante',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000095', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', NULL, 'ffcv:EQU-000010:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_infantil_b.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'L''Eliana', 'l-eliana',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000096', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', NULL, 'ffcv:EQU-000010:2026/2027:friendly:j5', 'FFCV_HTML', 'calendario_infantil_b.html',
  5, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrent CF', 'torrent-cf',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000097', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', NULL, 'ffcv:EQU-000011:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_infantil_c.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'At Amistat', 'at-amistat',
  NULL, NULL, NULL, '2026-09-05', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-05', '2026-09-06',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 5 al 6 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000098', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', NULL, 'ffcv:EQU-000011:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_infantil_c.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Salgui', 'salgui',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000099', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', NULL, 'ffcv:EQU-000011:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_infantil_c.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrelevante', 'torrelevante',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000100', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', NULL, 'ffcv:EQU-000011:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_infantil_c.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'L''Eliana', 'l-eliana',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000101', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', NULL, 'ffcv:EQU-000011:2026/2027:friendly:j5', 'FFCV_HTML', 'calendario_infantil_c.html',
  5, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Benicalap', 'benicalap',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000102', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', NULL, 'ffcv:EQU-000012:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_infantil_d.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'FBCD Catarroja', 'fbcd-catarroja',
  NULL, NULL, NULL, '2026-09-05', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-05', '2026-09-06',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 5 al 6 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000103', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', NULL, 'ffcv:EQU-000012:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_infantil_d.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Xirivella', 'xirivella',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000104', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', NULL, 'ffcv:EQU-000012:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_infantil_d.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Mislata UF', 'mislata-uf',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000105', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', NULL, 'ffcv:EQU-000012:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_infantil_d.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Godella', 'godella',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000106', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', NULL, 'ffcv:EQU-000012:2026/2027:friendly:j5', 'FFCV_HTML', 'calendario_infantil_d.html',
  5, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Paterna', 'paterna',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000107', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', NULL, 'ffcv:EQU-000013:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_infantil_e.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Crack E', 'crack-e',
  NULL, NULL, NULL, '2026-09-05', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-05', '2026-09-06',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 5 al 6 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000108', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', NULL, 'ffcv:EQU-000013:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_infantil_e.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rocafort', 'rocafort',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000109', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', NULL, 'ffcv:EQU-000013:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_infantil_e.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Cracks F', 'cracks-f',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000110', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', NULL, 'ffcv:EQU-000013:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_infantil_e.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Don Bosco', 'don-bosco',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000111', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', NULL, 'ffcv:EQU-000013:2026/2027:friendly:j5', 'FFCV_HTML', 'calendario_infantil_e.html',
  5, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrent CF', 'torrent-cf',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000112', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', NULL, 'ffcv:EQU-000014:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_infantil_femenino.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Nazaret', 'nazaret',
  NULL, NULL, NULL, '2026-09-05', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-05', '2026-09-06',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 5 al 6 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000113', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', NULL, 'ffcv:EQU-000014:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_infantil_femenino.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rafelbunyol', 'rafelbunyol',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000114', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', NULL, 'ffcv:EQU-000014:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_infantil_femenino.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Sagunto FEM', 'sagunto-fem',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000115', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', NULL, 'ffcv:EQU-000014:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_infantil_femenino.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Maritim', 'maritim',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000116', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', NULL, 'ffcv:EQU-000014:2026/2027:friendly:j5', 'FFCV_HTML', 'calendario_infantil_femenino.html',
  5, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrent CF', 'torrent-cf',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000117', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', NULL, 'ffcv:EQU-000001:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_juvenil_a.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Imposibles Bétero A', 'imposibles-betero-a',
  NULL, NULL, NULL, '2026-08-29', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-08-29', '2026-08-30',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 29 al 30 de agosto de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000118', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', NULL, 'ffcv:EQU-000001:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_juvenil_a.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'L''Eliana', 'l-eliana',
  NULL, NULL, NULL, '2026-09-05', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-05', '2026-09-06',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 5 al 6 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000119', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', NULL, 'ffcv:EQU-000001:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_juvenil_a.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Salgui', 'salgui',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000120', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', NULL, 'ffcv:EQU-000002:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_juvenil_b.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Imposibles Bétero C', 'imposibles-betero-c',
  NULL, NULL, NULL, '2026-08-29', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-08-29', '2026-08-30',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 29 al 30 de agosto de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000121', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', NULL, 'ffcv:EQU-000002:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_juvenil_b.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Malilla C', 'malilla-c',
  NULL, NULL, NULL, '2026-09-05', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-05', '2026-09-06',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 5 al 6 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000122', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', NULL, 'ffcv:EQU-000002:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_juvenil_b.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Cracks C', 'cracks-c',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000123', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000028'), '2026/2027', NULL, 'ffcv:EQU-000028:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_prebenjamin_a.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Cracks A', 'cracks-a',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000124', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000028'), '2026/2027', NULL, 'ffcv:EQU-000028:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_prebenjamin_a.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rocafort', 'rocafort',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000125', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000028'), '2026/2027', NULL, 'ffcv:EQU-000028:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_prebenjamin_a.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Don Bosco', 'don-bosco',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000126', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000028'), '2026/2027', NULL, 'ffcv:EQU-000028:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_prebenjamin_a.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Atlético Moncadense', 'atletico-moncadense',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000127', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', NULL, 'ffcv:EQU-000029:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_prebenjamin_b.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Cracks B', 'cracks-b',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000128', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', NULL, 'ffcv:EQU-000029:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_prebenjamin_b.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Barrio de la Luz', 'barrio-de-la-luz',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000129', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', NULL, 'ffcv:EQU-000029:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_prebenjamin_b.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Extramurs', 'extramurs',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000130', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', NULL, 'ffcv:EQU-000029:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_prebenjamin_b.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrent CF', 'torrent-cf',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000131', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000030'), '2026/2027', NULL, 'ffcv:EQU-000030:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_prebenjamin_c.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Cracks C', 'cracks-c',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000132', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000030'), '2026/2027', NULL, 'ffcv:EQU-000030:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_prebenjamin_c.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Barrio de la Luz', 'barrio-de-la-luz',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000133', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000030'), '2026/2027', NULL, 'ffcv:EQU-000030:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_prebenjamin_c.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Historics', 'historics',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000134', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000030'), '2026/2027', NULL, 'ffcv:EQU-000030:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_prebenjamin_c.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Atlético Moncadense', 'atletico-moncadense',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000135', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000031'), '2026/2027', NULL, 'ffcv:EQU-000031:2026/2027:friendly:j1', 'FFCV_HTML', 'calendario_querubin.html',
  1, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Na Rovella', 'na-rovella',
  NULL, NULL, NULL, '2026-09-12', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-12', '2026-09-13',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 12 al 13 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000136', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000031'), '2026/2027', NULL, 'ffcv:EQU-000031:2026/2027:friendly:j2', 'FFCV_HTML', 'calendario_querubin.html',
  2, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Rafelbunyol', 'rafelbunyol',
  NULL, NULL, NULL, '2026-09-19', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-19', '2026-09-20',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 19 al 20 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000137', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000031'), '2026/2027', NULL, 'ffcv:EQU-000031:2026/2027:friendly:j3', 'FFCV_HTML', 'calendario_querubin.html',
  3, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Extramurs', 'extramurs',
  NULL, NULL, NULL, '2026-09-26', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-09-26', '2026-09-27',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 26 al 27 de septiembre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

INSERT INTO public.partidos (
  id, team_id, season, federation_match_id, source_event_key, source, source_reference,
  matchday, competition_name, match_type, opponent_name, opponent_slug,
  is_home, home_team_name, away_team_name, scheduled_date, scheduled_time,
  timezone, scheduled_at, schedule_status, weekend_start_date, weekend_end_date,
  match_status, home_score, away_score, result_confirmed, sync_status, notes
) VALUES (
  'c0000001-0000-4000-8000-000000000138', (SELECT id FROM public.teams WHERE internal_code = 'EQU-000031'), '2026/2027', NULL, 'ffcv:EQU-000031:2026/2027:friendly:j4', 'FFCV_HTML', 'calendario_querubin.html',
  4, 'Amistosos Pretemporada CD Jesuitas 2026/27', 'FRIENDLY', 'Torrent CF', 'torrent-cf',
  NULL, NULL, NULL, '2026-10-03', NULL,
  'Europe/Madrid', NULL, 'PROVISIONAL', '2026-10-03', '2026-10-04',
  'SCHEDULED', NULL, NULL, FALSE, 'PENDING', 'Amistoso de pretemporada 2026/27. Fin de semana del 3 al 4 de octubre de 2026 (Sábado a Domingo). Programación provisional sin día ni hora confirmados. Localía pendiente de confirmación oficial.'
) ON CONFLICT (source_event_key) WHERE source_event_key IS NOT NULL
DO UPDATE SET
  matchday = EXCLUDED.matchday,
  opponent_name = EXCLUDED.opponent_name,
  opponent_slug = EXCLUDED.opponent_slug,
  scheduled_date = EXCLUDED.scheduled_date,
  weekend_start_date = EXCLUDED.weekend_start_date,
  weekend_end_date = EXCLUDED.weekend_end_date,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.partidos.sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';
