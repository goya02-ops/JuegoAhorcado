# Ahorcado — ATDD con TypeScript

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=goya02-ops_JuegoAhorcado&metric=coverage)](https://sonarcloud.io/dashboard?id=goya02-ops_JuegoAhorcado)
[![CI](https://github.com/goya02-ops/JuegoAhorcado/actions/workflows/ci.yml/badge.svg)](https://github.com/goya02-ops/JuegoAhorcado/actions/workflows/ci.yml)

Proyecto universitario de la materia **Ágiles 2025** (22-6-26): juego del Ahorcado construido con **Acceptance Test Driven Development** en un doble loop de tests.

## Stack

| Herramienta | Uso |
|---|---|
| pnpm | Package manager |
| TypeScript + Vite | App y dev server |
| Vitest | Unit tests del dominio |
| Cucumber/Gherkin + playwright-bdd | Acceptance tests |
| Playwright | Driver de navegador para ATs |

## Comandos

```bash
pnpm dev       # Dev server en http://localhost:5173
pnpm test      # Unit tests (Vitest)
pnpm at        # Acceptance tests (bddgen + Playwright)
```

## Estructura

```
src/
  domain/Ahorcado.ts    → lógica del juego (sin DOM)
  ui/main.ts            → interfaz (solo consume Ahorcado)
  index.ts              → composition root, lee ?word=
tests/
  Ahorcado.test.ts      → unit tests
features/
  iniciar-partida.feature   ✓
  acertar-letra.feature     ✓
  fallar-letra.feature      ✓
  ganar-partida.feature     ✓
  perder-partida.feature    ✓
  letra-repetida.feature    ✓
  entrada-invalida.feature  ✓
  steps/ahorcado.steps.ts   → steps reutilizables
```

## Seam para tests

La palabra secreta se inyecta por URL: `http://localhost:5173/?word=GATO`.  
Default si no hay parámetro: `"AHORCADO"`.

## Proceso de desarrollo (doble loop)

1. **Loop externo (AT):** escribir `.feature` + steps → rojo (app real en navegador)
2. **Loop interno (UT):** ciclos rojo→verde→refactor sobre `Ahorcado` con Vitest
3. **Cablear UI** y arranque → AT verde
4. **Verificar visualmente** en `http://localhost:5173/?word=GATO`

Los commits siguen el prefijo `RED:` / `GREEN:` / `REFACTOR:`.

## Estado

Todos los ATs implementados y verdes (1–7).  
El pipeline CI/CD despliega automáticamente a Vercel desde `main`.  
Ver `GUIA-ATDD-IA-Ahorcado.md` para detalles del proceso.
