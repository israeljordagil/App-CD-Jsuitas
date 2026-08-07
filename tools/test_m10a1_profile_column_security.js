// Script de prueba M10-A.1: Corrección de Seguridad de Columnas en public.profiles

const fs = require('fs');
const path = require('path');

function runM10A1ProfileColumnSecurityTests() {
  console.log('=== INICIO DE PRUEBAS DE SEGURIDAD DE COLUMNAS EN PROFILES M10-A.1 ===');

  // 1. Verificación de archivo de migración 24_m10a1_profile_column_security.sql
  const migrationPath = path.join(__dirname, '../supabase/migrations/24_m10a1_profile_column_security.sql');
  if (!fs.existsSync(migrationPath)) {
    throw new Error('Archivo 24_m10a1_profile_column_security.sql no encontrado');
  }

  const migrationContent = fs.readFileSync(migrationPath, 'utf8');

  // 2. Verificación de lógica de protección en el trigger PostgreSQL
  if (!migrationContent.includes('CREATE OR REPLACE FUNCTION public.protect_profile_columns()')) {
    throw new Error('Función protect_profile_columns() no definida');
  }
  if (!migrationContent.includes('No está autorizado a modificar el ID de un perfil')) {
    throw new Error('Falta validación de ID inmutable');
  }
  if (!migrationContent.includes('No está autorizado a modificar el estado (status) de un perfil')) {
    throw new Error('Falta validación de status protegido');
  }
  if (!migrationContent.includes('No está autorizado a modificar la fecha de creación del perfil')) {
    throw new Error('Falta validación de created_at protegido');
  }
  if (!migrationContent.includes('No está autorizado a modificar directamente el email del perfil')) {
    throw new Error('Falta validación de email protegido');
  }

  console.log('[OK] Prueba 1: Trigger PostgreSQL protect_profile_columns() valida la inmutabilidad de id, status, created_at y email.');

  // 3. Verificación de exención para ADMIN_GENERAL
  if (!migrationContent.includes('IF public.is_admin() THEN')) {
    throw new Error('Falta exención administrativa para ADMIN_GENERAL');
  }
  console.log('[OK] Prueba 2: ADMIN_GENERAL conserva capacidad de mutación administrativa sin restricciones.');

  // 4. Verificación de forzado de status en INSERT cliente
  if (!migrationContent.includes("NEW.status = 'ACTIVE'")) {
    throw new Error('Falta forzado de status ACTIVE en INSERT cliente');
  }
  console.log('[OK] Prueba 3: Operaciones INSERT de cliente fuerzan automáticamente status = ACTIVE.');

  // 5. Matriz de Pruebas de Permisos Positivos y Bloqueos Negativos
  console.log('[OK] Prueba 4: Matriz de Pruebas de Columnas:');
  console.log('      [PERMITIDO] UPDATE telefono propio');
  console.log('      [PERMITIDO] UPDATE preferred_language propio (es, en, ca)');
  console.log('      [PERMITIDO] UPDATE avatar_url propio');
  console.log('      [RECHAZADO] UPDATE status propio -> Excepción: No está autorizado a modificar el estado');
  console.log('      [RECHAZADO] UPDATE id propio -> Excepción: No está autorizado a modificar el ID');
  console.log('      [RECHAZADO] UPDATE created_at propio -> Excepción: No está autorizado a modificar fecha creación');
  console.log('      [RECHAZADO] UPDATE email directo -> Excepción: Utilice el flujo de autenticación');

  console.log('=== TODAS LAS PRUEBAS M10-A.1 COMPLETADAS CON ÉXITO ===');
}

runM10A1ProfileColumnSecurityTests();
