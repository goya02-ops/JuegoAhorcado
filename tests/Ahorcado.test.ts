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

describe("Pruebas unitarias del Acceptance Test 5", () => {
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

describe("Pruebas unitarias del Acceptance Test 6", () => {
  it("no penaliza vidas al repetir una letra acertada", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("A");
    juego.adivinar("A");
    expect(juego.vidas()).toBe(6);
  });

  it("no penaliza vidas al repetir una letra fallada", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("E");
    juego.adivinar("E");
    expect(juego.vidas()).toBe(5);
  });

  it("devuelve mensaje si la letra ya fue intentada", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("A");
    expect(juego.ultimoMensaje()).toBe("");
    juego.adivinar("A");
    expect(juego.ultimoMensaje()).toBe("Letra ya intentada");
    juego.adivinar("E");
    expect(juego.ultimoMensaje()).toBe("");
  });
});

describe("Pruebas unitarias del Acceptance Test 7", () => {
  it("al iniciar, no ha perdido", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.estasPerdido()).toBe(false);
  });

  it("al fallar 6 veces, el juego esta perdido", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("B");
    juego.adivinar("C");
    juego.adivinar("D");
    juego.adivinar("E");
    juego.adivinar("F");
    juego.adivinar("H");
    expect(juego.estasPerdido()).toBe(true);
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
    expect(juego.estasPerdido()).toBe(true);
    expect(juego.vidas()).toBe(0);
  });
});

describe("Pruebas unitarias del Acceptance Test 8", () => {
  it("adivinar con varios caracteres no descuenta vidas", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("ABC");
    expect(juego.vidas()).toBe(6);
    expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
  });
});

describe("Pruebas unitarias del Acceptance Test 9 - Reiniciar partida", () => {
  it("reiniciar resetea el estado después de perder", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("B");
    juego.adivinar("C");
    juego.adivinar("D");
    juego.adivinar("E");
    juego.adivinar("F");
    juego.adivinar("H");
    expect(juego.estasPerdido()).toBe(true);
    juego.reiniciar();
    expect(juego.estasPerdido()).toBe(false);
    expect(juego.vidas()).toBe(6);
    expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
  });

  it("reiniciar resetea el estado después de ganar", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("G");
    juego.adivinar("A");
    juego.adivinar("T");
    juego.adivinar("O");
    expect(juego.estasGanado()).toBe(true);
    juego.reiniciar();
    expect(juego.estasGanado()).toBe(false);
    expect(juego.vidas()).toBe(6);
    expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
  });

  it("reiniciar limpia el ultimo mensaje", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("A");
    juego.adivinar("A");
    expect(juego.ultimoMensaje()).toBe("Letra ya intentada");
    juego.reiniciar();
    expect(juego.ultimoMensaje()).toBe("");
  });

  it("reiniciar mantiene la misma palabra", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("G");
    juego.adivinar("A");
    juego.adivinar("T");
    juego.adivinar("O");
    juego.reiniciar();
    juego.adivinar("G");
    expect(juego.palabraEnmascarada()).toBe("G _ _ _");
  });
});

describe("Pruebas unitarias del Acceptance Test 10 - Dibujo progresivo", () => {
  it("al iniciar sin fallos, hay 0 partes visibles", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.partesVisibles()).toBe(0);
  });

  it("tras 1 fallo, hay 1 parte visible", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("E");
    expect(juego.partesVisibles()).toBe(1);
  });

  it("tras 3 fallos, hay 3 partes visibles", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("E");
    juego.adivinar("I");
    juego.adivinar("U");
    expect(juego.partesVisibles()).toBe(3);
  });

  it("tras 6 fallos, hay 6 partes visibles", () => {
    const juego = new Ahorcado("GATO");
    ["B", "C", "D", "E", "F", "H"].forEach((l) => juego.adivinar(l));
    expect(juego.partesVisibles()).toBe(6);
  });

  it("reiniciar vuelve a 0 partes visibles", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("E");
    juego.adivinar("I");
    expect(juego.partesVisibles()).toBe(2);
    juego.reiniciar();
    expect(juego.partesVisibles()).toBe(0);
  });
});

describe("Pruebas unitarias del Acceptance Test 11 - Adivinar palabra completa", () => {
  it("adivinar la palabra correcta gana la partida", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinarPalabra("GATO");
    expect(juego.estasGanado()).toBe(true);
    expect(juego.palabraEnmascarada()).toBe("G A T O");
  });

  it("adivinar una palabra incorrecta pierde todas las vidas", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinarPalabra("PERRO");
    expect(juego.estasPerdido()).toBe(true);
    expect(juego.vidas()).toBe(0);
  });

  it("adivinar palabra es case-insensitive", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinarPalabra("gato");
    expect(juego.estasGanado()).toBe(true);
  });

  it("adivinar palabra despues de ganar no afecta el estado", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinarPalabra("GATO");
    juego.adivinarPalabra("OTRA");
    expect(juego.estasGanado()).toBe(true);
    expect(juego.vidas()).toBe(6);
  });

  it("adivinar palabra despues de perder no afecta el estado", () => {
    const juego = new Ahorcado("GATO");
    ["B", "C", "D", "E", "F", "H"].forEach((l) => juego.adivinar(l));
    juego.adivinarPalabra("GATO");
    expect(juego.estasPerdido()).toBe(true);
    expect(juego.vidas()).toBe(0);
  });

  it("adivinar palabra con espacios alrededor funciona", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinarPalabra("  GATO  ");
    expect(juego.estasGanado()).toBe(true);
  });

  it("adivinar palabra de 1 sola letra no afecta el estado", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinarPalabra("A");
    expect(juego.estasGanado()).toBe(false);
    expect(juego.estasPerdido()).toBe(false);
    expect(juego.vidas()).toBe(6);
  });

  it("adivinar palabra limpia el mensaje anterior", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("A");
    juego.adivinar("A");
    expect(juego.ultimoMensaje()).toBe("Letra ya intentada");
    juego.adivinarPalabra("GATO");
    expect(juego.ultimoMensaje()).toBe("");
  });
});

describe("Bug: metodo duplicado estaPerdido", () => {
  it("estaTerminado devuelve true despues de perder", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("B");
    juego.adivinar("C");
    juego.adivinar("D");
    juego.adivinar("E");
    juego.adivinar("F");
    juego.adivinar("H");
    expect(juego.estaTerminado()).toBe(true);
  });

  it("estaTerminado devuelve true despues de ganar", () => {
    const juego = new Ahorcado("GATO");
    juego.adivinar("G");
    juego.adivinar("A");
    juego.adivinar("T");
    juego.adivinar("O");
    expect(juego.estaTerminado()).toBe(true);
  });

  it("estaTerminado devuelve false al iniciar", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.estaTerminado()).toBe(false);
  });
});

// Agos

describe("Pruebas unitarias del AT 19 - Menu visible", () => {
  it("arranca el juego con estado menuAbierto verdadero", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.tenesMenuAbierto()).toBe(true);
  });
});

describe("Pruebas unitarias del AT 20 - Jugar partida con palabra aleatoria", () => {
  it("Un nuevo ahorcado sin parámetro inicia un juego válido con una de las palabras disponibles", () => {
    const juego = new Ahorcado();
    expect(juego.vidas()).toBe(6);
    expect(juego.palabraEnmascarada()).toMatch(/^[_A-Z ]+$/);
    expect(Ahorcado.palabrasDisponibles).toContain(juego.getPalabra());
  });
  it("Al iniciar un juego aleatorio menuAbierto pasa a false", () => {
    const juego = new Ahorcado();
    expect(juego.tenesMenuAbierto()).toBe(false);
  });
});

describe("Pruebas unitarias del AT 22 - Confirmar palabra personalizada", () => {
  it("cerrarMenu cambia el estado de menuAbierto a false", () => {
    const juego = new Ahorcado();
    juego.cerrarMenu();
    expect(juego.tenesMenuAbierto()).toBe(false);
  });
  it("Iniciar un juego por confirmar palabra personalizada deberia cerrar el menu", () => {
    const juego = new Ahorcado("GATO", true);
    expect(juego.tenesMenuAbierto()).toBe(false);
  });
});
