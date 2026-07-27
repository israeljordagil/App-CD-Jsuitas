import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, LayoutAnimation, UIManager } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CHILDS_META, clubColors, INITIAL_EVENTS } from '../../data/familyEvents';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ==============================
// MOCK DATA: Mensajes y Avisos
// ==============================

const AVISOS_IMPORTANTES = [
  { id: 'av1', playerId: 'p1', type: 'Convocatoria', title: 'Nueva convocatoria: CD Jesuitas vs Levante UD', date: 'Hoy, 08:30', isRead: false },
  { id: 'av2', playerId: 'p2', type: 'Horario', title: 'Cambio de horario de entrenamiento', date: 'Ayer, 19:00', isRead: true },
];

const CONVERSATIONS_MOCK = [
  {
    id: 'c1',
    playerId: 'p1',
    senderName: 'David Gómez',
    senderRole: 'Entrenador',
    team: 'Cadete B',
    lastMessage: 'Recordad confirmar la convocatoria del sábado.',
    lastTime: '10:45',
    unreadCount: 2,
    roleCategory: 'Entrenadores',
    messages: [
      { id: 'm1', text: 'Buenas tardes familia.', sender: 'other', time: '10:40' },
      { id: 'm2', text: 'Recordad confirmar la convocatoria del sábado. Es muy importante.', sender: 'other', time: '10:45', relatedEventId: 'ev1' }
    ]
  },
  {
    id: 'c2',
    playerId: 'p3',
    senderName: 'Marta Pérez',
    senderRole: 'Entrenadora',
    team: 'Cadete Vóley Femenino',
    lastMessage: 'Mañana entrenamos en el Pabellón Central.',
    lastTime: 'Ayer',
    unreadCount: 0,
    roleCategory: 'Entrenadores',
    messages: [
      { id: 'm3', text: 'Hola a todos.', sender: 'other', time: 'Ayer 18:00' },
      { id: 'm4', text: 'Mañana entrenamos en el Pabellón Central. Llegad puntuales.', sender: 'other', time: 'Ayer 18:05' }
    ]
  },
  {
    id: 'c3',
    playerId: 'p2',
    senderName: 'Carlos Ruiz',
    senderRole: 'Entrenador',
    team: 'Infantil Basket',
    lastMessage: 'Llevad camiseta blanca y botella de agua.',
    lastTime: 'Ayer',
    unreadCount: 3,
    roleCategory: 'Entrenadores',
    messages: [
      { id: 'm5', text: 'Este viernes tenemos sesión física fuerte.', sender: 'other', time: 'Jue 16:00' },
      { id: 'm6', text: 'Llevad camiseta blanca y botella de agua.', sender: 'other', time: 'Jue 16:05', relatedEventId: 'ev2' }
    ]
  },
  {
    id: 'c4',
    playerId: 'p1',
    senderName: 'Coordinación Fútbol',
    senderRole: 'CD Jesuitas',
    team: 'Club',
    lastMessage: 'La cuota trimestral se pasará el día 15.',
    lastTime: 'Lunes',
    unreadCount: 0,
    roleCategory: 'Coordinadores',
    messages: [
      { id: 'm7', text: 'La cuota trimestral se pasará el día 15. Saludos.', sender: 'other', time: 'Lunes 10:00' }
    ]
  }
];

type FilterType = 'Todos' | 'p1' | 'p2' | 'p3' | 'Entrenadores' | 'Coordinadores' | 'CD Jesuitas';

export function FamiliaComunicaciones() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  
  // Clon local para simular la confirmación en esta sesión y en el chat actual
  const [localEvents, setLocalEvents] = useState(INITIAL_EVENTS);
  const [chatMessages, setChatMessages] = useState<Record<string, any[]>>({});
  const [conversations, setConversations] = useState(CONVERSATIONS_MOCK);
  const [inputText, setInputText] = useState('');

  // Inicializar mensajes del chat cuando se abre
  useEffect(() => {
    if (activeChatId && !chatMessages[activeChatId]) {
      const conv = conversations.find(c => c.id === activeChatId);
      if (conv) {
        setChatMessages(prev => ({ ...prev, [activeChatId]: [...conv.messages] }));
        
        // Marcar como leído
        setConversations(prev => prev.map(c => c.id === activeChatId ? { ...c, unreadCount: 0 } : c));
      }
    }
  }, [activeChatId]);

  // Manejar el filtrado de la bandeja
  const filteredConversations = useMemo(() => {
    return conversations.filter(c => {
      // Búsqueda
      const matchesSearch = c.senderName.toLowerCase().includes(searchQuery.toLowerCase()) || c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // Filtros
      if (activeFilter === 'Todos') return true;
      if (['p1', 'p2', 'p3'].includes(activeFilter)) return c.playerId === activeFilter;
      
      return c.roleCategory === activeFilter || (activeFilter === 'CD Jesuitas' && c.senderRole === 'CD Jesuitas');
    });
  }, [activeFilter, searchQuery, conversations]);

  // Agrupar por hijo (solo en vista 'Todos' o en filtros de categoría)
  const groupedConversations = useMemo(() => {
    const groups: Record<string, any[]> = {};
    filteredConversations.forEach(c => {
      if (!groups[c.playerId]) groups[c.playerId] = [];
      groups[c.playerId].push(c);
    });
    return groups;
  }, [filteredConversations]);

  // Acciones en chat
  const handleSendMessage = (text: string) => {
    if (!text.trim() || !activeChatId) return;
    const newMessage = { id: Date.now().toString(), text, sender: 'me', time: 'Ahora' };
    setChatMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage]
    }));
    setInputText('');
  };

  const handleQuickResponse = (resp: string) => {
    handleSendMessage(resp);
  };

  const confirmEvent = (eventId: string, newStatus: string) => {
    setLocalEvents(prev => prev.map(e => e.id === eventId ? { ...e, status: newStatus, requireConfirm: false } : e));
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  // ==============================
  // RENDER: BANDEJA FAMILIAR
  // ==============================
  const renderBandeja = () => {
    const totalUnread = conversations.reduce((acc, curr) => acc + curr.unreadCount, 0);

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
         
         {/* NOTIFICACIÓN AGRUPADA (Simulación) */}
         <View style={styles.notificationGroup}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 12}}>
               <FontAwesome name="bell" size={16} color={clubColors.skyPrimary} style={{marginRight: 8}}/>
               <Text style={styles.notifTitle}>Resumen de notificaciones de hoy</Text>
            </View>
            <Text style={styles.notifItem}>⚽ <Text style={{fontWeight: '800'}}>Pablo:</Text> Convocatoria publicada</Text>
            <Text style={styles.notifItem}>🏀 <Text style={{fontWeight: '800'}}>Hugo:</Text> Cambio de horario de entreno</Text>
            <Text style={styles.notifItem}>🏐 <Text style={{fontWeight: '800'}}>Laura:</Text> Nuevo mensaje de la entrenadora</Text>
         </View>

         {/* CABECERA */}
         <View style={styles.headerBlock}>
            <LinearGradient colors={['rgba(79, 195, 247, 0.1)', 'transparent']} style={StyleSheet.absoluteFillObject} />
            <Text style={styles.headerTitle}>💬 Mensajes Familiares</Text>
            <Text style={styles.headerSub}>Comunicación de todos tus hijos en un solo lugar.</Text>
            
            <View style={styles.statsRow}>
               <View style={styles.statPill}>
                  <Text style={styles.statPillNum}>{totalUnread}</Text>
                  <Text style={styles.statPillLbl}>Sin leer</Text>
               </View>
               <View style={styles.statPill}>
                  <Text style={styles.statPillNum}>3</Text>
                  <Text style={styles.statPillLbl}>Activas</Text>
               </View>
               <View style={styles.statPill}>
                  <Text style={[styles.statPillNum, {color: clubColors.danger}]}>2</Text>
                  <Text style={styles.statPillLbl}>Avisos</Text>
               </View>
            </View>

            <View style={styles.searchBox}>
               <FontAwesome name="search" size={16} color={clubColors.textMuted} style={styles.searchIcon} />
               <TextInput 
                 style={styles.searchInput}
                 placeholder="Buscar mensajes, entrenadores..."
                 placeholderTextColor={clubColors.textMuted}
                 value={searchQuery}
                 onChangeText={setSearchQuery}
               />
            </View>
         </View>

         {/* FILTROS TIPO PÍLDORA */}
         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer} contentContainerStyle={{paddingHorizontal: 20}}>
            {(['Todos', 'p1', 'p2', 'p3', 'Entrenadores', 'Coordinadores', 'CD Jesuitas'] as FilterType[]).map(f => {
               const isActive = activeFilter === f;
               const isChild = ['p1', 'p2', 'p3'].includes(f);
               const meta = isChild ? CHILDS_META[f] : null;
               
               return (
                 <TouchableOpacity 
                    key={f}
                    style={[styles.filterPill, isActive && styles.filterPillActive, isChild && isActive && {borderColor: meta.color}]}
                    onPress={() => setActiveFilter(f)}
                 >
                    <Text style={[styles.filterPillText, isActive && styles.filterPillTextActive]}>
                       {isChild ? `${meta.icon} ${meta.name}` : f}
                    </Text>
                 </TouchableOpacity>
               )
            })}
         </ScrollView>

         {/* AVISOS IMPORTANTES */}
         {activeFilter === 'Todos' && searchQuery === '' && (
           <View style={styles.avisosContainer}>
              <Text style={styles.sectionTitle}>📢 Avisos importantes</Text>
              {AVISOS_IMPORTANTES.map(aviso => {
                 const meta = CHILDS_META[aviso.playerId];
                 return (
                   <View key={aviso.id} style={styles.avisoCard}>
                      <View style={styles.avisoHeader}>
                         <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {aviso.isRead ? null : <View style={styles.avisoUnreadDot} />}
                            <Text style={styles.avisoChildTag}>{meta.icon} {meta.name} • {aviso.type}</Text>
                         </View>
                         <Text style={styles.avisoDate}>{aviso.date}</Text>
                      </View>
                      <Text style={styles.avisoTitle}>{aviso.title}</Text>
                      <TouchableOpacity style={styles.btnAviso}>
                         <Text style={styles.btnAvisoText}>Ver detalle</Text>
                      </TouchableOpacity>
                   </View>
                 )
              })}
           </View>
         )}

         {/* LISTADO DE CONVERSACIONES (Agrupado por Hijo) */}
         <View style={{paddingHorizontal: 20}}>
            {Object.keys(groupedConversations).map(playerId => {
               const childConvs = groupedConversations[playerId];
               if (!childConvs || childConvs.length === 0) return null;
               const meta = CHILDS_META[playerId];

               return (
                 <View key={playerId} style={styles.childGroupBlock}>
                    <View style={styles.childGroupHeader}>
                       <Text style={styles.childGroupIcon}>{meta.icon}</Text>
                       <View>
                          <Text style={styles.childGroupTitle}>{meta.fullName}</Text>
                          <Text style={[styles.childGroupSub, {color: meta.color}]}>{meta.team} • {meta.sport.toUpperCase()}</Text>
                       </View>
                    </View>

                    {childConvs.map((conv, idx) => {
                       const isLast = idx === childConvs.length - 1;
                       return (
                         <TouchableOpacity key={conv.id} style={[styles.convRow, !isLast && styles.convRowBorder]} onPress={() => setActiveChatId(conv.id)}>
                            <View style={[styles.convAvatar, {backgroundColor: meta.color + '20'}]}>
                               <FontAwesome name="user" size={24} color={meta.color} />
                            </View>
                            <View style={styles.convInfo}>
                               <View style={styles.convTop}>
                                  <Text style={[styles.convSender, conv.unreadCount > 0 && styles.convSenderUnread]}>{conv.senderName}</Text>
                                  <Text style={[styles.convTime, conv.unreadCount > 0 && styles.convTimeUnread]}>{conv.lastTime}</Text>
                               </View>
                               <Text style={styles.convRole}>{conv.senderRole}</Text>
                               <Text style={[styles.convPreview, conv.unreadCount > 0 && styles.convPreviewUnread]} numberOfLines={1}>
                                  {conv.lastMessage}
                               </Text>
                            </View>
                            {conv.unreadCount > 0 && (
                               <View style={styles.convUnreadBadge}>
                                  <Text style={styles.convUnreadText}>{conv.unreadCount}</Text>
                               </View>
                            )}
                         </TouchableOpacity>
                       )
                    })}
                 </View>
               )
            })}
            
            {Object.keys(groupedConversations).length === 0 && (
              <Text style={styles.emptyText}>No hay mensajes que coincidan con la búsqueda.</Text>
            )}
         </View>
      </ScrollView>
    );
  };

  // ==============================
  // RENDER: VISTA CHAT
  // ==============================
  const renderChat = () => {
    if (!activeChatId) return null;
    const conv = conversations.find(c => c.id === activeChatId)!;
    const meta = CHILDS_META[conv.playerId];
    const msgs = chatMessages[activeChatId] || [];

    return (
      <KeyboardAvoidingView style={styles.chatContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
         
         {/* CABECERA CHAT */}
         <View style={styles.chatHeader}>
            <TouchableOpacity onPress={() => setActiveChatId(null)} style={styles.btnBack}>
               <Ionicons name="arrow-back" size={24} color={clubColors.navy} />
            </TouchableOpacity>
            <View style={styles.chatHeaderAvatar}>
               <FontAwesome name="user" size={20} color={clubColors.white} />
            </View>
            <View style={styles.chatHeaderInfo}>
               <Text style={styles.chatHeaderName}>{conv.senderName}</Text>
               <Text style={styles.chatHeaderRole}>{conv.senderRole} • {meta.name} ({meta.icon})</Text>
            </View>
         </View>

         {/* BURBUJAS DE MENSAJE */}
         <ScrollView style={styles.chatBody} contentContainerStyle={{padding: 16}} showsVerticalScrollIndicator={false}>
            {msgs.map(m => {
               const isMe = m.sender === 'me';
               const hasEvent = m.relatedEventId != null;
               let relatedEvent = null;
               
               if (hasEvent) {
                  relatedEvent = localEvents.find(e => e.id === m.relatedEventId);
               }

               return (
                 <View key={m.id} style={[styles.bubbleWrapper, isMe ? styles.bubbleWrapperMe : styles.bubbleWrapperOther]}>
                    <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
                       <Text style={[styles.bubbleText, isMe && styles.bubbleTextMe]}>{m.text}</Text>
                       <Text style={[styles.bubbleTime, isMe && styles.bubbleTimeMe]}>{m.time}</Text>

                       {/* TARJETA DE EVENTO INCRUSTADA */}
                       {relatedEvent && (
                          <View style={styles.eventEmbedCard}>
                             <Text style={styles.eventEmbedTitle}>{relatedEvent.title}</Text>
                             <Text style={styles.eventEmbedSub}>{relatedEvent.time} · {relatedEvent.location}</Text>
                             <View style={styles.eventEmbedDivider} />
                             
                             {relatedEvent.status === 'Confirmado' ? (
                                <Text style={styles.eventEmbedStatusOk}>✅ Asistencia confirmada</Text>
                             ) : relatedEvent.status === 'Ausencia' ? (
                                <Text style={styles.eventEmbedStatusNo}>❌ Ausencia notificada</Text>
                             ) : (
                                <View style={styles.eventEmbedActions}>
                                   <TouchableOpacity style={styles.btnEvtConfirm} onPress={() => confirmEvent(relatedEvent.id, 'Confirmado')}>
                                      <Text style={styles.btnEvtConfirmText}>Confirmar asistencia</Text>
                                   </TouchableOpacity>
                                   <View style={{flexDirection: 'row', gap: 8, marginTop: 8}}>
                                      <TouchableOpacity style={styles.btnEvtSecondary} onPress={() => confirmEvent(relatedEvent.id, 'Ausencia')}>
                                         <Text style={styles.btnEvtSecondaryText}>Avisar ausencia</Text>
                                      </TouchableOpacity>
                                   </View>
                                </View>
                             )}
                          </View>
                       )}
                    </View>
                 </View>
               )
            })}
         </ScrollView>

         {/* INPUT Y ACCIONES RÁPIDAS */}
         <View style={styles.chatFooter}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickRespScroll} contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 12}}>
               {['Recibido', 'De acuerdo', 'Llegaremos tarde', 'Tengo una duda', 'Llámame'].map(resp => (
                 <TouchableOpacity key={resp} style={styles.quickRespPill} onPress={() => handleQuickResponse(resp)}>
                    <Text style={styles.quickRespText}>{resp}</Text>
                 </TouchableOpacity>
               ))}
            </ScrollView>

            <View style={styles.inputRow}>
               <TouchableOpacity style={styles.attachBtn}>
                  <FontAwesome name="plus" size={20} color={clubColors.textMuted} />
               </TouchableOpacity>
               <TextInput 
                  style={styles.chatInput}
                  placeholder="Escribe un mensaje..."
                  placeholderTextColor={clubColors.textMuted}
                  value={inputText}
                  onChangeText={setInputText}
                  multiline
               />
               <TouchableOpacity style={styles.sendBtn} onPress={() => handleSendMessage(inputText)}>
                  <MaterialCommunityIcons name="send" size={20} color={clubColors.white} />
               </TouchableOpacity>
            </View>
         </View>
      </KeyboardAvoidingView>
    );
  };

  return activeChatId ? renderChat() : renderBandeja();
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  content: { paddingBottom: 40 },
  
  // Notificación Simulada
  notificationGroup: { backgroundColor: clubColors.navy, padding: 20, paddingTop: 60, paddingBottom: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  notifTitle: { color: clubColors.skyPrimary, fontSize: 13, fontWeight: '800', textTransform: 'uppercase' },
  notifItem: { color: clubColors.white, fontSize: 14, marginBottom: 8, paddingLeft: 4 },

  // Cabecera Bandeja
  headerBlock: { padding: 20, backgroundColor: clubColors.white, borderBottomWidth: 1, borderBottomColor: clubColors.border },
  headerTitle: { fontSize: 24, fontWeight: '900', color: clubColors.navy },
  headerSub: { fontSize: 14, color: clubColors.textMuted, marginTop: 4, marginBottom: 16 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  statPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  statPillNum: { fontSize: 16, fontWeight: '900', color: clubColors.navy, marginRight: 6 },
  statPillLbl: { fontSize: 12, fontWeight: '600', color: clubColors.textMuted },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: clubColors.navy },

  // Filtros
  filtersContainer: { marginTop: 12, marginBottom: 8, flexGrow: 0 },
  filterPill: { backgroundColor: clubColors.white, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: clubColors.border },
  filterPillActive: { backgroundColor: clubColors.navy, borderColor: clubColors.navy },
  filterPillText: { fontSize: 13, fontWeight: '700', color: clubColors.textMuted },
  filterPillTextActive: { color: clubColors.white },

  // Avisos
  avisosContainer: { paddingHorizontal: 20, marginTop: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: clubColors.navy, marginBottom: 12 },
  avisoCard: { backgroundColor: '#fef2f2', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#fca5a5', marginBottom: 12 },
  avisoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  avisoUnreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: clubColors.danger, marginRight: 6 },
  avisoChildTag: { fontSize: 12, fontWeight: '800', color: '#991b1b' },
  avisoDate: { fontSize: 11, color: '#991b1b', fontWeight: '600' },
  avisoTitle: { fontSize: 15, fontWeight: '800', color: '#7f1d1d', marginBottom: 12 },
  btnAviso: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#fee2e2', borderRadius: 8 },
  btnAvisoText: { color: '#991b1b', fontSize: 12, fontWeight: '800' },

  // Agrupación por hijo
  childGroupBlock: { backgroundColor: clubColors.white, borderRadius: 16, padding: 16, marginTop: 24, borderWidth: 1, borderColor: clubColors.border, shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 10, elevation: 1 },
  childGroupHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6', paddingBottom: 12 },
  childGroupIcon: { fontSize: 28, marginRight: 12 },
  childGroupTitle: { fontSize: 16, fontWeight: '900', color: clubColors.navy },
  childGroupSub: { fontSize: 13, fontWeight: '800' },

  // Conversación Listado
  convRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  convRowBorder: { borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  convAvatar: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  convInfo: { flex: 1, marginLeft: 12 },
  convTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  convSender: { fontSize: 15, fontWeight: '700', color: clubColors.navy },
  convSenderUnread: { fontWeight: '900' },
  convTime: { fontSize: 12, color: clubColors.textMuted },
  convTimeUnread: { color: clubColors.skyPrimary, fontWeight: '800' },
  convRole: { fontSize: 12, color: clubColors.textMuted, fontWeight: '500', marginBottom: 4 },
  convPreview: { fontSize: 14, color: clubColors.textMuted },
  convPreviewUnread: { color: clubColors.navy, fontWeight: '700' },
  convUnreadBadge: { backgroundColor: clubColors.danger, minWidth: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  convUnreadText: { color: clubColors.white, fontSize: 11, fontWeight: '900', paddingHorizontal: 4 },
  emptyText: { textAlign: 'center', color: clubColors.textMuted, marginTop: 40 },

  // CHAT VIEW
  chatContainer: { flex: 1, backgroundColor: '#f9fafb' },
  chatHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 60, paddingBottom: 16, backgroundColor: clubColors.white, borderBottomWidth: 1, borderBottomColor: clubColors.border },
  btnBack: { padding: 8, marginRight: 8 },
  chatHeaderAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: clubColors.navy, justifyContent: 'center', alignItems: 'center' },
  chatHeaderInfo: { flex: 1, marginLeft: 12 },
  chatHeaderName: { fontSize: 16, fontWeight: '900', color: clubColors.navy },
  chatHeaderRole: { fontSize: 12, fontWeight: '600', color: clubColors.textMuted, marginTop: 2 },
  
  chatBody: { flex: 1 },
  bubbleWrapper: { marginBottom: 16, maxWidth: '85%' },
  bubbleWrapperMe: { alignSelf: 'flex-end' },
  bubbleWrapperOther: { alignSelf: 'flex-start' },
  bubble: { padding: 12, borderRadius: 16 },
  bubbleMe: { backgroundColor: clubColors.skyLight, borderBottomRightRadius: 4 },
  bubbleOther: { backgroundColor: clubColors.white, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: clubColors.border },
  bubbleText: { fontSize: 15, color: clubColors.navy, lineHeight: 20 },
  bubbleTextMe: { color: clubColors.navy },
  bubbleTime: { fontSize: 10, color: clubColors.textMuted, alignSelf: 'flex-end', marginTop: 4 },
  bubbleTimeMe: { color: 'rgba(11, 31, 77, 0.6)' },

  // Event Embed en Chat
  eventEmbedCard: { backgroundColor: clubColors.white, borderRadius: 12, padding: 12, marginTop: 12, borderWidth: 1, borderColor: clubColors.border },
  eventEmbedTitle: { fontSize: 14, fontWeight: '900', color: clubColors.navy },
  eventEmbedSub: { fontSize: 12, color: clubColors.textMuted, marginTop: 2 },
  eventEmbedDivider: { height: 1, backgroundColor: '#f3f4f6', marginVertical: 8 },
  eventEmbedActions: { marginTop: 4 },
  btnEvtConfirm: { backgroundColor: clubColors.success, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  btnEvtConfirmText: { color: clubColors.white, fontWeight: '800', fontSize: 12 },
  btnEvtSecondary: { flex: 1, backgroundColor: clubColors.white, borderWidth: 1, borderColor: clubColors.border, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  btnEvtSecondaryText: { color: clubColors.textMuted, fontWeight: '800', fontSize: 12 },
  eventEmbedStatusOk: { fontSize: 13, fontWeight: '800', color: '#166534', backgroundColor: '#dcfce7', padding: 8, borderRadius: 8, textAlign: 'center' },
  eventEmbedStatusNo: { fontSize: 13, fontWeight: '800', color: '#991b1b', backgroundColor: '#fee2e2', padding: 8, borderRadius: 8, textAlign: 'center' },

  chatFooter: { backgroundColor: clubColors.white, paddingVertical: 12, borderTopWidth: 1, borderTopColor: clubColors.border, paddingBottom: Platform.OS === 'ios' ? 24 : 12 },
  quickRespScroll: { flexGrow: 0 },
  quickRespPill: { backgroundColor: '#f3f4f6', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, marginRight: 8, borderWidth: 1, borderColor: clubColors.border },
  quickRespText: { color: clubColors.navy, fontSize: 13, fontWeight: '600' },
  inputRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginTop: 8 },
  attachBtn: { padding: 8, marginRight: 4 },
  chatInput: { flex: 1, backgroundColor: '#f3f4f6', borderRadius: 20, paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10, fontSize: 15, color: clubColors.navy, maxHeight: 100 },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: clubColors.skyPrimary, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
});
