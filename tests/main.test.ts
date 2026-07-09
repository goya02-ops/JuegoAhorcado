// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { mountApp } from "../src/ui/main";
import { Ahorcado } from "../src/domain/Ahorcado";

describe("mountApp - render inicial", () => {
  it("crea elementos con data-testid word, lives, message, restart y partes del ahorcado", () => {
    const juego = new Ahorcado("GATO");
    const container = document.createElement("div");
    mountApp(container, juego);

    expect(container.querySelector('[data-testid="word"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="lives"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="message"]')).not.toBeNull();
    expect(container.querySelector("input")).not.toBeNull();
    expect(container.querySelector('[data-testid="restart"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="cabeza"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="torso"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="brazo-izq"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="brazo-der"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="pierna-izq"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="pierna-der"]')).not.toBeNull();
  });

  it("muestra la palabra enmascarada y las vidas iniciales", () => {
    const juego = new Ahorcado("GATO");
    const container = document.createElement("div");
    mountApp(container, juego);

    const wordEl = container.querySelector('[data-testid="word"]');
    const livesEl = container.querySelector('[data-testid="lives"]');

    expect(wordEl?.textContent).toBe("_ _ _ _");
    expect(livesEl?.textContent).toBe("6");
  });
});

describe("mountApp - dibujo progresivo", () => {
  it("al iniciar, las partes del ahorcado estan ocultas", () => {
    const juego = new Ahorcado("GATO");
    const container = document.createElement("div");
    mountApp(container, juego);

    const partes = ["cabeza", "torso", "brazo-izq", "brazo-der", "pierna-izq", "pierna-der"];
    for (const parte of partes) {
      const el = container.querySelector(`[data-testid="${parte}"]`) as HTMLElement;
      expect(el.style.display).toBe("none");
    }
  });

  it("tras un fallo, solo la cabeza es visible", () => {
    const juego = new Ahorcado("GATO");
    const container = document.createElement("div");
    mountApp(container, juego);

    const input = container.querySelector("input")!;
    input.value = "E";
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    const cabeza = container.querySelector('[data-testid="cabeza"]') as HTMLElement;
    const torso = container.querySelector('[data-testid="torso"]') as HTMLElement;

    expect(cabeza.style.display).not.toBe("none");
    expect(torso.style.display).toBe("none");
  });

  it("tras seis fallos, todas las partes son visibles", () => {
    const juego = new Ahorcado("GATO");
    const container = document.createElement("div");
    mountApp(container, juego);

    const input = container.querySelector("input")!;
    for (const letra of ["B", "C", "D", "E", "F", "H"]) {
      input.value = letra;
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    }

    const partes = ["cabeza", "torso", "brazo-izq", "brazo-der", "pierna-izq", "pierna-der"];
    for (const parte of partes) {
      const el = container.querySelector(`[data-testid="${parte}"]`) as HTMLElement;
      expect(el.style.display).not.toBe("none");
    }
  });
});

describe("mountApp - interaccion", () => {
  it("al escribir una letra y presionar Enter actualiza la palabra en el DOM", () => {
    const juego = new Ahorcado("GATO");
    const container = document.createElement("div");
    mountApp(container, juego);

    const input = container.querySelector("input")!;
    const wordEl = container.querySelector('[data-testid="word"]')!;

    input.value = "A";
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

    expect(wordEl.textContent).toBe("_ A _ _");
  });
});

describe("mountApp - letra repetida", () => {
  it("al adivinar una letra repetida muestra el mensaje en el DOM", () => {
    const juego = new Ahorcado("GATO");
    const container = document.createElement("div");
    mountApp(container, juego);

    const input = container.querySelector("input")!;
    const messageEl = container.querySelector('[data-testid="message"]')!;

    input.value = "A";
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    expect(messageEl.textContent).toBe("");

    input.value = "A";
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    expect(messageEl.textContent).toBe("Letra ya intentada");
  });
});

describe("mountApp - ganar", () => {
  it("al adivinar todas las letras muestra Ganaste y deshabilita el input", () => {
    const juego = new Ahorcado("GATO");
    const container = document.createElement("div");
    mountApp(container, juego);

    const input = container.querySelector("input")!;
    const messageEl = container.querySelector('[data-testid="message"]')!;

    for (const letra of ["G", "A", "T", "O"]) {
      input.value = letra;
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    }

    expect(messageEl.textContent).toBe("Ganaste");
    expect(input.disabled).toBe(true);
  });
});

describe("mountApp - reiniciar", () => {
  it("reiniciar despues de ganar restaura el tablero y habilita el input", () => {
    const juego = new Ahorcado("GATO");
    const container = document.createElement("div");
    mountApp(container, juego);

    const input = container.querySelector("input")!;
    const wordEl = container.querySelector('[data-testid="word"]')!;
    const livesEl = container.querySelector('[data-testid="lives"]')!;
    const restartBtn = container.querySelector('[data-testid="restart"]')!;

    for (const letra of ["G", "A", "T", "O"]) {
      input.value = letra;
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    }

    expect(input.disabled).toBe(true);

    (restartBtn as HTMLButtonElement).click();

    expect(wordEl.textContent).toBe("_ _ _ _");
    expect(livesEl.textContent).toBe("6");
    expect(input.disabled).toBe(false);
  });

  it("reiniciar despues de perder restaura el tablero y habilita el input", () => {
    const juego = new Ahorcado("GATO");
    const container = document.createElement("div");
    mountApp(container, juego);

    const input = container.querySelector("input")!;
    const wordEl = container.querySelector('[data-testid="word"]')!;
    const livesEl = container.querySelector('[data-testid="lives"]')!;
    const restartBtn = container.querySelector('[data-testid="restart"]')!;

    for (const letra of ["B", "C", "D", "E", "F", "H"]) {
      input.value = letra;
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    }

    expect(input.disabled).toBe(true);

    (restartBtn as HTMLButtonElement).click();

    expect(wordEl.textContent).toBe("_ _ _ _");
    expect(livesEl.textContent).toBe("6");
    expect(input.disabled).toBe(false);
  });
});

describe("mountApp - perder", () => {
  it("al fallar todas las vidas muestra Perdiste y deshabilita el input", () => {
    const juego = new Ahorcado("GATO");
    const container = document.createElement("div");
    mountApp(container, juego);

    const input = container.querySelector("input")!;
    const messageEl = container.querySelector('[data-testid="message"]')!;

    for (const letra of ["B", "C", "D", "E", "F", "H"]) {
      input.value = letra;
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    }

    expect(messageEl.textContent).toBe("Perdiste");
    expect(input.disabled).toBe(true);
  });
});
