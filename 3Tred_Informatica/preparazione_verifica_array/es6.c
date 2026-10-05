/*Riempire un array di 10 interi con numeri casuali compresi tra 1 e 20. 
Stampare il numero che compare più volte nell'array e il numero di occorrenze.

Se ci sono più numeri con lo stesso numero massimo di occorrenze, 
stampare tutti quelli che rispettano la condizione.*/

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define DIM 10

int main() {
    int array[DIM];
    srand(time(NULL));
    for(int i = 0; i < DIM; i++) {
        array[i] = rand() % 20 + 1;
    }
    int conta = 0, conta_max = 0, num_max;
    for(int i = 0; i < DIM; i++){
        conta = 0;
        for(int j = 0; j < DIM; j++) {
            if(array[i] == array[j]) {
                conta++;
            }
        }
        if(conta > conta_max) {
            conta_max = conta;
            num_max = array[i];
        }
    }
    for(int i = 0; i < DIM; i++){
        conta = 0;
        for(int j = 0; j < DIM; j++) {
            if(array[i] == array[j]) {
                conta++;
            }
        }
        if(conta == conta_max) {
            printf("%d ", array[i]);
        }
    }

    return 0;
}