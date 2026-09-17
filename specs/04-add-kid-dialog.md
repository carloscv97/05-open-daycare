# SPEC 04 — Diálogo para agregar niño

> **Estado:** Approved
> **Depende de:** Ninguno
> **Fecha:** 2026-09-16
> **Objetivo:** Añadir un diálogo modal visual desde `/kids` para capturar y validar los datos básicos de un niño sin persistirlos ni modificar el listado.

## Alcance

**Incluye:**

- Abrir el diálogo modal al pulsar `Agregar niño` en `/kids`.
- Reproducir la composición, textos, colores y responsive de `references/pantallas/agregar-nino.dc.html`.
- Incluir los campos Nombre completo, Fecha de nacimiento, Sala, Alergias y Notas médicas.
- Mostrar los placeholders `Ej. Martina López`, `dd/mm/aaaa`, `Ej. Maní, Lactosa` e `Indicaciones, medicación, contactos…`.
- Exigir Nombre completo, Fecha de nacimiento y Sala antes de guardar.
- Validar que la fecha tenga el formato `dd/mm/aaaa` y represente una fecha de calendario existente.
- Ofrecer las salas hardcodeadas Soles, Lunas y Estrellas.
- Mostrar errores bajo cada campo obligatorio inválido y conservar los valores escritos.
- Cerrar y restablecer el formulario al guardar valores válidos, sin modificar el listado existente.
- Cerrar y descartar los valores mediante Cancelar, clic sobre el fondo o Escape.
- Enfocar Nombre completo al abrir, impedir la interacción con el fondo y devolver el foco al botón Agregar al cerrar.

**Fuera de alcance (para futuras specs):**

- Crear una tarjeta de niño o modificar los ocho registros mock actuales.
- Persistencia, API, base de datos o integración con datos reales de salas.
- Edición de niños existentes.
- Convertir el campo de alergias en etiquetas individuales.

## Modelo de datos

Esta funcionalidad no introduce estructuras persistentes. `components/kids/AddKidDialog.tsx` conservará temporalmente los valores de Nombre completo, Fecha de nacimiento, Sala, Alergias, Notas médicas y sus errores de validación.

## Plan de implementación

1. Crear `components/kids/AddKidDialog.tsx` como componente cliente con el diálogo, los cinco controles editables, los placeholders de la referencia y las tres opciones de sala.
2. Implementar en `AddKidDialog` el estado de apertura, los botones Cancelar y Guardar, el reinicio de valores y los cierres por fondo y Escape.
3. Implementar la validación de Nombre completo, Sala y Fecha de nacimiento, incluidos los mensajes bajo el campo y la comprobación de una fecha real en formato `dd/mm/aaaa`.
4. Añadir al diálogo el foco inicial, el retorno de foco y el comportamiento modal accesible sin interacción con el contenido de fondo.
5. Actualizar `app/kids/page.tsx` para que el botón Agregar niño abra `AddKidDialog` sin alterar las tarjetas ni el buscador existentes.
6. Verificar manualmente en escritorio y móvil la apertura, los cierres, los placeholders, el foco y las validaciones del diálogo.

## Criterios de aceptación

- [ ] Pulsar Agregar niño abre el diálogo.
- [ ] El diálogo muestra los cinco campos y los cuatro placeholders solicitados exactamente.
- [ ] El selector de Sala permite elegir Soles, Lunas y Estrellas.
- [ ] Guardar con Nombre completo, Fecha de nacimiento o Sala vacíos muestra un error bajo cada campo faltante.
- [ ] Una fecha con formato inválido o inexistente muestra un error y no cierra el diálogo al guardar.
- [ ] Guardar valores válidos cierra y limpia el formulario sin cambiar las ocho tarjetas existentes.
- [ ] Cancelar, clic sobre el fondo y Escape cierran el diálogo y descartan los valores escritos.
- [ ] Al abrir, el foco se sitúa en Nombre completo; al cerrar, vuelve al botón Agregar niño.
- [ ] El fondo no se puede interactuar mientras el diálogo está abierto.
- [ ] El diálogo es utilizable en escritorio y móvil.

## Decisiones

- **Sí:** formulario visual sin alta real ni persistencia. Mantiene el alcance del prototipo sin inventar una fuente de datos.
- **Sí:** errores explícitos bajo los campos. Comunican los requisitos sin depender de los mensajes variables del navegador.
- **Sí:** fecha textual `dd/mm/aaaa`. Conserva el placeholder de la referencia y permite una validación consistente.
- **Sí:** salas hardcodeadas Soles, Lunas y Estrellas. Resuelve el selector hasta que exista una fuente de datos real.
- **Sí:** cierre al guardar correctamente. Simula la finalización de la acción sin afectar el listado.
- **No:** modificar `lib/mock-kids.ts`. Los datos creados no existen fuera del diálogo en esta spec.
- **No:** etiquetas interactivas para alergias. El campo será texto opcional como en la referencia.

## Riesgos

| Riesgo                                          | Mitigación                                                                              |
| ----------------------------------------------- | --------------------------------------------------------------------------------------- |
| El diálogo se desborda en pantallas pequeñas.   | Usar ancho fluido, altura máxima y desplazamiento interno cuando sea necesario.         |
| El formato de fecha acepta fechas inexistentes. | Separar día, mes y año y comprobar que la fecha construida conserva los mismos valores. |
| El foco queda perdido tras cerrar el diálogo.   | Conservar una referencia al botón activador y restaurar el foco al cierre.              |

## Qué no incluye esta spec

- Alta real de niños, persistencia o integración con una API.
- Datos reales o gestión administrativa de salas.
- Actualización del listado o de los perfiles tras guardar.
- Edición de niños y gestión avanzada de alergias.
