/*Leggere un array di interi di 8 posizioni e 
verificare se contiene tutti valori diversi.*/

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#define DIM 8

int main() {
    int array[DIM];
    srand(time(NULL));

    for(int i = 0; i < DIM; i++) {
        array[i] = rand() % 20;
    }
    int conta = 0, doppioni = 0;
    for(int i = 0; i < DIM; i++) {
        conta = 0;
        for(int j = 0; j < DIM; j++) {
            if(array[i] == array[j]){
                conta++;
            }
        }
        if(conta > 1) {
            doppioni = 1;
        }
    }
    if(doppioni == 0) {
        printf("Tutti gli elementi sono diversi\n");
    } else {
        printf("NON tutti gli elementi sono diversi\n");
    }
    return 0;
}