// El canon del cangrejo → hyperpop. Bach, Ofrenda Musical, BWV 1079.
// La melodía no cambia. Lo que cambia es tempo, timbre, ritmo, textura.
// Se enciende por pasos, en orden.

setcps(0.6)   // 0.3 era el tempo de Bach; esto es el doble

const frase = seq(
  "c4 eb4", "g4 ab4", "b3@2 ~ g4", "g4 f#4@2 f4",
  "f4 e4@2 eb4", "eb4 d4 db4 c4", "b3 g3 c4 f4", "eb4 d4"
)   // primeros 8 compases

// 1 · voz A — supersaw, una octava arriba, filtro barriendo
$: note(frase.slow(8))
  .add(note(12))
  .s("supersaw").unison(7).spread(.8).detune(.3)
  .lpf(sine.range(700, 7000).slow(8)).lpq(6)
  .attack(.01).release(.15)
  .gain(.55).pan(.35)
  .room(.35).roomsize(3)

// 2 · voz B — el cangrejo, dos octavas arriba, caja de música
$: note(frase.rev().slow(8))
  .add(note(24))
  .s("gm_music_box")
  .gain(.5).pan(.65)
  .delay(.4).delaytime(.1875).delayfeedback(.55)
  .room(.5).roomsize(4)

// 3 · dembow — caja en pasos 4 y 7 de 8, coincide con tresillo (3,8)
$: s("bd*4, ~ ~ ~ sd ~ ~ sd ~")
  .bank('RolandTR909')
  .gain("1 .8 .9 .8")
  .shape(.3)

// 4 · hats — ply varía repeticiones ciclo a ciclo
$: s("hh*8").bank('RolandTR909')
  .ply("<1 1 2 4>")
  .gain(".5 .3".fast(4))
  .pan(rand.range(.3, .7))
  .hpf(4000)

// 5 · bajo — misma frase, dos octavas abajo, una nota por compás
$: note(frase.slow(8)).segment(1)
  .sub(note(24))
  .s("sawtooth")
  .lpf(400).lpq(10)
  .attack(.01).decay(.2).sustain(.4).release(.1)
  .gain(.8)
  .distort("1.4:.3")

// 6 · pad — tríada menor sobre cada nota (no diatónica: suena a vaporwave
// a propósito). Para quedarte en do menor, usa acordes fijos en su lugar:
//   note("<[c3,eb3,g3] [ab2,c3,eb3] [f2,ab2,c3] [g2,b2,d3]>")
$: note(frase.slow(8)).segment(2)
  .add(note("0,3,7"))
  .s("supersaw").unison(5).spread(1).detune(.4)
  .lpf(2500)
  .attack(.4).release(.6)
  .gain(.3)
  .room(.7).roomsize(6)

// 7 · rompe — la melodía se desarma. Enciende y apaga en vivo.
$: note(frase.rev().slow(8))
  .add(note(12))
  .s("supersaw").unison(3)
  .chop(4)
  .sometimesBy(.4, x => x.speed(2))
  .degradeBy(.5)
  .crush(5)
  .hpf(800)
  .gain(.35)
  .delay(.5).delaytime(.125).delayfeedback(.7)

// Ruta sugerida: tempo → timbre → dembow + hats → bajo + pad →
// filtro barriendo → paso 7 unos ciclos → vuelve solo a voces A y B.
// Los niveles de ganancia y filtro son punto de partida, no mezcla
// terminada: ajústalos al oído.
