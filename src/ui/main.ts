import { Ahorcado } from "../domain/Ahorcado";

export function mountApp(container: HTMLElement, juego: Ahorcado): void {
  const wordEl = document.createElement("div");
  wordEl.setAttribute("data-testid", "word");

  const livesEl = document.createElement("div");
  livesEl.setAttribute("data-testid", "lives");

  const messageEl = document.createElement("div");
  messageEl.setAttribute("data-testid", "message");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      juego.adivinar(input.value);
      input.value = "";
      render();
    }
  });

  function render(): void {
    wordEl.textContent = juego.palabraEnmascarada();
    livesEl.textContent = String(juego.vidas());
    if (juego.estasGanado()) {
      messageEl.textContent = "Ganaste";
      input.disabled = true;
    } else if (juego.estaPerdido()) {
      messageEl.textContent = "Perdiste";
      input.disabled = true;
    }
  }

  render();
  container.appendChild(wordEl);
  container.appendChild(livesEl);
  container.appendChild(messageEl);
  container.appendChild(input);
}
