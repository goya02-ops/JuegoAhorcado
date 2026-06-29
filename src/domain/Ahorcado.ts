export class Ahorcado {
  private readonly palabra: string;
  private vidasRestantes: number = 6;
  private letrasAcertadas: Set<string> = new Set();
  private letrasIntentadas: Set<string> = new Set();
  private ultimoMensajeStr: string = "";

  constructor(palabra: string) {
    this.palabra = palabra.toUpperCase();
  }

  estasPerdido(): boolean {
    return this.vidasRestantes === 0;
  }

  ultimoMensaje(): string {
    return this.ultimoMensajeStr;
  }

  palabraEnmascarada(): string {
    if (this.estasPerdido()) {
      return this.palabra.split("").join(" ");
    }
    return this.palabra
      .split("")
      .map((letra) => (this.letrasAcertadas.has(letra) ? letra : "_"))
      .join(" ");
  }

  adivinar(letra: string): void {
    const letraUpper = letra.toUpperCase();
    if (letraUpper.length !== 1) return;
    if (!/^[A-Z]$/.test(letraUpper)) return;
    if (this.estasGanado() || this.estasPerdido()) {
      return;
    }
    if (this.letrasIntentadas.has(letraUpper)) {
      this.ultimoMensajeStr = "Letra ya intentada";
      return;
    }
    this.letrasIntentadas.add(letraUpper);
    this.ultimoMensajeStr = "";
    if (this.palabra.includes(letraUpper)) {
      this.letrasAcertadas.add(letraUpper);
    } else {
      this.vidasRestantes--;
    }
  }

  vidas(): number {
    return this.vidasRestantes;
  }

  estasGanado(): boolean {
    return this.palabra
      .split("")
      .every((letra) => this.letrasAcertadas.has(letra));
  }
}
