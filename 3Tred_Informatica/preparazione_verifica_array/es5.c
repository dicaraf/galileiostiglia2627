/*Leggere un array di 10 interi con dati riempiti dall'utente. 
Stampare tutti gli elementi che sono maggiori dell'elemento precedente e 
dell'elemento successivo. Il primo e l'ultimo elemento non devono essere 
considerati.

Ad esempio, con l'array:

4, 7, 3, 8, 5, 6, 2, 9, 4, 1

il programma stampa:

7, 8, 6, 9*/

#include <stdio.h>
#define DIM 10

int main() {
    int array[DIM];
    for(int i = 0; i < DIM; i++) {
        printf("Inserisci elemento che ti piace: ");
        scanf("%d", &array[i]);
    }
    for(int i = 1; i < DIM - 1; i++) {
        if(array[i]>array[i-1] && array[i] > array[i + 1]) {
            printf("%d ", array[i]);
        }
    }
    return 0;
}