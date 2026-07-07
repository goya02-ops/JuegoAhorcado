import { Ahorcado } from "./domain/Ahorcado";
import { mountApp } from "./ui/main";

export function obtenerPalabra(search: string): string {
  const params = new URLSearchParams(search);
  return params.get("word") || "AHORCADO";
}

if (typeof document !== "undefined") {
  const palabra = obtenerPalabra(window.location.search);
  const juego = new Ahorcado(palabra);
  const app = document.getElementById("app");
  if (app) {
    mountApp(app, juego);
  }
}
