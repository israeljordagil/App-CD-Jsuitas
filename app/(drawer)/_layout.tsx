import React, { useEffect } from 'react';
import { REVIEW_MODE } from '../../src/config/reviewMode';
import { Drawer } from 'expo-router/drawer';
import { CustomDrawerContent } from '../../src/components/ui/CustomDrawerContent';
import { PremiumBackground } from '../../src/components/ui/PremiumBackground';
import { Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSport } from '../../src/context/SportContext';
import { useAuth } from '../../src/context/AuthContext';
import { usePathname, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const ROLE_ROUTES: Record<string, string[]> = {
  'JUGADOR': ['/', '/inicio', '/jugadores', '/partidos', '/convocatorias', '/estadisticas', '/informes', '/logros', '/comunicacion', '/instalaciones', '/configuracion'],
  'FAMILIA': ['/', '/inicio', '/jugadores', '/partidos', '/convocatorias', '/entrenamientos', '/live_match', '/torneos', '/comunicacion', '/avisos', '/instalaciones', '/configuracion'],
  'ENTRENADOR': ['/', '/inicio', '/plantillas', '/partidos', '/convocatorias', '/entrenamientos', '/tactica', '/live_match', '/estadisticas', '/informes', '/comunicacion', '/logros', '/configuracion'],
  'COORDINADOR': ['/', '/inicio', '/partidos', '/equipos', '/jugadores', '/entrenadores', '/plantillas', '/entrenamientos', '/informes', '/estadisticas', '/clasificaciones', '/familias', '/comunicacion', '/arbitros', '/vestuarios', '/instalaciones', '/material', '/configuracion']
};

export default function DrawerLayout() {
  const { sport } = useSport();
  const { activeContext } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // El RouteGuard ha sido desactivado temporalmente para evitar 
    // bucles infinitos de redirección hacia +not-found.
  }, [pathname, activeContext]);

  // El routing condicional inicial ahora lo gestiona app/index.tsx

  return (
    <PremiumBackground>
      {/* Zona Segura del Notch */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: '#0B1F4D' }} />
      
      {/* Navegador Drawer nativo */}
      <View style={{ flex: 1 }}>
        <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              width: width * 0.85,
              backgroundColor: 'transparent',
            },
            sceneStyle: { backgroundColor: 'transparent' }
          }}
        >
        </Drawer>
      </View>
    </PremiumBackground>
  );
}
