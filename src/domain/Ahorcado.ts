export class Ahorcado {
  private readonly palabra: string;
  private vidasRestantes: number = 6;
  private letrasAcertadas: Set<string> = new Set();

  constructor(palabra: string) {
    this.palabra = palabra.toUpperCase();
  }

  estasPerdido(): boolean {
    return this.vidasRestantes === 0;
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
    if (this.estasGanado() || this.estasPerdido()) {
      return;
    }
    const letraUpper = letra.toUpperCase();
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
