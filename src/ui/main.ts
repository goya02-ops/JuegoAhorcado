import { Ahorcado } from "../domain/Ahorcado";

export function mountApp(container: HTMLElement, juego: Ahorcado): void {
  const wordEl = document.createElement("div");
  wordEl.setAttribute("data-testid", "word");
  wordEl.textContent = juego.palabraEnmascarada();

  const livesEl = document.createElement("div");
  livesEl.setAttribute("data-testid", "lives");
  livesEl.textContent = String(juego.vidas());

  container.appendChild(wordEl);
  container.appendChild(livesEl);
}
