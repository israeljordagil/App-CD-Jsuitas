import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../../../src/utils/theme';
import { AnimatedCard as Card } from '../../../src/components/ui/AnimatedCard';

const { width } = Dimensions.get('window');

const MOCK_NEWS = [
  { id: 1, title: 'Comienza la pretemporada oficial.', img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=400&q=80', date: 'Hace 2 horas' },
  { id: 2, title: 'El Infantil A gana el torneo de verano.', img: 'https://images.unsplash.com/photo-1518605368461-1ee7c532066d?auto=format&fit=crop&w=400&q=80', date: 'Ayer' },
  { id: 3, title: 'Presentación oficial de todos los equipos.', img: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=400&q=80', date: 'Hace 3 días' },
  { id: 4, title: 'Abierto el periodo de inscripción para el Campus de Navidad.', img: 'https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?auto=format&fit=crop&w=400&q=80', date: 'Hace 1 semana' },
  { id: 5, title: 'Nuevo patrocinador para la temporada 2026/2027.', img: 'https://images.unsplash.com/photo-1574629810360-7efbb472c419?auto=format&fit=crop&w=400&q=80', date: 'Hace 1 semana' },
  { id: 6, title: 'Entrevista al Director Deportivo en Radio Local.', img: 'https://images.unsplash.com/photo-1505342411656-74fc212239bc?auto=format&fit=crop&w=400&q=80', date: 'Hace 2 semanas' },
  { id: 7, title: 'Renovación del césped en el Campo 2 completada.', img: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=400&q=80', date: 'Hace 2 semanas' },
  { id: 8, title: 'El Juvenil A consigue un valioso empate fuera de casa.', img: 'https://images.unsplash.com/photo-1553152531-11c38bfebbc2?auto=format&fit=crop&w=400&q=80', date: 'Hace 3 semanas' },
  { id: 9, title: 'Acuerdo formativo con la Federación de Fútbol.', img: 'https://images.unsplash.com/photo-1534015668612-da0e118335f6?auto=format&fit=crop&w=400&q=80', date: 'Hace 1 mes' },
  { id: 10, title: 'Nuevas equipaciones disponibles en la tienda oficial.', img: 'https://images.unsplash.com/photo-1616124619460-ff4ed8f4683c?auto=format&fit=crop&w=400&q=80', date: 'Hace 1 mes' }
];

const MOCK_EVENTS = [
  { icon: 'trophy', title: 'Torneos' },
  { icon: 'futbol-o', title: 'Clínics' },
  { icon: 'graduation-cap', title: 'Charlas Formativas' },
  { icon: 'glass', title: 'Fiesta Fin Temporada' },
  { icon: 'camera', title: 'Fotos Oficiales' },
  { icon: 'heart', title: 'Actividades Solidarias' }
];

const MOCK_INSTALACIONES = [
  { title: 'Campo 1 (Principal)', desc: 'Césped artificial de última generación. Gradas para 500 personas.', img: 'https://images.unsplash.com/photo-1518605368461-1ee7c532066d?auto=format&fit=crop&w=400&q=80' },
  { title: 'Campo 2 (Anexo)', desc: 'Césped artificial, ideal para entrenamientos técnicos de Fútbol 11.', img: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=400&q=80' },
  { title: 'Campo 3', desc: 'Renovado recientemente. Equipado para partidos nocturnos.', img: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=400&q=80' },
  { title: 'Campo de Fútbol 8', desc: 'Espacio adaptado para categorías desde Querubines hasta Alevines.', img: 'https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?auto=format&fit=crop&w=400&q=80' },
  { title: 'Vestuarios', desc: '12 vestuarios amplios y sala exclusiva para árbitros.', img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=400&q=80' },
  { title: 'Gimnasio', desc: 'Zona de musculación y prevención de lesiones.', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80' },
  { title: 'Cafetería', desc: 'Punto de encuentro para familias. Amplia terraza con vistas al Campo 1.', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80' }
];

const MOCK_TIENDA = [
  { title: '1ª Equipación (Azul)', price: '45.00€', icon: '👕', bg: '#0B1F4D' },
  { title: '2ª Equipación (Blanca)', price: '45.00€', icon: '👕', bg: '#ffffff' },
  { title: 'Sudadera Oficial', price: '35.00€', icon: '🧥', bg: '#4FC3F7' },
  { title: 'Mochila de Transporte', price: '25.00€', icon: '🎒', bg: '#222' },
  { title: 'Gorra CD Jesuitas', price: '12.00€', icon: '🧢', bg: '#0B1F4D' },
  { title: 'Balón Oficial (Talla 5)', price: '20.00€', icon: '⚽', bg: '#fff' }
];

const MOCK_VALORES = [
  { title: 'Compañerismo', desc: 'El equipo siempre va por delante de las individualidades.', icon: 'users', color: colors.sky },
  { title: 'Respeto', desc: 'A compañeros, entrenadores, árbitros y rivales.', icon: 'handshake-o', color: '#22C55E' },
  { title: 'Esfuerzo', desc: 'No negociamos el trabajo diario ni la actitud en el campo.', icon: 'fire', color: '#F97316' },
  { title: 'Superación', desc: 'Buscamos ser mejores hoy que ayer.', icon: 'line-chart', color: '#EAB308' },
  { title: 'Juego Limpio', desc: 'Competimos con nobleza y sin trampas.', icon: 'hand-peace-o', color: '#A855F7' },
  { title: 'Humildad', desc: 'Saber ganar y, sobre todo, saber perder.', icon: 'smile-o', color: '#3B82F6' },
  { title: 'Compromiso', desc: 'Implicación total con el proyecto deportivo del club.', icon: 'check-circle', color: '#10B981' },
  { title: 'Ejemplaridad', desc: 'Ser un modelo a seguir dentro y fuera del terreno de juego.', icon: 'star', color: '#F59E0B' }
];

const MOCK_ORGANIGRAMA = [
  { name: 'Javier Martínez', role: 'Director Deportivo', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200&q=80' },
  { name: 'Rubén Cazallas', role: 'Coordinador F11', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80' },
  { name: 'David Gómez', role: 'Coordinador F8', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
  { name: 'Carlos Ruiz', role: 'Entrenador Cadete', img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80' },
  { name: 'Miguel Ángel', role: 'Delegado', img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80' }
];

const MOCK_FAQ = [
  { q: '¿Cuándo empiezan los entrenamientos?', a: 'La pretemporada comienza la primera semana de septiembre para F11 y la tercera semana para F8.' },
  { q: '¿Cómo solicito un cambio de talla de la equipación?', a: 'Contacta con el coordinador de tu categoría o envía un correo a tienda@cdjesuitas.es.' },
  { q: '¿Qué debo hacer si me lesiono?', a: 'Comunícalo inmediatamente a tu entrenador para que el club active el protocolo con el seguro médico y los fisioterapeutas.' },
  { q: '¿Se puede entrenar con otra ropa que no sea la oficial?', a: 'No, es obligatorio asistir a todos los entrenamientos con la ropa oficial de entrenamiento del CD Jesuitas.' },
  { q: '¿Cuándo se publican las convocatorias?', a: 'Generalmente el jueves tras el último entrenamiento de la semana.' },
  { q: '¿Dónde veo los horarios de los partidos?', a: 'Tanto en la sección "Calendario" de esta app como en el tablón oficial del club.' },
  { q: '¿Cómo justifico una falta de asistencia?', a: 'Hablando directamente con el entrenador o a través de la sección de Mensajes de la app con al menos 24 horas de antelación.' },
  { q: '¿Las gradas están abiertas en los entrenamientos?', a: 'Sí, pero se ruega a los familiares no intervenir ni dar instrucciones a los jugadores.' },
  { q: '¿Cuándo son los torneos de Navidad y Verano?', a: 'El club anunciará las fechas exactas y los equipos invitados un mes antes del inicio de los mismos.' },
  { q: '¿Dónde puedo consultar el reglamento interno?', a: 'En la sección Documentos de la app o solicitándolo en las oficinas del club.' }
];

export default function ClubJugadorScreen() {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* NAVEGACIÓN */}
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <FontAwesome name="arrow-left" size={20} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>TU CLUB</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* 1. CABECERA PREMIUM */}
        <Card delay={100} style={styles.heroWrapper}>
           <ImageBackground 
              source={{ uri: 'https://images.unsplash.com/photo-1518605368461-1ee7c532066d?auto=format&fit=crop&w=800&q=80' }}
              style={styles.heroBackground}
              imageStyle={{ borderRadius: 24, opacity: 0.4 }}
           >
              <View style={styles.heroOverlay}>
                 <View style={styles.heroShieldBox}>
                    <FontAwesome name="shield" size={60} color={colors.white} />
                 </View>
                 <Text style={styles.heroTitle}>CD Jesuitas</Text>
                 <Text style={styles.heroLema}>"Más que un equipo, una familia."</Text>
              </View>
           </ImageBackground>
        </Card>

        {/* 2. NOTICIAS DEL CLUB */}
        <Text style={styles.sectionTitle}>Últimas Noticias</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll} contentContainerStyle={{ gap: 16 }}>
           {MOCK_NEWS.map((news, idx) => (
              <Card delay={150 + (idx * 20)} key={news.id} style={styles.newsCard}>
                 <Image source={{ uri: news.img }} style={styles.newsImg} />
                 <View style={styles.newsContent}>
                    <Text style={styles.newsDate}>{news.date}</Text>
                    <Text style={styles.newsTitle} numberOfLines={3}>{news.title}</Text>
                 </View>
              </Card>
           ))}
        </ScrollView>

        {/* 3. EVENTOS */}
        <Text style={styles.sectionTitle}>Eventos y Actividades</Text>
        <View style={styles.eventsGrid}>
           {MOCK_EVENTS.map((ev, idx) => (
              <Card delay={200 + (idx * 20)} key={idx} style={styles.eventBox}>
                 <FontAwesome name={ev.icon as any} size={24} color={colors.sky} style={{ marginBottom: 12 }} />
                 <Text style={styles.eventTitle}>{ev.title}</Text>
              </Card>
           ))}
        </View>

        {/* 7. VALORES DEL CLUB */}
        <Text style={styles.sectionTitle}>Nuestro ADN</Text>
        <View style={styles.valoresGrid}>
           {MOCK_VALORES.map((val, idx) => (
              <Card delay={250 + (idx * 20)} key={idx} style={styles.valorCard}>
                 <View style={styles.valorHeader}>
                    <View style={[styles.valorIconBox, { backgroundColor: `${val.color}20` }]}>
                       <FontAwesome name={val.icon as any} size={20} color={val.color} />
                    </View>
                    <Text style={styles.valorTitle}>{val.title}</Text>
                 </View>
                 <Text style={styles.valorDesc}>{val.desc}</Text>
              </Card>
           ))}
        </View>

        {/* 4. INSTALACIONES */}
        <Text style={styles.sectionTitle}>Instalaciones</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll} contentContainerStyle={{ gap: 16 }}>
           {MOCK_INSTALACIONES.map((inst, idx) => (
              <Card delay={300 + (idx * 20)} key={idx} style={styles.instCard}>
                 <Image source={{ uri: inst.img }} style={styles.instImg} />
                 <View style={styles.instContent}>
                    <Text style={styles.instTitle}>{inst.title}</Text>
                    <Text style={styles.instDesc} numberOfLines={3}>{inst.desc}</Text>
                 </View>
              </Card>
           ))}
        </ScrollView>

        {/* 5. TIENDA OFICIAL */}
        <Text style={styles.sectionTitle}>Tienda Oficial</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll} contentContainerStyle={{ gap: 12 }}>
           {MOCK_TIENDA.map((prod, idx) => (
              <Card delay={350 + (idx * 20)} key={idx} style={styles.shopCard}>
                 <View style={[styles.shopImgBox, { backgroundColor: prod.bg }]}>
                    <Text style={styles.shopIconText}>{prod.icon}</Text>
                 </View>
                 <Text style={styles.shopTitle} numberOfLines={2}>{prod.title}</Text>
                 <Text style={styles.shopPrice}>{prod.price}</Text>
              </Card>
           ))}
        </ScrollView>

        {/* 6. HISTORIA DEL CLUB */}
        <Text style={styles.sectionTitle}>Nuestra Historia</Text>
        <Card delay={400} style={styles.historyCard}>
           <FontAwesome name="book" size={24} color={colors.sky} style={{ marginBottom: 16 }} />
           <Text style={styles.historyText}>El CD Jesuitas fue fundado con el objetivo principal de ofrecer una formación integral a través del deporte. A lo largo de los años, hemos crecido manteniendo siempre intactos nuestros valores fundacionales: respeto, esfuerzo y compromiso.</Text>
           <Text style={styles.historyText}>Nuestra filosofía no se basa únicamente en la competición y los resultados, sino en la educación en valores, utilizando el fútbol como herramienta para formar grandes personas antes que grandes futbolistas.</Text>
           <Text style={styles.historyText}>Nuestros objetivos deportivos se centran en el desarrollo técnico y táctico de los jugadores, garantizando que cada miembro del club alcance su máximo potencial en un entorno sano, seguro y altamente motivador.</Text>
        </Card>

        {/* 8. ORGANIGRAMA */}
        <Text style={styles.sectionTitle}>Organigrama Técnico</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll} contentContainerStyle={{ gap: 16 }}>
           {MOCK_ORGANIGRAMA.map((staff, idx) => (
              <Card delay={450 + (idx * 20)} key={idx} style={styles.staffCard}>
                 <Image source={{ uri: staff.img }} style={styles.staffImg} />
                 <Text style={styles.staffName}>{staff.name}</Text>
                 <Text style={styles.staffRole}>{staff.role}</Text>
              </Card>
           ))}
        </ScrollView>

        {/* 9. CONTACTO */}
        <Text style={styles.sectionTitle}>Contacto Oficial</Text>
        <Card delay={500} style={styles.contactCard}>
           <View style={styles.contactRow}>
              <View style={styles.contactIconBox}><FontAwesome name="phone" size={16} color={colors.white} /></View>
              <Text style={styles.contactText}>+34 900 123 456</Text>
           </View>
           <View style={styles.contactRow}>
              <View style={styles.contactIconBox}><FontAwesome name="envelope" size={16} color={colors.white} /></View>
              <Text style={styles.contactText}>info@cdjesuitas.es</Text>
           </View>
           <View style={styles.contactRow}>
              <View style={styles.contactIconBox}><FontAwesome name="map-marker" size={16} color={colors.white} /></View>
              <Text style={styles.contactText}>Av. de la Educación Deportiva, 1</Text>
           </View>
           <View style={styles.contactRow}>
              <View style={styles.contactIconBox}><FontAwesome name="globe" size={16} color={colors.white} /></View>
              <Text style={styles.contactText}>www.cdjesuitas.es</Text>
           </View>
        </Card>

        {/* 10. PREGUNTAS FRECUENTES */}
        <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
        <View style={styles.faqList}>
           {MOCK_FAQ.map((faq, idx) => (
              <Card delay={550 + (idx * 20)} key={idx} style={styles.faqCard}>
                 <TouchableOpacity activeOpacity={0.7} style={styles.faqHeader} onPress={() => toggleFaq(idx)}>
                    <Text style={styles.faqQ}>{faq.q}</Text>
                    <FontAwesome name={expandedFaq === idx ? 'chevron-up' : 'chevron-down'} size={14} color={colors.sky} />
                 </TouchableOpacity>
                 {expandedFaq === idx && (
                    <Text style={styles.faqA}>{faq.a}</Text>
                 )}
              </Card>
           ))}
        </View>

        <View style={{ height: 60 }} />

      </ScrollView>
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
  sectionTitle: { color: colors.white, fontSize: 16, fontWeight: '900', marginTop: spacing.xl, marginBottom: spacing.m, textTransform: 'uppercase', letterSpacing: 0.5 },

  // Hero
  heroWrapper: { borderRadius: 24, overflow: 'hidden', backgroundColor: 'rgba(0,0,0,0.5)', height: 220, marginBottom: spacing.m },
  heroBackground: { width: '100%', height: '100%' },
  heroOverlay: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(11, 31, 77, 0.4)' },
  heroShieldBox: { width: 80, height: 80, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  heroTitle: { color: colors.white, fontSize: 28, fontWeight: '900', letterSpacing: 1 },
  heroLema: { color: colors.sky, fontSize: 14, fontWeight: '700', fontStyle: 'italic', marginTop: 8 },

  hScroll: { paddingRight: 40, paddingBottom: 10 },

  // Noticias
  newsCard: { width: width * 0.7, backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', borderRadius: 20, overflow: 'hidden' },
  newsImg: { width: '100%', height: 140 },
  newsContent: { padding: 16 },
  newsDate: { color: colors.sky, fontSize: 11, fontWeight: '800', textTransform: 'uppercase', marginBottom: 6 },
  newsTitle: { color: colors.white, fontSize: 14, fontWeight: '700', lineHeight: 20 },

  // Eventos
  eventsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  eventBox: { width: '31%', backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 16, alignItems: 'center' },
  eventTitle: { color: colors.white, fontSize: 10, fontWeight: '800', textAlign: 'center', textTransform: 'uppercase' },

  // Valores
  valoresGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  valorCard: { width: '48%', backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 20 },
  valorHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  valorIconBox: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  valorTitle: { color: colors.white, fontSize: 14, fontWeight: '900', flex: 1 },
  valorDesc: { color: colors.muted, fontSize: 12, fontWeight: '600', lineHeight: 18 },

  // Instalaciones
  instCard: { width: width * 0.7, backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', borderRadius: 20, overflow: 'hidden' },
  instImg: { width: '100%', height: 160 },
  instContent: { padding: 16 },
  instTitle: { color: colors.white, fontSize: 15, fontWeight: '900', marginBottom: 6 },
  instDesc: { color: colors.muted, fontSize: 13, fontWeight: '500', lineHeight: 18 },

  // Tienda
  shopCard: { width: 140, backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 12 },
  shopImgBox: { width: '100%', height: 100, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  shopIconText: { fontSize: 40 },
  shopTitle: { color: colors.white, fontSize: 12, fontWeight: '700', marginBottom: 6, minHeight: 32 },
  shopPrice: { color: colors.sky, fontSize: 14, fontWeight: '900' },

  // Historia
  historyCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: 24, borderRadius: 24 },
  historyText: { color: colors.white, fontSize: 14, fontWeight: '600', lineHeight: 22, marginBottom: 12, textAlign: 'justify' },

  // Organigrama
  staffCard: { width: 130, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 20 },
  staffImg: { width: 70, height: 70, borderRadius: 35, marginBottom: 12, borderWidth: 2, borderColor: colors.sky },
  staffName: { color: colors.white, fontSize: 13, fontWeight: '900', textAlign: 'center', marginBottom: 4 },
  staffRole: { color: colors.sky, fontSize: 10, fontWeight: '800', textAlign: 'center', textTransform: 'uppercase' },

  // Contacto
  contactCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: 24, borderRadius: 24, gap: 16 },
  contactRow: { flexDirection: 'row', alignItems: 'center' },
  contactIconBox: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(79, 195, 247, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  contactText: { color: colors.white, fontSize: 14, fontWeight: '600' },

  // FAQ
  faqList: { gap: 12 },
  faqCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 16 },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQ: { color: colors.white, fontSize: 14, fontWeight: '700', flex: 1, marginRight: 16 },
  faqA: { color: colors.muted, fontSize: 13, fontWeight: '500', marginTop: 12, lineHeight: 20 }
});
