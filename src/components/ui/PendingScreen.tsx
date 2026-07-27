import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useReview } from '../../context/ReviewContext';

interface PendingScreenProps {
  title: string;
}

export function PendingScreen({ title }: PendingScreenProps) {
  const router = useRouter();
  const { activeReviewRole, activeReviewTeam } = useReview();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FontAwesome name="wrench" size={48} color="#81D4FA" style={{ marginBottom: 20 }} />
        
        <Text style={styles.statusBadge}>⚪ PANTALLA PENDIENTE DE REVISIÓN</Text>
        
        <Text style={styles.title}>{title}</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>Perfil activo: <Text style={styles.infoHighlight}>{activeReviewRole}</Text></Text>
          {(activeReviewRole === 'ENTRENADOR' || activeReviewRole === 'COORDINADOR') && (
            <Text style={styles.infoText}>Equipo activo: <Text style={styles.infoHighlight}>{activeReviewTeam}</Text></Text>
          )}
        </View>

        <TouchableOpacity style={styles.btnVolver} onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={16} color="#0B1F4D" />
          <Text style={styles.btnVolverText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1F4D',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  statusBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 32,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: 'rgba(79, 195, 247, 0.1)',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#4FC3F7',
    width: '100%',
    marginBottom: 40,
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
  },
  infoHighlight: {
    fontWeight: '900',
    color: '#4FC3F7',
  },
  btnVolver: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#81D4FA',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  btnVolverText: {
    color: '#0B1F4D',
    fontSize: 16,
    fontWeight: '900',
    marginLeft: 8,
  }
});
