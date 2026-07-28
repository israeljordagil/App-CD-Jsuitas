import React, { useState, useEffect } from 'react';
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
  Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase, isSupabaseConfigured } from '../src/lib/supabase';
import { useAuth } from '../src/context/AuthContext';

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

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { logout } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isRecoveryValid, setIsRecoveryValid] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Validar sesión de recuperación específica
  useEffect(() => {
    let mounted = true;

    // 1. En Web: comprobar si la URL contiene el parámetro hash de tipo recovery
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const hash = window.location.hash || '';
      const search = window.location.search || '';
      if (hash.includes('type=recovery') || search.includes('type=recovery')) {
        if (mounted) setIsRecoveryValid(true);
      }
    }

    // 2. Escuchar el evento oficial PASSWORD_RECOVERY de Supabase Auth
    let authListener: any = null;
    if (supabase && isSupabaseConfigured) {
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        if (!mounted) return;
        if (event === 'PASSWORD_RECOVERY') {
          setIsRecoveryValid(true);
        }
        setIsCheckingSession(false);
      });
      authListener = data.subscription;

      // Verificar si getSession indica recuperación
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!mounted) return;
        if (session) {
          if (Platform.OS === 'web' && (window.location.hash.includes('type=recovery') || window.location.search.includes('type=recovery'))) {
            setIsRecoveryValid(true);
          }
        }
        setIsCheckingSession(false);
      }).catch(() => {
        if (mounted) setIsCheckingSession(false);
      });
    } else {
      if (mounted) setIsCheckingSession(false);
    }

    return () => {
      mounted = false;
      if (authListener) authListener.unsubscribe();
    };
  }, []);

  const handleUpdatePassword = async () => {
    if (isLoading) return;

    setErrorMessage(null);
    setSuccessMessage(null);

    if (!password || password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    if (!supabase || !isSupabaseConfigured) {
      setErrorMessage('No se ha podido conectar con Supabase.');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setErrorMessage('El enlace de recuperación ha caducado o no es válido.');
        setIsLoading(false);
        return;
      }

      // 1. Cierre de sesión obligatorio para eliminar la sesión de recuperación
      if (supabase) {
        await supabase.auth.signOut();
      }
      await logout();

      // 2. Mensaje exacto de confirmación
      setSuccessMessage('Tu contraseña se ha actualizado correctamente.');
      setIsLoading(false);

      // 3. Redirección limpia a /login sin sesión activa
      setTimeout(() => {
        router.replace('/login');
      }, 2000);

    } catch (err) {
      setErrorMessage('Ha ocurrido un error inesperado.');
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return (
      <View style={[styles.mainBackground, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.skyPrimary} />
      </View>
    );
  }

  return (
    <LinearGradient colors={[colors.navyDeep, colors.navyDark]} style={styles.mainBackground}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            
            <View style={styles.shieldWrapper}>
              <Image 
                source={require('../assets/images/escudo-jesuitas.png')}
                style={styles.shieldImage}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.titleText}>Nueva Contraseña</Text>
            <Text style={styles.subtitleText}>Establece una contraseña segura para tu cuenta</Text>

            {!isRecoveryValid && !successMessage ? (
              <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={styles.errorBox}>
                  <Ionicons name="alert-circle-outline" size={20} color={colors.errorRed} />
                  <Text style={styles.errorBoxText}>
                    El enlace de recuperación es inválido, ha caducado o no se ha detectado el evento de recuperación.
                  </Text>
                </View>

                <TouchableOpacity 
                  style={styles.submitButton}
                  onPress={() => router.replace('/login')}
                >
                  <Text style={styles.submitButtonText}>Volver a Iniciar Sesión</Text>
                </TouchableOpacity>
              </View>
            ) : successMessage ? (
              <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={styles.successBox}>
                  <Ionicons name="checkmark-circle-outline" size={22} color={colors.successGreen} />
                  <Text style={styles.successBoxText}>{successMessage}</Text>
                </View>

                <TouchableOpacity 
                  style={styles.submitButton}
                  onPress={() => router.replace('/login')}
                >
                  <Text style={styles.submitButtonText}>Ir a Iniciar Sesión</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ width: '100%' }}>
                {errorMessage && (
                  <View style={styles.errorBox}>
                    <Ionicons name="alert-circle-outline" size={18} color={colors.errorRed} />
                    <Text style={styles.errorBoxText}>{errorMessage}</Text>
                  </View>
                )}

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nueva contraseña</Text>
                  <View style={styles.inputFieldRow}>
                    <Ionicons name="lock-closed-outline" size={20} color={colors.textMuted} style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Mínimo 6 caracteres"
                      placeholderTextColor="rgba(148, 163, 184, 0.6)"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      accessibilityLabel="Nueva contraseña"
                    />
                    <TouchableOpacity 
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.togglePasswordBtn}
                    >
                      <Ionicons 
                        name={showPassword ? "eye-off-outline" : "eye-outline"} 
                        size={20} 
                        color={colors.textMuted} 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Confirmar nueva contraseña</Text>
                  <View style={styles.inputFieldRow}>
                    <Ionicons name="lock-closed-outline" size={20} color={colors.textMuted} style={styles.inputIcon} />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Repite la contraseña"
                      placeholderTextColor="rgba(148, 163, 184, 0.6)"
                      secureTextEntry={!showPassword}
                      value={confirmPassword}
                      onChangeText={(text) => {
                        setConfirmPassword(text);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      accessibilityLabel="Confirmar contraseña"
                    />
                  </View>
                </View>

                <TouchableOpacity 
                  style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
                  onPress={handleUpdatePassword}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text style={styles.submitButtonText}>Guardar contraseña</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}

          </View>

          <Text style={styles.footerText}>Club Deportivo Colegio Jesuitas</Text>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
    minHeight: Platform.OS === 'web' ? ('100vh' as any) : '100%',
    backgroundColor: colors.navyDark,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.navyCard,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.borderGlow,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  shieldWrapper: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  shieldImage: {
    width: 56,
    height: 56,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 13,
    color: colors.skyGlow,
    textAlign: 'center',
    marginBottom: 20,
  },
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
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: colors.successGreen,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  successBoxText: {
    flex: 1,
    color: colors.successGreen,
    fontSize: 13,
    fontWeight: '700',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: 6,
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
    paddingVertical: 10,
  },
  togglePasswordBtn: {
    padding: 6,
  },
  submitButton: {
    width: '100%',
    backgroundColor: colors.skyPrimary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: colors.navyDark,
    fontSize: 14,
    fontWeight: '900',
  },
  footerText: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 24,
    fontWeight: '600',
  },
});
