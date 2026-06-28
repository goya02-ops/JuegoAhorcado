import { describe, it, expect } from "vitest";
import { Ahorcado } from "../src/domain/Ahorcado";

describe("Ahorcado", () => {
  it("al iniciar, muestra la palabra enmascarada con guiones bajos", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
  });

  it("al iniciar, tiene 6 vidas", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.vidas()).toBe(6);
  });

  it("revela la letra acertada en la palabra enmascarada", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("A");
    expect(juego.palabraEnmascarada()).toBe("_ A _ _");
  });

  it("no descuenta vidas al acertar", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("A");
    expect(juego.vidas()).toBe(6);
  });

  it("es case-insensitive al adivinar", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("a");
    expect(juego.palabraEnmascarada()).toBe("_ A _ _");
  });

  it("revela todas las ocurrencias de la letra acertada", () => {
    const juego = new Ahorcado("ALA");
    juego.adivinar("A");
    expect(juego.palabraEnmascarada()).toBe("A _ A");
  });

  it("descuenta una vida al fallar", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("E");
    expect(juego.vidas()).toBe(5);
  });

  it("la palabra no cambia al fallar", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("E");
    expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
  });

  it("fallo y acierto combinados", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("E");
    juego.adivinar("A");
    expect(juego.vidas()).toBe(5);
    expect(juego.palabraEnmascarada()).toBe("_ A _ _");
  });
});

describe("Pruebas unitarias del Acceptance Test 4", () => {
  it("al iniciar, no ha ganado", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.estasGanado()).toBe(false);
  });
  it("al perder, se revela la palabra completa", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("E");
    juego.adivinar("I");
    juego.adivinar("U");
    juego.adivinar("C");
    juego.adivinar("H");
    juego.adivinar("B");
    expect(juego.estasPerdido()).toBe(true);
    expect(juego.palabraEnmascarada()).toBe("G A T O");
  });
});
