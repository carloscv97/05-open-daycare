<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Proyecto

- Es una única aplicación Next.js 16 (App Router) con React 19 y TypeScript estricto. Usa `npm`, respaldado por `package-lock.json`.
- La interfaz ejecutable vive en `app/`: `app/layout.tsx` define el documento, las fuentes y los estilos globales; `app/page.tsx` es la ruta `/` actual.
- Usa el alias `@/*` para importaciones desde la raíz del repositorio.
- El estilo usa Tailwind CSS 4 mediante `@import "tailwindcss"` en `app/globals.css`; no hay archivo de configuración de Tailwind.
- `references/screenshots/` y `references/pantallas/` contienen material de referencia visual y HTML; Next.js no los compila como parte de la aplicación.

## Arquitectura de componentes

- Organiza los componentes por dominio en `components/<dominio>/`; los específicos de una capacidad viven junto a su dominio.
- Promueve un componente a `components/shared/` solo cuando tenga reutilización real entre dominios de OpenDayCare. Este directorio no implica componentes genéricos o configurables.

## Convenciones de nombres

- Usa identificadores en inglés.
- Usa `PascalCase` para componentes.
- Usa `camelCase` para funciones y variables.
- Usa `UPPER_SNAKE_CASE` para constantes globales inmutables.

## Comandos

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run lint`: ejecuta ESLint con las configuraciones `core-web-vitals` y TypeScript de Next.js. También analiza `references/pantallas/support.js` y actualmente falla allí por dos errores ajenos a la aplicación.
- `npm run build`: valida la compilación de producción e incluye la comprobación de tipos de Next.js. No hay una suite de pruebas ni un script de typecheck independiente configurados.

## MCPs y uso

### Playwright

- Usa el MCP de Playwright para capturas de pantalla, pruebas de interfaz, navegación y cualquier otra interacción con el navegador.
- Guarda las capturas, trazas, descargas y demás artefactos generados por Playwright dentro de `.playwright-mcp/`.
- No dejes artefactos de Playwright en la raíz del proyecto ni en directorios de código fuente.

### Context7

- Usa el MCP de Context7 para consultar documentación actualizada de los frameworks, librerías, SDKs y tecnologías utilizadas por el proyecto.
- Resuelve primero el identificador de la librería y consulta después la documentación específica necesaria antes de implementar o responder sobre su API.

### CodeGraph

- Usa CodeGraph antes de explorar o modificar código existente para entender símbolos, relaciones, rutas de llamadas e impacto de los cambios.
- Consulta `codegraph_explore` con los símbolos, archivos o flujo funcional relevante; evita reconstruir dependencias manualmente con búsquedas amplias cuando CodeGraph pueda proporcionar ese contexto.
- Tras editar, espera la sincronización automática del índice. Lee directamente los archivos solo si CodeGraph indica que están pendientes de sincronización o no está disponible.

## Spec Driver Development - Skills

- Para funcionalidades o cambios de alcance amplio, usa la skill `/spec` para crear y aprobar una especificación antes de escribir código.
- Una vez aprobada la especificación, usa la skill `/spec-impl` para implementar sus pasos.

## Verificación de specs

- Para comprobar una especificación implementada frente a sus criterios de aceptación, usa el agente `@spec-verifier` con la ruta del archivo de spec.
- El agente debe verificar todos los criterios, aplicar correcciones mínimas si son necesarias y reportar los bloqueos pendientes.
