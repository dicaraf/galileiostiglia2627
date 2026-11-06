---
marp: true
theme: default
paginate: true
size: 16:9
style: |
  section { font-size: 26px; }
  table { font-size: 21px; }
  code { font-size: 0.9em; }
  h1 { color: #1f4e79; }
  h2 { color: #1f4e79; }
---

<!-- _class: lead -->
<!-- _paginate: false -->

# La Strada degli Oggetti

### Esercizio di programmazione in C

Funzioni · puntatori · caratteri

---

## Il gioco in breve

- Una strada lunga **200 caselle**, numerate da 0 a 199
- Il giocatore parte da una **casella casuale**
- Sulla strada ci sono **8 oggetti misteriosi** in posizioni casuali
- A ogni mossa si va a **destra** o a **sinistra**
- Ogni oggetto raccolto dà un **potere** per la mossa successiva
- Si vince raccogliendo **tutti gli oggetti** prima di finire le mosse

---

## Cosa vede il giocatore

Solo **10 caselle a sinistra e 10 a destra** della sua posizione.

```
Mosse rimaste: 74     Oggetti: 3/8     Potere: Stivali

  . . . ? . . . . . . P . . . . . . ? . . .
                      ^
                 casella 87
```

Vicino ai bordi, le caselle fuori dalla strada sono muri:

```
  # # # # # # # . . . P . . ? . . . . . . .
```

---

## Legenda

| Simbolo | Significato |
| --- | --- |
| `P` | il giocatore |
| `?` | un oggetto (non si sa quale finché non lo raccogli) |
| `.` | casella vuota |
| `#` | muro, fuori dalla strada |

---

## Il movimento

- A ogni turno si sceglie:
  - la **direzione**: `a` = sinistra, `d` = destra, `q` = esci
  - il **numero di passi**: da 1 a 3
- Ogni mossa consuma **1 tentativo**
- Si raccolgono gli oggetti su **tutte le caselle attraversate**
- Non si può uscire dalla strada: ci si ferma sul bordo
- Se l'input non è valido, si richiede di nuovo

---

## Gli oggetti e i poteri

Il potere vale **solo per la mossa successiva**.
Un nuovo oggetto sostituisce il potere precedente.

| Lettera | Oggetto | Effetto sulla mossa successiva |
| --- | --- | --- |
| `S` | Stivali | i passi vengono moltiplicati per 3 |
| `M` | Molla | salto fisso di 15 caselle (raccoglie solo all'arrivo) |
| `C` | Clessidra | la mossa non consuma tentativi |
| `X` | Specchio | la direzione viene invertita (malus!) |

Sulla strada c'è **almeno un oggetto per tipo**.

---

## Vittoria e sconfitta

- All'inizio si sceglie la difficoltà:
  **facile 80 mosse** · **medio 50** · **difficile 30**
- **Vittoria**: raccolti tutti gli 8 oggetti
  → punteggio = mosse rimaste × 10
- **Sconfitta**: mosse finite prima di raccoglierli tutti
- **Abbandono**: il giocatore digita `q`
- A fine partita: *vuoi giocare ancora? (s/n)*

---

## Costanti

Nessun numero "magico" nel codice: tutto con `#define`.

```c
#define LUNGHEZZA_STRADA 200
#define VISTA            10
#define NUM_OGGETTI      8
#define PASSI_MAX        3
#define SALTO_MOLLA      15

#define VUOTA     '.'
#define NESSUNO   '-'
#define STIVALI   'S'
#define MOLLA     'M'
#define CLESSIDRA 'C'
#define SPECCHIO  'X'
```

Ogni casella contiene un **carattere**; anche il potere attivo è un carattere.

---

## Dati della partita

Dichiarati nel `main`, **nessuna variabile globale**:

- la strada, con il contenuto di ogni casella
- la posizione del giocatore
- le mosse rimaste
- gli oggetti raccolti
- il potere attivo

Se una funzione deve **modificare** un dato, lo riceve tramite **puntatore** (`*`).

---

## Regole per le funzioni

- Ogni funzione fa **una sola cosa**
- Il `main` contiene **quasi solo chiamate a funzioni**
- I **tipi** di parametri e valori restituiti li scegliete voi
- Nelle tabelle, `*` davanti a un parametro = va passato per puntatore
- Per leggere un carattere ignorando gli invii: `scanf(" %c", &c);`

---

## Funzioni: preparazione

| Funzione | Parametri | Restituisce | Compito |
| --- | --- | --- | --- |
| `scegliDifficolta` | — | mosse | chiede 1, 2 o 3 e restituisce 120, 90 o 65 |
| `casellaLibera` | strada, posizione | una casella | casella casuale vuota e diversa da quella del giocatore |
| `preparaStrada` | strada, `*`posizione | — | svuota la strada, sceglie la partenza, piazza gli 8 oggetti |

Per piazzare gli oggetti: prima **uno per tipo**, poi gli altri di tipo casuale.

---

## Funzioni: visualizzazione

| Funzione | Parametri | Restituisce | Compito |
| --- | --- | --- | --- |
| `stampaNomeOggetto` | lettera | — | stampa il nome con uno `switch` |
| `mostraStato` | mosse, raccolti, potere | — | stampa mosse, oggetti e potere attivo |
| `simboloCasella` | strada, casella, posizione | un carattere | `P`, `?`, `.` oppure `#` |
| `mostraStrada` | strada, posizione | — | stampa le 21 caselle visibili e la posizione |

---

## Funzioni: input e movimento

| Funzione | Parametri | Restituisce | Compito |
| --- | --- | --- | --- |
| `leggiDirezione` | — | `'a'`, `'d'` o `'q'` | ripete finché è valido |
| `leggiPassi` | — | da 1 a 3 | ripete finché è valido |
| `calcolaSpostamento` | direzione, passi, potere | spostamento con segno | negativo = sinistra; applica Stivali, Molla, Specchio |
| `raccogliOggetto` | strada, casella, `*`raccolti, `*`potere | — | se c'è un oggetto lo toglie, lo conta e attiva il suo potere |
| `muoviGiocatore` | strada, `*`posizione, spostamento, `*`raccolti, `*`potere | — | avanza di una casella alla volta senza uscire dalla strada, chiamando `raccogliOggetto` |

---

## Funzioni: turno e fine partita

| Funzione | Parametri | Restituisce | Compito |
| --- | --- | --- | --- |
| `giocaTurno` | strada, `*`posizione, `*`mosse, `*`raccolti, `*`potere | 1 se esce, 0 altrimenti | coordina un turno completo |
| `partitaFinita` | raccolti, mosse, abbandono | vero / falso | vittoria, mosse finite o abbandono |
| `mostraEsito` | raccolti, mosse, abbandono | — | vittoria con punteggio, sconfitta o abbandono |
| `vuoleRigiocare` | — | vero / falso | chiede `s` o `n` |

---

## Un turno, passo per passo

Dentro `giocaTurno`:

1. Leggere la direzione; se è `q` → restituire 1
2. Leggere i passi (non serve se il potere è la Molla)
3. Salvare il potere attivo in una variabile locale e rimetterlo a `NESSUNO`
4. Calcolare lo spostamento
5. Muovere il giocatore
6. Togliere una mossa, **tranne** se il potere usato era la Clessidra

**Perché il punto 3?** Così un oggetto raccolto durante la mossa vale per il turno *dopo*.

---

## Il main

```c
int main(void)
{
    /* dichiarare qui: strada, posizione, mosse,
       raccolti, potere, abbandono */

    srand(time(NULL));
    do {
        mosse = scegliDifficolta();
        preparaStrada(strada, &posizione);
        raccolti = 0;  potere = NESSUNO;  abbandono = 0;

        while (!partitaFinita(raccolti, mosse, abbandono)) {
            mostraStato(mosse, raccolti, potere);
            mostraStrada(strada, posizione);
            abbandono = giocaTurno(strada, &posizione, &mosse, &raccolti, &potere);
        }
        mostraEsito(raccolti, mosse, abbandono);
    } while (vuoleRigiocare());

    return 0;
}
```

---

## Per chi vuole di più

- **Cannocchiale**: per un turno la visuale si allarga a 25 caselle
- **Buche**: trappole visibili come `O` che tolgono 3 mosse
- **Bussola**: indica direzione e distanza dell'oggetto più vicino
- **Rivela**: a fine partita mostra dove erano gli oggetti non raccolti
