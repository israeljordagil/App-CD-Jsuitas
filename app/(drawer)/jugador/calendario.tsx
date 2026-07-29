import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function JugadorCalendarioRedirectScreen() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/(drawer)/inicio');
  }, [router]);

  return (
    <View style={{ flex: 1, backgroundColor: '#071A3D', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#4FC3F7" />
    </View>
  );
}
