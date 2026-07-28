import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Image, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Modal, 
  useWindowDimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';

// Palette de colores corporativos de CD Jesuitas (Estilo Apple Premium)
const colors = {
  navyDark: '#020814',
  navyDeep: '#0B1F4D',
  navyCard: 'rgba(15, 30, 70, 0.85)',
  skyPrimary: '#4FC3F7',
  skyGlow: '#81D4FA',
  accentGold: '#F59E0B',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  borderGlow: 'rgba(79, 195, 247, 0.3)',
  errorRed: '#EF4444',
  successGreen: '#10B981',
};

export default function LoginScreen() {
  const { loginWithEmail, resetPassword, user } = useAuth();
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();

  // Estados del Formulario de Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Estados del Modal de Recuperación de Contraseña
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Referencias para navegación con teclado (Enter)
  const passwordInputRef = useRef<TextInput>(null);

  const isDesktop = screenWidth >= 640;

  // Manejo del Login de Usuario
  const handleLogin = async () => {
    if (isLoading) return; // Impedir dobles pulsaciones

    setErrorMessage(null);

    // Validaciones Locales Previas
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMessage('El correo electrónico no es válido.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('El correo electrónico no es válido.');
      return;
    }

    if (!password) {
      setErrorMessage('La contraseña es obligatoria.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await loginWithEmail(cleanEmail, password);
      if (res.error) {
        setErrorMessage(res.error);
        setIsLoading(false);
      } else {
        // Redirección directa al área privada tras login correcto
        router.replace('/(drawer)/inicio' as any);
      }
    } catch (err) {
      setErrorMessage('Ha ocurrido un error inesperado.');
      setIsLoading(false);
    }
  };

  // Manejo del Envío de Restablecimiento de Contraseña
  const handleResetPassword = async () => {
    if (resetLoading) return;

    setResetMessage(null);
    const cleanEmail = resetEmail.trim();

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setResetMessage({ type: 'error', text: 'El correo electrónico no es válido.' });
      return;
    }

    setResetLoading(true);
    try {
      const res = await resetPassword(cleanEmail);
      setResetMessage({ type: 'success', text: res.message });
    } catch (err) {
      setResetMessage({ type: 'error', text: 'Ha ocurrido un error inesperado.' });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <LinearGradient colors={[colors.navyDeep, colors.navyDark]} style={styles.mainBackground}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView 
          contentContainerStyle={[styles.scrollContent, isDesktop && styles.scrollContentDesktop]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* TARJETA CONTENEDORA DEL LOGIN */}
          <View style={[styles.loginCard, isDesktop && styles.loginCardDesktop]}>
            
            {/* ESCUDO DE CD JESUITAS */}
            <View style={styles.shieldWrapper}>
              <Image 
                source={require('../assets/images/escudo-jesuitas.png')}
                style={styles.shieldImage}
                resizeMode="contain"
              />
            </View>

            {/* TÍTULO Y SUBTÍTULO INSTITUCIONAL */}
            <Text style={styles.titleText}>Bienvenido a CD Jesuitas</Text>
            <Text style={styles.subtitleText}>Accede a tu área deportiva</Text>

            {/* MENSAJE DE ERROR CLARO Y DISCRETO */}
            {errorMessage && (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle-outline" size={18} color={colors.errorRed} />
                <Text style={styles.errorBoxText}>{errorMessage}</Text>
              </View>
            )}

            {/* CAMPO: CORREO ELECTRÓNICO */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Correo electrónico</Text>
              <View style={styles.inputFieldRow}>
                <Ionicons name="mail-outline" size={20} color={colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="correo@ejemplo.com"
                  placeholderTextColor="rgba(148, 163, 184, 0.6)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  accessibilityLabel="Correo electrónico"
                />
              </View>
            </View>

            {/* CAMPO: CONTRASEÑA CON TOGGLE MOSTRAR/OCULTAR */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Contraseña</Text>
              <View style={styles.inputFieldRow}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  ref={passwordInputRef}
                  style={styles.textInput}
                  placeholder="Introduce tu contraseña"
                  placeholderTextColor="rgba(148, 163, 184, 0.6)"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                  accessibilityLabel="Contraseña"
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.togglePasswordBtn}
                  accessibilityLabel="Mostrar u ocultar contraseña"
                  accessibilityRole="button"
                >
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color={colors.textMuted} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* BOTÓN PRINCIPAL DE INICIO DE SESIÓN */}
            <TouchableOpacity 
              style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
              accessibilityLabel="Iniciar sesión"
              accessibilityRole="button"
            >
              {isLoading ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator color="#FFFFFF" size="small" />
                  <Text style={styles.submitButtonText}>Iniciando sesión...</Text>
                </View>
              ) : (
                <Text style={styles.submitButtonText}>Iniciar sesión</Text>
              )}
            </TouchableOpacity>

            {/* ENLACE DE RECUPERACIÓN DE CONTRASEÑA */}
            <TouchableOpacity 
              style={styles.forgotPasswordLink}
              onPress={() => {
                setResetEmail(email);
                setResetMessage(null);
                setShowResetModal(true);
              }}
              accessibilityRole="button"
            >
              <Text style={styles.forgotPasswordText}>He olvidado mi contraseña</Text>
            </TouchableOpacity>

          </View>

          {/* MENSAJE INFERIOR DISCRETO INSTITUCIONAL */}
          <Text style={styles.footerText}>Club Deportivo Colegio Jesuitas</Text>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* MODAL DE RECUPERACIÓN DE CONTRASEÑA */}
      <Modal
        visible={showResetModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowResetModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Restablecer contraseña</Text>
              <TouchableOpacity onPress={() => setShowResetModal(false)}>
                <Ionicons name="close" size={24} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSub}>
              Introduce el correo electrónico asociado a tu cuenta para recibir las instrucciones.
            </Text>

            {resetMessage && (
              <View style={[
                styles.modalMsgBox, 
                resetMessage.type === 'success' ? styles.modalSuccessBox : styles.modalErrorBox
              ]}>
                <Ionicons 
                  name={resetMessage.type === 'success' ? "checkmark-circle-outline" : "alert-circle-outline"} 
                  size={18} 
                  color={resetMessage.type === 'success' ? colors.successGreen : colors.errorRed} 
                />
                <Text style={[
                  styles.modalMsgText,
                  { color: resetMessage.type === 'success' ? colors.successGreen : colors.errorRed }
                ]}>
                  {resetMessage.text}
                </Text>
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Correo electrónico</Text>
              <View style={styles.inputFieldRow}>
                <Ionicons name="mail-outline" size={20} color={colors.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="correo@ejemplo.com"
                  placeholderTextColor="rgba(148, 163, 184, 0.6)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={resetEmail}
                  onChangeText={(text) => {
                    setResetEmail(text);
                    if (resetMessage) setResetMessage(null);
                  }}
                  accessibilityLabel="Correo electrónico para restablecer contraseña"
                />
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.submitButton, resetLoading && styles.submitButtonDisabled, { marginTop: 16 }]}
              onPress={handleResetPassword}
              disabled={resetLoading}
              accessibilityRole="button"
            >
              {resetLoading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.submitButtonText}>Enviar correo de recuperación</Text>
              )}
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
    minHeight: Platform.OS === 'web' ? ('100vh' as any) : '100%',
    backgroundColor: colors.navyDark,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  scrollContentDesktop: {
    paddingVertical: 60,
  },

  // TARJETA DE LOGIN PREMIUM CENTRADA
  loginCard: {
    width: '100%',
    backgroundColor: colors.navyCard,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.borderGlow,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  loginCardDesktop: {
    maxWidth: 420,
    padding: 32,
  },

  // ESCUDO E IDENTIDAD VISUAL
  shieldWrapper: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  shieldImage: {
    width: 64,
    height: 64,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitleText: {
    fontSize: 14,
    color: colors.skyGlow,
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
  },

  // CAJA DE ERRORES
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: colors.errorRed,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorBoxText: {
    flex: 1,
    color: colors.errorRed,
    fontSize: 12,
    fontWeight: '700',
  },

  // CAMPOS DE ENTRADA (FORM INPUTS)
  inputGroup: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  inputFieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 14,
    paddingHorizontal: 12,
    minHeight: 48,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 12,
  },
  togglePasswordBtn: {
    padding: 6,
  },

  // BOTÓN PRINCIPAL
  submitButton: {
    width: '100%',
    backgroundColor: colors.skyPrimary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: colors.skyPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: colors.navyDark,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  // ENLACES Y TEXTOS SECUNDARIOS
  forgotPasswordLink: {
    marginTop: 18,
    paddingVertical: 4,
  },
  forgotPasswordText: {
    color: colors.skyGlow,
    fontSize: 12,
    fontWeight: '700',
  },
  footerText: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 24,
    fontWeight: '600',
    textAlign: 'center',
  },

  // MODAL DE RECUPERACIÓN DE CONTRASEÑA
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.navyDeep,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderGlow,
    padding: 24,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.white,
  },
  modalSub: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 16,
    marginBottom: 16,
  },
  modalMsgBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 14,
    borderWidth: 1,
  },
  modalSuccessBox: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: colors.successGreen,
  },
  modalErrorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: colors.errorRed,
  },
  modalMsgText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
  },
});
