/*Leggere un array di interi di 10 posizioni e stampare il numero che compare più 
volte all’interno dell’array, qualora ci siano più numeri che compaiono lo stesso 
numero di volte stampare quello che compare per primo.*/

#include <stdio.h>
#define DIM 10

int main() {
    int array[DIM];

    for(int i = 0; i < DIM; i++) {
        printf("Inserisci il valore in posizione %d: ", i);
        scanf("%d", &array[i]);
    }
    int cnt, cnt_max = 0, num_max;
    for(int i = 0; i < DIM; i++){
        cnt = 0;
        for(int j = 0; j < DIM; j++){
            if(array[i] == array[j]) {
                cnt++;
            }
        }
        if(cnt > cnt_max) {
            num_max = array[i];
            cnt_max = cnt;
        }
    }
    printf("Il numero che compare più volte è %d", num_max);
}