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

# Matrici in C

### Classe 3TRED — Liceo Scientifico Scienze Applicate


---

## Indice degli argomenti


10. Le matrici in C (array bidimensionali)
11. Matrici come insieme di stringhe
12. Errori comuni con le matrici

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

