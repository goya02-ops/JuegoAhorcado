import { Ahorcado } from "../domain/Ahorcado";
import "./styles.css";

const PARTES = [
  "cabeza",
  "torso",
  "brazo-izq",
  "brazo-der",
  "pierna-izq",
  "pierna-der",
];

const GALOWS_CLASSES = [
  "hangman__gallows hangman__gallows--base",
  "hangman__gallows hangman__gallows--post",
  "hangman__gallows hangman__gallows--beam",
  "hangman__gallows hangman__gallows--rope",
];

function createHangman(): {
  container: HTMLElement;
  parteEls: Record<string, HTMLElement>;
} {
  const container = document.createElement("div");
  container.className = "hangman";

  for (const cls of GALOWS_CLASSES) {
    const el = document.createElement("div");
    el.className = cls;
    container.appendChild(el);
  }

  const parteEls: Record<string, HTMLElement> = {};
  for (const parte of PARTES) {
    const el = document.createElement("div");
    el.dataset.testid = parte;
    el.className = `hangman__part hangman__part--${parte}`;
    el.style.display = "none";
    parteEls[parte] = el;
    container.appendChild(el);
  }

  return { container, parteEls };
}

export function mountApp(
  container: HTMLElement,
  juego: Ahorcado,
  opciones: { mostrarMenu: boolean } = { mostrarMenu: true },
): void {
  const appEl = document.createElement("div");
  appEl.className = "game";

  const header = document.createElement("h1");
  header.className = "header";
  header.textContent = "AHORCADO";
  appEl.appendChild(header);

  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const menu = document.createElement("div");
  menu.className = "menu";
  menu.dataset.testid = "menu-inicio";

  const titulo = document.createElement("h2");
  titulo.className = "menu__title";
  titulo.textContent = "AHORCADO";
  menu.appendChild(titulo);

  const subtitulo = document.createElement("p");
  subtitulo.className = "menu__subtitle";
  subtitulo.textContent = "¿Cómo querés jugar?";
  menu.appendChild(subtitulo);

  const btnRandom = document.createElement("button");
  btnRandom.className = "btn btn--primary";
  btnRandom.textContent = "Jugar Aleatoria";
  btnRandom.addEventListener("click", () => {
    juego = new Ahorcado();
    render();
  });
  menu.appendChild(btnRandom);

  const btnCustom = document.createElement("button");
  btnCustom.className = "btn btn--secondary";
  btnCustom.textContent = "Jugar Personalizada";
  btnCustom.addEventListener("click", () => {
    btnRandom.style.display = "none";
    btnCustom.style.display = "none";
    subtitulo.style.display = "none";

    const customInput = document.createElement("input");
    customInput.setAttribute("type", "text");
    customInput.dataset.testid = "custom-word-input";
    customInput.className = "input";
    customInput.placeholder = "Escribí tu palabra";
    customInput.addEventListener("input", () => {
      const limpio = customInput.value
        .toUpperCase()
        .replace(/[^A-ZÑÁÉÍÓÚ]/g, "");
      if (limpio !== customInput.value) {
        const pos = customInput.selectionStart;
        const removidos = customInput.value.length - limpio.length;
        customInput.value = limpio;
        if (pos !== null) {
          customInput.setSelectionRange(Math.max(0, pos - removidos), Math.max(0, pos - removidos));
        }
      }
    });

    const customBtn = document.createElement("button");
    customBtn.dataset.testid = "custom-word-btn";
    customBtn.className = "btn btn--primary";
    customBtn.textContent = "Jugar";

    customBtn.addEventListener("click", () => {
      juego = new Ahorcado(customInput.value, true);
      render();
    });

    menu.appendChild(customInput);
    menu.appendChild(customBtn);
  });

  menu.appendChild(btnCustom);
  overlay.appendChild(menu);
  document.body.appendChild(overlay);

  if (!opciones.mostrarMenu) {
    // Esto es para que pasen los acceptance test anteriores al 19.
    overlay.style.display = "none";
  }

  const columns = document.createElement("div");
  columns.className = "columns";

  const leftCol = document.createElement("div");
  leftCol.className = "col col--left";

  const livesEl = document.createElement("div");
  livesEl.className = "lives";
  livesEl.dataset.testid = "lives";
  leftCol.appendChild(livesEl);

  const { container: hangmanContainer, parteEls } = createHangman();
  leftCol.appendChild(hangmanContainer);

  const wordEl = document.createElement("div");
  wordEl.className = "word";
  wordEl.dataset.testid = "word";
  leftCol.appendChild(wordEl);

  const messageEl = document.createElement("div");
  messageEl.className = "message";
  messageEl.dataset.testid = "message";
  leftCol.appendChild(messageEl);

  columns.appendChild(leftCol);

  const rightCol = document.createElement("div");
  rightCol.className = "col col--right";

  const letterRow = document.createElement("div");
  letterRow.className = "input-row";

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.dataset.testid = "letter-input";
  input.className = "input letter-input";
  input.maxLength = 1;
  input.placeholder = "A";
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      juego.adivinar(input.value);
      input.value = "";
      render();
    }
  });
  letterRow.appendChild(input);
  rightCol.appendChild(letterRow);

  const wordRow = document.createElement("div");
  wordRow.className = "input-row";

  const wordInput = document.createElement("input");
  wordInput.dataset.testid = "word-guess";
  wordInput.className = "input word-guess";
  wordInput.maxLength = 20;
  wordInput.placeholder = "Adivinar palabra";

  const guessBtn = document.createElement("button");
  guessBtn.dataset.testid = "guess-btn";
  guessBtn.className = "btn guess-btn";
  guessBtn.textContent = "Adivinar";

  const procesarPalabra = (): void => {
    juego.adivinarPalabra(wordInput.value);
    wordInput.value = "";
    render();
  };

  wordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") procesarPalabra();
  });

  guessBtn.addEventListener("click", procesarPalabra);

  wordRow.appendChild(wordInput);
  wordRow.appendChild(guessBtn);
  rightCol.appendChild(wordRow);

  const restartBtn = document.createElement("button");
  restartBtn.dataset.testid = "restart";
  restartBtn.className = "btn restart-btn";
  restartBtn.textContent = "Jugar de Nuevo";
  restartBtn.addEventListener("click", () => {
    juego.reiniciar();
    render();
  });
  rightCol.appendChild(restartBtn);

  columns.appendChild(rightCol);
  appEl.appendChild(columns);

  function render(): void {
    wordEl.textContent = juego.palabraEnmascarada();
    livesEl.textContent = String(juego.vidas());

    messageEl.className = "message";
    restartBtn.style.display = "none";

    if (juego.estasGanado()) {
      messageEl.textContent = "Ganaste";
      messageEl.classList.add("message--success");
      input.disabled = true;
      wordInput.disabled = true;
      restartBtn.style.display = "";
    } else if (juego.estasPerdido()) {
      messageEl.textContent = "Perdiste";
      messageEl.classList.add("message--error");
      input.disabled = true;
      wordInput.disabled = true;
      restartBtn.style.display = "";
    } else if (!juego.tenesMenuAbierto()) {
      overlay.style.display = "none";
      input.disabled = false;
      wordInput.disabled = false;
    } else {
      messageEl.textContent = juego.ultimoMensaje();
      input.disabled = false;
      wordInput.disabled = false;
    }

    const visibles = juego.partesVisibles();
    for (let i = 0; i < PARTES.length; i++) {
      parteEls[PARTES[i]].style.display = i < visibles ? "" : "none";
    }
  }

  render();
  container.appendChild(appEl);
}
// e
