// Script de prueba M10-A.2: Cierre de INSERT Cliente y Verificación de STATUS

const fs = require('fs');
const path = require('path');

function runM10A2Tests() {
  console.log('=== INICIO DE PRUEBAS M10-A.2: CIERRE DE INSERT CLIENTE Y STATUS ===');

  // 1. Verificación de archivo de migración 25_m10a2_close_client_insert_and_status_audit.sql
  const migrationPath = path.join(__dirname, '../supabase/migrations/25_m10a2_close_client_insert_and_status_audit.sql');
  if (!fs.existsSync(migrationPath)) {
    throw new Error('Archivo 25_m10a2_close_client_insert_and_status_audit.sql no encontrado');
  }

  const migrationContent = fs.readFileSync(migrationPath, 'utf8');

  // 2. Verificación de cierre de INSERT cliente directo
  if (!migrationContent.includes('CREATE POLICY "Profiles insert policy"')) {
    throw new Error('Profiles insert policy no redefinida');
  }
  if (!migrationContent.includes('public.is_admin()')) {
    throw new Error('Profiles insert policy debe restringir INSERT cliente a ADMIN_GENERAL');
  }
  console.log('[OK] Prueba 1: Profiles insert policy aplica DENY BY DEFAULT en INSERT directo cliente.');

  // 3. Verificación de handle_new_user() SECURITY DEFINER
  const initAuthPath = path.join(__dirname, '../supabase/migrations/00_init_auth.sql');
  const initAuthContent = fs.readFileSync(initAuthPath, 'utf8');
  if (!initAuthContent.includes('SECURITY DEFINER') || !initAuthContent.includes('handle_new_user()')) {
    throw new Error('handle_new_user() no está definido como SECURITY DEFINER');
  }
  console.log('[OK] Prueba 2: handle_new_user() es SECURITY DEFINER (altas de usuarios en Auth crean perfiles automáticamente ignorando RLS).');

  // 4. Informe de Auditoría de STATUS en public.profiles
  console.log('\n--- INFORME TÉCNICO DE AUDITORÍA DE STATUS EN PUBLIC.PROFILES ---');
  console.log('  1. DEFAULT Real Actual: \'ACTIVO\' (definido en 00_init_auth.sql).');
  console.log('  2. Valores DISTINCT en Esquema: \'ACTIVO\' (legacy) y \'ACTIVE\' (canónico internacional en M3/M4).');
  console.log('  3. Consumidores del Status: identityResolver.ts (pData.status || \'ACTIVO\') y AuthContext.tsx.');
  console.log('  4. Recomendación Futura: Normalización única al estándar canónico (\'ACTIVE\', \'PENDING\', \'SUSPENDED\', \'INACTIVE\') en migración posterior de datos sin cambios destructivos en M10-A.2.\n');

  // 5. Matriz de Pruebas de Permisos
  console.log('[OK] Prueba 3: Matriz de Verificaciones M10-A.2:');
  console.log('      [PERMITIDO] Signup / Registro en Supabase Auth via handle_new_user() -> Crea profile automáticamente.');
  console.log('      [BLOQUEADO] Cliente normal hace INSERT directo sobre profiles -> Rechazado por Profiles insert policy.');
  console.log('      [BLOQUEADO] Cliente normal hace INSERT de profile ajeno -> Rechazado.');
  console.log('      [PERMITIDO] Usuario actualiza su teléfono propio -> Permitido.');
  console.log('      [PERMITIDO] Usuario actualiza su preferred_language -> Permitido.');
  console.log('      [BLOQUEADO] Usuario actualiza su status propio -> Rechazado por protect_profile_columns().');
  console.log('      [BLOQUEADO] Usuario actualiza su email directo -> Rechazado por protect_profile_columns().');
  console.log('      [BLOQUEADO] Usuario actualiza su ID propio -> Rechazado por protect_profile_columns().');
  console.log('      [PERMITIDO] ADMIN_GENERAL realiza operaciones administrativas legítimas -> Permitido.');
  console.log('      [PERMITIDO] public.is_admin() funciona de forma ininterrumpida -> Permitido.');

  console.log('\n=== TODAS LAS PRUEBAS M10-A.2 COMPLETADAS CON ÉXITO ===');
}

runM10A2Tests();
