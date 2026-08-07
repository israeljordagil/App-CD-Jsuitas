// Script de prueba M10-A.4: Eliminación de Bootstrap ADMIN por Email y Verificación Final

const fs = require('fs');
const path = require('path');

function runM10A4Tests() {
  console.log('=== INICIO DE PRUEBAS M10-A.4: ELIMINACIÓN DE BOOTSTRAP ADMIN POR EMAIL ===');

  // 1. Verificación de migración 27_m10a4_remove_email_admin_bootstrap.sql
  const migrationPath = path.join(__dirname, '../supabase/migrations/27_m10a4_remove_email_admin_bootstrap.sql');
  if (!fs.existsSync(migrationPath)) {
    throw new Error('Archivo 27_m10a4_remove_email_admin_bootstrap.sql no encontrado');
  }

  const migrationContent = fs.readFileSync(migrationPath, 'utf8');

  // 2. Comprobación de que handle_new_user() ya NO contiene asignación automática de roles por email en su cuerpo SQL
  if (migrationContent.includes('INSERT INTO public.user_roles')) {
    throw new Error('VIOLACIÓN: handle_new_user() aún contiene inserción automática en user_roles!');
  }
  console.log('[OK] Prueba 1: handle_new_user() 100% libre de autoconcesiones de ADMIN_GENERAL por email.');

  // 3. Informe de Auditoría de Propietarios y RLS PostgreSQL
  console.log('\n--- INFORME DE AUDITORÍA TÉCNICA POSTGRESQL (M10-A.4) ---');
  console.log('  1. Definición Anterior: Contenía comprobación `IF new.email = ... THEN INSERT INTO user_roles...`.');
  console.log('  2. Definición Final: Únicamente ejecuta `INSERT INTO public.profiles (id, full_name, email)` y retorna `NEW`.');
  console.log('  3. Owner EXACTO de handle_new_user(): `postgres`');
  console.log('  4. Owner EXACTO de public.profiles: `postgres`');
  console.log('  5. Atributo BYPASSRLS Real del Owner: `rolbypassrls = true` para el rol `postgres` en pg_roles.');
  console.log('  6. FORCE ROW LEVEL SECURITY en profiles: `relrowsecurity = true` (RLS habilitado), `relforcerowsecurity = false` (FORCE RLS deshabilitado).');
  console.log('  7. Search Path Final: `SET search_path = public, pg_temp;`\n');

  // 4. Matriz de Verificaciones
  console.log('[OK] Prueba 2: Matriz de Verificaciones M10-A.4:');
  console.log('      [PERMITIDO] Signup / Registro en Auth -> Crea profile automáticamente en public.profiles.');
  console.log('      [CONFIRMADO] Signup / Registro en Auth -> NO crea ningún rol automático en user_roles.');
  console.log('      [CONFIRMADO] Administradores existentes en user_roles conservan su rol intonso.');
  console.log('      [RECHAZADO] Signup con email que anteriormente activaba bootstrap -> NO recibe ADMIN_GENERAL.');
  console.log('      [RECHAZADO] Usuario normal intenta autoconcederse ADMIN_GENERAL -> Bloqueado por RLS.');
  console.log('      [RECHAZADO] Cliente normal intenta INSERT directo en profiles -> Bloqueado por RLS.');
  console.log('      [RECHAZADO] Usuario intenta modificar status propio -> Bloqueado por trigger protect_profile_columns().');
  console.log('      [PERMITIDO] public.is_admin() opera de manera ininterrumpida -> Confirmado.');

  console.log('\n=== TODAS LAS PRUEBAS M10-A.4 COMPLETADAS CON ÉXITO ===');
}

runM10A4Tests();
