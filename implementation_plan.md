# Implementación de Simulador Táctico Avanzado (Drag & Drop)

Este documento detalla la arquitectura para convertir la pantalla de Táctica en un simulador interactivo real con soporte de *Drag & Drop* (arrastrar y soltar) táctil, gestión de suplentes y validaciones inteligentes en tiempo real.

## User Review Required

> [!WARNING]
> **Drag & Drop Táctil en React Native**: Para garantizar un rendimiento óptimo en móviles sin depender de librerías externas pesadas (que suelen causar conflictos con Expo Go), implementaremos un motor propio basado en `PanResponder` y la API de animaciones `Animated`.
> 
> **Mecánica**: 
> 1. El usuario mantendrá pulsada una ficha para "levantarla".
> 2. Mientras la arrastra, comprobaremos las colisiones con las "zonas de caída" (Drop Zones) de las 11 posiciones del campo o la zona del banquillo.
> 3. Al soltar, calcularemos si debe intercambiarse (*swap*), colocarse en hueco vacío, o enviar al anterior jugador al banquillo.

## Open Questions

> [!IMPORTANT]
> - Para asegurar que el arrastre no entre en conflicto con el `ScrollView` general de la pantalla, desactivaremos el scroll de la vista temporalmente mientras estés arrastrando a un jugador. ¿Te parece correcta esta aproximación para garantizar la máxima fluidez del gesto táctil?

## Proposed Changes

### `app/(drawer)/entrenador/`

#### [MODIFY] [tactica.tsx](file:///Users/israeljordagil/Desktop/antigravity/jesuitas-mobile-app/app/(drawer)/entrenador/tactica.tsx)
- **Gestión de Plantilla**: Ampliación de los datos *mock* a 22 jugadores, integrando el estado médico/sanción (🟢 Disponible, 🟡 Duda, 🔴 Lesionado, ⚫ Sancionado) y su posición natural.
- **Motor `PanResponder`**: Implementación de *touch events* para capturar coordenadas `(x, y)` y desplazar las tarjetas de jugador flotando sobre el campo.
- **Lógica de Intercambio (Swapping)**: 
  - Si Titular A se suelta sobre Titular B -> Intercambian posiciones.
  - Si Suplente C se suelta sobre Titular A -> C ocupa la posición, A va al banquillo.
  - Si Titular A se suelta sobre posición vacía -> A ocupa la posición.
- **Zonas de Campo Interactivas**: Los nodos del campo (según el sistema 1-4-2-3-1, etc.) pasarán de ser simples coordenadas a "Cajas de destino" que mostrarán un `+ Añadir` cuando estén vacías, permitiendo abrir un selector modal como alternativa al Drag & Drop.
- **Motor de Validaciones**: Función reactiva que analiza la alineación actual y genera avisos en tiempo real:
  - Validar `< 11` o `> 11` titulares.
  - Validar la presencia obligatoria de 1 Portero.
  - Alerta roja si hay algún jugador con estado 🔴 o ⚫ en el once.
- **Nuevos Botones de Acción**: Integración de la botonera inferior solicitada (Guardar alineación, Restablecer, Limpiar campo, Autoalinear, Enviar a convocatoria).

## Verification Plan

### Pruebas Manuales
1. Arrastrar a Álex (10) al banquillo y verificar que el campo muestra "+ Añadir" en su hueco.
2. Arrastrar a Pablo (Suplente) al hueco de Álex.
3. Arrastrar a Hugo encima de Marco y verificar que se intercambian.
4. Pulsar sobre una zona vacía "+ Añadir" y seleccionar un jugador del modal.
5. Seleccionar un jugador lesionado para el campo y comprobar que salta la alerta roja de validación en la parte superior.
