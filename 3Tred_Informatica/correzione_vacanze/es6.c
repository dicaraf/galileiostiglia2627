/*Leggere un array di 10 interi e verificare se al suo interno
 ci sono tutti i numeri interi tra 0 e 9.
*/

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#define DIM 10

int main() {
    int array[DIM];
    srand(time(NULL));
    for(int i = 0; i < DIM; i++){
        array[i] = rand()%10; //numeri tra 0 e 9 rand()%(max-min+1)+min
    }
    int conta = 0;
    for(int num = 0; num < 10; num++) {
        conta = 0;
        for(int i = 0; i < DIM; i++) {
            if(num == array[i]){
                conta++;
            }
        }
        if(conta == 0) {
            printf("Il numero %d non è presente nell'array!\n", num);
        }
    }
}