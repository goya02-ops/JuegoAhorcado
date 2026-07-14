const ACENTOS: Record<string, string> = { Á: "A", É: "E", Í: "I", Ó: "O", Ú: "U" };

function normalizar(texto: string): string {
  return texto
    .toUpperCase()
    .replace(/[ÁÉÍÓÚ]/gu, (c) => ACENTOS[c])
    .replace(/[^A-ZÑ]/gu, "");
}

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

  constructor(palabra?: string, esPalabraPersonalizada?: boolean) {
    if (palabra) {
      this.palabra = normalizar(palabra);
      if (esPalabraPersonalizada) this.cerrarMenu();
    } else {
      const numeroAleatorio = Math.floor(Math.random() * 10);
      this.palabra = Ahorcado.palabrasDisponibles[numeroAleatorio];
      this.cerrarMenu();
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
    const letraNormalizada = normalizar(letra);
    if (letraNormalizada.length !== 1) return;
    if (!/^[A-ZÑ]$/.test(letraNormalizada)) return;
    if (this.estaTerminado()) {
      return;
    }
    if (this.letrasIntentadas.has(letraNormalizada)) {
      this.ultimoMensajeStr = "Letra ya intentada";
      return;
    }
    this.letrasIntentadas.add(letraNormalizada);
    this.ultimoMensajeStr = "";
    if (this.palabra.includes(letraNormalizada)) {
      this.letrasAcertadas.add(letraNormalizada);
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

    const palabraNormalizada = normalizar(palabra.trim());

    if (palabraNormalizada === this.palabra) {
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
  cerrarMenu(): void {
    this.menuAbierto = false;
  }
}
