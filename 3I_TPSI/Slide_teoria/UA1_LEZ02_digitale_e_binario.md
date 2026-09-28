---
marp: true
theme: default
paginate: true
size: 16:9
header: 'TPSI · Classe 3ª Informatica · UA1 – Lezione 2'
footer: 'Digitale e binario'
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
  section.small { font-size: 23px; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  .box { background: #eef6ff; border-left: 8px solid #0b5cad; padding: 0.5rem 1rem; border-radius: 6px; }
  .warn { background: #fff4e5; border-left: 8px solid #f59e0b; padding: 0.5rem 1rem; border-radius: 6px; }
---

<!-- _class: title -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Digitale e binario

## Unità di Apprendimento 1 · Lezione 2

Tecnologie e Progettazione di Sistemi Informatici e di Telecomunicazioni (TPSI)
Classe 3ª – Istituto Tecnico Informatico

---

## Di cosa parliamo oggi

1. **Analogico e digitale**: come si trasforma il mondo reale in numeri
2. **Campionamento** e **digitalizzazione**
3. **Digitale ≠ binario**: perché i calcolatori usano solo 0 e 1
4. **Codifica binaria**: bit, nibble, byte
5. **Codifica dei caratteri**: ASCII e Unicode
6. **Multipli del byte**: KB, KiB, MB, MiB…

> Obiettivo: capire come un computer riesce a rappresentare *qualsiasi* informazione usando solo due simboli.

---

<!-- _class: section-break -->

# 1. Analogico e digitale

---

## Grandezze fisiche: il mondo è continuo

In natura tutte le grandezze fisiche sono rappresentate in formato **continuo**: variano crescendo e decrescendo, senza salti.

Il loro grafico in funzione del tempo si disegna **"senza staccare la penna"** dal foglio.

**Esempi di grandezze continue**
- la temperatura di una stanza nell'arco della giornata
- la pressione dell'aria che genera un suono
- la tensione elettrica generata da un microfono
- la posizione di un'auto che si muove

---

## Segnale analogico

Con **segnale analogico** si indica la rappresentazione (o trasformazione) di una grandezza fisica tramite **una grandezza analoga** che la descrive bene.

**Esempio: il termometro a mercurio**
La temperatura (grandezza fisica) viene rappresentata dall'*altezza della colonnina di mercurio* (grandezza analoga). Se la temperatura cambia di poco, cambia di poco anche l'altezza.

**Esempio: il microfono**
Le variazioni di pressione dell'aria (voce) diventano variazioni di **tensione elettrica** proporzionali.

<div class="box">Analogico = il segnale "assomiglia" (è analogo) alla grandezza che rappresenta e può assumere <b>infiniti valori</b>.</div>

---

## Campionamento

È possibile fare dei **rilievi parziali** di un segnale analogico: si preleva il valore del segnale **a particolari istanti di tempo**. Questa operazione si chiama **campionamento**.

```text
Valore
  ^        *                *
  |     *     *          *     *
  |  *           *    *           *
  | *              *
  +---|---|---|---|---|---|---|---|--> tempo
      t0  t1  t2  t3  t4  t5  t6  t7
```

Ai tempi `t0, t1, t2, …` leggiamo il valore e **ignoriamo ciò che accade in mezzo**.

---

## Discretizzazione

Con il campionamento si effettua un'operazione di **discretizzazione** del segnale:

- si passa da un **insieme infinito** di valori a un **insieme discreto**
- tipicamente gli istanti di campionamento sono **equidistanziati**
- la distanza tra due campioni è il **periodo di campionamento** *T*
- il numero di campioni al secondo è la **frequenza di campionamento** *f = 1/T*

**Esempio**
Se campiono ogni 0,5 s → *T* = 0,5 s → *f* = 2 campioni/secondo (2 Hz).

---

## Segnale tempo-continuo

**Segnale tempo-continuo**: segnale il cui valore è significativo (e può variare) **in qualsiasi istante di tempo**.

<div class="box">

**Esempio:** la lancetta dei secondi di un orologio analogico si muove in modo fluido: in ogni istante indica una posizione precisa.

</div>

Il grafico è una **linea continua**.

---

## Segnale tempo-discreto

**Segnale tempo-discreto**: segnale il cui valore ha interesse **solo in istanti di tempo prestabiliti**, generalmente equidistanziati.

<div class="box">

**Esempio:** un sensore di temperatura che comunica il valore **una volta al minuto**. Cosa succede tra un minuto e l'altro non ci interessa (né lo sappiamo).

</div>

Il grafico è una **sequenza di punti** isolati.

---

## Mantenimento del valore (Sample & Hold)

Se **manteniamo** il valore letto per tutto l'intervallo di tempo, fino alla lettura successiva, otteniamo un segnale **a gradini**.

```text
Valore
  ^      ┌──┐
  |   ┌──┘  └──┐        ┌──┐
  |┌──┘        └──┐  ┌──┘  └──
  |               └──┘
  +──┴──┴──┴──┴──┴──┴──┴──┴──> tempo
```

Il segnale è ora composto da un'**onda rettangolare a scalini**: ogni scalino dura un periodo di campionamento.

---

## Segnale digitale

- Il segnale è un'onda rettangolare a scalini
- Abbiamo eseguito la **digitalizzazione** del segnale
- Abbiamo trasformato un **segnale analogico** in un **segnale digitale**

<div class="warn">

**Attenzione:** per essere davvero digitale, anche i **valori** (le altezze degli scalini) devono appartenere a un insieme finito. Questa operazione si chiama **quantizzazione** e la vedremo nello schema del convertitore A/D.

</div>

---

## Esempio: orologio analogico vs digitale

<div class="cols">
<div>

### Analogico
- lancette che si muovono in modo continuo
- infinite posizioni possibili
- si legge "a occhio"

</div>
<div>

### Digitale
- display con **cifre intere** (es. 14:37:52)
- il valore "salta" da 52 a 53
- lettura esatta, senza ambiguità

</div>
</div>

**Altri esempi:** tachimetro a lancetta vs. a numeri · bilancia a molla vs. bilancia elettronica · disco in vinile vs. file MP3.

---

## Definizione di segnale digitale

<div class="box">

**Definizione**
Il segnale è detto **digitale** quando i valori utili che rappresentano una grandezza fisica sono **discreti (finiti)**.

</div>

**Esempio:** un termometro digitale con risoluzione di 0,1 °C mostra 20,0 – 20,1 – 20,2 …
Non potrà mai mostrare 20,0374 °C: i valori possibili sono un insieme finito.

---

## Digitale = numerico

- In italiano il termine *digitale* è sostituito da **numerico**: rappresentato con uno (o più) **numeri**
- Il passaggio da segnale analogico a digitale si chiama **digitalizzazione**
- Un **elaboratore digitale**, per trattare dati analogici, li deve ricevere **in formato digitale**

<div class="box">

**Perché è importante?**
Un computer non può "ascoltare" un suono o "guardare" un'immagine: può solo elaborare numeri. La digitalizzazione è il ponte tra il mondo fisico e il calcolatore.

</div>

---

## Schema della digitalizzazione

Il processo complessivo (compreso il campionamento) è chiamato **digitalizzazione**:

```text
 Segnale      ┌────────────┐   ┌────────────┐   ┌─────────────┐   Segnale
 analogico ──▶│Campionamento│──▶│Quantizzazione│──▶│ Codifica    │──▶ digitale
              └────────────┘   └────────────┘   └─────────────┘   (bit)
   continuo     istanti         valori           sequenza di
   nel tempo    discreti        discreti         0 e 1
```

1. **Campionamento**: si legge il segnale a intervalli regolari
2. **Quantizzazione**: si approssima ogni lettura al livello più vicino
3. **Codifica**: si assegna a ogni livello un codice binario

---

## Convertitori A/D e D/A

<div class="cols">
<div>

### Convertitore **A/D** (ADC)
Analogico → Digitale

*Esempi:* microfono → scheda audio, sensore della fotocamera, sensore di temperatura collegato a Arduino

</div>
<div>

### Convertitore **D/A** (DAC)
Digitale → Analogico

*Esempi:* file audio → altoparlanti/cuffie, schermo che pilota la luminosità dei pixel

</div>
</div>

```text
Mondo reale ─▶ [ADC] ─▶ Computer (elabora 0 e 1) ─▶ [DAC] ─▶ Mondo reale
```

---

## Esempio numerico: quantizzazione

Un sensore misura una tensione da **0 V a 5 V**. Il convertitore ha **3 bit** → 2³ = **8 livelli**.

Passo di quantizzazione: 5 V / 8 ≈ **0,625 V**

| Tensione letta | Livello | Codice |
|:---:|:---:|:---:|
| 0,3 V | 0 | 000 |
| 1,0 V | 1 | 001 |
| 2,6 V | 4 | 100 |
| 4,9 V | 7 | 111 |

Più bit ho → più livelli → **più precisione** (ma più dati da memorizzare).

---

<!-- _class: section-break -->

# 2. Digitale o binario?

---

## Perché il calcolatore usa due soli valori?

Un calcolatore elettronico è costituito da **circuiti digitali** che eseguono operazioni tra segnali elettrici che assumono **solo due valori**.

- I segnali ammettono solo **due stati distinti**
- Serve quindi **codificare** i valori digitali usando **solo due simboli**

```text
Tensione
  5V ─┐   ┌───┐   ┌─┐
      │   │   │   │ │        livello ALTO  → 1
  0V ─┴───┘   └───┘ └──      livello BASSO → 0
```

---

## Che informazioni tratta un calcolatore?

Un calcolatore gestisce diversi tipi di informazioni:

- **Dati alfabetici** (o alfanumerici, cioè simboli lessicografici): testi, nomi, password
- **Dati numerici**: interi, decimali, importi
- **Dati multimediali**: immagini, suoni, filmati

Ognuno di essi richiede un **meccanismo di codifica specifico**, ma tutti alla fine diventano **sequenze di 0 e 1**.

---

## Cos'è la codifica

Con il termine **codifica** intendiamo il processo che assegna un **codice univoco** a tutti gli oggetti di un insieme predefinito, utilizzando un insieme di simboli chiamato **alfabeto**.

**Esempi**
| Insieme da codificare | Alfabeto usato | Esempio di codice |
|---|---|---|
| Giorni della settimana | 0, 1 | lunedì = 000 |
| Codice fiscale | lettere + cifre | RSSMRA80A01F205X |
| Alfabeto Morse | punto, linea | SOS = `... --- ...` |
| Calcolatore | **0, 1** | qualsiasi cosa! |

---

## Il bit

I simboli **0** e **1** prendono il nome di **bit**, contrazione di **b**inary dig**it**.

Spesso si usano gruppi (parole) di bit:

| Nome | Dimensione | Esempio |
|---|:---:|:---:|
| **bit** | 1 | `1` |
| **nibble** | 4 bit | `1011` |
| **byte** | 8 bit | `10110010` |

Con **1 bit** si rappresentano **due** informazioni: una associata a 0, una associata a 1.

*Esempi:* acceso/spento · vero/falso · sì/no · porta aperta/chiusa.

---

## Quante informazioni con *n* bit?

Con **3 bit** posso rappresentare **8** informazioni differenti:

<div class="cols">
<div>

| | |
|:---:|:---:|
| 000 | 100 |
| 001 | 101 |
| 010 | 110 |
| 011 | 111 |

</div>
<div>

Il numero 8 è ottenuto da **2³**:

- **2** = base (numero di simboli)
- **3** = numero di bit

<div class="box">Con <i>n</i> bit: <b>2<sup>n</sup></b> combinazioni</div>

</div>
</div>

---

## Tabella delle potenze di 2

| Bit (*n*) | Combinazioni (2ⁿ) | Esempio d'uso |
|:---:|:---:|---|
| 1 | 2 | acceso / spento |
| 2 | 4 | i 4 semi delle carte |
| 3 | 8 | 8 livelli del sensore |
| 4 | 16 | una cifra esadecimale |
| 8 | 256 | un byte (es. livelli di grigio) |
| 10 | 1 024 | |
| 16 | 65 536 | |

**Problema inverso:** quanti bit servono per codificare 30 oggetti?
2⁴ = 16 (pochi) · 2⁵ = 32 (bastano) → **5 bit**.

---

## Attenzione: digitale ≠ binario

<div class="warn">

Nella vita quotidiana i due termini sono usati (**erroneamente**) come sinonimi.

</div>

- **Digitale** → sistema **discreto**, descritto da valori non continui
- **Binario** → codifica che usa un alfabeto di **due simboli**

**Esempio:** un sistema che usa le cifre 0–9 è **digitale** (valori discreti) ma **non binario** (10 simboli). Il computer è digitale **e** binario.

Quindi: ogni sistema binario è digitale, **ma non viceversa**.

---

<!-- _class: section-break -->

# 3. Codifica in bit (binaria)

---

## Perché proprio il sistema binario?

Le ragioni sono di **carattere tecnologico**: in natura è facile distinguere due stati.

- due sono gli stati di **carica elettrica** di una sostanza
- due sono gli stati di **polarizzazione** di una sostanza magnetizzabile (hard disk)

**Esempi di supporti**
- **RAM/CPU:** transistor acceso o spento
- **Hard disk:** zona magnetizzata Nord o Sud
- **CD/DVD:** pit (buco) o land (superficie piana)
- **SSD:** carica presente o assente in una cella

---

## Trasmissione dei segnali

Nella trasmissione, i due stati possono essere rappresentati con:

- **passaggio / non passaggio di corrente** in un conduttore (cavo in rame)
- **passaggio / non passaggio di luce** in un cavo ottico (fibra)
- **onda radio** con due frequenze o fasi diverse (Wi-Fi, Bluetooth)

<div class="box">

È "comodo" rappresentare il "mondo" in binario! Due soli stati sono **semplici da realizzare**, **poco sensibili ai disturbi** e facili da rigenerare.

</div>

---

## Tutto si può codificare con due valori

Si può rappresentare **qualunque informazione** utilizzando due soli valori.

**Esempio: un mazzo di carte da scopa** (40 carte = 4 semi × 10 valori)

- I **quattro semi** si codificano con **2 bit** (2² = 4)
- Le **10 carte** si codificano con **4 bit** (2⁴ = 16 ≥ 10)

| Seme | Codice | | Carta | Codice |
|---|:---:|---|:---:|:---:|
| Cuori | `00` | | 1 (asso) | `0001` |
| Quadri | `01` | | 2 | `0010` |
| Fiori | `10` | | 4 | `0100` |
| Picche | `11` | | 7 | `0111` |

---

## Codifica di una carta: 6 bit

Ogni carta viene codificata con **6 bit** = **4 bit** (valore) + **2 bit** (seme)

```text
   valore   seme
   ┌────┐  ┌──┐
    0111    01      →  7 di quadri   = 011101
    0100    11      →  4 di picche   = 010011
    0010    10      →  2 di fiori    = 001010
    1001    00      →  9 di cuori    = 100100
```

**Verifica:** con 6 bit ho 2⁶ = 64 combinazioni, più che sufficienti per 40 carte. Le 24 rimanenti **non sono usate**.

**Provate voi:** come si codifica il 5 di cuori? *(0101 00 → `010100`)*

---

## Bit più e meno significativo

- Al bit di **posizione minore** si dà il nome di **bit meno significativo** (**LSB**, *Least Significant Bit*)
- A quello di **posizione maggiore** si dà il nome di **bit più significativo** (**MSB**, *Most Significant Bit*)

```text
   MSB                      LSB
    ↓                        ↓
    1   0   1   1   0   0   1   0
    7   6   5   4   3   2   1   0   ← posizione
```

Il **peso** cresce da destra verso sinistra: il bit di posizione *k* vale **2ᵏ**.
Cambiare l'**MSB** modifica molto il valore, cambiare l'**LSB** lo modifica poco.

---

<!-- _class: section-break -->

# 4. Rappresentazione dei dati alfabetici

---

## Cosa sono i dati alfabetici

Con dati alfabetici intendiamo:

- i **26 caratteri** dell'alfabeto anglosassone (×2: **maiuscole** e **minuscole**) → 52 simboli
- le **dieci cifre** numeriche (0–9) → 10 simboli
- **parentesi** e **operatori** (`( ) + - * / =`)
- caratteri particolari: **punteggiatura**, spazio, lettere accentate, ecc.

Totale: ben oltre 90 simboli da codificare, ciascuno con un **codice univoco**.

---

## Il codice ASCII

Tutti questi elementi possono essere codificati con **7 bit** (2⁷ = **128** simboli).

Il metodo più diffuso tra produttori di hardware e software è il codice **ASCII** (*American Standard Code for Information Interchange*).

Anche se 7 bit bastano, l'ASCII standard usa **8 bit** (1 byte), con il **primo bit sempre a 0**.

**Esempi**

| Carattere | Decimale | Binario (8 bit) |
|:---:|:---:|:---:|
| `A` | 65 | `01000001` |
| `B` | 66 | `01000010` |
| `a` | 97 | `01100001` |
| `0` | 48 | `00110000` |
| spazio | 32 | `00100000` |

---

## Curiosità sull'ASCII

- Le **maiuscole** sono in ordine: `A`=65, `B`=66, … `Z`=90
- Le **minuscole** sono a distanza 32: `a` = `A` + 32 → cambia solo **un bit** (il bit di peso 2⁵)
- Le **cifre** `'0'`…`'9'` vanno da 48 a 57 (`'5'` ≠ numero 5!)
- I codici da 0 a 31 sono **caratteri di controllo** (es. 10 = a capo, 9 = tabulazione)

**Esempio: la parola "CIAO"**

```text
C = 67 = 01000011
I = 73 = 01001001
A = 65 = 01000001
O = 79 = 01001111
```
→ **4 byte** = 32 bit

---

## Tabella ASCII (estratto)

<!-- _class: small -->

| Dec | Car | Dec | Car | Dec | Car | Dec | Car |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 32 | spazio | 48 | 0 | 65 | A | 97 | a |
| 33 | ! | 49 | 1 | 66 | B | 98 | b |
| 40 | ( | 57 | 9 | 90 | Z | 122 | z |
| 41 | ) | 61 | = | 91 | [ | 123 | { |

*La tabella completa (0–127, più i codici 128–255 dell'ASCII esteso) è riportata sul libro di testo e su* `asciitable.com`.

**Esercizio:** decodifica `01001000 01001001` → `H` (72), `I` (73) → **"HI"**.

---

## Unicode

**Unicode** è lo standard usato oggi in Internet: l'ASCII non riesce a rappresentare i caratteri accentati delle lingue europee, né tantomeno l'arabo, il cinese, il giapponese, ecc.

**Evoluzione**
1. **ASCII** a 7 bit (128 caratteri)
2. **ASCII esteso** a 8 bit (256 caratteri: aggiunge accenti e simboli)
3. **Unicode** a 16 bit (2 byte): 2¹⁶ = **65.536** possibilità

I codici **da 0 a 255** corrispondono ai codici ASCII (retrocompatibilità).

**Esempi:** `è` · `ñ` · `€` · `日` · `ب` · 😀

<div class="box">

**Nota:** oggi Unicode supera i 65.536 punti codice e usa codifiche a lunghezza variabile, come **UTF-8** (1–4 byte per carattere), la più diffusa sul web.

</div>

---

<!-- _class: section-break -->

# 5. Prefissi e multipli del byte

---

## Multipli del byte

I multipli del byte (B) si calcolano come **potenze di 2**, perché operiamo in un sistema **binario** e non decimale.

Si usano **prefissi binari** specifici, diversi da quelli del Sistema Internazionale (SI):

| Nome | Simbolo | Valore | Potenza |
|---|:---:|---:|:---:|
| kibibyte | **KiB** | 1 024 B | 2¹⁰ |
| mebibyte | **MiB** | 1 048 576 B | 2²⁰ |
| gibibyte | **GiB** | 1 073 741 824 B | 2³⁰ |
| tebibyte | **TiB** | ≈ 1,1 · 10¹² B | 2⁴⁰ |

---

## Prefissi SI vs prefissi binari

<!-- _class: small -->

| Prefisso SI (decimale) | Valore | Prefisso binario | Valore |
|---|---:|---|---:|
| kB (kilobyte) | 1 000 B | KiB (kibibyte) | 1 024 B |
| MB (megabyte) | 1 000 000 B | MiB (mebibyte) | 1 048 576 B |
| GB (gigabyte) | 10⁹ B | GiB (gibibyte) | 2³⁰ B |
| TB (terabyte) | 10¹² B | TiB (tebibyte) | 2⁴⁰ B |

<div class="warn">

**Perché il mio hard disk da "1 TB" mostra solo ~931 GB?**
Il produttore usa i prefissi **decimali** (1 TB = 10¹² B), Windows mostra i valori in **GiB** (2³⁰ B):
10¹² / 2³⁰ ≈ **931 GiB**. Non manca nulla!

</div>

---

## Esercizi svolti

**1. Quanti byte sono 4 KiB?**
4 × 1 024 = **4 096 byte**

**2. Quanti bit sono 3 byte?**
3 × 8 = **24 bit**

**3. Un testo ASCII di 2 000 caratteri quanto pesa?**
2 000 × 1 byte = 2 000 B ≈ **1,95 KiB**

**4. Quanti colori con 8 bit per pixel?**
2⁸ = **256 colori**

**5. Quanti bit per 100 città?**
2⁶ = 64 (pochi), 2⁷ = 128 (bastano) → **7 bit**

---

## Esercizi per casa

1. Quante informazioni distinte si possono rappresentare con **5 bit**? E con **12 bit**?
2. Di quanti bit hai bisogno per codificare i **12 mesi** dell'anno? E i **20 regioni italiane**?
3. Codifica con lo schema delle carte da scopa: **il 3 di picche** e **il 10 di fiori** *(ipotizza 10 = `1010`)*.
4. Scrivi in binario (ASCII, 8 bit) la parola **"TPSI"**.
5. Un file da **5 MiB** quanti byte occupa? E quanti bit?
6. Spiega con parole tue la differenza tra **segnale analogico** e **segnale digitale**, con un esempio diverso da quelli visti.

---

## Riepilogo

- Le grandezze fisiche sono **continue** → segnali **analogici**
- **Campionamento** + **quantizzazione** + **codifica** = **digitalizzazione**
- Si usano i convertitori **A/D** e **D/A**
- **Digitale** (valori discreti) ≠ **binario** (2 simboli)
- Il **bit** è l'unità minima; **8 bit = 1 byte**; con *n* bit → **2ⁿ** combinazioni
- I caratteri si codificano con **ASCII** (7/8 bit) e **Unicode**
- I multipli del byte seguono le **potenze di 2** (KiB, MiB, GiB…)

---

<!-- _class: title -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Grazie per l'attenzione

**Domande?**

Prossima lezione: sistemi di numerazione e conversioni di base
