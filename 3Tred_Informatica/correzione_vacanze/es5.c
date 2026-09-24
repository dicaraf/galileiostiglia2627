/*Leggere due array di interi di 5 posizioni ognuno dei due 
già ordinato in ordine crescente, fonderli in un nuovo array 
che dovrà essere anch’esso ordinato con ordine crescente.
Ad esempio array1 0,2,3,7,8 array2 1,4,5,9,12 
arrayfuso 0,1,2,3,4,5,7,8,9,12.
*/

#include <stdio.h>
#define DIM 5
#define DIM2 10

int main() {
    int array1[DIM], array2[DIM], array3[DIM2];
    int i = 0;
    printf("Inserisci il primo elemento dell'array1: ");
    scanf("%d", &array1[0]);
    i++;
    do{
        printf("Inserisci il prossimo elemento dell'array1: ");
        scanf("%d", &array1[i]);
        if(array1[i] > array1[i - 1]) {
            i++;
        }
    }while(i < DIM);
    i = 0;
    printf("Inserisci il primo elemento dell'array1: ");
    scanf("%d", &array2[0]);
    i++;
    do{
        printf("Inserisci il prossimo elemento dell'array1: ");
        scanf("%d", &array2[i]);
        if(array2[i] > array2[i - 1]) {
            i++;
        }
    }while(i < DIM);
}