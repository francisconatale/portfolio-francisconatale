# Planificación del Portfolio (Next.js + Firestore)

Este documento detalla la arquitectura, los modelos de datos y las fases de implementación del portfolio.

## 1. Arquitectura Técnica
- **Framework**: Next.js 15+ (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS (PostCSS)
- **Base de Datos**: Firebase Firestore (NoSQL)
- **Despliegue Recomendado**: Vercel

## 2. Modelos de Datos (Firestore)

### Colección: `projects`
Documentos que representan trabajos realizados.
- `title`: string
- `description`: string
- `imageUrl`: string
- `technologies`: string[]
- `githubLink`: string (opcional)
- `liveLink`: string (opcional)

### Colección: `blog_posts`
Artículos o noticias.
- `title`: string
- `content`: string (soporta markdown)
- `publishDate`: string (ISO format o Timestamp)
- `tags`: string[]

### Colección: `skills`
Habilidades técnicas.
- `name`: string
- `category`: string (Frontend, Backend, Tools, etc.)
- `proficiency`: number (1-100)
- `yearsOfExperience`: number

### Colección: `contact_messages`
Mensajes recibidos desde el formulario.
- `name`: string
- `email`: string
- `message`: string
- `timestamp`: serverTimestamp

## 3. Estructura de Navegación
- `/`: Inicio con Hero y resumen de habilidades.
- `/projects`: Listado completo de proyectos.
- `/blog`: Blog personal.
- `/contact`: Formulario de contacto integrado con Firestore.

## 4. Estado de Implementación
- [x] Inicialización de Next.js y Tailwind CSS.
- [x] Configuración del SDK de Firebase.
- [x] Creación de utilidades de base de datos (`lib/db.ts`).
- [x] Definición de tipos de TypeScript.
- [x] Implementación de Layout Global (Navbar/Footer).
- [x] Páginas base con fetching de datos asíncrono.
- [x] Formulario de contacto funcional (Client Component).

## 5. Próximas Mejoras Sugeridas
1. **Autenticación**: Añadir Firebase Auth para proteger una ruta de administración (`/admin`) donde puedas gestionar los contenidos sin usar la consola de Firebase.
2. **Markdown**: Implementar `next-mdx-remote` para renderizar el contenido del blog con formato rico.
3. **Optimización de Imágenes**: Configurar `next/image` con dominios permitidos para las imágenes almacenadas en Firebase Storage.
4. **Animaciones**: Integrar `framer-motion` para transiciones suaves entre páginas.
