# AGENTS.md — agiles-22-6-26

Repo universitario: ATDD del Ahorcado en TypeScript. Antes de tocar código, leer **`GUIA-ATDD-IA-Ahorcado.md`** — contiene el proceso, arquitectura y reglas del ejercicio.

## CI (GitHub Actions)

El workflow `.github/workflows/ci.yml` corre en `ubuntu-latest` con Node 24 y **npm** (no pnpm). Pasos:
1. `npm ci` — instala desde `package-lock.json`
2. `npm run build` — compila con Vite
3. `npm test` — Vitest (unit tests)
4. `npx playwright install chromium --with-deps` — navegador para ATs
5. `npm run at` — Playwright (acceptance tests)
6. Upload de `test-results/` y `playwright-report/` como artifact

## Stack

| Herramienta | Uso |
|---|---|
| pnpm (v10.20.0) | package manager. No usar npm/yarn |
| TypeScript + Vite | App + dev server |
| Vitest | Unit tests (`tests/`) |
| Cucumber/Gherkin + playwright-bdd | Acceptance tests (`features/`) |
| Playwright | Driver de navegador para ATs |

## Comandos

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Dev server en :5173 |
| `pnpm test` | Vitest (unit tests del dominio) |
| `pnpm at` | `bddgen && playwright test` (ATs en navegador) |

## Estructura actual

```
src/
  domain/Ahorcado.ts    ← lógica pura, sin DOM/I/O
  ui/main.ts            ← monta UI con data-testid="word"/"lives"
  index.ts              ← composition root, lee ?word=
index.html              ← <div id="app">, carga /src/index.ts
tests/
  Ahorcado.test.ts      ← 8 UTs (vitest)
features/
  iniciar-partida.feature   ✓ implementado
  acertar-letra.feature     ✓ implementado
  fallar-letra.feature      ✓ implementado
  steps/ahorcado.steps.ts   ← steps reutilizables
```

## Estado del dominio (`Ahorcado`)

Métodos implementados: `constructor(palabra)`, `palabraEnmascarada()`, `adivinar(letra)`, `vidas()`. Palabra se normaliza a mayúsculas internamente. Vidas iniciales: 6.

**Aún no implementado:** detección de victoria/derrota, mensajes de fin de juego, letra repetida, entrada inválida (ATs 4-7 de la guía).

## Reglas de dependencia

- `domain/` no importa `ui/` ni el DOM
- `ui/` solo usa métodos públicos de `Ahorcado`; no contiene lógica de juego
- Los ATs ejercitan el objeto `Ahorcado` real dentro de la app real (no mock)

## Seam para tests

La palabra secreta se inyecta por URL: `/?word=GATO`. Default si no viene: `"AHORCADO"`.

## Convención de commits

Prefijos obligatorios: `RED:` (test fallando), `GREEN:` (código que lo pasa), `REFACTOR:` (opcional). Los RED van localmente como ancestros de GREEN. Solo se pushea con el tope en verde.

## Notas

- No hay `tsconfig.json` — se usan defaults de Vite
- `bddgen` genera specs en `.features-gen/` (en `.gitignore`)
- Todos los ATs comparten los mismos step definitions en `features/steps/ahorcado.steps.ts`
