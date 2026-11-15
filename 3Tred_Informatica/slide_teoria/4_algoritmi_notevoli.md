---
marp: true
theme: default
paginate: true
size: 16:9
header: 'Algoritmi di ricerca e ordinamento in C'
footer: 'Informatica'
style: |
  section {
    font-size: 26px;
    padding: 50px 60px;
  }
  h1 { color: #1f4e79; }
  h2 { color: #2e75b6; }
  pre { font-size: 0.72em; line-height: 1.35; }
  code { font-size: 0.95em; }
  table { font-size: 0.8em; margin: 0 auto; }
  th { background: #2e75b6; color: white; }
  .box {
    background: #eaf2fb;
    border-left: 6px solid #2e75b6;
    padding: 12px 20px;
    border-radius: 6px;
  }
  .warn {
    background: #fff4e5;
    border-left: 6px solid #f0a020;
    padding: 12px 20px;
    border-radius: 6px;
  }
  .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
  .small { font-size: 0.8em; }
  section.title {
    text-align: center;
    justify-content: center;
    background: linear-gradient(135deg, #1f4e79, #2e75b6);
    color: white;
  }
  section.title h1, section.title h2 { color: white; }
  section.dense pre { font-size: 0.6em; line-height: 1.25; }
  section.dense h1 { margin-bottom: 0.2em; }
  section.section {
    justify-content: center;
    background: #eaf2fb;
  }
---

<!-- _class: title -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Algoritmi di ricerca e ordinamento

## Linguaggio C

Ricerca sequenziale · Ricerca binaria
Selection Sort · Bubble Sort · Insertion Sort · Merge Sort

---

# Di cosa parliamo oggi

Due problemi classici dell'informatica:

1. **Ricerca** → "Il valore `x` è presente nell'array? In quale posizione?"
2. **Ordinamento** → "Metti gli elementi dell'array in ordine crescente"

<div class="box">

Sono collegati: se l'array è **ordinato**, possiamo cercare **molto più velocemente**.

</div>

Useremo: **array**, **funzioni**, **puntatori**, **ricorsione**, **stringhe**.

---

# Li usi tutti i giorni (senza saperlo)

<div class="columns">
<div>

### Ricerca
- Scrivi un nome nella **barra di ricerca** di Instagram o TikTok → l'app trova l'account tra milioni
- Cerchi una chat su **WhatsApp** → la lista si filtra mentre digiti
- Cerchi un brano su **Spotify** tra milioni di canzoni
- Nel **Wordle** o in un gioco di parole, l'app controlla se la parola esiste nel dizionario

</div>
<div>

### Ordinamento
- La **classifica** in Clash Royale, Brawl Stars o Fortnite: giocatori ordinati per trofei / punti
- Le chat di WhatsApp ordinate per **ultimo messaggio**
- Su Vinted o Amazon: **"ordina per prezzo crescente"**
- La playlist Spotify ordinata per **titolo**, **artista** o **data di aggiunta**

</div>
</div>

---

# Perché la velocità conta

Pensa ai numeri delle app che usi:

| App / gioco | Cosa deve gestire | Problema |
|---|---|---|
| Social network | **centinaia di milioni** di utenti | trovare un nome in un attimo |
| Musica in streaming | **decine di milioni** di brani | cercare mentre scrivi |
| Videogioco online | **milioni** di giocatori | aggiornare la classifica di continuo |
| Rubrica del telefono | centinaia di contatti | mostrarli in ordine alfabetico |

<div class="box">

Se l'algoritmo è lento, l'app **si blocca** o fa aspettare: e la chiudi.
Un buon algoritmo fa la differenza tra **"istantaneo"** e **"minuti di attesa"**.

</div>

<div class="small">

Le app reali usano versioni avanzate e strutture dati più complesse, ma le **idee di base** sono quelle che vediamo oggi.

</div>

---

# Un esempio: la ricerca in rubrica

Hai **500 contatti** in ordine alfabetico e cerchi **"Marco"**.

- **Metodo "uno alla volta"** (sequenziale): controllo Alessia, Andrea, Beatrice, … fino a Marco
  → anche **500 controlli**
- **Metodo "apro a metà"** (binario): parto dal contatto centrale, capisco se Marco è prima o dopo, scarto metà della lista…
  → al massimo **9 controlli**

<div class="warn">

Il secondo metodo funziona **solo perché i contatti sono ordinati**.
Ecco perché ricerca e ordinamento vanno studiati insieme!

</div>

---

# Ripasso: passare un array a una funzione

```c
void stampa(int v[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", v[i]);
    printf("\n");
}

int main(void) {
    int numeri[] = {7, 3, 9, 1, 5};
    int n = sizeof(numeri) / sizeof(numeri[0]);  // n = 5
    stampa(numeri, n);
    return 0;
}
```

- Un array viene passato **come puntatore al primo elemento** → la funzione può **modificarlo**
- La funzione **non conosce la lunghezza**: dobbiamo passare `n`

---

# Ripasso: la funzione `scambia`

La useremo in quasi tutti gli algoritmi di ordinamento.

```c
void scambia(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}
```

Uso:

```c
int v[] = {4, 8};
scambia(&v[0], &v[1]);   // ora v = {8, 4}
```

<div class="box">

Servono i **puntatori**: senza di essi la funzione scambierebbe solo delle **copie**.

</div>

---

# Come confrontiamo gli algoritmi?

Contiamo **quante operazioni** servono quando l'array ha `n` elementi.

| Notazione | Nome | Con n = 1000 servono circa... |
|---|---|---|
| O(1) | costante | 1 operazione |
| O(log n) | logaritmica | 10 operazioni |
| O(n) | lineare | 1 000 operazioni |
| O(n log n) | quasi lineare | 10 000 operazioni |
| O(n²) | quadratica | 1 000 000 operazioni |

<div class="box">

Ci interessa soprattutto il **caso peggiore**: quante operazioni servono, al massimo?

</div>

---

<!-- _class: section -->

# Parte 1
## Algoritmi di ricerca

---

# Ricerca sequenziale (lineare)

**Idea:** guardo gli elementi **uno alla volta**, dal primo all'ultimo, finché trovo quello che cerco.

<div class="columns">
<div>

Cerco `x = 9` in:

| 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| 7 | 3 | **9** | 1 | 5 |

- `v[0]=7` → no
- `v[1]=3` → no
- `v[2]=9` → **trovato!** posizione 2

</div>
<div>

**Vantaggi**
- semplicissima
- funziona anche su array **non ordinati**

**Svantaggi**
- lenta su array grandi

</div>
</div>

---

# Ricerca sequenziale: codice

```c
/* Restituisce la posizione di x nell'array, oppure -1 se non c'è */
int ricercaSequenziale(int v[], int n, int x) {
    for (int i = 0; i < n; i++) {
        if (v[i] == x)
            return i;      // trovato: esco subito
    }
    return -1;             // ho controllato tutto: non c'è
}
```

```c
int pos = ricercaSequenziale(numeri, 5, 9);
if (pos != -1)
    printf("Trovato in posizione %d\n", pos);
else
    printf("Non trovato\n");
```

<div class="box">

Si usa `-1` perché **non è mai un indice valido**.

</div>

---

# Ricerca sequenziale: quanto costa?

| Caso | Quando succede | Confronti |
|---|---|---|
| Migliore | `x` è il **primo** elemento | 1 |
| Peggiore | `x` è l'ultimo o **non c'è** | n |
| Medio | `x` è "a metà" | circa n/2 |

**Complessità: O(n)**

<div class="warn">

Con 1 milione di elementi, nel caso peggiore servono **1 milione di confronti**.

</div>

---

# Ricerca sequenziale su una stringa

Una stringa è un array di `char` che termina con `'\0'`: non serve passare `n`.

```c
/* Restituisce la posizione del primo carattere c, oppure -1 */
int cercaCarattere(char s[], char c) {
    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] == c)
            return i;
    }
    return -1;
}
```

```c
char parola[] = "informatica";
printf("%d\n", cercaCarattere(parola, 'm'));   // stampa 5
printf("%d\n", cercaCarattere(parola, 'z'));   // stampa -1
```

---

# Ricerca binaria (dicotomica)

**Idea:** come cercare una parola nel **dizionario**.
Apro a metà: se la parola viene prima, guardo solo la metà sinistra, altrimenti quella destra.

<div class="warn">

**Condizione fondamentale:** l'array deve essere **ORDINATO**.

</div>

Ad ogni passo **scarto metà** degli elementi rimasti:

1000 → 500 → 250 → 125 → 63 → 32 → 16 → 8 → 4 → 2 → 1

**Al massimo circa 10 confronti** invece di 1000!

---

# Ricerca binaria: esempio

Cerco `x = 23` in un array ordinato di 9 elementi:

| indice | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|---|
| valore | 2 | 5 | 8 | 12 | 16 | 23 | 38 | 56 | 72 |

| Passo | sx | dx | medio | v[medio] | Decisione |
|---|---|---|---|---|---|
| 1 | 0 | 8 | 4 | 16 | 23 > 16 → vado a **destra** (sx = 5) |
| 2 | 5 | 8 | 6 | 38 | 23 < 38 → vado a **sinistra** (dx = 5) |
| 3 | 5 | 5 | 5 | 23 | **trovato!** |

`medio = (sx + dx) / 2` (divisione intera)

---

# Ricerca binaria: codice iterativo

```c
int ricercaBinaria(int v[], int n, int x) {
    int sx = 0;
    int dx = n - 1;

    while (sx <= dx) {
        int medio = (sx + dx) / 2;

        if (v[medio] == x)
            return medio;          // trovato
        else if (x < v[medio])
            dx = medio - 1;        // cerco nella metà sinistra
        else
            sx = medio + 1;        // cerco nella metà destra
    }
    return -1;                     // sx > dx: intervallo vuoto, non c'è
}
```

---

# Ricerca binaria: versione ricorsiva

Il problema si riduce a **lo stesso problema su metà array** → ricorsione naturale!

```c
int ricercaBinariaRic(int v[], int sx, int dx, int x) {
    if (sx > dx)                       // caso base: intervallo vuoto
        return -1;

    int medio = (sx + dx) / 2;

    if (v[medio] == x)                 // caso base: trovato
        return medio;
    else if (x < v[medio])
        return ricercaBinariaRic(v, sx, medio - 1, x);   // metà sinistra
    else
        return ricercaBinariaRic(v, medio + 1, dx, x);   // metà destra
}
```

Prima chiamata: `ricercaBinariaRic(v, 0, n - 1, x);`

---

# Ricerca binaria: iterativa o ricorsiva?

<div class="columns">
<div>

### Ricorsiva
- traduce direttamente l'idea: *"se non l'ho trovato, cerco nella metà giusta"*
- i **casi base** (trovato / intervallo vuoto) sono ben visibili
- ogni chiamata occupa un po' di **memoria** (stack)

</div>
<div>

### Iterativa
- un ciclo `while` che aggiorna `sx` e `dx`
- **nessuna chiamata** di funzione → un po' più veloce
- usa sempre la stessa memoria

</div>
</div>

<div class="box">

C'è **una sola** chiamata ricorsiva ed è l'**ultima istruzione**: in questi casi la ricorsione si trasforma facilmente in un ciclo. Le due versioni fanno esattamente gli stessi confronti: **O(log n)**.

</div>

---

# Sequenziale vs binaria

| | Sequenziale | Binaria |
|---|---|---|
| Array ordinato? | **non serve** | **obbligatorio** |
| Caso peggiore | n confronti | circa log₂ n confronti |
| Complessità | O(n) | O(log n) |
| n = 1 000 | 1 000 | 10 |
| n = 1 000 000 | 1 000 000 | 20 |

<div class="box">

Se devo cercare **molte volte** nello stesso array, conviene **ordinarlo una volta** e poi usare la ricerca binaria.

</div>

---

<!-- _class: section -->

# Parte 2
## Algoritmi di ordinamento

---

# Il problema dell'ordinamento

**Input:** un array di `n` elementi in ordine qualsiasi
**Output:** lo stesso array con gli elementi in **ordine crescente**

```
prima:  [ 64, 25, 12, 22, 11 ]
dopo:   [ 11, 12, 22, 25, 64 ]
```

Vedremo 4 algoritmi:

| Algoritmo | Idea in una frase |
|---|---|
| **Selection Sort** | cerco il minimo e lo metto in testa |
| **Bubble Sort** | scambio i vicini fuori ordine |
| **Insertion Sort** | inserisco ogni elemento al posto giusto |
| **Merge Sort** | divido a metà, ordino, unisco (ricorsivo) |

---

# Selection Sort: l'idea

**Idea:** a ogni passata **seleziono il minimo** della parte non ordinata e lo **scambio** con il primo elemento di quella parte.

È come ordinare delle carte sul tavolo: prendo la più piccola e la metto a sinistra, poi la più piccola tra le rimaste, e così via.

<div class="box">

L'array è diviso in due parti:
**[ parte ordinata | parte da ordinare ]**
A ogni passata la parte ordinata cresce di **1 elemento**.

</div>

---

# Selection Sort: esempio

Array iniziale: `[64, 25, 12, 22, 11]`

| Passata | Minimo trovato | Scambio | Array dopo la passata |
|---|---|---|---|
| i = 0 | 11 (pos. 4) | 64 ↔ 11 | [**11** \| 25, 12, 22, 64] |
| i = 1 | 12 (pos. 2) | 25 ↔ 12 | [**11, 12** \| 25, 22, 64] |
| i = 2 | 22 (pos. 3) | 25 ↔ 22 | [**11, 12, 22** \| 25, 64] |
| i = 3 | 25 (pos. 3) | nessuno | [**11, 12, 22, 25** \| 64] |

Risultato: `[11, 12, 22, 25, 64]` ✔

L'ultimo elemento è automaticamente al posto giusto.

---

# Selection Sort: codice

```c
void selectionSort(int v[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int posMin = i;                     // suppongo che il minimo sia v[i]

        for (int j = i + 1; j < n; j++) {   // cerco nel resto dell'array
            if (v[j] < v[posMin])
                posMin = j;
        }

        if (posMin != i)
            scambia(&v[i], &v[posMin]);     // metto il minimo al suo posto
    }
}
```

- Ciclo esterno `i`: posizione da riempire
- Ciclo interno `j`: ricerca del minimo (è una **ricerca sequenziale**!)

---

# Selection Sort: analisi

Confronti: (n−1) + (n−2) + … + 1 = **n(n−1)/2**

| | |
|---|---|
| Complessità | **O(n²)** in tutti i casi |
| Scambi | al massimo **n − 1** (pochi!) |
| Pregi | semplice, pochi scambi |
| Difetti | lento anche se l'array è già ordinato |

<div class="warn">

Con n = 1000 → circa **500 000 confronti**, sempre.

</div>

---

# Bubble Sort: l'idea

**Idea:** scorro l'array e **confronto ogni coppia di elementi vicini**: se sono in ordine sbagliato li **scambio**.

Dopo la prima passata, l'elemento **più grande** è "salito" in fondo, come una **bolla** che sale in superficie.

<div class="box">

**[ parte da ordinare | parte ordinata ]**
Dopo ogni passata l'ultimo elemento della parte da ordinare è al suo posto definitivo.

</div>

---

# Bubble Sort: esempio (prima passata)

Array iniziale: `[5, 1, 4, 2, 8]`

| Confronto | Coppia | Scambio? | Array |
|---|---|---|---|
| v[0], v[1] | 5, 1 | sì | [1, 5, 4, 2, 8] |
| v[1], v[2] | 5, 4 | sì | [1, 4, 5, 2, 8] |
| v[2], v[3] | 5, 2 | sì | [1, 4, 2, 5, 8] |
| v[3], v[4] | 5, 8 | no | [1, 4, 2, 5, **8**] |

L'8 (il massimo) è arrivato in fondo.

---

# Bubble Sort: esempio (passate successive)

| Passata | Array alla fine della passata | Scambi fatti |
|---|---|---|
| 1 | [1, 4, 2, 5, **8**] | 3 |
| 2 | [1, 2, 4, **5, 8**] | 1 |
| 3 | [1, 2, **4, 5, 8**] | 0 → **mi fermo!** |

<div class="box">

**Ottimizzazione:** se in una passata **non faccio nessuno scambio**, l'array è già ordinato e posso **fermarmi subito**.

</div>

---

# Bubble Sort: codice (ottimizzato)

```c
void bubbleSort(int v[], int n) {
    int scambiato = 1;
    for (int i = 0; i < n - 1 && scambiato; i++) {
        scambiato = 0;
        for (int j = 0; j < n - 1 - i; j++) {   // gli ultimi i sono già a posto
            if (v[j] > v[j + 1]) {
                scambia(&v[j], &v[j + 1]);
                scambiato = 1;
            }
        }
    }
}
```

- `n - 1 - i`: a ogni passata il ciclo interno si accorcia
- `scambiato`: se resta 0 dopo una passata, il ciclo esterno termina

---

# Bubble Sort: analisi

| Caso | Quando | Complessità |
|---|---|---|
| Migliore | array **già ordinato** | O(n) — una sola passata |
| Peggiore | array **ordinato al contrario** | O(n²) |
| Medio | ordine casuale | O(n²) |

**Pregi:** facilissimo da capire e scrivere
**Difetti:** molti scambi, è tra i più lenti in pratica

---

<!-- _class: dense -->

# Bubble Sort su una stringa

Lo stesso algoritmo funziona anche sui caratteri (confronta i codici ASCII).

```c
#include <string.h>

void ordinaStringa(char s[]) {
    int n = strlen(s);
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (s[j] > s[j + 1]) {
                char tmp = s[j];
                s[j] = s[j + 1];
                s[j + 1] = tmp;
            }
        }
    }
}
```

```c
char parola[] = "banana";
ordinaStringa(parola);
printf("%s\n", parola);    // stampa "aaabnn"
```

---

# Insertion Sort: l'idea

**Idea:** come si ordinano le **carte in mano** a briscola o a poker.

Prendo una carta alla volta e la **inserisco al posto giusto** tra quelle che ho già in mano (già ordinate), spostando a destra quelle più grandi.

<div class="box">

**[ parte ordinata | parte da ordinare ]**
A ogni passo prendo il primo elemento della parte da ordinare e lo **inserisco** nella parte ordinata.

</div>

---

# Insertion Sort: esempio

Array iniziale: `[12, 11, 13, 5, 6]`

| Passo | Elemento da inserire | Array dopo l'inserimento |
|---|---|---|
| inizio | — | [**12** \| 11, 13, 5, 6] |
| i = 1 | 11 | [**11, 12** \| 13, 5, 6] |
| i = 2 | 13 | [**11, 12, 13** \| 5, 6] |
| i = 3 | 5 | [**5, 11, 12, 13** \| 6] |
| i = 4 | 6 | [**5, 6, 11, 12, 13**] |

Per inserire il 5: sposto a destra 13, 12, 11 e metto il 5 in posizione 0.

---

# Insertion Sort: codice

```c
void insertionSort(int v[], int n) {
    for (int i = 1; i < n; i++) {
        int chiave = v[i];       // elemento da inserire
        int j = i - 1;

        // sposto a destra gli elementi più grandi della chiave
        while (j >= 0 && v[j] > chiave) {
            v[j + 1] = v[j];
            j--;
        }

        v[j + 1] = chiave;       // inserisco la chiave nel buco libero
    }
}
```

Nota: **non usa scambi**, ma **spostamenti** (più efficienti).

---

# Insertion Sort: analisi

| Caso | Quando | Complessità |
|---|---|---|
| Migliore | array **già ordinato** | O(n) |
| Peggiore | array **ordinato al contrario** | O(n²) |
| Medio | ordine casuale | O(n²) |

**Pregi:**
- il migliore dei tre algoritmi "semplici" nella pratica
- velocissimo su array **quasi ordinati**
- ottimo quando gli elementi arrivano **uno alla volta**

---

# Merge Sort: l'idea

Strategia **"divide et impera"** (dividi e conquista):

1. **Dividi** l'array in due metà
2. **Ordina** ciascuna metà (con una chiamata **ricorsiva**!)
3. **Fondi** (*merge*) le due metà ordinate in un unico array ordinato

<div class="box">

**Caso base:** un array di **1 elemento** è già ordinato.

</div>

---

# Merge Sort: esempio

```
              [38, 27, 43, 3, 9, 82, 10]
                    /             \
DIVIDI      [38, 27, 43, 3]    [9, 82, 10]
              /       \          /      \
          [38, 27]  [43, 3]   [9, 82]   [10]
           /   \     /   \     /   \      |
         [38] [27] [43]  [3] [9]  [82]  [10]     ← casi base
           \   /     \   /     \   /      |
FONDI     [27, 38]  [3, 43]   [9, 82]   [10]
              \       /          \      /
           [3, 27, 38, 43]     [9, 10, 82]
                    \             /
              [3, 9, 10, 27, 38, 43, 82]
```

---

# La fusione (merge) di due metà ordinate

Fondo `[3, 27, 38, 43]` e `[9, 10, 82]`: confronto **i primi** di ciascuna e prendo il **più piccolo**.

| Confronto | Prendo | Risultato parziale |
|---|---|---|
| 3 vs 9 | 3 | [3] |
| 27 vs 9 | 9 | [3, 9] |
| 27 vs 10 | 10 | [3, 9, 10] |
| 27 vs 82 | 27 | [3, 9, 10, 27] |
| 38 vs 82 | 38 | [3, 9, 10, 27, 38] |
| 43 vs 82 | 43 | [3, 9, 10, 27, 38, 43] |
| sinistra finita | 82 | [3, 9, 10, 27, 38, 43, 82] |

---

# Merge Sort: la funzione `fondi`

```c
/* Fonde v[sx..m] e v[m+1..dx], già ordinati, usando l'array di appoggio tmp */
void fondi(int v[], int tmp[], int sx, int m, int dx) {
    int i = sx;        // indice metà sinistra
    int j = m + 1;     // indice metà destra
    int k = sx;        // indice in tmp

    while (i <= m && j <= dx) {          // prendo il più piccolo dei due
        if (v[i] <= v[j]) tmp[k++] = v[i++];
        else              tmp[k++] = v[j++];
    }
    while (i <= m)  tmp[k++] = v[i++];   // copio ciò che resta a sinistra
    while (j <= dx) tmp[k++] = v[j++];   // copio ciò che resta a destra

    for (k = sx; k <= dx; k++)           // ricopio il risultato in v
        v[k] = tmp[k];
}
```

`tmp[k++] = v[i++];` → copia, **poi** incrementa `k` e `i`

---

# Merge Sort: la funzione ricorsiva

```c
void mergeSortRic(int v[], int tmp[], int sx, int dx) {
    if (sx >= dx)                        // caso base: 0 o 1 elemento
        return;

    int m = (sx + dx) / 2;
    mergeSortRic(v, tmp, sx, m);         // ordino la metà sinistra
    mergeSortRic(v, tmp, m + 1, dx);     // ordino la metà destra
    fondi(v, tmp, sx, m, dx);            // unisco le due metà
}

#define MAX 100                          // dimensione massima degli array

void mergeSort(int v[], int n) {
    int tmp[MAX];                        // array di appoggio di dimensione fissa
    mergeSortRic(v, tmp, 0, n - 1);
}
```

Uso: `mergeSort(numeri, n);` con **n ≤ MAX** — stessa interfaccia degli altri algoritmi.

---

# Perché il Merge Sort è ricorsivo?

`mergeSortRic` fa **due** chiamate ricorsive, e **dopo** entrambe deve ancora fondere:

```
ordina la metà sinistra    ← chiamata 1
ordina la metà destra      ← chiamata 2
fondi le due metà          ← lavoro da fare al ritorno
```

Il programma deve **ricordarsi dove era rimasto** a ogni livello: la ricorsione lo fa in automatico grazie alla **pila delle chiamate** (*stack*).

<div class="box">

Una versione con i cicli esiste (fondo blocchi da 1, poi da 2, da 4…), ma è molto più difficile da scrivere e da leggere.
Per gli algoritmi **"divide et impera"** la ricorsione è il modo **naturale** di scriverli.

</div>

---

# Merge Sort: analisi

- L'array viene diviso a metà circa **log₂ n** volte (livelli dell'albero)
- A ogni livello la fusione tocca **tutti gli n** elementi

**Complessità: O(n log n)** in **tutti** i casi

| n | O(n²) | O(n log n) |
|---|---|---|
| 1 000 | 1 000 000 | 10 000 |
| 1 000 000 | 1 000 000 000 000 | 20 000 000 |

<div class="warn">

**Difetto:** richiede un **array di appoggio** grande quanto quello da ordinare (più memoria).

</div>

---

# Ricorsione: quanto costa?

Ogni chiamata **aperta** occupa memoria sullo stack (parametri, variabili locali, punto di ritorno). Conta la **profondità**: quante chiamate sono aperte una dentro l'altra.

| Funzione | Come si riduce il problema | Profondità con n = 1 000 000 |
|---|---|---|
| Ricerca binaria ricorsiva | si **dimezza** | circa 20 ✔ |
| Merge Sort | si **dimezza** | circa 20 ✔ |
| Ricerca sequenziale ricorsiva | **un elemento** alla volta | 1 000 000 ✘ |

<div class="warn">

Se la profondità è troppo grande lo stack si riempie e il programma va in crash: **stack overflow**.

</div>

---

# Ricorsione: quando conviene?

**Usa la ricorsione quando:**
- il problema si spezza in **sottoproblemi uguali e più piccoli**
- i sottoproblemi sono **più di uno** (es. Merge Sort: due metà)
- la dimensione **si dimezza** a ogni passo → profondità bassa

**Preferisci un ciclo quando:**
- c'è **una sola chiamata** ricorsiva, come ultima istruzione
- il problema si riduce di **un elemento alla volta** (somma di un array, ricerca sequenziale)

<div class="box">

In ogni caso: una funzione ricorsiva deve avere un **caso base** che viene sempre raggiunto, altrimenti non termina mai.

</div>

---

# Riepilogo: confronto finale

| Algoritmo | Migliore | Medio | Peggiore | Memoria extra | Ricorsivo |
|---|---|---|---|---|---|
| Selection Sort | O(n²) | O(n²) | O(n²) | no | no |
| Bubble Sort | O(n) | O(n²) | O(n²) | no | no |
| Insertion Sort | O(n) | O(n²) | O(n²) | no | no |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | **sì** | **sì** |

| Ricerca | Requisito | Complessità |
|---|---|---|
| Sequenziale | nessuno | O(n) |
| Binaria | array **ordinato** | O(log n) |

---

# Quale scegliere?

- **Array piccoli** (poche decine di elementi) → **Insertion Sort**: semplice e veloce
- **Array quasi ordinati** → **Insertion Sort** o **Bubble Sort** ottimizzato
- **Array grandi** → **Merge Sort** (O(n log n))
- **Scambi costosi** → **Selection Sort** (al massimo n − 1 scambi)
- **Molte ricerche** sugli stessi dati → **ordino una volta** + **ricerca binaria**

<div class="box">

Nella libreria standard del C esiste `qsort()` in `<stdlib.h>`, che usa un algoritmo O(n log n).

</div>

---

<!-- _class: dense -->

# Programma completo di prova

```c
#include <stdio.h>

void scambia(int *a, int *b);
void stampa(int v[], int n);
void insertionSort(int v[], int n);
int ricercaBinaria(int v[], int n, int x);

int main(void) {
    int numeri[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(numeri) / sizeof(numeri[0]);

    printf("Prima:  "); stampa(numeri, n);
    insertionSort(numeri, n);           // prova anche gli altri!
    printf("Dopo:   "); stampa(numeri, n);

    int x = 27;
    int pos = ricercaBinaria(numeri, n, x);
    printf("%d si trova in posizione %d\n", x, pos);
    return 0;
}
/* ...qui le definizioni delle funzioni viste nelle slide... */
```

Output: `Dopo: 3 9 10 27 38 43 82` — `27 si trova in posizione 3`

---

# Esercizi

1. Modifica la **ricerca sequenziale** perché restituisca **quante volte** compare `x`
2. Scrivi una ricerca sequenziale **ricorsiva**
3. Modifica Selection Sort per ordinare in ordine **decrescente**
4. Aggiungi un **contatore di scambi** a Bubble Sort e confrontalo con Selection Sort sullo stesso array
5. Ordina una **stringa** con Insertion Sort, poi cerca un carattere con la ricerca binaria
6. Esegui **a mano** Merge Sort su `[5, 2, 4, 6, 1, 3]` disegnando l'albero

---

<!-- _class: title -->
<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# Domande?

## Ricerca: trovare in fretta
## Ordinamento: preparare i dati per trovarli in fretta