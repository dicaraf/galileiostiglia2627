/* VERIFICA - Il distributore automatico
 * 8 prodotti con codice da 'A' a 'H': per ognuno i pezzi rimasti e il prezzo in
 * centesimi, in due array con lo stesso indice ('A' indice 0, 'B' indice 1, ...).
 * Completa le 4 funzioni DA COMPLETARE senza modificare il resto. Il file compila gia'.
 */
#include <stdio.h>

#define NUM_PRODOTTI 8
#define CAPIENZA     5     /* pezzi massimi per ogni prodotto */

/* Funzioni gia' fatte */
int  leggiNumero(int min, int max);               /* legge un numero tra min e max */
int  leggiCodice(void);                           /* legge A-H, restituisce l'indice */
void stampaDistributore(int pezzi[], int prezzi[]);   /* stampa codici, prezzi, pezzi */

/* Funzioni da completare */
int  rifornisci(int pezzi[]);
void statoScorte(int pezzi[], int *esauriti, int *totale);
int  compra(int pezzi[], int prezzi[], int indice, int soldi, int *resto);
int  piuEconomico(int pezzi[], int prezzi[]);

int main(void)
{
    int pezzi[NUM_PRODOTTI]  = {   3,   0,   5,   2,   4,   1,   0,   5 };
    int prezzi[NUM_PRODOTTI] = { 120,  80, 150, 100,  90, 200,  60, 130 };
    int scelta, indice, soldi, esito, resto = 0, esauriti = 0, totale = 0;

    do {
        stampaDistributore(pezzi, prezzi);
        printf("1) Compra  2) Piu' economico  3) Scorte  4) Rifornisci  0) Esci: ");
        scelta = leggiNumero(0, 4);
        if (scelta == 1) {
            indice = leggiCodice();
            printf("Quanti centesimi inserisci (0-500)? ");
            soldi = leggiNumero(0, 500);
            esito = compra(pezzi, prezzi, indice, soldi, &resto);
            if (esito == 1)
                printf(">> Ecco il prodotto %c! Resto: %d\n", 'A' + indice, resto);
            else if (esito == 0)
                printf(">> Prodotto esaurito, soldi restituiti.\n");
            else
                printf(">> Soldi insufficienti, soldi restituiti.\n");
        } else if (scelta == 2) {
            indice = piuEconomico(pezzi, prezzi);
            if (indice == -1)
                printf(">> Il distributore e' vuoto.\n");
            else
                printf(">> Piu' economico: %c (%d)\n", 'A' + indice, prezzi[indice]);
        } else if (scelta == 3) {
            statoScorte(pezzi, &esauriti, &totale);
            printf(">> Prodotti esauriti: %d   Pezzi totali: %d\n", esauriti, totale);
        } else if (scelta == 4) {
            printf(">> Aggiunti %d pezzi.\n", rifornisci(pezzi));
        }
    } while (scelta != 0);
    return 0;
}

/* ------------------------ Funzioni gia' fatte ------------------------ */

int leggiNumero(int min, int max)
{
    int numero = min - 1;

    scanf("%d", &numero);
    getchar();
    while (numero < min || numero > max) {
        printf("Valore non valido (%d-%d): ", min, max);
        scanf("%d", &numero);
        getchar();
    }
    return numero;
}

int leggiCodice(void)
{
    char c = ' ';

    printf("Codice del prodotto (A-%c): ", 'A' + NUM_PRODOTTI - 1);
    scanf(" %c", &c);
    getchar();
    while (c < 'A' || c >= 'A' + NUM_PRODOTTI) {
        printf("Codice non valido, riprova: ");
        scanf(" %c", &c);
        getchar();
    }
    return c - 'A';
}

void stampaDistributore(int pezzi[], int prezzi[])
{
    printf("\nCodice:       A    B    C    D    E    F    G    H");
    printf("\nPrezzo:   ");
    for (int i = 0; i < NUM_PRODOTTI; i++)
        printf("%5d", prezzi[i]);
    printf("\nPezzi:    ");
    for (int i = 0; i < NUM_PRODOTTI; i++)
        printf("%5d", pezzi[i]);
    printf("\n\n");
}

/* ----------------------- Funzioni da completare ---------------------- */

/* Riporta ogni prodotto a CAPIENZA pezzi.
   Restituisce quanti pezzi sono stati aggiunti in tutto. */
int rifornisci(int pezzi[])
{
    /* DA COMPLETARE */
    return 0;
}

/* Mette in *esauriti quanti prodotti hanno 0 pezzi e in *totale
   la somma dei pezzi di tutti i prodotti. */
void statoScorte(int pezzi[], int *esauriti, int *totale)
{
    /* DA COMPLETARE */
}

/* Acquisto del prodotto di indice "indice" pagando "soldi" centesimi.
   Restituisce 0 se il prodotto e' esaurito, -1 se i soldi non bastano.
   Altrimenti toglie un pezzo, mette in *resto il resto e restituisce 1. */
int compra(int pezzi[], int prezzi[], int indice, int soldi, int *resto)
{
    /* DA COMPLETARE */
    return 0;
}

/* Restituisce l'indice del prodotto meno caro tra quelli con almeno
   un pezzo (a parita' di prezzo, il primo); -1 se sono tutti esauriti. */
int piuEconomico(int pezzi[], int prezzi[])
{
    /* DA COMPLETARE */
    return -1;
}
