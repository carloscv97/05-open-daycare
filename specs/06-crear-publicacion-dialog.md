# SPEC 06 — Diálogo para crear publicación

> **Estado:** Approved
> **Depende de:** Ninguno
> **Fecha:** 2026-09-16
> **Objetivo:** Añadir un diálogo modal de nueva publicación desde el sidebar y el botón flotante para capturar y validar una publicación sin persistirla ni modificar el feed.

## Alcance

**Incluye:**

- Abrir el diálogo desde `Nueva publicación` en `components/shared/Sidebar.tsx` y desde el botón flotante de `components/shared/CreatePostButton.tsx`.
- Reproducir la composición, textos, colores y comportamiento responsive de `references/pantallas/crear-publicacion.dc.html`.
- Mostrar los destinatarios Mateo, Sofía, Benjamín y `Toda la sala`.
- Permitir seleccionar varios niños y hacer que `Toda la sala` sea exclusiva frente a cualquier selección individual.
- Mostrar los tipos Comida, Siesta, Actividad, Logro, Ánimo, Foto y Anuncio.
- Iniciar sin destinatario ni tipo seleccionados y con la descripción vacía, usando el placeholder `Contá cómo le fue hoy…`.
- Exigir al menos un destinatario, un tipo y una descripción no vacía antes de publicar.
- Mostrar errores de validación sin descartar los valores válidos o inválidos que el usuario haya introducido.
- Mostrar la sección FOTOS y el control visual `Agregar`, sin abrir el selector de archivos ni almacenar imágenes.
- Cerrar y restablecer el formulario al publicar valores válidos, sin añadir una tarjeta al feed ni guardar datos.
- Cerrar y descartar los valores mediante Cancelar, clic sobre el fondo o Escape.
- Enfocar la descripción al abrir, impedir la interacción con el fondo, retener el foco dentro del diálogo y devolverlo al activador que lo abrió.

**Fuera de alcance (para futuras specs):**

- Crear, persistir, enviar o añadir publicaciones al feed.
- API, base de datos, almacenamiento local o cambios en `lib/mock-feed.ts`.
- Selector de archivos, carga de imágenes, previsualizaciones o gestión de fotos.
- Comentarios, reacciones, edición o borrado de publicaciones.
- Modificar los tipos existentes de `FeedPost` o crear tipos persistentes adicionales.

## Modelo de datos

Esta funcionalidad no introduce estructuras persistentes. `components/home/CreatePostDialog.tsx` conservará temporalmente los valores `recipients`, `postType`, `description` y sus errores de validación.

`recipients` será un arreglo local de `"mateo"`, `"sofia"` y `"benjamin"`, o el valor exclusivo `"room"`. `postType` será uno de `"food"`, `"nap"`, `"activity"`, `"achievement"`, `"mood"`, `"photo"` o `"announcement"`.

## Plan de implementación

1. Crear `components/home/CreatePostDialog.tsx` como componente cliente que reciba `isOpen`, `onClose` y el activador que debe recuperar el foco; implementar la estructura visual responsive de la referencia, incluidos encabezado, destinatarios, tipos, descripción y fotos visuales.
2. Añadir el estado local del formulario en `CreatePostDialog`, con selección múltiple de niños, exclusividad de `Toda la sala`, selección única de tipo, texto descriptivo y restablecimiento al cerrar.
3. Implementar la validación de destinatario, tipo y descripción, con mensajes de error bajo los controles inválidos y conservación de los valores escritos.
4. Añadir la semántica modal y los comportamientos de foco: descripción enfocada al abrir, retención con Tab, cierre por Escape y fondo, bloqueo del desplazamiento de fondo y retorno al activador correspondiente.
5. Actualizar `components/shared/Sidebar.tsx` y `components/shared/CreatePostButton.tsx` para aceptar y ejecutar un callback de apertura, conservando su composición visual y añadiendo estados interactivos de cursor, hover y foco visible.
6. Actualizar `app/page.tsx` para conservar el estado de apertura, conectar ambos activadores al mismo diálogo y registrar cuál debe recuperar el foco al cerrarse.
7. Ejecutar `npx eslint app/page.tsx components/home/CreatePostDialog.tsx components/shared/Sidebar.tsx components/shared/CreatePostButton.tsx` como única verificación de código.

## Criterios de aceptación

- [ ] Pulsar `Nueva publicación` en el sidebar abre el diálogo en escritorio.
- [ ] Pulsar el botón flotante abre el mismo diálogo en móvil.
- [ ] El diálogo reproduce los destinatarios, tipos, descripción y sección de fotos de la referencia.
- [ ] El formulario inicia sin destinatarios, tipo ni descripción seleccionados o escritos.
- [ ] Se pueden seleccionar varios niños a la vez.
- [ ] Elegir `Toda la sala` elimina las selecciones individuales, y elegir un niño elimina `Toda la sala`.
- [ ] El selector muestra Comida, Siesta, Actividad, Logro, Ánimo, Foto y Anuncio y permite seleccionar solo uno.
- [ ] Publicar sin destinatario, tipo o descripción muestra un error bajo cada control faltante y mantiene abierto el diálogo.
- [ ] Publicar con valores válidos cierra y limpia el formulario sin añadir ni cambiar publicaciones del feed.
- [ ] El control `Agregar` de fotos es visible pero no abre un selector de archivos ni modifica el formulario.
- [ ] Cancelar, clic sobre el fondo y Escape cierran el diálogo y descartan los valores escritos.
- [ ] Al abrir, el foco se sitúa en la descripción; al cerrar, vuelve exactamente al botón del sidebar o flotante que abrió el diálogo.
- [ ] El fondo no se puede interactuar y el foco no puede escapar del diálogo mientras este esté abierto.
- [ ] `npx eslint app/page.tsx components/home/CreatePostDialog.tsx components/shared/Sidebar.tsx components/shared/CreatePostButton.tsx` finaliza sin errores.

## Decisiones

- **Sí:** formulario visual sin publicación real. Mantiene el alcance del prototipo y no inventa una fuente de datos.
- **Sí:** los dos activadores existentes abren un único diálogo coordinado desde la página principal. Evita dos implementaciones de formulario y preserva el foco correcto.
- **Sí:** destinatarios, tipo y descripción obligatorios. Una publicación visual debe definir a quién se dirige, su categoría y su contenido.
- **Sí:** selección múltiple de niños con `Toda la sala` exclusiva. Refleja que una misma publicación puede dirigirse a varias familias sin ambigüedad sobre la sala completa.
- **Sí:** los siete tipos de la referencia. Conserva el alcance visual definido sin limitarlo a los tres tipos actuales del feed mock.
- **Sí:** formulario inicialmente vacío. Exige una decisión explícita y evita publicar por accidente el contenido de ejemplo.
- **Sí:** fotos como control visual. Reproduce la referencia sin añadir el alcance de almacenamiento o previsualización de archivos.
- **No:** actualizar `feedPosts` al publicar. El usuario definió que Publicar solo cierre y limpie el modal.
- **No:** persistencia, API o selector de archivos. Requieren flujos y contratos que pertenecen a otra spec.

## Riesgos

| Riesgo                                                        | Mitigación                                                                             |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| El diálogo se desborda en pantallas pequeñas.                 | Usar ancho fluido, altura máxima y desplazamiento interno.                             |
| La selección de la sala y niños individuales resulta ambigua. | Hacer `Toda la sala` mutuamente exclusiva y reflejar visualmente la selección actual.  |
| El foco vuelve al activador incorrecto.                       | Registrar el botón que abre el diálogo y restaurar su foco al cerrar.                  |
| El usuario cree que la publicación se guardó.                 | Mantener explícitamente fuera de alcance los cambios al feed y cualquier persistencia. |

## Qué no incluye esta spec

- Creación, persistencia o inserción de publicaciones en el feed.
- API, base de datos, almacenamiento local o cambios en datos mock.
- Carga, previsualización o almacenamiento de fotos.
- Comentarios, reacciones, edición o borrado de publicaciones.
- Playwright, pruebas manuales de navegador o ejecución de `spec-verifier`.
