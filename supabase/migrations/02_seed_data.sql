-- =========================================================================
-- MIGRACIÓN 02: DATOS INICIALES (SEED DATA: CATEGORÍAS, EQUIPOS Y JUGADORES)
-- =========================================================================

-- 1. Insertar Categorías principales
INSERT INTO public.categorias (deporte_id, codigo, nombre, edad_minima, edad_maxima, modalidad)
SELECT id, 'INFANTIL', 'Infantil', 12, 13, 'F11' FROM public.deportes WHERE codigo = 'FUTBOL'
ON CONFLICT DO NOTHING;

INSERT INTO public.categorias (deporte_id, codigo, nombre, edad_minima, edad_maxima, modalidad)
SELECT id, 'CADETE', 'Cadete', 14, 15, 'F11' FROM public.deportes WHERE codigo = 'FUTBOL'
ON CONFLICT DO NOTHING;

-- 2. Insertar Equipos Piloto
INSERT INTO public.equipos (deporte_id, categoria_id, temporada_id, nombre, genero, competicion_nombre)
SELECT d.id, c.id, t.id, 'Infantil A', 'MASCULINO', 'Liga Infantil Preferente'
FROM public.deportes d, public.categorias c, public.temporadas t
WHERE d.codigo = 'FUTBOL' AND c.codigo = 'INFANTIL' AND t.nombre = '2026/2027'
ON CONFLICT DO NOTHING;

INSERT INTO public.equipos (deporte_id, categoria_id, temporada_id, nombre, genero, competicion_nombre)
SELECT d.id, c.id, t.id, 'Cadete B', 'MASCULINO', 'Liga Cadete Primera'
FROM public.deportes d, public.categorias c, public.temporadas t
WHERE d.codigo = 'FUTBOL' AND c.codigo = 'CADETE' AND t.nombre = '2026/2027'
ON CONFLICT DO NOTHING;

-- 3. Plantilla del Infantil A (18 Jugadores con sus dorsales y posiciones oficiales)
INSERT INTO public.jugadores (id, nombre, apellidos, fecha_nacimiento, genero, dorsal_habitual, posicion_principal) VALUES
  ('a1111111-1111-1111-1111-111111111101', 'Pablo', 'Domínguez Marqués', '2013-03-15', 'MASCULINO', '3', 'Central'),
  ('a1111111-1111-1111-1111-111111111102', 'Hugo', 'Zubeldia Tortajada', '2013-05-20', 'MASCULINO', '4', 'Central'),
  ('a1111111-1111-1111-1111-111111111103', 'Martín', 'Sanchis Rodríguez', '2013-01-10', 'MASCULINO', '5', 'Medio'),
  ('a1111111-1111-1111-1111-111111111104', 'Lucas', 'Rocati Mansilla', '2013-07-04', 'MASCULINO', '6', 'Medio'),
  ('a1111111-1111-1111-1111-111111111105', 'José', 'Acosta Zaragoza', '2013-09-12', 'MASCULINO', '7', 'Medio'),
  ('a1111111-1111-1111-1111-111111111106', 'Romeo', 'Tomás Verde', '2013-02-28', 'MASCULINO', '8', 'Medio'),
  ('a1111111-1111-1111-1111-111111111107', 'Alejandro', 'Gómez Gómez', '2013-11-05', 'MASCULINO', '9', 'Delantero'),
  ('a1111111-1111-1111-1111-111111111108', 'Jorge', 'Monleón Gómez', '2013-04-18', 'MASCULINO', '10', 'Delantero'),
  ('a1111111-1111-1111-1111-111111111109', 'David', 'Bolumar Morata', '2013-08-22', 'MASCULINO', '11', 'Medio'),
  ('a1111111-1111-1111-1111-111111111110', 'Tymur', 'Zhyzhnevskyy', '2013-06-30', 'MASCULINO', '13', 'Delantero'),
  ('a1111111-1111-1111-1111-111111111111', 'Pedro', 'Clavería Añón', '2013-10-14', 'MASCULINO', '17', 'Lateral'),
  ('a1111111-1111-1111-1111-111111111112', 'Aaron', 'Herraiz Medina', '2013-12-01', 'MASCULINO', '18', 'Central'),
  ('a1111111-1111-1111-1111-111111111113', 'Marco', 'García-Prieto Barja', '2013-03-25', 'MASCULINO', '19', 'Delantero'),
  ('a1111111-1111-1111-1111-111111111114', 'Daniel', 'Serrano Grau', '2013-05-11', 'MASCULINO', '21', 'Lateral'),
  ('a1111111-1111-1111-1111-111111111115', 'Máximo', 'Vento Ricó', '2013-07-19', 'MASCULINO', '22', 'Medio'),
  ('a1111111-1111-1111-1111-111111111116', 'Albert', 'García García', '2013-09-08', 'MASCULINO', '23', 'Medio'),
  ('a1111111-1111-1111-1111-111111111117', 'Javier', 'Mariscal Centelles', '2013-02-14', 'MASCULINO', '24', 'Central'),
  ('a1111111-1111-1111-1111-111111111118', 'Lucas', 'Martínez Broniarek', '2013-01-22', 'MASCULINO', '25', 'Portero')
ON CONFLICT (id) DO NOTHING;

-- 4. Adscripción a la plantilla del Infantil A
INSERT INTO public.jugadores_equipos (jugador_id, equipo_id, dorsal, posicion_habitual, estado_licencia)
SELECT j.id, e.id, j.dorsal_habitual, j.posicion_principal, 'ALTA'
FROM public.jugadores j, public.equipos e
WHERE e.nombre = 'Infantil A' AND j.id LIKE 'a1111111%'
ON CONFLICT DO NOTHING;
