// Las dos voces juntas, en espejo.

const frase = seq("c4 eb4", "g4 ab4", "b3@2 ~ g4", "g4 f#4@2 f4")

$: stack(
  note(frase.slow(4)),
  note(frase.rev().slow(4))
).s("piano")._pianoroll()

// Solo los primeros 4 compases de 18. Transcripción completa, pendiente.
