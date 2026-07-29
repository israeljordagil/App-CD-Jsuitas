import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';

export default function RetosRedirectScreen() {
  const router = useRouter();
  const { activeContext } = useAuth();

  useEffect(() => {
    if (activeContext === 'FAMILIA') {
      router.replace('/(drawer)/mi-zona');
    } else {
      router.replace('/(drawer)/inicio');
    }
  }, [activeContext, router]);

  return (
    <View style={{ flex: 1, backgroundColor: '#071A3D', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#4FC3F7" />
    </View>
  );
}
