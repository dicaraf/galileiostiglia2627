/*Creare un array di interi con 18 elementi e
 riempirlo con numeri casuali compresi tra 1 e 90 senza ripetizioni. 
 Stampare man mano il contenuto dell’array.
*/

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#define DIM 18

int main(){
    int array[DIM];

    srand(time(NULL));
    int i = 0;
    do {
        int conta = 0;
        //array[i] = rand() % 90 + 1;
        printf("Inserisci un numero: ");
        scanf("%d", &array[i]);
        for(int j = 0; j < i; j++) {
            if(array[i] == array[j]) {
                conta++;
            }
        }
        if(conta == 0) {
            printf("%d ", array[i]);
            i++;
        }
    }while(i < 18); 
}