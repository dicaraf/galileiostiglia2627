/*Leggere un array di 10 interi con dati riempiti dall'utente. Stampare quanti elementi sono pari e quanti dispari, 
poi la somma degli elementi che si trovano in posizioni di indice pari (0, 2, 4, ...).*/
#include <stdio.h>
#define DIM 10

int main() {
    int v[DIM];
    int i;
    int pari = 0;
    int dispari = 0;
    int somma = 0;

    // Lettura degli elementi dell'array
    for (i = 0; i < DIM; i++) {
        printf("Inserisci elemento %d: ", i);
        scanf("%d", &v[i]);
    }

    // Analisi degli elementi
    for (i = 0; i < DIM; i++) {

        // Controllo se il numero è pari o dispari
        if (v[i] % 2 == 0)
            pari++;
        else
            dispari++;

        // Somma degli elementi che si trovano in posizione di indice pari
        if (i % 2 == 0)
            somma += v[i];
    }

    printf("\nElementi pari: %d", pari);
    printf("\nElementi dispari: %d", dispari);
    printf("\nSomma degli elementi in posizione di indice pari: %d\n", somma);

    return 0;
}