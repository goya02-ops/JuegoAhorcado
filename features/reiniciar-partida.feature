# language: es
Característica: Reiniciar partida

  Escenario: Reiniciar después de ganar
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina todas las letras
    Entonces se muestra el botón "Jugar de Nuevo"
    Cuando el jugador hace clic en "Jugar de Nuevo"
    Entonces se ve la palabra "_ _ _ _"
    Y se ven 6 vidas
    Y no se muestra ningún mensaje

  Escenario: Reiniciar después de perder
    Dado una partida con la palabra "GATO"
    Cuando el jugador falla todas las vidas
    Entonces se muestra el botón "Jugar de Nuevo"
    Cuando el jugador hace clic en "Jugar de Nuevo"
    Entonces se ve la palabra "_ _ _ _"
    Y se ven 6 vidas
    Y no se muestra ningún mensaje
