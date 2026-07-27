import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../../../src/utils/theme';
import { AnimatedCard as Card } from '../../../src/components/ui/AnimatedCard';

const mockJugador = {
  nombre: 'Pablo Martínez',
  equipo: 'Cadete B',
  categoria: 'Cadete',
  dorsal: 9,
  posicion: 'Delantero',
  avatar: 'https://i.pravatar.cc/200?u=pablo'
};

export default function AjustesJugadorScreen() {
  const router = useRouter();

  // Notification Toggles state
  const [toggles, setToggles] = useState({
    convocatorias: true,
    partidos: true,
    entrenamientos: true,
    torneos: false,
    mensajes: true,
    retos: true,
    insignias: true,
    noticias: false,
    animaciones: true,
    sonidos: true,
    vibracion: true,
    faceId: true
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderSettingItem = (icon: string, title: string, color: string, value?: string, hasArrow?: boolean) => (
     <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingLeft}>
           <View style={[styles.settingIconBox, { backgroundColor: `${color}20` }]}>
              <FontAwesome name={icon as any} size={16} color={color} />
           </View>
           <Text style={styles.settingTitle}>{title}</Text>
        </View>
        <View style={styles.settingRight}>
           {value && <Text style={styles.settingValue}>{value}</Text>}
           {hasArrow && <FontAwesome name="angle-right" size={20} color={colors.muted} />}
        </View>
     </TouchableOpacity>
  );

  const renderToggleItem = (icon: string, title: string, color: string, key: keyof typeof toggles) => (
     <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
           <View style={[styles.settingIconBox, { backgroundColor: `${color}20` }]}>
              <FontAwesome name={icon as any} size={16} color={color} />
           </View>
           <Text style={styles.settingTitle}>{title}</Text>
        </View>
        <Switch 
           value={toggles[key]} 
           onValueChange={() => handleToggle(key)}
           trackColor={{ false: 'rgba(255,255,255,0.1)', true: colors.sky }}
           thumbColor={toggles[key] ? colors.white : colors.muted}
        />
     </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* NAVEGACIÓN */}
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <FontAwesome name="arrow-left" size={20} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>AJUSTES</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* 1. CABECERA PREMIUM */}
        <Card delay={100} style={styles.heroCard}>
           <Image source={{ uri: mockJugador.avatar }} style={styles.heroAvatar} />
           <View style={styles.heroInfo}>
              <Text style={styles.heroName}>{mockJugador.nombre}</Text>
              <Text style={styles.heroTeam}>{mockJugador.equipo} • {mockJugador.categoria}</Text>
           </View>
        </Card>

        {/* 2. MI PERFIL */}
        <Text style={styles.sectionTitle}>Mi Perfil Deportivo</Text>
        <Card delay={150} style={styles.settingsGroup}>
           {renderSettingItem('user', 'Nombre', colors.sky, mockJugador.nombre, false)}
           {renderSettingItem('shield', 'Equipo', colors.sky, mockJugador.equipo, false)}
           {renderSettingItem('tag', 'Categoría', colors.sky, mockJugador.categoria, false)}
           {renderSettingItem('hashtag', 'Dorsal', colors.sky, mockJugador.dorsal.toString(), false)}
           {renderSettingItem('street-view', 'Posición', colors.sky, mockJugador.posicion, false)}
           
           <TouchableOpacity style={styles.editBtn}>
              <FontAwesome name="camera" size={14} color={colors.navy} />
              <Text style={styles.editBtnText}>Editar fotografía de perfil</Text>
           </TouchableOpacity>
        </Card>

        {/* 3. NOTIFICACIONES */}
        <Text style={styles.sectionTitle}>Notificaciones Push</Text>
        <Card delay={200} style={styles.settingsGroup}>
           {renderToggleItem('list-alt', 'Convocatorias', '#22C55E', 'convocatorias')}
           {renderToggleItem('soccer-ball-o', 'Partidos', '#3B82F6', 'partidos')}
           {renderToggleItem('heartbeat', 'Entrenamientos', '#F97316', 'entrenamientos')}
           {renderToggleItem('trophy', 'Torneos', '#EAB308', 'torneos')}
           {renderToggleItem('commenting-o', 'Mensajes', '#A855F7', 'mensajes')}
           {renderToggleItem('bullseye', 'Retos', '#E11D48', 'retos')}
           {renderToggleItem('star', 'Insignias', '#F59E0B', 'insignias')}
           {renderToggleItem('newspaper-o', 'Noticias del club', colors.sky, 'noticias')}
        </Card>

        {/* 4. PREFERENCIAS */}
        <Text style={styles.sectionTitle}>Preferencias de la App</Text>
        <Card delay={250} style={styles.settingsGroup}>
           {renderSettingItem('globe', 'Idioma', colors.sky, 'Español', true)}
           {renderSettingItem('paint-brush', 'Tema', colors.sky, 'Modo Oscuro', true)}
           {renderSettingItem('font', 'Tamaño de texto', colors.sky, 'Mediano', true)}
           {renderToggleItem('magic', 'Animaciones', '#A855F7', 'animaciones')}
           {renderToggleItem('volume-up', 'Sonidos', '#22C55E', 'sonidos')}
           {renderToggleItem('mobile', 'Vibración', '#F97316', 'vibracion')}
        </Card>

        {/* 5. PRIVACIDAD */}
        <Text style={styles.sectionTitle}>Privacidad</Text>
        <Card delay={300} style={styles.settingsGroup}>
           {renderSettingItem('eye', 'Quién puede ver mi perfil', '#3B82F6', 'Solo mi equipo', true)}
           {renderSettingItem('bar-chart', 'Quién puede ver mis estadísticas', '#3B82F6', 'Cuerpo Técnico', true)}
           {renderSettingItem('camera', 'Permisos de cámara', '#3B82F6', 'Concedido', true)}
           {renderSettingItem('map-marker', 'Permisos de ubicación', '#3B82F6', 'Solo al usar la app', true)}
           {renderSettingItem('file-text-o', 'Política de privacidad', '#3B82F6', '', true)}
        </Card>

        {/* 6. SEGURIDAD */}
        <Text style={styles.sectionTitle}>Seguridad</Text>
        <Card delay={350} style={styles.settingsGroup}>
           {renderSettingItem('lock', 'Cambiar contraseña', '#E11D48', '', true)}
           {renderToggleItem('smile-o', 'Autenticación Face ID', '#EAB308', 'faceId')}
           {renderSettingItem('laptop', 'Dispositivos conectados', '#E11D48', '1 activo', true)}
           {renderSettingItem('sign-out', 'Cerrar todas las sesiones', '#E11D48', '', true)}
        </Card>

        {/* 7. AYUDA */}
        <Text style={styles.sectionTitle}>Ayuda y Soporte</Text>
        <Card delay={400} style={styles.settingsGroup}>
           {renderSettingItem('life-ring', 'Centro de ayuda', colors.success, '', true)}
           {renderSettingItem('question-circle', 'Preguntas frecuentes', colors.success, '', true)}
           {renderSettingItem('envelope', 'Contactar con el club', colors.success, '', true)}
           {renderSettingItem('lightbulb-o', 'Enviar sugerencias', colors.success, '', true)}
           {renderSettingItem('bug', 'Reportar un error', '#F97316', '', true)}
        </Card>

        {/* 8. INFORMACIÓN */}
        <Text style={styles.sectionTitle}>Información</Text>
        <Card delay={450} style={styles.settingsGroup}>
           {renderSettingItem('info-circle', 'Versión de la aplicación', colors.muted, '2.1.0', false)}
           {renderSettingItem('clock-o', 'Última actualización', colors.muted, '12 Oct 2026', false)}
           {renderSettingItem('certificate', 'Licencias', colors.muted, '', true)}
           {renderSettingItem('legal', 'Términos y condiciones', colors.muted, '', true)}
        </Card>

        {/* 9. CERRAR SESIÓN */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/')}>
           <FontAwesome name="power-off" size={16} color={colors.white} />
           <Text style={styles.logoutBtnText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <View style={{ height: 60 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0B1F4D' },
  container: { flex: 1 },
  content: { paddingHorizontal: spacing.l, paddingBottom: spacing.xxl },
  
  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.m, paddingTop: spacing.m },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  topNavTitle: { color: colors.white, fontSize: 16, fontWeight: '900', letterSpacing: 1 },

  heroCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: 20, borderRadius: 24, marginBottom: spacing.l },
  heroAvatar: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: colors.sky, marginRight: 16 },
  heroInfo: { flex: 1 },
  heroName: { color: colors.white, fontSize: 18, fontWeight: '900' },
  heroTeam: { color: colors.sky, fontSize: 13, fontWeight: '700', marginTop: 4 },

  sectionTitle: { color: colors.white, fontSize: 13, fontWeight: '900', marginTop: spacing.l, marginBottom: spacing.m, textTransform: 'uppercase', letterSpacing: 1, paddingLeft: 8 },

  settingsGroup: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', borderRadius: 24, overflow: 'hidden' },
  settingItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  settingLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  settingIconBox: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  settingTitle: { color: colors.white, fontSize: 14, fontWeight: '700' },
  settingRight: { flexDirection: 'row', alignItems: 'center' },
  settingValue: { color: colors.muted, fontSize: 13, fontWeight: '600', marginRight: 12 },

  editBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.sky, padding: 16, margin: 16, borderRadius: 16 },
  editBtnText: { color: colors.navy, fontSize: 13, fontWeight: '800', marginLeft: 8 },

  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E11D48', padding: 16, borderRadius: 20, marginTop: 40 },
  logoutBtnText: { color: colors.white, fontSize: 15, fontWeight: '900', marginLeft: 8 }
});
