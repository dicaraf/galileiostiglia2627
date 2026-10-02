/*Leggere un array di 10 interi con dati riempiti dall'utente e un intero K generato casualmente tra 0 e 10. 
Stampare tutte le coppie di elementi, in posizioni diverse, la cui somma è uguale a K. Ogni coppia va stampata 
una sola volta. Alla fine stampare quante coppie sono state trovate.

Ad esempio, con array 3, 8, 2, 7, 5, 4, 6, 1, 9, 5 e K = 10 il programma stampa (3,7) (8,2) (5,5) (4,6) (1,9) e "5 coppie".*/

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define DIM 10

int main() {
    int v[DIM];
    int i, j;
    int k;
    int coppie = 0;

    // Inizializzazione del generatore di numeri casuali
    srand(time(NULL));

    // Lettura degli elementi dell'array
    for (i = 0; i < DIM; i++) {
        printf("Inserisci elemento %d: ", i);
        scanf("%d", &v[i]);
    }

    // Generazione casuale di K tra 0 e 10
    k = rand() % 11;

    printf("\nK = %d\n", k);
    printf("Coppie trovate: ");

    /*
     * Il secondo for parte da i + 1.
     * In questo modo:
     * - gli elementi hanno sempre posizioni diverse;
     * - la stessa coppia non viene stampata due volte.
     *
     * Ad esempio, viene controllata (v[2], v[5]),
     * ma non successivamente (v[5], v[2]).
     */
    for (i = 0; i < DIM - 1; i++) {
        for (j = i + 1; j < DIM; j++) {

            if (v[i] + v[j] == k) {
                printf("(%d,%d) ", v[i], v[j]);
                coppie++;
            }
        }
    }

    printf("\nNumero di coppie: %d\n", coppie);

    return 0;
}