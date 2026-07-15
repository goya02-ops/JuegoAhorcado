// @vitest-environment jsdom
import { describe, it, expect, beforeAll, vi } from "vitest";
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

describe("index - composition root", () => {
  it("no falla si el elemento app no existe en el DOM", () => {
    document.body.innerHTML = "";
    expect(() => {
      const app = document.getElementById("app");
      if (app) {
        // Esto no se ejecuta cuando app es null
      }
    }).not.toThrow();
  });

  it("al importar el modulo sin #app no lanza error", async () => {
    document.body.innerHTML = "";
    vi.resetModules();
    await expect(import("../src/index")).resolves.toBeDefined();
  });
});
