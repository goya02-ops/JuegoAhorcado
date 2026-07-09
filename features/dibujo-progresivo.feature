# language: es
Característica: Dibujo progresivo del ahorcado

  Escenario: Sin fallos, ninguna parte es visible
    Dado una partida con la palabra "GATO"
    Entonces la parte "cabeza" no es visible

  Escenario: Primer fallo muestra la cabeza
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "E"
    Entonces la parte "cabeza" es visible
    Y la parte "torso" no es visible

  Escenario: Seis fallos muestran todas las partes
    Dado una partida con la palabra "GATO"
    Cuando el jugador falla todas las vidas
    Entonces la parte "cabeza" es visible
    Y la parte "torso" es visible
    Y la parte "brazo-izq" es visible
    Y la parte "brazo-der" es visible
    Y la parte "pierna-izq" es visible
    Y la parte "pierna-der" es visible
