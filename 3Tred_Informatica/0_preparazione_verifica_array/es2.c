/*Leggere un array di 10 interi con dati riempiti dall'utente e un intero K generato 
casualmente tra 0 e 10. 
Stampare tutte le coppie di elementi, in posizioni diverse, la cui somma è uguale a K. 
Ogni coppia va stampata una sola volta. Alla fine stampare quante coppie sono state trovate.

Ad esempio, con array 3, 8, 2, 7, 5, 4, 6, 1, 9, 5 e K = 10 il programma stampa (3,7) (8,2) (5,5) (4,6) (1,9) e "5 coppie".*/

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define DIM 10

int main() {
    int array[DIM], k, conta = 0;

    srand(time(NULL));
    k = rand() % (10 - 0 + 1) + 0;
    for(int i = 0; i < DIM; i++){
        printf("Inserisci un valore in posizione %d", i);
        scanf("%d", &array[i]);
    }
    for(int i = 0; i < DIM; i++) {
        for(int j = i + 1; j < DIM; j++) {
            if(array[i] + array[j] == k) {
                printf("(%d %d) ", array[i], array[j]);
                conta++;
            }
        }
    }
    printf("Ho trovato %d coppie magiche\n", conta);
    return 0;
}