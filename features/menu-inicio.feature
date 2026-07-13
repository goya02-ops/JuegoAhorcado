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
    
  Escenario: El jugador elige jugar con palabra personalizada
    Dado que el jugador abre el juego
    Cuando el jugador hace clic en el botón Jugar Personalizada
    Entonces se muestra un input para escribir la palabra
    Y un boton para confirmar

  Escenario: El jugador ingresa una palabra y empieza a jugar
    Dado que el jugador está en el formulario de palabra personalizada
    Cuando el jugador escribe "GATO" en el input de palabra personalizada
    Y el jugador confirma la palabra personalizada
    Entonces se ve la palabra "_ _ _ _"
    Y se ven 6 vidas
    Y el menú de inicio no es visible