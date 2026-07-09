import { Ahorcado } from "../domain/Ahorcado";

const PARTES = ["cabeza", "torso", "brazo-izq", "brazo-der", "pierna-izq", "pierna-der"];

export function mountApp(container: HTMLElement, juego: Ahorcado): void {
  const wordEl = document.createElement("div");
  wordEl.setAttribute("data-testid", "word");

  const livesEl = document.createElement("div");
  livesEl.setAttribute("data-testid", "lives");

  const messageEl = document.createElement("div");
  messageEl.setAttribute("data-testid", "message");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.maxLength = 1;
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      juego.adivinar(input.value);
      input.value = "";
      render();
    }
  });

  const restartBtn = document.createElement("button");
  restartBtn.setAttribute("data-testid", "restart");
  restartBtn.textContent = "Jugar de Nuevo";
  restartBtn.addEventListener("click", () => {
    juego.reiniciar();
    render();
  });

  const hangmanContainer = document.createElement("div");
  hangmanContainer.style.cssText = "position:relative;width:200px;height:220px;margin:10px 0;";

  const base = document.createElement("div");
  base.style.cssText = "position:absolute;bottom:0;left:0;width:100%;height:4px;background:#333;";
  const poste = document.createElement("div");
  poste.style.cssText = "position:absolute;bottom:0;left:30px;width:4px;height:100%;background:#333;";
  const viga = document.createElement("div");
  viga.style.cssText = "position:absolute;top:0;left:30px;width:120px;height:4px;background:#333;";
  const cuerda = document.createElement("div");
  cuerda.style.cssText = "position:absolute;top:0;left:148px;width:4px;height:40px;background:#333;";

  const parteEstilos: Record<string, string> = {
    cabeza: "position:absolute;top:40px;left:133px;width:34px;height:34px;border-radius:50%;border:3px solid #333;box-sizing:border-box;",
    torso: "position:absolute;top:74px;left:148px;width:4px;height:60px;background:#333;",
    "brazo-izq": "position:absolute;top:85px;left:120px;width:28px;height:4px;background:#333;transform-origin:100% 50%;",
    "brazo-der": "position:absolute;top:85px;left:152px;width:28px;height:4px;background:#333;",
    "pierna-izq": "position:absolute;top:130px;left:122px;width:30px;height:4px;background:#333;transform:rotate(45deg);transform-origin:100% 50%;",
    "pierna-der": "position:absolute;top:130px;left:148px;width:30px;height:4px;background:#333;transform:rotate(-45deg);transform-origin:0% 50%;",
  };

  const parteEls: Record<string, HTMLElement> = {};
  for (const parte of PARTES) {
    const el = document.createElement("div");
    el.setAttribute("data-testid", parte);
    el.style.cssText = parteEstilos[parte] + "display:none;";
    parteEls[parte] = el;
    hangmanContainer.appendChild(el);
  }

  function render(): void {
    wordEl.textContent = juego.palabraEnmascarada();
    livesEl.textContent = String(juego.vidas());
    if (juego.estasGanado()) {
      messageEl.textContent = "Ganaste";
      input.disabled = true;
      restartBtn.style.display = "";
    } else if (juego.estasPerdido()) {
      messageEl.textContent = "Perdiste";
      input.disabled = true;
      restartBtn.style.display = "";
    } else {
      messageEl.textContent = juego.ultimoMensaje();
      input.disabled = false;
      restartBtn.style.display = "none";
    }
    const visibles = juego.partesVisibles();
    for (let i = 0; i < PARTES.length; i++) {
      parteEls[PARTES[i]].style.display = i < visibles ? "" : "none";
    }
  }

  render();
  container.appendChild(hangmanContainer);
  container.appendChild(wordEl);
  container.appendChild(livesEl);
  container.appendChild(messageEl);
  container.appendChild(input);
  container.appendChild(restartBtn);
}
