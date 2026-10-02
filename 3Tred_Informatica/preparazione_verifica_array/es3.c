/*Riempire un array di 8 interi con numeri casuali tra 1 e 30 e stampare gli elementi 
che sono strettamente maggiori di tutti gli elementi che li seguono nell'array 
(l'ultimo elemento rispetta sempre la condizione).

Ad esempio, per 12, 5, 9, 3, 7, 4, 6, 2 il programma stampa 12, 9, 7, 6, 2.*/

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define DIM 8

int main() {
    int v[DIM];
    int i, j;
    int maggiore;

    srand(time(NULL));

    // Riempimento dell'array con numeri casuali tra 1 e 30
    for (i = 0; i < DIM; i++) {
        v[i] = rand() % 30 + 1;
    }

    // Stampa dell'array generato
    printf("Array: ");
    for (i = 0; i < DIM; i++) {
        printf("%d ", v[i]);
    }

    printf("\nElementi richiesti: ");

    /*
     * Per ogni elemento controlliamo tutti quelli
     * che si trovano alla sua destra.
     */
    for (i = 0; i < DIM; i++) {

        maggiore = 1;  // Supponiamo inizialmente che sia maggiore di tutti

        for (j = i + 1; j < DIM; j++) {

            // Se troviamo un elemento maggiore o uguale,
            // la condizione non è rispettata.
            if (v[j] >= v[i]) {
                maggiore = 0;
            }
        }

        if (maggiore != 0)
            printf("%d ", v[i]);
    }

    printf("\n");

    return 0;
}