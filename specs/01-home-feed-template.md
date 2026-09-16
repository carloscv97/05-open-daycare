# SPEC 01 — Home con plantilla de feed

> **Estado:** Implemented
> **Depende de:** Ninguna
> **Fecha:** 2026-09-15
> **Objetivo:** Reemplazar la ruta `/` por una reproducción visual estática, modular y adaptativa del feed proporcionado de OpenDayCare.

## Alcance

**Incluye:**

- Reemplazar la pantalla inicial de Next.js en `app/page.tsx` por el feed de `references/pantallas/feed.dc.html`.
- Replicar el contenido estático, jerarquía visual, paleta, tipografías, tarjetas, iconos SVG y placeholder de foto de la referencia.
- Mostrar una barra lateral fija en escritorio.
- Mostrar una barra de navegación inferior y un botón flotante de nueva publicación en móvil.
- Crear componentes de presentación reutilizables dentro de `components/feed/`.
- Centralizar los datos estáticos tipados del feed en `lib/mock-feed.ts`.
- Declarar los colores y las fuentes recurrentes como tokens de Tailwind CSS v4 mediante `@theme` en `app/globals.css`.
- Actualizar el idioma y los metadatos globales para OpenDayCare en español.
- Documentar una revisión visual manual sin ejecutar scripts de npm durante la implementación.

**Fuera de alcance (para futuras specs):**

- Autenticación, sesiones y cierre de sesión.
- Base de datos, API, persistencia o datos dinámicos.
- Navegación a Niños, Avisos, Mi cuenta, detalle, edición o creación de publicaciones.
- Reacciones, comentarios, carga de imágenes reales o interacción de formularios.
- Un kit de componentes de uso general fuera del dominio Feed.

## Modelo de datos

Esta funcionalidad no introduce estructuras persistentes ni consultas remotas. Los mocks se alojarán en `lib/mock-feed.ts`.

```ts
export type PostType = 'achievement' | 'activity' | 'announcement';

export type FeedPost = {
  id: string;
  type: PostType;
  author: string;
  audience: string;
  time: string;
  body: string;
  likes: number;
  comments: number;
  hasPhoto?: boolean;
};
```

Los datos mock conservarán los textos, horarios, conteos, fecha y las tres publicaciones de `feed.dc.html`.

## Estructura de componentes

- `components/feed/Sidebar.tsx`: navegación lateral y perfil de escritorio.
- `components/feed/MobileNavigation.tsx`: navegación inferior de móvil.
- `components/feed/FeedComposer.tsx`: compositor visual de publicación.
- `components/feed/FeedPostCard.tsx`: tarjeta para cada elemento `FeedPost`.
- `components/feed/PostTypeBadge.tsx`: distintivo de logro, actividad o anuncio.
- `components/feed/Avatar.tsx`: avatar reutilizable de niño o usuario.
- `components/feed/CreatePostButton.tsx`: acción flotante visual para móvil.
- `lib/mock-feed.ts`: tipos y contenido mock del feed.

Los componentes serán de presentación. No usarán `"use client"`, estado local, efectos, solicitudes ni dependencias de iconos nuevas.

## Plan de implementación

1. Consultar la guía instalada de Next.js y la documentación vigente de `next/font` antes de modificar las fuentes y los metadatos.
2. Actualizar `app/layout.tsx` para cargar Fredoka y Nunito mediante `next/font/google`, establecer `lang="es"` y definir metadatos de OpenDayCare.
3. Reemplazar los estilos iniciales de `app/globals.css` por estilos base y tokens `@theme` de Tailwind CSS v4 para la paleta y las tipografías de la referencia.
4. Crear `lib/mock-feed.ts` con `PostType`, `FeedPost` y las publicaciones estáticas del diseño.
5. Crear los componentes en `components/feed/`, dejando cada uno funcional como componente de presentación aislado.
6. Reemplazar `app/page.tsx` por la composición del feed, consumiendo los mocks mediante `FeedPostCard`.
7. Aplicar variantes responsivas de Tailwind para la sidebar de escritorio, la navegación inferior y el botón flotante de móvil.
8. Revisar manualmente la interfaz siguiendo la sección de revisión de esta especificación. No ejecutar `npm run build`, `npm run lint` ni otro script de npm como parte de esta tarea.

## Criterios de aceptación

- [ ] La ruta `/` no muestra contenido ni branding del starter de Next.js.
- [ ] En escritorio, la ruta muestra una sidebar fija de 248px y las tres publicaciones de la referencia.
- [ ] Las publicaciones se renderizan desde `lib/mock-feed.ts` con `FeedPostCard`.
- [ ] Los componentes específicos de la pantalla viven en `components/feed/`.
- [ ] La foto de actividad se representa con el placeholder de la referencia y no requiere un asset real.
- [ ] En móvil, la sidebar no se muestra y aparecen la navegación inferior y el botón flotante.
- [ ] Los controles visibles no navegan a rutas inexistentes ni requieren autenticación, base de datos o estado de cliente.
- [ ] Los valores visuales recurrentes se consumen como tokens de Tailwind CSS v4.
- [ ] El documento usa español y metadatos de OpenDayCare.
- [ ] La revisión visual manual se completa sin errores en la consola del navegador.

## Revisión manual

1. Ejecuta `npm run dev`.
2. Abre `http://localhost:3000/` con una ventana de 1440px de ancho.
3. Verifica el fondo, las tipografías, los colores, espaciados, bordes, sidebar, encabezado, compositor, tres tarjetas, badges, avatares e iconos contra `references/pantallas/feed.dc.html`.
4. Cambia la ventana a 375px de ancho.
5. Verifica que la sidebar esté oculta, aparezcan la barra inferior y el botón flotante, y no exista desbordamiento horizontal.
6. Abre la consola del navegador y verifica que no haya errores.
7. Comprueba que los controles visibles no naveguen ni soliciten datos.

## Decisiones

- **Sí:** Tailwind CSS v4 con tokens `@theme`. Centraliza la paleta y las fuentes sin crear un archivo de configuración adicional.
- **Sí:** componentes reutilizables dentro de `components/feed/`. Permite reutilizar la estructura del feed sin generalizar prematuramente un kit de UI.
- **Sí:** mocks tipados en `lib/mock-feed.ts`. Separa contenido y vista, y facilita reemplazarlos por datos reales en una spec futura.
- **Sí:** navegación inferior y botón flotante para móvil. Es la adaptación móvil acordada para la referencia de escritorio.
- **No:** interacciones o rutas simuladas. Evita navegación rota mientras no existan esas pantallas.
- **No:** imágenes reales o dependencias de iconos. El placeholder y los SVG inline reproducen la referencia sin añadir activos ni paquetes.
- **No:** ejecución de scripts de npm. La verificación se limita a la revisión manual realizada por el usuario.

## Riesgos

| Riesgo                                                         | Mitigación                                                                      |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Diferencia visual entre la referencia de escritorio y Tailwind | Comparar la ruta a 1440px durante la revisión manual.                           |
| Pérdida de contenido por abstraer demasiado los componentes    | Mantener los componentes limitados al dominio Feed.                             |
| Ajuste móvil no definido por la referencia original            | Validar la barra inferior, botón flotante y ausencia de desbordamiento a 375px. |

## Qué no incluye esta spec

- Autenticación, usuarios reales ni sesiones.
- Base de datos, APIs, persistencia o fecha dinámica.
- Rutas funcionales, edición, creación, comentarios o reacciones.
- Carga de imágenes reales.
- Componentes genéricos fuera de `components/feed/`.
