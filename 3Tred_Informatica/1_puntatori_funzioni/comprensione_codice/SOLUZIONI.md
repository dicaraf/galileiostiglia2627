# Soluzioni - Esercizi di comprensione del codice in C

Non guardare prima di aver provato! Ogni file `esNN_*.c` contiene anche una
"DOMANDA EXTRA" nei commenti finali: le risposte sono in fondo a ogni soluzione.

---

## Es. 1
```
6 6
12 7
```
- Prima chiamata: t=3, x=5+1=6, y=3*2=6.
- Seconda chiamata f(&y,&x): a->y, b->x. t=6, y=x+1=7, x=t*2=12.

**Extra:** con il passaggio per valore le variabili del main non cambierebbero: stamperebbe "3 5" due volte.

## Es. 2
```
10
30
40
30
40
30
2
31
```
- `*p++` restituisce 30 e POI sposta p su v[3] (quindi la riga dopo e' 40).
- `*--p` decrementa prima: p torna a v[2] -> 30.
- `p - v` = 2 (distanza in elementi). `(*p)++` fa diventare v[2] = 31.

**Extra:** `*p++` legge il valore e poi sposta il puntatore; `(*p)++` incrementa il valore
puntato (il puntatore non si muove); `*++p` sposta prima il puntatore e poi legge.

## Es. 3
```
1 3 6 10 15
1 3 6 16 31
```
La prima chiamata calcola le somme parziali. La seconda lavora sul sotto-array {6,10,15}:
a[1]=10+6=16, a[2]=15+16=31.

**Extra:** con n=1 o n=0 il ciclo non esegue nessuna iterazione: l'array resta invariato.

## Es. 4
```
1 0
3
7
```
Con `>` stretto si ottiene la PRIMA occorrenza del massimo (indice 1), poi azzerata.
Al secondo giro l'array e' {4,0,2,9,7,1}: il massimo e' all'indice 3.
`max(v+4,2)` esamina solo {7,1} -> 7.

**Extra:** con `>=` si otterrebbe l'ULTIMA occorrenza: il primo output sarebbe "3 9", il secondo
"1" (il 9 rimasto in posizione 1) e il terzo invariato (7).

## Es. 5
```
6 3 4 5 2 1
12 3
```
rev(v,v+5) -> 6 5 4 3 2 1; rev(v+1,v+3) inverte le posizioni 1..3 (5 4 3 -> 3 4 5).
I pari sono 4, 2, 6: somma 12, conteggio 3.

**Extra:** i due puntatori si incrociano o si incontrano. Con un numero pari di elementi,
a e b "si scavalcano" senza mai essere uguali, quindi `a != b` non terminerebbe mai
(comportamento indefinito: si esce dall'array).

## Es. 6
```
4
2
0
1
3
```
- conta(v): 5,8,0,3 prima di -1 -> 4. conta(v+2): 0,3 -> 2. conta(v+4): subito -1 -> 0.
- salta(v,5) punta a v[5]=7, poi arriva -2: -> 1.
- `*salta(v,3)` = 3, `*salta(v+1,1)` = v[2] = 0: totale 3.

**Extra:** il puntatore supera la fine dell'array e legge memoria non valida: comportamento
indefinito (accesso fuori dai limiti). Per questo serve una sentinella, oppure passare la lunghezza.

## Es. 7
```
0 1 99
```
`p` in `h` e' una copia di `q`: incrementarla non cambia `q`, ma punta allo stesso array,
quindi `*p = 99` scrive in v[1].

**Extra:** `h` dovrebbe ricevere un `int **` (puntatore a puntatore), oppure restituire il nuovo
puntatore, che il chiamante riassegna a `q`.

## Es. 8
```
2 0
1 2 0 4
2 1 1 2
```
- avanza(&p) due volte: p -> v[2]; azzera scrive 0 in v[2].
- scambia_ptr scambia i PUNTATORI: px ora punta a y e py a x, ma x e y restano 1 e 2.
  Stampa: *px=2, *py=1, x=1, y=2.

**Extra:** scambia_ptr modifica solo i puntatori (x e y restano invariate); una funzione che
scambia i valori modificherebbe x e y, lasciando px e py dove sono.

## Es. 9
```
-5 9 14
-2 9 11
-5 -5 0
```
- Su tutto l'array: min -5, max 9.
- Su {-2,9,4}: min -2, max 9.
- Su {-5} (n=1): min e max coincidono.

**Extra:** con &a,&a entrambe le scritture vanno nella stessa variabile: `*mn = *mx = v[0]` e
poi gli aggiornamenti si sovrappongono. Il valore finale e' ben definito dalle singole
istruzioni (a finisce uguale all'ultimo valore scritto), ma e' privo di senso come risultato.
Qui il risultato e' il massimo, perche' l'ultimo `if` che scrive e' quello su `*mx`.

## Es. 10
```
8
1
8
8
0
1
```
- sizeof(v)/sizeof(v[0]) = 8 elementi.
- In f, `a` e' un puntatore (non un array): sizeof(a)==sizeof(int*) -> 1; n vale 8.
- (v+8)-v = 8.
- sizeof(p)==sizeof(v)? 4 o 8 byte contro 32: -> 0.
- p == &v[0] -> 1.

**Extra:** il parametro `int a[]` viene "adattato" a `int *a`: la lunghezza si perde, per cui
sizeof(a)/sizeof(a[0]) dipende dalla piattaforma (2 su 64 bit, 1 su 32 bit con int a 4 byte).
Il penultimo output non puo' mai essere 1: un puntatore e' molto piu' piccolo di 8 int.

## Es. 11
```
4
3 5 7 2 5 7 0 2
```
`r` legge tutti gli elementi, `w` scrive solo i non nulli, compattandoli all'inizio.
Le posizioni dopo `w` non vengono toccate: restano i vecchi valori (5 7 0 2).

**Extra:** no, NON sono azzerati. Per azzerarli basta un ciclo finale
`while (w < v + n) *w++ = 0;`.

## Es. 12
```
30 20 50 10
0 50
40
160
0 40 110 210 340 500 60
```
- p = v+3: p[0]=30, p[-1]=20, p[2]=50, *(p-2)=10, p[-3]=v[0]=0, 2[p]=50.
- centro(v+1) = 0 + 2*10 + 20 = 40; centro(v+4) = 30 + 2*40 + 50 = 160.
- Nel ciclo i valori sono scritti in place: ogni centro usa il valore GIA' aggiornato a sinistra
  (40, poi 40+2*20+30=110, ...), per questo i risultati crescono molto.

**Extra:** `a[b]` e' definito come `*(a+b)`, e l'addizione e' commutativa: 2[p] == p[2].
Con un secondo array il risultato sarebbe diverso: ogni centro userebbe solo i valori
originali (0 40 80 120 160 200 60).

## Es. 13
```
2 3 4 5 1
2 4 5 3 1
4 5 3 1 2
4 5 3 1 2
```
- ruota(v+1,3) agisce su {3,4,5} -> {4,5,3}.
- L'ultima chiamata ruota(v+3,1) lavora su un solo elemento: nessuna modifica.

**Extra:** 5 chiamate di ruota(v,5) riportano all'originale; ruota(v,1) non fa nulla.

## Es. 14
```
16
19 2
```
- f(&x,&x) con x=3: `*a=4` (x=4); `*b=*b*2` -> x=8; `*a=*a+*b` -> x=8+8=16.
- f(&x,&y) con x=16, y=1: x=17; y=2; x=17+2=19.

**Extra:** con x=3, y=3: x=4, y=6, x=4+6=10 -> "10 6". Con f(&x,&x) i due puntatori sono alias:
le modifiche fatte tramite `b` cambiano anche il valore letto tramite `a`.

## Es. 15
```
0 1 2 3 0 0
1 1 1 1 5
```
La seconda copia ha sorgente e destinazione sovrapposte: si copia in avanti, quindi a[1]=a[0]=1,
poi a[2]=a[1] (gia' sovrascritto, vale 1), a[3]=a[2]=1.

**Extra:** la copia in avanti "sporca" i dati ancora da leggere. Con dst > src bisogna copiare
all'indietro (da n-1 fino a 0), come fa `memmove`. In quel caso il risultato sarebbe 1 1 2 3 5.
