import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  useWindowDimensions,
  Linking
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Colores corporativos de lujo
const colors = {
  navyDark: '#071A3D',
  navyCard: '#0B224F',
  skyPrimary: '#4FC3F7',
  skyGlow: '#81D4FA',
  accentGold: '#F59E0B',
  goldLight: '#FDE047',
  accentGreen: '#10B981',
  accentRed: '#EF4444',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  borderGlow: 'rgba(79, 195, 247, 0.25)',
};

const OFFICIAL_STORE_ITEMS = [
  { id: 's1', name: '1ª Equipación Oficial Azul', price: '45 €', icon: 'shirt-outline', desc: 'Camiseta + Pantalón' },
  { id: 's2', name: 'Chándal Oficial CD Jesuitas', price: '55 €', icon: 'body-outline', desc: 'Chaqueta + Pantalón' },
  { id: 's3', name: 'Sudadera de Entrenamiento', price: '32 €', icon: 'shirt-outline', desc: 'Tejido térmico azul' },
  { id: 's4', name: 'Mochila Oficial del Club', price: '25 €', icon: 'bag-handle-outline', desc: 'Con compartimento para botas' },
];

const DIRECTORY_CONTACTS = [
  { role: 'Dirección Deportiva', name: 'Félix Sanchis', email: 'deportes@cdjesuitas.es' },
  { role: 'Coordinador Fútbol 11', name: 'Carlos Ruiz', email: 'f11@cdjesuitas.es' },
  { role: 'Coordinador Fútbol 8', name: 'David Moreno', email: 'f8@cdjesuitas.es' },
  { role: 'Secretaría / Recibos', name: 'María José G.', email: 'administracion@cdjesuitas.es' },
];

export function FamiliaClub() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  const [activeTab, setActiveTab] = useState<'instalaciones' | 'tienda' | 'directorio' | 'reglamento'>('instalaciones');

  const handleOpenGps = () => {
    const location = "Avenida Cortes Valencianas 1, Valencia";
    const url = `https://maps.apple.com/?q=${encodeURIComponent(location)}`;
    Linking.openURL(url).catch(() => {});
  };

  const handleSendEmail = (email: string, role: string) => {
    const subject = `Consulta para ${role} - CD Jesuitas`;
    Linking.openURL(`mailto:${email}?subject=${encodeURIComponent(subject)}`).catch(() => {});
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} showsVerticalScrollIndicator={false}>
      
      {/* 1. HERO HEADER PANORÁMICO CON ESCUDO Y VALORES */}
      <View style={styles.clubHeroCard}>
        <LinearGradient colors={['rgba(11, 34, 79, 0.98)', 'rgba(7, 26, 61, 0.98)']} style={styles.heroGradient}>
          <Image 
            source={require('../../../assets/images/escudo_jesuitas_exact.png')} 
            style={styles.heroShieldImage}
            resizeMode="contain"
          />
          <Text style={styles.heroClubTitle}>CD JESUITAS VALENCIA</Text>
          <Text style={styles.heroClubSub}>Más que un club • Formación, Respeto y Pasión Deportiva</Text>
        </LinearGradient>
      </View>

      {/* 2. PESTAÑAS: INSTALACIONES vs TIENDA OFICIAL vs DIRECTORIO vs REGLAMENTO */}
      <View style={styles.tabsHeaderRow}>
        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'instalaciones' && styles.tabBtnActive]}
          onPress={() => setActiveTab('instalaciones')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'instalaciones' && styles.tabBtnTextActive]}>📍 Instalaciones</Text>
          {activeTab === 'instalaciones' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'tienda' && styles.tabBtnActive]}
          onPress={() => setActiveTab('tienda')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'tienda' && styles.tabBtnTextActive]}>🛍️ Tienda</Text>
          {activeTab === 'tienda' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'directorio' && styles.tabBtnActive]}
          onPress={() => setActiveTab('directorio')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'directorio' && styles.tabBtnTextActive]}>👥 Directorio</Text>
          {activeTab === 'directorio' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'reglamento' && styles.tabBtnActive]}
          onPress={() => setActiveTab('reglamento')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'reglamento' && styles.tabBtnTextActive]}>📜 Normativa</Text>
          {activeTab === 'reglamento' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
      </View>

      {activeTab === 'instalaciones' ? (
        /* PESTAÑA INSTALACIONES Y UBICACIÓN GPS */
        <View style={styles.sectionContainer}>
          
          <Text style={styles.sectionTitle}>📍 POLIDEPORTIVO Y CAMPOS CD JESUITAS</Text>
          
          <View style={styles.locationCard}>
            <Ionicons name="map-outline" size={36} color={colors.skyPrimary} />
            <Text style={styles.locationTitle}>Polideportivo Colegio San José (Jesuitas)</Text>
            <Text style={styles.locationAddress}>Avenida Cortes Valencianas, Nº 1 • 46015 Valencia</Text>

            <TouchableOpacity style={styles.gpsBtn} onPress={handleOpenGps}>
              <Ionicons name="navigate-circle-outline" size={18} color={colors.navyDark} />
              <Text style={styles.gpsBtnTxt}>Cómo Llegar con GPS (Apple/Google Maps)</Text>
            </TouchableOpacity>
          </View>

          {/* GUÍA DE SERVICIOS DEL POLIDEPORTIVO */}
          <Text style={styles.sectionTitle}>⚽ GUÍA DE SERVICIOS E INSTALACIONES</Text>
          <View style={styles.servicesGrid}>
            <View style={styles.serviceBox}>
              <FontAwesome name="futbol-o" size={20} color={colors.skyPrimary} />
              <Text style={styles.serviceBoxTitle}>Campos F11 y F8</Text>
              <Text style={styles.serviceBoxSub}>Césped artificial de última generación</Text>
            </View>

            <View style={styles.serviceBox}>
              <FontAwesome name="dribbble" size={20} color={colors.accentGold} />
              <Text style={styles.serviceBoxTitle}>Pabellón Cubierto</Text>
              <Text style={styles.serviceBoxSub}>Fútbol Sala y Baloncesto</Text>
            </View>

            <View style={styles.serviceBox}>
              <Ionicons name="cafe-outline" size={20} color={colors.goldLight} />
              <Text style={styles.serviceBoxTitle}>Cafetería / Bar</Text>
              <Text style={styles.serviceBoxSub}>Abierta en horario de partidos</Text>
            </View>

            <View style={styles.serviceBox}>
              <Ionicons name="medkit-outline" size={20} color={colors.accentGreen} />
              <Text style={styles.serviceBoxTitle}>Zona Cardioprotegida</Text>
              <Text style={styles.serviceBoxSub}>Desfibrilador DEA + Servicio médico</Text>
            </View>
          </View>

        </View>
      ) : activeTab === 'tienda' ? (
        /* PESTAÑA TIENDA OFICIAL DE EQUIPACIONES */
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>🛍️ TIENDA OFICIAL Y EQUIPACIONES</Text>
          <Text style={styles.sectionSub}>La ropa se recoge directamente en la Secretaría del club en horario de 16:30h a 19:30h.</Text>

          <View style={styles.storeGrid}>
            {OFFICIAL_STORE_ITEMS.map(item => (
              <View key={item.id} style={styles.storeItemCard}>
                <View style={styles.storeItemIconCircle}>
                  <Ionicons name={item.icon as any} size={28} color={colors.skyPrimary} />
                </View>
                <Text style={styles.storeItemName}>{item.name}</Text>
                <Text style={styles.storeItemDesc}>{item.desc}</Text>
                <View style={styles.storePriceRow}>
                  <Text style={styles.storeItemPrice}>{item.price}</Text>
                  <TouchableOpacity style={styles.btnReserveStore}>
                    <Text style={styles.btnReserveStoreTxt}>Reservar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      ) : activeTab === 'directorio' ? (
        /* PESTAÑA DIRECTORIO Y CONTACTOS */
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>👥 DIRECTORIO Y RESPONSABLES DEL CLUB</Text>

          {DIRECTORY_CONTACTS.map((item, idx) => (
            <View key={idx} style={styles.contactRowCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactRoleTitle}>{item.role}</Text>
                <Text style={styles.contactPersonName}>{item.name}</Text>
                <Text style={styles.contactEmailTxt}>{item.email}</Text>
              </View>

              <TouchableOpacity 
                style={styles.contactMailBtn}
                onPress={() => handleSendEmail(item.email, item.role)}
              >
                <Ionicons name="mail" size={16} color={colors.navyDark} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        /* PESTAÑA NORMATIVA Y RÉGIMEN INTERNO */
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>📜 RÉGIMEN INTERNO Y PROTOCOLOS</Text>

          <View style={styles.docCard}>
            <Ionicons name="document-text-outline" size={24} color={colors.skyPrimary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.docTitle}>Reglamento de Régimen Interno CD Jesuitas</Text>
              <Text style={styles.docSub}>Normas de conducta, puntualidad y vestimenta oficial.</Text>
            </View>
          </View>

          <View style={styles.docCard}>
            <Ionicons name="shield-checkmark-outline" size={24} color={colors.accentGreen} />
            <View style={{ flex: 1 }}>
              <Text style={styles.docTitle}>Protocolo de Actuación en Caso de Lesión</Text>
              <Text style={styles.docSub}>Pasos para hacer uso del Seguro Deportivo Federativo.</Text>
            </View>
          </View>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 16, paddingBottom: 60 },
  contentTablet: { maxWidth: 900, alignSelf: 'center', width: '100%' },

  // HERO CARD
  clubHeroCard: { borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGlow, backgroundColor: colors.navyCard, marginBottom: 20 },
  heroGradient: { padding: 24, alignItems: 'center' },
  heroShieldImage: { width: 70, height: 70, marginBottom: 12 },
  heroClubTitle: { color: colors.white, fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  heroClubSub: { color: colors.skyGlow, fontSize: 11, fontWeight: '700', marginTop: 4, textAlign: 'center' },

  // TABS
  tabsHeaderRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)', marginBottom: 16 },
  tabBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', position: 'relative' },
  tabBtnActive: {},
  tabBtnText: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  tabBtnTextActive: { color: colors.skyPrimary, fontWeight: '900' },
  tabUnderline: { position: 'absolute', bottom: -1, left: '15%', right: '15%', height: 3, backgroundColor: colors.skyPrimary, borderRadius: 1.5 },

  // SECCIONES
  sectionContainer: { gap: 12 },
  sectionTitle: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginBottom: 4 },
  sectionSub: { color: colors.textMuted, fontSize: 11, marginBottom: 12 },

  // INSTALACIONES
  locationCard: { backgroundColor: colors.navyCard, borderRadius: 20, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: colors.borderGlow, gap: 6, marginBottom: 16 },
  locationTitle: { color: colors.white, fontSize: 14, fontWeight: '900', textAlign: 'center', marginTop: 4 },
  locationAddress: { color: colors.textMuted, fontSize: 11, textAlign: 'center' },
  gpsBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.skyPrimary, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, marginTop: 8 },
  gpsBtnTxt: { color: colors.navyDark, fontSize: 11, fontWeight: '900' },

  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  serviceBox: { width: '48%', backgroundColor: colors.navyCard, borderRadius: 16, padding: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', gap: 4 },
  serviceBoxTitle: { color: colors.white, fontSize: 12, fontWeight: '800', marginTop: 4 },
  serviceBoxSub: { color: colors.textMuted, fontSize: 10 },

  // TIENDA
  storeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  storeItemCard: { width: '48%', backgroundColor: colors.navyCard, borderRadius: 18, padding: 12, borderWidth: 1, borderColor: colors.borderGlow, gap: 4 },
  storeItemIconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(79, 195, 247, 0.15)', justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  storeItemName: { color: colors.white, fontSize: 12, fontWeight: '900' },
  storeItemDesc: { color: colors.textMuted, fontSize: 10 },
  storePriceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  storeItemPrice: { color: colors.goldLight, fontSize: 14, fontWeight: '900' },
  btnReserveStore: { backgroundColor: colors.skyPrimary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  btnReserveStoreTxt: { color: colors.navyDark, fontSize: 10, fontWeight: '900' },

  // DIRECTORIO
  contactRowCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.navyCard, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', gap: 10 },
  contactRoleTitle: { color: colors.skyGlow, fontSize: 11, fontWeight: '800' },
  contactPersonName: { color: colors.white, fontSize: 13, fontWeight: '900', marginTop: 1 },
  contactEmailTxt: { color: colors.textMuted, fontSize: 11, marginTop: 1 },
  contactMailBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.skyPrimary, justifyContent: 'center', alignItems: 'center' },

  // NORMATIVA
  docCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.navyCard, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: colors.borderGlow }
});
