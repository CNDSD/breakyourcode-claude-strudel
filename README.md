# Rompe el patrón
Mini-taller + mini-jam · CNDSD

1. [strudel.cc](https://strudel.cc)
2. este repo
3. Claude al lado

---

## 0 · Mini-notación, para leer el código

| Símbolo | Qué hace |
|---|---|
| `"a b c"` | secuencia — uno después del otro |
| `"a b c"*2` | repite todo el patrón 2 veces por ciclo |
| `"a*2"` | repite solo esa palabra, 2 veces |
| `"a@3 b"` | `a` dura 3 partes, `b` dura 1 |
| `"a ~ b"` | `~` es silencio |
| `"a(3,8)"` | ritmo euclidiano: 3 golpes repartidos en 8 pasos |
| `"a,b"` | dos patrones a la vez, en capas |
| `.rev()` | el patrón al revés |
| `.slow(n)` / `.fast(n)` | estira o encoge en el tiempo |
| `"[a b] c"` | `[ ]` agrupa — `a b` juntos ocupan lo que dura un solo paso |
| `"a b . c d e"` | `.` separa grupos dentro de la secuencia — aquí: 2 pasos y luego 3 |
| `"{a b, c d e}"` | `{ }` es polimetría — dos patrones de distinto largo, sonando a la par, cada uno a su propio paso |
| `.method()` | cualquier palabra después de un punto es una función que transforma el patrón de la izquierda — se pueden encadenar varias |
| `// texto` | comentario — Strudel lo ignora, es nota para quien lee |
| `s("bd sd hh cp")` | `s()` llama **samples** — sonidos grabados. `bd`/`sd`/`hh`/`cp` son de caja de ritmos (bombo, caja, hi-hat, palmada) |
| `note("c4 eb4").s("piano")` | `note()` da la nota; `.s("piano")` dice con qué timbre — aquí un sample melódico, no de batería |
| `.s("sawtooth")` / `.s("sine")` | synth, no sample — la onda se genera en vivo, no es un sonido grabado |

## 1 · Primer sonido

```js
$: s("bd sd")

$: s("bd sd, hh*8")

$: note("c4 eb4 g4 ab4").s("piano")
```

## 2 · Ritmos euclidianos . para mas ve a ritmos euclidianos en el sitio web de Tidal Cyles

Toussaint (2005): `(golpes, pasos)`.

```js
$: s("bd(3,8)")   // tresillo cubano
$: s("cp(2,5)")   // khafif-e-ramal, Persia S.XIII
$: s("hh(7,12)")  // Mpre, campana ashanti, Ghana
$: s("cp(7,16)")  // samba, Brasil
```

## 3 · El telar como Secuenciador

Un tejido ya es una partitura: hilos arriba y abajo, fila por fila.

```js
$: s("bd*16").struct("1 0 1 1 1 0 1 0 0 1 1 0 1 0 1 1")._punchcard()
```

## 4 · El canon del cangrejo — trata de escribirlo para familiarizarte con el código y su sintaxis

J. S. Bach, *Ofrenda Musical*, BWV 1079.

```js
$: note("c4 eb4 g4 ab4").s("piano")          // voz 1, al derecho
$: note("c4 eb4 g4 ab4").rev().s("piano")    // voz 2, al revés
```

## 5 · Primeros 4 compases

```js
const frase = seq("c4 eb4", "g4 ab4", "b3@2 ~ g4", "g4 f#4@2 f4")

$: note(frase.slow(4)).s("piano")
$: note(frase.rev().slow(4)).s("piano")
```

## 6 · Míralo — las dos voces en espejo

```js
const frase = seq("c4 eb4", "g4 ab4", "b3@2 ~ g4", "g4 f#4@2 f4")

$: stack(
  note(frase.slow(4)),
  note(frase.rev().slow(4))
).s("piano")._pianoroll()
```

## 7 · Llévalo lejos — con dembow

```js
const frase = seq("c4 eb4", "g4 ab4", "b3@2 ~ g4", "g4 f#4@2 f4")

$: note(frase.slow(4)).s("piano")
$: note(frase.rev().slow(4)).s("piano")
$: s("bd*4, ~ ~ ~ sd ~ ~ sd ~")   // bombo x4, caja en pasos 4 y 7 de 8
```

## 8 · Del canon al hyperpop ?

Ruta completa, capa por capa — ver [`ejemplos/8-canon-hyperpop.js`](ejemplos/8-canon-hyperpop.js).

## 9 · Tu turno

```js
.s("gm_music_box")   // cambia el sonido
.late(2)              // desfasa una voz
.add(note(12))        // sube una octava
```

---

Todos los archivos también están sueltos en [`ejemplos/`](ejemplos/), listos para copiar directo a strudel.cc.
