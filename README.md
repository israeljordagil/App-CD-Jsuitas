# App CD Jesuitas

Aplicación oficial del Club Deportivo Jesuitas (San José) desarrollada con Expo SDK 57, Expo Router, React Native Web y Supabase.

## Despliegue web en Vercel

Este proyecto está preparado para exportación estática de Expo Router y su posterior despliegue en Vercel.

### Comandos principales

* **Instalación de dependencias**:
  ```bash
  npm install
  ```

* **Probar la web en modo desarrollo**:
  ```bash
  npm run web
  ```

* **Compilación de producción para web**:
  ```bash
  npm run build:web
  ```

* **Directorio de salida**:
  El comando de compilación genera todos los archivos HTML y bundles estáticos en el directorio:
  ```text
  dist/
  ```

### Pruebas de la compilación en local

Puedes previsualizar el resultado estático compilado mediante:

```bash
npx serve dist
```

### Variables de entorno necesarias en Vercel

En el panel de Vercel (Project Settings > Environment Variables) añade las siguientes variables públicas:

```env
EXPO_PUBLIC_SUPABASE_URL=tu_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

> **Importante**: No añadas la clave privada `service_role` en las variables de entorno de Vercel Frontend.

### Configuración en el panel de Vercel

* **Build Command**: `npm run build:web` (o `npm run vercel-build`)
* **Output Directory**: `dist`
* **Framework Preset**: `Other` / `None`
