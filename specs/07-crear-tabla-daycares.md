# SPEC 07 — Crear tabla `daycares`

> **Estado:** Implemented
> **Depende de:** Ninguno
> **Fecha:** 2026-09-16
> **Objetivo:** Crear y registrar en Supabase la tabla raíz `public.daycares` con integridad de nombres y RLS sin políticas, conservando una migración local equivalente.

## Alcance

**Incluye:**

- Aplicar una migración remota de Supabase llamada `create_daycares`.
- Conservar la migración `create_daycares` en `supabase/migrations/` con el mismo SQL aplicado remotamente.
- Crear `public.daycares` con `id`, `name` y `created_at`.
- Usar UUID generado por defecto y marcas de tiempo con zona horaria.
- Exigir nombres no vacíos.
- Impedir nombres duplicados ignorando mayúsculas, minúsculas y espacios exteriores.
- Activar RLS sin políticas.
- Insertar `Guardería Sala Soles`, `Guardería Arcoíris` y `Guardería Pequeños Exploradores` como seed de demostración.
- Verificar columnas, restricciones, RLS y unicidad mediante una transacción revertida.
- Mantener sin cambios las migraciones de prueba existentes en Supabase.

**Fuera de alcance (para futuras specs):**

- Configurar el cliente Supabase en Next.js.
- Reemplazar mocks, modificar la interfaz o generar tipos TypeScript.
- Añadir políticas RLS, usuarios, salas o relaciones.

## Modelo de datos

```sql
public.daycares (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
)
```

`name` deberá pasar una comprobación de texto no vacío tras `btrim(name)`. Un índice único sobre `lower(btrim(name))` evitará duplicados normalizados.

El seed insertará estas tres filas:

- `Guardería Sala Soles`
- `Guardería Arcoíris`
- `Guardería Pequeños Exploradores`

## Plan de implementación

1. Confirmar el estado remoto: no hay tablas en `public` y las dos migraciones de prueba permanecen registradas.
2. Crear la migración local `create_daycares` y aplicarla en Supabase para crear la tabla, la validación de nombre, el índice único normalizado, RLS y el seed de las tres guarderías definidas.
3. Consultar el catálogo de PostgreSQL para comprobar columnas, valores por defecto, índice y RLS sin políticas.
4. Ejecutar una transacción de prueba que inserte un nombre válido e intente variantes con diferencias de mayúsculas o espacios; confirmar el rechazo y hacer `ROLLBACK`.
5. Revisar que el historial remoto contenga `create_daycares` y que las únicas filas persistentes sean las tres guarderías del seed.

## Criterios de aceptación

- [x] `public.daycares` existe en Supabase.
- [x] `id` es `uuid`, clave primaria y tiene `gen_random_uuid()` como valor por defecto.
- [x] `name` es obligatorio y no acepta valores vacíos o compuestos solo por espacios.
- [x] `created_at` es `timestamptz` y tiene `now()` como valor por defecto.
- [x] No pueden coexistir `Sala Soles`, `sala soles` ni `Sala Soles`.
- [x] RLS está habilitado y no hay políticas para la tabla.
- [x] Existen exactamente tres guarderías iniciales: `Guardería Sala Soles`, `Guardería Arcoíris` y `Guardería Pequeños Exploradores`.
- [x] La migración `create_daycares` aparece en el historial remoto de Supabase.
- [x] La migración local `create_daycares` contiene el mismo SQL que la migración remota aplicada.
- [x] La prueba de integridad no deja filas persistentes adicionales al seed.
- [x] No se realizan cambios en la app ni se añade configuración de CLI de Supabase.

## Decisiones

- **Sí:** migración registrada en Supabase y conservada como artefacto local.
- **Sí:** RLS sin políticas hasta definir usuarios y permisos.
- **Sí:** unicidad normalizada para evitar duplicados semánticos.
- **Sí:** seed de tres guarderías. Permite comprobar la tabla desde el primer despliegue sin crear una segunda migración.
- **No:** integración con Next.js en esta etapa.

## Riesgos

| Riesgo                                                                                  | Mitigación                                                                            |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Los clientes no pueden leer o escribir la tabla al activar RLS sin políticas.           | Mantener la tabla fuera de la integración de Next.js hasta definir roles y políticas. |
| Las migraciones de prueba remotas no tienen un artefacto equivalente en el repositorio. | No modificarlas; la migración `create_daycares` sí se conserva localmente.            |

## Qué no incluye esta spec

- Configuración de Supabase CLI en el repositorio.
- Políticas RLS o permisos de acceso.
- Configuración de Supabase en Next.js, tipos generados o cambios a datos mock.
