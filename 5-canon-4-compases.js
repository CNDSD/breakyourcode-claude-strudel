// El canon del cangrejo, primeros 4 compases.
// Compás 3: se completó con un silencio (~). Pieza completa: 18 compases.

const frase = seq("c4 eb4", "g4 ab4", "b3@2 ~ g4", "g4 f#4@2 f4")

$: note(frase.slow(4)).s("piano")
$: note(frase.rev().slow(4)).s("piano")
