# SPEC 05 — Diálogo para vincular padre

> **Estado:** Implemented
> **Depende de:** Ninguno
> **Fecha:** 2026-09-16
> **Objetivo:** Añadir un diálogo modal visual en `/kids/[slug]` para capturar y validar una invitación de padre, madre o tutor sin persistirla ni modificar los padres vinculados.

## Alcance

**Incluye:**

- Abrir el diálogo al pulsar `Vincular otro padre` en los detalles de un niño.
- Reproducir la composición, textos, colores y responsive de `references/pantallas/vincular-padre.dc.html`.
- Mostrar dinámicamente el nombre del niño actual en el subtítulo `a {nombre del niño}`.
- Incluir los campos Nombre del padre/madre, Email y Parentesco.
- Ofrecer los parentescos Mamá, Papá y Tutor/a, sin una selección inicial.
- Mostrar el aviso informativo, el código estático `7K4P9` y el texto `Vence en 7 días` de la referencia.
- Exigir Nombre, Email y Parentesco antes de enviar.
- Validar que el email tenga un formato válido y mostrar los errores bajo los campos inválidos sin descartar los valores escritos.
- Cerrar y restablecer el formulario al enviar valores válidos, sin modificar los padres vinculados.
- Cerrar y descartar los valores mediante el botón X, clic sobre el fondo o Escape.
- Enfocar Nombre del padre/madre al abrir, impedir la interacción con el fondo y devolver el foco a `Vincular otro padre` al cerrar.

**Fuera de alcance (para futuras specs):**

- Enviar correos, generar códigos o crear una invitación real.
- Persistencia, API, base de datos o cambios en `lib/mock-kids.ts`.
- Añadir una fila de padre al listado existente o modificar los datos mostrados en el perfil.
- Edición, reenvío, vencimiento real o revocación de invitaciones.
- Ejecutar Playwright o `spec-verifier` durante la verificación de esta spec.

## Modelo de datos

Esta funcionalidad no introduce estructuras persistentes. `components/kids/AddParentDialog.tsx` conservará temporalmente los valores `parentName`, `email`, `relation` y sus errores de validación.

`relation` usará los valores locales `"mother"`, `"father"` y `"guardian"`; no modifica el tipo `Parent` porque no se guarda ni se muestra un nuevo vínculo.

## Plan de implementación

1. Crear `components/kids/AddParentDialog.tsx` como componente cliente con el botón activador, el diálogo, los tres controles, el aviso, el código de invitación estático y el diseño responsive de la referencia.
2. Implementar el estado local de apertura, valores y parentesco; añadir el botón X, el envío visual y el reinicio al cerrar o enviar valores válidos.
3. Implementar la validación de nombre, email obligatorio con formato válido y parentesco, incluidos los mensajes bajo los campos y la conservación de los valores inválidos.
4. Añadir semántica modal, foco inicial, retención de foco, retorno al activador y cierres por fondo y Escape.
5. Actualizar `components/kids/LinkedParents.tsx` para renderizar `AddParentDialog` y aceptar el nombre del niño; actualizar `app/kids/[slug]/page.tsx` para proporcionar ese nombre sin alterar los padres existentes.
6. Ejecutar `npx eslint components/kids/AddParentDialog.tsx components/kids/LinkedParents.tsx app/kids/[slug]/page.tsx` como única verificación de código.

## Criterios de aceptación

- [x] Pulsar `Vincular otro padre` abre el diálogo en `/kids/[slug]`.
- [x] El encabezado muestra `Vincular padre` y el nombre dinámico del niño actual.
- [x] El diálogo muestra Nombre del padre/madre, Email, Parentesco, el aviso, el código `7K4P9` y `Vence en 7 días`.
- [x] Mamá, Papá y Tutor/a están disponibles y ninguna opción inicia seleccionada.
- [x] Enviar sin Nombre, Email o Parentesco muestra un error bajo cada campo requerido.
- [x] Un email con formato inválido muestra un error y mantiene abierto el diálogo con los valores escritos.
- [x] Enviar valores válidos cierra y limpia el formulario sin modificar los padres vinculados.
- [x] El botón X, el clic sobre el fondo y Escape cierran y descartan los valores escritos.
- [x] Al abrir, el foco se sitúa en Nombre del padre/madre; al cerrar vuelve a `Vincular otro padre`.
- [x] El fondo no se puede interactuar mientras el diálogo está abierto.
- [x] El diálogo es utilizable en escritorio y móvil mediante un ancho fluido y desplazamiento interno cuando sea necesario.
- [x] `npx eslint components/kids/AddParentDialog.tsx components/kids/LinkedParents.tsx app/kids/[slug]/page.tsx` finaliza sin errores.

## Decisiones

- **Sí:** diálogo visual sin envío real. Mantiene el alcance del prototipo sin inventar infraestructura de invitaciones.
- **Sí:** mostrar el nombre del niño actual de forma dinámica. Evita que la interfaz se limite al ejemplo de Mateo de la referencia.
- **Sí:** Nombre, Email y Parentesco obligatorios. Una invitación visual debe capturar los tres datos básicos.
- **Sí:** validar el formato del email. Comunica un requisito claro sin depender de mensajes variables del navegador.
- **Sí:** parentesco sin selección inicial. Obliga a una decisión explícita al enviar.
- **Sí:** código `7K4P9` y vencimiento estáticos. Reproducen la referencia sin generar ni persistir invitaciones.
- **Sí:** verificación dirigida con ESLint. El usuario excluyó Playwright y `spec-verifier` de esta spec.
- **No:** modificar los registros mock o el listado de padres. Los datos introducidos no existen fuera del diálogo.
- **No:** reutilizar el tipo persistente `Parent` para Tutor/a. El valor solo vive dentro del formulario.

## Riesgos

| Riesgo                                                   | Mitigación                                                                             |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| El diálogo se desborda en pantallas pequeñas.            | Usar ancho fluido, altura máxima y desplazamiento interno.                             |
| El usuario interpreta el envío como una invitación real. | Mantener fuera de alcance el correo, la persistencia y las modificaciones del listado. |
| El foco queda perdido al cerrar.                         | Conservar una referencia al botón activador y restaurar el foco.                       |

## Qué no incluye esta spec

- Envío de correos, códigos generados o activación de cuentas.
- Persistencia, API, base de datos o cambios de datos mock.
- Actualización de padres vinculados tras enviar el formulario.
- Playwright, pruebas manuales de navegador o ejecución de `spec-verifier`.
