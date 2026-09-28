---
marp: true
theme: default
paginate: true
size: 16:9
header: 'TPSI · Classe 3ª Informatica · UA1 – Lezione 3'
footer: 'Sistemi di numerazione posizionali'
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

# Sistemi di numerazione posizionali

## Unità di Apprendimento 1 · Lezione 3
### La rappresentazione delle informazioni

Tecnologie e Progettazione di Sistemi Informatici e di Telecomunicazioni (TPSI)
Classe 3ª – Istituto Tecnico Informatico

---

## Di cosa parliamo oggi

1. **Numero e numerale**: cosa rappresentiamo e come lo scriviamo
2. **Sistemi di numerazione** e **sistemi posizionali**
3. **Base**, **cifre**, **peso** e **posizione**
4. Basi usate in informatica: **binaria, ottale, esadecimale**
5. **Conversione da una base qualsiasi a decimale**
6. Vantaggi dei sistemi posizionali e confronto tra le basi

> Obiettivo: saper leggere un numero scritto in base 2, 8 o 16 e calcolarne il valore decimale.

---

<!-- _class: section-break -->

# 1. Rappresentazione dei dati numerici

---

## Numero e numerale

I numeri sono **entità matematiche astratte** e vanno distinti dalla loro **rappresentazione**.

<div class="box">

- Si dice **numero** un'entità astratta.
- Il **numerale** è una **stringa di caratteri** (codifica) che rappresenta un numero in un dato **sistema di numerazione**.

</div>

**Esempio:** la quantità "dieci" è un concetto unico (il *numero*). Il *numerale* è il modo in cui lo scriviamo: `10`, `X`, `1010₂`, `A₁₆`… sono **numerali diversi dello stesso numero**.

---

## Lo stesso numero, tanti modi di scriverlo

La rappresentazione del numero **10** è stata fatta in modi diversi nella storia:

| Sistema | Numerale per "dieci" |
|---|:---:|
| Numerazione **araba** (decimale) | `10` |
| Numerazione **romana** | `X` |
| Numerazione **unaria** | `● ● ● ● ● ● ● ● ● ●` |
| Numerazione **maya** | due barre `══` (5 + 5) |
| Numerazione **babilonese** | un cuneo a forma di "<" |
| Numerazione **binaria** | `1010` |

Il **numero** è sempre lo stesso: cambia solo la **codifica**.

---

## Sistema di numerazione

<div class="box">

**Definizione**
Un **sistema di numerazione** è un sistema utilizzato per esprimere i numeri e le operazioni che si possono effettuare su di essi.

È un **insieme di regole e di simboli** il cui utilizzo permette di rappresentare delle **quantità**.

</div>

**Due grandi famiglie**
- **Non posizionali**: il valore di un simbolo non dipende dalla posizione (es. numeri romani, unario)
- **Posizionali**: il valore di una cifra **dipende dalla posizione** (es. decimale, binario)

---

## Non posizionale vs posizionale: un esempio

<div class="cols">
<div>

### Romano (non posizionale)
`XXX` = 10 + 10 + 10 = **30**

`X` vale **sempre 10**, in qualsiasi posizione.

*(Fa eccezione la regola sottrattiva: IX = 9, XI = 11.)*

</div>
<div>

### Decimale (posizionale)
`333` = 300 + 30 + 3

La cifra `3` vale **3**, **30** o **300** a seconda di **dove si trova**.

</div>
</div>

<div class="warn">

Provate a fare **XLVII × XIX** con i numeri romani… e ora **47 × 19** in decimale. Ecco perché i sistemi posizionali hanno vinto!

</div>

---

<!-- _class: section-break -->

# 2. Sistemi posizionali

---

## Cos'è un sistema posizionale

Nei sistemi posizionali la **posizione** delle diverse cifre del numero è **fondamentale**:

- viene scelta una **base**, ossia un numero naturale
- viene definita una serie di **cifre** che indicano tutti i numeri naturali **più piccoli della base**, compreso lo **zero**
- tutti gli altri numeri vengono espressi in funzione di **potenze della base**

**Esempio:** scelgo base **b = 5** → cifre `0, 1, 2, 3, 4`.
Il numero "sei" si scrive `11₅` perché 6 = 1·5¹ + 1·5⁰.

---

## Il sistema decimale-posizionale

Il sistema che usiamo oggi è il sistema numerico **decimale-posizionale**:

- è un sistema in **base 10** (decimale)
- i numeri sono scritti con **dieci cifre**: `0, 1, 2, 3, 4, 5, 6, 7, 8, 9`
- gli altri numeri sono espressi in funzione delle **potenze della base** (10ⁿ)

**Perché proprio base 10?** Probabilmente perché abbiamo **dieci dita**! I Babilonesi usavano la base 60 (ancora oggi: 60 secondi, 60 minuti), i Maya la base 20.

---

## Peso di una cifra

Un sistema si chiama **posizionale** se una stessa cifra ha un **valore diverso (peso)** a seconda della posizione:

- la cifra all'estrema **destra** è la **cifra meno significativa**
- la cifra all'estrema **sinistra** è la **cifra più significativa**

**Esempio:** nel numero `555`

| Cifra | Posizione | Valore |
|:---:|:---:|:---:|
| **5** (sinistra) | centinaia | 500 |
| **5** | decine | 50 |
| **5** (destra) | unità | 5 |

Sempre la cifra 5, ma con **tre pesi diversi**.

---

## Base, alfabeto e fattore moltiplicante

- Il **numero dei simboli** dell'alfabeto è pari al **valore della base**
- La **base** e la **posizione** della cifra indicano il **fattore moltiplicante (peso)** di ogni cifra
- Quindi ogni cifra assume un valore diverso a seconda della **posizione** che occupa nel numero

| Base | Nome | Alfabeto | N° simboli |
|:---:|---|---|:---:|
| 2 | binario | `0 1` | 2 |
| 8 | ottale | `0 … 7` | 8 |
| 10 | decimale | `0 … 9` | 10 |
| 16 | esadecimale | `0 … 9 A B C D E F` | 16 |

<div class="warn">In base <i>b</i> la cifra più grande è <b>b − 1</b>. Quindi <code>102₂</code> o <code>589₈</code> sono numeri <b>sbagliati</b>!</div>

---

## Posizione delle cifre

La posizione di ogni cifra si conta **da destra verso sinistra**, a partire dalla **posizione 1** (cifra meno significativa):

```text
        7    3    5    4
        ↓    ↓    ↓    ↓
posizione 4    3    2    1
```

Il **peso** di una cifra è la base elevata a *(posizione − 1)*:

| Posizione | 4 | 3 | 2 | 1 |
|---|:---:|:---:|:---:|:---:|
| Esponente | 3 | 2 | 1 | 0 |
| Peso (base 10) | 10³ | 10² | 10¹ | 10⁰ |

---

## La base come pedice

Ciascuna cifra deve essere moltiplicata per una **potenza della base**, con esponente legato alla **posizione** della cifra.

La **base si indica come pedice** del numero. Se non è presente, si sottintende **base 10**.

| Sistema | Esempio | Lettura |
|---|:---:|---|
| **Binaria** | `1011₂` | uno-zero-uno-uno in base 2 |
| **Ottale** | `1057₈` | uno-zero-cinque-sette in base 8 |
| **Esadecimale** | `4E₁₆` | quattro-E in base 16 |
| **Decimale** | `7354` (o `7354₁₀`) | settemilatrecentocinquantaquattro |

<div class="warn">

`101` **non** è "centouno" se in base 2! Senza pedice c'è ambiguità: `101₂` = 5, `101₈` = 65, `101₁₆` = 257.

</div>

---

## Analizziamo il numero 7354

Il numero **7354** è ottenuto dalla somma di **4 addendi**:

| | | | | |
|---|:---:|:---:|:---:|:---:|
| **Moltiplicatore** | 7 | 3 | 5 | 4 |
| **Posizione** | 4 | 3 | 2 | 1 |
| **Potenza / peso** | 10³ = 1000 | 10² = 100 | 10¹ = 10 | 10⁰ = 1 |
| **Addendi** | 7000 | 300 | 50 | 4 |

**7354₁₀ = 7·10³ + 3·10² + 5·10¹ + 4·10⁰ = 7000 + 300 + 50 + 4**

Questa è la **formula generale**: 
**N = cₙ·bⁿ + … + c₂·b² + c₁·b¹ + c₀·b⁰**

---

## Formula generale (notazione compatta)

Un numero con cifre *cₙ … c₁ c₀* in base *b* vale:

**N = Σ cᵢ · bⁱ**  *(per i = 0, 1, …, n)*

**Legenda**
- *cᵢ* = cifra in posizione *i* (contando da destra a partire da 0)
- *b* = base
- *bⁱ* = peso della cifra

Questa formula funziona **per qualsiasi base** ed è la chiave per tutte le conversioni di oggi.

---

<!-- _class: section-break -->

# 3. Conversioni verso il decimale

---

## Perché servono le conversioni?

- Negli **elaboratori** i numeri sono espressi in **binario**
- Noi ragioniamo in **decimale**
- È quindi necessario **convertire** tra le diverse basi

Iniziamo dalla conversione **base qualsiasi → decimale**: basta applicare **direttamente la definizione** di numerazione posizionale.

**Procedura in 3 passi**
1. Scrivi le **posizioni** (esponenti) sotto ogni cifra, da destra a sinistra
2. **Moltiplica** ogni cifra per la base elevata alla sua posizione
3. **Somma** tutti gli addendi

---

## Da binario a decimale: 1001₂

`1001₂ = 1·2³ + 0·2² + 0·2¹ + 1·2⁰ = 1·8 + 0·4 + 0·2 + 1·1 = 9₁₀`

| | | | | |
|---|:---:|:---:|:---:|:---:|
| **Moltiplicatore** | 1 | 0 | 0 | 1 |
| **Posizione** | 4 | 3 | 2 | 1 |
| **Potenza / peso** | 2³ | 2² | 2¹ | 2⁰ |
| **Valore del peso** | 8 | 4 | 2 | 1 |
| **Addendi** | 8 | 0 | 0 | 1 |

**Risultato: 1001₂ = 9₁₀**

---

## Pesi del sistema binario

Conviene **memorizzare le potenze di 2**:

| 2⁷ | 2⁶ | 2⁵ | 2⁴ | 2³ | 2² | 2¹ | 2⁰ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |

**Trucco:** in binario basta **sommare i pesi delle cifre uguali a 1**.

**Esempio: 110101₂**

| 32 | 16 | 8 | 4 | 2 | 1 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| **1** | **1** | 0 | **1** | 0 | **1** |

32 + 16 + 4 + 1 = **53₁₀**

---

## Altri esempi binario → decimale

<!-- _class: small -->

| Binario | Calcolo | Decimale |
|:---:|---|:---:|
| `1011₂` | 8 + 0 + 2 + 1 | **11** |
| `10110₂` | 16 + 0 + 4 + 2 + 0 | **22** |
| `11111111₂` | 128+64+32+16+8+4+2+1 | **255** |
| `10000000₂` | 128 | **128** |

**Osservazioni**
- Con **8 bit** (1 byte) il numero massimo è **255 = 2⁸ − 1**
- Con ***n* bit** il valore massimo è **2ⁿ − 1** e i numeri rappresentabili sono **2ⁿ** (da 0 a 2ⁿ−1)
- Un numero binario **pari** termina con `0`, uno **dispari** con `1`

---

## Da ottale a decimale: 354₈

Il sistema ottale ha **base 8** e cifre `0 … 7`.

`354₈ = 3·8² + 5·8¹ + 4·8⁰ = 3·64 + 5·8 + 4·1 = 192 + 40 + 4 = 236₁₀`

| | | | |
|---|:---:|:---:|:---:|
| **Moltiplicatore** | 3 | 5 | 4 |
| **Posizione** | 3 | 2 | 1 |
| **Potenza / peso** | 8² = 64 | 8¹ = 8 | 8⁰ = 1 |
| **Addendi** | 192 | 40 | 4 |

**Risultato: 354₈ = 236₁₀**

---

## Da ottale a decimale: 5712₈

`5712₈ = 5·8³ + 7·8² + 1·8¹ + 2·8⁰ = 5·512 + 7·64 + 8 + 2 = 2560 + 448 + 8 + 2 = 3018₁₀`

| | | | | |
|---|:---:|:---:|:---:|:---:|
| **Moltiplicatore** | 5 | 7 | 1 | 2 |
| **Posizione** | 4 | 3 | 2 | 1 |
| **Potenza / peso** | 8³ = 512 | 8² = 64 | 8¹ = 8 | 8⁰ = 1 |
| **Addendi** | 2560 | 448 | 8 | 2 |

**Risultato: 5712₈ = 3018₁₀**

---

## Il sistema esadecimale

Il sistema esadecimale ha **base b = 16**.

Utilizza un alfabeto di **16 cifre**: dopo la cifra 9 si "prosegue" con le **prime 6 lettere maiuscole** dell'alfabeto:

**Σ = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F }**

| Lettera | A | B | C | D | E | F |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Valore decimale** | 10 | 11 | 12 | 13 | 14 | 15 |

**Dove lo incontriamo?** Colori web (`#FF8800`), indirizzi di memoria (`0x7FFE`), indirizzi MAC (`3C:52:82:…`), codici di errore.

---

## Da esadecimale a decimale: 3B2₁₆

`3B2₁₆ = 3·16² + B·16¹ + 2·16⁰ = 3·256 + 11·16 + 2·1 = 768 + 176 + 2 = 946₁₀`

| | | | |
|---|:---:|:---:|:---:|
| **Moltiplicatore** | 3 | B (=11) | 2 |
| **Posizione** | 3 | 2 | 1 |
| **Potenza / peso** | 16² = 256 | 16¹ = 16 | 16⁰ = 1 |
| **Addendi** | 768 | 176 | 2 |

**Risultato: 3B2₁₆ = 946₁₀**

<div class="warn">Ricordate di <b>sostituire la lettera con il suo valore</b> (B = 11) prima di moltiplicare!</div>

---

## Da esadecimale a decimale: 13FA₁₆

`13FA₁₆ = 1·16³ + 3·16² + F·16¹ + A·16⁰`
`= 1·4096 + 3·256 + 15·16 + 10·1 = 4096 + 768 + 240 + 10 = 5114₁₀`

| | | | | |
|---|:---:|:---:|:---:|:---:|
| **Moltiplicatore** | 1 | 3 | F (=15) | A (=10) |
| **Posizione** | 4 | 3 | 2 | 1 |
| **Potenza / peso** | 16³ = 4096 | 16² = 256 | 16¹ = 16 | 16⁰ = 1 |
| **Addendi** | 4096 | 768 | 240 | 10 |

**Risultato: 13FA₁₆ = 5114₁₀**

---

## Ancora qualche esempio

<!-- _class: small -->

| Numero | Calcolo | Decimale |
|:---:|---|:---:|
| `725₈` | 7·64 + 2·8 + 5 = 448 + 16 + 5 | **469** |
| `777₈` | 7·64 + 7·8 + 7 = 448 + 56 + 7 | **511** |
| `2A7₁₆` | 2·256 + 10·16 + 7 = 512 + 160 + 7 | **679** |
| `FF₁₆` | 15·16 + 15 | **255** |
| `1F₁₆` | 1·16 + 15 | **31** |

**Curiosità:** `FF₁₆ = 11111111₂ = 255₁₀` → un byte si scrive con **due sole cifre esadecimali**. Per questo l'esadecimale è così usato in informatica.

---

## Metodo alternativo: schema di Horner

Per evitare di calcolare le potenze si può usare la **regola di Horner**: si parte dalla cifra più a sinistra e per ogni cifra successiva si **moltiplica per la base e si somma**.

**Esempio: 1011₂**

```text
1                       → 1
1·2 + 0  =  2           → 2
2·2 + 1  =  5           → 5
5·2 + 1  = 11           → 11
```
**1011₂ = 11₁₀** ✔ (stesso risultato di 8 + 0 + 2 + 1)

**Esempio: 354₈** → 3 → 3·8+5 = 29 → 29·8+4 = **236** ✔

---

<!-- _class: section-break -->

# 4. Conclusioni

---

## Vantaggi dei sistemi posizionali

In sintesi, i principali vantaggi dei sistemi posizionali sono:

- **lettura più immediata** dei numeri
- **rappresentazione più concisa**: bastano pochi simboli per scrivere numeri enormi
- **maggiore efficienza nelle operazioni aritmetiche**: addizioni e moltiplicazioni "in colonna" funzionano allo stesso modo in ogni base

**Esempio:** con soli 10 simboli scriviamo qualsiasi numero. Con il sistema unario, per scrivere 1 000 serviranno 1 000 segni!

---

## Lunghezza della rappresentazione

La **lunghezza** del numerale cambia a seconda della base: è **più corta** nelle basi con **più cifre** nell'alfabeto.

<div class="box">

**Esempio: rappresentiamo il numero 100 nelle diverse basi**

| Base | Numerale | Cifre |
|---|:---:|:---:|
| Binario | `100₁₀ = 1100100₂` | 7 |
| Ottale | `100₁₀ = 144₈` | 3 |
| Decimale | `100` | 3 |
| Esadecimale | `100₁₀ = 64₁₆` | 2 |

</div>

**Verifica:** 64 + 32 + 4 = 100 ✔ · 1·64 + 4·8 + 4 = 100 ✔ · 6·16 + 4 = 100 ✔

---

## I primi 16 numeri nelle 4 basi

<!-- _class: small -->

| Base 2 | Base 8 | Base 10 | Base 16 | | Base 2 | Base 8 | Base 10 | Base 16 |
|:---:|:---:|:---:|:---:|---|:---:|:---:|:---:|:---:|
| 0000 | 00 | 0 | 0 | | 1000 | 10 | 8 | 8 |
| 0001 | 01 | 1 | 1 | | 1001 | 11 | 9 | 9 |
| 0010 | 02 | 2 | 2 | | 1010 | 12 | 10 | A |
| 0011 | 03 | 3 | 3 | | 1011 | 13 | 11 | B |
| 0100 | 04 | 4 | 4 | | 1100 | 14 | 12 | C |
| 0101 | 05 | 5 | 5 | | 1101 | 15 | 13 | D |
| 0110 | 06 | 6 | 6 | | 1110 | 16 | 14 | E |
| 0111 | 07 | 7 | 7 | | 1111 | 17 | 15 | F |

**Notate:** ogni cifra esadecimale corrisponde esattamente a **4 bit** (un *nibble*): `A₁₆ = 1010₂`, `F₁₆ = 1111₂`. Ci sarà utile per le conversioni dirette!

---

## Errori comuni da evitare

<div class="warn">

1. **Contare le posizioni da sinistra** invece che da destra
2. Partire con esponente **1** invece di **0** (la prima cifra a destra ha peso **b⁰ = 1**)
3. Usare **cifre non ammesse** nella base (es. `8` in ottale, `2` in binario)
4. Dimenticare di **convertire le lettere** esadecimali (A=10 … F=15)
5. **Non indicare la base** e confondere `101₂` con `101` decimale

</div>

**Controllo rapido:** se la base è minore di 10, il valore decimale è **sempre minore** del numero letto come se fosse decimale (es. `1001₂ = 9`, che è minore di 1001). Se ottieni un valore più grande, ricontrolla i calcoli.

---

## Esercizi svolti

**1.** Convertire `10011₂` in decimale.
16 + 0 + 0 + 2 + 1 = **19**

**2.** Convertire `604₈` in decimale.
6·64 + 0·8 + 4 = 384 + 0 + 4 = **388**

**3.** Convertire `A5₁₆` in decimale.
10·16 + 5 = **165**

**4.** Qual è il valore massimo esprimibile con **10 bit**?
2¹⁰ − 1 = **1023**

**5.** Il numero `1A3₁₆` è valido? E `1A3₈`?
Il primo **sì**; il secondo **no** (la lettera A non esiste in ottale).

---

## Esercizi per casa

1. Convertire in decimale: `1101₂` · `101010₂` · `11100111₂`
2. Convertire in decimale: `17₈` · `256₈` · `4013₈`
3. Convertire in decimale: `2F₁₆` · `C0₁₆` · `1BE₁₆`
4. Scrivere il valore dei pesi di un numero binario di **12 cifre** (da 2⁰ a 2¹¹).
5. Quali tra questi numeri **non sono validi**? `1201₂` · `758₈` · `9G₁₆` · `FACE₁₆`
6. Perché i colori web come `#FF8800` si scrivono in esadecimale? Quanti valori diversi può assumere ciascuna componente (R, G, B)?

*(Soluzioni parziali: 13 · 42 · 231 · 15 · 174 · 2059 · 47 · 192 · 446)*

---

## Riepilogo

- **Numero** (entità astratta) ≠ **numerale** (sua rappresentazione)
- In un sistema **posizionale** una cifra vale in base alla **posizione** che occupa
- La **base** *b* indica il numero di simboli; le cifre vanno da 0 a **b − 1**
- **N = Σ cᵢ · bⁱ**: formula per convertire da **qualsiasi base al decimale**
- **Binario** (base 2), **ottale** (base 8), **esadecimale** (base 16, cifre 0–9 e A–F)
- Più grande è la base, **più corta** è la scrittura del numero

---

<!-- _class: title -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Grazie per l'attenzione

**Domande?**

Prossima lezione: conversione da decimale a binario, ottale ed esadecimale
