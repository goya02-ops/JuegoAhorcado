import { Ahorcado } from '../domain/Ahorcado';
import './styles.css';

const PARTES = [
  'cabeza',
  'torso',
  'brazo-izq',
  'brazo-der',
  'pierna-izq',
  'pierna-der',
];

const GALOWS_CLASSES = [
  'hangman__gallows hangman__gallows--base',
  'hangman__gallows hangman__gallows--post',
  'hangman__gallows hangman__gallows--beam',
  'hangman__gallows hangman__gallows--rope',
];

function createHangman(): {
  container: HTMLElement;
  parteEls: Record<string, HTMLElement>;
} {
  const container = document.createElement('div');
  container.className = 'hangman';

  for (const cls of GALOWS_CLASSES) {
    const el = document.createElement('div');
    el.className = cls;
    container.appendChild(el);
  }

  const parteEls: Record<string, HTMLElement> = {};
  for (const parte of PARTES) {
    const el = document.createElement('div');
    el.setAttribute('data-testid', parte);
    el.className = `hangman__part hangman__part--${parte}`;
    el.style.display = 'none';
    parteEls[parte] = el;
    container.appendChild(el);
  }

  return { container, parteEls };
}

export function mountApp(container: HTMLElement, juego: Ahorcado): void {
  const appEl = document.createElement('div');
  appEl.className = 'game';

  const header = document.createElement('h1');
  header.className = 'header';
  header.textContent = 'AHORCADO';
  appEl.appendChild(header);

  const columns = document.createElement('div');
  columns.className = 'columns';

  const leftCol = document.createElement('div');
  leftCol.className = 'col col--left';

  const livesEl = document.createElement('div');
  livesEl.className = 'lives';
  livesEl.setAttribute('data-testid', 'lives');
  leftCol.appendChild(livesEl);

  const { container: hangmanContainer, parteEls } = createHangman();
  leftCol.appendChild(hangmanContainer);

  const wordEl = document.createElement('div');
  wordEl.className = 'word';
  wordEl.setAttribute('data-testid', 'word');
  leftCol.appendChild(wordEl);

  const messageEl = document.createElement('div');
  messageEl.className = 'message';
  messageEl.setAttribute('data-testid', 'message');
  leftCol.appendChild(messageEl);

  columns.appendChild(leftCol);

  const rightCol = document.createElement('div');
  rightCol.className = 'col col--right';

  const letterRow = document.createElement('div');
  letterRow.className = 'input-row';

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('data-testid', 'letter-input');
  input.className = 'input letter-input';
  input.maxLength = 1;
  input.placeholder = 'A';
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      juego.adivinar(input.value);
      input.value = '';
      render();
    }
  });
  letterRow.appendChild(input);
  rightCol.appendChild(letterRow);

  const wordRow = document.createElement('div');
  wordRow.className = 'input-row';

  const wordInput = document.createElement('input');
  wordInput.setAttribute('data-testid', 'word-guess');
  wordInput.className = 'input word-guess';
  wordInput.maxLength = 20;
  wordInput.placeholder = 'Adivinar palabra';

  const guessBtn = document.createElement('button');
  guessBtn.setAttribute('data-testid', 'guess-btn');
  guessBtn.className = 'btn guess-btn';
  guessBtn.textContent = 'Adivinar';

  const procesarPalabra = (): void => {
    juego.adivinarPalabra(wordInput.value);
    wordInput.value = '';
    render();
  };

  wordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') procesarPalabra();
  });

  guessBtn.addEventListener('click', procesarPalabra);

  wordRow.appendChild(wordInput);
  wordRow.appendChild(guessBtn);
  rightCol.appendChild(wordRow);

  const restartBtn = document.createElement('button');
  restartBtn.setAttribute('data-testid', 'restart');
  restartBtn.className = 'btn restart-btn';
  restartBtn.textContent = 'Jugar de Nuevo';
  restartBtn.addEventListener('click', () => {
    juego.reiniciar();
    render();
  });
  rightCol.appendChild(restartBtn);

  columns.appendChild(rightCol);
  appEl.appendChild(columns);

  function render(): void {
    wordEl.textContent = juego.palabraEnmascarada();
    livesEl.textContent = String(juego.vidas());

    messageEl.className = 'message';
    restartBtn.style.display = 'none';

    if (juego.estasGanado()) {
      messageEl.textContent = 'Ganaste';
      messageEl.classList.add('message--success');
      input.disabled = true;
      wordInput.disabled = true;
      restartBtn.style.display = '';
    } else if (juego.estasPerdido()) {
      messageEl.textContent = 'Perdiste';
      messageEl.classList.add('message--error');
      input.disabled = true;
      wordInput.disabled = true;
      restartBtn.style.display = '';
    } else {
      messageEl.textContent = juego.ultimoMensaje();
      input.disabled = false;
      wordInput.disabled = false;
    }

    const visibles = juego.partesVisibles();
    for (let i = 0; i < PARTES.length; i++) {
      parteEls[PARTES[i]].style.display = i < visibles ? '' : 'none';
    }
  }

  render();
  container.appendChild(appEl);
}
