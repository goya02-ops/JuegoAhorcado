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
  it("al adivinar todas las letras, el juego esta ganado", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("G");
    juego.adivinar("A");
    juego.adivinar("T");
    juego.adivinar("O");
    expect(juego.estasGanado()).toBe(true);
  });
});

describe("Pruebas unitarias del Acceptance Test 7", () => {
  it("al iniciar, no ha perdido", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.estaPerdido()).toBe(false);
  });

  it("al fallar 6 veces, el juego esta perdido", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("B");
    juego.adivinar("C");
    juego.adivinar("D");
    juego.adivinar("E");
    juego.adivinar("F");
    juego.adivinar("H");
    expect(juego.estaPerdido()).toBe(true);
  });

  it("adivinar con caracter no letra no descuenta vidas", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("1");
    expect(juego.vidas()).toBe(6);
    expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
  });

  it("adivinar con cadena vacia no descuenta vidas", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("");
    expect(juego.vidas()).toBe(6);
  });

  it("adivinar despues de ganar no afecta el estado", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("G");
    juego.adivinar("A");
    juego.adivinar("T");
    juego.adivinar("O");
    juego.adivinar("X");
    expect(juego.estasGanado()).toBe(true);
    expect(juego.vidas()).toBe(6);
    expect(juego.palabraEnmascarada()).toBe("G A T O");
  });

  it("adivinar despues de perder no afecta el estado", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("B");
    juego.adivinar("C");
    juego.adivinar("D");
    juego.adivinar("E");
    juego.adivinar("F");
    juego.adivinar("H");
    juego.adivinar("I");
    expect(juego.estaPerdido()).toBe(true);
    expect(juego.vidas()).toBe(0);
  });
});
