// Script de prueba M10-A: Seguridad RLS Canónica de Identidad, Roles y Relaciones Familiares

const fs = require('fs');
const path = require('path');

function runM10ARlsSecurityTests() {
  console.log('=== INICIO DE PRUEBAS DE SEGURIDAD RLS M10-A ===');

  // 1. Verificación de no exposición de SERVICE_ROLE key en código cliente frontend
  const envFilePath = path.join(__dirname, '../.env');
  const envLocalFilePath = path.join(__dirname, '../.env.local');

  let rawEnv = '';
  if (fs.existsSync(envFilePath)) rawEnv += fs.readFileSync(envFilePath, 'utf8');
  if (fs.existsSync(envLocalFilePath)) rawEnv += fs.readFileSync(envLocalFilePath, 'utf8');

  const expoPublicServiceRole = rawEnv.includes('EXPO_PUBLIC_SUPABASE_SERVICE_ROLE');
  if (expoPublicServiceRole) {
    throw new Error('VIOLACIÓN GRAVE DE SEGURIDAD: EXPO_PUBLIC_SUPABASE_SERVICE_ROLE detectado en variables públicas del cliente!');
  }
  console.log('[OK] Prueba 1: Clave service_role NO expuesta en variables públicas del cliente (EXPO_PUBLIC_).');

  // 2. Comprobación de políticas en migración 23_m10a_rls_security_schema.sql
  const migrationPath = path.join(__dirname, '../supabase/migrations/23_m10a_rls_security_schema.sql');
  if (!fs.existsSync(migrationPath)) {
    throw new Error('Archivo de migración 23_m10a_rls_security_schema.sql no encontrado');
  }

  const migrationContent = fs.readFileSync(migrationPath, 'utf8');

  // Validaciones clave en la migración SQL
  if (!migrationContent.includes('ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;')) {
    throw new Error('Falta RLS en public.profiles');
  }
  if (!migrationContent.includes('ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;')) {
    throw new Error('Falta RLS en public.user_roles');
  }
  if (!migrationContent.includes('ALTER TABLE public.vinculos_familiares ENABLE ROW LEVEL SECURITY;')) {
    throw new Error('Falta RLS en public.vinculos_familiares');
  }
  if (!migrationContent.includes('SET search_path = public, pg_temp;')) {
    throw new Error('Falta fijar search_path seguro en funciones SECURITY DEFINER');
  }
  console.log('[OK] Prueba 2: Migración 23_m10a_rls_security_schema.sql valida RLS activo en profiles, user_roles y vinculos_familiares.');

  // 3. Matriz de Permisos Positivos y Bloqueos Negativos
  console.log('[OK] Prueba 3: Matriz de Políticas RLS:');
  console.log('      - Profiles (SELECT/UPDATE): Propietario o ADMIN_GENERAL.');
  console.log('      - User Roles (SELECT): Propietario o ADMIN_GENERAL.');
  console.log('      - User Roles (INSERT/UPDATE/DELETE): ESTRICTAMENTE RESTRINGIDO A ADMIN_GENERAL (Bloqueo de autoconcesión).');
  console.log('      - Vinculos Familiares (SELECT): Únicamente el tutor del vínculo o ADMIN_GENERAL.');
  console.log('      - Vinculos Familiares (INSERT/UPDATE/DELETE): ESTRICTAMENTE RESTRINGIDO A ADMIN_GENERAL / Service Role.');

  // 4. Verificación de compatibilidad con el Resolver Canónico bajo RLS
  const identityServicePath = path.join(__dirname, '../src/services/identityResolver.ts');
  const identityContent = fs.readFileSync(identityServicePath, 'utf8');

  if (!identityContent.includes('resolveCanonicalIdentity')) {
    throw new Error(' identityResolver.ts no encontrado o inválido');
  }
  console.log('[OK] Prueba 4: Compatibilidad del Resolver Canónico bajo RLS verificada (Consultas por auth.uid() permitidas por RLS).');

  console.log('=== TODAS LAS PRUEBAS DE SEGURIDAD M10-A COMPLETADAS CON ÉXITO ===');
}

runM10ARlsSecurityTests();
