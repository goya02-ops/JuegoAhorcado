// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from "vitest";
import { obtenerPalabra } from "../src/index";

beforeAll(() => {
  document.body.innerHTML = '<div id="app"></div>';
});

describe("obtenerPalabra", () => {
  it("sin parametro devuelve AHORCADO por defecto", () => {
    expect(obtenerPalabra("")).toBe("AHORCADO");
  });

  it("con ?word=GATO devuelve GATO", () => {
    expect(obtenerPalabra("?word=GATO")).toBe("GATO");
  });
});
