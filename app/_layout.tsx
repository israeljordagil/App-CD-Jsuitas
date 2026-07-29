import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { SportProvider } from '../src/context/SportContext';
import { RoleProvider } from '../src/context/RoleContext';
import { ReviewProvider } from '../src/context/ReviewContext';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

// PANTALLA PARA USUARIO AUTENTICADO SIN ROL ASIGNADO POR EL CLUB
function PendingRoleScreen() {
  const { user, logout } = useAuth();

  return (
    <LinearGradient colors={['#0B1F4D', '#020814']} style={pendingStyles.container}>
      <View style={pendingStyles.card}>
        <View style={pendingStyles.shieldWrapper}>
          <Image 
            source={require('../assets/images/escudo-jesuitas.png')}
            style={pendingStyles.shieldImage}
            resizeMode="contain"
          />
        </View>

        <Ionicons name="time-outline" size={32} color="#F59E0B" style={{ marginBottom: 12 }} />

        <Text style={pendingStyles.title}>Cuenta pendiente de asignación</Text>
        
        <Text style={pendingStyles.message}>
          Hola <Text style={{ fontWeight: '900', color: '#FFFFFF' }}>{user?.full_name || user?.email}</Text>, tu registro en la aplicación CD Jesuitas se ha completado correctamente.
        </Text>

        <View style={pendingStyles.infoBox}>
          <Text style={pendingStyles.infoText}>
            Actualmente tu cuenta no tiene ningún rol deportivo asignado (Familia, Jugador, Entrenador o Coordinador).
          </Text>
          <Text style={[pendingStyles.infoText, { marginTop: 6, color: '#4FC3F7' }]}>
            Por favor, ponte en contacto con la administración o coordinación del club para vincular tu perfil.
          </Text>
        </View>

        <TouchableOpacity style={pendingStyles.logoutButton} onPress={logout}>
          <Ionicons name="log-out-outline" size={18} color="#020814" style={{ marginRight: 6 }} />
          <Text style={pendingStyles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      <Text style={pendingStyles.footer}>Club Deportivo Colegio Jesuitas</Text>
    </LinearGradient>
  );
}

const pendingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#020814',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: 'rgba(15, 30, 70, 0.85)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 247, 0.3)',
    padding: 28,
    alignItems: 'center',
  },
  shieldWrapper: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  shieldImage: {
    width: 52,
    height: 52,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    width: '100%',
  },
  infoText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4FC3F7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
  },
  logoutText: {
    color: '#020814',
    fontSize: 14,
    fontWeight: '900',
  },
  footer: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 20,
    fontWeight: '600',
  },
});

// NAVEGACIÓN Y PROTECCIÓN REAL DE RUTAS
function NavigationStack() {
  const { session, user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const currentSegment = segments[0] || '';
    const isPublicRoute = 
      currentSegment === 'login' || 
      currentSegment === 'reset-password' || 
      currentSegment === 'modal' || 
      currentSegment === '_sitemap' || 
      currentSegment === '+not-found';

    const isPrivateRoute = 
      currentSegment === '(drawer)' || 
      currentSegment === 'deportes' ||
      currentSegment === 'review-center';

    // 1. USUARIO SIN SESIÓN -> Redirigir si intenta acceder a una ruta privada
    if (!session && isPrivateRoute) {
      router.replace('/login');
    }

    // 2. USUARIO CON SESIÓN Y CON ROLES -> Redirigir fuera del login/reset-password
    if (session && user && user.roles.length > 0 && (currentSegment === 'login' || currentSegment === 'reset-password')) {
      router.replace('/(drawer)/inicio' as any);
    }
  }, [session, user, isLoading, segments]);

  // Mientras se verifica la sesión en Supabase
  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#020814', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4FC3F7" />
      </View>
    );
  }

  // 3. USUARIO CON SESIÓN PERO SIN ROLES ASIGNADOS EN SUPABASE -> Pantalla Pendiente
  if (session && user && user.roles.length === 0) {
    return <PendingRoleScreen />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="reset-password" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="review-center" options={{ headerShown: false, presentation: 'modal' }} />
    </Stack>
  );
}

import { DemoNavigationProvider } from '../src/context/DemoNavigationContext';

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <SportProvider>
        <RoleProvider>
          <ReviewProvider>
            <DemoNavigationProvider>
              <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <NavigationStack />
              </ThemeProvider>
            </DemoNavigationProvider>
          </ReviewProvider>
        </RoleProvider>
      </SportProvider>
    </AuthProvider>
  );
}
