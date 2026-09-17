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

# Stringhe in C

### Classe 3TRED — Liceo Scientifico Scienze Applicate


---

## Indice degli argomenti


8. Le stringhe in C e la libreria `string.h`
9. Errori comuni con le stringhe


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
