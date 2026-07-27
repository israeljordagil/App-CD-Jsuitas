import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
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

const MOCK_TOURNAMENTS = {
  p1: {
    childName: 'Pablo Martínez',
    team: 'Cadete B (Fútbol 11)',
    featuredTournament: {
      id: 't1',
      title: 'COSTA BLANCA CUP 2026',
      category: 'Categoría Cadete B',
      dates: 'Viernes 5 al Domingo 7 de Junio 2026',
      city: 'Benidorm (Alicante)',
      hotel: 'Hotel Gran Bali 4★ (Benidorm)',
      busDeparture: 'Viernes 5 Junio • 16:00h (Puerta Colegio)',
      busReturn: 'Domingo 7 Junio • 20:00h (Puerta Colegio)',
      
      // INFORMACIÓN ECONÓMICA Y PLAZO
      price: '180 €',
      paymentDeadline: '15 de Noviembre de 2026',
      paymentMethod: 'Domiciliación en cuenta bancaria habitual del club',
      confirmationStatus: 'pending', // confirmed, declined, pending
      
      breakdown: [
        '🚌 Autobús expedición CD Jesuitas (Ida y Vuelta)',
        '🏨 2 Noches en Hotel Gran Bali 4★ (Pensión Completa)',
        '🎟️ Inscripción oficial al torneo + Seguro médico deportivo',
        '👕 Camiseta conmemorativa del torneo'
      ],

      authorizationSigned: true,
      groupStage: [
        { id: 'g1', match: 'CD Jesuitas vs Villarreal CF', date: 'Sáb 6 Junio • 10:00h', pitch: 'Campo 1 Benidorm' },
        { id: 'g2', match: 'CD Jesuitas vs Elche CF', date: 'Sáb 6 Junio • 17:30h', pitch: 'Campo 2 Benidorm' },
        { id: 'g3', match: 'CD Jesuitas vs Murcia CF', date: 'Dom 7 Junio • 11:00h', pitch: 'Campo Principal' },
      ],
      checklist: [
        { id: 'l1', label: '🆔 DNI Original + Tarjeta Sanitaria (OBLIGATORIO)', checked: true },
        { id: 'l2', label: '👕 1ª Equipación Azul + 2ª Equipación Blanca', checked: true },
        { id: 'l3', label: '👟 Botas de fútbol + 2 pares de espinilleras', checked: true },
        { id: 'l4', label: '🧥 Chándal y sudadera oficial CD Jesuitas', checked: true },
        { id: 'l5', label: '🧴 Neceser de aseo, chancletas y crema solar', checked: false }
      ]
    },
    pastTournaments: [
      { id: 'tp1', name: 'Torneo de Pascua Marina d\'Or', date: 'Abril 2026', result: '🏆 Campeones de Consolación' }
    ]
  },
  p2: {
    childName: 'Hugo Martínez',
    team: 'Infantil A (Fútbol Sala)',
    featuredTournament: {
      id: 't2',
      title: 'TORNEO NACIONAL FUTSAL PASCUA',
      category: 'Categoría Infantil A',
      dates: 'Viernes 12 al Domingo 14 de Junio 2026',
      city: 'Castellón de la Plana',
      hotel: 'Hotel Luz Castellón 4★',
      busDeparture: 'Viernes 12 Junio • 17:00h (Puerta Colegio)',
      busReturn: 'Domingo 14 Junio • 19:30h (Puerta Colegio)',
      
      price: '150 €',
      paymentDeadline: '15 de Noviembre de 2026',
      paymentMethod: 'Domiciliación en cuenta bancaria habitual del club',
      confirmationStatus: 'pending',

      breakdown: [
        '🚌 Autobús expedición CD Jesuitas',
        '🏨 2 Noches Hotel 4★ en Pensión Completa',
        '🎟️ Inscripción Futsal + Seguro'
      ],

      authorizationSigned: false,
      groupStage: [
        { id: 'g1', match: 'CD Jesuitas Futsal vs Dominicos', date: 'Sáb 13 Junio • 11:00h', pitch: 'Pabellón Ciutat de Castelló' },
        { id: 'g2', match: 'CD Jesuitas Futsal vs Pozo Murcia', date: 'Sáb 13 Junio • 18:00h', pitch: 'Pabellón Ciutat de Castelló' },
      ],
      checklist: [
        { id: 'l1', label: '🆔 DNI Original + Tarjeta Sanitaria (OBLIGATORIO)', checked: true },
        { id: 'l2', label: '👟 2 Pares de Zapatillas Futsal de suela lisa', checked: true },
        { id: 'l3', label: '👕 Equipaciones de juego Futsal', checked: true }
      ]
    },
    pastTournaments: []
  }
};

export function FamiliaTorneosView() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  const [selectedChildKey, setSelectedChildKey] = useState<'p1' | 'p2'>('p1');
  const [activeTab, setActiveTab] = useState<'proximo' | 'historial'>('proximo');
  
  const tournamentData = MOCK_TOURNAMENTS[selectedChildKey];
  const tour = tournamentData.featuredTournament;

  const [myConfirmation, setMyConfirmation] = useState<'confirmed' | 'declined' | 'pending'>(tour.confirmationStatus as any);
  const [isSigned, setIsSigned] = useState(tour.authorizationSigned);
  const [checklistItems, setChecklistItems] = useState(tour.checklist);
  
  // MODAL DE CONFIRMACIÓN CON NOTIFICACIÓN DE DOMICILIACIÓN BANCARIA DEL CLUB Y FECHA LÍMITE
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const toggleChecklistItem = (id: string) => {
    setChecklistItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleOpenHotelMaps = () => {
    const url = `https://maps.apple.com/?q=${encodeURIComponent(tour.hotel)}`;
    Linking.openURL(url).catch(() => {});
  };

  const handlePressConfirmButton = () => {
    setIsConfirmModalOpen(true);
  };

  const handleAcceptConfirmationModal = () => {
    setMyConfirmation('confirmed');
    setIsConfirmModalOpen(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} showsVerticalScrollIndicator={false}>
      
      {/* 1. SELECTOR DE HIJO */}
      <View style={styles.childSelectorRow}>
        <TouchableOpacity 
          style={[styles.childBtn, selectedChildKey === 'p1' && styles.childBtnActive]}
          onPress={() => {
            setSelectedChildKey('p1');
            setChecklistItems(MOCK_TOURNAMENTS.p1.featuredTournament.checklist);
            setMyConfirmation(MOCK_TOURNAMENTS.p1.featuredTournament.confirmationStatus as any);
          }}
        >
          <Text style={[styles.childBtnText, selectedChildKey === 'p1' && styles.childBtnTextActive]}>👦 Pablo (Cadete B Fútbol)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.childBtn, selectedChildKey === 'p2' && styles.childBtnActive]}
          onPress={() => {
            setSelectedChildKey('p2');
            setChecklistItems(MOCK_TOURNAMENTS.p2.featuredTournament.checklist);
            setMyConfirmation(MOCK_TOURNAMENTS.p2.featuredTournament.confirmationStatus as any);
          }}
        >
          <Text style={[styles.childBtnText, selectedChildKey === 'p2' && styles.childBtnTextActive]}>👦 Hugo (Infantil A Futsal)</Text>
        </TouchableOpacity>
      </View>

      {/* 2. PESTAÑAS: PRÓXIMO TORNEO vs HISTORIAL */}
      <View style={styles.tabsHeaderRow}>
        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'proximo' && styles.tabBtnActive]}
          onPress={() => setActiveTab('proximo')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'proximo' && styles.tabBtnTextActive]}>🏆 Próximo Torneo / Viaje</Text>
          {activeTab === 'proximo' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'historial' && styles.tabBtnActive]}
          onPress={() => setActiveTab('historial')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'historial' && styles.tabBtnTextActive]}>📜 Torneos Pasados</Text>
          {activeTab === 'historial' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
      </View>

      {activeTab === 'proximo' ? (
        <>
          {/* 3. HERO CARD DEL TORNEO DESTACADO */}
          <View style={styles.tourHeroCard}>
            <LinearGradient colors={['rgba(11, 34, 79, 0.98)', 'rgba(7, 26, 61, 0.98)']} style={styles.tourGradient}>
              
              <View style={styles.tourHeaderRow}>
                <View style={styles.trophyCircle}>
                  <FontAwesome name="trophy" size={24} color={colors.accentGold} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.tourCategory}>{tour.category}</Text>
                  <Text style={styles.tourTitle}>{tour.title}</Text>
                </View>
              </View>

              {/* Información Logística Clave */}
              <View style={styles.infoGrid}>
                <View style={styles.infoRow}>
                  <Ionicons name="calendar-outline" size={16} color={colors.skyPrimary} />
                  <Text style={styles.infoTxtBold}>{tour.dates}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="location-outline" size={16} color={colors.skyPrimary} />
                  <Text style={styles.infoTxt}>Ciudad: {tour.city}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="bed-outline" size={16} color={colors.goldLight} />
                  <Text style={styles.infoTxtBold}>Hotel Expedición: <Text style={{color: colors.goldLight}}>{tour.hotel}</Text></Text>
                </View>
              </View>

              {/* DATOS DEL AUTOBÚS DE LA EXPEDICIÓN */}
              <View style={styles.busInfoBox}>
                <View style={styles.busHeaderRow}>
                  <Ionicons name="bus-outline" size={18} color={colors.skyGlow} />
                  <Text style={styles.busTitle}>AUTOBÚS EXPEDICIÓN CD JESUITAS</Text>
                </View>
                <Text style={styles.busTxt}>Salida: <Text style={{fontWeight: '900', color: colors.white}}>{tour.busDeparture}</Text></Text>
                <Text style={styles.busTxt}>Regreso: <Text style={{fontWeight: '900', color: colors.white}}>{tour.busReturn}</Text></Text>
              </View>

              <TouchableOpacity style={styles.hotelMapBtn} onPress={handleOpenHotelMaps}>
                <Ionicons name="navigate-circle-outline" size={16} color={colors.navyDark} />
                <Text style={styles.hotelMapBtnTxt}>Ver Ubicación del Hotel en Maps</Text>
              </TouchableOpacity>

            </LinearGradient>
          </View>

          {/* 4. INFORMACIÓN ECONÓMICA & ACCIONES CON MENSAJE DE DOMICILIACIÓN DEL CLUB Y FECHA LÍMITE */}
          <Text style={styles.sectionTitle}>💶 INFORMACIÓN ECONÓMICA & RESERVA DE PLAZA</Text>
          <View style={styles.economicCard}>
            
            <View style={styles.priceRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.priceLabel}>PRECIO POR JUGADOR:</Text>
                <Text style={styles.priceValue}>{tour.price}</Text>
              </View>

              <View style={styles.deadlineBadge}>
                <Ionicons name="time" size={14} color={colors.navyDark} />
                <Text style={styles.deadlineTxt}>FECHA LÍMITE: {tour.paymentDeadline}</Text>
              </View>
            </View>

            {/* Desglose de lo que incluye el precio */}
            <View style={styles.breakdownBox}>
              <Text style={styles.breakdownTitle}>¿QUÉ INCLUYE EL PRECIO DEL TORNEO?</Text>
              {tour.breakdown.map((item, idx) => (
                <Text key={idx} style={styles.breakdownItem}>{item}</Text>
              ))}
            </View>

            {/* BOTONES DE CONFIRMACIÓN */}
            <View style={styles.threeButtonsCol}>
              
              {/* BOTÓN 1: CONFIRMAR Y RESERVAR PLAZA */}
              <TouchableOpacity 
                style={[styles.btnActionMassive, styles.btnConfirmGreen, myConfirmation === 'confirmed' && styles.btnActiveGlow]}
                onPress={handlePressConfirmButton}
              >
                <Ionicons name="checkmark-circle" size={20} color={colors.navyDark} />
                <Text style={styles.btnConfirmGreenTxt}>
                  {myConfirmation === 'confirmed' ? '✓ PLAZA CONFIRMADA Y RESERVADA' : 'CONFIRMAR Y RESERVAR PLAZA'}
                </Text>
              </TouchableOpacity>

              {/* BOTÓN 2: NO ASISTIRÉ */}
              <TouchableOpacity 
                style={[styles.btnActionMassive, styles.btnDeclineRed, myConfirmation === 'declined' && styles.btnActiveGlowRed]}
                onPress={() => setMyConfirmation('declined')}
              >
                <Ionicons name="close-circle-outline" size={18} color={colors.accentRed} />
                <Text style={styles.btnDeclineRedTxt}>
                  {myConfirmation === 'declined' ? '✓ NO ASISTIRÁ AL TORNEO' : 'NO ASISTIRÉ'}
                </Text>
              </TouchableOpacity>

            </View>

          </View>

          {/* 5. AUTORIZACIÓN OFICIAL DE VIAJE DEL MENOR */}
          <Text style={styles.sectionTitle}>✍️ AUTORIZACIÓN DE VIAJE DEL MENOR</Text>
          <View style={styles.authCard}>
            <View style={styles.authHeader}>
              <Ionicons 
                name={isSigned ? 'checkmark-circle' : 'document-text-outline'} 
                size={22} 
                color={isSigned ? colors.accentGreen : colors.accentGold} 
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.authTitle}>Autorización del Padre/Madre/Tutor</Text>
                <Text style={styles.authSub}>
                  {isSigned ? '🟢 Firmada digitalmente por la familia' : '🔴 Pendiente de firma digital de los padres'}
                </Text>
              </View>
            </View>

            {!isSigned && (
              <TouchableOpacity style={styles.signBtn} onPress={() => setIsSigned(true)}>
                <Ionicons name="pencil" size={14} color={colors.navyDark} />
                <Text style={styles.signBtnTxt}>Firmar Autorización Online</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* 6. CALENDARIO DE LA FASE DE GRUPOS DEL TORNEO */}
          <Text style={styles.sectionTitle}>⚽ CALENDARIO FASE DE GRUPOS</Text>
          <View style={styles.groupStageCard}>
            {tour.groupStage.map(m => (
              <View key={m.id} style={styles.groupMatchRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.groupMatchTitle}>{m.match}</Text>
                  <Text style={styles.groupMatchDate}>📍 {m.pitch}</Text>
                </View>
                <View style={styles.groupDateBadge}>
                  <Text style={styles.groupDateBadgeTxt}>{m.date}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* 7. CHECKLIST DE MALETA DE TORNEO (2-3 DÍAS) */}
          <Text style={styles.sectionTitle}>🎒 CHECKLIST DE LA MALETA DE VIAJE</Text>
          <View style={styles.checklistCard}>
            {checklistItems.map(item => (
              <TouchableOpacity 
                key={item.id}
                style={styles.checkItemRow}
                onPress={() => toggleChecklistItem(item.id)}
              >
                <View style={[styles.checkBox, item.checked && styles.checkBoxChecked]}>
                  {item.checked && <Ionicons name="checkmark" size={14} color={colors.navyDark} />}
                </View>
                <Text style={[styles.checkLabel, item.checked && styles.checkLabelChecked]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        /* HISTORIAL DE TORNEOS PASADOS */
        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>HISTORIAL DE TORNEOS DISPUTADOS</Text>
          
          {tournamentData.pastTournaments.length === 0 ? (
            <View style={styles.noHistoryCard}>
              <Text style={{ color: colors.textMuted, fontSize: 12 }}>Sin torneos anteriores disputados esta temporada.</Text>
            </View>
          ) : (
            tournamentData.pastTournaments.map(t => (
              <View key={t.id} style={styles.historyCard}>
                <Text style={styles.hTitle}>{t.name}</Text>
                <Text style={styles.hDate}>{t.date}</Text>
                <Text style={styles.hResult}>{t.result}</Text>
              </View>
            ))
          )}
        </View>
      )}

      {/* MODAL EMERGENTE AL CONFIRMAR LA PLAZA CON EL MENSAJE DE DOMICILIACIÓN DEL CLUB Y FECHA LÍMITE */}
      <Modal visible={isConfirmModalOpen} transparent animationType="fade">
        <View style={styles.modalBgCenter}>
          <View style={styles.modalCardCenter}>
            <Ionicons name="checkmark-circle" size={54} color={colors.accentGreen} />
            <Text style={styles.modalTitleCenter}>RESERVA DE PLAZA CONFIRMADA</Text>
            
            <View style={styles.noticeBox}>
              <Text style={styles.noticeTxt}>
                💳 <Text style={{fontWeight: '900', color: colors.white}}>MÉTODO DE PAGO:</Text> El pago de este torneo ({tour.price}) se realizará mediante <Text style={{fontWeight: '900', color: colors.goldLight}}>domiciliación bancaria en la cuenta habitual del club</Text>.
              </Text>

              <Text style={styles.noticeTxt}>
                📅 <Text style={{fontWeight: '900', color: colors.white}}>FECHA LÍMITE ESTABLECIDA:</Text> Tenéis hasta el <Text style={{fontWeight: '900', color: colors.skyGlow}}>{tour.paymentDeadline}</Text> para realizar cualquier modificación.
              </Text>
            </View>

            <TouchableOpacity style={styles.modalCloseBtnPrimary} onPress={handleAcceptConfirmationModal}>
              <Text style={styles.modalCloseTxtPrimary}>ACEPTAR Y ENTENDIDO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 16, paddingBottom: 60 },
  contentTablet: { maxWidth: 900, alignSelf: 'center', width: '100%' },

  // SELECTOR HIJOS
  childSelectorRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  childBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: colors.navyCard, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  childBtnActive: { backgroundColor: '#0E2E6B', borderColor: colors.skyPrimary },
  childBtnText: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  childBtnTextActive: { color: colors.white, fontWeight: '900' },

  // TABS
  tabsHeaderRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)', marginBottom: 16 },
  tabBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', position: 'relative' },
  tabBtnActive: {},
  tabBtnText: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  tabBtnTextActive: { color: colors.skyPrimary, fontWeight: '900' },
  tabUnderline: { position: 'absolute', bottom: -1, left: '20%', right: '20%', height: 3, backgroundColor: colors.skyPrimary, borderRadius: 1.5 },

  // HERO CARD TORNEO
  tourHeroCard: { borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGlow, backgroundColor: colors.navyCard, marginBottom: 20 },
  tourGradient: { padding: 16 },
  tourHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  trophyCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(245, 158, 11, 0.15)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.accentGold },
  tourCategory: { color: colors.skyGlow, fontSize: 10, fontWeight: '800' },
  tourTitle: { color: colors.white, fontSize: 17, fontWeight: '900' },

  infoGrid: { gap: 8, backgroundColor: 'rgba(0,0,0,0.25)', padding: 12, borderRadius: 12, marginBottom: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoTxt: { color: colors.white, fontSize: 12, fontWeight: '600' },
  infoTxtBold: { color: colors.white, fontSize: 12, fontWeight: '900' },

  busInfoBox: { backgroundColor: 'rgba(79, 195, 247, 0.1)', borderWidth: 1, borderColor: colors.skyPrimary, padding: 10, borderRadius: 10, marginBottom: 12, gap: 2 },
  busHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  busTitle: { color: colors.skyGlow, fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  busTxt: { color: colors.textMuted, fontSize: 11 },

  hotelMapBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: colors.skyPrimary, paddingVertical: 10, borderRadius: 12 },
  hotelMapBtnTxt: { color: colors.navyDark, fontSize: 11, fontWeight: '900' },

  // INFORMACIÓN ECONÓMICA
  economicCard: { backgroundColor: colors.navyCard, padding: 14, borderRadius: 18, borderWidth: 1, borderColor: colors.borderGlow, marginBottom: 20 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  priceLabel: { color: colors.textMuted, fontSize: 10, fontWeight: '800' },
  priceValue: { color: colors.goldLight, fontSize: 24, fontWeight: '900', marginTop: 2 },
  deadlineBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.accentGold, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  deadlineTxt: { color: colors.navyDark, fontSize: 10, fontWeight: '900' },

  breakdownBox: { backgroundColor: 'rgba(0,0,0,0.25)', padding: 12, borderRadius: 12, gap: 6, marginBottom: 14 },
  breakdownTitle: { color: colors.skyGlow, fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  breakdownItem: { color: colors.white, fontSize: 11, fontWeight: '600' },

  threeButtonsCol: { gap: 10 },
  btnActionMassive: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 14 },
  btnConfirmGreen: { backgroundColor: colors.skyPrimary },
  btnConfirmGreenTxt: { color: colors.navyDark, fontSize: 12, fontWeight: '900', letterSpacing: 0.5 },
  btnActiveGlow: { borderWidth: 2, borderColor: colors.white },

  btnDeclineRed: { backgroundColor: colors.navyCard, borderWidth: 1, borderColor: colors.accentRed },
  btnDeclineRedTxt: { color: colors.accentRed, fontSize: 12, fontWeight: '800' },
  btnActiveGlowRed: { backgroundColor: 'rgba(239, 68, 68, 0.2)' },

  // AUTORIZACIÓN
  sectionTitle: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginBottom: 10 },
  authCard: { backgroundColor: colors.navyCard, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: colors.borderGlow, marginBottom: 20 },
  authHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  authTitle: { color: colors.white, fontSize: 13, fontWeight: '900' },
  authSub: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  signBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: colors.accentGold, paddingVertical: 10, borderRadius: 10, marginTop: 10 },
  signBtnTxt: { color: colors.navyDark, fontSize: 11, fontWeight: '900' },

  // FASE GRUPOS
  groupStageCard: { backgroundColor: colors.navyCard, borderRadius: 16, borderWidth: 1, borderColor: colors.borderGlow, padding: 12, gap: 10, marginBottom: 20 },
  groupMatchRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  groupMatchTitle: { color: colors.white, fontSize: 13, fontWeight: '800' },
  groupMatchDate: { color: colors.textMuted, fontSize: 10, marginTop: 2 },
  groupDateBadge: { backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  groupDateBadgeTxt: { color: colors.skyGlow, fontSize: 10, fontWeight: '800' },

  // CHECKLIST
  checklistCard: { backgroundColor: colors.navyCard, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: colors.borderGlow, gap: 10, marginBottom: 20 },
  checkItemRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkBox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: colors.skyPrimary, justifyContent: 'center', alignItems: 'center' },
  checkBoxChecked: { backgroundColor: colors.skyPrimary },
  checkLabel: { color: colors.white, fontSize: 12, fontWeight: '700' },
  checkLabelChecked: { textDecorationLine: 'line-through', color: colors.textMuted },

  // HISTORIAL
  historyContainer: { gap: 10 },
  noHistoryCard: { backgroundColor: colors.navyCard, padding: 16, borderRadius: 14, alignItems: 'center' },
  historyCard: { backgroundColor: colors.navyCard, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  hTitle: { color: colors.white, fontSize: 14, fontWeight: '900' },
  hDate: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  hResult: { color: colors.accentGold, fontSize: 12, fontWeight: '900', marginTop: 4 },

  // MODAL
  modalBgCenter: { flex: 1, backgroundColor: 'rgba(0,0,0,0.82)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCardCenter: { width: '100%', maxWidth: 360, backgroundColor: colors.navyCard, borderRadius: 24, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: colors.accentGreen },
  modalTitleCenter: { color: colors.white, fontSize: 15, fontWeight: '900', marginTop: 10, marginBottom: 12, letterSpacing: 0.5, textAlign: 'center' },
  
  noticeBox: { backgroundColor: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 12, gap: 8, marginBottom: 16 },
  noticeTxt: { color: colors.textMuted, fontSize: 11, lineHeight: 16 },

  modalCloseBtnPrimary: { backgroundColor: colors.skyPrimary, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12, width: '100%', alignItems: 'center' },
  modalCloseTxtPrimary: { color: colors.navyDark, fontSize: 12, fontWeight: '900' }
});
