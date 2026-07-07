# language: es
Característica: Una letra por turno

  Escenario: El jugador solo puede escribir una letra a la vez
    Dado una partida con la palabra "GATO"
    Cuando el jugador escribe varias letras
    Entonces solo hay una letra escrita
