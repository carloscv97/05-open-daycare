# SPEC 02 — Pantallas de niños

> **Estado:** Implemented
> **Depende de:** SPEC 01
> **Fecha:** 2026-09-16
> **Objetivo:** Crear las rutas `/kids` y `/kids/[slug]` con datos mock centralizados, reproduciendo las referencias de listado y perfil de niños.

## Alcance

**Incluye:**

- Crear la ruta `/kids` con el listado de los ocho niños, el buscador visual, las tarjetas enlazadas y diseño responsive a partir de `references/pantallas/ninos.dc.html`.
- Crear la ruta `/kids/[slug]` con un perfil completo por niño y diseño responsive a partir de `references/pantallas/perfil-nino.dc.html`.
- Centralizar los datos mock de niños, padres, alertas y notas para que las rutas compartan una única fuente.
- Usar los slugs `mateo-fernandez`, `sofia-mendez`, `benjamin-ruiz`, `valentina-soto`, `tomas-diaz`, `emma-castro`, `lucas-romero` y `olivia-vega`.
- Mostrar un estado vacío explícito de alertas cuando el niño no tenga alergias ni notas.
- Mostrar la página 404 de Next.js para un slug inexistente.
- Convertir Niños en un enlace funcional y activo en `Sidebar` y `MobileNavigation` para `/kids` y sus subrutas.

**Fuera de alcance (para futuras specs):**

- Implementar los flujos o rutas de Editar, Resumen del día, Vincular otro padre o Agregar niño.
- Hacer funcional el campo de búsqueda.
- Persistir datos, integrar una API o implementar autenticación.

## Modelo de datos

`lib/mock-kids.ts` centralizará los tipos y registros mock:

```ts
type ParentStatus = 'active' | 'pending';

type Parent = {
  name: string;
  relation: 'mother' | 'father';
  status: ParentStatus;
  avatarVariant: string;
};

type Kid = {
  slug: string;
  name: string;
  birthDate: string;
  ageLabel: string;
  room: string;
  enrollmentLabel: string;
  avatarVariant: string;
  alertNote?: string;
  listBadge?: string;
  parents: Parent[];
};
```

Los ocho registros conservarán los nombres, edades, estados de padres y alertas alimentarias de la referencia. Cada uno tendrá los datos adicionales necesarios para renderizar un perfil completo y coherente.

## Plan de implementación

1. Crear `lib/mock-kids.ts` con los tipos `Kid` y `Parent`, los ocho registros mock y un helper para obtener un niño por `slug`.
2. Crear los componentes exclusivos del dominio en `components/kids/` para la tarjeta del listado, los datos del perfil, las alertas y los padres vinculados.
3. Crear `app/kids/page.tsx` para renderizar el listado con la composición, textos y estilos de `ninos.dc.html`; el buscador se mostrará sin estado de cliente ni filtrado.
4. Crear `app/kids/[slug]/page.tsx` para resolver el niño desde el modelo mock, renderizar su perfil y ejecutar `notFound()` cuando no exista.
5. Actualizar `components/shared/Sidebar.tsx` y `components/shared/MobileNavigation.tsx` para enlazar las rutas de Feed y Niños y derivar el elemento activo de la ruta actual.
6. Ajustar las clases responsive de las rutas y componentes nuevos para usar una columna y navegación inferior en móvil sin alterar la composición de escritorio.

## Criterios de aceptación

- [x] La ruta `/kids` muestra exactamente las ocho tarjetas de niños de la referencia.
- [x] Las tarjetas enlazan respectivamente a los ocho slugs acordados bajo `/kids/`.
- [x] El campo Buscar niño se muestra y no modifica las tarjetas al escribir.
- [x] Cada slug válido muestra el nombre, edad, sala, fechas, padres y alertas del registro mock correspondiente.
- [x] Un perfil sin `alertNote` muestra un estado vacío de alergias y notas.
- [x] Una visita a `/kids/un-slug-inexistente` muestra la página 404.
- [x] Sidebar y navegación móvil enlazan a `/kids` y marcan Niños como activo en `/kids` y `/kids/[slug]`.
- [x] Las acciones Editar, Resumen del día, Vincular otro padre y Agregar niño permanecen como interfaz sin rutas ni flujos implementados.
- [x] Las rutas `/kids` y `/kids/[slug]` son utilizables en escritorio y móvil.
- [x] `npm run build` finaliza correctamente.

## Decisiones

- **Sí:** datos mock centralizados en `lib/mock-kids.ts`. Impiden discrepancias entre el listado y los perfiles.
- **Sí:** slugs basados en nombre y apellido normalizados. Son legibles y estables para estos datos mock.
- **Sí:** perfiles completos para los ocho niños. Cada enlace del listado conduce a una pantalla significativa.
- **Sí:** `notFound()` para slugs desconocidos. Evita mostrar datos de otro niño por error.
- **Sí:** estado vacío de alertas. Comunica de forma explícita que no existen alergias ni notas registradas.
- **No:** búsqueda funcional. La referencia solo requiere el control visual y no se introduce estado de cliente innecesario.
- **No:** acciones secundarias funcionales. Su implementación pertenece a otra spec.

## Riesgos

| Riesgo                                            | Mitigación                                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------------------- |
| Datos inconsistentes entre tarjetas y perfiles    | Consumir una única colección de mocks desde ambas rutas.                        |
| Navegación activa incorrecta al visitar un perfil | Determinar el estado activo desde la ruta actual.                               |
| El detalle crece horizontalmente en móvil         | Aplicar composición de una columna y evitar anchos fijos en pantallas pequeñas. |

## Qué no incluye esta spec

- Alta o edición de niños.
- Resumen del día.
- Gestión de padres vinculados.
- Búsqueda funcional.
- Backend, persistencia o autenticación.
