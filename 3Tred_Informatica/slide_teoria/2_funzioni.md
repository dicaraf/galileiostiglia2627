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

# Funzioni in C

### Classe 3TRED — Liceo Scientifico Scienze Applicate



---

## Indice degli argomenti


4. Funzioni: prototipo e uso
5. Passaggio parametri: **per valore** vs **per riferimento**
6. Esempi completi (variabili semplici, poi array)
7. Errori comuni e cose da **non** fare

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

