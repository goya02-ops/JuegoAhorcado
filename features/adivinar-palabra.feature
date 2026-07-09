# language: es
Característica: Adivinar palabra completa

  Escenario: El jugador adivina la palabra completa correctamente
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la palabra "GATO"
    Entonces se ve la palabra "G A T O"
    Y se muestra el mensaje "Ganaste"

  Escenario: El jugador adivina la palabra completa incorrectamente
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la palabra "PERRO"
    Entonces se ven 0 vidas
    Y se muestra el mensaje "Perdiste"

  Escenario: El jugador adivina la palabra combinando letras y palabra completa
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "A"
    Y el jugador adivina la palabra "GATO"
    Entonces se ve la palabra "G A T O"
    Y se muestra el mensaje "Ganaste"
