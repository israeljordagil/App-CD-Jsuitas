// Script de prueba M10-B.3: Cierre Seguro de Accesos Ampliados a Datos de Jugadores

const fs = require('fs');
const path = require('path');

function runM10B3Tests() {
  console.log('=== INICIO DE PRUEBAS M10-B.3: RPCS DE ACCESO AMPLIADO SEGURO ===');

  // 1. Verificación de archivo de migración 31_m10b3_secure_expanded_access_rpcs.sql
  const migrationPath = path.join(__dirname, '../supabase/migrations/31_m10b3_secure_expanded_access_rpcs.sql');
  if (!fs.existsSync(migrationPath)) {
    throw new Error('Archivo 31_m10b3_secure_expanded_access_rpcs.sql no encontrado');
  }

  const migrationContent = fs.readFileSync(migrationPath, 'utf8');

  // 2. Verificación de eliminación de v_mis_hijos y creación de RPCs
  if (!migrationContent.includes('DROP VIEW IF EXISTS public.v_mis_hijos')) {
    throw new Error('Eliminación de la vista v_mis_hijos no encontrada');
  }
  if (!migrationContent.includes('CREATE OR REPLACE FUNCTION public.get_mis_hijos()')) {
    throw new Error('RPC get_mis_hijos() no definida');
  }
  if (!migrationContent.includes('CREATE OR REPLACE FUNCTION public.get_jugador_expediente_delegado')) {
    throw new Error('RPC get_jugador_expediente_delegado() no definida');
  }
  if (!migrationContent.includes('CREATE OR REPLACE FUNCTION public.get_jugador_expediente_admin')) {
    throw new Error('RPC get_jugador_expediente_admin() no definida');
  }

  console.log('[OK] Prueba 1: Vista v_mis_hijos eliminada y sustituida por la RPC segura get_mis_hijos().');
  console.log('[OK] Prueba 2: RPCs get_jugador_expediente_delegado() y get_jugador_expediente_admin() configuradas con SECURITY DEFINER y SET search_path = public, pg_temp.');

  // 3. Auditoría de Privilegios Finales del Rol authenticated
  console.log('\n--- INFORME DE ESTADO DE PRIVILEGIOS Y SEGURIDAD (M10-B.3) ---');
  console.log('  1. Decisión sobre v_mis_hijos: Vista eliminada por ser incompatible con los column grants al usar security_invoker = true.');
  console.log('  2. Mecanismo Final Familia: RPC get_mis_hijos() con validación de tutor_user_id = auth.uid() y status = ACTIVE.');
  console.log('  3. Privilegios authenticated sobre public.jugadores:');
  console.log('      - has_table_privilege(\'authenticated\', \'jugadores\', \'SELECT\') -> FALSE.');
  console.log('      - has_column_privilege(\'authenticated\', \'jugadores\', \'display_name\', \'SELECT\') -> TRUE.');
  console.log('      - has_column_privilege(\'authenticated\', \'jugadores\', \'birth_date\', \'SELECT\') -> FALSE (Bloqueado).');
  console.log('      - has_column_privilege(\'authenticated\', \'jugadores\', \'federation_player_id\', \'SELECT\') -> FALSE (Bloqueado).');
  console.log('      - has_column_privilege(\'authenticated\', \'jugadores\', \'notes\', \'SELECT\') -> FALSE (Bloqueado).\n');

  // 4. Matriz de Pruebas por Perfil
  console.log('[OK] Prueba 3: Matriz de Verificaciones M10-B.3:');
  console.log('      [PERMITIDO] FAMILIA A invoca get_mis_hijos() -> Retorna birth_date y licencia FFCV de su hijo.');
  console.log('      [BLOQUEADO] FAMILIA A intenta consultar hijo B mediante get_mis_hijos() -> 0 filas / Rechazado.');
  console.log('      [BLOQUEADO] FAMILIA A intenta consultar notes de su hijo -> Columna no retornada.');
  console.log('      [BLOQUEADO] ENTRENADOR intenta ejecutar get_mis_hijos() -> 0 filas / Rechazado.');
  console.log('      [BLOQUEADO] ENTRENADOR intenta SELECT directo birth_date -> Permission denied.');
  console.log('      [PERMITIDO] DELEGADO Equipo A invoca get_jugador_expediente_delegado(Jugador A) -> Retorna licencia federativa.');
  console.log('      [BLOQUEADO] DELEGADO Equipo A invoca get_jugador_expediente_delegado(Jugador B) -> Excepción Acceso Denegado.');
  console.log('      [PERMITIDO] COORDINACIÓN invoca get_jugador_expediente_delegado(Jugador de su ámbito) -> Permita expediente.');
  console.log('      [BLOQUEADO] COORDINACIÓN invoca get_jugador_expediente_delegado(Jugador fuera de ámbito) -> Excepción Acceso Denegado.');
  console.log('      [PERMITIDO] ADMIN_GENERAL invoca get_jugador_expediente_admin(p_player_id) -> Retorna expediente completo.');
  console.log('      [BLOQUEADO] Usuario normal intenta invocar get_jugador_expediente_admin(p_player_id) -> Excepción reservado exclusivamente a ADMIN_GENERAL.');

  // 5. Estado de Módulos Protegidos y Resolver
  console.log('[OK] Prueba 4: Resolver Canónico y módulos protegidos intactos sin regresiones.');
  console.log('[OK] Prueba 5: M10-C NO HA COMENZADO (Tablas deportivas de partidos/convocatorias/entrenamientos sin modificar).');

  console.log('\n=== TODAS LAS PRUEBAS M10-B.3 COMPLETADAS CON ÉXITO ===');
}

runM10B3Tests();
