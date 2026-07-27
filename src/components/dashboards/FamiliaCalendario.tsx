import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

// ==============================
// PALETA Y CONSTANTES
// ==============================
const colors = {
  navy: '#0B1F4D',
  skyPrimary: '#4FC3F7',
  skyLight: '#E1F5FE',
  white: '#FFFFFF',
  textMuted: '#6B7280',
  success: '#22c55e',
  warning: '#eab308',
  danger: '#ef4444',
  bgGradientStart: '#E1F5FE',
  bgGradientEnd: '#FFFFFF',
  cardBg: '#FFFFFF',
  border: '#e5e7eb',
  
  // Identificadores de Deporte/Hijo
  futbol: '#22c55e',       // Verde
  baloncesto: '#f97316',   // Naranja
  voleibol: '#a855f7',     // Morado
};

const CHILDS_META: Record<string, any> = {
  'p1': { name: 'Pablo', fullName: 'Pablo Martínez', sport: 'futbol', team: 'Cadete B', icon: '⚽', color: colors.futbol },
  'p2': { name: 'Hugo', fullName: 'Hugo Martínez', sport: 'baloncesto', team: 'Infantil Basket', icon: '🏀', color: colors.baloncesto },
  'p3': { name: 'Laura', fullName: 'Laura Martínez', sport: 'voleibol', team: 'Cadete Vóley', icon: '🏐', color: colors.voleibol }
};

type ViewMode = 'HOY' | 'SEMANA' | 'MES' | 'LOGISTICA';
type FilterChild = 'all' | 'p1' | 'p2' | 'p3';

// ==============================
// MOCK DATA
// ==============================
const INITIAL_EVENTS = [
  // HOY (12 Sept)
  { id: 'ev1', playerId: 'p1', day: 12, time: '09:00', shortTime: '09:00', type: 'Partido', title: 'CD Jesuitas vs Levante UD', location: 'Campo 2', citation: '08:15', status: 'Confirmado', requireConfirm: false },
  { id: 'ev2', playerId: 'p2', day: 12, time: '10:30', shortTime: '10:30', type: 'Entrenamiento', title: 'Entrenamiento Físico', location: 'Pabellón Norte', duration: '90 min', status: 'Pendiente', requireConfirm: true },
  { id: 'ev3', playerId: 'p3', day: 12, time: '12:00', shortTime: '12:00', type: 'Partido', title: 'CD Jesuitas vs Colegio Alemán', location: 'Pabellón Central', citation: '11:15', status: 'Confirmado', requireConfirm: false },
  
  // SEMANA
  { id: 'ev4', playerId: 'p2', day: 14, time: '18:00', shortTime: '18:00', type: 'Entrenamiento', title: 'Entrenamiento Cancha', location: 'Cancha 2', status: 'Confirmado' },
  { id: 'ev5', playerId: 'p3', day: 14, time: '19:15', shortTime: '19:15', type: 'Entrenamiento', title: 'Táctica', location: 'Pista Principal', status: 'Confirmado' },
  { id: 'ev6', playerId: 'p1', day: 15, time: '17:30', shortTime: '17:30', type: 'Entrenamiento', title: 'Entrenamiento Físico', location: 'Campo 2', status: 'Confirmado' },
  { id: 'ev7', playerId: 'p2', day: 16, time: '19:30', shortTime: '19:30', type: 'Partido', title: 'Amistoso vs Maristas', location: 'Pabellón Sur', status: 'Confirmado' },
  { id: 'ev8', playerId: 'p3', day: 16, time: '18:00', shortTime: '18:00', type: 'Entrenamiento', title: 'Entrenamiento Recepción', location: 'Pista Principal', status: 'Confirmado' },
  
  // OTROS (Mes)
  { id: 'ev9', playerId: 'p1', day: 19, time: '11:00', shortTime: '11:00', type: 'Partido', title: 'Villarreal vs CD Jesuitas', location: 'Ciudad Dep. Villarreal', status: 'Confirmado' },
  { id: 'ev10', playerId: 'p2', day: 19, time: '10:00', shortTime: '10:00', type: 'Partido', title: 'Valencia Basket vs CD Jesuitas', location: 'L\'Alqueria', status: 'Confirmado' },
  { id: 'ev11', playerId: 'p3', day: 20, time: '12:00', shortTime: '12:00', type: 'Partido', title: 'Xátiva Vóley vs CD Jesuitas', location: 'Pabellón Xátiva', status: 'Confirmado' },
];

export function FamiliaCalendario() {
  const { user } = useAuth();
  const [view, setView] = useState<ViewMode>('HOY');
  const [filterChild, setFilterChild] = useState<FilterChild>('all');
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [selectedDayMes, setSelectedDayMes] = useState<number | null>(null);

  // Fecha Simulada (Sábado 12 Septiembre)
  const TODAY = 12;

  // Filtrado de eventos
  const filteredEvents = useMemo(() => {
    return events.filter(e => filterChild === 'all' || e.playerId === filterChild)
                 .sort((a, b) => {
                    if(a.day !== b.day) return a.day - b.day;
                    return a.time.localeCompare(b.time);
                 });
  }, [events, filterChild]);

  // Eventos de Hoy
  const todayEvents = useMemo(() => filteredEvents.filter(e => e.day === TODAY), [filteredEvents]);
  
  // Próximo evento (el primero de hoy asumiendo que son las 08:00)
  const nextEvent = todayEvents.length > 0 ? todayEvents[0] : null;

  // Confirmar evento localmente
  const handleConfirm = (id: string, newStatus: string) => {
    setEvents(events.map(e => e.id === id ? { ...e, status: newStatus, requireConfirm: false } : e));
  };

  // ==============================
  // COMPONENTES AUXILIARES
  // ==============================
  
  // 1. SELECTOR VISTAS
  const renderViewTabs = () => (
    <View style={styles.viewTabsContainer}>
      {(['HOY', 'SEMANA', 'MES', 'LOGISTICA'] as ViewMode[]).map(v => (
        <TouchableOpacity 
          key={v}
          style={[styles.viewTab, view === v && styles.viewTabActive]}
          onPress={() => setView(v)}
        >
          <Text style={[styles.viewTabText, view === v && styles.viewTabTextActive]}>
            {v === 'LOGISTICA' ? 'LOGÍSTICA' : v}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // 2. SELECTOR HIJOS
  const renderChildFilters = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.childFiltersContainer}>
      <TouchableOpacity 
        style={[styles.childFilterBtn, filterChild === 'all' && styles.childFilterBtnActive]}
        onPress={() => setFilterChild('all')}
      >
        <Text style={[styles.childFilterText, filterChild === 'all' && styles.childFilterTextActive]}>👨‍👩‍👧‍👦 Todos</Text>
      </TouchableOpacity>
      {Object.keys(CHILDS_META).map(id => {
        const meta = CHILDS_META[id];
        const isActive = filterChild === id;
        return (
          <TouchableOpacity 
            key={id} 
            style={[styles.childFilterBtn, isActive && styles.childFilterBtnActive, {borderColor: meta.color}]}
            onPress={() => setFilterChild(id as FilterChild)}
          >
            <Text style={[styles.childFilterText, isActive && styles.childFilterTextActive]}>
              {meta.icon} {meta.name}
            </Text>
          </TouchableOpacity>
        )
      })}
    </ScrollView>
  );

  // 3. TARJETA PRÓXIMO EVENTO
  const renderNextEventCard = () => {
    if(!nextEvent) return null;
    const meta = CHILDS_META[nextEvent.playerId];
    return (
      <View style={styles.nextEventCard}>
        <View style={styles.nextEventHeader}>
           <Text style={styles.nextEventTitle}>PRÓXIMO EVENTO</Text>
           <Text style={styles.nextEventCountdown}>Faltan 1 h 25 min</Text>
        </View>
        <View style={styles.nextEventBody}>
           <Text style={styles.nextEventChildName}>{meta.icon} {meta.fullName}</Text>
           <Text style={styles.nextEventSub}>{nextEvent.type} • {nextEvent.title}</Text>
           <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 12}}>
             <MaterialCommunityIcons name="clock-outline" size={16} color={colors.navy} />
             <Text style={styles.nextEventInfo}>Hoy · {nextEvent.time} {nextEvent.citation ? `(Citación ${nextEvent.citation})` : ''}</Text>
           </View>
           <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 4}}>
             <MaterialCommunityIcons name="map-marker" size={16} color={colors.navy} />
             <Text style={styles.nextEventInfo}>{nextEvent.location}</Text>
           </View>
        </View>
        <View style={styles.nextEventActions}>
           <TouchableOpacity style={styles.btnActionSecondary}>
             <Text style={styles.btnActionTextSecondary}>Ver detalles</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.btnActionSecondary}>
             <Text style={styles.btnActionTextSecondary}>Cómo llegar</Text>
           </TouchableOpacity>
           {nextEvent.requireConfirm && (
             <TouchableOpacity style={styles.btnActionPrimary} onPress={() => handleConfirm(nextEvent.id, 'Confirmado')}>
               <Text style={styles.btnActionTextPrimary}>Confirmar asistencia</Text>
             </TouchableOpacity>
           )}
        </View>
      </View>
    );
  };

  // 4. BOTONES RÁPIDOS
  const renderQuickActions = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActionsContainer}>
      <TouchableOpacity style={styles.quickActionBtn}>
         <FontAwesome name="calendar-plus-o" size={16} color={colors.navy} style={{marginRight: 6}} />
         <Text style={styles.quickActionText}>Añadir a Apple Calendar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.quickActionBtn}>
         <FontAwesome name="share-alt" size={16} color={colors.navy} style={{marginRight: 6}} />
         <Text style={styles.quickActionText}>Compartir agenda</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.quickActionBtn}>
         <FontAwesome name="map-o" size={16} color={colors.navy} style={{marginRight: 6}} />
         <Text style={styles.quickActionText}>Ver mapa del club</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  // 5. NOTIFICACIÓN RESUMEN
  const renderMorningSummary = () => {
    const pCount = todayEvents.filter(e => e.type === 'Partido').length;
    const tCount = todayEvents.filter(e => e.type === 'Entrenamiento').length;
    const pendingCount = todayEvents.filter(e => e.status === 'Pendiente').length;
    
    return (
      <View style={styles.morningSummary}>
         <Text style={styles.morningGreeting}>Buenos días, Familia Martínez.</Text>
         <Text style={styles.morningText}>
            Hoy tenéis: <Text style={{fontWeight: '800'}}>{pCount} partidos</Text>, <Text style={{fontWeight: '800'}}>{tCount} entrenamientos</Text> en <Text style={{fontWeight: '800'}}>3 ubicaciones</Text>.
         </Text>
         {pendingCount > 0 && <Text style={styles.morningWarning}>⚠️ Tenéis {pendingCount} evento(s) pendiente(s) de confirmación.</Text>}
      </View>
    );
  };

  // ==============================
  // VISTAS
  // ==============================

  const renderVistaHoy = () => {
    return (
      <View style={styles.viewContent}>
         <Text style={styles.sectionDateTitle}>HOY · SÁBADO 12 SEPTIEMBRE</Text>
         <View style={styles.timelineContainer}>
            {todayEvents.map((ev, idx) => {
              const meta = CHILDS_META[ev.playerId];
              const isLast = idx === todayEvents.length - 1;
              return (
                <View key={ev.id} style={styles.timelineItem}>
                   {/* Tiempo y Línea */}
                   <View style={styles.timelineLeft}>
                      <Text style={styles.timelineTime}>{ev.time}</Text>
                      {!isLast && <View style={styles.timelineLine} />}
                   </View>
                   {/* Tarjeta Evento */}
                   <View style={styles.timelineCard}>
                      <View style={styles.cardHeader}>
                         <View style={[styles.cardTag, {backgroundColor: meta.color + '20'}]}>
                            <Text style={{fontSize: 12, marginRight: 4}}>{meta.icon}</Text>
                            <Text style={[styles.cardTagText, {color: meta.color}]}>{meta.fullName}</Text>
                         </View>
                         <View style={[styles.statusBadge, ev.status === 'Confirmado' ? styles.statusGreen : styles.statusYellow]}>
                            <Text style={[styles.statusText, ev.status === 'Confirmado' ? styles.statusTextGreen : styles.statusTextYellow]}>
                              {ev.status === 'Confirmado' ? '🟢 Confirmado' : '🟡 Pendiente'}
                            </Text>
                         </View>
                      </View>
                      
                      <Text style={styles.cardType}>{ev.type.toUpperCase()}</Text>
                      <Text style={styles.cardTitle}>{ev.title}</Text>
                      
                      <View style={styles.cardDetailsRow}>
                         <View style={styles.cardDetailBox}>
                            <MaterialCommunityIcons name="map-marker" size={14} color={colors.textMuted} />
                            <Text style={styles.cardDetailText}>{ev.location}</Text>
                         </View>
                         {ev.citation && (
                           <View style={styles.cardDetailBox}>
                              <MaterialCommunityIcons name="clock-alert-outline" size={14} color={colors.textMuted} />
                              <Text style={styles.cardDetailText}>Citación: {ev.citation}</Text>
                           </View>
                         )}
                         {ev.duration && (
                           <View style={styles.cardDetailBox}>
                              <MaterialCommunityIcons name="timer-sand" size={14} color={colors.textMuted} />
                              <Text style={styles.cardDetailText}>{ev.duration}</Text>
                           </View>
                         )}
                      </View>

                      {ev.requireConfirm && (
                        <View style={styles.confirmActionsRow}>
                           <TouchableOpacity style={styles.btnConfirm} onPress={() => handleConfirm(ev.id, 'Confirmado')}>
                              <Text style={styles.btnConfirmText}>Confirmar</Text>
                           </TouchableOpacity>
                           <TouchableOpacity style={styles.btnDecline} onPress={() => handleConfirm(ev.id, 'Ausencia')}>
                              <Text style={styles.btnDeclineText}>Avisar ausencia</Text>
                           </TouchableOpacity>
                        </View>
                      )}
                   </View>
                </View>
              );
            })}
         </View>
      </View>
    );
  };

  const renderVistaSemana = () => {
    // Agrupar por día (Semana del 14 al 20)
    const semanaDays = [14, 15, 16, 17, 18, 19, 20];
    const dayNames = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];
    
    return (
      <View style={styles.viewContent}>
        {semanaDays.map((dayNum, i) => {
          const dayEvents = filteredEvents.filter(e => e.day === dayNum);
          if (dayEvents.length === 0) return null;
          
          return (
            <View key={dayNum} style={styles.semanaDayBlock}>
               <Text style={styles.semanaDayTitle}>{dayNames[i]} {dayNum}</Text>
               {dayEvents.map(ev => {
                 const meta = CHILDS_META[ev.playerId];
                 return (
                   <View key={ev.id} style={styles.semanaEventRow}>
                      <Text style={{fontSize: 16, width: 24, textAlign: 'center'}}>{meta.icon}</Text>
                      <View style={styles.semanaEventDetails}>
                         <Text style={styles.semanaEventText}>
                           <Text style={{fontWeight: '800', color: meta.color}}>{meta.name}</Text> · {ev.type} · {ev.time}
                         </Text>
                         <Text style={styles.semanaEventSub}>{ev.location}</Text>
                      </View>
                   </View>
                 )
               })}
            </View>
          );
        })}
      </View>
    );
  };

  const renderVistaMes = () => {
    // Generar un Grid mock (empieza en martes 1)
    let grid = [];
    let currentDay = 1;
    for (let row = 0; row < 5; row++) {
      let week = [];
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < 1) {
          week.push(null); // offset
        } else if (currentDay <= 30) {
          week.push(currentDay);
          currentDay++;
        } else {
          week.push(null);
        }
      }
      grid.push(week);
    }

    return (
      <View style={styles.viewContent}>
         <View style={styles.monthContainer}>
            <View style={styles.weekDaysRow}>
               {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d, i) => (
                  <Text key={i} style={styles.weekDayText}>{d}</Text>
               ))}
            </View>
            {grid.map((week, wIdx) => (
              <View key={wIdx} style={styles.monthWeekRow}>
                 {week.map((day, dIdx) => {
                    if (!day) return <View key={dIdx} style={styles.monthDayCellEmpty} />;
                    
                    const dayEvents = filteredEvents.filter(e => e.day === day);
                    const isToday = day === TODAY; 
                    const eventsToShow = dayEvents.slice(0, 2);

                    return (
                      <TouchableOpacity 
                        key={dIdx} 
                        style={[styles.monthDayCell, isToday && styles.monthDayCellToday]}
                        onPress={() => dayEvents.length > 0 && setSelectedDayMes(day)}
                      >
                         <View style={styles.monthCellTopRow}>
                            <View style={isToday ? styles.monthDayNumBgToday : null}>
                               <Text style={[styles.monthDayNum, isToday && styles.monthDayNumToday]}>{day}</Text>
                            </View>
                         </View>
                         <View style={styles.monthEventsArea}>
                            {eventsToShow.map((ev, i) => {
                              const meta = CHILDS_META[ev.playerId];
                              return (
                                <View key={i} style={styles.monthEventMiniPill}>
                                   <Text style={styles.monthEventMiniIcon}>{meta.icon}</Text>
                                   <Text style={styles.monthEventMiniText} numberOfLines={1}>{meta.name} {ev.shortTime}</Text>
                                </View>
                              )
                            })}
                            {dayEvents.length > 2 && (
                              <Text style={styles.monthPlusText}>+{dayEvents.length - 2} más</Text>
                            )}
                         </View>
                      </TouchableOpacity>
                    )
                 })}
              </View>
            ))}
         </View>

         {/* Bottom Sheet Modal for Month */}
         <Modal visible={selectedDayMes !== null} transparent animationType="slide">
            <View style={styles.modalOverlay}>
               <TouchableOpacity style={{flex:1}} onPress={() => setSelectedDayMes(null)} />
               <View style={styles.modalContent}>
                  <View style={styles.modalHandle} />
                  <Text style={styles.modalTitle}>Día {selectedDayMes} de Septiembre</Text>
                  <ScrollView style={{marginTop: 16}}>
                    {selectedDayMes && filteredEvents.filter(e => e.day === selectedDayMes).map(ev => {
                      const meta = CHILDS_META[ev.playerId];
                      return (
                        <View key={ev.id} style={styles.modalEventCard}>
                          <Text style={{fontSize: 24, marginRight: 16}}>{meta.icon}</Text>
                          <View style={{flex: 1}}>
                            <Text style={styles.modalEventTitle}>{ev.title}</Text>
                            <Text style={styles.modalEventSub}>{ev.time} · {ev.location}</Text>
                          </View>
                        </View>
                      );
                    })}
                  </ScrollView>
               </View>
            </View>
         </Modal>
      </View>
    );
  };

  const renderVistaLogistica = () => {
    return (
      <View style={styles.viewContent}>
         
         <View style={styles.conflictPanel}>
            <View style={styles.conflictHeader}>
               <Text style={styles.conflictTitle}>⚠️ Conflictos familiares</Text>
               <TouchableOpacity><Text style={styles.conflictBtn}>Ver conflictos</Text></TouchableOpacity>
            </View>
            <Text style={styles.conflictDesc}>Pablo tiene citación a las 08:15. Hugo tiene entrenamiento a las 10:30. Los horarios tienen margen suficiente.</Text>
         </View>

         <View style={styles.logisticaFlow}>
            {/* Hito 1 */}
            <View style={styles.logisticaItem}>
               <View style={styles.logisticaTimeBox}><Text style={styles.logisticaTime}>08:15</Text></View>
               <View style={styles.logisticaCardBlue}>
                  <Text style={styles.logisticaCardTitle}>Salida recomendada de casa</Text>
               </View>
            </View>

            {/* Evento 1 */}
            <View style={styles.logisticaItem}>
               <View style={styles.logisticaTimeBox}><Text style={styles.logisticaTime}>09:00</Text></View>
               <View style={styles.logisticaCard}>
                  <Text style={styles.logisticaCardIcon}>⚽</Text>
                  <View>
                     <Text style={styles.logisticaCardTitle}>Pablo · Partido</Text>
                     <Text style={styles.logisticaCardSub}>Campo 2</Text>
                  </View>
               </View>
            </View>

            {/* Enlace de Transporte */}
            <View style={styles.logisticaLink}>
               <View style={styles.logisticaLinkLine} />
               <View style={styles.logisticaLinkBadge}>
                  <MaterialCommunityIcons name="car" size={14} color={colors.navy} style={{marginRight: 4}}/>
                  <Text style={styles.logisticaLinkText}>Salida hacia Pabellón Norte · Est. 22 min</Text>
               </View>
            </View>

            {/* Evento 2 */}
            <View style={styles.logisticaItem}>
               <View style={styles.logisticaTimeBox}><Text style={styles.logisticaTime}>10:30</Text></View>
               <View style={styles.logisticaCard}>
                  <Text style={styles.logisticaCardIcon}>🏀</Text>
                  <View>
                     <Text style={styles.logisticaCardTitle}>Hugo · Entrenamiento</Text>
                     <Text style={styles.logisticaCardSub}>Pabellón Norte</Text>
                  </View>
               </View>
            </View>

            {/* Enlace de Transporte */}
            <View style={styles.logisticaLink}>
               <View style={styles.logisticaLinkLine} />
               <View style={styles.logisticaLinkBadge}>
                  <MaterialCommunityIcons name="car" size={14} color={colors.navy} style={{marginRight: 4}}/>
                  <Text style={styles.logisticaLinkText}>Salida hacia Pabellón Central · Est. 18 min</Text>
               </View>
            </View>

            {/* Evento 3 */}
            <View style={styles.logisticaItem}>
               <View style={styles.logisticaTimeBox}><Text style={styles.logisticaTime}>12:00</Text></View>
               <View style={styles.logisticaCard}>
                  <Text style={styles.logisticaCardIcon}>🏐</Text>
                  <View>
                     <Text style={styles.logisticaCardTitle}>Laura · Partido</Text>
                     <Text style={styles.logisticaCardSub}>Pabellón Central</Text>
                  </View>
               </View>
            </View>

         </View>

      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]} style={{flex: 1}} showsVerticalScrollIndicator={false}>
         {/* CABECERA STICKY (Selector de Hijos y Pestañas) */}
         <View style={styles.stickyHeader}>
            <Text style={styles.pageTitle}>Calendario Familiar</Text>
            {renderChildFilters()}
            {renderViewTabs()}
         </View>

         <View style={styles.body}>
            {view === 'HOY' && (
              <>
                 {renderQuickActions()}
                 {renderMorningSummary()}
                 {renderNextEventCard()}
                 {renderVistaHoy()}
              </>
            )}
            {view === 'SEMANA' && renderVistaSemana()}
            {view === 'MES' && renderVistaMes()}
            {view === 'LOGISTICA' && renderVistaLogistica()}
         </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  stickyHeader: {
    backgroundColor: '#f9fafb',
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    zIndex: 10,
  },
  pageTitle: { fontSize: 24, fontWeight: '900', color: colors.navy, paddingHorizontal: 20, marginBottom: 16 },
  body: { paddingHorizontal: 20, paddingBottom: 60, paddingTop: 16 },
  
  // Pestañas
  viewTabsContainer: { flexDirection: 'row', backgroundColor: colors.white, borderRadius: 12, padding: 4, marginHorizontal: 20, borderWidth: 1, borderColor: colors.border, marginTop: 12 },
  viewTab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  viewTabActive: { backgroundColor: colors.skyLight },
  viewTabText: { color: colors.textMuted, fontSize: 13, fontWeight: '700' },
  viewTabTextActive: { color: colors.skyPrimary, fontWeight: '900' },

  // Selector Hijos
  childFiltersContainer: { paddingHorizontal: 20, flexGrow: 0 },
  childFilterBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, backgroundColor: colors.white, borderRadius: 20, marginRight: 8, borderWidth: 1.5, borderColor: colors.border },
  childFilterBtnActive: { backgroundColor: colors.navy, borderColor: colors.navy },
  childFilterText: { fontSize: 13, fontWeight: '700', color: colors.navy },
  childFilterTextActive: { color: colors.white },

  // Tarjeta Próximo Evento
  nextEventCard: { backgroundColor: colors.white, borderRadius: 16, padding: 20, marginBottom: 24, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: {width:0, height:4}, elevation: 2, borderWidth: 1, borderColor: colors.border },
  nextEventHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  nextEventTitle: { fontSize: 12, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1 },
  nextEventCountdown: { fontSize: 12, fontWeight: '800', color: colors.danger },
  nextEventBody: { marginBottom: 20 },
  nextEventChildName: { fontSize: 18, fontWeight: '900', color: colors.navy, marginBottom: 4 },
  nextEventSub: { fontSize: 15, fontWeight: '700', color: colors.textMuted },
  nextEventInfo: { fontSize: 14, fontWeight: '600', color: colors.navy, marginLeft: 8 },
  nextEventActions: { flexDirection: 'row', gap: 8 },
  btnActionSecondary: { flex: 1, paddingVertical: 12, backgroundColor: colors.skyLight, borderRadius: 8, alignItems: 'center' },
  btnActionTextSecondary: { color: colors.skyPrimary, fontWeight: '800', fontSize: 13 },
  btnActionPrimary: { flex: 1.5, paddingVertical: 12, backgroundColor: colors.success, borderRadius: 8, alignItems: 'center' },
  btnActionTextPrimary: { color: colors.white, fontWeight: '800', fontSize: 13 },

  // Notificación Resumen
  morningSummary: { backgroundColor: colors.white, padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderLeftWidth: 4, borderColor: colors.border, borderLeftColor: colors.skyPrimary },
  morningGreeting: { fontSize: 16, fontWeight: '900', color: colors.navy, marginBottom: 6 },
  morningText: { fontSize: 14, color: colors.textMuted, lineHeight: 20 },
  morningWarning: { fontSize: 13, color: colors.warning, fontWeight: '800', marginTop: 8 },

  // Acciones Rápidas
  quickActionsContainer: { marginBottom: 16, flexGrow: 0 },
  quickActionBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, marginRight: 10, borderWidth: 1, borderColor: colors.border },
  quickActionText: { fontSize: 13, fontWeight: '700', color: colors.navy },

  // VISTA HOY
  viewContent: { paddingTop: 8 },
  sectionDateTitle: { fontSize: 13, fontWeight: '900', color: colors.textMuted, letterSpacing: 1, marginBottom: 20, marginTop: 8 },
  timelineContainer: { paddingLeft: 10 },
  timelineItem: { flexDirection: 'row', marginBottom: 20 },
  timelineLeft: { width: 60, alignItems: 'center' },
  timelineTime: { fontSize: 14, fontWeight: '900', color: colors.navy, marginBottom: 8 },
  timelineLine: { flex: 1, width: 2, backgroundColor: colors.border },
  timelineCard: { flex: 1, backgroundColor: colors.white, borderRadius: 16, padding: 16, marginLeft: 16, borderWidth: 1, borderColor: colors.border, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 8, elevation: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardTag: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  cardTagText: { fontSize: 12, fontWeight: '800' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusGreen: { backgroundColor: '#dcfce7' },
  statusYellow: { backgroundColor: '#fef9c3' },
  statusText: { fontSize: 10, fontWeight: '900' },
  statusTextGreen: { color: '#166534' },
  statusTextYellow: { color: '#854d0e' },
  cardType: { fontSize: 11, fontWeight: '900', color: colors.textMuted, letterSpacing: 1, marginBottom: 4 },
  cardTitle: { fontSize: 16, fontWeight: '900', color: colors.navy, marginBottom: 12 },
  cardDetailsRow: { flexDirection: 'column', gap: 6 },
  cardDetailBox: { flexDirection: 'row', alignItems: 'center' },
  cardDetailText: { fontSize: 13, color: colors.textMuted, fontWeight: '600', marginLeft: 6 },
  confirmActionsRow: { flexDirection: 'row', marginTop: 16, gap: 12, paddingTop: 16, borderTopWidth: 1, borderColor: colors.border },
  btnConfirm: { flex: 1, backgroundColor: colors.success, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnConfirmText: { color: colors.white, fontWeight: '800', fontSize: 13 },
  btnDecline: { flex: 1, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnDeclineText: { color: colors.textMuted, fontWeight: '800', fontSize: 13 },

  // VISTA SEMANA
  semanaDayBlock: { marginBottom: 24, backgroundColor: colors.white, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.border },
  semanaDayTitle: { fontSize: 14, fontWeight: '900', color: colors.navy, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 8, marginBottom: 12 },
  semanaEventRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  semanaEventDetails: { marginLeft: 12, flex: 1 },
  semanaEventText: { fontSize: 14, color: colors.navy, fontWeight: '600' },
  semanaEventSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },

  // VISTA MES
  monthContainer: { backgroundColor: colors.white, borderRadius: 16, padding: 8, borderWidth: 1, borderColor: colors.border },
  weekDaysRow: { flexDirection: 'row', marginBottom: 8 },
  weekDayText: { flex: 1, textAlign: 'center', fontSize: 11, fontWeight: '900', color: colors.textMuted },
  monthWeekRow: { flexDirection: 'row', marginBottom: 4 },
  monthDayCell: { flex: 1, height: 80, backgroundColor: '#f9fafb', margin: 2, borderRadius: 8, padding: 4 },
  monthDayCellToday: { backgroundColor: colors.skyLight, borderWidth: 1, borderColor: colors.skyPrimary },
  monthDayCellEmpty: { flex: 1, margin: 2 },
  monthCellTopRow: { alignItems: 'center', marginBottom: 4 },
  monthDayNum: { fontSize: 12, fontWeight: '800', color: colors.textMuted },
  monthDayNumToday: { color: colors.skyPrimary, fontWeight: '900' },
  monthDayNumBgToday: { backgroundColor: colors.white, width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  monthEventsArea: { flex: 1 },
  monthEventMiniPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 4, paddingHorizontal: 2, paddingVertical: 2, marginBottom: 2 },
  monthEventMiniIcon: { fontSize: 8, marginRight: 2 },
  monthEventMiniText: { fontSize: 8, fontWeight: '700', color: colors.navy, flex: 1 },
  monthPlusText: { fontSize: 8, fontWeight: '800', color: colors.skyPrimary, textAlign: 'center', marginTop: 2 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '80%' },
  modalHandle: { width: 40, height: 4, backgroundColor: colors.border, borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: '900', color: colors.navy, textAlign: 'center' },
  modalEventCard: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#f9fafb', borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  modalEventTitle: { fontSize: 16, fontWeight: '800', color: colors.navy },
  modalEventSub: { fontSize: 14, color: colors.textMuted, marginTop: 4 },

  // VISTA LOGISTICA
  conflictPanel: { backgroundColor: '#fef2f2', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#fca5a5', marginBottom: 24 },
  conflictHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  conflictTitle: { fontSize: 16, fontWeight: '900', color: colors.danger },
  conflictBtn: { fontSize: 13, fontWeight: '800', color: colors.danger, textDecorationLine: 'underline' },
  conflictDesc: { fontSize: 14, color: '#991b1b', lineHeight: 20 },

  logisticaFlow: { paddingLeft: 10 },
  logisticaItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 0 },
  logisticaTimeBox: { width: 60 },
  logisticaTime: { fontSize: 16, fontWeight: '900', color: colors.navy },
  logisticaCard: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.border },
  logisticaCardBlue: { flex: 1, backgroundColor: colors.skyLight, padding: 16, borderRadius: 16 },
  logisticaCardIcon: { fontSize: 24, marginRight: 12 },
  logisticaCardTitle: { fontSize: 15, fontWeight: '800', color: colors.navy },
  logisticaCardSub: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  logisticaLink: { flexDirection: 'row', marginLeft: 30, marginVertical: 8, alignItems: 'center' },
  logisticaLinkLine: { width: 2, height: 40, backgroundColor: colors.border, marginRight: 20 },
  logisticaLinkBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  logisticaLinkText: { fontSize: 12, fontWeight: '700', color: colors.navy },
});
