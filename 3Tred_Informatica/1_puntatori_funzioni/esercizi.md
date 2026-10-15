Esercizi sulle funzioni in C++ con passaggio di parametri per valore
Ecco alcuni esercizi in cui si richiede di creare e testare delle funzioni con passaggio di parametri per valore.

Es. 0 Creare una funzione che calcola e restituisce il valore assoluto di un numero intero.

Creare poi un programma che fa inserire due numeri all’utente e dice, usando la funzione, quale dei due numeri interi ha il valore assoluto maggiore.


Es. 1 Creare una funzione che riceve una quantità di tempo in formato ore, minuti e secondi e la restituisce espressa solamente in secondi.
Creare poi un programma che si faccia passare due quantità di tempo e verifichi quale è maggiore utilizzando la funzione precedente e solamente due if nel programma.


Es. 2 Creare un programma che fa inserire all’utente tre caratteri e usando una funzione verifica e stampa quanti di questi sono lettere maiuscole.


Es. 3 Creare una funzione che riceve tre numeri interi e restituisce la differenza tra il più grande e il più piccolo.
Creare anche un main che consenta di provare la funzione.

Es 4. Creare una funzione che calcola il prodotto e la somma tra tre numeri interi e restituisce la differenza tra questi due.
Creare poi un main che consenta di usare la funzione.

Es. 5 Creare una funzione che restituisce se un numero intero è naturale o meno.
Creare poi un programma che ricevuto un numero n (passato dall’utente) nel caso questo sia naturale, richieda all’utente di inserire altri n numeri e alla fine stampi quanti di questi sono naturali.


Es 6. Creare una funzione che restituisce se un numero intero ha almeno 3 divisori.
Creare poi un programma che dica se un numero passato dall’utente e il più grande numero intero più piccolo del suo quadrato hanno almeno tre divisori.


Es 7. Creare una funzione che calcola quanti divisori ha un numero naturale.
Creare poi un programma che ricevuto dall’utente un numero naturale n stampi il numero d che indica quanti divisori ha n e poi stampi quanti divisori ha il numero d.


Es 8. Creare una funzione che dice se un carattere è una vocale.
Creare un programma che fa inserire la lunghezza di due parole (le due parole possono avere lunghezze diverse) e poi fa inserire le due parole un carattere alla volta. Alla fine il programma stampa per ogni parola quante vocali contiene.


Es 9. Creare una funzione che dati tre valori naturali, se tra questi c’è (almeno) una coppia, restituisce il valore del numero ripetuto, altrimenti restituisce -1.
Creare un programma che usi la funzione per vedere tra due triplette di numeri naturali qual è quella che contiene la coppia più alta.


Es 10. Creare una funzione che aiuti a leggere dei numeri con la virgola facendo in modo che quando vengono inseriti dei numeri negativi vengono fatti reinserire. Creare un programma che confronta la somma di due numeri con la virgola con il prodotto di altri due; quando si leggono i numeri questi devono essere maggiori di zero (nel caso vanno fatti reinserire).
NB: in questo esercizio potete usare cin e cout all’interno delle funzioni.


Es 11. Creare una funzione che calcola la cifra più significativa di un numero intero (ovvero “quella più a sinistra”).
Leggere due numeri interi e verificare se la cifra più significativa del prodotto dei due numeri è minore di quella della somma.


Es 12. Creare una funzione che ricevuti due numeri naturali n e m (dare per buono che vengano passati effettivamente numeri naturali) restituisce il più piccolo numero divisibile per m che sia contemporaneamente maggiore di n, qualora per m venga passato zero restitusice n+1.
Creare un programma che faccia inserire all’utente due x e y numeri e usi la funzione creata in precedenza per prima passando x e y e poi y e x e verifichi se i risultati sono uguali.


es 13. Scrivere una funzione che, ricevuto un numero intero, se questo è naturale calcola quante cifre al suo interno sono pari, se non è naturale restituisce zero.
Scrivere un programma che stampi il risultato dell’applicazione della funzione a due numeri interi inseriti dall’utente e poi la riapplichi alla somma dei risultati dell’applicazione della funzione.


es 14. Creare una funzione che permetta di stampare una riga costituita dalla ripetizione di un carattere c per n volte, dove n e c sono passati dall’utente.
Creare un programma che permette di stampare un quadrato di simboli di dimensione x passata dall’utente, con righe alternate una di ‘-‘ e una di ‘+’.


es 15. Creare una funzione che permette di stampare un quadrato di ‘+’ di dimensioni ricevute.
Creare poi un programma che letto un numero da parte dell’utente permetta di stampare una serie di quadrati con dimensioni che partono da 1 e vanno fino al valore passato dall’utente per poi ridiscendere fino ad 1.

Ad esempio se viene passato 3 il programma stampa:
+

++
++

+++
+++
+++

++
++

+


Nuovo esercizio. Scrivere una funzione che ricevuti la lunghezza di un percorso in km, quanti kilometri effettua un’auto con un litro e il costo al litro del carburante, calcolo il costo per il viggio.
Nel main, chiedere all’utente di inserire il consumo dell’auto e il prezzo del carburante, poi calcola il costo di tre viaggi con tre lunghezze inserite dall’utente.

Esercizi sulle funzioni in C++ con passaggio di parametri per riferimento
es 16. Creare una funzione che scambia il contenuto di due variabili che le sono passate; poi creare un programma che fatti inserire tre numeri da parte dell’utente li ordina in ordine crescente usando la funzione precedentemente creata.


es 17. Robin Hood è un ladro gentiluomo: ruba ai ricchi per dare ai poveri, ma siccome è gentiluomo non vuole far diventare poveri i ricchi!
Due persone hanno una quantità di denaro x e y, richiamando la funzione robinHood, equilibrare la quantità di denaro tra i due.


es 18. Creare una funzione che ricevuti tre importi di denaro sposta gli eventuali debiti (si considerino debiti gli importi negativi) sul primo importo.
Ad esempio se gli importi sono 5 -1 -2 gli importi dopol’applicazione della fuzione saranno 2 0 0.
Creare un main per testare la funzione.


Es 19. Creare una funzione che ricevuti tre valori sottrae al maggiore metà del valore del minore.
Creare una programma che applica tre volte la funzione a valori inseriti dall’utente.


Es 20. Creare una funzione che ricevuti due interi che rappresentano numeratore e denominatore di una frazione, riduce la frazione ai minimi termini.
Creare poi un programma che legga due frazioni le riduca ai minimi termini e verifichi se hanno lo stesso denominatore.


Es 21. Scrivere una funzione che riceve un numero intero e restituisce il suo più grande fattore primo e la sua molteplicità (ad esempio se il numero passato è 250 restituisce 5 e 3 perché 250=2*5*5*5)


Es 22. Creare una funzione che riceve due numeri con la virgola e trasforma il minore dei due in 0 se è negativo e in 1 se è positivo e trasforma l’altro (il maggiore) nel suo (del maggiore) reciproco.
Creare poi un main che riceva due coppie di numeri e applichi la funzione a entrambe le coppie e ne stampi i risultati dell’applicazione.


Es 23. Creare una funzione che riceve due numeri interi e restituisce il primo elevato al secondo e poi il secondo elevato al primo.
Creare un programma per provare la funzione con numeri inseriti da parte dell’utente e poi stampare i risultati.


Es 24. Creare una funzione che riceve 4 variabili con numeri interi e se ce n’è solo una che contiene un numero pari moltiplica tutte le altre per 2.
Creare un programma per provare la funzione con numeri inseriti da parte dell’utente e poi stampare i risultati.


Es 25. Creare una funzione che riceve due numeri interi e vi sostituisce il risultato e il resto della divisione intera tra i due numeri. Creare poi un programma che ricevuti due numeri interi grazie alla funzione calcoli e poi stampi il risultato e il resto della divisione intera tra il primo diviso il secondo e viceversa.


Es 26. Creare un programma che realizzi il seguente gioco per 3 giocatori, ogni giocatore ha un punteggio (partono tutti da zero all’inizio del gioco), ogni round il giocatore con il punteggio minore può scegliere se fare giocare una mano al sottogioco1 o al sottogioco2.
Il sottogioco 1 consiste nel fatto che tutti e tre i giocatori estraggono un numero casuale tra 1 e 100 gli sottraggano il proprio punteggio e quello diventa il loro nuovo punteggio (eventuali punteggi negativi vanno trasformati in zero).
Il sottogioco 2 consiste nel fatto che tutti e tre i giocatori estraggano casualmente 3 numeri compresi tra 1 e 10 e il giocatore che ha la combinazione migliore aumenta il suo punteggio del valore della combinazione, i valori delle combinazioni sono così determinati: se c’è un tris la combinazione vale il numero che compare tre volte moltiplicato per 4; se c’è una coppia vale il numero che compare due volte moltiplicato per 2; altrimenti se non ci sono tris o coppie il valore della combinazione è quello del numero più altro della combinazione.
Realizzare delle funzioni per i sottogiochi, il gioco complessivo termina quando un giocatore raggiunge o supera i 100 punti oppure dopo 5 round.

Esercizi sulle FUNZIONI in C++ CON PARAMETRI OPZIONALI
Es 27. Creare una funzione che riceve (come parametri) tra 2 e 4 numeri naturali (diversi da zero) e restituisce il numero che tra questi ha il divisore (diverso dal numero stesso) più grande.
(Se viene passato un numero primo il suo divisore più grande diverso dal numero stesso è 1, se viene passato 1 si faccia un’eccezione e si consideri come suo divisore più grande 1)


Es 28. Creare una funzione che riceve (come parametri) tra 2 e 3 numeri naturali e restituisce il minimo comune multiplo dei numeri ricevuti.
Creare un programma che lancia una moneta e, se viene testa, estrae due numeri naturali compresi tra 1 e 100 e, se viene croce, ne estrae tre tra 1 e 50; poi usando la funzione creata in precedenza il programma calcola il minimo comune multiplo dei numeri estratti.


Es 29. Creare un funzione che riceve (come parametri) tra 3 e 5 numeri interi e restituisce il maggiore dei valori assoluti.


Es 30. Creare una funzione dado che restituisce il valore di un lancio di un dado a 6 facce se non le vengono passati parametri, di un dado a n facce dove n è il valore del parametro se le viene passato un parametro, qualora il valore del parametro sia negativo restituisce sempre zero.


es 31. Creare la funzione potenza che calcola una potenza di un numero naturale n che le viene passato, nel caso le venga passato solo un numero calcola il quadrato, altrimenti se le viene passato un secondo numero intero calcola il primo elevato al secondo (attenzione l’esponente può essere un numero negativo!).


Es 32. Creare una funzione che dati 2 o 3 numeri restituisce il più grande divisore primo di almeno uno di essi.


Es 33. Creare una funzione che se riceve un numero n1 stampa una riga di n1 “+”, se riceve anche un numero n2, stampa n2 righe di n1 “+”, se riceve anche un carattere c stampa stampa n2 righe di n1 caratteri c.


Es 34. Scrivere una funzione che riceve tra tre e cinque numeri interi e ne restituisce la somma, poi creare un main in cui chiedere all’utente quanti numeri vuole inserire (tra 3 e 5) e poi fargli inserire detti numeri interi e calcolarne la somma


Es 35. Scrivere una funzione che permette di calcolare quanti punti di campionato fa una squadra con una partita di calcio (3 per la vittoria, 1 per il pareggio, 0 per la sconfitta), il programma riceve il numero di goal fatti in ordine dalla squadra che gioca in casa e da quella che gioca fuoricasa e la lettera ‘c’ se la squadra di cui ci interessa sapere il punteggio realizzato è quella in casa, o ‘f’ se è quella fuoricasa.
Far sì che se vengono passati solo due paramentri la funzione restituisca il numero di punti realizzati dalla squadra che gioca in casa.


Es 36. Creare una funzione che può ricevere da 1 a 5 numeri e restituisce quanti numeri ricevuti sono minori della loro posizione tra i parametri, le posizioni dei parametri si contino a partire da 1, il primo parametro è in posizione 1, il secondo in posizione 2 eccetera.


Esercizi sulle FUNZIONI in C++ E VARIABILI GLOBALI
Es 37. Dichiara una variabile globale di tipo intero chiamata conto e assegnale un valore iniziale di 100. Scrivere una funzione chiamata deposita che prende un parametro intero importo e aggiunge questo importo alla variabile globale conto, scrivere poi una funzione chiamata preleva che prende un parametro intero importo e sottrae questo importo alla variabile globale conto restituendo un valore booleano che conterrà se il conto aveva un valore sufficiente per prelevare l”importo o se con il prelievo il conto è andato in rosso (cioè ha un saldo negativo).
Infine, nel main, creare un ciclo con un menu che continua a chiedere all’utente cosa fare, se depositare un importo, prelevarlo o terminare il programma; dopo ogni scelta stampare il nuovo valore della variabile conto.


Es 38. Creare una funzione che data l’altezza calcola in quanto tempo un oggetto cade al livello del suolo; si faccia in mondo che la funzione possa operare con la gravità del pianeta in cui ci si trova (usare una variabile globale).
Si crei una funzione per impostare il pianeta in cui ci si trova:
– passando 0 ci si troverà sulla Terra (accelerazione di gravità =9,81 m/s^2),
– passando 1 ci si troverà sulla Luna (accelerazione di 1,62 m/s^2),
– passando 2 ci si troverà si Marte (accelerazione di 3,71 m/s^2),
passando altri valori ci si troverà sempre sulla Terra.
Creare un programma in cui si chiede all’utente il pianeta in cui ci si trova, l’altezza e gli si dice quanto tempo ci si metterà ad arrivare al suolo.


Es 39. Scrivere una funzione void, a cui si passano due numeri naturali diversi da zero, che calcoli e memorizza in una variabile globale la potenza del