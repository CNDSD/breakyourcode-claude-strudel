// El canon con dembow debajo. La capa IDM encima la escribes tú.

const frase = seq("c4 eb4", "g4 ab4", "b3@2 ~ g4", "g4 f#4@2 f4")

$: note(frase.slow(4)).s("piano")
$: note(frase.rev().slow(4)).s("piano")
$: s("bd*4, ~ ~ ~ sd ~ ~ sd ~")   // bombo x4, caja en pasos 4 y 7 de 8

// Caja del dembow = 2º y 3er golpe del tresillo (3,8).
