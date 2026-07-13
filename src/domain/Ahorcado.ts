export class Ahorcado {
  private readonly palabra!: string;
  private vidasRestantes: number = 6;
  private letrasAcertadas: Set<string> = new Set();
  private letrasIntentadas: Set<string> = new Set();
  private ultimoMensajeStr: string = "";
  private menuAbierto: boolean = true;

  static readonly palabrasDisponibles: string[] = [
    "AGIL",
    "CAMBIOS",
    "PROYECTO",
    "SPRINT",
    "DAILY",
    "ADAPTACION",
    "KANBAN",
    "SCRUM",
    "LEAN",
    "PLANNING",
  ];

  constructor(palabra?: string) {
    if (palabra) {
      this.palabra = palabra.toUpperCase();
    } else {
      // Nota: No es tan escalable porque solo esta pensado para 10 palabras. No se puede delegar en un metodo de instancia porque palabra, que es readonly, es solo accesible desde el constructor.
      const numeroAleatorio = Math.floor(Math.random() * 10); // Numero aleatorio entre 0 y 9
      this.palabra = Ahorcado.palabrasDisponibles[numeroAleatorio];
      this.menuAbierto = false;
    }
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
    if (this.estaTerminado()) {
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

  estaTerminado(): boolean {
    return this.estasGanado() || this.estasPerdido();
  }

  reiniciar(): void {
    this.vidasRestantes = 6;
    this.letrasAcertadas = new Set();
    this.letrasIntentadas = new Set();
    this.ultimoMensajeStr = "";
  }

  partesVisibles(): number {
    return 6 - this.vidasRestantes;
  }

  adivinarPalabra(palabra: string): void {
    if (this.estaTerminado()) return;

    if (palabra.length <= 1) return;
    this.ultimoMensajeStr = "";

    const palabraUpper = palabra.toUpperCase().trim();

    if (palabraUpper === this.palabra) {
      for (const letra of this.palabra) {
        this.letrasAcertadas.add(letra);
      }
    } else {
      this.vidasRestantes = 0;
    }
  }
  tenesMenuAbierto(): boolean {
    return this.menuAbierto;
  }
  getPalabra(): string {
    return this.palabra;
  }
}
