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

  vidas(): number {
    return this.vidasRestantes;
  }
}
