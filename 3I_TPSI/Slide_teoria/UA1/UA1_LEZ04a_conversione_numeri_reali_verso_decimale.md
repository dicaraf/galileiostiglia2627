---
marp: true
theme: default
paginate: true
header: 'TPSI · Classe 3ª Informatica · UA1 – Lezione 4a'
footer: 'Conversione di numeri reali in basi differenti'
size: 16:9
style: |
  section {
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 28px;
    background: #ffffff;
    color: #1f2937;
  }
  h1 { color: #0b5cad; }
  h2 { color: #0b5cad; }
  strong { color: #c2410c; }
  table { font-size: 24px; margin: auto; }
  th { background: #0b5cad; color: white; }
  code { background: #eef2f7; color: #0b3d75; }
  pre { font-size: 22px; }
  section.title { text-align: center; justify-content: center; background: #0b3d75; color: white; }
  section.title h1, section.title h2 { color: white; }
  section.title strong { color: #fbbf24; }
  section.section-break { background: #0b5cad; color: white; justify-content: center; text-align: center; }
  section.section-break h1 { color: white; font-size: 56px; }
  section.small { font-size: 22px; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  .box { background: #eef6ff; border-left: 8px solid #0b5cad; padding: 0.5rem 1rem; border-radius: 6px; }
  .warn { background: #fff4e5; border-left: 8px solid #f59e0b; padding: 0.5rem 1rem; border-radius: 6px; }
---

<!-- _class: title -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Conversione di numeri reali in basi differenti

## Unità di Apprendimento 1 · Lezione 4 (parte A)
### La rappresentazione delle informazioni

Tecnologie e Progettazione di Sistemi Informatici e di Telecomunicazioni (TPSI)
Classe 3ª – Istituto Tecnico Informatico

---

## In questa lezione impareremo

1. La conversione da base **2, 8, 16** a base **10** di numeri **reali**
2. La conversione da base **10** a base **2, 8, 16** di numeri **interi** *(lezione 4b)*
3. La conversione da base **10** a base **2, 8, 16** di numeri **reali** *(lezione 4b)*

> Oggi: **da una base qualsiasi al decimale**, ora anche con la **parte dopo la virgola**.

**Ripasso lampo:** numero intero = solo parte prima della virgola · numero **reale** = parte intera + parte **frazionaria** (es. `10.101₂`).

---

## Introduzione: il bit e la sua posizione

Il sistema binario (base 2) usa due simboli (cifre) **0 e 1**, chiamati **bit** (*binary digit*).

Per rappresentare valori diversi da 0 e 1 si usa una **configurazione binaria** (più cifre). I bit "estremi" sono:

- il bit più a **destra** → **LSB** (*Least Significant Bit*), bit **meno** significativo
- il bit più a **sinistra** → **MSB** (*Most Significant Bit*), bit **più** significativo

```text
  MSB                LSB
   ↓                  ↓
   0  1  1  1  0  1        (= 29₁₀)
```

**Esempio:** in `011101` cambiare l'LSB dà `011100` (28, cambia poco); cambiare l'MSB dà `111101` (61, cambia molto).

---

## Da qualsiasi base al decimale: una somma

Nei sistemi posizionali, data una cifra in **una qualunque base**, si ricava **direttamente** il suo valore decimale con una semplice **addizione**.

**Esempio: 01001010₂**

```text
   0    1    0    0    1    0    1    0
  2⁷   2⁶   2⁵   2⁴   2³   2²   2¹   2⁰
       ↑              ↑         ↑
      64      +       8    +    2      = 74₁₀
```

Si sommano **solo i pesi delle cifre diverse da zero**:
2⁶ + 2³ + 2¹ = 64 + 8 + 2 = **74₁₀**

---

## Estensione ai numeri reali

Nella **parte frazionaria** (dopo la virgola) gli esponenti diventano **negativi**:

```text
   cifre:      1    0    1  .  0    1    1
   esponenti:  2    1    0    -1   -2   -3
   pesi:       4    2    1    1/2  1/4  1/8
                            (0,5) (0,25) (0,125)
```

**Regola generale**
- a sinistra della virgola: posizioni 0, 1, 2, … (esponenti **positivi**)
- a destra della virgola: posizioni −1, −2, −3, … (esponenti **negativi**)

**N = … + c₂·b² + c₁·b¹ + c₀·b⁰ + c₋₁·b⁻¹ + c₋₂·b⁻² + …**

<div class="warn">Il punto (o la virgola) separa la parte intera dalla parte frazionaria: <b>l'esponente −1 è la prima cifra dopo la virgola</b>.</div>

---

<!-- _class: section-break -->

# 1. Da binario reale a decimale

---

## Binario → decimale: esempio 1

Convertiamo il numero binario **1101.000₂**, scrivendolo sotto forma di somma di termini:

`1101.000₂ = 1·2³ + 1·2² + 0·2¹ + 1·2⁰ + 0·2⁻¹ + 0·2⁻² + 0·2⁻³`
`= 8 + 4 + 0 + 1 + 0 + 0 + 0 = 13₁₀`

| | | | | | | | |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **moltiplicatore** | 1 | 1 | 0 | 1 | 0 | 0 | 0 |
| **posizione** | 4 | 3 | 2 | 1 | −1 | −2 | −3 |
| **potenza/peso** | 2³ | 2² | 2¹ | 2⁰ | 2⁻¹ | 2⁻² | 2⁻³ |
| **valore del peso** | 8 | 4 | 2 | 1 | 0,5 | 0,25 | 0,125 |
| **addendi** | 8 | 4 | 0 | 1 | 0 | 0 | 0 |

**Risultato: 1101.000₂ = 13₁₀** *(una parte frazionaria tutta a 0 non cambia il valore)*

---

## Binario → decimale: esempio 2

Convertiamo il numero binario **10.101₂**:

`10.101₂ = 1·2¹ + 0·2⁰ + 1·2⁻¹ + 0·2⁻² + 1·2⁻³ = 2 + 0 + 1/2 + 0 + 1/8`
`= 2 + 0,5 + 0,125 = 2,625₁₀`

| | | | | | |
|---|:---:|:---:|:---:|:---:|:---:|
| **moltiplicatore** | 1 | 0 | 1 | 0 | 1 |
| **posizione** | 2 | 1 | −1 | −2 | −3 |
| **potenza/peso** | 2¹ | 2⁰ | 2⁻¹ | 2⁻² | 2⁻³ |
| **valore del peso** | 2 | 1 | 1/2 = 0,5 | 1/4 = 0,25 | 1/8 = 0,125 |
| **addendi** | 2 | 0 | 0,5 | 0 | 0,125 |

**Risultato: 10.101₂ = 2,625₁₀**

---

## Pesi utili da memorizzare

<div class="cols">
<div>

### Potenze positive di 2

| 2ⁿ | Valore |
|:---:|:---:|
| 2⁰ | 1 |
| 2¹ | 2 |
| 2² | 4 |
| 2³ | 8 |
| 2⁴ | 16 |

</div>
<div>

### Potenze negative di 2

| 2⁻ⁿ | Valore |
|:---:|:---:|
| 2⁻¹ | 0,5 |
| 2⁻² | 0,25 |
| 2⁻³ | 0,125 |
| 2⁻⁴ | 0,0625 |
| 2⁻⁵ | 0,03125 |

</div>
</div>

Ogni volta che si va **a destra**, il peso **si dimezza**.

---

## Metti alla prova: da binario a decimale

Converti in decimale i seguenti numeri espressi in binario:

| | | | |
|---|---|---|---|
| a. `1111₂` | b. `10011010₂` | c. `11110011₂` | |
| d. `10.11₂` | e. `101.001₂` | f. `1011.011₂` | |

<div class="box">

**Soluzioni:** a. **15** · b. **154** · c. **243** · d. **2,75** · e. **5,125** · f. **11,375**

*Esempio svolto (d):* 10.11₂ = 2 + 0 + 0,5 + 0,25 = 2,75

</div>

---

<!-- _class: section-break -->

# 2. Da ottale reale a decimale

---

## Ottale → decimale: esempio 1

La stringa **5712.4₈** si scrive come somma di cinque termini:

`5712.4₈ = 5·8³ + 7·8² + 1·8¹ + 2·8⁰ + 4·8⁻¹`
`= 5·512 + 7·64 + 1·8 + 2·1 + 4·(1/8) = 2560 + 448 + 8 + 2 + 0,5 = 3018,5₁₀`

| | | | | | |
|---|:---:|:---:|:---:|:---:|:---:|
| **moltiplicatore** | 5 | 7 | 1 | 2 | 4 |
| **posizione** | 4 | 3 | 2 | 1 | −1 |
| **potenza/peso** | 8³ | 8² | 8¹ | 8⁰ | 8⁻¹ |
| **valore del peso** | 512 | 64 | 8 | 1 | 1/8 = 0,125 |
| **addendi** | 2560 | 448 | 8 | 2 | 0,5 |

**Risultato: 5712.4₈ = 3018,5₁₀**

---

## Ottale → decimale: esempio 2

La stringa **1531.24₈** si scrive come somma di sei termini:

`1531.24₈ = 1·8³ + 5·8² + 3·8¹ + 1·8⁰ + 2·8⁻¹ + 4·8⁻²`
`= 512 + 320 + 24 + 1 + 0,25 + 0,0625 = 857,3125₁₀`

| | | | | | | |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **moltiplicatore** | 1 | 5 | 3 | 1 | 2 | 4 |
| **posizione** | 4 | 3 | 2 | 1 | −1 | −2 |
| **potenza/peso** | 8³ | 8² | 8¹ | 8⁰ | 8⁻¹ | 8⁻² |
| **valore del peso** | 512 | 64 | 8 | 1 | 0,125 | 0,015625 |
| **addendi** | 512 | 320 | 24 | 1 | 0,25 | 0,0625 |

**Risultato: 1531.24₈ = 857,3125₁₀**

*(Nota: 1/64 = 0,015625; moltiplicato per 4 dà 0,0625.)*

---

## Metti alla prova: da ottale a decimale

Converti in decimale i seguenti numeri espressi in ottale:

| | | |
|---|---|---|
| a. `333₈` | b. `777₈` | c. `4567₈` |
| d. `2.23₈` | e. `35.641₈` | f. `621.326₈` |

<div class="box">

**Soluzioni:** a. **219** · b. **511** · c. **2423** · d. **2,296875** · e. **29,814453125** · f. **401,41796875**

*Esempio svolto (d):* 2.23₈ = 2 + 2/8 + 3/64 = 2 + 0,25 + 0,046875 = 2,296875

</div>

---

<!-- _class: section-break -->

# 3. Da esadecimale reale a decimale

---

## Ripasso: cifre esadecimali

Il sistema esadecimale ha base **16** e alfabeto **0–9, A–F**:

| A | B | C | D | E | F |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 10 | 11 | 12 | 13 | 14 | 15 |

Prima di moltiplicare, **sostituisci ogni lettera con il suo valore decimale**.

Nella parte frazionaria i pesi sono: 16⁻¹ = **1/16** = 0,0625 · 16⁻² = **1/256** = 0,00390625

---

## Esadecimale → decimale: esempio 1

La stringa **13FA.00₁₆** si scrive come somma di sei termini:

`13FA.00₁₆ = 1·16³ + 3·16² + F·16¹ + A·16⁰ + 0·16⁻¹ + 0·16⁻²`
`= 4096 + 768 + 240 + 10 + 0 + 0 = 5114₁₀`

| | | | | | | |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **moltiplicatore** | 1 | 3 | F = 15 | A = 10 | 0 | 0 |
| **posizione** | 4 | 3 | 2 | 1 | −1 | −2 |
| **potenza/peso** | 16³ | 16² | 16¹ | 16⁰ | 16⁻¹ | 16⁻² |
| **valore del peso** | 4096 | 256 | 16 | 1 | 1/16 | 1/256 |
| **addendi** | 4096 | 768 | 240 | 10 | 0 | 0 |

**Risultato: 13FA.00₁₆ = 5114₁₀**

---

## Esadecimale → decimale: la parte intera

Per **13FA₁₆** (senza parte frazionaria) i termini sono solo quattro:

`13FA₁₆ = 1·16³ + 3·16² + F·16¹ + A·16⁰ = 4096 + 768 + 240 + 10 = 5114₁₀`

| | | | | |
|---|:---:|:---:|:---:|:---:|
| **moltiplicatore** | 1 | 3 | F | A |
| **posizione** | 4 | 3 | 2 | 1 |
| **potenza/peso** | 16³ | 16² | 16¹ | 16⁰ |
| **valore del peso** | 4096 | 256 | 16 | 1 |
| **addendi** | 4096 | 768 | 240 | 10 |

<div class="box">Aggiungere <code>.00</code> a un numero non ne cambia il valore: <b>13FA₁₆ = 13FA.00₁₆ = 5114₁₀</b>.</div>

---

## Esadecimale → decimale: esempio 2

La stringa **ABC.25₁₆** si scrive come somma di cinque termini:

`ABC.25₁₆ = 10·16² + 11·16¹ + 12·16⁰ + 2·16⁻¹ + 5·16⁻²`
`= 2560 + 176 + 12 + 0,125 + 0,01953125 = 2748,14453125₁₀`

| | | | | | |
|---|:---:|:---:|:---:|:---:|:---:|
| **moltiplicatore** | A = 10 | B = 11 | C = 12 | 2 | 5 |
| **posizione** | 3 | 2 | 1 | −1 | −2 |
| **potenza/peso** | 16² | 16¹ | 16⁰ | 16⁻¹ | 16⁻² |
| **valore del peso** | 256 | 16 | 1 | 1/16 | 1/256 |
| **addendi** | 2560 | 176 | 12 | 0,125 | 0,01953125 |

**Risultato: ABC.25₁₆ = 2748,14453125₁₀**

---

## Metti alla prova: da esadecimale a decimale

Converti in decimale i seguenti numeri espressi in esadecimale:

| | | |
|---|---|---|
| a. `33.00₁₆` | b. `FA.00₁₆` | c. `88.00₁₆` |
| d. `12EA.12₁₆` | e. `F160.5A₁₆` | f. `CA20.BF₁₆` |

<div class="box">

**Soluzioni:** a. **51** · b. **250** · c. **136** · d. **4842,0703125** · e. **61792,3515625** · f. **51744,74609375**

*Esempio svolto (b):* FA₁₆ = 15·16 + 10 = 240 + 10 = 250

</div>

---

## Errori comuni da evitare

<div class="warn">

1. **Esponente della prima cifra dopo la virgola:** è **−1**, non 0
2. **Parte frazionaria con potenze positive:** i pesi a destra della virgola sono **frazioni** (1/b, 1/b², …)
3. **Dimenticare** di convertire le lettere A–F in 10–15
4. **Cifre non ammesse** nella base (es. `8` in ottale, `2` in binario)
5. **Non indicare la base** (pedice) del risultato

</div>

**Controllo rapido:** il numero `3018,5` deve stare tra `3018` e `3019`. La parte frazionaria in decimale è **sempre minore di 1**.

---

## Riepilogo

- Il valore decimale di un numero in **base *b*** è la somma delle cifre moltiplicate per i loro **pesi** (potenze di *b*)
- Parte **intera**: esponenti 0, 1, 2, … da destra verso sinistra
- Parte **frazionaria**: esponenti −1, −2, −3, … dalla virgola verso destra
- In esadecimale le lettere **A–F** valgono **10–15**
- **Binario:** somma dei pesi delle sole cifre a 1

**Prossima lezione (4b):** il percorso inverso, da **decimale** a binario, ottale, esadecimale (divisioni e moltiplicazioni ripetute).

---

<!-- _class: title -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Grazie per l'attenzione

**Domande?**
