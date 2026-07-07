// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { mountApp } from "../src/ui/main";
import { Ahorcado } from "../src/domain/Ahorcado";

describe("mountApp - render inicial", () => {
  it("crea elementos con data-testid word, lives, message y un input", () => {
    const juego = new Ahorcado("GATO");
    const container = document.createElement("div");
    mountApp(container, juego);

    expect(container.querySelector('[data-testid="word"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="lives"]')).not.toBeNull();
    expect(container.querySelector('[data-testid="message"]')).not.toBeNull();
    expect(container.querySelector("input")).not.toBeNull();
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
