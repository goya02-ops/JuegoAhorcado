# language: es
Característica: Caracteres no válidos en palabra personalizada
  Como jugador
  Quiero que los números y símbolos sean eliminados al crear una palabra personalizada
  Para que la partida solo tenga letras válidas

  Escenario: El jugador ingresa una palabra con números
    Dado que el jugador está en el formulario de palabra personalizada
    Cuando el jugador escribe "C4S4" en el input de palabra personalizada
    Y el jugador confirma la palabra personalizada
    Entonces se ve la palabra "_ _"

  Escenario: El jugador ingresa una palabra con símbolos
    Dado que el jugador está en el formulario de palabra personalizada
    Cuando el jugador escribe "HO-LA!" en el input de palabra personalizada
    Y el jugador confirma la palabra personalizada
    Entonces se ve la palabra "_ _ _ _"
