import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDelegadoTheme } from '../../context/DelegadoThemeContext';

interface HelpSection {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  content: (colors: any, dynamicStyles: any) => React.ReactNode;
}

export function DelegadoAyudaView() {
  const { colors } = useDelegadoTheme();
  const [expandedSection, setExpandedSection] = useState<string | null>('pasos');

  const toggleSection = (id: string) => {
    setExpandedSection(prev => (prev === id ? null : id));
  };

  const dynamicStyles = getStyles(colors);

  const sections: HelpSection[] = [
    {
      id: 'pasos',
      icon: 'rocket-outline',
      iconBg: 'rgba(79, 195, 247, 0.15)',
      iconColor: colors.skyGlow,
      title: '1. Primeros Pasos',
      subtitle: 'Función del Delegado, flujo habitual y preparación.',
      content: (colors, dynamicStyles) => (
        <View style={dynamicStyles.accordionBody}>
          <View style={dynamicStyles.itemRow}>
            <Text style={dynamicStyles.itemBullet}>•</Text>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.itemTitle}>Función del Delegado:</Text>
              <Text style={dynamicStyles.itemText}>
                Representante oficial del equipo en el terreno de juego, responsable de coordinar convocatorias, revisar licencias y asegurar la comunicación institucional con el club y los árbitros.
              </Text>
            </View>
          </View>

          <View style={dynamicStyles.itemRow}>
            <Text style={dynamicStyles.itemBullet}>•</Text>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.itemTitle}>Flujo de trabajo habitual:</Text>
              <Text style={dynamicStyles.itemText}>
                1. Convocatoria previa ➔ 2. Revisión de dorsales y plantilla ➔ 3. Registro del Partido en Vivo ➔ 4. Generación, firma digital y descarga del Acta oficial.
              </Text>
            </View>
          </View>

          <View style={dynamicStyles.itemRow}>
            <Text style={dynamicStyles.itemBullet}>•</Text>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.itemTitle}>Preparación del partido:</Text>
              <Text style={dynamicStyles.itemText}>
                Accede a "Preparación del Partido" antes de cada encuentro para verificar la convocatoria de los jugadores, asignar dorsales y validar que el cuerpo técnico esté listo.
              </Text>
            </View>
          </View>
        </View>
      ),
    },
    {
      id: 'vivo',
      icon: 'stopwatch-outline',
      iconBg: 'rgba(245, 158, 11, 0.15)',
      iconColor: colors.accentGold,
      title: '2. Partido en Vivo',
      subtitle: 'Registro de goles, tarjetas, sustituciones y eventos.',
      content: (colors, dynamicStyles) => (
        <View style={dynamicStyles.accordionBody}>
          <View style={dynamicStyles.gridSteps}>
            <View style={dynamicStyles.stepCard}>
              <Text style={dynamicStyles.stepTitle}>⚽ Iniciar partido</Text>
              <Text style={dynamicStyles.stepDesc}>Pulsa "Iniciar Partido" para arrancar el cronómetro oficial del encuentro.</Text>
            </View>
            <View style={dynamicStyles.stepCard}>
              <Text style={dynamicStyles.stepTitle}>🥅 Registrar goles</Text>
              <Text style={dynamicStyles.stepDesc}>Selecciona al jugador anotador y pulsa "+ Gol" para sumarlo al marcador.</Text>
            </View>
            <View style={dynamicStyles.stepCard}>
              <Text style={dynamicStyles.stepTitle}>🟨 Amarillas</Text>
              <Text style={dynamicStyles.stepDesc}>Asigna la tarjeta amarilla al jugador amonestado acumulándola en su ficha.</Text>
            </View>
            <View style={dynamicStyles.stepCard}>
              <Text style={dynamicStyles.stepTitle}>🟥 Rojas</Text>
              <Text style={dynamicStyles.stepDesc}>Registra la expulsión directa o por doble amonestación del jugador.</Text>
            </View>
            <View style={dynamicStyles.stepCard}>
              <Text style={dynamicStyles.stepTitle}>🏥 Lesiones</Text>
              <Text style={dynamicStyles.stepDesc}>Marca la retirada por lesión de un jugador para dejar constancia en el informe.</Text>
            </View>
            <View style={dynamicStyles.stepCard}>
              <Text style={dynamicStyles.stepTitle}>🔄 Sustituciones</Text>
              <Text style={dynamicStyles.stepDesc}>Indica el jugador saliente y el entrante para contabilizar los cambios.</Text>
            </View>
            <View style={dynamicStyles.stepCard}>
              <Text style={dynamicStyles.stepTitle}>🎯 Penaltis</Text>
              <Text style={dynamicStyles.stepDesc}>Anota los lanzamientos desde el punto de penalti (anotados o fallados).</Text>
            </View>
            <View style={dynamicStyles.stepCard}>
              <Text style={dynamicStyles.stepTitle}>⏸️ Pausa</Text>
              <Text style={dynamicStyles.stepDesc}>Utiliza la pausa durante el descanso reglamentario o interrupciones.</Text>
            </View>
            <View style={dynamicStyles.stepCard}>
              <Text style={dynamicStyles.stepTitle}>🏁 Finalizar partido</Text>
              <Text style={dynamicStyles.stepDesc}>Al concluir el tiempo, pulsa "Finalizar Partido" para cerrar el marcador.</Text>
            </View>
          </View>
        </View>
      ),
    },
    {
      id: 'acta',
      icon: 'document-text-outline',
      iconBg: 'rgba(16, 185, 129, 0.15)',
      iconColor: colors.accentGreen,
      title: '3. Acta del Partido',
      subtitle: 'Generación, revisión, firma digital y descarga PDF.',
      content: (colors, dynamicStyles) => (
        <View style={dynamicStyles.accordionBody}>
          <View style={dynamicStyles.itemRow}>
            <Text style={dynamicStyles.itemBullet}>•</Text>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.itemTitle}>Generar acta:</Text>
              <Text style={dynamicStyles.itemText}>Una vez finalizado el partido en vivo, los datos del marcador y eventos se vuelcan automáticamente en la sección "Acta del Partido".</Text>
            </View>
          </View>
          <View style={dynamicStyles.itemRow}>
            <Text style={dynamicStyles.itemBullet}>•</Text>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.itemTitle}>Revisar:</Text>
              <Text style={dynamicStyles.itemText}>Verifica que la alineación, el resultado final, las tarjetas y las observaciones coincidan exactamente con lo sucedido en el campo.</Text>
            </View>
          </View>
          <View style={dynamicStyles.itemRow}>
            <Text style={dynamicStyles.itemBullet}>•</Text>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.itemTitle}>Firmar:</Text>
              <Text style={dynamicStyles.itemText}>Introduce la firma digital del Delegado y del Entrenador en el panel interactivo para certificar la validez del documento.</Text>
            </View>
          </View>
          <View style={dynamicStyles.itemRow}>
            <Text style={dynamicStyles.itemBullet}>•</Text>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.itemTitle}>Descargar PDF:</Text>
              <Text style={dynamicStyles.itemText}>Pulsa el botón "Descargar PDF" para generar y guardar el documento oficial en tu dispositivo.</Text>
            </View>
          </View>
        </View>
      ),
    },
    {
      id: 'temporada',
      icon: 'calendar-outline',
      iconBg: 'rgba(129, 212, 250, 0.15)',
      iconColor: colors.skyGlow,
      title: '4. Mi Temporada',
      subtitle: 'Consulta de partidos, resúmenes y actas anteriores.',
      content: (colors, dynamicStyles) => (
        <View style={dynamicStyles.accordionBody}>
          <View style={dynamicStyles.itemRow}>
            <Text style={dynamicStyles.itemBullet}>•</Text>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.itemTitle}>Consultar partidos:</Text>
              <Text style={dynamicStyles.itemText}>Accede al calendario completo de la temporada para revisar jornadas disputadas, fechas y próximos rivales del Cadete B.</Text>
            </View>
          </View>
          <View style={dynamicStyles.itemRow}>
            <Text style={dynamicStyles.itemBullet}>•</Text>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.itemTitle}>Ver resumen:</Text>
              <Text style={dynamicStyles.itemText}>Consulta la ficha de rendimiento del equipo: victorias, empates, derrotas, goles a favor/en contra y balance disciplinario.</Text>
            </View>
          </View>
          <View style={dynamicStyles.itemRow}>
            <Text style={dynamicStyles.itemBullet}>•</Text>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.itemTitle}>Ver acta:</Text>
              <Text style={dynamicStyles.itemText}>Puedes consultar o volver a descargar el PDF del acta firmada de cualquier encuentro anterior finalizado.</Text>
            </View>
          </View>
        </View>
      ),
    },
    {
      id: 'comunicaciones',
      icon: 'chatbubbles-outline',
      iconBg: 'rgba(253, 224, 71, 0.15)',
      iconColor: colors.goldLight,
      title: '5. Comunicaciones',
      subtitle: 'Chat con entrenador, llamadas, WhatsApp y correos.',
      content: (colors, dynamicStyles) => (
        <View style={dynamicStyles.accordionBody}>
          <View style={dynamicStyles.itemRow}>
            <Text style={dynamicStyles.itemBullet}>•</Text>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.itemTitle}>Chat con el entrenador:</Text>
              <Text style={dynamicStyles.itemText}>Escribe un mensaje rápido en el cuadro de texto y envíalo directamente con el botón de envío o la tecla Intro.</Text>
            </View>
          </View>
          <View style={dynamicStyles.itemRow}>
            <Text style={dynamicStyles.itemBullet}>•</Text>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.itemTitle}>Llamada:</Text>
              <Text style={dynamicStyles.itemText}>Pulsa el botón "Llamar" para ponerte en contacto telefónico directo con el Míster del Cadete B.</Text>
            </View>
          </View>
          <View style={dynamicStyles.itemRow}>
            <Text style={dynamicStyles.itemBullet}>•</Text>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.itemTitle}>WhatsApp:</Text>
              <Text style={dynamicStyles.itemText}>Abre WhatsApp con un mensaje pre-estructurado con los datos del equipo y tu perfil de Delegado.</Text>
            </View>
          </View>
          <View style={dynamicStyles.itemRow}>
            <Text style={dynamicStyles.itemBullet}>•</Text>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.itemTitle}>Correo a Coordinación:</Text>
              <Text style={dynamicStyles.itemText}>Inicia una consulta para temas técnicos, licencias o reglamentos oficiales del club.</Text>
            </View>
          </View>
          <View style={dynamicStyles.itemRow}>
            <Text style={dynamicStyles.itemBullet}>•</Text>
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.itemTitle}>Correo a Administración:</Text>
              <Text style={dynamicStyles.itemText}>Canal directo para trámites administrativos, certificados, recibos y gestión documental.</Text>
            </View>
          </View>
        </View>
      ),
    },
    {
      id: 'faq',
      icon: 'help-circle-outline',
      iconBg: 'rgba(79, 195, 247, 0.15)',
      iconColor: colors.skyPrimary,
      title: '6. Preguntas Frecuentes',
      subtitle: 'Resolución de dudas e incidencias comunes.',
      content: (colors, dynamicStyles) => (
        <View style={dynamicStyles.accordionBody}>
          <View style={dynamicStyles.faqBox}>
            <Text style={dynamicStyles.faqQ}>❓ ¿No aparece un jugador?</Text>
            <Text style={dynamicStyles.faqA}>
              Verifica con Coordinación que la licencia federativa esté validada y que el jugador esté asignado al equipo Cadete B en la plantilla oficial.
            </Text>
          </View>

          <View style={dynamicStyles.faqBox}>
            <Text style={dynamicStyles.faqQ}>❓ ¿He registrado una acción por error?</Text>
            <Text style={dynamicStyles.faqA}>
              En la pantalla de Partido en Vivo, utiliza la opción de deshacer o edita la acción desde la lista de eventos del cronómetro.
            </Text>
          </View>

          <View style={dynamicStyles.faqBox}>
            <Text style={dynamicStyles.faqQ}>❓ ¿No puedo generar el acta?</Text>
            <Text style={dynamicStyles.faqA}>
              Asegúrate de haber pulsado "Finalizar Partido" en el cronómetro en vivo para habilitar la firma digital y la generación del PDF.
            </Text>
          </View>

          <View style={dynamicStyles.faqBox}>
            <Text style={dynamicStyles.faqQ}>❓ ¿No funciona el correo?</Text>
            <Text style={dynamicStyles.faqA}>
              Usa la opción "Abrir Gmail web" o copia el correo y el asunto desde el menú contextual emergente para enviarlo desde tu cliente de correo.
            </Text>
          </View>

          <View style={dynamicStyles.faqBox}>
            <Text style={dynamicStyles.faqQ}>❓ ¿No abre WhatsApp?</Text>
            <Text style={dynamicStyles.faqA}>
              Comprueba que tengas WhatsApp Web o la App instalada; de lo contrario, copia el número y el mensaje preparado con los botones de auxilio.
            </Text>
          </View>
        </View>
      ),
    },
    {
      id: 'soporte',
      icon: 'headset-outline',
      iconBg: 'rgba(16, 185, 129, 0.15)',
      iconColor: colors.accentGreen,
      title: '7. Soporte Técnico',
      subtitle: 'Asistencia y atención directa del club.',
      content: (colors, dynamicStyles) => (
        <View style={dynamicStyles.accordionBody}>
          <View style={dynamicStyles.supportBox}>
            <Ionicons name="information-circle-outline" size={28} color={colors.accentGreen} />
            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.supportTitle}>¿Necesitas ayuda adicional?</Text>
              <Text style={dynamicStyles.supportDesc}>
                Si el problema continúa y no has podido resolverlo con esta guía, ponte en contacto directo con la Coordinación Deportiva del Club a través de los canales de comunicación oficial.
              </Text>
            </View>
          </View>
        </View>
      ),
    },
  ];

  return (
    <View style={dynamicStyles.container}>
      <ScrollView style={dynamicStyles.scroll} contentContainerStyle={dynamicStyles.scrollContent}>
        {/* HERO HEADER */}
        <LinearGradient colors={colors.heroGradient} style={dynamicStyles.heroCard}>
          <View style={dynamicStyles.heroBadge}>
            <Ionicons name="book-outline" size={16} color={colors.skyGlow} />
            <Text style={dynamicStyles.heroBadgeTxt}>CENTRO DE AYUDA Y RESOLUCIÓN RÁPIDA</Text>
          </View>
          <Text style={dynamicStyles.heroTitle}>Guía del Delegado</Text>
          <Text style={dynamicStyles.heroSub}>
            Respuestas prácticas y flujos de trabajo para gestionar partidos, actas y comunicaciones en menos de un minuto.
          </Text>
        </LinearGradient>

        {/* ACCORDION CARDS */}
        {sections.map(section => {
          const isExpanded = expandedSection === section.id;
          return (
            <View key={section.id} style={dynamicStyles.card}>
              <TouchableOpacity
                style={dynamicStyles.cardHeader}
                onPress={() => toggleSection(section.id)}
                activeOpacity={0.85}
              >
                <View style={[dynamicStyles.iconCircle, { backgroundColor: section.iconBg }]}>
                  <Ionicons name={section.icon} size={20} color={section.iconColor} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={dynamicStyles.cardTitle}>{section.title}</Text>
                  <Text style={dynamicStyles.cardSub}>{section.subtitle}</Text>
                </View>
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={colors.textMuted}
                />
              </TouchableOpacity>

              {isExpanded && section.content(colors, dynamicStyles)}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },

  heroCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderGlow,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(129, 212, 250, 0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  heroBadgeTxt: {
    color: colors.skyGlow,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
  },
  heroSub: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },

  card: {
    backgroundColor: colors.navyCard,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.borderGlow,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justify: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  cardSub: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },

  accordionBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.borderGlow,
  },

  itemRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  itemBullet: {
    color: colors.skyGlow,
    fontSize: 16,
    fontWeight: '900',
  },
  itemTitle: {
    color: colors.skyGlow,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },
  itemText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },

  gridSteps: {
    gap: 8,
    marginTop: 8,
  },
  stepCard: {
    backgroundColor: colors.subCardBg,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderGlow,
  },
  stepTitle: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },
  stepDesc: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },

  faqBox: {
    backgroundColor: colors.subCardBg,
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.borderGlow,
  },
  faqQ: {
    color: colors.goldLight,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 4,
  },
  faqA: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },

  supportBox: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    backgroundColor: colors.subCardBg,
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.borderGlow,
  },
  supportTitle: {
    color: colors.accentGreen,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  supportDesc: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
});
