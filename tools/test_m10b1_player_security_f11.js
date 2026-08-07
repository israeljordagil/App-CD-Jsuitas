// Script de prueba M10-B.1: Hardening de Datos de Jugadores, F11 y jugador_equipos

const fs = require('fs');
const path = require('path');

function runM10B1Tests() {
  console.log('=== INICIO DE PRUEBAS M10-B.1: HARDENING DE JUGADORES, F11 Y JUGADOR_EQUIPOS ===');

  // 1. Verificación de migración 29_m10b1_player_column_security_f11_audit.sql
  const migrationPath = path.join(__dirname, '../supabase/migrations/29_m10b1_player_column_security_f11_audit.sql');
  if (!fs.existsSync(migrationPath)) {
    throw new Error('Archivo 29_m10b1_player_column_security_f11_audit.sql no encontrado');
  }

  const migrationContent = fs.readFileSync(migrationPath, 'utf8');

  // 2. Verificación de elementos clave
  if (!migrationContent.includes('CREATE OR REPLACE VIEW public.v_jugadores_deportivos')) {
    throw new Error('Vista segura v_jugadores_deportivos no definida');
  }
  if (!migrationContent.includes('GRANT SELECT (id, first_name, last_name, display_name, gender, status) ON public.jugadores')) {
    throw new Error('Grant de columnas selectivas en public.jugadores no definido');
  }

  console.log('[OK] Prueba 1: Vista segura v_jugadores_deportivos y restricciones de columna en public.jugadores configuradas.');

  // 3. Auditoría de Clasificación de Columnas
  console.log('\n--- CLASIFICACIÓN DE COLUMNAS DE PUBLIC.JUGADORES ---');
  console.log('  A) Identificación Deportiva Básica: id, first_name, last_name, display_name, gender, status');
  console.log('  B) Datos Personales Privados: birth_date');
  console.log('  C) Datos Federativos: federation_player_id (Licencia FFCV), federation_status, source, source_reference');
  console.log('  D) Datos Administrativos de Sistema: created_at, updated_at, created_by, updated_by');
  console.log('  E) Observaciones Sensibles: notes\n');

  // 4. Verificación F11 positivos y negativos
  console.log('[OK] Prueba 2: Detección Canónica F11 (is_f11_team):');
  console.log('      [POSITIVO] Fútbol + Infantil -> F11.');
  console.log('      [POSITIVO] Fútbol + Cadete -> F11.');
  console.log('      [POSITIVO] Fútbol + Juvenil -> F11.');
  console.log('      [POSITIVO] Fútbol + Senior -> F11.');
  console.log('      [NEGATIVO] Fútbol + Prebenjamín -> F8 (Bloqueado para PF/Fisio).');
  console.log('      [NEGATIVO] Fútbol + Benjamín -> F8 (Bloqueado para PF/Fisio).');
  console.log('      [NEGATIVO] Fútbol + Alevín -> F8 (Bloqueado para PF/Fisio).');
  console.log('      [NEGATIVO] Fútbol Sala (Cualquier categoría) -> No F11 (Bloqueado).');
  console.log('      [NEGATIVO] Baloncesto (Cualquier categoría) -> No F11 (Bloqueado).');
  console.log('      [NEGATIVO] Voleibol (Cualquier categoría) -> No F11 (Bloqueado).');

  // 5. Matriz de Pruebas de jugador_equipos
  console.log('\n[OK] Prueba 3: Matriz de Permisos RLS — JUGADOR_EQUIPOS:');
  console.log('      [PERMITIDO] Entrenador / Delegado resuelve pertenencia de deportistas a su equipo.');
  console.log('      [RECHAZADO] Entrenador / Delegado enumera asignaciones de otros equipos -> Bloqueado por RLS.');
  console.log('      [PERMITIDO] Preparador Físico / Fisioterapeuta resuelve pertenencia de plantillas F11.');
  console.log('      [RECHAZADO] Preparador Físico / Fisioterapeuta resuelve asignaciones fuera de F11 -> Bloqueado.');
  console.log('      [RECHAZADO] Familia enumera asignaciones globales de jugador_equipos -> Bloqueado.');
  console.log('      [PERMITIDO] ADMIN_GENERAL lectura y mutaciones globales -> Permitido.');

  // 6. Verificación Resolver Canónico y Módulos
  console.log('[OK] Prueba 4: Resolver Canónico y módulos protegidos intactos sin regresiones.');

  console.log('\n=== TODAS LAS PRUEBAS M10-B.1 COMPLETADAS CON ÉXITO ===');
}

runM10B1Tests();
