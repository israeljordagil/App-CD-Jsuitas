import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useDemoNavigation } from '../../context/DemoNavigationContext';
import { useSport } from '../../context/SportContext';
import { useDelegadoTheme } from '../../context/DelegadoThemeContext';
import { getMatchConfigForTeam } from '../../utils/teamConfig';

export function DelegadoAjustesView() {
  const router = useRouter();
  const { user, clearProfile } = useAuth();
  const { resetDemoFlow } = useDemoNavigation();
  const { setSport } = useSport();
  const { themePreference, setThemePreference, colors } = useDelegadoTheme();

  const assignedTeamName = 'Alevín A';
  const teamConfig = getMatchConfigForTeam(assignedTeamName);

  // 1. Notificaciones state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  // Modal feedback state
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const handleLogout = () => {
    resetDemoFlow();
    clearProfile();
    setSport(null);
    router.replace('/');
  };

  const dynamicStyles = getStyles(colors);

  return (
    <View style={dynamicStyles.container}>
      <ScrollView style={dynamicStyles.scroll} contentContainerStyle={dynamicStyles.scrollContent}>
        {/* HERO HEADER */}
        <LinearGradient colors={colors.heroGradient} style={dynamicStyles.heroCard}>
          <View style={dynamicStyles.heroBadge}>
            <Ionicons name="options-outline" size={16} color={colors.skyGlow} />
            <Text style={dynamicStyles.heroBadgeTxt}>CONFIGURACIÓN Y PREFERENCIAS DE CUENTA</Text>
          </View>
          <Text style={dynamicStyles.heroTitle}>Ajustes del Delegado</Text>
          <Text style={dynamicStyles.heroSub}>
            Gestión de perfil, preferencias de notificaciones, tema visual y seguridad de acceso.
          </Text>
        </LinearGradient>

        {/* TARJETA 1: MI PERFIL (MODO LECTURA) */}
        <View style={dynamicStyles.card}>
          <View style={dynamicStyles.cardHeader}>
            <View style={[dynamicStyles.iconCircle, { backgroundColor: 'rgba(79, 195, 247, 0.15)' }]}>
              <Ionicons name="person-circle-outline" size={22} color={colors.skyGlow} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.cardTitle}>1. Mi Perfil</Text>
              <Text style={dynamicStyles.cardSub}>Datos oficiales asignados en el club (Modo lectura)</Text>
            </View>
          </View>

          <View style={dynamicStyles.readOnlyGrid}>
            <View style={dynamicStyles.readOnlyItem}>
              <Text style={dynamicStyles.readOnlyLabel}>Nombre del Delegado:</Text>
              <Text style={dynamicStyles.readOnlyVal}>{user?.name || 'Israel Jordá Gil'}</Text>
            </View>

            <View style={dynamicStyles.readOnlyItem}>
              <Text style={dynamicStyles.readOnlyLabel}>Equipo asignado:</Text>
              <Text style={dynamicStyles.readOnlyVal}>{teamConfig.teamName}</Text>
            </View>

            <View style={dynamicStyles.readOnlyItem}>
              <Text style={dynamicStyles.readOnlyLabel}>Categoría y Formato:</Text>
              <Text style={dynamicStyles.readOnlyVal}>{teamConfig.category} ({teamConfig.formatLabel})</Text>
            </View>

            <View style={dynamicStyles.readOnlyItem}>
              <Text style={dynamicStyles.readOnlyLabel}>Cargo:</Text>
              <Text style={dynamicStyles.readOnlyVal}>Delegado de Equipo Oficial</Text>
            </View>
          </View>

          <View style={dynamicStyles.readOnlyNotice}>
            <Ionicons name="lock-closed-outline" size={14} color={colors.skyGlow} />
            <Text style={dynamicStyles.readOnlyNoticeTxt}>
              Datos protegidos. Para modificar tu asignación, ponte en contacto con la Dirección Deportiva.
            </Text>
          </View>
        </View>

        {/* TARJETA 2: NOTIFICACIONES (3 SWITCHES) */}
        <View style={dynamicStyles.card}>
          <View style={dynamicStyles.cardHeader}>
            <View style={[dynamicStyles.iconCircle, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
              <Ionicons name="notifications-outline" size={22} color={colors.accentGold} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.cardTitle}>2. Notificaciones</Text>
              <Text style={dynamicStyles.cardSub}>Preferencias de avisos y alertas en tu dispositivo</Text>
            </View>
          </View>

          <View style={dynamicStyles.switchList}>
            <View style={dynamicStyles.switchRow}>
              <View style={{ flex: 1 }}>
                <Text style={dynamicStyles.switchLabel}>Activar notificaciones</Text>
                <Text style={dynamicStyles.switchSub}>Recibir avisos de partidos, actas y mensajes</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#CBD5E1', true: colors.skyPrimary }}
                thumbColor={notificationsEnabled ? (colors.isDark ? colors.navyDark : '#FFFFFF') : '#94A3B8'}
              />
            </View>

            <View style={dynamicStyles.switchRow}>
              <View style={{ flex: 1 }}>
                <Text style={dynamicStyles.switchLabel}>Sonido</Text>
                <Text style={dynamicStyles.switchSub}>Emitir señal acústica al recibir avisos</Text>
              </View>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: '#CBD5E1', true: colors.skyPrimary }}
                thumbColor={soundEnabled ? (colors.isDark ? colors.navyDark : '#FFFFFF') : '#94A3B8'}
              />
            </View>

            <View style={dynamicStyles.switchRow}>
              <View style={{ flex: 1 }}>
                <Text style={dynamicStyles.switchLabel}>Vibración</Text>
                <Text style={dynamicStyles.switchSub}>Vibrar al recibir notificaciones de partido</Text>
              </View>
              <Switch
                value={vibrationEnabled}
                onValueChange={setVibrationEnabled}
                trackColor={{ false: '#CBD5E1', true: colors.skyPrimary }}
                thumbColor={vibrationEnabled ? (colors.isDark ? colors.navyDark : '#FFFFFF') : '#94A3B8'}
              />
            </View>
          </View>
        </View>

        {/* TARJETA 3: APARIENCIA (3 OPCIONES REALTIME) */}
        <View style={dynamicStyles.card}>
          <View style={dynamicStyles.cardHeader}>
            <View style={[dynamicStyles.iconCircle, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
              <Ionicons name="color-palette-outline" size={22} color={colors.accentGreen} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.cardTitle}>3. Apariencia</Text>
              <Text style={dynamicStyles.cardSub}>Selección visual de la interfaz de usuario</Text>
            </View>
          </View>

          <View style={dynamicStyles.themeOptionsRow}>
            <TouchableOpacity
              style={[
                dynamicStyles.themeChip,
                themePreference === 'Claro' && dynamicStyles.themeChipActive,
              ]}
              onPress={() => setThemePreference('Claro')}
              activeOpacity={0.85}
            >
              <Ionicons
                name="sunny-outline"
                size={18}
                color={themePreference === 'Claro' ? '#FFFFFF' : colors.white}
              />
              <Text
                style={[
                  dynamicStyles.themeChipTxt,
                  themePreference === 'Claro' && dynamicStyles.themeChipTxtActive,
                ]}
              >
                Claro
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                dynamicStyles.themeChip,
                themePreference === 'Oscuro' && dynamicStyles.themeChipActive,
              ]}
              onPress={() => setThemePreference('Oscuro')}
              activeOpacity={0.85}
            >
              <Ionicons
                name="moon-outline"
                size={18}
                color={themePreference === 'Oscuro' ? '#FFFFFF' : colors.white}
              />
              <Text
                style={[
                  dynamicStyles.themeChipTxt,
                  themePreference === 'Oscuro' && dynamicStyles.themeChipTxtActive,
                ]}
              >
                Oscuro
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                dynamicStyles.themeChip,
                themePreference === 'Automático' && dynamicStyles.themeChipActive,
              ]}
              onPress={() => setThemePreference('Automático')}
              activeOpacity={0.85}
            >
              <Ionicons
                name="desktop-outline"
                size={18}
                color={themePreference === 'Automático' ? '#FFFFFF' : colors.white}
              />
              <Text
                style={[
                  dynamicStyles.themeChipTxt,
                  themePreference === 'Automático' && dynamicStyles.themeChipTxtActive,
                ]}
              >
                Automático
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* TARJETA 4: SEGURIDAD (2 ACCIONES) */}
        <View style={dynamicStyles.card}>
          <View style={dynamicStyles.cardHeader}>
            <View style={[dynamicStyles.iconCircle, { backgroundColor: 'rgba(239, 68, 68, 0.15)' }]}>
              <Ionicons name="shield-checkmark-outline" size={22} color={colors.accentRed} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.cardTitle}>4. Seguridad y Cuenta</Text>
              <Text style={dynamicStyles.cardSub}>Gestión de credenciales y sesión activa</Text>
            </View>
          </View>

          <View style={dynamicStyles.actionsCol}>
            <TouchableOpacity
              style={dynamicStyles.secBtn}
              onPress={() => setModalMessage('Disponible próximamente')}
              activeOpacity={0.85}
            >
              <Ionicons name="key-outline" size={18} color={colors.skyGlow} />
              <Text style={dynamicStyles.secBtnTxt}>Cambiar contraseña</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[dynamicStyles.secBtn, dynamicStyles.logoutBtn]}
              onPress={handleLogout}
              activeOpacity={0.85}
            >
              <Ionicons name="log-out-outline" size={18} color={colors.accentRed} />
              <Text style={[dynamicStyles.secBtnTxt, { color: colors.accentRed }]}>Cerrar sesión</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.accentRed} />
            </TouchableOpacity>
          </View>
        </View>

        {/* TARJETA 5: INFORMACIÓN */}
        <View style={dynamicStyles.card}>
          <View style={dynamicStyles.cardHeader}>
            <View style={[dynamicStyles.iconCircle, { backgroundColor: 'rgba(129, 212, 250, 0.15)' }]}>
              <Ionicons name="information-circle-outline" size={22} color={colors.skyGlow} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.cardTitle}>5. Información de la Aplicación</Text>
              <Text style={dynamicStyles.cardSub}>Versión del sistema y documentos legales</Text>
            </View>
          </View>

          <View style={dynamicStyles.infoBox}>
            <View style={dynamicStyles.infoRow}>
              <Text style={dynamicStyles.infoLabel}>Aplicación:</Text>
              <Text style={dynamicStyles.infoVal}>APP CD Jesuitas</Text>
            </View>
            <View style={dynamicStyles.infoRow}>
              <Text style={dynamicStyles.infoLabel}>Versión actual:</Text>
              <Text style={dynamicStyles.infoVal}>v1.0.0 (Build 57)</Text>
            </View>
            <View style={dynamicStyles.infoRow}>
              <Text style={dynamicStyles.infoLabel}>Última actualización:</Text>
              <Text style={dynamicStyles.infoVal}>Agosto 2026</Text>
            </View>
          </View>

          <View style={dynamicStyles.legalLinksRow}>
            <TouchableOpacity
              style={dynamicStyles.legalLinkBtn}
              onPress={() => setModalMessage('Disponible próximamente')}
              activeOpacity={0.85}
            >
              <Ionicons name="document-text-outline" size={16} color={colors.skyGlow} />
              <Text style={dynamicStyles.legalLinkTxt}>Política de Privacidad</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={dynamicStyles.legalLinkBtn}
              onPress={() => setModalMessage('Disponible próximamente')}
              activeOpacity={0.85}
            >
              <Ionicons name="shield-outline" size={16} color={colors.skyGlow} />
              <Text style={dynamicStyles.legalLinkTxt}>Términos de Uso</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* FEEDBACK MODAL FOR PLACEHOLDERS */}
      <Modal
        visible={modalMessage !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setModalMessage(null)}
      >
        <View style={dynamicStyles.modalOverlay}>
          <View style={dynamicStyles.modalContent}>
            <Ionicons name="construct-outline" size={40} color={colors.accentGold} />
            <Text style={dynamicStyles.modalTitle}>Información</Text>
            <Text style={dynamicStyles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={dynamicStyles.modalCloseBtn}
              onPress={() => setModalMessage(null)}
              activeOpacity={0.85}
            >
              <Text style={dynamicStyles.modalCloseBtnTxt}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const getStyles = (colors: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.navyDark },
    scroll: { flex: 1 },
    scrollContent: { padding: 16, paddingBottom: 40 },

    heroCard: {
      padding: 20,
      borderRadius: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.borderGlow,
    },
    heroBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: 'rgba(129, 212, 250, 0.15)',
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
      marginBottom: 10,
    },
    heroBadgeTxt: {
      color: colors.skyGlow,
      fontSize: 11,
      fontWeight: '900',
      letterSpacing: 0.5,
    },
    heroTitle: {
      color: colors.white,
      fontSize: 22,
      fontWeight: '900',
      marginBottom: 4,
    },
    heroSub: {
      color: colors.textMuted,
      fontSize: 13,
      lineHeight: 18,
    },

    card: {
      backgroundColor: colors.navyCard,
      borderRadius: 16,
      marginBottom: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.borderGlow,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16,
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardTitle: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '800',
    },
    cardSub: {
      color: colors.textMuted,
      fontSize: 12,
      marginTop: 2,
    },

    // READ ONLY PROFILE
    readOnlyGrid: {
      backgroundColor: colors.subCardBg,
      padding: 12,
      borderRadius: 12,
      gap: 10,
      borderWidth: 1,
      borderColor: colors.borderGlow,
    },
    readOnlyItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    readOnlyLabel: {
      color: colors.textMuted,
      fontSize: 12,
      fontWeight: '700',
    },
    readOnlyVal: {
      color: colors.skyGlow,
      fontSize: 13,
      fontWeight: '800',
    },
    readOnlyNotice: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginTop: 10,
      paddingHorizontal: 4,
    },
    readOnlyNoticeTxt: {
      color: colors.textMuted,
      fontSize: 11,
      lineHeight: 15,
    },

    // SWITCHES
    switchList: {
      gap: 12,
    },
    switchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.subCardBg,
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.borderGlow,
    },
    switchLabel: {
      color: colors.white,
      fontSize: 14,
      fontWeight: '800',
    },
    switchSub: {
      color: colors.textMuted,
      fontSize: 11,
      marginTop: 2,
    },

    // THEME CHIPS
    themeOptionsRow: {
      flexDirection: 'row',
      gap: 8,
    },
    themeChip: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      backgroundColor: colors.subCardBg,
      paddingVertical: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.borderGlow,
    },
    themeChipActive: {
      backgroundColor: colors.skyPrimary,
      borderColor: colors.skyPrimary,
    },
    themeChipTxt: {
      color: colors.white,
      fontSize: 13,
      fontWeight: '800',
    },
    themeChipTxtActive: {
      color: '#FFFFFF',
      fontWeight: '900',
    },

    // SECURITY ACTIONS
    actionsCol: {
      gap: 10,
    },
    secBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      backgroundColor: colors.subCardBg,
      padding: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.borderGlow,
    },
    logoutBtn: {
      backgroundColor: 'rgba(239, 68, 68, 0.08)',
      borderColor: 'rgba(239, 68, 68, 0.2)',
    },
    secBtnTxt: {
      flex: 1,
      color: colors.white,
      fontSize: 14,
      fontWeight: '800',
    },

    // INFO & LEGAL LINKS
    infoBox: {
      backgroundColor: colors.subCardBg,
      padding: 12,
      borderRadius: 12,
      gap: 8,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.borderGlow,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    infoLabel: {
      color: colors.textMuted,
      fontSize: 12,
    },
    infoVal: {
      color: colors.white,
      fontSize: 13,
      fontWeight: '800',
    },

    legalLinksRow: {
      flexDirection: 'row',
      gap: 10,
    },
    legalLinkBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      backgroundColor: colors.subCardBg,
      paddingVertical: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.borderGlow,
    },
    legalLinkTxt: {
      color: colors.skyGlow,
      fontSize: 12,
      fontWeight: '800',
    },

    // MODAL
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContent: {
      backgroundColor: colors.navyCard,
      width: '100%',
      maxWidth: 380,
      padding: 24,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.skyGlow,
      alignItems: 'center',
    },
    modalTitle: {
      color: colors.white,
      fontSize: 18,
      fontWeight: '900',
      marginTop: 10,
      marginBottom: 6,
    },
    modalText: {
      color: colors.textMuted,
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 18,
    },
    modalCloseBtn: {
      backgroundColor: colors.skyPrimary,
      width: '100%',
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalCloseBtnTxt: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '900',
    },
  });
