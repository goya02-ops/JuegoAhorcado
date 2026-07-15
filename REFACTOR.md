## R5 — Dividir `mountApp()` en funciones auxiliares (main.ts)

**Problema:** `mountApp()` tiene ~220 líneas y mezcla creación de menú, panel de juego e inputs en una sola función. Es difícil de leer y navegar.

**Refactor:** Extraer 3 funciones auxiliares. `mountApp()` se vuelve un orquestador:

```typescript
// 1. Extraer creación del menú (overlay + botones + input personalizado)
function createMenu(
  juegoActual: { get: () => Ahorcado; set: (j: Ahorcado) => void },
  render: () => void,
): { overlay: HTMLElement; ocultarMenu: () => void } {
  // ... todo el código del menú que actualmente está en mountApp L61-135
  // Retorna el overlay y una función para ocultarlo
}

// 2. Extraer panel de juego (columnas, inputs, reiniciar)
function createGamePanel(
  juegoActual: { get: () => Ahorcado; set: (j: Ahorcado) => void },
  render: () => void,
): {
  appEl: HTMLElement;
  wordEl: HTMLElement;
  livesEl: HTMLElement;
  messageEl: HTMLElement;
  letterInput: HTMLInputElement;
  wordInput: HTMLInputElement;
  restartBtn: HTMLButtonElement;
} {
  // ... todo el código de columnas, inputs, etc. que actualmente está en mountApp L137-226
}

// 3. mountApp se vuelve corto:
export function mountApp(
  container: HTMLElement,
  juego: Ahorcado,
  opciones?: { mostrarMenu: boolean },
): void {
  let juegoActual = juego;
  const getJuego = () => juegoActual;
  const setJuego = (j: Ahorcado) => {
    juegoActual = j;
  };

  const appEl = document.createElement("div");
  appEl.className = "game";

  const header = document.createElement("h1");
  header.className = "header";
  header.textContent = "AHORCADO";
  appEl.appendChild(header);

  const { overlay, ocultarMenu } = createMenu(
    { get: getJuego, set: setJuego },
    render,
  );
  const {
    appEl: gamePanel,
    wordEl,
    livesEl,
    messageEl,
    letterInput,
    wordInput,
    restartBtn,
  } = createGamePanel({ get: getJuego, set: setJuego }, render);

  appEl.appendChild(gamePanel);

  function render(): void {
    // ... la función render se mantiene igual (L228-261)
  }

  if (!opciones?.mostrarMenu) ocultarMenu();
  render();
  container.appendChild(appEl);
}
```

**Nota:** La función `render()` necesita acceso a las referencias DOM de ambas funciones auxiliares. Por eso se retornan como objetos. Alternativamente, se puede pasar un objeto `state` compartido.

**Verificación:** `pnpm test` — los 17 tests de `main.test.ts` deben seguir pasando. También `pnpm at` para los acceptance tests.

## R11 — Eliminar test redundante (index.test.ts)

**Problema:** En `tests/index.test.ts:20-28` el test "no falla si el elemento app no existe en el DOM" solo verifica que un bloque `if (app) {}` vacío no tire error. No valida comportamiento real. El test de la línea 30-34 ya cubre mejor el mismo escenario (importar el módulo sin `#app` no lanza error).

**Refactor:** Eliminar el test de las líneas 20-28.

**Verificación:** `pnpm test` — debe pasar sin cambios (de 75 a 74 tests).

---

---

## Nota sobre R5 (dividir mountApp)

Este es el refactor más complejo. Si se hace mal, puede romper tests de UI. Recomendaciones:

1. Hacerlo **último**, después de los otros refactorings más simples
2. No cambiar la interfaz pública de `mountApp` (los tests la llaman igual)
3. Hacer cambios incrementales: primero extraer una función, correr tests, extraer la siguiente
4. Si algún test falla, revisar que las referencias DOM (`wordEl`, `input`, etc.) se pasen correctamente
