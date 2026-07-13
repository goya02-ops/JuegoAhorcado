# language: es
Característica: Menú de inicio

  Escenario: El menú aparece al cargar el juego
    Dado que el jugador abre el juego
    Entonces el menú de inicio es visible

  Escenario: El jugador elige jugar con palabra aleatoria
    Dado que el jugador abre el juego
    Cuando el jugador hace clic en el botón Jugar Aleatoria
    Entonces se ve una palabra enmascarada
    Y se ven 6 vidas
    Y el menú de inicio no es visible
    