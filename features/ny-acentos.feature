# language: es
Característica: Ñ y acentos

  Escenario: Adivinar con letra acentuada revela la letra sin acento
    Dado una partida con la palabra "CASA"
    Cuando el jugador adivina la letra "Á"
    Entonces se ve la palabra "_ A _ A"

  Escenario: La letra Ñ es válida en el juego
    Dado una partida con la palabra "ESPAÑOL"
    Cuando el jugador adivina la letra "Ñ"
    Entonces se ve la palabra "_ _ _ Ñ _ _ _"

  Escenario: Palabra con acentos se normaliza internamente
    Dado una partida con la palabra "CORAZÓN"
    Cuando el jugador adivina la letra "O"
    Entonces se ve la palabra "O _ _ _ _ O _"
