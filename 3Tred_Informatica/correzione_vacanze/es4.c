/*Leggere  un array di 10 interi e stampare solo i numeri presenti nell’array 
senza ripetizioni (se un numero è presente più volte andrà stampato solo 
la prima volta che compare).
Ad esempio se l’array contiene  1, 2, 3, 1, 2, 4  il programma stamperà  1,2,3, 4*/

#include <stdio.h>
#define DIM 10

int main() {
    int array[DIM];
    for(int i = 0; i < DIM; i++){
        printf("Inserisci il numero in posizione %d", i+1);
        scanf("%d", &array[i]);
    }
    int conta;
    for(int i = 0; i < DIM; i++){
        conta = 0;
        for(int j = 0; j < i; j++) {
            if(array[i] == array[j]) {
                conta++;
            }
        }
        if(conta == 0) {
            printf("%d ", array[i]); 
        }
    }
    return 0;
}