/*Leggere un array di 10 interi con dati riempiti dall'utente. 
Stampare il valore massimo e il valore minimo presenti nell'array e 
indicare quante volte compare ciascuno dei due valori.
*/

#include <stdio.h>

#define DIM 10

int main(){
    int array[DIM];

    for(int  i = 0; i < DIM; i++) {
        printf("inserici valori belli: ");
        scanf("%d", &array[i]);
    }
    int max = array[0], min = array[0];
    for(int i = 1; i < DIM; i++) {
        if(array[i] > max) {
            max = array[i];
        }
        if(array[i] < min){
            min = array[i];
        }
    }
    int conta_max = 0, conta_min = 0;
    for(int i = 0; i < DIM; i++) {
        if(array[i] == max) conta_max++;
        if(array[i] == min) conta_min++;
    }
    printf("Il valore massimo è %d e compare %d volte\n", max, conta_max);
    printf("Il valore min è %d e compare %d volte\n", min, conta_min);
}