# language: es
Característica: Entrada inválida

  Escenario: El jugador ingresa un caracter no letra
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "1"
    Entonces se ve la palabra "_ _ _ _"
    Y se ven 6 vidas

  Escenario: El jugador juega después de perder
    Dado una partida con la palabra "GATO"
    Cuando el jugador falla todas las vidas
    Entonces se muestra el mensaje "Perdiste"
    Y se ven 0 vidas
