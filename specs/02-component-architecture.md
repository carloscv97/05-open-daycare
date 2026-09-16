# SPEC 02 — Arquitectura de componentes

> **Estado:** Implemented
> **Depende de:** spe
> **Fecha:** 2026-09-15
> **Objetivo:** Reorganizar los componentes existentes por dominio y compartidos, y documentar convenciones de arquitectura y nombres para OpenDayCare.

## Alcance

**Incluye:**

- Mover los componentes exclusivos de la ruta `/` a `components/home/`.
- Mover la navegación y los elementos reutilizables dentro de OpenDayCare a `components/shared/`.
- Actualizar las importaciones afectadas sin cambiar el resultado visual ni el comportamiento de la ruta `/`.
- Añadir a `AGENTS.md` convenciones de nombres en inglés para componentes, funciones, variables y constantes.
- Añadir a `AGENTS.md` una arquitectura orientada por dominio: los componentes de una capacidad viven en `components/<dominio>/` y solo se promueven a `components/shared/` cuando tienen reutilización real entre dominios.

**Fuera de alcance (para futuras specs):**

- Crear una librería de componentes genérica o configurable.
- Cambiar props, datos mock, estilos, textos o comportamiento de los componentes existentes.
- Crear rutas nuevas, funcionalidades de navegación o estado de cliente.
- Reorganizar `app/`, `lib/`, estilos globales o los archivos de referencia.
- Ejecutar scripts de npm como parte de la implementación.

## Modelo de datos

Esta funcionalidad no introduce ni modifica estructuras de datos. Reutiliza `FeedPost`, `PostType` y `feedPosts` de `lib/mock-feed.ts`.

## Estructura de componentes

- `components/home/FeedComposer.tsx`: compositor visual exclusivo de la página inicial.
- `components/home/FeedPostCard.tsx`: tarjeta de publicación exclusiva del feed inicial.
- `components/home/PostTypeBadge.tsx`: distintivo de tipo usado por las tarjetas del feed inicial.
- `components/shared/Sidebar.tsx`: barra lateral reutilizable dentro de OpenDayCare, con su branding y navegación actuales.
- `components/shared/MobileNavigation.tsx`: navegación inferior reutilizable dentro de OpenDayCare.
- `components/shared/Avatar.tsx`: avatar reutilizable para las vistas de OpenDayCare.
- `components/shared/CreatePostButton.tsx`: acción flotante reutilizable para las vistas de OpenDayCare.

`components/shared/` no implica que los componentes sean genéricos o configurables. Solo indica que pueden reutilizarse entre dominios de esta aplicación.

## Plan de implementación

1. Consultar el árbol actual de `components/` y las importaciones de `app/page.tsx` para establecer el impacto de los movimientos.
2. Crear `components/home/` y mover `FeedComposer.tsx`, `FeedPostCard.tsx` y `PostTypeBadge.tsx`, actualizando sus importaciones internas y las de `app/page.tsx` en el mismo cambio.
3. Crear `components/shared/` y mover `Sidebar.tsx`, `MobileNavigation.tsx`, `Avatar.tsx` y `CreatePostButton.tsx`, actualizando todas las importaciones afectadas en el mismo cambio.
4. Actualizar `AGENTS.md` con las reglas de arquitectura por dominio, promoción a compartidos y nombres en inglés.
5. Revisar manualmente los cambios de archivos e importaciones sin ejecutar scripts de npm, verificando que la composición de `/` conserve las mismas dependencias y datos.

## Criterios de aceptación

- [ ] No existe ningún componente de la implementación del feed dentro de `components/feed/`.
- [ ] `components/home/` contiene exactamente `FeedComposer.tsx`, `FeedPostCard.tsx` y `PostTypeBadge.tsx` de esta pantalla.
- [ ] `components/shared/` contiene exactamente `Sidebar.tsx`, `MobileNavigation.tsx`, `Avatar.tsx` y `CreatePostButton.tsx` de esta pantalla.
- [ ] `app/page.tsx` importa los componentes desde las nuevas rutas.
- [ ] Las dependencias entre componentes resuelven desde sus nuevas rutas sin imports que apunten a `components/feed/`.
- [ ] La ruta `/` mantiene las tres publicaciones de `feedPosts`, la sidebar de escritorio, la navegación inferior y el botón flotante de móvil.
- [ ] `AGENTS.md` exige identificadores en inglés y distingue `PascalCase` para componentes, `camelCase` para funciones y variables, y `UPPER_SNAKE_CASE` para constantes globales inmutables.
- [ ] `AGENTS.md` define que los componentes específicos viven en `components/<dominio>/` y que `components/shared/` exige reutilización real entre dominios.
- [ ] No se ejecuta ningún script de npm durante la implementación.

## Decisiones

- **Sí:** `components/home/` para la pantalla inicial. Expresa el dominio visible sin introducir una estructura de features más amplia antes de necesitarla.
- **Sí:** `components/shared/` para sidebar, navegación móvil, avatar y botón flotante. Son piezas que podrán usarse por más de una pantalla de OpenDayCare.
- **Sí:** arquitectura orientada por dominio. Hace que la estructura del proyecto comunique sus capacidades antes que categorías técnicas genéricas.
- **Sí:** nombres en inglés. Mantiene el código consistente con el ecosistema TypeScript y facilita la búsqueda de símbolos.
- **No:** convertir la sidebar en un componente configurable. Su branding y navegación actuales siguen siendo específicos de OpenDayCare.
- **No:** crear un directorio `features/`. Sería una abstracción adicional sin más dominios implementados todavía.
- **No:** cambiar la interfaz o la lógica actual. Esta spec solo reorganiza y documenta.

## Riesgos

| Riesgo                                                                     | Mitigación                                                                                                                |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Un movimiento deja una importación relativa obsoleta                       | Actualizar todas las importaciones afectadas dentro del mismo paso y revisarlas manualmente.                              |
| Un componente se promueve a compartido antes de ser realmente reutilizable | Mantener su API y branding actuales; la generalización se hará en una spec posterior cuando exista un segundo consumidor. |
| La nueva estructura se use de forma inconsistente                          | Registrar las reglas concretas en `AGENTS.md`.                                                                            |

## Qué no incluye esta spec

- Un sistema de diseño o una librería de UI genérica.
- Cambios de comportamiento, datos, estilos o navegación.
- Rutas adicionales u otras capacidades de OpenDayCare.
- Scripts de npm, pruebas automatizadas o cambios de dependencias.
