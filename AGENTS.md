# AGENTS.md — agiles-22-6-26

Repo universitario: ejercicio ATDD del Ahorcado (TypeScript).

## Referencia obligatoria

Leer **`GUIA-ATDD-IA-Ahorcado.md`** antes de tocar código. Allí están las reglas del proceso, la arquitectura y los ATs.

## Stack

| Herramienta | Uso |
|---|---|
| pnpm | package manager (v10.20.0). No usar npm/yarn. |
| TypeScript + Vite | App y dev server |
| Vitest | Unit tests del dominio (`tests/`) |
| Cucumber/Gherkin + playwright-bdd | Acceptance tests (`features/`) |
| Playwright | Driver de navegador para ATs |

## Scripts (agregar a package.json)

```json
{
  "dev": "vite",
  "test": "vitest",
  "at": "bddgen && playwright test"
}
```

Ejecutar: `pnpm dev`, `pnpm test`, `pnpm at`.

## Configs requeridas

- `vitest.config.ts` — environment: `"node"`, include: `["tests/**/*.test.ts"]`
- `playwright.config.ts` — webServer: `pnpm dev` en `:5173`, baseURL `:5173`, `defineBddConfig` con features + steps
- `.gitignore` — `node_modules/`, `.features-gen/`, `test-results/`, `playwright-report/`, `coverage/`, `dist/`

Setup inicial: `pnpm add -D vitest @playwright/test playwright-bdd` + `npx playwright install chromium`.

## Estructura esperada

```
src/
  domain/Ahorcado.ts       ← lógica pura, sin DOM ni I/O
  ui/main.ts               ← UI, consume Ahorcado
  index.ts                 ← composition root, lee ?word=
index.html
tests/
  Ahorcado.test.ts         ← unit tests (Vitest)
features/
  *.feature                ← ATs en Gherkin (español)
  steps/*.steps.ts         ← step definitions
```

Regla: `domain/` no importa `ui/`. `ui/` solo usa métodos públicos de `Ahorcado`. Toda lógica de juego vive en `Ahorcado`.

## Ciclo de desarrollo (doble loop)

1. **Loop externo (AT):** escribir `.feature` + steps → rojo (app real en navegador)
2. **Loop interno (UT):** uno o más ciclos rojo→verde→refactor sobre `Ahorcado` con Vitest
3. Cablear UI y arranque → AT verde
4. Verificar visualmente: abrir `http://localhost:5173/?word=GATO`

## Convención de commits

Prefijos obligatorios en el mensaje:
- `RED:` — commit del test fallando (antes de escribir producción)
- `GREEN:` — commit del código que lo pasa
- `REFACTOR:` — refactor opcional

Los commits rojos van localmente como ancestros de los verdes. Solo se pushea con el tope en verde.

## Seam para tests

La palabra secreta se inyecta por URL: `/?word=GATO`. Así los ATs son deterministas.

## Estado actual

Skeleton inicial: solo `package.json` y `GUIA-ATDD-IA-Ahorcado.md`. No hay código, configs, ni git history. Construir incrementalmente respetando el ciclo AT → UTs → cableado.
