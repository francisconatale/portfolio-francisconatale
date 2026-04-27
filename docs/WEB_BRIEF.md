# Brief de proyecto web — Portfolio Personal Estratégico
**Fecha:** 27 de Abril de 2026  **Tipo:** Portfolio / Personal

---

## Resumen ejecutivo
Un portfolio personal versátil diseñado para captar clientes freelance, aplicar a posiciones estables y documentar proyectos. Construido con Next.js y Firestore, está enfocado en transmitir madurez profesional, adaptabilidad técnica y visión de negocio a reclutadores (RRHH) y potenciales clientes.

## Contexto y momento
El proyecto nace de la necesidad de tener una presencia digital fuerte y centralizada para la búsqueda activa de oportunidades laborales y proyectos freelance. Existe urgencia por tener la herramienta operativa a corto plazo para acompañar postulaciones.

## Objetivo principal
Lograr que los visitantes (especialmente perfiles de RRHH y dueños de negocio) descarguen el CV o envíen un mensaje de contacto tras comprender rápidamente el valor que el desarrollador aporta.
**Métrica de éxito:** Cantidad de descargas del CV y formularios de contacto completados.

## Audiencia objetivo
**Perfil:** Reclutadores (RRHH), líderes de talento o clientes finales. No son técnicos profundos; escanean buscando seguridad, resultados visuales y comunicación clara.
**Canal de llegada:** Enlaces en LinkedIn, postulaciones directas a ofertas de trabajo, networking.
**Recorrido esperado:** Ingreso al Hero (leen el diferencial) → Ven botones claros de acción → Escanean "Skills" rápido → Miran 1 o 2 proyectos visualmente atractivos → Descargan el CV o van a Contacto.

## Competencia y posicionamiento
**Referentes / competidores:** Otros desarrolladores web de nivel similar que suelen tener portfolios centrados puramente en el código o en listas de lenguajes.
**Diferencial clave:** La adaptabilidad a cualquier stack, el foco absoluto en que el producto resuelva problemas de negocio, y la priorización de la usabilidad (comodidad) y seguridad. No es un "picador de código", es un creador de soluciones.

## Propuesta de valor
Soluciones tecnológicas adaptables y seguras, pensadas para que el negocio crezca y los usuarios disfruten la experiencia.
**Headline propuesto principal:** *"Tecnología al servicio de tu negocio. Me adapto a cualquier stack para lograr el mejor resultado."*
**Headline alternativo:** *"Construyo productos digitales seguros, cómodos y enfocados en resultados."*

## Tono y personalidad
**Adjetivos:** Profesional, Moderno, Confiable.
**Dirección visual:** Estilo premium tecnológico. Preferencia por el modo oscuro (alto contraste), tipografías sin serif limpias, layouts estructurados con "aire" (espacios en blanco) para transmitir orden y profesionalismo. 
**Referencias:** `gsap.com/showcase/` (Interés en el nivel de pulido visual y presentación del producto).

## Arquitectura de contenido
**Flujo principal:**
`Home (Headline + Descarga CV inmediata)` → `Resumen de Skills adaptables` → `Proyectos Destacados (foco en el "qué resolví")` → `Footer/Contacto (CTAs fijos)`.
**Contenido disponible:** Textos, capturas de pantalla de los proyectos, foto de perfil y el archivo PDF del CV ya están producidos y listos para implementarse.

## Funcionalidades
**Must have:** 
- Botón de descarga de CV muy visible en la primera pantalla.
- Formulario de contacto funcional conectado a Firestore.
- Carga dinámica de proyectos desde la base de datos.
**Nice to have (Post-Lanzamiento):** 
- Animaciones avanzadas al scrollear (tipo GSAP) para demostrar nivel técnico.

## Restricciones y contexto técnico
**Plazo:** Urgente. Requiere salir a producción rápido.
**Quién mantiene el sitio:** Autogestionable por el desarrollador mediante la base de datos de Firebase.
**Infraestructura existente:** Next.js + Tailwind CSS + Firebase Firestore. (Listo para Vercel).

## Señales de riesgo / recomendaciones previas
**El riesgo del "Wow Factor":** Intentar igualar las animaciones de la referencia (GSAP Showcase) desde el día 1 puede retrasar el lanzamiento urgente. 
*Recomendación:* Implementar un MVP funcional, limpio y oscuro de inmediato. Lanzar, empezar a usarlo para entrevistas, y tratar las animaciones complejas como "fases de mantenimiento" posteriores.

## Criterios de éxito
1. El sitio está online esta misma semana sin errores.
2. Un reclutador entiende cuál es el diferencial de valor en menos de 15 segundos sin ver código.
3. El botón de CV y el formulario de contacto operan sin fallas.
