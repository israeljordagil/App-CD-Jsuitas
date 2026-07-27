import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../../../src/utils/theme';
import { AnimatedCard as Card } from '../../../src/components/ui/AnimatedCard';

const FILTERS = ['Entrenadores', 'Coordinadores', 'CD Jesuitas', 'Avisos'];

const QUICK_REPLIES = ['👍 Recibido', '✅ De acuerdo', '❓ Tengo una duda', '📞 Llámame', '🙋 No puedo asistir'];

const MOCK_AVISOS = [
  { id: 1, title: 'Hoy entrenas a las 18:30', icon: 'soccer-ball-o', color: colors.sky },
  { id: 2, title: 'Has sido convocado', icon: 'list-alt', color: '#22C55E' },
  { id: 3, title: 'Nuevo reto disponible', icon: 'bullseye', color: '#F97316' },
  { id: 4, title: 'Nueva insignia conseguida', icon: 'trophy', color: '#EAB308' },
];

const MOCK_CHATS = [
  { 
    id: 1, 
    name: 'David Gómez', 
    role: 'Entrenador Cadete B', 
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80',
    lastMsg: 'Recuerda llegar 15 minutos antes hoy.', 
    time: '14:30', 
    unread: 2, 
    status: '🟢 Disponible',
    statusColor: '#22C55E',
    type: 'Entrenadores',
    important: false
  },
  { 
    id: 2, 
    name: 'Rubén Cazallas', 
    role: 'Coordinador F11', 
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    lastMsg: 'Pablo, tienes que firmar la ficha antes del viernes.', 
    time: 'Ayer', 
    unread: 0, 
    status: '🟡 Entrenando',
    statusColor: '#EAB308',
    type: 'Coordinadores',
    important: false
  },
  { 
    id: 3, 
    name: 'CD Jesuitas', 
    role: 'Club Oficial', 
    avatar: 'https://ui-avatars.com/api/?name=CD+Jesuitas&background=0B1F4D&color=fff',
    lastMsg: '⚠ Cambio de entrenamiento: Pasamos al Campo 1.', 
    time: 'Lun', 
    unread: 1, 
    status: '🟢 Disponible',
    statusColor: '#22C55E',
    type: 'CD Jesuitas',
    important: true
  },
];

const MOCK_MESSAGES = [
  { id: 1, text: 'Hola Pablo, ¿cómo estás de la molestia en el tobillo?', isMe: false, time: '14:20' },
  { id: 2, text: 'Hola míster. Estoy mucho mejor, ya no me duele al apoyar.', isMe: true, time: '14:25' },
  { id: 3, text: 'Genial. Recuerda llegar 15 minutos antes hoy para que el fisio te ponga un vendaje preventivo.', isMe: false, time: '14:30' },
];

export default function MensajesJugadorScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Entrenadores');
  const [search, setSearch] = useState('');
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [inputText, setInputText] = useState('');

  const filteredChats = MOCK_CHATS.filter(c => c.type === activeFilter || activeFilter === 'Todos'); // Forced filter logic
  const actualChats = activeFilter === 'Avisos' ? [] : MOCK_CHATS.filter(c => c.type === activeFilter);

  const renderInbox = () => (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      
      {/* CABECERA */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <FontAwesome name="arrow-left" size={20} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.topNavTitle}>MENSAJES</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* INDICADORES & BUSCADOR */}
      <View style={styles.headerStats}>
         <View style={styles.statBox}>
            <Text style={styles.statNum}>3</Text>
            <Text style={styles.statLbl}>Sin Leer</Text>
         </View>
         <View style={styles.statBox}>
            <Text style={styles.statNum}>5</Text>
            <Text style={styles.statLbl}>Conversaciones</Text>
         </View>
      </View>

      <View style={styles.searchBox}>
         <FontAwesome name="search" size={16} color={colors.muted} />
         <TextInput 
            style={styles.searchInput}
            placeholder="Buscar por entrenador, club..."
            placeholderTextColor={colors.muted}
            value={search}
            onChangeText={setSearch}
         />
      </View>

      {/* FILTROS SUPERIORES */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={{ gap: 8 }}>
         {FILTERS.map((f, i) => (
            <TouchableOpacity key={i} style={[styles.filterBtn, activeFilter === f && styles.filterBtnActive]} onPress={() => setActiveFilter(f)}>
               <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
         ))}
      </ScrollView>

      {/* VISTA DE AVISOS */}
      {activeFilter === 'Avisos' ? (
         <View style={styles.avisosGrid}>
            <Text style={styles.sectionTitle}>Avisos Automáticos</Text>
            {MOCK_AVISOS.map((aviso, idx) => (
               <Card delay={100 + (idx * 20)} key={aviso.id} style={styles.avisoCard}>
                  <View style={[styles.avisoIconBox, { backgroundColor: `${aviso.color}20` }]}>
                     <FontAwesome name={aviso.icon} size={20} color={aviso.color} />
                  </View>
                  <Text style={styles.avisoTitle}>{aviso.title}</Text>
               </Card>
            ))}
         </View>
      ) : (
         /* LISTA DE CONVERSACIONES */
         <View style={styles.chatList}>
            <Text style={styles.sectionTitle}>Conversaciones Recientes</Text>
            {actualChats.map((chat, idx) => (
               <TouchableOpacity key={chat.id} activeOpacity={0.8} onPress={() => setSelectedChat(chat)}>
                  <Card delay={100 + (idx * 20)} style={[styles.chatCard, chat.important && styles.chatCardImportant]}>
                     <View style={styles.avatarContainer}>
                        <Image source={{ uri: chat.avatar }} style={styles.avatar} />
                        <View style={[styles.statusDot, { backgroundColor: chat.statusColor }]} />
                     </View>
                     <View style={styles.chatInfo}>
                        <View style={styles.chatHeaderRow}>
                           <Text style={styles.chatName}>{chat.name}</Text>
                           <Text style={styles.chatTime}>{chat.time}</Text>
                        </View>
                        <Text style={styles.chatRole}>{chat.role}</Text>
                        <Text style={[styles.chatLastMsg, chat.unread > 0 && styles.chatLastMsgUnread]} numberOfLines={1}>
                           {chat.lastMsg}
                        </Text>
                        <View style={styles.statusLabelRow}>
                           <Text style={[styles.statusLabel, { color: chat.statusColor }]}>{chat.status}</Text>
                        </View>
                     </View>
                     {chat.unread > 0 && (
                        <View style={styles.unreadBadge}>
                           <Text style={styles.unreadText}>{chat.unread}</Text>
                        </View>
                     )}
                  </Card>
               </TouchableOpacity>
            ))}
            {actualChats.length === 0 && (
               <Text style={styles.emptyText}>No hay conversaciones en esta sección.</Text>
            )}
         </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const renderChat = () => (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
         {/* CABECERA DEL CHAT */}
         <View style={styles.chatHeader}>
            <TouchableOpacity onPress={() => setSelectedChat(null)} style={styles.backBtnChat}>
               <FontAwesome name="arrow-left" size={20} color={colors.white} />
            </TouchableOpacity>
            <Image source={{ uri: selectedChat.avatar }} style={styles.chatHeaderAvatar} />
            <View style={styles.chatHeaderInfo}>
               <Text style={styles.chatHeaderName}>{selectedChat.name}</Text>
               <Text style={[styles.chatHeaderStatus, { color: selectedChat.statusColor }]}>{selectedChat.status}</Text>
            </View>
            <View style={styles.chatHeaderActions}>
               <FontAwesome name="phone" size={20} color={colors.sky} style={{ marginRight: 20 }} />
               <FontAwesome name="ellipsis-v" size={20} color={colors.white} />
            </View>
         </View>

         {/* ÁREA DE MENSAJES */}
         <ScrollView style={styles.messagesArea} contentContainerStyle={{ padding: 16 }}>
            <Text style={styles.dateSeparator}>HOY</Text>
            {MOCK_MESSAGES.map((msg, i) => (
               <View key={msg.id} style={[styles.msgBubble, msg.isMe ? styles.msgBubbleMe : styles.msgBubbleThem]}>
                  <Text style={[styles.msgText, msg.isMe && { color: colors.navy }]}>{msg.text}</Text>
                  <Text style={[styles.msgTime, msg.isMe && { color: 'rgba(11, 31, 77, 0.6)' }]}>{msg.time} {msg.isMe && <FontAwesome name="check-circle" size={10} />}</Text>
               </View>
            ))}
         </ScrollView>

         {/* RESPUESTAS RÁPIDAS */}
         <View style={styles.quickRepliesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}>
               {QUICK_REPLIES.map((reply, i) => (
                  <TouchableOpacity key={i} style={styles.quickReplyBtn}>
                     <Text style={styles.quickReplyText}>{reply}</Text>
                  </TouchableOpacity>
               ))}
            </ScrollView>
         </View>

         {/* INPUT ÁREA */}
         <View style={styles.inputArea}>
            <TouchableOpacity style={styles.attachBtn}>
               <FontAwesome name="plus" size={20} color={colors.sky} />
            </TouchableOpacity>
            <View style={styles.inputBox}>
               <TextInput 
                  style={styles.input}
                  placeholder="Escribe un mensaje..."
                  placeholderTextColor={colors.muted}
                  value={inputText}
                  onChangeText={setInputText}
               />
               <FontAwesome name="smile-o" size={20} color={colors.muted} style={{ marginRight: 10 }} />
            </View>
            <TouchableOpacity style={styles.sendBtn}>
               <FontAwesome name={inputText.length > 0 ? "send" : "microphone"} size={16} color={colors.white} />
            </TouchableOpacity>
         </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  return selectedChat ? renderChat() : (
     <SafeAreaView style={styles.safeArea}>
        {renderInbox()}
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
  sectionTitle: { color: colors.white, fontSize: 13, fontWeight: '900', marginTop: spacing.l, marginBottom: spacing.m, textTransform: 'uppercase', letterSpacing: 0.5 },

  headerStats: { flexDirection: 'row', gap: 16, marginBottom: spacing.m },
  statBox: { flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderRadius: 16, padding: 16, alignItems: 'center' },
  statNum: { color: colors.white, fontSize: 24, fontWeight: '900' },
  statLbl: { color: colors.sky, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginTop: 4 },

  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, paddingHorizontal: 16, height: 48, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: spacing.m },
  searchInput: { flex: 1, marginLeft: 12, color: colors.white, fontSize: 14 },

  filterScroll: { marginBottom: spacing.m, maxHeight: 40 },
  filterBtn: { backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', height: 36, justifyContent: 'center' },
  filterBtnActive: { backgroundColor: 'rgba(79, 195, 247, 0.2)', borderColor: colors.sky },
  filterText: { color: colors.white, fontSize: 13, fontWeight: '700' },
  filterTextActive: { color: colors.sky, fontWeight: '900' },

  chatList: { gap: 12 },
  chatCard: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 20, alignItems: 'center' },
  chatCardImportant: { backgroundColor: 'rgba(225, 29, 72, 0.1)', borderColor: 'rgba(225, 29, 72, 0.3)' },
  avatarContainer: { position: 'relative', marginRight: 16 },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  statusDot: { position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderRadius: 7, borderWidth: 2, borderColor: '#0B1F4D' },
  chatInfo: { flex: 1 },
  chatHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 },
  chatName: { color: colors.white, fontSize: 16, fontWeight: '900' },
  chatTime: { color: colors.muted, fontSize: 11, fontWeight: '600' },
  chatRole: { color: colors.sky, fontSize: 11, fontWeight: '700', marginBottom: 6 },
  chatLastMsg: { color: colors.muted, fontSize: 13, fontWeight: '500' },
  chatLastMsgUnread: { color: colors.white, fontWeight: '800' },
  statusLabelRow: { marginTop: 6 },
  statusLabel: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  unreadBadge: { backgroundColor: colors.sky, width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginLeft: 12 },
  unreadText: { color: colors.navy, fontSize: 12, fontWeight: '900' },

  avisosGrid: { gap: 12 },
  avisoCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 16 },
  avisoIconBox: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  avisoTitle: { color: colors.white, fontSize: 14, fontWeight: '800', flex: 1 },

  emptyText: { color: colors.muted, fontSize: 14, fontStyle: 'italic', textAlign: 'center', marginTop: 40 },

  // Chat View
  chatHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  backBtnChat: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  chatHeaderAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  chatHeaderInfo: { flex: 1 },
  chatHeaderName: { color: colors.white, fontSize: 16, fontWeight: '900' },
  chatHeaderStatus: { fontSize: 11, fontWeight: '800', marginTop: 2 },
  chatHeaderActions: { flexDirection: 'row', alignItems: 'center' },
  
  messagesArea: { flex: 1, backgroundColor: 'transparent' },
  dateSeparator: { color: colors.muted, fontSize: 11, fontWeight: '800', textAlign: 'center', marginVertical: 16, backgroundColor: 'rgba(0,0,0,0.2)', alignSelf: 'center', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  msgBubble: { maxWidth: '80%', padding: 14, borderRadius: 20, marginBottom: 12 },
  msgBubbleThem: { backgroundColor: 'rgba(255,255,255,0.1)', alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  msgBubbleMe: { backgroundColor: colors.sky, alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  msgText: { color: colors.white, fontSize: 14, lineHeight: 20 },
  msgTime: { color: colors.muted, fontSize: 10, fontWeight: '600', alignSelf: 'flex-end', marginTop: 4 },

  quickRepliesContainer: { paddingVertical: 12, backgroundColor: 'rgba(0,0,0,0.1)' },
  quickReplyBtn: { backgroundColor: 'rgba(79, 195, 247, 0.1)', borderColor: colors.sky, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  quickReplyText: { color: colors.sky, fontSize: 13, fontWeight: '700' },

  inputArea: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: 'rgba(0,0,0,0.3)' },
  attachBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  inputBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 20, paddingHorizontal: 16, marginHorizontal: 8, height: 40, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  input: { flex: 1, color: colors.white, fontSize: 14 },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.sky, justifyContent: 'center', alignItems: 'center' }
});
