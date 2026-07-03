<div align="center">

# 👑🎶 Myke Towers

### *El Young King* — Experiencia Digital Interactiva

Un sitio web inmersivo dedicado a la carrera musical de Myke Towers.
Discografía completa, biografía editorial, videos musicales y documentación de API pública.

<br/>

[![Vercel](https://img.shields.io/badge/Desplegado_en-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://myke-towers.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

[Ver Demo en Vivo](https://myke-towers.vercel.app/)

</div>

---

<br/>

## Índice

1. [Visión General](#visión-general)
2. [Características](#características)
3. [Tecnologías](#tecnologías)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Inicio Rápido](#inicio-rápido)
6. [ Scripts Disponibles](#scripts-disponibles)
7. [Rutas](#rutas)
8. [Sistema de Reproducción Musical](#sistema-de-reproducción-musical)
9. [SEO y Rendimiento](#seo-y-rendimiento)
10. [Documentación de la API](#documentación-de-la-api)
11. [Decisiones Técnicas](#decisiones-técnicas)
12. [Licencia](#licencia)

<br/>

---

<br/>

## Visión General

**Myke Towers** no es simplemente un sitio web de un artista. Es una experiencia digital que acompaña la carrera de uno de los exponentes más relevantes de la música urbana puertorriqueña.

El proyecto fue concebido como un homenaje interactivo: un espacio donde los fans pueden explorar la discografía completa del artista, sumergirse en su biografía a través de una línea de tiempo editorial, navegar por sus videos musicales y descubrir la documentación técnica de su API pública.

> *"El Young King"* — así lo conocen. Y este proyecto busca reflejar esa esencia con la misma dedicación que él pone en cada canción.

**En vivo:** [myke-towers.vercel.app](https://myke-towers.vercel.app/)

<br/>

---

<br/>

## Características

### Experiencia Visual

- **Scroll suavizado** con Lenis para una navegación fluida y natural
- **Transiciones de página** animadas con Framer Motion (escala + desenfoque)
- **Efecto parallax** en la sección hero con imágenes que responden al scroll
- **Cursor personalizado** con anillo exterior que escala al interactuar (solo escritorio)
- **Fondo ambiental** con gradientes de color difuminados que crean atmósfera
- **Glassmorphism** en el header flotante con backdrop-blur y bordes translúcidos

### Contenido Editorial

- **Biografía completa** con línea de tiempo de 5 eras (2016–2025)
- **Discografía interactiva** con carrusel 3D de rotación infinita y modal de tracklist
- **Galería de videos** con estados de carga skeleton y paginación
- **Muro social** con grid estilo masonry e interacción hover

### Música en Vivo

- **Reproductor global** que reproduce videos de YouTube en segundo plano
- **Controles en el header**: play/pause, avanzar/retroceder, barra de progreso
- **Visualizador de audio** animado con barras reactivas
- **Avance automático** al terminar cada video
- **Inicio silenciado** para cumplir con políticas de autoplay del navegador

### Técnico

- **SEO completo**: meta tags, Open Graph, Twitter Cards, Schema.org JSON-LD
- **XML Sitemap** y `robots.txt` optimizados
- **Diseño responsive** con menú hamburguesa de pantalla completa en móvil
- **14 entradas de discografía** con tracklists completos (2016–2025)
- **20 videos oficiales** con metadatos detallados
- **Documentación de API** interactiva con código en 3 lenguajes

<br/>

---

<br/>

## Tecnologías

| Categoría | Tecnología | Versión | Propósito |
|-----------|------------|---------|-----------|
| **Framework** | React | 19 | Biblioteca de interfaces de usuario |
| **Build Tool** | Vite | 6 | Servidor de desarrollo y empaquetado |
| **Routing** | React Router DOM | 7 | Navegación client-side |
| **Estilos** | Tailwind CSS | 4 | Framework CSS utility-first |
| **Animaciones** | Framer Motion | 12 | Animaciones, transiciones, layout |
| **Scroll** | Lenis | 1.3 | Scroll suavizado |
| **Iconos** | Lucide React | 0.525 | Iconografía SVG |
| **Video** | YouTube IFrame API | — | Reproducción de video embebido |

<br/>

---

<br/>

## Estructura del Proyecto

```
myke-towers/
├── public/                    # Assets estáticos
│   ├── favicon.png
│   ├── preview.jpg            # Imagen OG/Twitter
│   ├── hero-video.mp4
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── main.jsx               # Punto de entrada
│   ├── App.jsx                # Componente raíz
│   ├── App.css                # Importación de Tailwind
│   ├── index.css              # Estilos globales y fuentes
│   │
│   ├── assets/font/           # Fuentes tipográficas
│   ├── context/
│   │   └── VideoContext.jsx   # Estado global del reproductor
│   ├── data/
│   │   └── staticData.js      # Toda la información del proyecto
│   ├── routers/
│   │   └── Routers.jsx        # Definición de rutas
│   │
│   └── landing/
│       ├── layout/
│       │   ├── Layout.jsx     # Wrapper de página
│       │   ├── Header.jsx     # Navbar flotante + reproductor
│       │   ├── Footer.jsx     # Pie de página
│       │   ├── Bg.jsx         # Fondo ambiental
│       │   └── Dock.jsx       # Componente estilo macOS
│       │
│       ├── components/
│       │   ├── common/
│       │   │   └── Cursor.jsx
│       │   └── home/
│       │       ├── Hero.jsx
│       │       ├── Musica.jsx
│       │       ├── Card.jsx
│       │       ├── Bio.jsx
│       │       ├── Discography.jsx
│       │       ├── DiscographySection.jsx
│       │       ├── SocialWall.jsx
│       │       └── Skeleton.jsx
│       │
│       └── pages/
│           ├── Home.jsx
│           ├── FullBio.jsx
│           ├── Albums.jsx
│           ├── AlbumDetail.jsx
│           └── ApiDocs.jsx
│
├── index.html                 # HTML con SEO y Schema.org
├── vite.config.js
├── tailwind.config.js
└── eslint.config.js
```

<br/>

---

<br/>

## Inicio Rápido

### Prerrequisitos

- [Node.js](https://nodejs.org/) (v18 o superior)
- npm, yarn o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/sebastianvasquezechavarria1234/myke-towers.git

# Navegar al directorio
cd myke-towers

# Instalar dependencias
npm install
```

### Desarrollo

```bash
npm run dev
```

El servidor de desarrollo estará disponible en `http://localhost:5173`.

### Producción

```bash
# Construir el proyecto
npm run build

# Previsualizar la build
npm run preview
```

<br/>

---

<br/>

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo de Vite |
| `npm run build` | Genera la build de producción |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta ESLint para detectar errores de código |

<br/>

---

<br/>

## Rutas

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Home | Hero interactivo, galería de videos y carrusel de discografía |
| `/biografia` | FullBio | Biografía editorial con línea de tiempo (2016–2025) |
| `/albums` | Albums | Grid completo de la discografía (14 lanzamientos) |
| `/album/:id` | AlbumDetail | Detalle de álbum con tracklist y enlaces de YouTube |
| `/api-docs` | ApiDocs | Documentación interactiva de la API con código en 3 lenguajes |

<br/>

---

<br/>

## Sistema de Reproducción Musical

El reproductor musical es uno de los pilares de la experiencia. Funciona en segundo plano mientras el usuario navega por el sitio.

**Cómo funciona:**

1. Al cargar la página, el reproductor inicia **silenciado** (cumpliendo con las políticas de autoplay)
2. En la primera interacción del usuario, se activa el audio
3. Los videos se reproducen en orden aleatorio de una playlist de 20 canciones
4. Al terminar un video, avanza automáticamente al siguiente
5. El header muestra controles inline: play/pause, skip, barra de progreso
6. Un visualizador de audio animado responde al ritmo

**Controles disponibles:**

- Play / Pausa
- Siguiente video
- Video anterior
- Barra de progreso (clic para saltar)
- Indicador de mute/unmute

> El header también muestra una versión difuminada del thumbnail del video actual como fondo, creando una conexión visual entre la música y la interfaz.

<br/>

---

<br/>

## SEO y Rendimiento

### Optimización para Motores de Búsqueda

- **Meta tags completos**: título, descripción, keywords, autor, robots
- **Open Graph**: imágenes de vista previa para Facebook, WhatsApp y redes sociales
- **Twitter Cards**: formato `summary_large_image`
- **Schema.org JSON-LD**: datos estructurados `MusicGroup` para Rich Snippets de Google
- **XML Sitemap**: mapa del sitio con 4 URLs y prioridades
- **Robots.txt**: configuración para crawlers

### Rendimiento

- **Build optimizado** con Vite (tree-shaking, code splitting, minificación)
- **Assets estáticos** en formato AVIF y MP4 (compresión eficiente)
- **Fuentes self-hosted** (Poppins, Great Vibes) sin dependencia de CDN externo
- **Lazy loading** implícito a través de la arquitectura de componentes

<br/>

---

<br/>

## Documentación de la API

El proyecto incluye una página dedicada (`/api-docs`) que documenta la API pública que acompaña al sitio.

**La API complementaria** está desplegada en [myke-towers-api.onrender.com](https://myke-towers-api.onrender.com) y el código fuente está disponible en:

[github.com/sebastianvasquezechavarria1234/myke-towers-api](https://github.com/sebastianvasquezechavarria1234/myke-towers-api)

**La página de documentación incluye:**

- Sidebar interactivo con 7 endpoints documentados
- Bloques de código en JavaScript, Python y cURL
- Funcionalidad de copiar al portapapeles
- Tablas de parámetros con tipo, obligatoriedad y descripción
- Vista previa de respuestas JSON

> La documentación fue diseñada como una herramienta de uso real, no solo como una demostración visual.

<br/>

---

<br/>

## Decisiones Técnicas

### ¿Por qué React 19?

React 19 trae mejoras significativas en rendimiento y un nuevo modelo de concurrencia. Para un proyecto que depende fuertemente de animaciones y transiciones, estas mejoras se traducen en una experiencia más fluida.

### ¿Por qué Vite y no Next.js?

Este proyecto es un **Single Page Application** sin necesidad de rendering del lado del servidor (SSR) o generación estática (SSG). Vite ofrece la configuración más ligera y un tiempo de desarrollo más rápido para este caso de uso.

### ¿Por qué YouTube IFrame API y no un componente de video?

La YouTube IFrame API permite un control más preciso sobre la reproducción: eventos de estado, progreso, control de volumen y integración con el sistema de contexto global. Un componente de video genérico no ofrecería este nivel de control.

### ¿Por qué Tailwind CSS v4?

Tailwind v4 introduce un nuevo motor de escritura en Rust, eliminando la dependencia de PostCSS. El resultado: tiempos de compilación significativamente más rápidos sin cambiar la experiencia de desarrollo.

### Datos estáticos vs. API

Toda la información del artista está definida en `staticData.js`. Esta decisión fue intencional: al ser un sitio tributo/fan, la información no cambia frecuentemente y no necesita autenticación. Un archivo estático elimina latencia, reduce puntos de fallo y mejora el rendimiento.

<br/>

---

<br/>

## Convenciones del Proyecto

### Arquitectura de Componentes

- **Componentes atómicos**: `Card`, `Skeleton`, `Cursor` — piezas reutilizables
- **Componentes de sección**: `Hero`, `Musica`, `Bio` — bloques de la landing page
- **Componentes de página**: `Home`, `FullBio`, `Albums` — rutas completas
- **Layout components**: `Header`, `Footer`, `Layout` — estructura compartida

### Gestión de Estado

El estado global se maneja a través de React Context (`VideoContext`). No se utiliza Redux ni Zustand porque la complejidad del estado no lo justifica.

### Estilos

- Utilidades de Tailwind CSS para estilos reutilizables
- CSS personalizado solo cuando Tailwind no ofrece una solución (variables CSS, fuentes, scrollbar personalizada)
- Tema oscuro con acentos de color: verde (#0fa), púrpura (#9c42f5), azul (#4579f5)

<br/>

---

<br/>

## Recursos

### Tipografías

| Fuente | Uso | Licencia |
|--------|-----|----------|
| [Poppins](https://fonts.google.com/specimen/Poppins) | Texto principal (20 pesos) | OFL |
| [Great Vibes](https://fonts.google.com/specimen/Great+Vibes) | Display / títulos decorativos | OFL |
| [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | Código y bloques técnicos | OFL |

### APIs Externas

- [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference) — Reproducción de video
- [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/) — Búsqueda de música (documentada)

<br/>

---

<br/>

## Licencia

Este proyecto tiene una licencia **propietaria**.

```
Copyright 2026, Sebastian Vasquez. All Rights Reserved.
```

El código fuente del frontend está restringido. Sin embargo, la API pública asociada está abierta para consumo de desarrolladores.

Consulta el archivo [LICENSE](./LICENSE) para más detalles.

<br/>

---

<br/>

<div align="center">

### Desarrollado con dedicación

*Un proyecto que busca reflejar la misma energía que Myke Towers pone en cada canción.*

<br/>

[![Vercel](https://img.shields.io/badge/Hecho_con-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

</div>
