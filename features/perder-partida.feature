# language: es
Característica: Perder partida

  Escenario: El jugador pierde la partida por agotar vidas
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "E"
    Y el jugador adivina la letra "I"
    Y el jugador adivina la letra "U"
    Y el jugador adivina la letra "C"
    Y el jugador adivina la letra "H"
    Y el jugador adivina la letra "B"
    Entonces se ve la palabra "G A T O"
    Y se ven 0 vidas
    Y se muestra el mensaje "Perdiste"
