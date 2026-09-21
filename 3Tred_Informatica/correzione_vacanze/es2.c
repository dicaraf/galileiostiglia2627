/*Leggere  un array di 10 interi e stampare solo i numeri 
che appaiono nell’array una volta soltanto.
Ad esempio se l’array contiene  1, 2, 3, 1, 2, 4  
il programma stamperà  3, 4 .*/

#include <stdio.h>
#define DIM 10

int main() {
    int array[DIM];

    for(int i = 0; i < DIM; i++) {
        printf("Inserisci il valore in posizione %d: ", i);
        scanf("%d", &array[i]);
    }
    int cnt;
    for(int i = 0; i < DIM; i++){
        cnt = 0;
        for(int j = 0; j < DIM; j++){
            if(array[i] == array[j]) {
                cnt++;
            }
        }
        if(cnt == 1) {
            printf("il numero %d comapare una volta", array[i]);
        }
    }
    
}