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

# Array in C

### Classe 3TRED — Liceo Scientifico Scienze Applicate

Ripasso array

---

## Indice degli argomenti

1. Ripasso: array in C

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
