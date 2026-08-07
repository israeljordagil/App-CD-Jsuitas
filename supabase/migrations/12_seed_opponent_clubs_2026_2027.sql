-- =========================================================================
-- MIGRACIÓN 12: SEED IDEMPOTENTE DE CLUBES RIVALES CANÓNICOS (public.opponent_clubs)
-- Y VINCULACIÓN DE opponent_club_id EN public.partidos SOLO PARA VERIFIED
-- =========================================================================

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000001', '2381', 'Torrent C.F.', 'Torrent CF', 'torrent-cf',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074522735_Torrent_CF.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000002', '2019', 'C.D. Cracks', 'Cracks', 'cracks',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074519920_Cracks.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000003', '3010', 'C.F. Atlético Moncadense', 'Atlético Moncadense', 'atletico-moncadense',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074509988_Moncadense.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000004', '3119', 'Rocafort C.F.', 'Rocafort', 'rocafort',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074532109_Rocafort.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000005', '1732', 'C.D. Don Bosco', 'Don Bosco', 'don-bosco',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074812140_DBosco__5_.jpg', NULL, 'image/jpeg', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000006', '3211', 'Col. Salgui E.D.E.', 'Salgui', 'salgui',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074600357_escudo.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000007', '2891', 'C.D. Rumbo', 'Rumbo', 'rumbo',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074504411_Rumbo.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000008', '2104', 'C.D. San Marcelino', 'San Marcelino', 'san-marcelino',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074509988_San_Marcelino.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000009', '2754', 'C.D.F.B. L''Eliana', 'L''Eliana', 'l-eliana',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074531457_Escudo_LEliana.jpg', NULL, 'image/jpeg', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000010', '4102', 'C.D. Apolo', 'Apolo', 'apolo',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074540012_Apolo.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000011', '4399', 'C.D. Extramurs Valencia', 'Extramurs', 'extramurs',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074611090_Extramurs.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000012', '1605', 'C.F. Torre Levante', 'Torrelevante', 'torrelevante',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074503322_TorreLevante.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000013', '3341', 'Patacona C.F.', 'Patacona', 'patacona',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074551102_Patacona.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000014', '1812', 'C.D. Malilla', 'Malilla', 'malilla',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074511200_Malilla.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000015', '2411', 'C.D. Barrio de la Luz', 'Barrio de la Luz', 'barrio-de-la-luz',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074518833_BarrioLuz.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000016', '3819', 'C.D. Historics', 'Historics', 'historics',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074549911_Historics.png', NULL, NULL, NULL, NULL,
  'ERROR', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada (ID 3819). Descarga de escudo fallida por HTTP 404 en servidor FFCV. Pendiente de reintento automático o revisión manual.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000017', '1711', 'C.D. Benicalap', 'Benicalap', 'benicalap',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074511233_Benicalap.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000018', '3015', 'Rafelbunyol C.F.', 'Rafelbunyol', 'rafelbunyol',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074501373_Rafelbunyol_CF.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000019', '1902', 'Xirivella C.F.', 'Xirivella', 'xirivella',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074528811_Xirivella.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000020', '3720', 'Ciutat de València C.F.', 'Ciutat de València', 'ciutat-de-valencia',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074547788_CiutatVal.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000021', '3911', 'C.D. Marítimo Cabañal', 'Marítim', 'maritim',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074558811_Maritim.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000022', '2119', 'C.D. At. Amistat', 'At Amistat', 'at-amistat',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074512299_Amistat.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000023', '3501', 'F.B.C.D. Catarroja', 'FBCD Catarroja', 'fbcd-catarroja',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074534411_Catarroja.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000024', '2980', 'Mislata U.F.', 'Mislata UF', 'mislata-uf',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074523311_MislataUF.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000025', '4110', 'E1 Paiporta', 'E1 Paiporta', 'e1-paiporta',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074556622_E1Paiporta.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000026', '2419', 'Godella C.F.', 'Godella', 'godella',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074519988_Godella.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000027', '2210', 'Paterna C.F.', 'Paterna', 'paterna',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074512211_Paterna.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000028', '2509', 'C.D. At. Nazaret', 'Nazaret', 'nazaret',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074576440_CD_At._Nazaret.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000029', '4210', 'C.D. Na Rovella', 'Na Rovella', 'na-rovella',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074567788_NaRovella.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000030', '1802', 'C.D. Serranos', 'Serranos', 'serranos',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074513344_Serranos.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000031', '1520', 'Alboraya U.D.', 'Alboraya UD', 'alboraya-ud',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074501122_Alboraya.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000032', '2810', 'Massanassa C.F.', 'Massanassa', 'massanassa',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074521199_Massanassa.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000033', '3109', 'Sedaví C.F.', 'Sedaví', 'sedavi',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074539988_Sedavi.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000034', '1612', 'U.D. Bétera', 'Bétera', 'betera',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074502211_Betera.png', NULL, 'image/png', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'VERIFIED', 'Coincidencia federativa verificada e identificador único de club validado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000035', '1597', 'Unión Imposibles-Beteró C.F.', 'Imposibles Bétero', 'imposibles-betero',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074492619_descarga.jpg', NULL, 'image/jpeg', 200, 200,
  'GENERIC_PLACEHOLDER', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'REVIEW_REQUIRED', 'Recurso PNFG es descarga.jpg (placeholder genérico). Requiere sustitución por escudo vectorial oficial.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000036', '2638', 'C.F. Mare Nostrum Puerto Sagunto (Candidato)', 'Sagunto FEM', 'sagunto-fem',
  'https://competiciones.ffcv.es/pnfg/var/docs/anterior/1213/DOCS/20136/22/4eeaa2cba54de3aba7f1d7eaec8465b4_120812435804424861370415064.jpg', NULL, 'image/jpeg', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'REVIEW_REQUIRED', 'Coincidencia propuesta con Mare Nostrum Puerto Sagunto sin confirmación unívoca. Requiere revisión de coordinación.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000037', '1980', 'C.D. Teresianas-Torrent', 'Teresianas Torrent', 'teresianas-torrent',
  'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074795382_escudo_teresianas_26_27.png', NULL, 'image/jpeg', 200, 200,
  'PENDING', 'FFCV', 'Extracción automatizada API FFCV', '2026-08-06T12:00:00Z', 'REVIEW_REQUIRED', 'Candidato federativo secundario de la zona de Torrent pendiente de asignación unívoca por la dirección deportiva.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000038', NULL, 'Ciutat de València E', 'Ciutat E', 'ciutat-e',
  NULL, NULL, NULL, NULL, NULL,
  'NOT_FOUND', 'FFCV', 'Búsqueda federativa sin coincidencia unívoca de club principal', '2026-08-06T12:00:00Z', 'NOT_FOUND', 'Sección o equipo específico sin ID federativo de club independiente consolidado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000039', NULL, 'Ciutat de València F', 'Ciutat F', 'ciutat-f',
  NULL, NULL, NULL, NULL, NULL,
  'NOT_FOUND', 'FFCV', 'Búsqueda federativa sin coincidencia unívoca de club principal', '2026-08-06T12:00:00Z', 'NOT_FOUND', 'Sección o equipo específico sin ID federativo de club independiente consolidado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000040', NULL, 'C.D. Cracks E', 'Crack E', 'crack-e',
  NULL, NULL, NULL, NULL, NULL,
  'NOT_FOUND', 'FFCV', 'Búsqueda federativa sin coincidencia unívoca de club principal', '2026-08-06T12:00:00Z', 'NOT_FOUND', 'Sección o equipo específico sin ID federativo de club independiente consolidado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000041', NULL, 'Rival por determinar (Amistoso 1)', 'Rival Pendiente 01', 'rival-pendiente-01',
  NULL, NULL, NULL, NULL, NULL,
  'NOT_FOUND', 'MANUAL', 'Reserva de plaza para amistoso no asignado', '2026-08-06T12:00:00Z', 'NOT_FOUND', 'Plaza técnica reservada para rival amistoso no asignado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000042', NULL, 'Rival por determinar (Amistoso 2)', 'Rival Pendiente 02', 'rival-pendiente-02',
  NULL, NULL, NULL, NULL, NULL,
  'NOT_FOUND', 'MANUAL', 'Reserva de plaza para amistoso no asignado', '2026-08-06T12:00:00Z', 'NOT_FOUND', 'Plaza técnica reservada para rival amistoso no asignado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000043', NULL, 'Rival por determinar (Amistoso 3)', 'Rival Pendiente 03', 'rival-pendiente-03',
  NULL, NULL, NULL, NULL, NULL,
  'NOT_FOUND', 'MANUAL', 'Reserva de plaza para amistoso no asignado', '2026-08-06T12:00:00Z', 'NOT_FOUND', 'Plaza técnica reservada para rival amistoso no asignado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000044', NULL, 'Rival por determinar (Amistoso 4)', 'Rival Pendiente 04', 'rival-pendiente-04',
  NULL, NULL, NULL, NULL, NULL,
  'NOT_FOUND', 'MANUAL', 'Reserva de plaza para amistoso no asignado', '2026-08-06T12:00:00Z', 'NOT_FOUND', 'Plaza técnica reservada para rival amistoso no asignado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000045', NULL, 'Rival por determinar (Amistoso 5)', 'Rival Pendiente 05', 'rival-pendiente-05',
  NULL, NULL, NULL, NULL, NULL,
  'NOT_FOUND', 'MANUAL', 'Reserva de plaza para amistoso no asignado', '2026-08-06T12:00:00Z', 'NOT_FOUND', 'Plaza técnica reservada para rival amistoso no asignado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

INSERT INTO public.opponent_clubs (
  id, federation_club_id, official_name, normalized_name, slug,
  crest_source_url, crest_storage_path, crest_mime_type, crest_width, crest_height,
  crest_status, source, source_reference, last_verified_at, verification_status, notes
) VALUES (
  'b2000001-0000-4000-8000-000000000046', NULL, 'Rival por determinar (Amistoso 6)', 'Rival Pendiente 06', 'rival-pendiente-06',
  NULL, NULL, NULL, NULL, NULL,
  'NOT_FOUND', 'MANUAL', 'Reserva de plaza para amistoso no asignado', '2026-08-06T12:00:00Z', 'NOT_FOUND', 'Plaza técnica reservada para rival amistoso no asignado.'
) ON CONFLICT (slug) DO UPDATE SET
  official_name = EXCLUDED.official_name,
  normalized_name = EXCLUDED.normalized_name,
  federation_club_id = EXCLUDED.federation_club_id,
  crest_source_url = EXCLUDED.crest_source_url,
  crest_status = EXCLUDED.crest_status,
  verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now())
WHERE public.opponent_clubs.crest_status IS DISTINCT FROM 'CUSTOM';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000001'
WHERE (opponent_slug = 'torrent-cf' OR opponent_slug LIKE 'torrent-cf-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000002'
WHERE (opponent_slug = 'cracks' OR opponent_slug LIKE 'cracks-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000003'
WHERE (opponent_slug = 'atletico-moncadense' OR opponent_slug LIKE 'atletico-moncadense-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000004'
WHERE (opponent_slug = 'rocafort' OR opponent_slug LIKE 'rocafort-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000005'
WHERE (opponent_slug = 'don-bosco' OR opponent_slug LIKE 'don-bosco-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000006'
WHERE (opponent_slug = 'salgui' OR opponent_slug LIKE 'salgui-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000007'
WHERE (opponent_slug = 'rumbo' OR opponent_slug LIKE 'rumbo-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000008'
WHERE (opponent_slug = 'san-marcelino' OR opponent_slug LIKE 'san-marcelino-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000009'
WHERE (opponent_slug = 'l-eliana' OR opponent_slug LIKE 'l-eliana-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000010'
WHERE (opponent_slug = 'apolo' OR opponent_slug LIKE 'apolo-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000011'
WHERE (opponent_slug = 'extramurs' OR opponent_slug LIKE 'extramurs-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000012'
WHERE (opponent_slug = 'torrelevante' OR opponent_slug LIKE 'torrelevante-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000013'
WHERE (opponent_slug = 'patacona' OR opponent_slug LIKE 'patacona-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000014'
WHERE (opponent_slug = 'malilla' OR opponent_slug LIKE 'malilla-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000015'
WHERE (opponent_slug = 'barrio-de-la-luz' OR opponent_slug LIKE 'barrio-de-la-luz-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000016'
WHERE (opponent_slug = 'historics' OR opponent_slug LIKE 'historics-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000017'
WHERE (opponent_slug = 'benicalap' OR opponent_slug LIKE 'benicalap-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000018'
WHERE (opponent_slug = 'rafelbunyol' OR opponent_slug LIKE 'rafelbunyol-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000019'
WHERE (opponent_slug = 'xirivella' OR opponent_slug LIKE 'xirivella-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000020'
WHERE (opponent_slug = 'ciutat-de-valencia' OR opponent_slug LIKE 'ciutat-de-valencia-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000021'
WHERE (opponent_slug = 'maritim' OR opponent_slug LIKE 'maritim-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000022'
WHERE (opponent_slug = 'at-amistat' OR opponent_slug LIKE 'at-amistat-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000023'
WHERE (opponent_slug = 'fbcd-catarroja' OR opponent_slug LIKE 'fbcd-catarroja-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000024'
WHERE (opponent_slug = 'mislata-uf' OR opponent_slug LIKE 'mislata-uf-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000025'
WHERE (opponent_slug = 'e1-paiporta' OR opponent_slug LIKE 'e1-paiporta-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000026'
WHERE (opponent_slug = 'godella' OR opponent_slug LIKE 'godella-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000027'
WHERE (opponent_slug = 'paterna' OR opponent_slug LIKE 'paterna-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000028'
WHERE (opponent_slug = 'nazaret' OR opponent_slug LIKE 'nazaret-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000029'
WHERE (opponent_slug = 'na-rovella' OR opponent_slug LIKE 'na-rovella-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000030'
WHERE (opponent_slug = 'serranos' OR opponent_slug LIKE 'serranos-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000031'
WHERE (opponent_slug = 'alboraya-ud' OR opponent_slug LIKE 'alboraya-ud-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000032'
WHERE (opponent_slug = 'massanassa' OR opponent_slug LIKE 'massanassa-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000033'
WHERE (opponent_slug = 'sedavi' OR opponent_slug LIKE 'sedavi-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

UPDATE public.partidos 
SET opponent_club_id = 'b2000001-0000-4000-8000-000000000034'
WHERE (opponent_slug = 'betera' OR opponent_slug LIKE 'betera-%') 
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';
