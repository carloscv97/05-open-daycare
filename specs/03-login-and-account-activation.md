# SPEC 03 — Inicio y activación de cuenta

> **Estado:** Approved
> **Depende de:** Ninguno
> **Fecha:** 2026-09-16
> **Objetivo:** Crear las rutas `/login` y `/activate-account` que reproduzcan las referencias con formularios editables y navegación visual hacia `/`.

## Alcance

**Incluye:**

- Crear la ruta `/login` a partir de `references/pantallas/login.dc.html`.
- Crear la ruta `/activate-account` a partir de `references/pantallas/activar-cuenta.dc.html`.
- Eliminar de la pantalla de login el selector de rol Personal o Familia presente en la referencia.
- Reproducir el branding, colores, tipografías, iconografía, composición y textos de ambas referencias con los tokens y fuentes ya disponibles en la aplicación.
- Mantener los campos de email, contraseña y código editables localmente, sin guardar sus valores.
- Navegar a `/` al enviar cualquiera de los dos formularios.
- Enlazar login con activación de cuenta en ambos sentidos.
- Mostrar los datos estáticos de invitación para Mateo, Sala Soles, el código `7K4P9` y el email `lucia.fernandez@gmail.com`.
- Implementar una casilla de autorización de fotos interactiva, activada inicialmente y sin bloquear el envío cuando se desactiva.
- Ocultar el panel coral ilustrativo de login en móvil y conservar el formulario accesible.
- Mantener la pantalla de activación centrada en una sola columna tanto en escritorio como en móvil.

**Fuera de alcance (para futuras specs):**

- Autenticación, sesiones, autorización o integración con API.
- Persistencia de los datos de los formularios o de la autorización de fotos.
- Validación de campos, mensajes de error o estados de carga.
- Recuperación de contraseña.
- Un selector de roles Personal o Familia.
- Un feed o experiencia diferenciada para familias.

## Modelo de datos

Esta funcionalidad no introduce ni modifica estructuras de datos. Los datos de invitación son contenido estático de la interfaz y los valores editados por el usuario no se persisten.

## Estructura de componentes

- `components/auth/OpenDayCareLogo.tsx`: marca e icono compartidos entre las dos pantallas de acceso.
- `components/auth/LoginForm.tsx`: campos, acción de acceso y enlaces de la ruta `/login`.
- `components/auth/AccountActivationForm.tsx`: datos de invitación, campos, autorización y enlaces de la ruta `/activate-account`.
- `app/login/page.tsx`: composición responsive de la pantalla de inicio de sesión.
- `app/activate-account/page.tsx`: composición centrada de la pantalla de activación de cuenta.

## Plan de implementación

1. Consultar la guía relevante de Next.js 16 y la estructura actual de rutas y estilos antes de crear las nuevas pantallas.
2. Crear `components/auth/OpenDayCareLogo.tsx` con el icono solar y las variantes de presentación necesarias para compartir el branding de acceso.
3. Crear `components/auth/LoginForm.tsx` con los campos editables, el enlace visual de recuperación sin flujo, el enlace a `/activate-account` y un envío que navegue a `/`.
4. Crear `app/login/page.tsx` para componer el panel coral de escritorio, ocultarlo en móvil y renderizar `LoginForm` en una columna accesible.
5. Crear `components/auth/AccountActivationForm.tsx` con los datos estáticos de Mateo, Sala Soles, código y email, sus campos editables, la autorización nativa inicialmente activa, el enlace a `/login` y un envío que navegue a `/`.
6. Crear `app/activate-account/page.tsx` para renderizar la activación centrada y responsive junto a `AccountActivationForm`.
7. Revisar `/login` y `/activate-account` en escritorio y móvil, comprobar la navegación de sus enlaces y envíos, y ejecutar `npm run build`.

## Criterios de aceptación

- [ ] `/login` reproduce la composición de `login.dc.html` en escritorio, salvo por la ausencia de las opciones Personal y Familia.
- [ ] `/login` muestra campos editables de email y contraseña, la acción visual de recuperación y un enlace a `/activate-account`.
- [ ] En móvil, `/login` no muestra el panel coral ilustrativo y el formulario permanece visible y utilizable.
- [ ] Enviar el formulario de `/login` navega a `/` sin requerir validación ni autenticación.
- [ ] `/activate-account` muestra el código `7K4P9`, el email `lucia.fernandez@gmail.com` y la invitación para Mateo de Sala Soles.
- [ ] Los campos de código, email y contraseña de `/activate-account` son editables y sus cambios no persisten tras recargar.
- [ ] La autorización de fotos de `/activate-account` inicia activa, puede alternarse y no impide enviar el formulario.
- [ ] El enlace de `/activate-account` navega a `/login` y el envío de su formulario navega a `/`.
- [ ] `/activate-account` se muestra centrada en una única columna utilizable en escritorio y móvil.
- [ ] `npm run build` finaliza correctamente.

## Decisiones

- **Sí:** rutas `/login` y `/activate-account`. Usan nombres en inglés coherentes con las convenciones del proyecto.
- **Sí:** navegación visual a `/` para ambos formularios. Permite recorrer el prototipo sin introducir autenticación.
- **Sí:** campos editables sin validación ni persistencia. Conservan el comportamiento básico de un formulario y mantienen el alcance contenido.
- **Sí:** datos de invitación estáticos. Replican la referencia sin añadir una fuente de datos ni estado global.
- **Sí:** autorización nativa interactiva y activa inicialmente. Reproduce la referencia sin convertirla en una regla de negocio.
- **Sí:** ocultar el panel coral de login en móvil. Da prioridad al acceso y evita una pantalla vertical innecesariamente larga.
- **No:** selector Personal o Familia. El usuario indicó que no se necesita en esta pantalla.
- **No:** recuperación de contraseña. La acción se conserva solo como interfaz visual.
- **No:** feed familiar. La navegación posterior es la ruta principal existente.

## Riesgos

| Riesgo                                                        | Mitigación                                                                         |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| La navegación visual pueda interpretarse como una sesión real | Mantener fuera de alcance la autenticación y no almacenar ningún estado de sesión. |
| La referencia de escritorio se desborde en móvil              | Ocultar el panel coral de login y usar anchos fluidos y espaciado responsive.      |
| Los formularios parezcan validar datos                        | No añadir atributos, mensajes ni estados de validación personalizados.             |

## Qué no incluye esta spec

- Backend, autenticación, sesiones o control de acceso.
- Persistencia, API o integración de datos reales.
- Validación de formularios, recuperación de contraseña o errores de acceso.
- Roles Personal o Familia.
- Un feed específico para familias.
