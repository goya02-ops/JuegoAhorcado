# AGENTS.md — JuegoAhorcado

Repo universitario: ATDD del Ahorcado en TypeScript. Antes de tocar código, leer **`GUIA-ATDD-IA-Ahorcado.md`** — contiene el proceso, arquitectura y reglas del ejercicio.

## Comandos

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Dev server en :5173 |
| `pnpm build` | Compilar con Vite (output en `dist/`) |
| `pnpm test` | Vitest (unit tests del dominio) |
| `pnpm at` | `bddgen && playwright test` (ATs en navegador) |

No hay linter ni typechecker — Vite maneja TS en tiempo de build. Usar solo `pnpm` localmente; CI usa `npm`.

## CI/CD

CI corre en `main` y `develop`. Usa **npm** (no pnpm). Solo se pushea cuando está verde.
SonarQube solo en `main`. Deploy a Vercel desde `main` después de pasar tests.

El repo tiene ambos lockfiles: `package-lock.json` (CI) y `pnpm-lock.yaml` (local).

## Estructura

```
src/
  index.ts              ← composition root (lee ?word=, crea Ahorcado, mountea UI)
  domain/Ahorcado.ts    ← lógica pura (sin DOM/I/O)
  ui/main.ts            ← consume Ahorcado, mountea UI con data-testid
features/              ← 14 .feature + steps/ahorcado.steps.ts
tests/
  Ahorcado.test.ts  ← UTs del dominio
  main.test.ts      ← tests de UI (jsdom)
  index.test.ts     ← tests de composition root (jsdom)
```

## API del dominio (`Ahorcado`)

Palabra normalizada a mayúsculas. Vidas iniciales: 6.

| Método | Retorna |
|---|---|
| `palabraEnmascarada()` | string con espacios (ej. `"_ A _ _"`) |
| `adivinar(letra)` | void — descuenta vida si falla; ignora repetidas, inválidas y juego terminado |
| `adivinarPalabra(palabra)` | void — adivina palabra completa; acierto = todas letras, fallo = 0 vidas |
| `vidas()` | número |
| `estasGanado()` / `estasPerdido()` | boolean |
| `estaTerminado()` | boolean |
| `ultimoMensaje()` | `""` o `"Letra ya intentada"` |
| `partesVisibles()` | número (0–6) — cuántas partes del dibujo se ven |
| `reiniciar()` | void — resetea vidas, letras y mensaje |
| `getPalabra()` | string — palabra normalizada (para ATs que leen la URL) |
| `tenesMenuAbierto()` / `cerrarMenu()` | boolean / void — control del menú de inicio |

## Reglas de dependencia

- `domain/` no importa `ui/` ni el DOM
- `ui/` solo usa métodos públicos de `Ahorcado`; no contiene lógica de juego
- Los ATs ejercitan el `Ahorcado` real dentro de la app real (no mock)

## Seam para tests

La palabra secreta se inyecta por URL: `/?word=GATO`. Default si no viene: `"AHORCADO"`.

## Convención de commits

Prefijos obligatorios: `RED:` (test fallando), `GREEN:` (código que lo pasa), `REFACTOR:` (opcional). Los RED van localmente como ancestros de GREEN. Solo se pushea con el tope en verde.

## ATs (Playwright)

- `bddgen` (corrido por `pnpm at`) genera specs en `.features-gen/` (`.gitignore`d)
- Playwright auto-levanta Vite via `webServer` en `playwright.config.ts` — no hace falta `pnpm dev` aparte
- Todos los ATs comparten steps en `features/steps/ahorcado.steps.ts`
- Los elementos UI se localizan con `data-testid` en vez de selectores CSS/texto: `word`, `lives`, `message`

## Notas

- No hay `tsconfig.json` — se usan defaults de Vite
- `packageManager` en `package.json`: `pnpm@10.20.0`
- Vitest global: `environment: "node"`, pero `tests/main.test.ts` e `tests/index.test.ts` usan `// @vitest-environment jsdom`
- Los `.env`/`.env.local` contienen tokens (SonarQube, Vercel). Ya ignorados en `.gitignore`, pero no exponerlos.
