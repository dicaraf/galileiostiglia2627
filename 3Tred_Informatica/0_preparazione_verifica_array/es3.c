/*Riempire un array di 8 interi con numeri casuali tra 1 e 30 e stampare gli elementi 
che sono strettamente maggiori di tutti gli elementi che li seguono nell'array 
(l'ultimo elemento rispetta sempre la condizione).

Ad esempio, per 12, 5, 9, 3, 7, 4, 6, 2 il programma stampa 12, 9, 7, 6, 2.*/

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define DIM 8

int main() {
    int array[DIM];
    srand(time(NULL));
    for(int i = 0; i < DIM; i++){
        array[i] = rand() % (30-1+1) + 1;
    }

    for(int i = 0; i < DIM; i++) {
        int conta = 0;
        for(int j = i + 1; j < DIM; j++) {
            if(array[j] > array[i]) {
                conta++;
            }
        }
        if(conta == 0) {
            printf("%d ", array[i]);
        }
    }
    return 0;
}