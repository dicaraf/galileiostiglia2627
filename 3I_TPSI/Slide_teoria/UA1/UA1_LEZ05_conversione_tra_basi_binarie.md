---
marp: true
theme: default
paginate: true
header: 'TPSI · Classe 3ª Informatica · UA1 – Lezione 5'
footer: 'Conversione tra le basi binarie'
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

# Conversione tra le basi binarie

## Unità di Apprendimento 1 · Lezione 5
### La rappresentazione delle informazioni

Tecnologie e Progettazione di Sistemi Informatici e di Telecomunicazioni (TPSI)
Classe 3ª – Istituto Tecnico Informatico

---

## In questa lezione impareremo

1. La conversione tra **binario e ottale**
2. La conversione tra **binario ed esadecimale**
3. La conversione tra **ottale ed esadecimale**

> Il trucco: niente divisioni né moltiplicazioni! Basta **raggruppare i bit** e usare una tabellina.

---

## Introduzione: un caso particolare

Affronteremo casi particolari che permettono di sfruttare alcune **proprietà matematiche** per passare tra basi con caratteristiche comuni.

Consideriamo:

| Sistema | Base | Come potenza di 2 |
|---|:---:|:---:|
| binario | b = 2 | 2¹ = 2 |
| ottale | b = 8 | **2³** = 8 |
| esadecimale | b = 16 | **2⁴** = 16 |

---

## Il legame tra le basi

Tra queste basi esiste un **particolare legame**: sono legate da una **potenza**.

- la base **ottale** è la **terza potenza** della base binaria
- la base **esadecimale** è la **quarta potenza** della base binaria

Relazione generale: **B<sub>a</sub> = B<sub>b</sub><sup>k</sup>**

<div class="box">

Quando tra due basi vale **B<sub>a</sub> = B<sub>b</sub><sup>k</sup>**, ogni cifra della base più grande (B<sub>a</sub>) si scrive con esattamente **k cifre** della base più piccola (B<sub>b</sub>).

</div>

---

## Quante cifre binarie per ogni cifra?

**Ottale ↔ binario:** B₁ = 8, B₂ = 2 → **k = 3** perché 8 = 2³
→ ogni cifra ottale = **3 bit**

**Esadecimale ↔ binario:** B₁ = 16, B₂ = 2 → **k = 4** perché 16 = 2⁴
→ ogni cifra esadecimale = **4 bit** (un *nibble*)

| Base | Cifre | Bit per cifra | Combinazioni |
|:---:|:---:|:---:|:---:|
| Ottale | 0 … 7 | 3 | 2³ = 8 |
| Esadecimale | 0 … F | 4 | 2⁴ = 16 |

---

<!-- _class: section-break -->

# 1. Binario ↔ ottale

---

## Premessa: la tabella ottale

Il sistema ottale è usato principalmente come rappresentazione **intermedia** per la comunicazione con le macchine digitali.

| ottale | 0₈ | 1₈ | 2₈ | 3₈ | 4₈ | 5₈ | 6₈ | 7₈ |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| decimale | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| **binario** | **000** | **001** | **010** | **011** | **100** | **101** | **110** | **111** |

---

## Due osservazioni

1. La codifica ottale **coincide** con i primi otto elementi della codifica decimale
2. Tutte le otto cifre sono codificate in binario con **stringhe di 3 bit**, perché 2³ = 8

<div class="box">

**Regola: da binario a ottale**
Raggruppa le cifre binarie **a gruppi di 3** (partendo da destra) e sostituisci ogni gruppo con la corrispondente cifra ottale.

</div>

**Consiglio:** i pesi dentro ogni gruppo di 3 bit sono **4 · 2 · 1**. Ad esempio `110` = 4 + 2 + 0 = **6**.

---

## Binario → ottale: 110111₂

Separiamo i bit a gruppi di 3:

`110₂   111₂`

Convertiamo in ottale ogni gruppo:

`110₂ = 6₈` e `111₂ = 7₈`

Quindi:

<div class="box" style="text-align:center; font-size:1.3em;">

**110111₂ = 67₈**

</div>

Schema sintetico:

```text
   110    111
    ↓      ↓
    6      7
```

---

## Binario → ottale: 101100₂

```text
   101    100
    ↓      ↓
    5      4
```

<div class="box" style="text-align:center; font-size:1.3em;">

**101100₂ = 54₈**

</div>

**Verifica in decimale:** 101100₂ = 32 + 8 + 4 = 44 · 54₈ = 5·8 + 4 = 44 ✔

---

## Se il numero non è multiplo di 3

Se il numero binario **non ha un numero di bit multiplo di 3**, bisogna aggiungere **a sinistra** i bit mancanti, naturalmente con valore **0** (non cambiano il valore).

**Esempio: 11001010₂** (8 bit → ne mancano 1)

```text
  011    001    010        ← aggiunto uno 0 a sinistra
   ↓      ↓      ↓
   3      1      2
```

<div class="box" style="text-align:center; font-size:1.3em;">

**11001010₂ = 312₈**

</div>

---

## Procedura in tre passi

**Esempio: 1011010₂** (7 bit)

1. **Separiamo** i bit a gruppi di tre **partendo da destra**:
   `1  011  010`
2. **Completiamo** le terne aggiungendo a sinistra gli 0 mancanti:
   `001  011  010`
3. **Convertiamo** ogni terna:

```text
  001    011    010
   ↓      ↓      ↓
   1      3      2
```

<div class="box" style="text-align:center; font-size:1.2em;">

**1011010₂ = 132₈**

</div>

<div class="warn">Si parte sempre <b>da destra</b>: gli zeri di completamento vanno sempre a <b>sinistra</b>, mai a destra (cambierebbero il valore!).</div>

---

## Numeri frazionari: binario → ottale

Anche per i numeri reali i bit devono essere raggruppabili in **terzetti**, aggiungendo eventualmente:

- uno o più **zeri a sinistra** (cifra più significativa) per la **parte intera**
- uno o più **zeri a destra** (cifra meno significativa) per la **parte frazionaria**

**Esempio: 1011010.11₂**

- parte intera: `001 011 010` (si aggiungono zeri **a sinistra**)
- parte frazionaria: `110` (si aggiunge uno zero **a destra**)

```text
   001    011    010   .   110
    ↓      ↓      ↓         ↓
    1      3      2    .    6
```

**1011010.11₂ = 132.6₈**

---

## Un altro esempio frazionario

Convertiamo **11111010.1₂** in base 8.

Separiamo la parte intera da quella frazionaria:
- parte intera: `11111010`
- parte frazionaria: `1`

Aggiungiamo gli zeri mancanti:
- parte intera: `011 111 010`
- parte frazionaria: `100`

```text
   011    111    010   .   100
    ↓      ↓      ↓         ↓
    3      7      2    .    4
```

<div class="box" style="text-align:center; font-size:1.2em;">

**11111010.1₂ = 372.4₈**

</div>

---

## Da ottale a binario

Per passare dalla codifica ottale a quella binaria, a **ogni cifra ottale** sostituiamo la corrispondente **cifra codificata in binario** (3 bit).

**Esempio: 63₈**

```text
    6      3
    ↓      ↓
   110    011
```

<div class="box" style="text-align:center; font-size:1.3em;">

**63₈ = 110011₂**

</div>

---

## Da ottale a binario: 126₈

```text
    1      2      6
    ↓      ↓      ↓
   001    010    110
```

Otteniamo: **126₈ = 001010110₂**

Gli **zeri a sinistra** possono essere eliminati (sono "superflui"):

<div class="box" style="text-align:center; font-size:1.3em;">

**126₈ = 1010110₂**

</div>

<div class="warn">Attenzione: si tolgono <b>solo gli zeri a sinistra</b> del numero intero, mai quelli in mezzo!</div>

---

## Esercizi: binario ↔ ottale

Converti:

| | | |
|---|---|---|
| a. `101111₂` → ottale | b. `110101101₂` → ottale | c. `1010101₂` → ottale |
| d. `57₈` → binario | e. `435₈` → binario | f. `10.1₂` → ottale |

<div class="box">

**Soluzioni:** a. **57₈** · b. **655₈** · c. **125₈** · d. **101111₂** · e. **100011101₂** · f. **2.4₈**

</div>

---

<!-- _class: section-break -->

# 2. Binario ↔ esadecimale

---

## Premessa: la tabella esadecimale

Il sistema esadecimale è usato come rappresentazione **intermedia** per la comunicazione con le macchine digitali.

| Esa | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Dec | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| **Bin** | 0000 | 0001 | 0010 | 0011 | 0100 | 0101 | 0110 | 0111 |

| Esa | 8 | 9 | A | B | C | D | E | F |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Dec | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
| **Bin** | 1000 | 1001 | 1010 | 1011 | 1100 | 1101 | 1110 | 1111 |

---

## Perché l'esadecimale è così comodo

- Ogni **byte** è composto da 8 bit → si suddivide in **due gruppi da 4 bit (nibble)**
- Ciascun nibble è codificato con **una cifra esadecimale**
- Quindi **un byte = due cifre esadecimali**

<div class="box">

**Regola: da binario a esadecimale**
Raggruppa le cifre binarie **a gruppi di 4** (partendo da destra) e sostituisci ogni gruppo con la corrispondente cifra esadecimale.

</div>

**Esempi d'uso:** colori web `#FF8800` (3 byte), indirizzi MAC `3C:52:82:…`, indirizzi di memoria `0x7FFE`.

---

## Binario → esadecimale: 10101110₂

Separiamo i bit a gruppi di **4**:

`1010₂   1110₂`

Convertiamo ogni gruppo:

`1010₂ = A₁₆` e `1110₂ = E₁₆`

```text
   1010   1110
     ↓      ↓
     A      E
```

<div class="box" style="text-align:center; font-size:1.3em;">

**10101110₂ = AE₁₆**

</div>

**Verifica:** 10101110₂ = 128+32+8+4+2 = 174 · AE₁₆ = 10·16 + 14 = 174 ✔

---

## Se non è multiplo di 4: 111001₂

I bit sono 6: ne mancano 2 per arrivare a 8. Si aggiungono **zeri a sinistra**:

```text
   0011   1001
     ↓      ↓
     3      9
```

<div class="box" style="text-align:center; font-size:1.3em;">

**111001₂ = 39₁₆**

</div>

**Verifica:** 111001₂ = 32+16+8+1 = 57 · 39₁₆ = 3·16 + 9 = 57 ✔

---

## Numeri frazionari: binario → esadecimale

Convertiamo il numero binario reale **111010.1₂**.

Completiamo con gli zeri mancanti per formare i singoli **nibble**:
- parte intera: zeri **a sinistra** → `0011 1010`
- parte frazionaria: zeri **a destra** → `1000`

```text
   0011   1010   .   1000
     ↓      ↓          ↓
     3      A     .    8
```

<div class="box" style="text-align:center; font-size:1.3em;">

**111010.1₂ = 3A.8₁₆**

</div>

---

## Da esadecimale a binario

Per passare dalla codifica esadecimale a quella binaria, a **ogni cifra esadecimale** sostituiamo la corrispondente cifra codificata in binario (**4 bit**).

**Esempio: 63₁₆**

```text
     6      3
     ↓      ↓
   0110   0011
```

<div class="box" style="text-align:center; font-size:1.3em;">

**63₁₆ = 01100011₂**

</div>

**Esempio: C8₁₆**

```text
     C      8
     ↓      ↓
   1100   1000
```

**C8₁₆ = 11001000₂**

---

## Esadecimale frazionario → binario

Convertiamo **1F.4₁₆** in binario.

```text
     1      F     .    4
     ↓      ↓          ↓
   0001   1111    .  0100
```

Il risultato è: **1F.4₁₆ = 0001 1111.0100₂**

Dopo aver eliminato gli zeri "superflui" (a sinistra della parte intera e a destra della frazionaria):

<div class="box" style="text-align:center; font-size:1.3em;">

**1F.4₁₆ = 11111.01₂**

</div>

---

## Esercizi: binario ↔ esadecimale

Converti:

| | | |
|---|---|---|
| a. `11110000₂` → esa | b. `10110111₂` → esa | c. `1101.11₂` → esa |
| d. `A5₁₆` → binario | e. `B7₁₆` → binario | f. `2.C₁₆` → binario |

<div class="box">

**Soluzioni:** a. **F0₁₆** · b. **B7₁₆** · c. **D.C₁₆** · d. **10100101₂** · e. **10110111₂** · f. **10.11₂**

</div>

---

<!-- _class: section-break -->

# 3. Ottale ↔ esadecimale

---

## Passare attraverso il binario

Il metodo più veloce per passare dal sistema **ottale** all'**esadecimale** (o viceversa) è **passare attraverso il sistema binario**.

```text
   Ottale  ──▶  Binario  ──▶  Esadecimale
   (3 bit)    (raggruppo     (4 bit)
              diversamente)
```

**Procedura**
1. **Ottale → binario:** ogni cifra ottale diventa 3 bit
2. **Riraggruppa** i bit a gruppi di **4** (da destra)
3. **Binario → esadecimale:** ogni gruppo diventa una cifra esa

*(Viceversa: ogni cifra esa → 4 bit → riraggruppa a gruppi di 3 → cifre ottali.)*

---

## Ottale → esadecimale: 352₈

```text
     3      5      2         (ottale: 3 bit ciascuno)
     ↓      ↓      ↓
    011    101    010        → 011101010
                              riraggruppo a 4 da destra:
       1110    1010
         ↓       ↓
         E       A
```

<div class="box" style="text-align:center; font-size:1.2em;">

**(352)₈ = (1110 1010)₂ = (EA)₁₆**

</div>

**Verifica:** 352₈ = 3·64 + 5·8 + 2 = 234 · EA₁₆ = 14·16 + 10 = 234 ✔

---

## Ottale → esadecimale: 743₈

```text
       7        4        3         (ottale: 3 bit ciascuno)
       ↓        ↓        ↓
      111      100      011        → 111100011  (9 bit)

   riraggruppo a 4 da destra (servono 3 zeri a sinistra):
   0001    1110    0011
     ↓       ↓       ↓
     1       E       3
```

<div class="box" style="text-align:center; font-size:1.2em;">

**(743)₈ = (0001 1110 0011)₂ = (1E3)₁₆**

</div>

**Verifica:** 743₈ = 448 + 32 + 3 = 483 · 1E3₁₆ = 256 + 14·16 + 3 = 483 ✔

---

## Esadecimale → ottale: 7C₁₆

```text
       7         C
       ↓         ↓
     0111      1100       → 01111100
                             riraggruppo a 3 da destra (uno 0 a sinistra):
     001    111    100
      ↓      ↓      ↓
      1      7      4
```

<div class="box" style="text-align:center; font-size:1.2em;">

**(7C)₁₆ = (001 111 100)₂ = (174)₈**

</div>

**Verifica:** 7C₁₆ = 7·16 + 12 = 124 · 174₈ = 64 + 56 + 4 = 124 ✔

---

## Esadecimale → ottale: 2AC₁₆

```text
       2         A         C
       ↓         ↓         ↓
     0010      1010      1100      → 001010101100
                                      riraggruppo a 3 da destra:
     001    010    101    100
      ↓      ↓      ↓      ↓
      1      2      5      4
```

<div class="box" style="text-align:center; font-size:1.2em;">

**(2AC)₁₆ = (001 010 101 100)₂ = (1254)₈**

</div>

**Verifica:** 2AC₁₆ = 512 + 160 + 12 = 684 · 1254₈ = 512 + 128 + 40 + 4 = 684 ✔

---

## Riepilogo dei raggruppamenti

| Da → A | Passaggi | Gruppi |
|---|---|:---:|
| Binario → Ottale | raggruppa i bit | **3** |
| Ottale → Binario | espandi ogni cifra | **3** |
| Binario → Esadecimale | raggruppa i bit | **4** |
| Esadecimale → Binario | espandi ogni cifra | **4** |
| Ottale ↔ Esadecimale | passa dal binario | **3 poi 4** (o viceversa) |

**Regole d'oro**
- si raggruppa **da destra** verso sinistra (parte intera)
- nella **parte frazionaria** si raggruppa **dalla virgola verso destra**
- gli zeri di completamento vanno **a sinistra** (intera) e **a destra** (frazionaria)

---

## Esercizi: ottale ↔ esadecimale

Converti passando dal binario:

| | | |
|---|---|---|
| a. `435₈` → esa | b. `777₈` → esa | c. `F3₁₆` → ottale |
| d. `1A9₁₆` → ottale | e. `63₈` → esa | f. `FF₁₆` → ottale |

<div class="box">

**Soluzioni:** a. **11D₁₆** · b. **1FF₁₆** · c. **363₈** · d. **651₈** · e. **33₁₆** · f. **377₈**

*Esempio svolto (c):* F3₁₆ = 1111 0011₂ → 011 110 011 → **363₈**

</div>

---

## Errori comuni da evitare

<div class="warn">

1. **Raggruppare da sinistra** invece che da destra (parte intera)
2. **Aggiungere zeri dalla parte sbagliata** (a destra della parte intera!)
3. **Usare gruppi di 4 per l'ottale** (o di 3 per l'esadecimale)
4. **Dimenticare** di riraggruppare quando si passa da ottale a esadecimale
5. **Scambiare le lettere:** A = 10 = `1010`, B = 11 = `1011`, … F = 15 = `1111`

</div>

**Trucco per la tabella esa:** basta ricordare i pesi **8 · 4 · 2 · 1** dentro ogni nibble. Es. `1101` = 8+4+0+1 = 13 = **D**.

---

## Riepilogo

- **Ottale** = base 2³ → **1 cifra ottale = 3 bit**
- **Esadecimale** = base 2⁴ → **1 cifra esa = 4 bit**
- **Binario → ottale/esa:** raggruppa i bit (3 o 4) e sostituisci
- **Ottale/esa → binario:** espandi ogni cifra in 3 o 4 bit
- **Ottale ↔ esa:** passa sempre dal **binario**
- **Zeri di completamento:** a sinistra (parte intera), a destra (parte frazionaria)

**Prossimo argomento:** operazioni aritmetiche nei sistemi di numerazione binari.

---

<!-- _class: title -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Grazie per l'attenzione

**Domande?**
