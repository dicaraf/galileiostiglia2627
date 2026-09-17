---
marp: true
theme: default
paginate: true
size: 16:9
style: |
  section {
    font-size: 26px;
  }
  h1 {
    color: #1a5276;
  }
  h2 {
    color: #1a5276;
  }
  code {
    background-color: #f4f4f4;
  }
  pre {
    font-size: 20px;
  }
---

<!-- _paginate: false -->

# Array, Puntatori e Funzioni in C

### Classe 3TRED — Liceo Scientifico Scienze Applicate

Ripasso: array, puntatori, funzioni, passaggio parametri

---

## Indice degli argomenti

1. Ripasso: array in C
2. Il concetto di puntatore
3. Puntatori e array
4. Funzioni: prototipo e uso
5. Passaggio parametri: **per valore** vs **per riferimento**
6. Esempi completi (variabili semplici, poi array)
7. Errori comuni e cose da **non** fare
8. Le stringhe in C e la libreria `string.h`
9. Errori comuni con le stringhe
10. Le matrici in C (array bidimensionali)
11. Matrici come insieme di stringhe
12. Errori comuni con le matrici

---

# 1. Ripasso: Array in C

---

## Cos'è un array

Un **array** è una sequenza di elementi dello **stesso tipo**, memorizzati in posizioni di memoria **contigue** (una attaccata all'altra).

```c
int voti[5];              // dichiarazione: array di 5 interi
int numeri[5] = {10, 20, 30, 40, 50};  // dichiarazione + inizializzazione
```

- Gli indici partono da **0**
- `numeri[0]` → 10, `numeri[4]` → 50 (ultimo elemento)
- La dimensione dell'array **deve essere nota** (costante) alla dichiarazione

---

## Accesso agli elementi

```c
#include <stdio.h>

int main(void) {
    int numeri[5] = {10, 20, 30, 40, 50};

    for (int i = 0; i < 5; i++) {
        printf("numeri[%d] = %d\n", i, numeri[i]);
    }

    numeri[2] = 99;   // modifico il terzo elemento
    printf("Nuovo valore: %d\n", numeri[2]);

    return 0;
}
```

⚠️ In C **non esiste controllo automatico dei limiti**: scrivere `numeri[10]` non dà errore a compile-time, ma è un comportamento indefinito (bug pericoloso!).

---

## Array in memoria: punto chiave

Un array occupa un **blocco continuo di memoria**.

```
indice:      0     1     2     3     4
valore:    [10]  [20]  [30]  [40]  [50]
indirizzo: 1000  1004  1008  1012  1016   (esempio, int = 4 byte)
```

- Passando da un elemento al successivo, l'indirizzo aumenta di `sizeof(tipo)` byte
- Questo fatto è **fondamentale** per capire il legame tra array e puntatori (prossima sezione!)

---

# 2. Il concetto di puntatore

---

## Cos'è la memoria (in breve)

Ogni variabile che dichiariamo viene salvata da qualche parte nella **RAM**.

Ogni "casella" di memoria ha:

- un **indirizzo** (un numero che la identifica, come il numero civico di una casa)
- un **contenuto** (il valore salvato in quella casella)

```
Indirizzo:   0x7ffee3a1c05c
Contenuto:   42
```

Finora, per usare una variabile, abbiamo sempre pensato al suo **valore** (42).
Un puntatore ci permette invece di lavorare con il suo **indirizzo**.

---

## Definizione di puntatore

> Un **puntatore** è una variabile che **non contiene un valore "normale"**, ma **contiene l'indirizzo di memoria** di un'altra variabile.

Se ho una variabile:

```c
int x = 42;
```

`x` è come una scatola etichettata che contiene il valore 42.

Un puntatore a `x` è un'altra variabile che, invece del valore 42, contiene **l'indirizzo della scatola x**.

📌 Pensala così: il puntatore non è "il numero 42", è **"dove si trova"** il numero 42 in memoria.

---

## I due operatori fondamentali

| Operatore | Nome | Significato |
|---|---|---|
| `&` | "indirizzo di" | Restituisce l'indirizzo di una variabile |
| `*` | "valore puntato da" (dereferenziazione) | Restituisce il contenuto presente all'indirizzo memorizzato nel puntatore |

```c
int x = 42;
int *p;      // p è un puntatore a intero (per ora non punta a niente di valido)

p = &x;      // ora p contiene l'indirizzo di x
```

⚠️ Attenzione: `*` ha **due significati diversi** in C:
- nella **dichiarazione** (`int *p;`) indica "p è un puntatore"
- nell'**uso** (`*p`) indica "vai a leggere/scrivere il valore all'indirizzo contenuto in p"

---

## Esempio: dichiarare e usare un puntatore

```c
#include <stdio.h>

int main(void) {
    int x = 42;
    int *p;       // dichiaro un puntatore a intero

    p = &x;       // p ora "punta a" x, cioè contiene l'indirizzo di x

    printf("Valore di x:            %d\n", x);
    printf("Indirizzo di x (&x):    %p\n", (void*)&x);
    printf("Valore di p (indirizzo):%p\n", (void*)p);
    printf("Valore puntato da p:    %d\n", *p);  // dereferenziazione -> 42

    return 0;
}
```

`%p` è il format specifier per stampare un **indirizzo di memoria** (va sempre convertito a `void*`).

---

## Output tipico (gli indirizzi variano ad ogni esecuzione!)

```
Valore di x:             42
Indirizzo di x (&x):     0x7ffee3a1c05c
Valore di p (indirizzo): 0x7ffee3a1c05c
Valore puntato da p:     42
```

✅ Nota che **l'indirizzo di x** e **il valore contenuto in p** sono **identici**: è proprio questo il senso di "p punta a x".

---

## Modificare una variabile tramite puntatore

```c
#include <stdio.h>

int main(void) {
    int x = 42;
    int *p = &x;

    printf("Prima:  x = %d\n", x);

    *p = 100;    // modifico il valore puntato da p -> modifico direttamente x!

    printf("Dopo:   x = %d\n", x);

    return 0;
}
```

Output:
```
Prima:  x = 42
Dopo:   x = 100
```

💡 `*p = 100` **non cambia dove punta p**, cambia il **contenuto della cella di memoria** puntata da p, che è la stessa cella occupata da `x`.

---

## Riassunto visivo

```c
int x = 42;
int *p = &x;
```

```
   memoria                indirizzo
  ┌────────┐
x │   42   │   <----- 0x100
  └────────┘
  ┌────────┐
p │ 0x100  │   <----- 0x200   (p contiene l'indirizzo di x)
  └────────┘
```

- `x`     → 42
- `&x`    → 0x100 (indirizzo di x)
- `p`     → 0x100 (perché p = &x)
- `*p`    → 42 (vado all'indirizzo 0x100 e leggo il contenuto)

---

# 3. Puntatori e Array

---

## Il nome di un array è (quasi) un puntatore

In C, quando usi il nome di un array senza indice, questo viene automaticamente convertito nell'**indirizzo del suo primo elemento**.

```c
int numeri[5] = {10, 20, 30, 40, 50};
int *p = numeri;      // equivalente a: int *p = &numeri[0];

printf("%p\n", (void*)numeri);     // indirizzo del primo elemento
printf("%p\n", (void*)&numeri[0]); // stesso indirizzo!
printf("%d\n", *p);                // 10 (primo elemento)
```

⚠️ Attenzione: `numeri` **non è una variabile puntatore** modificabile come `p` (non puoi scrivere `numeri = ...`), ma **si comporta come un puntatore costante** al primo elemento.

---

## Aritmetica dei puntatori

Sommare 1 a un puntatore **non aggiunge 1 byte**, ma fa avanzare il puntatore di `sizeof(tipo)` byte, cioè lo sposta **all'elemento successivo**.

```c
int numeri[5] = {10, 20, 30, 40, 50};
int *p = numeri;

printf("%d\n", *p);       // 10  (numeri[0])
printf("%d\n", *(p + 1)); // 20  (numeri[1])
printf("%d\n", *(p + 2)); // 30  (numeri[2])

p++;                       // ora p punta a numeri[1]
printf("%d\n", *p);       // 20
```

📌 In generale: `numeri[i]` è **equivalente** a `*(numeri + i)`.

---

## Scorrere un array con puntatori vs indici

```c
#include <stdio.h>

int main(void) {
    int numeri[5] = {10, 20, 30, 40, 50};

    // Metodo classico (con indice)
    for (int i = 0; i < 5; i++) {
        printf("%d ", numeri[i]);
    }
    printf("\n");

    // Metodo con puntatori
    int *p = numeri;
    for (int i = 0; i < 5; i++) {
        printf("%d ", *(p + i));
    }
    printf("\n");

    return 0;
}
```

Entrambi i cicli stampano lo stesso risultato: `10 20 30 40 50`.

---

# 4. Funzioni in C

---

## Perché usare le funzioni

Le funzioni servono a **spezzare un programma** in blocchi più piccoli, riutilizzabili e più facili da capire e testare.

Una funzione ha bisogno di:

1. **Prototipo** (dichiarazione): dice al compilatore come si chiama la funzione, cosa restituisce, quali parametri accetta
2. **Definizione**: contiene il codice effettivo
3. **Chiamata**: il punto in cui la funzione viene eseguita

---

## Prototipo di funzione

Il prototipo si scrive di solito **prima del `main`**, per informare il compilatore prima ancora di vedere la definizione completa.

```c
tipo_ritorno nome_funzione(tipo_param1, tipo_param2, ...);
```

Esempio:

```c
int somma(int a, int b);        // prototipo: restituisce int, prende due int
void stampaMessaggio(void);     // prototipo: non restituisce nulla, non prende parametri
```

Il prototipo termina con **punto e virgola** (non ha corpo).

---

## Definizione e chiamata

```c
#include <stdio.h>

int somma(int a, int b);   // prototipo

int main(void) {
    int risultato = somma(3, 5);   // chiamata alla funzione
    printf("Risultato: %d\n", risultato);
    return 0;
}

// definizione (può stare anche dopo il main, grazie al prototipo)
int somma(int a, int b) {
    return a + b;
}
```

`a` e `b` sono i **parametri formali**; `3` e `5` sono gli **argomenti** passati nella chiamata.

---

# 5. Passaggio dei parametri

## Per valore vs per riferimento

---

## Passaggio per valore: il concetto

In C, **di default**, i parametri vengono passati **per valore**:

> Quando chiami una funzione, viene creata una **copia** del valore dell'argomento. La funzione lavora sulla copia, **non sull'originale**.

Conseguenza pratica: **qualsiasi modifica fatta dentro la funzione al parametro NON si riflette sulla variabile originale** nel chiamante.

---

## Esempio completo: passaggio per VALORE (variabile semplice)

```c
#include <stdio.h>

void raddoppia(int n);   // prototipo

int main(void) {
    int x = 10;
    printf("Prima della chiamata:  x = %d\n", x);

    raddoppia(x);   // passo il VALORE di x (una copia)

    printf("Dopo la chiamata:      x = %d\n", x);
    return 0;
}

void raddoppia(int n) {
    n = n * 2;                          // modifico solo la copia locale n
    printf("Dentro la funzione:    n = %d\n", n);
}
```

---

## Output e spiegazione

```
Prima della chiamata:  x = 10
Dentro la funzione:    n = 20
Dopo la chiamata:      x = 10
```

- `n` è una **copia locale** di `x`, con un proprio indirizzo di memoria diverso da quello di `x`
- Modificare `n` modifica solo quella copia
- Quando la funzione termina, `n` viene distrutta e `x` **resta invariato**

```
  main            raddoppia
 ┌─────┐          ┌─────┐
 │x=10 │  copia →  │n=10→20│
 └─────┘          └─────┘
 indirizzo A      indirizzo B (diverso!)
```

---

## Passaggio per riferimento: il concetto

Per far sì che una funzione possa **modificare davvero** la variabile del chiamante, bisogna passarle **l'indirizzo** della variabile, cioè un **puntatore**.

> Passaggio "per riferimento" in C = passare **l'indirizzo** di una variabile (con `&`) a un parametro che è un **puntatore** (`*`).

La funzione, dereferenziando il puntatore (`*p`), può leggere **e scrivere** direttamente sulla variabile originale.

---

## Esempio completo: passaggio per RIFERIMENTO (variabile semplice)

```c
#include <stdio.h>

void raddoppia(int *n);   // prototipo: parametro puntatore

int main(void) {
    int x = 10;
    printf("Prima della chiamata:  x = %d\n", x);

    raddoppia(&x);   // passo l'INDIRIZZO di x

    printf("Dopo la chiamata:      x = %d\n", x);
    return 0;
}

void raddoppia(int *n) {
    *n = *n * 2;      // modifico il valore ALL'INDIRIZZO puntato da n -> modifico x!
    printf("Dentro la funzione:    *n = %d\n", *n);
}
```

---

## Output e spiegazione

```
Prima della chiamata:  x = 10
Dentro la funzione:    *n = 20
Dopo la chiamata:      x = 20
```

- Questa volta `n` **non è una copia di x**: `n` contiene l'**indirizzo** di `x`
- `*n = *n * 2` significa: "vai all'indirizzo memorizzato in `n` (che è quello di `x`) e raddoppia il valore lì contenuto"
- Il risultato è visibile anche in `main`, perché abbiamo modificato **la stessa cella di memoria**

```
  main               raddoppia
 ┌───────┐           ┌────────────┐
 │x=10→20│ <───────── │n = &x      │
 └───────┘  stesso    └────────────┘
 indirizzo A indirizzo   n contiene A
```

---

## Confronto riassuntivo

| | **Per valore** | **Per riferimento** |
|---|---|---|
| Cosa viene passato | una **copia** del valore | l'**indirizzo** (puntatore) |
| Parametro nel prototipo | `int n` | `int *n` |
| Chiamata | `funzione(x)` | `funzione(&x)` |
| Accesso nel corpo | `n` | `*n` |
| La funzione può modificare l'originale? | ❌ No | ✅ Sì |
| Memoria occupata | nuova cella indipendente | condivide la cella con l'originale |

---

# Passaggio di ARRAY alle funzioni

---

## Un caso particolare importante

Quando passi un **array** a una funzione, in C **passi sempre, di fatto, un puntatore** al primo elemento (perché il nome dell'array *è* un puntatore, come visto prima).

> 📌 Gli array vengono **sempre passati "per riferimento"**, anche se non si usa esplicitamente `&` o `*` nella chiamata!

Questo significa che una funzione **può sempre modificare gli elementi di un array ricevuto**, a differenza di quanto avviene con una singola variabile passata per valore.

---

## Esempio completo: modificare un array in una funzione

```c
#include <stdio.h>

void raddoppiaArray(int arr[], int dimensione);  // prototipo

int main(void) {
    int numeri[5] = {1, 2, 3, 4, 5};

    printf("Prima: ");
    for (int i = 0; i < 5; i++) printf("%d ", numeri[i]);
    printf("\n");

    raddoppiaArray(numeri, 5);   // passo l'array (= indirizzo del 1° elemento)

    printf("Dopo:  ");
    for (int i = 0; i < 5; i++) printf("%d ", numeri[i]);
    printf("\n");

    return 0;
}

void raddoppiaArray(int arr[], int dimensione) {
    for (int i = 0; i < dimensione; i++) {
        arr[i] = arr[i] * 2;   // modifico direttamente gli elementi originali!
    }
}
```

---

## Output

```
Prima: 1 2 3 4 5
Dopo:  2 4 6 8 10
```

- `arr` nella funzione punta **alla stessa zona di memoria** dell'array `numeri` in `main`
- Non c'è nessuna copia dell'array: `arr[i] = ...` scrive direttamente sui dati originali
- Ecco perché, quando si passa un array, si passa **sempre di fatto anche la sua dimensione** come parametro separato (l'array "dimentica" quanto è lungo una volta passato alla funzione!)

---

## Equivalenza tra notazioni

Il prototipo:

```c
void raddoppiaArray(int arr[], int dimensione);
```

è **equivalente** a scrivere:

```c
void raddoppiaArray(int *arr, int dimensione);
```

Sono due modi diversi di dire la stessa cosa: **"arr è un puntatore a int"**.
Dentro la funzione puoi usare sia `arr[i]` sia `*(arr + i)`: sono identici.

---

## Esempio completo finale: funzione che calcola la somma di un array

```c
#include <stdio.h>

int sommaArray(int arr[], int dimensione);  // prototipo, sola lettura -> non modifica

int main(void) {
    int voti[4] = {7, 8, 6, 9};

    int totale = sommaArray(voti, 4);
    printf("Somma dei voti: %d\n", totale);
    printf("Media: %.2f\n", (float)totale / 4);

    return 0;
}

int sommaArray(int arr[], int dimensione) {
    int somma = 0;
    for (int i = 0; i < dimensione; i++) {
        somma += arr[i];
    }
    return somma;   // qui NON modifico l'array, restituisco solo un valore
}
```

💡 Anche se l'array è passato "per riferimento", una funzione può scegliere di **non modificarlo** e restituire semplicemente un risultato con `return`.

---

## Buona pratica: `const` per array non modificabili

Se una funzione riceve un array ma **non deve modificarlo**, è buona pratica dichiararlo `const`:

```c
int sommaArray(const int arr[], int dimensione);
```

Il compilatore darà **errore** se, per sbaglio, scrivi `arr[i] = ...` dentro la funzione.
Questo rende il codice più sicuro e più chiaro da leggere.

---

# 6. Errori comuni e cose da NON fare

### (con puntatori e con array)

---

## Errore 1: puntatore non inizializzato ("wild pointer")

```c
int *p;        // p contiene un indirizzo A CASO (memoria non inizializzata)
*p = 10;       // ERRORE GRAVE: sto scrivendo in una zona di memoria
               // che non conosco e che non mi appartiene!
```

- Il programma **potrebbe** funzionare per caso, **potrebbe** andare in crash (*segmentation fault*), o **potrebbe** corrompere altri dati: è **comportamento indefinito**
- ✅ Corretto: inizializza sempre il puntatore, o fallo puntare a `NULL` finché non è pronto

```c
int *p = NULL;     // esplicitamente "non punta a niente"
if (p != NULL) {   // controllo prima di usarlo
    *p = 10;
}
```

---

## Errore 2: assegnare un numero a caso come indirizzo

```c
int *p;
p = 1000;      // SBAGLIATO: 1000 non è un indirizzo valido gestito dal tuo programma
*p = 5;        // quasi certamente CRASH (segmentation fault)
```

- Un indirizzo valido si ottiene **solo** con `&variabile`, con `malloc`, o dal nome di un array
- Il compilatore in genere segnala un **warning/errore di tipi incompatibili** se provi a scrivere codice simile

---

## Errore 3: confondere il puntatore con il valore puntato

```c
int x = 10;
int *p = &x;

p = 20;      // SBAGLIATO: sto dicendo "fai puntare p all'indirizzo 20"
             // (quasi certamente non valido!) -> errore di compilazione/warning

*p = 20;     // CORRETTO: modifico il VALORE puntato da p, cioè modifico x
```

📌 Dimenticare la `*` è **l'errore più frequente** quando si iniziano a usare i puntatori: `p` è l'indirizzo, `*p` è il contenuto.

---

## Errore 4: puntatore "penzolante" (dangling pointer)

```c
int *creaPuntatore(void) {
    int locale = 42;
    return &locale;   // ERRORE CONCETTUALE: locale viene distrutta
                       // alla fine della funzione!
}

int main(void) {
    int *p = creaPuntatore();
    printf("%d\n", *p);  // comportamento indefinito: p punta a memoria
                          // che non esiste più!
    return 0;
}
```

✅ Le variabili locali "muoiono" quando la funzione termina: **non restituire mai l'indirizzo di una variabile locale**.

---

## Errore 5: `&x` non è un contenitore in cui scrivere

```c
int x = 10;

&x = 20;   // ERRORE DI COMPILAZIONE
           // &x è solo un valore calcolato (l'indirizzo di x),
           // non una "scatola" in cui posso mettere qualcosa
```

`&x` si può **leggere** (usare come valore), ma non è una variabile: non puoi assegnargli nulla, così come non puoi scrivere `(3 + 2) = 10;`.

---

## Errore 6 (array): non si può riassegnare un array

```c
int numeri[5] = {1, 2, 3, 4, 5};
int altri[5]  = {10, 20, 30, 40, 50};

numeri = altri;   // ERRORE DI COMPILAZIONE
                  // il nome di un array non è una variabile puntatore
                  // modificabile: non posso farlo "puntare altrove"
```

✅ Per copiare il contenuto bisogna farlo **elemento per elemento** (o con `memcpy`):

```c
for (int i = 0; i < 5; i++) {
    numeri[i] = altri[i];
}
```

---

## Errore 7 (array): accesso fuori dai limiti

```c
int numeri[5] = {1, 2, 3, 4, 5};

numeri[5] = 100;    // ERRORE: gli indici validi vanno da 0 a 4!
numeri[-1] = 50;    // ERRORE anche questo, indice negativo
```

⚠️ Il compilatore **di solito non segnala nulla**: il programma compila ed esegue, ma va a scrivere in memoria **non sua**, con effetti imprevedibili (dati corrotti, crash, bug difficili da trovare).

📌 In C, **sei tu** il responsabile di controllare che l'indice resti nel range valido.

---

## Errore 8 (array): la trappola di `sizeof` con gli array in funzione

```c
void stampaDimensione(int arr[]) {
    // ATTENZIONE: qui "arr" è in realtà un PUNTATORE!
    printf("Dentro la funzione: %lu byte\n", sizeof(arr));
}

int main(void) {
    int numeri[5] = {1, 2, 3, 4, 5};
    printf("Nel main: %lu byte\n", sizeof(numeri));  // 20 byte (5 * 4)

    stampaDimensione(numeri);  // stampa 8 byte (dimensione di un puntatore!)
    return 0;
}
```

📌 Una volta passato a una funzione, l'array **"decade"** a puntatore e **perde l'informazione sulla propria dimensione**: ecco perché la dimensione va sempre passata come parametro separato!

---

## Errore 9 (array): modificare un array dichiarato `const`

```c
void stampa(const int arr[], int n) {
    arr[0] = 100;   // ERRORE DI COMPILAZIONE
                     // arr è const: il compilatore impedisce la modifica
}
```

Questo è in realtà un errore "voluto e utile": `const` serve proprio a **farsi proteggere dal compilatore** quando una funzione non deve modificare l'array ricevuto.

---

## Riepilogo degli errori da evitare

| Errore | Perché è sbagliato |
|---|---|
| `*p = 10;` con `p` non inizializzato | scrivo in una zona di memoria sconosciuta |
| `p = 1000;` | 1000 non è un indirizzo valido |
| `p = 20;` invece di `*p = 20;` | confondo l'indirizzo con il valore |
| `return &localVar;` | l'indirizzo restituito non è più valido |
| `&x = 20;` | `&x` non è un contenitore scrivibile |
| `numeri = altri;` | il nome di un array non è riassegnabile |
| `numeri[5] = ...` (array di 5 elem.) | accesso fuori dai limiti |
| `sizeof(arr)` dentro una funzione | l'array è "decaduto" a puntatore |
| modificare un `const int arr[]` | violazione volontaria della protezione `const` |

---

# 8. Le stringhe in C

---

## Cos'è una stringa in C

In C **non esiste un tipo `string`** come in altri linguaggi: una stringa è semplicemente...

> Un **array di caratteri (`char`)**, che termina sempre con un carattere speciale chiamato **carattere di terminazione nullo**: `'\0'`.

```c
char nome[6] = {'M', 'a', 'r', 'c', 'o', '\0'};   // scrittura esplicita
char nome2[6] = "Marco";                          // scrittura equivalente e più comoda
```

⚠️ `'\0'` è **fondamentale**: tutte le funzioni della libreria standard lo usano per capire **dove finisce** la stringa. Senza `'\0'` non sapremmo mai dove fermarci a leggere!

---

## Dichiarazione e inizializzazione

```c
char saluto[20] = "Ciao";     // array di 20 char, i primi 5 usati: C,i,a,o,'\0'
char saluto2[] = "Ciao";      // dimensione calcolata automaticamente: 5 (4 lettere + '\0')

char *puntatore = "Ciao";     // puntatore a una stringa costante (letterale)
```

- `saluto` e `saluto2` sono **array modificabili**: posso cambiare i singoli caratteri
- `puntatore` punta a una stringa **letterale**, che **non va modificata** (comportamento indefinito se ci provi!)

```
saluto:  ['C']['i']['a']['o']['\0'][ ][ ]...  (20 celle, ma la stringa "vera" finisce a '\0')
```

---

## Accedere e modificare i caratteri

Una stringa è un array, quindi si accede **con gli indici**, come già visto per gli array:

```c
#include <stdio.h>

int main(void) {
    char parola[] = "gatto";

    printf("Prima lettera: %c\n", parola[0]);   // 'g'
    printf("Stringa intera: %s\n", parola);      // %s stampa fino a '\0'

    parola[0] = 'G';    // modifico il primo carattere
    printf("Dopo: %s\n", parola);                // "Gatto"

    return 0;
}
```

📌 `%s` in `printf`/`scanf` serve **appositamente** per stringhe (array di `char` terminati da `'\0'`).

---

## La libreria `string.h`

Il C mette a disposizione una libreria di funzioni pronte per lavorare con le stringhe:

```c
#include <string.h>
```

| Funzione | Cosa fa |
|---|---|
| `strlen(s)` | restituisce la **lunghezza** della stringa (senza contare `'\0'`) |
| `strcpy(dest, src)` | **copia** `src` dentro `dest` |
| `strcat(dest, src)` | **concatena** (attacca) `src` alla fine di `dest` |
| `strcmp(s1, s2)` | **confronta** due stringhe (0 se uguali) |
| `strncpy`, `strncat`, `strncmp` | versioni "sicure" con limite di caratteri |

---

## `strlen`: la lunghezza di una stringa

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char testo[] = "Programmazione";

    int lunghezza = strlen(testo);
    printf("La stringa \"%s\" è lunga %d caratteri\n", testo, lunghezza);

    return 0;
}
```

Output:
```
La stringa "Programmazione" è lunga 14 caratteri
```

📌 `strlen` **non conta** il carattere `'\0'` finale, anche se in memoria occupa comunque uno spazio in più.

---

## `strcpy`: copiare una stringa

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char origine[] = "Ciao mondo";
    char destinazione[20];       // deve essere abbastanza grande!

    strcpy(destinazione, origine);

    printf("Copiata: %s\n", destinazione);
    return 0;
}
```

⚠️ Non si può copiare una stringa con `destinazione = origine;` (come per gli array, non è consentito): bisogna usare `strcpy`, oppure copiare carattere per carattere.

---

## `strcat`: concatenare stringhe

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char nomeCompleto[30] = "Mario";   // deve avere spazio SUFFICIENTE!

    strcat(nomeCompleto, " ");         // aggiungo uno spazio
    strcat(nomeCompleto, "Rossi");     // aggiungo il cognome

    printf("%s\n", nomeCompleto);      // "Mario Rossi"
    return 0;
}
```

📌 `strcat` scrive **alla fine** della prima stringa (dove trova `'\0'`), quindi `nomeCompleto` deve avere **spazio libero sufficiente** per contenere anche ciò che viene aggiunto.

---

## `strcmp`: confrontare stringhe

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char a[] = "mela";
    char b[] = "mela";
    char c[] = "pera";

    printf("%d\n", strcmp(a, b));   // 0  -> le stringhe sono UGUALI
    printf("%d\n", strcmp(a, c));   // valore < 0 (o > 0, dipende dall'implementazione)
                                      // comunque DIVERSO da 0 -> stringhe diverse

    return 0;
}
```

⚠️ **Non si possono confrontare le stringhe con `==`!**

```c
if (a == b) { ... }       // SBAGLIATO: confronta INDIRIZZI, non contenuti!
if (strcmp(a, b) == 0) { ... }  // CORRETTO: confronta il CONTENUTO
```

---

## Leggere una stringa da input

```c
#include <stdio.h>

int main(void) {
    char nome[50];

    printf("Inserisci il tuo nome: ");
    scanf("%s", nome);     // NIENTE & davanti a nome! (è già un array/indirizzo)

    printf("Ciao, %s!\n", nome);
    return 0;
}
```

📌 Con `scanf("%s", nome)` **non si mette `&`** davanti a `nome`, perché il nome di un array **è già** un indirizzo (a differenza di `scanf("%d", &numero)` con una variabile semplice).

⚠️ `scanf("%s", ...)` si ferma al primo spazio: per leggere frasi intere si usa `fgets`.

---

## Stringhe e funzioni: esempio completo

```c
#include <stdio.h>
#include <string.h>

void stampaMaiuscolo(char testo[]);   // prototipo

int main(void) {
    char frase[] = "ciao a tutti";

    stampaMaiuscolo(frase);   // passo l'array (= indirizzo, come già visto per gli array)

    return 0;
}

void stampaMaiuscolo(char testo[]) {
    for (int i = 0; testo[i] != '\0'; i++) {     // scorro FINO al terminatore
        if (testo[i] >= 'a' && testo[i] <= 'z') {
            testo[i] = testo[i] - 'a' + 'A';      // converto in maiuscolo
        }
    }
    printf("%s\n", testo);
}
```

Output: `CIAO A TUTTI` — e la modifica è visibile anche in `main`, perché l'array è passato per riferimento (come già visto!).

---

# 9. Errori comuni con le stringhe

---

## Errore 1: buffer troppo piccolo (*buffer overflow*)

```c
char nome[5];
strcpy(nome, "Alessandro");   // ERRORE: "Alessandro" + '\0' = 11 byte,
                                // ma "nome" ne ha solo 5!
```

- `strcpy` **non controlla** se `dest` è abbastanza grande: scrive comunque, **scavalcando** i limiti dell'array
- Risultato: **comportamento indefinito**, dati corrotti, crash, o — nei casi peggiori — vulnerabilità di sicurezza

✅ Alternativa più sicura: `strncpy(nome, "Alessandro", sizeof(nome) - 1);` e poi assicurarsi di terminare la stringa con `'\0'` a mano.

---

## Errore 2: dimenticare lo spazio per `'\0'`

```c
char abbr[4] = {'c', 'i', 'a', 'o'};  // ERRORE: manca lo spazio per '\0'!
printf("%s\n", abbr);                  // comportamento indefinito:
                                         // printf continuerà a leggere oltre
                                         // l'array finché non trova un '\0' a caso
```

📌 Un array di `n` caratteri "utili" deve sempre avere **almeno `n + 1` celle**, per lasciare spazio al terminatore.

```c
char abbr[5] = "ciao";   // CORRETTO: 4 lettere + '\0' = 5 celle
```

---

## Errore 3: confrontare le stringhe con `==`

```c
char a[] = "casa";
char b[] = "casa";

if (a == b) {
    printf("Sono uguali\n");
} else {
    printf("Sono diverse\n");   // <-- questo viene stampato!
}
```

- `a == b` confronta **gli indirizzi** dei due array (che sono diversi, perché sono due array distinti), **non** il contenuto
- ✅ Usa sempre `strcmp(a, b) == 0` per confrontare il **contenuto** di due stringhe

---

## Errore 4: modificare una stringa letterale costante

```c
char *s = "ciao";    // s punta a una stringa LETTERALE (costante)
s[0] = 'C';           // ERRORE: comportamento indefinito (spesso: crash!)
```

- Le stringhe scritte tra virgolette (`"ciao"`) sono spesso salvate in un'area di memoria **di sola lettura**
- ✅ Se devi modificare la stringa, usa un **array**, non un puntatore a stringa letterale:

```c
char s[] = "ciao";   // CORRETTO: copia modificabile in uno spazio tutto suo
s[0] = 'C';           // ora va bene: "Ciao"
```

---

## Errore 5: `&` di troppo (o mancante) con `scanf`

```c
char nome[20];
int eta;

scanf("%s", &nome);    // ERRORE (concettuale): nome è già un indirizzo!
                          // &nome è "l'indirizzo dell'array", tecnicamente
                          // funziona per un caso fortunato ma è comunque scorretto
                          // e il compilatore spesso avvisa con un warning

scanf("%d", eta);      // ERRORE: manca la & !! eta è una variabile semplice,
                          // serve il suo INDIRIZZO per poterla scrivere
```

✅ Corretto:
```c
scanf("%s", nome);     // niente & : nome è già un array/indirizzo
scanf("%d", &eta);     // & necessaria: eta è una variabile semplice
```

---

## Errore 6: `strcat`/`strcpy` senza spazio sufficiente per il risultato finale

```c
char messaggio[10] = "Ciao";
strcat(messaggio, " a tutti!");  // ERRORE: "Ciao a tutti!" + '\0' = 15 byte,
                                    // ma "messaggio" ne ha solo 10!
```

📌 Prima di usare `strcat` o `strcpy`, **calcola sempre** se l'array di destinazione è abbastanza grande da contenere il risultato **completo**, `'\0'` incluso.

---

## Riepilogo degli errori tipici con le stringhe

| Errore | Perché è sbagliato |
|---|---|
| `strcpy`/`strcat` su un array troppo piccolo | *buffer overflow*: scrivo oltre i limiti dell'array |
| Dimenticare lo spazio per `'\0'` | le funzioni non sanno più dove finisce la stringa |
| `if (s1 == s2)` | confronto tra indirizzi, non tra contenuti |
| Modificare `char *s = "letterale";` | stringa letterale spesso di sola lettura |
| `scanf("%s", &nome)` con array | `&` di troppo: il nome dell'array è già un indirizzo |
| `scanf("%d", eta)` senza `&` | manca l'indirizzo per una variabile semplice |

---

# 10. Le matrici in C

### (array bidimensionali)

---

## Cos'è una matrice

Una **matrice** in C è semplicemente un **array bidimensionale**: un array "di array", organizzato in **righe** e **colonne**.

```c
int matrice[3][4];   // matrice con 3 righe e 4 colonne (12 elementi in tutto)
```

```
          colonna 0  colonna 1  colonna 2  colonna 3
riga 0  [    ?          ?          ?          ?    ]
riga 1  [    ?          ?          ?          ?    ]
riga 2  [    ?          ?          ?          ?    ]
```

Come per gli array "semplici", gli indici partono sempre da **0**.

---

## Inizializzazione

```c
int matrice[2][3] = {
    {1, 2, 3},     // riga 0
    {4, 5, 6}      // riga 1
};

// equivalente (meno leggibile) a:
int matrice2[2][3] = {1, 2, 3, 4, 5, 6};
```

Con le graffe innestate `{ {...}, {...} }` il codice è molto più leggibile e corrisponde visivamente alla struttura della matrice.

Se ometti dei valori, i restanti vengono inizializzati a **0**:

```c
int m[2][3] = { {1, 2} };   // riga 0: {1, 2, 0} — riga 1: {0, 0, 0}
```

---

## Accesso agli elementi: doppio indice

```c
#include <stdio.h>

int main(void) {
    int matrice[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };

    for (int i = 0; i < 2; i++) {          // i = riga
        for (int j = 0; j < 3; j++) {      // j = colonna
            printf("%d ", matrice[i][j]);
        }
        printf("\n");
    }

    matrice[1][2] = 99;   // modifico l'elemento riga 1, colonna 2
    return 0;
}
```

Output:
```
1 2 3
4 5 6
```

---

## Le matrici in memoria: ordine "per righe"

Anche una matrice, come ogni array, è memorizzata in un blocco **contiguo** di memoria. In C le righe vengono salvate **una dopo l'altra** (ordine *row-major*):

```c
int m[2][3] = {{1,2,3},{4,5,6}};
```

```
indirizzo:  1000  1004  1008  1012  1016  1020
valore:      1     2     3     4     5     6
             └──── riga 0 ────┘└──── riga 1 ────┘
```

📌 `m[i][j]` è equivalente, "dietro le quinte", a `*(*(m + i) + j)`: prima ci si sposta di `i` righe, poi di `j` colonne dentro quella riga.

---

## Passaggio di una matrice a una funzione

⚠️ Regola importante: quando passi una matrice a una funzione, **devi sempre specificare il numero di colonne** (tutte le dimensioni tranne la prima), perché il compilatore ne ha bisogno per calcolare correttamente gli indirizzi degli elementi.

```c
void stampaMatrice(int m[][4], int righe);   // OK: colonne (4) specificate

void stampaMatrice(int m[][], int righe);    // ERRORE DI COMPILAZIONE!
```

La prima dimensione (il numero di righe) invece **può essere omessa**, perché non serve per calcolare gli indirizzi.

---

## Esempio completo: somma di due matrici

```c
#include <stdio.h>

#define RIGHE 2
#define COLONNE 3

void sommaMatrici(int a[][COLONNE], int b[][COLONNE], int ris[][COLONNE]);

int main(void) {
    int a[RIGHE][COLONNE] = {{1,2,3},{4,5,6}};
    int b[RIGHE][COLONNE] = {{10,20,30},{40,50,60}};
    int ris[RIGHE][COLONNE];

    sommaMatrici(a, b, ris);

    for (int i = 0; i < RIGHE; i++) {
        for (int j = 0; j < COLONNE; j++) printf("%d ", ris[i][j]);
        printf("\n");
    }
    return 0;
}

void sommaMatrici(int a[][COLONNE], int b[][COLONNE], int ris[][COLONNE]) {
    for (int i = 0; i < RIGHE; i++)
        for (int j = 0; j < COLONNE; j++)
            ris[i][j] = a[i][j] + b[i][j];   // modifico ris "sul posto" (per riferimento!)
}
```

---

# 11. Matrici come insieme di stringhe

---

## Idea di base

Una stringa è un array di `char`. Una **matrice di `char`** è quindi, di fatto, **un insieme di più stringhe**: ogni riga è una stringa diversa!

```c
char nomi[5][20];   // 5 stringhe, ciascuna fino a 19 caratteri + '\0'
```

```
        colonna 0 1 2 3 ...
riga 0  [ A  n  n  a \0 ...]   <- nomi[0] è la stringa "Anna"
riga 1  [ M  a  r  c  o \0...]  <- nomi[1] è la stringa "Marco"
riga 2  [ ... ]
```

📌 `nomi[i]` (un solo indice!) rappresenta **l'intera riga i-esima**, cioè si comporta come una singola stringa (un array di `char`).

---

## Metodo 1: matrice di caratteri a dimensione fissa

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char nomi[3][20] = {
        "Anna",
        "Marco",
        "Giulia"
    };

    for (int i = 0; i < 3; i++) {
        printf("%s (lunghezza %lu)\n", nomi[i], strlen(nomi[i]));
    }

    strcpy(nomi[1], "Marcooo");   // posso modificare una riga con strcpy!

    return 0;
}
```

- Ogni riga ha **sempre la stessa dimensione massima** (qui 20 byte), anche se la parola è più corta → un po' di memoria viene "sprecata"
- I singoli caratteri **sono modificabili**: `nomi[0][0] = 'a';`

---

## Metodo 2: array di puntatori a stringa

Alternativa più flessibile: un array dove ogni elemento è un **puntatore** a una stringa (di lunghezza qualsiasi).

```c
#include <stdio.h>

int main(void) {
    char *nomi[3] = {
        "Anna",
        "Marco",
        "Giulia"
    };

    for (int i = 0; i < 3; i++) {
        printf("%s\n", nomi[i]);
    }

    return 0;
}
```

```
nomi[0] ──▶ "Anna"       (4+1 byte, da qualche parte in memoria)
nomi[1] ──▶ "Marco"      (5+1 byte)
nomi[2] ──▶ "Giulia"     (6+1 byte)
```

- Nessuno spreco di memoria: ogni stringa occupa **esattamente** lo spazio che le serve
- ⚠️ Come già visto, queste stringhe sono spesso **letterali costanti**: `nomi[0][0] = 'a';` è comportamento indefinito!

---

## Confronto tra i due metodi

| | `char nomi[3][20]` | `char *nomi[3]` |
|---|---|---|
| Cos'è | vera matrice di caratteri | array di puntatori a `char` |
| Lunghezza righe | fissa (spreco possibile) | variabile, nessuno spreco |
| Modificabile con `strcpy` | ✅ sì | ⚠️ solo se non punta a un letterale |
| Uso tipico | stringhe che verranno modificate | elenchi statici di sole letture (es. menu, giorni della settimana) |

---

## Esempio completo: cercare una stringa in un elenco

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char giorni[7][10] = {
        "Lunedi", "Martedi", "Mercoledi", "Giovedi",
        "Venerdi", "Sabato", "Domenica"
    };

    char cercato[10];
    printf("Cerca un giorno: ");
    scanf("%s", cercato);

    int trovato = 0;
    for (int i = 0; i < 7; i++) {
        if (strcmp(giorni[i], cercato) == 0) {   // confronto CONTENUTO, non ==
            printf("Trovato in posizione %d\n", i);
            trovato = 1;
        }
    }
    if (!trovato) printf("Non trovato\n");

    return 0;
}
```

---

# 12. Errori comuni con le matrici

---

## Errore 1: omettere il numero di colonne nel parametro

```c
void stampa(int m[][], int righe) {   // ERRORE DI COMPILAZIONE
    ...
}
```

✅ La prima dimensione (righe) si può omettere, **le altre no**:

```c
void stampa(int m[][4], int righe) {   // CORRETTO: colonne specificate
    ...
}
```

Senza il numero di colonne, il compilatore **non può calcolare** dove inizia ogni riga in memoria.

---

## Errore 2: scambiare righe e colonne

```c
int matrice[3][5];   // 3 righe, 5 colonne

for (int i = 0; i < 5; i++) {        // SBAGLIATO: dovrebbe essere i < 3 (righe)
    for (int j = 0; j < 3; j++) {    // SBAGLIATO: dovrebbe essere j < 5 (colonne)
        printf("%d ", matrice[i][j]);   // accesso fuori dai limiti!
    }
}
```

📌 Il primo indice `[3]` è sempre il numero di **righe**, il secondo `[5]` il numero di **colonne**: attenzione a non invertire i cicli!

---

## Errore 3: righe di una matrice di stringhe non terminate

```c
char nomi[3][4] = {"Anna", "Bob", "Eli"};   // ERRORE: "Anna" da sola
                                              // occupa già 5 byte ('A','n','n','a','\0')
                                              // ma ogni riga ha spazio per SOLO 4 byte!
```

✅ La dimensione di colonna deve sempre contenere la parola **più lunga**, `'\0'` incluso:

```c
char nomi[3][5] = {"Anna", "Bob", "Eli"};   // CORRETTO: "Anna"+'\0' = 5 byte esatti
```

---

## Errore 4: modificare una matrice di puntatori a stringhe letterali

```c
char *giorni[3] = {"Lun", "Mar", "Mer"};

giorni[0][0] = 'X';   // ERRORE: comportamento indefinito!
                        // "Lun" è una stringa letterale, spesso in sola lettura
```

✅ Se devi modificare i contenuti, usa la versione a **matrice di caratteri** (`char giorni[3][10]`), non l'array di puntatori.

---

## Riepilogo degli errori tipici con le matrici

| Errore | Perché è sbagliato |
|---|---|
| Omettere il numero di colonne nel parametro | il compilatore non sa calcolare gli indirizzi delle righe |
| Invertire righe e colonne nei cicli | accesso fuori dai limiti dell'array |
| Riga troppo corta per contenere una stringa + `'\0'` | *buffer overflow* sulla singola riga |
| Modificare `char *arr[]` che punta a letterali | comportamento indefinito (memoria di sola lettura) |

---

# Riepilogo generale

---

## I concetti chiave da ricordare

1. Un **array** è una sequenza contigua di elementi in memoria
2. Un **puntatore** è una variabile che contiene un **indirizzo di memoria**
   - `&variabile` → ottengo l'indirizzo
   - `*puntatore` → ottengo/modifico il valore all'indirizzo
3. Il nome di un array **è** (di fatto) un puntatore al suo primo elemento
4. **Passaggio per valore** → copia → la funzione **non** modifica l'originale
5. **Passaggio per riferimento** (puntatori) → stesso indirizzo → la funzione **modifica** l'originale
6. Gli **array**, passati a una funzione, si comportano **sempre** come un passaggio per riferimento
7. Una **stringa** è un array di `char` terminato da `'\0'`; la libreria `string.h` (`strlen`, `strcpy`, `strcat`, `strcmp`, ...) semplifica il lavoro, ma va usata con attenzione ai limiti degli array
8. Una **matrice** è un array bidimensionale (righe × colonne), memorizzato per righe; una matrice di `char` (o un array di puntatori a `char`) è un modo naturale per rappresentare **più stringhe insieme**

---

<!-- _paginate: false -->

# Domande?

Proviamo insieme qualche esercizio pratico al computer 💻
