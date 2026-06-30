# language: es
Característica: Letra repetida

  Escenario: El jugador intenta adivinar una letra ya introducida (acertada)
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "A"
    Y el jugador adivina la letra "A"
    Entonces se ve la palabra "_ A _ _"
    Y se ven 6 vidas
    Y se muestra el mensaje "Letra ya intentada"

  Escenario: El jugador intenta adivinar una letra ya introducida (fallada)
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "E"
    Y el jugador adivina la letra "E"
    Entonces se ve la palabra "_ _ _ _"
    Y se ven 5 vidas
    Y se muestra el mensaje "Letra ya intentada"
