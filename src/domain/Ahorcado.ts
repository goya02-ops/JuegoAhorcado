export class Ahorcado {
  private readonly palabra: string;
  private vidasRestantes: number = 6;
  private letrasAcertadas: Set<string> = new Set();

  constructor(palabra: string) {
    this.palabra = palabra.toUpperCase();
  }

  palabraEnmascarada(): string {
    return this.palabra
      .split("")
      .map((letra) => (this.letrasAcertadas.has(letra) ? letra : "_"))
      .join(" ");
  }

  adivinar(letra: string): void {
    const letraUpper = letra.toUpperCase();
    if (letraUpper.length !== 1) return;
    if (!/^[A-Z]$/.test(letraUpper)) return;
    if (this.estaTerminado()) return;
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

  estaPerdido(): boolean {
    return this.vidasRestantes === 0;
  }

  estaTerminado(): boolean {
    return this.estasGanado() || this.estaPerdido();
  }
}
